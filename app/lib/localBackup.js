/** Device-only backup: export / import localStorage for phone ↔ PC transfer. */

export const BACKUP_VERSION = 1;

const BACKUP_KEY_PREFIXES = ["trackfresh."];
const BACKUP_EXTRA_KEYS = ["tf_disclaimer_seen", "tf_favorite_recipes"];

function isAllowedBackupKey(key) {
  return BACKUP_KEY_PREFIXES.some((p) => key.startsWith(p)) || BACKUP_EXTRA_KEYS.includes(key);
}

export function collectBackupKeys() {
  if (typeof window === "undefined") return [];
  const keys = new Set(BACKUP_EXTRA_KEYS);
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && isAllowedBackupKey(key)) keys.add(key);
    }
  } catch {
    /* ignore */
  }
  return [...keys].sort();
}

export function buildBackupPayload() {
  const data = {};
  for (const key of collectBackupKeys()) {
    try {
      const val = localStorage.getItem(key);
      if (val !== null) data[key] = val;
    } catch {
      /* ignore */
    }
  }
  return {
    app: "TrackFresh",
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function downloadBackupFile(payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `trackfresh-backup-${date}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function parseBackupFile(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, error: "invalid_json" };
  }
  if (!parsed || typeof parsed !== "object") return { ok: false, error: "invalid_format" };
  if (!parsed.data || typeof parsed.data !== "object") return { ok: false, error: "missing_data" };
  if (Object.keys(parsed.data).length === 0) return { ok: false, error: "empty_backup" };
  if (parsed.app && parsed.app !== "TrackFresh") return { ok: false, error: "wrong_app" };
  return { ok: true, payload: parsed };
}

export function applyBackupToLocalStorage(payload) {
  const data = payload.data || {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value !== "string" || !isAllowedBackupKey(key)) continue;
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore quota */
    }
  }
}
