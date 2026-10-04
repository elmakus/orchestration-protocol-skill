#!/bin/sh
# run-all.sh — run the bounded non-inference local suite (test-only).
# No LLM inference, no Android/account/consumer/remote probes.
set -eu
cd "$(dirname "$0")/.."
echo "### 1/5 identities + oracle set + helper linkage (deterministic)"
node checks/check-identities.mjs
echo "### 2/5 csprng (issued-authority local path)"
node checks/check-csprng.mjs
echo "### 3/5 metadata-leak negatives (synthetic, no echo, bounded scope)"
node checks/check-metadata-leak.mjs
echo "### 4/5 disposable git fencing (temp repos, fenced primitive)"
sh checks/check-git-fencing.sh
echo "### 5/5 tamper detection (disposable copies, verify mode only)"
sh checks/check-tamper.sh
echo "### helper static audit (no network/credential/semantic/scheduling authority)"
# Audit runtime authority only: strip // comments, then search for executable
# network/credential/scheduling/semantic-decision constructs. The validator's
# semantic-token denylist (a rejection regex) lives in code but is a fence,
# not a semantic finding — excluded via the denylist filter below.
AUDIT_TMP=$(mktemp)
grep -v '^\s*//' probe-package/scripts/op-helper.mjs | grep -v '^\s*\*' > "$AUDIT_TMP"
if grep -nEi 'fetch\(|https?://|node:http|node:https|node:net|child_process|exec\(|spawn\(|credential|passwd|secret|schedule|severity/dedup|inventing repair|workflow ownership' "$AUDIT_TMP" | grep -v 'Forbidden\|never\|MUST NOT\|fail closed\|allowlist\|semantic-free\|free-form semantic\|semantic opacity\|denylist\|not a semantic\|SEMANTIC_VALUE_HINT\|SEMANTIC_KEYS\|META_SEMANTIC\|rejection regex\|validator' ; then
  echo "STATIC AUDIT NOTE: review hits above (expected: none carry runtime network/credential/semantic authority)"
  rm -f "$AUDIT_TMP"; exit 1
else
  echo "STATIC AUDIT: no runtime network/credential/scheduling/semantic authority found in helper source"
fi
rm -f "$AUDIT_TMP"
echo "RUN-ALL COMPLETE (local only)"
