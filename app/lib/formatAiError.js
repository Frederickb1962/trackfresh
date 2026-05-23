/** Turn API / scan errors into a short user-facing message (EN/ES). */
export function formatAiError(error, lang) {
  const isEs = lang === "es";
  const msg = String(error || "").trim();
  if (!msg) {
    return isEs ? "Algo salió mal. Intenta de nuevo." : "Something went wrong. Please try again.";
  }
  if (/api[_\s]?key|authentication|401|ANTHROPIC/i.test(msg)) {
    return isEs
      ? "La clave de IA no está configurada. Revisa ANTHROPIC_API_KEY en el servidor."
      : "AI API key is not set up. Check ANTHROPIC_API_KEY on the server.";
  }
  if (/rate|overloaded|529|503|capacity/i.test(msg) || msg === "AI busy") {
    return isEs
      ? "La IA está un poco ocupada. Intenta de nuevo en un momento. 🙏"
      : "Our AI is a little busy right now. Please try again in a moment! 🙏";
  }
  if (/max_tokens|truncated|too long/i.test(msg)) {
    return isEs
      ? "Demasiados productos en una foto. Acerca el recibo o recorta la imagen."
      : "Too much to read in one photo. Move closer or crop the receipt.";
  }
  return msg;
}
