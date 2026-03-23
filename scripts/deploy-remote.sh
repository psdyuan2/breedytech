#!/usr/bin/env bash
set -euo pipefail
export NODE_ENV=production

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  if [[ -f env.production.example ]]; then
    cp env.production.example .env
    echo "[deploy-remote] created .env from env.production.example — edit SESSION_SECRET etc."
  else
    echo "error: missing .env — create $ROOT/.env"
    exit 1
  fi
fi

if ! command -v node >/dev/null 2>&1; then
  echo "[deploy-remote] installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
node -v

if ! command -v pm2 >/dev/null 2>&1; then
  echo "[deploy-remote] installing PM2..."
  sudo npm install -g pm2
fi

npm ci
npx prisma migrate deploy
npx prisma generate
npm run build

pm2 delete breedytech 2>/dev/null || true
pm2 start npm --name breedytech -- start
pm2 save

echo "[deploy-remote] done."
pm2 status breedytech
