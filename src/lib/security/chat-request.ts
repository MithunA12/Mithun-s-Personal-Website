import type { ChatMessage } from "@/src/lib/llm/types";

export const MAX_CHAT_MESSAGE_LENGTH = 1_000;
export const MAX_CHAT_HISTORY_ITEMS = 8;
export const MAX_CHAT_HISTORY_ITEM_LENGTH = 1_000;
export const MAX_CHAT_REQUEST_BYTES = 16_384;

export type ValidChatRequest = {
  history: ChatMessage[];
  message: string;
};

export type ChatRequestValidation =
  | { ok: true; value: ValidChatRequest }
  | { ok: false; error: string; status: 400 | 403 | 413 | 415 };

export function getChatProviderFailure(code: string) {
  if (code === "rate_limit") {
    return {
      error: "Ask Mithun has reached its current usage limit. Please try again shortly.",
      retryAfterSeconds: 60,
      status: 429 as const,
    };
  }

  return {
    error: "Ask Mithun is temporarily unavailable. Please try again later.",
    status: code === "missing_key" || code === "authentication" ? (503 as const) : (502 as const),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseHistory(value: unknown): ChatMessage[] | null {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > MAX_CHAT_HISTORY_ITEMS) return null;

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
    if (!content || content.length > MAX_CHAT_HISTORY_ITEM_LENGTH) return null;
    history.push({ role: item.role, content });
  }

  return history;
}

export function validateChatPayload(body: unknown): ChatRequestValidation {
  if (!isRecord(body)) {
    return { ok: false, error: "A message is required.", status: 400 };
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return { ok: false, error: "The request could not be accepted.", status: 403 };
  }

  if (body.website !== undefined && typeof body.website !== "string") {
    return { ok: false, error: "The request could not be accepted.", status: 400 };
  }

  if (typeof body.message !== "string") {
    return { ok: false, error: "A message is required.", status: 400 };
  }

  const message = body.message.trim();
  if (!message) {
    return { ok: false, error: "Enter a question before sending.", status: 400 };
  }

  if (message.length > MAX_CHAT_MESSAGE_LENGTH) {
    return {
      ok: false,
      error: `Keep questions under ${MAX_CHAT_MESSAGE_LENGTH} characters.`,
      status: 400,
    };
  }

  const history = parseHistory(body.history);
  if (!history) {
    return {
      ok: false,
      error: "Recent chat history is invalid or too long.",
      status: 400,
    };
  }

  return { ok: true, value: { history, message } };
}

export function isSameOriginRequest(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") {
    return false;
  }

  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}
