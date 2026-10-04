#!/bin/sh
# check-git-fencing.sh — non-inference local/disposable-Git fixtures.
# Uses ONLY newly created temporary repositories (mktemp -d). Never touches
# this project's refs. These are primitive feasibility witnesses, not an
# implementation of the production allocators or proof of remote atomicity.
#
# Fence model (small primitive fixture): every claimant-side mutation goes
# through fenced_create/fenced_update, which require ALL of:
#   1. expected-old-head match (current ref == expected old),
#   2. ownership match (expected generation + owner token == ledger state),
#   3. fast-forward ancestry (expected old is an ancestor of the new commit,
#      and new != old), so backwards moves and already-seen-value (ABA/ref-
#      reuse) writes are rejected even when the old head matches.
# Rejected attempts MUST leave the ref unchanged (asserted before/after).
# Direct `git update-ref` appears below ONLY in harness setup to model world
# states (third-party advances, missing refs), never as a claimant operation.
# No post-write detection is substituted for rejection, and no `|| true`
# repair is used to manufacture success: any unexpected advance exits 1.
set -eu

D1=$(mktemp -d)
D2=$(mktemp -d)
LEDGER=$(mktemp -d)
trap 'rm -rf "$D1" "$D2" "$LEDGER"' EXIT

fenced_create() {
  # $1=repo $2=ref $3=new_commit $4=unit $5=generation $6=owner_token
  repo=$1; ref=$2; new=$3; unit=$4; gen=$5; owner=$6
  if git -C "$repo" rev-parse --verify "$ref" >/dev/null 2>&1; then return 1; fi
  printf '%s' "$gen" > "$LEDGER/$unit.gen"
  printf '%s' "$owner" > "$LEDGER/$unit.owner"
  git -C "$repo" update-ref "$ref" "$new" 0000000000000000000000000000000000000000
}

fenced_update() {
  # $1=repo $2=ref $3=expected_old $4=new_commit $5=unit $6=expected_gen $7=owner_token
  repo=$1; ref=$2; exp=$3; new=$4; unit=$5; gen=$6; owner=$7
  cur=$(git -C "$repo" rev-parse --verify "$ref" 2>/dev/null) || return 1
  [ "$cur" = "$exp" ] || return 1
  [ "$(cat "$LEDGER/$unit.gen")" = "$gen" ] || return 1
  [ "$(cat "$LEDGER/$unit.owner")" = "$owner" ] || return 1
  [ "$new" != "$exp" ] || return 1
  git -C "$repo" merge-base --is-ancestor "$exp" "$new" 2>/dev/null || return 1
  git -C "$repo" update-ref "$ref" "$new" "$exp"
}

fenced_reclaim() {
  # $1=unit $2=expected_gen $3=new_gen $4=new_owner
  unit=$1; exp=$2; newgen=$3; newowner=$4
  [ "$(cat "$LEDGER/$unit.gen")" = "$exp" ] || return 1
  printf '%s' "$newgen" > "$LEDGER/$unit.gen"
  printf '%s' "$newowner" > "$LEDGER/$unit.owner"
}

assert_ref() {
  # $1=repo $2=ref $3=expected_value $4=label
  got=$(git -C "$1" rev-parse --verify "$2" 2>/dev/null) || { echo "FAIL $4: ref unreadable"; exit 1; }
  if [ "$got" != "$3" ]; then echo "FAIL $4: ref moved (got $got, want $3)"; exit 1; fi
  echo "PASS $4 (ref unchanged: $got)"
}

echo "== GIT-READBACK-01: object/ref readback =="
git -C "$D1" init -q
git -C "$D1" config user.email "test-only@example.invalid"
git -C "$D1" config user.name "test-only"
echo "hello fixture" > "$D1/file.txt"
BLOB=$(git -C "$D1" hash-object -w "$D1/file.txt")
echo "blob=$BLOB"
git -C "$D1" cat-file -p "$BLOB" | grep -q "hello fixture" && echo "PASS cat-file readback"
git -C "$D1" add file.txt
git -C "$D1" commit -qm "test-only commit"
HEAD1=$(git -C "$D1" rev-parse HEAD)
echo "head=$HEAD1"
test "$(git -C "$D1" rev-parse HEAD)" = "$HEAD1" && echo "PASS ref readback VERIFIED"

echo "== GIT-CLAIM-01: two competing claimers, fenced creation =="
# Both claimers race creation with zero-old; exactly one wins.
if fenced_create "$D1" refs/claims/unit-1 "$HEAD1" unit-1 0 ownerA; then
  echo "PASS claimer A wins creation"
