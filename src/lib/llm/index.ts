import "server-only";

import { generateWithGemini } from "./gemini";
import type { GenerateAnswerInput } from "./types";
import { LlmProviderError } from "./types";

export { LlmProviderError } from "./types";
export type { ChatMessage } from "./types";

export async function generatePortfolioAnswer(input: GenerateAnswerInput) {
  const provider = (process.env.LLM_PROVIDER?.trim() || "gemini").toLowerCase();

  if (provider !== "gemini") {
    throw new LlmProviderError(
      "provider",
      `Unsupported LLM provider: ${provider}.`,
    );
  }

  return {
    answer: await generateWithGemini(input),
    provider: "gemini" as const,
  };
}
