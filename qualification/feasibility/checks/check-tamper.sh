#!/bin/sh
# check-tamper.sh — tamper-detection witnesses (non-inference, local only).
# Copies qualification/feasibility to disposable temp dirs, applies one
# tamper per copy, and asserts verify-mode check-identities.mjs FAILS
# (non-zero exit) without regenerating any manifest. A pristine control copy
# must verify exit 0. Temp dirs only; never touches the worktree or project
# refs.
set -eu
SRC=$(cd "$(dirname "$0")/.." && pwd)
failures=0

run_verify() {
  # $1=dir -> prints exit code
  (cd "$1" && node checks/check-identities.mjs >/dev/null 2>&1); echo $?
}

echo "== TAMPER-CONTROL-01: pristine disposable copy verifies =="
C0=$(mktemp -d); cp -r "$SRC" "$C0/feas"
if [ "$(run_verify "$C0/feas")" = "0" ]; then echo "PASS pristine copy verifies"; else echo "FAIL pristine copy did not verify"; failures=$((failures+1)); fi
rm -rf "$C0"

echo "== TAMPER-FIXTURE-01: corpus mutation detected =="
C1=$(mktemp -d); cp -r "$SRC" "$C1/feas"
printf '\n' >> "$C1/feas/fixtures/negative-metadata-corpus.json"
if [ "$(run_verify "$C1/feas")" != "0" ]; then echo "PASS fixture tampering detected"; else echo "FAIL fixture tampering NOT detected"; failures=$((failures+1)); fi
rm -rf "$C1"

echo "== TAMPER-HARNESS-01: harness mutation detected =="
C2=$(mktemp -d); cp -r "$SRC" "$C2/feas"
printf '\n# tamper\n' >> "$C2/feas/checks/check-csprng.mjs"
if [ "$(run_verify "$C2/feas")" != "0" ]; then echo "PASS harness tampering detected"; else echo "FAIL harness tampering NOT detected"; failures=$((failures+1)); fi
rm -rf "$C2"

echo "== TAMPER-OBS-01: helper-observation digest mutation detected =="
C3=$(mktemp -d); cp -r "$SRC" "$C3/feas"
python3 - "$C3/feas/probe-package/HELPER_IDENTITY.json" <<'EOF'
import json,sys
p=sys.argv[1]
o=json.load(open(p))
o['sha256_observed']='0'*64
json.dump(o,open(p,'w'),indent=2)
EOF
if [ "$(run_verify "$C3/feas")" != "0" ]; then echo "PASS helper-observation tampering detected"; else echo "FAIL helper-observation tampering NOT detected"; failures=$((failures+1)); fi
rm -rf "$C3"

echo "== TAMPER-HELPER-01: helper source mutation detected =="
C4=$(mktemp -d); cp -r "$SRC" "$C4/feas"
printf '\n// tamper\n' >> "$C4/feas/probe-package/scripts/op-helper.mjs"
if [ "$(run_verify "$C4/feas")" != "0" ]; then echo "PASS helper source tampering detected"; else echo "FAIL helper source tampering NOT detected"; failures=$((failures+1)); fi
rm -rf "$C4"

if [ "$failures" -gt 0 ]; then echo "TAMPER CHECKS: $failures failure(s)"; exit 1; fi
echo "TAMPER CHECKS: control verifies; all 4 tamper classes detected (manifests never regenerated to pass)"