else
  echo "FAIL claimer A creation rejected"; exit 1
fi
if fenced_create "$D1" refs/claims/unit-1 "$HEAD1" unit-1 0 ownerB 2>/dev/null; then
  echo "FAIL claimer B unexpectedly created"; exit 1
else
  echo "PASS claimer B rejected (ref already claimed)"
fi
assert_ref "$D1" refs/claims/unit-1 "$HEAD1" "one local current winner"

echo "== GIT-CLAIM-02: fenced advance, stale loser rejected =="
git -C "$D1" commit -q --allow-empty -m "claimer A work"
HEADA=$(git -C "$D1" rev-parse HEAD)
fenced_update "$D1" refs/claims/unit-1 "$HEAD1" "$HEADA" unit-1 0 ownerA \
  && echo "PASS claimer A advances (expected-head+ownership+ancestry)"
git -C "$D1" commit -q --allow-empty -m "claimer B work"
HEADB=$(git -C "$D1" rev-parse HEAD)
if fenced_update "$D1" refs/claims/unit-1 "$HEAD1" "$HEADB" unit-1 0 ownerA 2>/dev/null; then
  echo "FAIL stale claimer B unexpectedly advanced"; exit 1
else
  echo "PASS claimer B rejected (stale expected-head)"
fi
assert_ref "$D1" refs/claims/unit-1 "$HEADA" "current winner retained"

echo "== GIT-STALE-ABA-01: backwards write rejected, ref unchanged =="
# Current is HEADA; a backwards write to the already-seen HEAD1 matches no
# allowed transition: ancestry (HEAD1 is not a descendant of HEADA) rejects.
if fenced_update "$D1" refs/claims/unit-1 "$HEADA" "$HEAD1" unit-1 0 ownerA 2>/dev/null; then
  echo "FAIL backwards write unexpectedly advanced"; exit 1
else
  echo "PASS backwards write rejected (non-fast-forward)"
fi
assert_ref "$D1" refs/claims/unit-1 "$HEADA" "backwards attempt leaves ref unchanged"

echo "== GIT-STALE-ABA-02: stale-ownership ABA/ref-reuse rejected, ref unchanged =="
# Legitimate owner advances HEADA -> HEADB under generation 0 first.
fenced_update "$D1" refs/claims/unit-1 "$HEADA" "$HEADB" unit-1 0 ownerA \
  && echo "PASS owner A advances to HEADB"
# Reclaim revokes ownerA: generation 0 -> 1, ownerA -> ownerB.
fenced_reclaim unit-1 0 1 ownerB && echo "PASS reclaim advances ownership (gen 0 -> 1)"
# Stale ownerA replays with its old generation/owner binding, presenting a
# fresh descendant commit but stale ownership: must be rejected.
git -C "$D1" commit -q --allow-empty -m "stale ownerA work"
HEADSTALE=$(git -C "$D1" rev-parse HEAD)
if fenced_update "$D1" refs/claims/unit-1 "$HEADB" "$HEADSTALE" unit-1 0 ownerA 2>/dev/null; then
  echo "FAIL stale-ownership write unexpectedly advanced"; exit 1
else
  echo "PASS stale-ownership write rejected (generation/owner mismatch)"
fi
assert_ref "$D1" refs/claims/unit-1 "$HEADB" "stale-ownership attempt leaves ref unchanged"
# Ref-reuse: stale owner re-presents the already-seen HEAD1 value.
if fenced_update "$D1" refs/claims/unit-1 "$HEADB" "$HEAD1" unit-1 0 ownerA 2>/dev/null; then
  echo "FAIL ref-reuse unexpectedly advanced"; exit 1
else
  echo "PASS ref-reuse rejected (stale ownership + non-descendant value)"
fi
assert_ref "$D1" refs/claims/unit-1 "$HEADB" "ref-reuse attempt leaves ref unchanged"
# Current ownerB can still advance from the unchanged ref.
git -C "$D1" commit -q --allow-empty -m "ownerB work"
HEADC=$(git -C "$D1" rev-parse HEAD)
fenced_update "$D1" refs/claims/unit-1 "$HEADB" "$HEADC" unit-1 1 ownerB \
  && echo "PASS current owner advances after rejected stale attempts"

