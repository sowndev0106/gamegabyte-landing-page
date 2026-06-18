#!/usr/bin/env bash
#
# Deploy GameGabyte web to the "main" PREVIEW environment on Cloudflare Pages.
# Single-project setup: production branch is "uat" (uat.gamegabyte.com).
# The "main" branch is a preview deployment only — NO custom domain.
#   - builds the app (tsc + vite)
#   - uploads dist/ to the "gamegabyte-web" Pages project (branch: main)
#   - live at the preview URL: https://main.gamegabyte-web.pages.dev
#
# Usage: ./deploy.main.sh
#
set -euo pipefail

PROJECT="gamegabyte-web"
BRANCH="main"   # preview branch → main.gamegabyte-web.pages.dev

cd "$(dirname "$0")"

echo "▶ Checking Cloudflare auth..."
if ! npx wrangler whoami >/dev/null 2>&1; then
  echo "✘ Not logged in to Cloudflare. Run 'npx wrangler login' first." >&2
  exit 1
fi

echo "▶ Building..."
npm run build

echo "▶ Deploying dist/ to '$PROJECT' (preview branch: $BRANCH)..."
npx wrangler pages deploy dist --project-name="$PROJECT" --branch="$BRANCH"

echo "✔ Done → https://main.gamegabyte-web.pages.dev"
