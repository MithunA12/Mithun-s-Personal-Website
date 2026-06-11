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
