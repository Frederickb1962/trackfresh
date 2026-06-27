#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Waiting for TrackFresh dev server (up to 90s)..."
for _ in $(seq 1 90); do
  for port in 3005 3004 3003 3002 3001 3000; do
    if curl -sf -o /dev/null --max-time 1 "http://127.0.0.1:${port}/" 2>/dev/null; then
      echo "Dev server ready on :${port}"
      exec bash "$ROOT/scripts/open-cursor-preview.sh"
    fi
  done
  sleep 1
done

echo "Timed out. Opening preview URL anyway."
exec bash "$ROOT/scripts/open-cursor-preview.sh"
