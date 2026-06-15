import { NextResponse } from "next/server";

import { buildPortfolioContext } from "@/src/lib/portfolio-context";
import { generatePortfolioAnswer, LlmProviderError } from "@/src/lib/llm";
import {
  getChatProviderFailure,
  isSameOriginRequest,
  MAX_CHAT_REQUEST_BYTES,
  validateChatPayload,
} from "@/src/lib/security/chat-request";
import { checkRateLimit, type RateLimitResult } from "@/src/lib/security/rate-limit";

export const runtime = "nodejs";

const RATE_LIMIT_MAX_REQUESTS = 8;
const RATE_LIMIT_WINDOW_MS = 60_000;
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
  return jsonResponse(
    { error: "Method not allowed." },
    405,
    { Allow: "POST" },
  );
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
  if (Number.isFinite(declaredLength) && declaredLength > MAX_CHAT_REQUEST_BYTES) {
    return jsonResponse({ error: "The chat request is too large." }, 413);
  }

  const rateLimit = await checkRateLimit({
    identifier: getClientIdentifier(request),
    limit: RATE_LIMIT_MAX_REQUESTS,
    namespace: "chat",
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  const limitHeaders = rateLimitHeaders(rateLimit);

  if (!rateLimit.allowed) {
    if (rateLimit.unavailable) {
      console.warn("chat_security_event", { event: "rate_limit_unavailable" });
      return jsonResponse(
        { error: "Ask Mithun is temporarily unavailable. Please try again later." },
        503,
        { ...limitHeaders, "Retry-After": String(rateLimit.retryAfterSeconds) },
      );
    }

    return jsonResponse(
      { error: "Too many questions were sent. Please wait a moment and try again." },
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

  if (new TextEncoder().encode(rawBody).byteLength > MAX_CHAT_REQUEST_BYTES) {
    return jsonResponse({ error: "The chat request is too large." }, 413, limitHeaders);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: "Send a valid JSON request body." }, 400, limitHeaders);
  }

  const validation = validateChatPayload(body);
  if (!validation.ok) {
    return jsonResponse({ error: validation.error }, validation.status, limitHeaders);
  }

  try {
    const result = await generatePortfolioAnswer({
      ...validation.value,
      context: buildPortfolioContext(),
    });

    return jsonResponse({ answer: result.answer }, 200, limitHeaders);
  } catch (error) {
    const code = error instanceof LlmProviderError ? error.code : "unexpected";
    console.warn("chat_provider_event", { code });
    const failure = getChatProviderFailure(code);
    return jsonResponse(
      { error: failure.error },
      failure.status,
      failure.retryAfterSeconds
        ? { ...limitHeaders, "Retry-After": String(failure.retryAfterSeconds) }
        : limitHeaders,
    );
  }
}
