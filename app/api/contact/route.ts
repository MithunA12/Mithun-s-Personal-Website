import { NextResponse } from "next/server";

import { sendContactEmail } from "@/src/lib/email/contact";
import { isSameOriginRequest } from "@/src/lib/security/chat-request";
import {
  MAX_CONTACT_REQUEST_BYTES,
  validateContactPayload,
} from "@/src/lib/security/contact-request";
import { checkRateLimit, type RateLimitResult } from "@/src/lib/security/rate-limit";

export const runtime = "nodejs";

// Strict on purpose: a handful of legitimate messages fit easily, while a bot
// trying to flood the inbox is capped quickly.
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60_000;

const JSON_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
  "X-Content-Type-Options": "nosniff",
};

function jsonResponse(body: object, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { ...JSON_HEADERS, ...headers },
  });
}

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const forwardedIp = forwardedFor?.split(",")[0]?.trim();
  return forwardedIp || request.headers.get("x-real-ip")?.trim() || "unknown";
}

function rateLimitHeaders(result: RateLimitResult) {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1_000)),
  };
}

function methodNotAllowed() {
  return jsonResponse({ error: "Method not allowed." }, 405, { Allow: "POST" });
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return jsonResponse({ error: "The request could not be accepted." }, 403);
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() || "";
  if (!contentType.startsWith("application/json")) {
    return jsonResponse({ error: "Send the request as JSON." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_CONTACT_REQUEST_BYTES) {
    return jsonResponse({ error: "The message is too large." }, 413);
  }

  const rateLimit = await checkRateLimit({
    identifier: getClientIdentifier(request),
    limit: RATE_LIMIT_MAX_REQUESTS,
    namespace: "contact",
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  const limitHeaders = rateLimitHeaders(rateLimit);

  if (!rateLimit.allowed) {
    if (rateLimit.unavailable) {
      console.warn("contact_security_event", { event: "rate_limit_unavailable" });
      return jsonResponse(
        { error: "Messaging is temporarily unavailable. Please try again later." },
        503,
        { ...limitHeaders, "Retry-After": String(rateLimit.retryAfterSeconds) },
      );
    }

    return jsonResponse(
      { error: "Too many messages were sent. Please wait a while and try again." },
      429,
      { ...limitHeaders, "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ error: "Send a valid JSON request body." }, 400, limitHeaders);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_CONTACT_REQUEST_BYTES) {
    return jsonResponse({ error: "The message is too large." }, 413, limitHeaders);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: "Send a valid JSON request body." }, 400, limitHeaders);
  }

  const validation = validateContactPayload(body);
  if (!validation.ok) {
    return jsonResponse({ error: validation.error }, validation.status, limitHeaders);
  }

  const result = await sendContactEmail(validation.value);

  if (!result.ok) {
    if (result.code === "not_configured") {
      console.warn("contact_provider_event", { code: "not_configured" });
      return jsonResponse(
        { error: "Messaging is not set up yet. Please reach out via GitHub or LinkedIn." },
        503,
        limitHeaders,
      );
    }

    console.warn("contact_provider_event", { code: "provider_error" });
    return jsonResponse(
      { error: "The message could not be sent right now. Please try again later." },
      502,
      limitHeaders,
    );
  }

  return jsonResponse({ ok: true }, 200, limitHeaders);
}
