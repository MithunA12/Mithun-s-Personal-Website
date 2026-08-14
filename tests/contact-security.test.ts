import assert from "node:assert/strict";
import test from "node:test";

import {
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  validateContactPayload,
} from "../src/lib/security/contact-request";

test("accepts a well-formed message", () => {
  const result = validateContactPayload({
    name: "Ada Lovelace",
    email: "ada@example.com",
    message: "I'd love to talk about your research.",
    website: "",
  });

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.value.name, "Ada Lovelace");
    assert.equal(result.value.email, "ada@example.com");
  }
});

test("rejects a filled honeypot as forbidden", () => {
  const result = validateContactPayload({
    name: "Bot",
    email: "bot@example.com",
    message: "spam",
    website: "http://spam.example",
  });

  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.status, 403);
});

test("requires name, email, and message", () => {
  assert.equal(validateContactPayload({ email: "a@b.co", message: "hi" }).ok, false);
  assert.equal(validateContactPayload({ name: "A", message: "hi" }).ok, false);
  assert.equal(validateContactPayload({ name: "A", email: "a@b.co" }).ok, false);
  assert.equal(validateContactPayload({ name: "  ", email: "a@b.co", message: "hi" }).ok, false);
});

test("rejects malformed email addresses", () => {
  for (const email of ["not-an-email", "missing@domain", "a@b", "a b@c.co", "a@b .co"]) {
    const result = validateContactPayload({ name: "A", email, message: "hi" });
    assert.equal(result.ok, false, `expected ${email} to be rejected`);
  }
});

test("rejects an email carrying header-injection characters", () => {
  const result = validateContactPayload({
    name: "A",
    email: "victim@example.com\nbcc: everyone@example.com",
    message: "hi",
  });
  assert.equal(result.ok, false);
});

test("strips control characters from the name but keeps message newlines", () => {
  const result = validateContactPayload({
    name: "Ada\r\nLovelace",
    email: "ada@example.com",
    message: "line one\nline two",
  });

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.ok(!/[\r\n]/.test(result.value.name), "name should have no newlines");
    assert.equal(result.value.name, "Ada Lovelace");
    assert.ok(result.value.message.includes("\n"), "message newline preserved");
  }
});

test("enforces length limits", () => {
  const longName = validateContactPayload({
    name: "a".repeat(MAX_NAME_LENGTH + 1),
    email: "a@b.co",
    message: "hi",
  });
  const longMessage = validateContactPayload({
    name: "A",
    email: "a@b.co",
    message: "a".repeat(MAX_MESSAGE_LENGTH + 1),
  });

  assert.equal(longName.ok, false);
  assert.equal(longMessage.ok, false);
});
