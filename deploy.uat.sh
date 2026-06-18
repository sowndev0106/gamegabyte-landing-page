#!/usr/bin/env bash
#
# Deploy GameGabyte web to the UAT environment on Cloudflare Pages.
#   - builds the app (tsc + vite)
#   - uploads dist/ to the "gamegabyte-web" Pages project (branch: main)
#   - live at https://uat.gamegabyte.com and https://gamegabyte-web.pages.dev
#
# Usage: ./deploy.uat.sh
#
set -euo pipefail

PROJECT="gamegabyte-web"
BRANCH="uat"   # production branch → serves uat.gamegabyte.com

cd "$(dirname "$0")"

echo "▶ Checking Cloudflare auth..."
if ! npx wrangler whoami >/dev/null 2>&1; then
  echo "✘ Not logged in to Cloudflare. Run 'npx wrangler login' first." >&2
  exit 1
fi

echo "▶ Building..."
npm run build

echo "▶ Deploying dist/ to '$PROJECT' (branch: $BRANCH)..."
npx wrangler pages deploy dist --project-name="$PROJECT" --branch="$BRANCH"

echo "✔ Done → https://uat.gamegabyte.com"
