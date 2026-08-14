export const MAX_NAME_LENGTH = 100;
export const MAX_EMAIL_LENGTH = 254;
export const MAX_MESSAGE_LENGTH = 4_000;
export const MAX_CONTACT_REQUEST_BYTES = 16_384;

export type ValidContactRequest = {
  name: string;
  email: string;
  message: string;
};

export type ContactRequestValidation =
  | { ok: true; value: ValidContactRequest }
  | { ok: false; error: string; status: 400 | 403 };

// Deliberately conservative: no whitespace/newlines allowed, so a submitted
// email can't smuggle header content into the outbound message.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Strip control characters so free-text fields can't inject headers or break
// the plaintext body. `\p{Cc}` is the Unicode "control" category. Single-line
// fields drop every control char; the message keeps newlines but strips the rest.
function sanitizeLine(value: string) {
  return value.replace(/\p{Cc}+/gu, " ").trim();
}

function sanitizeBlock(value: string) {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[^\P{Cc}\n]+/gu, " ")
    .trim();
}

export function validateContactPayload(body: unknown): ContactRequestValidation {
  if (!isRecord(body)) {
    return { ok: false, error: "A name, email, and message are required.", status: 400 };
  }

  // Honeypot: real users never see or fill this field.
  if (typeof body.website === "string" && body.website.trim()) {
    return { ok: false, error: "The request could not be accepted.", status: 403 };
  }
  if (body.website !== undefined && typeof body.website !== "string") {
    return { ok: false, error: "The request could not be accepted.", status: 400 };
  }

  if (typeof body.name !== "string") {
    return { ok: false, error: "Enter your name.", status: 400 };
  }
  const name = sanitizeLine(body.name);
  if (!name) {
    return { ok: false, error: "Enter your name.", status: 400 };
  }
  if (name.length > MAX_NAME_LENGTH) {
    return { ok: false, error: `Keep your name under ${MAX_NAME_LENGTH} characters.`, status: 400 };
  }

  if (typeof body.email !== "string") {
    return { ok: false, error: "Enter a valid email address.", status: 400 };
  }
  const email = body.email.trim();
  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Enter a valid email address.", status: 400 };
  }

  if (typeof body.message !== "string") {
    return { ok: false, error: "Enter a message.", status: 400 };
  }
  const message = sanitizeBlock(body.message);
  if (!message) {
    return { ok: false, error: "Enter a message.", status: 400 };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return {
      ok: false,
      error: `Keep your message under ${MAX_MESSAGE_LENGTH} characters.`,
      status: 400,
    };
  }

  return { ok: true, value: { name, email, message } };
}
