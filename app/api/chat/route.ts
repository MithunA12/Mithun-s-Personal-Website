import { NextResponse } from "next/server";

import { buildPortfolioContext } from "@/src/lib/portfolio-context";
import {
  generatePortfolioAnswer,
  LlmProviderError,
  type ChatMessage,
} from "@/src/lib/llm";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 1_000;
const MAX_HISTORY_ITEMS = 8;
const MAX_HISTORY_ITEM_LENGTH = 1_000;
const MAX_REQUEST_BYTES = 16_384;
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_ENTRIES = 1_000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function pruneRateLimitStore(now: number) {
  if (rateLimitStore.size < RATE_LIMIT_MAX_ENTRIES) return;

  for (const [identifier, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(identifier);
  }

  if (rateLimitStore.size >= RATE_LIMIT_MAX_ENTRIES) {
    const oldestIdentifier = rateLimitStore.keys().next().value;
    if (oldestIdentifier) rateLimitStore.delete(oldestIdentifier);
  }
}

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const forwardedIp = forwardedFor?.split(",")[0]?.trim();

  return forwardedIp || request.headers.get("x-real-ip")?.trim() || "unknown";
}

function checkRateLimit(identifier: string) {
  const now = Date.now();
  const existing = rateLimitStore.get(identifier);

  if (!existing || existing.resetAt <= now) {
    pruneRateLimitStore(now);
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1_000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseHistory(value: unknown): ChatMessage[] | null {
  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value) || value.length > MAX_HISTORY_ITEMS) {
    return null;
  }

  const history: ChatMessage[] = [];

  for (const item of value) {
    if (
      !isRecord(item) ||
      (item.role !== "user" && item.role !== "assistant") ||
      typeof item.content !== "string"
    ) {
      return null;
    }

    const content = item.content.trim();
    if (!content || content.length > MAX_HISTORY_ITEM_LENGTH) {
      return null;
    }

    history.push({ role: item.role, content });
  }

  return history;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { error: "The chat request is too large." },
      { status: 413 },
    );
  }

  const rateLimit = checkRateLimit(getClientIdentifier(request));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many questions were sent. Please wait a moment and try again." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Send a valid JSON request body." },
      { status: 400 },
    );
  }

  if (!isRecord(body) || typeof body.message !== "string") {
    return NextResponse.json(
      { error: "A message is required." },
      { status: 400 },
    );
  }

  const message = body.message.trim();
  if (!message) {
    return NextResponse.json(
      { error: "Enter a question before sending." },
      { status: 400 },
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Keep questions under ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 },
    );
  }

  const history = parseHistory(body.history);
  if (!history) {
    return NextResponse.json(
      { error: "Recent chat history is invalid or too long." },
      { status: 400 },
    );
  }

  try {
    const result = await generatePortfolioAnswer({
      message,
      history,
      context: buildPortfolioContext(),
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof LlmProviderError) {
      if (error.code === "rate_limit") {
        return NextResponse.json(
          {
            error:
              "Ask Mithun has reached its current usage limit. Please try again shortly.",
          },
          { status: 429 },
        );
      }

      if (error.code === "missing_key" || error.code === "authentication") {
        return NextResponse.json(
          {
            error:
              "Ask Mithun is temporarily unavailable because its AI service is not configured.",
          },
          { status: 503 },
        );
      }
    }

    return NextResponse.json(
      { error: "Ask Mithun is temporarily unavailable. Please try again later." },
      { status: 502 },
    );
  }
}
