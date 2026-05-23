/** Shared server-side AI route error payload (real message, not generic "AI busy"). */
export function aiErrorPayload(e, fallback = "Request failed") {
  const isAuthError = e?.status === 401 || /api[_\s]?key|authentication/i.test(e?.message || "");
  const error = isAuthError
    ? "API authentication failed — check ANTHROPIC_API_KEY"
    : e?.message || fallback;
  return { error, status: e?.status || 500 };
}
