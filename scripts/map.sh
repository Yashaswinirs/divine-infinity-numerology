#!/usr/bin/env bash
# Compact project map for a new chat. Writes ~/Desktop/PROJECT-MAP.md
cd "$(dirname "$0")/.." || exit 1
OUT="$HOME/Desktop/PROJECT-MAP.md"
emit() { echo; echo "=== $1 ==="; cat "$1"; }
{
  echo "# PROJECT MAP (generated $(date '+%d %b %Y %H:%M'))"
  echo "# This is a compact index of my repo, NOT the full code."
  echo "# RULE: never write or change code that touches a file you have not seen. Ask me to paste it first."

  echo; echo "# PART 1: RULES (from docs/MASTER_PROMPT.md; its old structure and built-list sections are left out)"
  awk '/^# /{skip=($0 ~ /^# (HOW THIS FILE IS USED|PROJECT STRUCTURE|WHAT IS ALREADY BUILT|TASK HISTORY|START)/)} !skip' docs/MASTER_PROMPT.md

  echo; echo "# PART 2: PROGRESS, DECISIONS, GOTCHAS, OPEN TODOs (from docs/PROGRESS.md)"
  awk 'BEGIN{k=1;s=0} /^## /{k=($0 ~ /^## (Status|Section notes|Decisions|Gotchas|Open TODOs)/); s=0} /^### /{s=($0 ~ /^### (Tokens|Components|Asset paths|Stack facts)/)} k&&!s' docs/PROGRESS.md

  echo; echo "# PART 3: CONFIG"
  for f in package.json next.config.ts .env.example src/styles/fonts.ts; do emit "$f"; done

  echo; echo "# PART 4: FILE TREE (src, public, docs, scripts)"
  find src public docs scripts -type f ! -name '.DS_Store' | sort

  echo; echo "# PART 5: TOKENS, UTILITIES, KEYFRAMES in src/styles/globals.css (names and values only; ask me for the file to see utility bodies)"
  grep -E '^[[:space:]]*(--[A-Za-z0-9-]+:|@utility |@keyframes |@custom-variant )' src/styles/globals.css | cut -c1-140

  echo; echo "# PART 6: COMPONENT PROPS in ui, layout and shared (variant lines are cut to 72 characters)"
  for d in ui layout shared; do
    find src/components/$d -maxdepth 1 -name '*.tsx' | sort | while IFS= read -r f; do
      echo; echo "--- $f"
      awk '/^(export )?(interface|type) [A-Za-z0-9]*Props/{print; if ($0 ~ /[{]$/) {p=1} else {p=0}; next} p{print} p&&/^}/{p=0}' "$f" | cut -c1-110
      awk '/variants: *\{/{v=1} v{print} v&&(/^\}\)/||/^\)/){v=0}' "$f" | cut -c1-72
    done
  done

  echo; echo "# PART 7: SECTION COMPONENTS (exports only)"
  find src/components/sections -name '*.tsx' | sort | while IFS= read -r f; do grep -H "^export" "$f" | cut -c1-140; done

  echo; echo "# PART 8: BARREL FILES"
  for f in src/components/*/index.ts src/components/sections/*/index.ts; do [ -f "$f" ] && emit "$f"; done

  echo; echo "# PART 9: DATA, LIB, HOOKS (exports only)"
  grep -nE "^export " src/data/*.ts src/lib/*.ts src/lib/api/*.ts src/hooks/*.ts 2>/dev/null | cut -c1-150

  echo; echo "# PART 10: APP ROUTES (layout and page files, full)"
  find src/app -type f \( -name 'page.tsx' -o -name 'layout.tsx' \) ! -path 'src/app/design-system/*' | sort | while IFS= read -r f; do emit "$f"; done

  echo; echo "# PART 11: TODO MARKERS"
  grep -rn "TODO(" src | cut -c1-170
} > "$OUT"
echo "Created $OUT"; wc -c "$OUT"