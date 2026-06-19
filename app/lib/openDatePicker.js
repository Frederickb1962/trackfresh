/** Open native date picker when user taps anywhere on the field (mobile + desktop). */
export function openDatePicker(input) {
  if (!input || input.disabled) return;
  try {
    input.focus({ preventScroll: true });
  } catch (_) {
    input.focus();
  }
  if (typeof input.showPicker === "function") {
    try {
      input.showPicker();
      return;
    } catch (_) {}
  }
  try {
    input.click();
  } catch (_) {}
}
