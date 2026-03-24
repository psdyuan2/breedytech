#!/usr/bin/env bash
# One-off: fix production .env if DATABASE_URL pointed to prisma/prisma/dev.db.
# Run on the server: bash scripts/fix-server-database-url.sh
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
if [[ -f .env ]] && grep -qE '^DATABASE_URL="file:\./prisma/dev\.db"' .env; then
  sed -i 's|^DATABASE_URL="file:\./prisma/dev\.db"|DATABASE_URL="file:./dev.db"|' .env
  echo "Updated DATABASE_URL to file:./dev.db"
  grep DATABASE .env
else
  echo "No change needed (or .env missing)."
  grep DATABASE .env 2>/dev/null || true
fi
