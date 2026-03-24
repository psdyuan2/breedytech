#!/usr/bin/env bash
set -euo pipefail
export NODE_ENV=production

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Prisma SQLite 的相对路径相对于 prisma/schema.prisma 所在目录。
# file:./prisma/dev.db 会解析成 prisma/prisma/dev.db，与仓库中的 prisma/dev.db 不一致，线上会看不到商品。
if [[ -f .env ]]; then
  if grep -qE '^DATABASE_URL="file:\./prisma/dev\.db"' .env; then
    sed -i 's|^DATABASE_URL="file:\./prisma/dev\.db"|DATABASE_URL="file:./dev.db"|' .env
    echo "[deploy-remote] fixed DATABASE_URL -> file:./dev.db (was file:./prisma/dev.db)"
  fi
fi

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
npm run db:seed
npm run build

pm2 delete breedytech 2>/dev/null || true
# Bind app to loopback so only Nginx is exposed on :80
pm2 start npm --name breedytech -- start -- -H 127.0.0.1 -p 3000
pm2 save

if ! command -v nginx >/dev/null 2>&1; then
  echo "[deploy-remote] installing nginx..."
  sudo apt-get update -qq
  sudo apt-get install -y nginx
fi

NGINX_SITE="breedytech"
sudo cp "$ROOT/deploy/nginx-breedytech.conf" "/etc/nginx/sites-available/${NGINX_SITE}"
sudo ln -sf "/etc/nginx/sites-available/${NGINX_SITE}" "/etc/nginx/sites-enabled/${NGINX_SITE}"
if [[ -L /etc/nginx/sites-enabled/default ]]; then
  sudo rm -f /etc/nginx/sites-enabled/default
fi
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl reload nginx

echo "[deploy-remote] done. Nginx :80 -> http://127.0.0.1:3000"
pm2 status breedytech
