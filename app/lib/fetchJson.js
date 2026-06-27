/** Parse fetch response body safely — avoids "Unexpected end of JSON input". */
export async function fetchJsonSafe(res, emptyError = "Server returned no data.") {
  const raw = await res.text();
  if (!raw) return { data: {}, parseError: emptyError };
  try {
    return { data: JSON.parse(raw), parseError: null };
  } catch {
    return { data: {}, parseError: "Invalid server response." };
  }
}
