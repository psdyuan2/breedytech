#!/usr/bin/env bash
# Run on the server (uploaded by deploy.ps1 before first clone).
# Usage: deploy-git.sh <DEST_DIR> <REPO_URL_BASE64> <BRANCH>
set -euo pipefail

DEST="${1:?DEST required}"
REPO_B64="${2:?REPO_B64 required}"
BRANCH="${3:?BRANCH required}"

REPO_URL="$(printf '%s' "$REPO_B64" | base64 -d)"

if ! command -v git >/dev/null 2>&1; then
  echo "[deploy-git] installing git..."
  sudo apt-get update -qq
  sudo apt-get install -y git
fi

if [[ ! -d "$DEST/.git" ]]; then
  echo "[deploy-git] cloning $BRANCH -> $DEST"
  mkdir -p "$(dirname "$DEST")"
  git clone -b "$BRANCH" "$REPO_URL" "$DEST"
else
  echo "[deploy-git] syncing $BRANCH in $DEST (reset to origin)"
  cd "$DEST"
  git fetch origin
  git checkout "$BRANCH"
  # Match remote exactly; avoids merge failures when the server had local edits
  git reset --hard "origin/$BRANCH"
fi

cd "$DEST"
exec bash scripts/deploy-remote.sh
