"use client";

import { pick } from "../lib/i18n";

export default function CoachTipCard({ lang, tip, onAction, onDismiss }) {
  if (!tip) return null;

  return (
    <div
      className="tf-glass-window"
      style={{
        marginBottom: "1rem",
        border: "2px solid rgba(74, 222, 128, 0.45)",
        boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
      }}
    >
      <div className="tf-card-surface" style={{ padding: "1rem 1.1rem" }}>
        <p
          className="text-xs font-bold uppercase tracking-wider mb-2"
          style={{ color: "#86efac", margin: 0 }}
        >
          {pick(lang, {
            en: "Your next step",
            es: "Tu siguiente paso",
            fr: "Prochaine étape",
            it: "Prossimo passo",
          })}
        </p>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
          <span style={{ fontSize: "2rem", lineHeight: 1, flexShrink: 0 }}>{tip.emoji}</span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h3 className="text-base font-extrabold text-white mb-1" style={{ margin: 0 }}>
              {pick(lang, tip.title)}
            </h3>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.85)", margin: 0 }}>
              {pick(lang, tip.body)}
            </p>
            <div className="flex gap-2 flex-wrap">
              <button type="button" onClick={tip.id === "done" ? onDismiss : onAction} className="glass-scan-btn" style={{ fontSize: "0.82rem", padding: "0.5rem 1rem", fontWeight: 700 }}>
                {pick(lang, tip.action)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
