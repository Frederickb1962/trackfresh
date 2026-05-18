/** Fresh fruits/vegetables — not "after opening" shelf life. */

export function isProduceCategory(category) {
  return String(category || "").trim().toLowerCase() === "produce";
}

/** English line for pending / scanner hints: "In General: Use within 3-5 days" */
export function formatInGeneralInstruction(item, lang = "en") {
  const min = Number(item?.inGeneralDaysMin);
  const max = Number(item?.inGeneralDaysMax);
  if (Number.isFinite(min) && Number.isFinite(max) && min > 0 && max > 0) {
    const lo = Math.round(min);
    const hi = Math.round(max);
    if (lang === "es") {
      return hi > lo
        ? `En general: usar en un plazo de ${lo}-${hi} días`
        : `En general: usar en un plazo de ${lo} días`;
    }
    return hi > lo
      ? `In General: Use within ${lo}-${hi} days`
      : `In General: Use within ${lo} days`;
  }
  return "";
}

/** Calendar days from today for conservative default (lesser end of a range). */
export function conservativeProduceShelfDays(item) {
  const min = Number(item?.inGeneralDaysMin);
  const max = Number(item?.inGeneralDaysMax);
  if (Number.isFinite(min) && Number.isFinite(max) && min > 0 && max > 0) {
    return Math.min(Math.round(min), Math.round(max));
  }
  if (Number.isFinite(min) && min > 0) return Math.round(min);
  if (Number.isFinite(max) && max > 0) return Math.round(max);
  const ds = Number(item?.daysSealed);
  if (Number.isFinite(ds) && ds > 0) return Math.round(ds);
  return null;
}

/**
 * After AI JSON parse: strip opened fields for Produce, normalize in-general range,
 * align daysSealed to conservative default for downstream code that keys off it.
 */
export function finalizeProduceScannerItem(item) {
  if (!item || typeof item !== "object") return item;
  const o = { ...item };
  if (!isProduceCategory(o.category)) return o;

  o.daysAfterOpening = null;
  o.openedTip = null;

  let min = Number(o.inGeneralDaysMin);
  let max = Number(o.inGeneralDaysMax);
  if (!Number.isFinite(min) || min <= 0) min = null;
  if (!Number.isFinite(max) || max <= 0) max = null;

  if (min == null && max == null) {
    const ds = Number(o.daysSealed);
    if (Number.isFinite(ds) && ds > 0) {
      const d = Math.round(ds);
      min = d;
      max = d;
    }
  } else if (min != null && max == null) {
    max = min;
  } else if (min == null && max != null) {
    min = max;
  }

  if (min != null && max != null && min > max) {
    const t = min;
    min = max;
    max = t;
  }

  if (min != null) o.inGeneralDaysMin = Math.round(min);
  else delete o.inGeneralDaysMin;
  if (max != null) o.inGeneralDaysMax = Math.round(max);
  else delete o.inGeneralDaysMax;

  const conservative = conservativeProduceShelfDays(o);
  if (conservative != null) o.daysSealed = conservative;

  return o;
}

export function finalizeProduceScannerItems(items) {
  if (!Array.isArray(items)) return items;
  return items.map(finalizeProduceScannerItem);
}
