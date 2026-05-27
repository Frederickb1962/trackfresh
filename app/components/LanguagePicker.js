"use client";

import { LANGS, LANG_META } from "../lib/i18n";

export default function LanguagePicker({ lang, onChange, compact = false, className = "" }) {
  if (compact) {
    const next = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
    const cur = LANG_META[lang] || LANG_META.en;
    const nxt = LANG_META[next] || LANG_META.en;
    return (
      <button
        type="button"
        onClick={() => onChange(next)}
        className={className || "app-header-btn"}
        aria-label={`Language: ${cur.label}. Switch to ${nxt.label}.`}
      >
        {nxt.flag} {nxt.label.slice(0, 2).toUpperCase()}
      </button>
    );
  }

  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`.trim()}>
      {LANGS.map((code) => {
        const meta = LANG_META[code];
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            className={`rounded-xl px-3 py-2 text-xs sm:text-sm font-bold border-2 transition-all ${active ? "border-orange-500 bg-orange-500/20 text-white" : "border-white/20 bg-white/10 text-white/70"}`}
          >
            {meta.flag} {meta.label}
          </button>
        );
      })}
    </div>
  );
}
