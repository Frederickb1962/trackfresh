/** TrackFresh Search and Save — register discount for items expiring within 2 days (pilot program). */

export const REGISTER_DISCOUNT_PERCENT = 20;
export const REGISTER_DISCOUNT_MAX_DAYS_LEFT = 2;

export function isRegisterDiscountEligible(item) {
  const d = item?.daysLeft;
  if (d === null || d === undefined) return false;
  return d >= 0 && d <= REGISTER_DISCOUNT_MAX_DAYS_LEFT;
}

/** Short clerk-facing verification code (display only until POS integration). */
export function registerDiscountVerifyCode(itemId, useByDate) {
  const raw = `${String(itemId || "")}:${String(useByDate || "")}:TF${REGISTER_DISCOUNT_PERCENT}`;
  let h = 0;
  for (let i = 0; i < raw.length; i += 1) {
    h = ((h << 5) - h + raw.charCodeAt(i)) | 0;
  }
  const seg = Math.abs(h).toString(36).toUpperCase().padStart(6, "0").slice(0, 6);
  return `TF-${seg}`;
}

export function registerDiscountDaysLabel(daysLeft, lang) {
  const isEs = lang === "es";
  if (daysLeft === 0) return isEs ? "Vence hoy" : "Expires today";
  if (daysLeft === 1) return isEs ? "Vence mañana" : "Expires tomorrow";
  return isEs ? `${daysLeft} días restantes` : `${daysLeft} days left`;
}
