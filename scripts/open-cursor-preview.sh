#!/usr/bin/env bash
# Opens TrackFresh in Cursor's built-in Simple Browser (center editor).
set -euo pipefail
CURSOR_BIN="/Applications/Cursor.app/Contents/Resources/app/bin/cursor"
URL=""
# Prefer highest port first (newest `next dev` when 3000 is busy).
for port in 3004 3003 3002 3001 3000; do
  if curl -sf -o /dev/null --max-time 1 "http://localhost:${port}/" 2>/dev/null; then
    URL="http://localhost:${port}"
    break
  fi
done
[[ -n "$URL" ]] || URL="http://localhost:3000"
open "vscode://vscode.simple-browser/show?url=${URL}" 2>/dev/null || true
if [[ -x "$CURSOR_BIN" ]]; then
  "$CURSOR_BIN" --open-url "vscode://vscode.simple-browser/show?url=${URL}" 2>/dev/null || true
fi
echo "Opening ${URL} in Cursor Simple Browser."
echo "If it opens in a side panel, drag the tab into the center editor area."
