"use client";

import { formatUSD } from "../lib/savings";

/**
 * Simple month savings scorecard — selling hook for home & organize.
 * stats: { savedUSD, wastedUSD, totalUSD, savedPct, wastePct }
 */
export default function KitchenSavingsCard({ stats, t, variant = "full", onScanReceipt }) {
  const hasData = stats?.totalUSD > 0;
  const isCompact = variant === "compact";

  if (!hasData) {
    return (
      <div className={`tf-savings-card${isCompact ? " tf-savings-card--compact" : ""} tf-savings-card--empty`}>
        <p className="tf-savings-card__pitch">{t("savingsPitch")}</p>
        <p className="tf-savings-card__empty-stat">{t("savingsEmptyStat")}</p>
        {onScanReceipt && (
          <button type="button" onClick={onScanReceipt} className="tf-savings-card__cta glass-scan-btn">
            {t("savingsScanCta")}
          </button>
        )}
      </div>
    );
  }

  const net = Math.round((stats.savedUSD - stats.wastedUSD) * 100) / 100;
  const winning = net >= 0;

  return (
    <div className={`tf-savings-card${isCompact ? " tf-savings-card--compact" : ""}`}>
      <p className="tf-savings-card__label">💰 {t("savingsMonthTitle")}</p>
      <div className="tf-savings-card__numbers">
        <div className="tf-savings-card__col tf-savings-card__col--saved">
          <span className="tf-savings-card__amount">{formatUSD(stats.savedUSD)}</span>
          <span className="tf-savings-card__col-label">{t("savingsOnPlate")}</span>
        </div>
        <div className="tf-savings-card__divider" aria-hidden />
        <div className="tf-savings-card__col tf-savings-card__col--wasted">
          <span className="tf-savings-card__amount">{formatUSD(stats.wastedUSD)}</span>
          <span className="tf-savings-card__col-label">{t("savingsInTrash")}</span>
        </div>
      </div>
      <p className="tf-savings-card__tagline" style={{ color: winning ? "#bbf7d0" : "#fecaca" }}>
        {winning
          ? t("savingsWinning").replace("{amount}", formatUSD(net))
          : t("savingsFlipIt").replace("{amount}", formatUSD(stats.wastedUSD))}
      </p>
      {!isCompact && (
        <p className="tf-savings-card__foot">{t("savingsFootnote").replace("{pct}", String(stats.savedPct))}</p>
      )}
    </div>
  );
}
