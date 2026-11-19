#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
A="$HOME/Desktop/HANDOFF-1.md"
B="$HOME/Desktop/HANDOFF-2.md"
emit() { echo; echo "=== $1 ==="; cat "$1"; }
{
  echo "# HANDOFF FILE 1 OF 2: READ ALL OF THIS BEFORE REPLYING"
  echo "# File 2 (HANDOFF-2.md) holds the code of the Home sections and src/data/home.ts. Read both files."
  echo; echo "# PART 1: RULES"; cat docs/MASTER_PROMPT.md
  echo; echo "# PART 2: PROGRESS AND DECISIONS"; cat docs/PROGRESS.md
  echo; echo "## OPEN TODOs (auto-generated from the code)"
  grep -rn "TODO(" src || echo "none"
  echo; echo "# PART 3A: CONFIG AND SHARED CODE (exact files)"
  for f in package.json tsconfig.json next.config.ts postcss.config.mjs AGENTS.md .env.example; do emit "$f"; done
  find src -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.css' \) ! -path 'src/app/design-system/*' ! -path 'src/components/sections/home/*' ! -path 'src/data/home.ts' | sort | while read -r f; do emit "$f"; done
  echo; echo "# PART 4: FILE TREE"
  find src public docs -type f ! -name '.DS_Store' | sort
} > "$A"
{
  echo "# HANDOFF FILE 2 OF 2: HOME SECTION CODE (read together with HANDOFF-1.md)"
  echo; echo "# PART 3B: SECTIONS AND HOME DATA (exact files)"
  find src/components/sections/home -type f | sort | while read -r f; do emit "$f"; done
  emit src/data/home.ts
} > "$B"
echo "Created $A and $B"; wc -c "$A" "$B"