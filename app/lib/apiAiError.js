/** Shared server-side AI route error payload (real message, not generic "AI busy"). */
export const ANTHROPIC_SCAN_MODEL = "claude-sonnet-4-6";

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
