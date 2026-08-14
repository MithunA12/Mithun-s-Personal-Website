import "server-only";

import type { ValidContactRequest } from "@/src/lib/security/contact-request";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const SEND_TIMEOUT_MS = 5_000;
const DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";

export type ContactEmailResult =
  | { ok: true }
  | { ok: false; code: "not_configured" | "provider_error" };

/**
 * Sends a contact-form submission to the site owner via Resend's REST API.
 *
 * The recipient (`CONTACT_EMAIL`) and API key live only in server env vars, so
 * the owner's address is never exposed to the client. The recipient is fixed
 * server-side — the form can never be used to email an arbitrary address — and
 * the visitor's email is set as `reply_to` so replies go straight to them.
 */
export async function sendContactEmail(
  input: ValidContactRequest,
): Promise<ContactEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM;

  if (!apiKey || !to) {
    return { ok: false, code: "not_configured" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: `New portfolio message from ${input.name}`,
        text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      return { ok: false, code: "provider_error" };
    }

    return { ok: true };
  } catch {
    return { ok: false, code: "provider_error" };
  } finally {
    clearTimeout(timeout);
  }
}
