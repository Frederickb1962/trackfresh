#!/usr/bin/env bash
# Stop stale Next dev servers, clear .next cache, start one fresh server on :3000.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ Stopping dev servers on ports 3000–3005..."
for p in 3000 3001 3002 3003 3004 3005; do
  lsof -ti:"$p" 2>/dev/null | xargs kill -9 2>/dev/null || true
done
sleep 1

echo "→ Clearing .next cache..."
rm -rf .next

echo ""
echo "✓ Starting fresh dev server at http://localhost:3000"
echo "  Hard refresh in browser: ⌘ + Shift + R"
echo "  Direct app entry:        http://localhost:3000/?enter=1"
echo "  Test marketing CTA:      http://localhost:3000/?reset=1"
echo ""

exec npx next dev -p 3000
