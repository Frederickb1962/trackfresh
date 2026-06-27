/** Shared server-side AI route error payload (real message, not generic "AI busy"). */
export const ANTHROPIC_SCAN_MODEL = "claude-sonnet-4-6";

export function anthropicTextFromResponse(resp) {
  const blocks = Array.isArray(resp?.content) ? resp.content : [];
  const textBlock = blocks.find((b) => b?.type === "text" && b.text) || blocks[0];
  return String(textBlock?.text || "").trim();
}

export function parseAnthropicJsonText(text, fallbackMessage = "Could not read AI response") {
  let cleaned = String(text || "")
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  if (!cleaned) throw new Error("AI returned an empty response. Please try again.");

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error(fallbackMessage);
  }
}

export async function createAnthropicMessageWithRetry(client, params, { attempts = 3 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await client.messages.create(params);
    } catch (e) {
      lastErr = e;
      const retryable = e?.status === 500 || e?.status === 529 || e?.status === 503;
      if (!retryable || attempt === attempts - 1) throw e;
      await new Promise((r) => setTimeout(r, 600 * (attempt + 1)));
    }
  }
  throw lastErr;
}

export function extractAnthropicErrorMessage(e, fallback = "Request failed") {
  if (!e) return fallback;
  let msg = String(e.message || e.error?.message || "").trim();
  const jsonStart = msg.search(/\{[\s\S]*"error"/);
  if (jsonStart !== -1) {
    try {
      const parsed = JSON.parse(msg.slice(jsonStart));
      if (parsed?.error?.message) msg = parsed.error.message;
    } catch {
      /* keep msg */
    }
  }
  if (!msg) return fallback;
  return msg;
}

export function aiErrorPayload(e, fallback = "Request failed") {
  const isAuthError = e?.status === 401 || /api[_\s]?key|authentication/i.test(e?.message || "");
  const error = isAuthError
    ? "API authentication failed — check ANTHROPIC_API_KEY"
    : extractAnthropicErrorMessage(e, fallback);
  return { error, status: e?.status || 500 };
}
