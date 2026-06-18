#!/usr/bin/env bash
set -euo pipefail

ORIGIN="https://gamegabyte.com"
BUNDLE_ID="16d09317-cc2b-480e-a5d3-32b5e158b7c0"
COMP_HASH="34d668635ee5929e2ab690d9abe8380d63d428ce"
UA="Mozilla/5.0"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RAW="$ROOT/docs/legacy-site/raw"

dl() { # url dest
  curl -fsSL -A "$UA" "$1" -o "$2"
}

snapshot() {
  mkdir -p "$RAW"
  dl "$ORIGIN/"                                  "$RAW/index.html"
  dl "$ORIGIN/_json/$BUNDLE_ID/_index.json"      "$RAW/_index.json"
  dl "$ORIGIN/_components/v2/$COMP_HASH.js"       "$RAW/component.js"
  dl "$ORIGIN/_components/v2/$COMP_HASH.css"      "$RAW/component.css"
  echo "snapshot: done"
}

mirror_assets() {
  local manifest="$ROOT/docs/legacy-site/asset-manifest.txt"
  grep -ohaE '/_(assets|woff)/[A-Za-z0-9_./-]+\.(png|jpe?g|webp|avif|svg|woff2?)' \
    "$RAW/index.html" "$RAW/_index.json" "$RAW/component.js" "$RAW/component.css" \
    | sort -u > "$manifest"
  echo "found $(wc -l < "$manifest") referenced asset/font URLs"
  while IFS= read -r path; do
    [ -z "$path" ] && continue
    local dest="$ROOT/public$path"
    mkdir -p "$(dirname "$dest")"
    dl "$ORIGIN$path" "$dest"
  done < "$manifest"
  echo "mirror_assets: done"
}

main() {
  snapshot
  mirror_assets
}
main "$@"
