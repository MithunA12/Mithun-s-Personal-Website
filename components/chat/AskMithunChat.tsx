"use client";

import { FormEvent, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatResponse = {
  answer?: string;
  error?: string;
  provider?: "gemini";
};

const suggestedQuestions = [
  "What projects best show Mithun's software engineering skills?",
  "Summarize Mithun's AI healthcare research.",
  "What makes Mithun a strong fit for a startup?",
];

export function AskMithunChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function askQuestion(question: string) {
    const message = question.trim();
    if (!message || isLoading) return;

    const recentHistory = messages.slice(-8);
    setMessages((current) => [...current, { role: "user", content: message }]);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: recentHistory }),
      });
      const data = (await response.json()) as ChatResponse;

      if (!response.ok || !data.answer) {
        throw new Error(data.error || "Ask Mithun could not answer right now.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.answer as string },
      ]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Ask Mithun could not answer right now.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askQuestion(input);
  }

  return (
    <section
      aria-labelledby="chat-heading"
      className="px-6 py-10 sm:px-8 sm:py-14 lg:px-12"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Start with a prompt
          </p>
          <h2
            className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
            id="chat-heading"
          >
            Explore the portfolio conversationally.
          </h2>
          <p className="mt-4 leading-7 text-[var(--muted)]">
            Ask about Mithun&apos;s projects, research, technical experience, or
            leadership. Answers are grounded in the content published on this
            site.
          </p>

          <div className="mt-6 grid gap-3" aria-label="Suggested questions">
            {suggestedQuestions.map((question) => (
              <button
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-left text-sm font-semibold leading-6 text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--hover-border)] hover:shadow-[0_12px_32px_-24px_var(--shadow-color)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
                disabled={isLoading}
                key={question}
                onClick={() => void askQuestion(question)}
                type="button"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_70px_-50px_var(--shadow-color)]">
          <div
            aria-live="polite"
            aria-relevant="additions text"
            className="min-h-80 space-y-4 p-5 sm:p-6"
          >
            {messages.length === 0 ? (
              <div className="flex min-h-64 items-center justify-center text-center">
                <div className="max-w-sm">
                  <span
                    aria-hidden="true"
                    className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] font-mono text-sm font-bold text-[var(--accent-strong)]"
                  >
                    AI
                  </span>
                  <p className="mt-4 font-semibold">Ask a focused question.</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    I&apos;ll answer using only the verified portfolio content
                    available here.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  key={`${message.role}-${index}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[78%] ${
                      message.role === "user"
                        ? "bg-[var(--accent-fill)] text-white"
                        : "bg-[var(--surface-subtle)] text-[var(--foreground)]"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}

            {isLoading ? (
              <p className="text-sm text-[var(--muted)]">Ask Mithun is thinking...</p>
            ) : null}

            {error ? (
              <p
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--foreground)]"
                role="alert"
              >
                {error}
              </p>
            ) : null}
          </div>

          <form
            className="border-t border-[var(--border)] bg-[var(--surface-subtle)] p-4 sm:p-5"
            onSubmit={handleSubmit}
          >
            <label className="sr-only" htmlFor="ask-mithun-message">
              Ask Mithun a question
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <textarea
                className="min-h-24 flex-1 resize-none rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-base text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)] sm:min-h-14"
                disabled={isLoading}
                id="ask-mithun-message"
                maxLength={1000}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about research, projects, or experience..."
                rows={2}
                value={input}
              />
              <button
                className="min-h-12 rounded-full bg-[var(--accent-fill)] px-6 text-sm font-bold text-white transition hover:bg-[var(--accent-fill-hover)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading || !input.trim()}
                type="submit"
              >
                {isLoading ? "Sending..." : "Send question"}
              </button>
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
              Ask Mithun may make mistakes. Verify important details against the
              portfolio sections.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
