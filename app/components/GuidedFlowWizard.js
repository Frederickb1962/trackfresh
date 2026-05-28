"use client";

import { pick } from "../lib/i18n";
import { GUIDED_STEPS } from "../lib/onboardingFlows";
import { TrackFreshLogo } from "./ui/TrackFreshLogo";

export default function GuidedFlowWizard({
  lang,
  step,
  onStepChange,
  onScanReceipt,
  onGoHome,
  onComplete,
  onSkipReceipt,
}) {
  const current = GUIDED_STEPS[Math.min(step, GUIDED_STEPS.length - 1)];
  const isLast = step >= GUIDED_STEPS.length - 1;
  const total = GUIDED_STEPS.length;

  const handlePrimary = () => {
    if (current.id === "receipt") {
      onScanReceipt();
      return;
    }
    if (current.id === "home") {
      onGoHome();
      onStepChange(step + 1);
      return;
    }
    if (isLast) {
      onComplete();
      return;
    }
    onStepChange(step + 1);
  };

  return (
    <div className="fixed inset-0 z-[10060] flex items-center justify-center p-4 overflow-y-auto tf-premium-bg">
      <div
        className="w-full max-w-md animate-[fadeIn_0.35s_ease]"
        style={{
          background: "rgba(0,0,0,0.4)",
          border: "2px solid rgba(255,102,0,0.45)",
          backdropFilter: "blur(14px)",
          borderRadius: "24px",
          padding: "1.75rem 1.5rem 1.5rem",
        }}
      >
        <div className="text-center mb-4">
          <TrackFreshLogo showBroc={false} style={{ fontSize: "1.1rem" }} />
          <p className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: "#fb923c" }}>
            {pick(lang, { en: "Step-by-step guide", es: "Guía paso a paso", fr: "Guide pas à pas", it: "Guida passo passo" })}{" "}
            · {step + 1}/{total}
          </p>
        </div>

        <div className="flex justify-center gap-1.5 mb-5">
          {GUIDED_STEPS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? "1.4rem" : "0.4rem",
                height: "0.4rem",
                borderRadius: "999px",
                background: i <= step ? "#4ade80" : "rgba(255,255,255,0.25)",
                transition: "all 0.25s",
              }}
            />
          ))}
        </div>

        <div className="text-center mb-5">
          <div style={{ fontSize: "3.5rem", lineHeight: 1, marginBottom: "0.75rem" }}>{current.emoji}</div>
          <h2 className="text-xl font-extrabold text-white mb-2" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
            {pick(lang, current.title)}
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.88)" }}>
            {pick(lang, current.body)}
          </p>
        </div>

        <button type="button" onClick={handlePrimary} className="w-full py-3 rounded-xl font-bold text-base btn-amber-3d">
          {pick(lang, current.action)}
        </button>

        {current.id === "receipt" && current.skip && (
          <button
            type="button"
            onClick={() => {
              onSkipReceipt();
              onStepChange(step + 1);
            }}
            className="mt-3 w-full text-center text-xs"
            style={{ color: "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: "pointer" }}
          >
            {pick(lang, current.skip)}
          </button>
        )}

        {step > 0 && !isLast && (
          <button
            type="button"
            onClick={() => onStepChange(step - 1)}
            className="mt-3 w-full text-center text-xs"
            style={{ color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer" }}
          >
            {pick(lang, { en: "← Back", es: "← Atrás", fr: "← Retour", it: "← Indietro" })}
          </button>
        )}
      </div>
    </div>
  );
}
