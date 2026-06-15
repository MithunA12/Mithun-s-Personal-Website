import assert from "node:assert/strict";
import test from "node:test";

import {
  getChatProviderFailure,
  MAX_CHAT_HISTORY_ITEMS,
  MAX_CHAT_MESSAGE_LENGTH,
  validateChatPayload,
} from "../src/lib/security/chat-request";
import {
  checkMemoryRateLimit,
  checkRateLimit,
  resetMemoryRateLimitsForTests,
} from "../src/lib/security/rate-limit";

test("accepts a bounded chat payload", () => {
  const result = validateChatPayload({
    history: [{ role: "user", content: "What research is featured?" }],
    message: "What projects show software engineering ability?",
    website: "",
  });

  assert.equal(result.ok, true);
});

test("rejects oversized messages and histories", () => {
  const messageResult = validateChatPayload({ message: "x".repeat(MAX_CHAT_MESSAGE_LENGTH + 1) });
  const historyResult = validateChatPayload({
    message: "hello",
    history: Array.from({ length: MAX_CHAT_HISTORY_ITEMS + 1 }, () => ({
      role: "user",
      content: "hello",
    })),
  });

  assert.equal(messageResult.ok, false);
  assert.equal(historyResult.ok, false);
});

test("rejects a filled honeypot", () => {
  const result = validateChatPayload({ message: "hello", website: "bot.example" });
  assert.deepEqual(result, {
    ok: false,
    error: "The request could not be accepted.",
    status: 403,
  });
});

test("rate limiter blocks requests over the fixed-window limit", () => {
  resetMemoryRateLimitsForTests();
  const options = {
    identifier: "test-client",
    limit: 2,
    namespace: "chat-test",
    windowMs: 60_000,
  };

  assert.equal(checkMemoryRateLimit(options, 1_000).allowed, true);
  assert.equal(checkMemoryRateLimit(options, 1_001).allowed, true);
  const blocked = checkMemoryRateLimit(options, 1_002);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterSeconds, 60);
});

test("rate limiter resets after the window", () => {
  resetMemoryRateLimitsForTests();
  const options = {
    identifier: "test-client",
    limit: 1,
    namespace: "chat-test",
    windowMs: 1_000,
  };

  assert.equal(checkMemoryRateLimit(options, 1_000).allowed, true);
  assert.equal(checkMemoryRateLimit(options, 1_500).allowed, false);
  assert.equal(checkMemoryRateLimit(options, 2_001).allowed, true);
});

test("production rate limiting fails closed without a distributed store", async () => {
  const originalVercelEnv = process.env.VERCEL_ENV;
  const originalUrl = process.env.UPSTASH_REDIS_REST_URL;
  const originalToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  process.env.VERCEL_ENV = "production";
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;

  try {
    const result = await checkRateLimit({
      identifier: "test-client",
      limit: 8,
      namespace: "chat-test",
      windowMs: 60_000,
    });
    assert.equal(result.allowed, false);
    assert.equal(result.unavailable, true);
  } finally {
    if (originalVercelEnv === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = originalVercelEnv;
    if (originalUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL;
    else process.env.UPSTASH_REDIS_REST_URL = originalUrl;
    if (originalToken === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN;
    else process.env.UPSTASH_REDIS_REST_TOKEN = originalToken;
  }
});

test("missing API key failures remain generic", () => {
  const failure = getChatProviderFailure("missing_key");
  assert.deepEqual(failure, {
    error: "Ask Mithun is temporarily unavailable. Please try again later.",
    status: 503,
  });
  assert.equal(failure.error.includes("key"), false);
  assert.equal(failure.error.includes("Gemini"), false);
});
