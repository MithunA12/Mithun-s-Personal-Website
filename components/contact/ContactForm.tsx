"use client";

import { FormEvent, useState } from "react";

const MAX_MESSAGE_LENGTH = 4_000;

type ContactResponse = {
  ok?: boolean;
  error?: string;
};

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState(""); // honeypot — non-semantic name to dodge autofill
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, hp }),
      });
      const data = (await response.json()) as ContactResponse;

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "The message could not be sent right now.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (requestError) {
      setStatus("error");
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The message could not be sent right now.",
      );
    }
  }

  const isSending = status === "sending";

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm leading-6 text-[var(--foreground)] shadow-[inset_0_1px_0_var(--glass-highlight)] transition-colors placeholder:text-[var(--muted)] focus-visible:border-[var(--hover-border)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
  const labelClass =
    "block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]";

  return (
    <form className="glass-panel rounded-[2rem] p-6 sm:p-8" noValidate onSubmit={handleSubmit}>
      {status === "success" ? (
        <div aria-live="polite" className="text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Message sent
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">Thanks for reaching out.</h3>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            Your message is on its way — I&apos;ll reply to the email you provided.
          </p>
          <button
            className="glass-button mt-6 inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold"
            onClick={() => setStatus("idle")}
            type="button"
          >
            Send another
          </button>
        </div>
      ) : (
        <div className="grid gap-5">
          {/* Honeypot: hidden from users, bots tend to fill it. Non-semantic
              name + ignore hints so autofill/password managers leave it alone. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="contact-hp">Leave this field empty</label>
            <input
              autoComplete="off"
              data-1p-ignore
              data-lpignore="true"
              id="contact-hp"
              name="hp"
              onChange={(event) => setHp(event.target.value)}
              tabIndex={-1}
              value={hp}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="contact-name">
                Name
              </label>
              <input
                autoComplete="name"
                className={fieldClass}
                disabled={isSending}
                id="contact-name"
                maxLength={100}
                name="name"
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                required
                value={name}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-email">
                Email
              </label>
              <input
                autoComplete="email"
                className={fieldClass}
                disabled={isSending}
                id="contact-email"
                inputMode="email"
                maxLength={254}
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="contact-message">
              Message
            </label>
            <textarea
              className={`${fieldClass} min-h-36 resize-y`}
              disabled={isSending}
              id="contact-message"
              maxLength={MAX_MESSAGE_LENGTH}
              name="message"
              onChange={(event) => setMessage(event.target.value)}
              placeholder="What would you like to talk about?"
              required
              rows={6}
              value={message}
            />
          </div>

          {error ? (
            <p aria-live="assertive" className="text-sm font-medium text-red-500 dark:text-red-400">
              {error}
            </p>
          ) : null}

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs leading-5 text-[var(--muted)]">
              Your address is never published on this site.
            </p>
            <button
              className="glass-button glass-button-primary inline-flex min-h-12 shrink-0 items-center justify-center rounded-full px-6 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSending}
              type="submit"
            >
              {isSending ? "Sending…" : "Send message"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
