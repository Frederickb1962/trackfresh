export const LANGS = ["en", "es", "fr", "it"];

export const LANG_META = {
  en: { label: "English", flag: "\ud83c\uddfa\ud83c\uddf8", speech: "en-US" },
  es: { label: "Espa\u00f1ol", flag: "\ud83c\uddf2\ud83c\uddfd", speech: "es-US" },
  fr: { label: "Fran\u00e7ais", flag: "\ud83c\uddeb\ud83c\uddf7", speech: "fr-FR" },
  it: { label: "Italiano", flag: "\ud83c\uddee\ud83c\uddf9", speech: "it-IT" },
};

/** Pick localized string; falls back to English. */
export function pick(lang, map) {
  if (!map) return "";
  return map[lang] ?? map.en ?? "";
}

export function speechLocale(lang) {
  return LANG_META[lang]?.speech || "en-US";
}

export function nextLang(current) {
  const i = LANGS.indexOf(current);
  return LANGS[(i + 1) % LANGS.length];
}