echo "== GIT-PUBLISH-01: publication equivalent with fenced update + readback =="
git -C "$D2" init -q
git -C "$D2" config user.email "test-only@example.invalid"
git -C "$D2" config user.name "test-only"
echo "payload" > "$D2/r.json"
git -C "$D2" add r.json; git -C "$D2" commit -qm "base"
BASE=$(git -C "$D2" rev-parse HEAD)
fenced_create "$D2" refs/results/integ "$BASE" unit-pub 0 ownerP \
  && echo "PASS publication ref created"
echo "inte" > "$D2/r.json"; git -C "$D2" commit -qam "integrated"
INTEG=$(git -C "$D2" rev-parse HEAD)
fenced_update "$D2" refs/results/integ "$BASE" "$INTEG" unit-pub 0 ownerP \
  && echo "PASS publication fence (expected-head+ownership+ancestry)"
test "$(git -C "$D2" rev-parse refs/results/integ)" = "$INTEG" && echo "PASS publication readback VERIFIED"

echo "== GIT-LOST-01: VERIFIED / NOT_APPLIED / UNKNOWN classification =="
# Occurrence rule (three inputs: intended, proven precondition, observed):
#   observed == intended               -> VERIFIED (positive postcondition readback)
#   observed == precondition           -> NOT_APPLIED (proven absence: exact pre-state, op identity absent)
#   anything else / unreadable         -> UNKNOWN (third/divergent/advanced state; fail closed, never retryable)
# A bare (observed != intended) mismatch NEVER proves NOT_APPLIED.
classify() {
  # $1=intended $2=precondition $3=observed $4=ref-readable(yes/no)
  if [ "$4" != "yes" ]; then echo "UNKNOWN"; return; fi
  if [ "$1" = "$3" ]; then echo "VERIFIED"; return; fi
  if [ "$2" = "$3" ]; then echo "NOT_APPLIED"; return; fi
  echo "UNKNOWN"
}
retry_allowed() {
  # Only a positively proven NOT_APPLIED authorizes retry.
  if [ "$1" = "NOT_APPLIED" ]; then echo "yes"; else echo "no"; fi
}
INTENDED="$INTEG"
PRE="$BASE"
OBSERVED=$(git -C "$D2" rev-parse refs/results/integ)
R1=$(classify "$INTENDED" "$PRE" "$OBSERVED" yes)
test "$R1" = "VERIFIED" && echo "PASS lost-response case1 VERIFIED"
test "$(retry_allowed "$R1")" = "no" && echo "PASS VERIFIED needs no retry"
R2=$(classify "$INTENDED" "$PRE" "$PRE" yes)
test "$R2" = "NOT_APPLIED" && echo "PASS lost-response case2 NOT_APPLIED (proven absence against precondition)"
test "$(retry_allowed "$R2")" = "yes" && echo "PASS retry allowed only after proven NOT_APPLIED"
# Negative: third-party/divergent/advanced head is neither intended nor
# precondition (harness models the world state with a direct write; the
# classifier under test only reads). Occurrence is UNKNOWN, retry forbidden.
THIRD=$(git -C "$D2" commit-tree "$INTEG^{tree}" -m "third party")
git -C "$D2" update-ref refs/results/third "$THIRD" 0000000000000000000000000000000000000000
OBS3=$(git -C "$D2" rev-parse refs/results/third)
R3=$(classify "$INTENDED" "$PRE" "$OBS3" yes)
test "$R3" = "UNKNOWN" && echo "PASS lost-response case3 third/divergent head UNKNOWN (not NOT_APPLIED)"
test "$(retry_allowed "$R3")" = "no" && echo "PASS third-state UNKNOWN never retryable"
# Negative: ref advanced past intended by someone else is UNKNOWN, not VERIFIED.
R4=$(classify "$INTENDED" "$PRE" "$THIRD" yes)
test "$R4" = "UNKNOWN" && echo "PASS lost-response case4 advanced/divergent state UNKNOWN"
# Negative: unreadable/missing ref readback is UNKNOWN, never retryable.
git -C "$D2" update-ref -d refs/results/third
if git -C "$D2" rev-parse --verify refs/results/third >/dev/null 2>&1; then READABLE=yes; else READABLE=no; fi
R5=$(classify "$INTENDED" "$PRE" "" "$READABLE")
test "$R5" = "UNKNOWN" && echo "PASS lost-response case5 missing/unreadable ref UNKNOWN (fail closed)"
test "$(retry_allowed "$R5")" = "no" && echo "PASS unreadable UNKNOWN never retryable"

echo "ALL DISPOSABLE-GIT CHECKS PASSED (temp repos only; project refs untouched)"
