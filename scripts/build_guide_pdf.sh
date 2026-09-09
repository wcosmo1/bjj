#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
npx tsx scripts/export_guide_content.mjs
if [[ -x /workspace/.venv-pdf/bin/python ]]; then
  PY=/workspace/.venv-pdf/bin/python
elif command -v python3 >/dev/null; then
  PY=python3
else
  echo "No Python found" >&2
  exit 1
fi
"$PY" scripts/generate_guide_pdf.py
