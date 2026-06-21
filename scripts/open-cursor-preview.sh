#!/usr/bin/env bash
# Opens TrackFresh in Cursor's built-in Simple Browser (center editor).
set -euo pipefail
CURSOR_BIN="/Applications/Cursor.app/Contents/Resources/app/bin/cursor"
URL=""
# Prefer port 3000 (standard after `npm run dev:clean`).
for port in 3000 3001 3002 3003 3004 3005; do
  if curl -sf -o /dev/null --max-time 1 "http://localhost:${port}/" 2>/dev/null; then
    URL="http://localhost:${port}"
    break
  fi
done
[[ -n "$URL" ]] || URL="http://localhost:3000"
STATUS="$(curl -s -o /dev/null -w "%{http_code}" --max-time 2 "${URL}/" 2>/dev/null || echo "000")"
if [[ "$STATUS" != "200" ]]; then
  echo "Warning: ${URL} returned HTTP ${STATUS}. Run: npm run dev:clean"
fi
open "vscode://vscode.simple-browser/show?url=${URL}" 2>/dev/null || true
if [[ -x "$CURSOR_BIN" ]]; then
  "$CURSOR_BIN" --open-url "vscode://vscode.simple-browser/show?url=${URL}" 2>/dev/null || true
fi
echo "Opening ${URL} in Cursor Simple Browser (center editor tab)."
echo "TrackFresh is centered in a phone-width column — drag the tab into the main editor if it opens in a side panel."
