import { createHash } from "node:crypto";

const RATE_LIMIT_MAX_ENTRIES = 1_000;
const UPSTASH_TIMEOUT_MS = 2_500;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
  unavailable?: boolean;
};

type RateLimitOptions = {
  identifier: string;
  limit: number;
  namespace: string;
  windowMs: number;
};

const memoryStore = new Map<string, RateLimitEntry>();

function pruneMemoryStore(now: number) {
  if (memoryStore.size < RATE_LIMIT_MAX_ENTRIES) return;

  for (const [identifier, entry] of memoryStore) {
    if (entry.resetAt <= now) memoryStore.delete(identifier);
  }

  if (memoryStore.size >= RATE_LIMIT_MAX_ENTRIES) {
    const oldestIdentifier = memoryStore.keys().next().value;
    if (oldestIdentifier) memoryStore.delete(oldestIdentifier);
  }
}

export function checkMemoryRateLimit(
  { identifier, limit, namespace, windowMs }: RateLimitOptions,
  now = Date.now(),
): RateLimitResult {
  const key = `${namespace}:${identifier}`;
  const existing = memoryStore.get(key);

  if (!existing || existing.resetAt <= now) {
    pruneMemoryStore(now);
    const resetAt = now + windowMs;
    memoryStore.set(key, { count: 1, resetAt });
    return { allowed: true, limit, remaining: limit - 1, resetAt, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1_000)),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    limit,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
    retryAfterSeconds: 0,
  };
}

function hashIdentifier(identifier: string) {
  return createHash("sha256").update(identifier).digest("hex");
}

async function checkUpstashRateLimit(
  options: RateLimitOptions,
  url: string,
  token: string,
): Promise<RateLimitResult> {
  const windowSeconds = Math.ceil(options.windowMs / 1_000);
  const key = `rate-limit:${options.namespace}:${hashIdentifier(options.identifier)}`;
  const script = [
    "local count = redis.call('INCR', KEYS[1])",
    "if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end",
    "local ttl = redis.call('TTL', KEYS[1])",
    "return {count, ttl}",
  ].join(" ");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTASH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["EVAL", script, "1", key, String(windowSeconds)]),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) throw new Error("Rate-limit store rejected the request.");

    const data = (await response.json()) as { result?: [number, number] };
    const count = Number(data.result?.[0]);
    const ttl = Math.max(1, Number(data.result?.[1]));
    if (!Number.isFinite(count) || !Number.isFinite(ttl)) {
      throw new Error("Rate-limit store returned an invalid response.");
    }

    const retryAfterSeconds = count > options.limit ? ttl : 0;
    return {
      allowed: count <= options.limit,
      limit: options.limit,
      remaining: Math.max(0, options.limit - count),
      resetAt: Date.now() + ttl * 1_000,
      retryAfterSeconds,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function checkRateLimit(options: RateLimitOptions): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (url && token) {
    try {
      return await checkUpstashRateLimit(options, url, token);
    } catch {
      return {
        allowed: false,
        limit: options.limit,
        remaining: 0,
        resetAt: Date.now() + 30_000,
        retryAfterSeconds: 30,
        unavailable: true,
      };
    }
  }

  if (process.env.VERCEL_ENV === "production") {
    return {
      allowed: false,
      limit: options.limit,
      remaining: 0,
      resetAt: Date.now() + 60_000,
      retryAfterSeconds: 60,
      unavailable: true,
    };
  }

  return checkMemoryRateLimit(options);
}

export function resetMemoryRateLimitsForTests() {
  memoryStore.clear();
}
