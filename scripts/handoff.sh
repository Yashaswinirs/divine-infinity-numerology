#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
OUT="$HOME/Desktop/HANDOFF.md"
emit() { echo; echo "=== $1 ==="; cat "$1"; }
{
  echo "# HANDOFF: READ ALL OF THIS BEFORE REPLYING"
  echo; echo "# PART 1: RULES"; cat docs/MASTER_PROMPT.md
  echo; echo "# PART 2: PROGRESS AND DECISIONS"; cat docs/PROGRESS.md
  echo; echo "## OPEN TODOs (auto-generated from the code)"
  grep -rn "TODO(" src || echo "none"
  echo; echo "# PART 3: CURRENT CODE (exact files)"
  for f in package.json tsconfig.json next.config.ts postcss.config.mjs AGENTS.md .env.example; do emit "$f"; done
  find src -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.css' \) ! -path 'src/app/design-system/*' | sort | while read -r f; do emit "$f"; done
  echo; echo "# PART 4: FILE TREE"
  find src public docs -type f ! -name '.DS_Store' | sort
} > "$OUT"
echo "Created $OUT"; wc -c "$OUT"