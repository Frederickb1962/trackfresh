/** Consumer savings / waste ledger (USD from receipt line prices). */

export const SAVINGS_EVENTS_KEY = "trackfresh.savingsEvents";

export function parseItemPrice(it) {
  const raw = it?.unitPrice ?? it?.price ?? it?.lineTotal ?? it?.amount;
  if (typeof raw === "number" && raw > 0) return Math.round(raw * 100) / 100;
  if (typeof raw === "string") {
    const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (!Number.isNaN(n) && n > 0) return Math.round(n * 100) / 100;
  }
  return null;
}

export function itemPrice(it) {
  return parseItemPrice(it);
}

export function formatUSD(amount) {
  const n = typeof amount === "number" && !Number.isNaN(amount) ? amount : 0;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function currentMonthKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function loadSavingsEvents(key = SAVINGS_EVENTS_KEY) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSavingsEvents(events, key = SAVINGS_EVENTS_KEY) {
  try {
    localStorage.setItem(key, JSON.stringify(events));
  } catch {
    /* ignore quota */
  }
}

export function createSavingsEvent({ itemId, itemName, type, amount, at = new Date(), ...extra }) {
  const d = at instanceof Date ? at : new Date(at);
  return {
    id: crypto.randomUUID(),
    itemId,
    itemName: itemName || "Item",
    type,
    amount: Math.round(amount * 100) / 100,
    at: d.toISOString(),
    monthKey: currentMonthKey(d),
    ...extra,
  };
}

/** Standard "Used" portion choices (fraction of line price eaten). */
export const USED_PORTION_FRACTIONS = [0.25, 0.5, 0.75, 1];

export function usedPortionButtonLabel(fraction) {
  if (fraction >= 1) return "100%";
  if (fraction === 0.25) return "25%";
  if (fraction === 0.5) return "50%";
  if (fraction === 0.75) return "75%";
  return `${Math.round(fraction * 100)}%`;
}

/** Split line price by portion eaten (e.g. 0.5 → half saved, half wasted). */
export function splitPortionAmounts(price, fraction) {
  const f = Math.min(1, Math.max(0, Number(fraction) || 0));
  const used = Math.round(price * f * 100) / 100;
  const wasted = Math.round((price - used) * 100) / 100;
  return { used, wasted, fraction: f };
}

export function appendSavingsEvent(events, event) {
  if (!event?.amount || event.amount <= 0) return events;
  const dup = events.some(
    (e) => e.itemId === event.itemId && e.type === event.type && e.monthKey === event.monthKey
  );
  if (dup) return events;
  return [event, ...events];
}

export function computeMonthStats(events, monthKey = currentMonthKey()) {
  const month = (events || []).filter((e) => e.monthKey === monthKey);
  const savedUSD = month.filter((e) => e.type === "used").reduce((s, e) => s + (e.amount || 0), 0);
  const wastedUSD = month.filter((e) => e.type === "wasted").reduce((s, e) => s + (e.amount || 0), 0);
  const totalUSD = savedUSD + wastedUSD;
  const wastePct = totalUSD > 0 ? Math.round((wastedUSD / totalUSD) * 100) : 0;
  const savedPct = totalUSD > 0 ? 100 - wastePct : 0;
  return {
    savedUSD: Math.round(savedUSD * 100) / 100,
    wastedUSD: Math.round(wastedUSD * 100) / 100,
    totalUSD: Math.round(totalUSD * 100) / 100,
    wastePct,
    savedPct,
  };
}
