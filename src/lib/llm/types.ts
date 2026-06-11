export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type GenerateAnswerInput = {
  message: string;
  history: ChatMessage[];
  context: string;
};

export type LlmErrorCode =
  | "missing_key"
  | "authentication"
  | "rate_limit"
  | "provider"
  | "malformed_response";

export class LlmProviderError extends Error {
  constructor(
    public readonly code: LlmErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "LlmProviderError";
  }
}
