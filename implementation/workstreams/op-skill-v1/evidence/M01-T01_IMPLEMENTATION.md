# M01-T01 implementation evidence (worker role, 2026-10-04)

- Card: `implementation/workstreams/op-skill-v1/cards/M01-T01.md` (M01-T01, bounded non-production feasibility kit)
- Workstream: `op-skill-v1`, branch `feat/op-skill-v1`
- Launch state commit: `6adb1e5e8598678fc3d83870c8c54ea6e1b27cd2` (verified `git rev-parse HEAD` at implementation time; still the base, no tracked-file mutation)
- Authority: `requirements/OP_SKILL_V1.md` (R8), `planning/OP_SKILL_V1_PLAN_P1.md` (P1 §§2–3, M01, §6, risk table), decisions R1 / coordinator-opacity / additional-review-red / R3 as cited by the Card. P1 subject `a95fb6e3b940726fc75995cc552703b9e006402f:planning/OP_SKILL_V1_PLAN_P1.md@7d7e5065cd0f2596ae896efb010909fc83266811`.
- Role boundary: implements only the active M01-T01 stable contract. No edits to Cards, Task Board, manifest, planning, result, review, or blocker state. No real LLM inference tests. No live Android/account/consumer/remote-write probe.

## 1. Deliverables index (all under `qualification/feasibility/`)

| Card deliverable | File(s) |
|---|---|
| 1. README + test-only probe package (root metadata, 1 probe skill, 1 ESM helper, observations/uncertainty) | `README.md`, `probe-package/plugin.json`, `probe-package/skills/orchestration-protocol-probe/SKILL.md`, `probe-package/scripts/op-helper.mjs`, `probe-package/HELPER_IDENTITY.json`, `PACKAGE_OBSERVATIONS.md` |
| 2. Exact content/fixture identities, acyclic inputs/exclusions, reproducible checks | `fixtures/FIXTURE_MANIFEST.json` (generated), `checks/check-identities.mjs` |
| 3. Helper identity/probe + qualified-source local CSPRNG path | `probe-package/scripts/op-helper.mjs` (`auditCryptoSource`, `generateAttemptNonceHex`, `validateClaimMetadata`), `fixtures/csprng-policy.json`, `checks/check-csprng.mjs` |
| 4. Local/disposable-Git fixtures (readback, expected-head/non-force, 2 claimers, stale/ABA, VERIFIED/NOT_APPLIED/UNKNOWN) | `fixtures/claim-fixtures.json`, `checks/check-git-fencing.sh` |
| 5. Synthetic metadata-leak negative corpus + mechanical non-semantic reporting | `fixtures/negative-metadata-corpus.json`, `checks/check-metadata-leak.mjs` (+ `validateCoordinatorMetadata`/`validateBranchName` fence in helper) |
| 6. Dated capability/uncertainty matrix + bounded native procedure | `CAPABILITY_MATRIX.md`, `NATIVE_PROCEDURE.md` |
| 7. Owner-assisted test-envelope template/procedure | `TEST_ENVELOPE.md` |
| Suite runner | `checks/run-all.sh` |

## 2. Exact content identities (reproducible)

Digest algorithm: `sha256` over raw file bytes. Package identity: `sha256` over
sorted `relative-path:digest` lines for declared inputs only.

Declared inputs (acyclic; manifest/HELPER_IDENTITY/observations/harness/evidence/`.git` excluded; no source contains its own asserted digest):

- `probe-package/plugin.json`: `4852ee9d6bb25592eff4e1ee19e580b1488bfaf4dd7fee682c6e5d19db2bc0fd`
- `probe-package/skills/orchestration-protocol-probe/SKILL.md`: `67cffefd692773bc490e80602d26e8ccb526b6490cbefa89725a316ef1295293`
- `probe-package/scripts/op-helper.mjs`: `ef4265c771ab17a079fdf6db1856c3257fa81f3c2b6172dc6e321f2ad3bc1803`
- Package identity: `8517c414e260bf335272a78dd787a84da3581e41cc4e78c65ee537aaf15dd30f`

Frozen harness/observation file digests (recorded 2026-10-04, `sha256sum`):

- `fixtures/FIXTURE_MANIFEST.json`: `6a41214369e761a01de1cd0020ae68d625c62a202c5e8e3bc99d0fb945729a41`
- `fixtures/claim-fixtures.json`: `acf7d182c4775b6b48f62eb0217a6c33caf07cecb1f5dadd91371187b495299d`
- `fixtures/csprng-policy.json`: `4c28c460e5e8af5cdd7c88cf03ff9a47d2ff4e566b7eacf0261b30ac0ae1204c`
- `fixtures/negative-metadata-corpus.json`: `8744a2e9cfa782b6febf64d7bc8e5ec092bf824e5f2893a9c583e383fb292508`
- `probe-package/HELPER_IDENTITY.json`: `ae1ea38270aabfbc4b1f98fb2ad4330c48229977b90e3b4212806de7a38e7f99`
- `checks/check-identities.mjs`: `653b03a4da7895f704b303840a272befe84a6ea2cfa5712da54a00900a91316d`
- `checks/check-csprng.mjs`: `1516859b81f0a20fc1452e836bd1aa665a297b9f1e7df0c0bb6de3a3b5a74175`
- `checks/check-metadata-leak.mjs`: `c1d550638376e4c4518e8dfc741c451c1f294e4a7c9804b02a0659193c376f58`
- `checks/check-git-fencing.sh`: `2b252af6fcf4658a1e72536170bbbc2ed3c2071731715c5a5188d691c9f01eb6`
- `checks/run-all.sh`: `df61922fe08b20860a99971ef4bdb2343db1745cd074f3c7b9658f8de86e3dfb`
- `README.md`: `0b40fd55a54743c9db2fd7c62a6c40ea59e6286693eae5fdcf969f7a797aab04`
- `PACKAGE_OBSERVATIONS.md`: `3db32dd8cc78ebc04dcf506b878ab07394f777e1d9b84b2cb7016ad6212582e5`
- `CAPABILITY_MATRIX.md`: `b52e93d97723456fac574d862af0e7d853370ba28011ce1874508c6bc14ac060`
- `NATIVE_PROCEDURE.md`: `eafa78b9b97722dc85789ac29dc9ce85e6746185124fcb0c5d1ec855db62c540`
- `TEST_ENVELOPE.md`: `8bfdb451e62bc6176992ba930f380b82ce5d9c52e7be765407e4dbb746127957`

Environment: `node v22.23.3`, `git 2.39.5`.

## 3. Exact commands and terminal outputs (local, non-inference)

All commands run from the worktree root on branch `feat/op-skill-v1`. No LLM
inference, no Android/account/consumer/remote-write probe.

### 3.1 Manifest generation

Command:

```sh
node qualification/feasibility/checks/check-identities.mjs --write-manifest
```

Output:

```text
wrote /home/paseo/projects/orchestration-protocol-skill-op-skill-v1/qualification/feasibility/fixtures/FIXTURE_MANIFEST.json
```

### 3.2 Full suite (`sh qualification/feasibility/checks/run-all.sh`, exit 0)

Section 1/4 — identities (deterministic, byte-identical on rerun):

```text
{
  "per_file": {
    "probe-package/plugin.json": "4852ee9d6bb25592eff4e1ee19e580b1488bfaf4dd7fee682c6e5d19db2bc0fd",
    "probe-package/skills/orchestration-protocol-probe/SKILL.md": "67cffefd692773bc490e80602d26e8ccb526b6490cbefa89725a316ef1295293",
    "probe-package/scripts/op-helper.mjs": "ef4265c771ab17a079fdf6db1856c3257fa81f3c2b6172dc6e321f2ad3bc1803"
  },
  "package_identity_sha256": "8517c414e260bf335272a78dd787a84da3581e41cc4e78c65ee537aaf15dd30f"
}
IDENTITIES VERIFIED: byte-identical for identical explicit inputs
```

Reran `check-identities.mjs` twice more: identical `package_identity_sha256`
`8517c414…15dd30f` both times (deterministic-byte-equality holds; random
output excluded from this assertion by design).

Section 2/4 — CSPRNG local path (shape/policy assertions only, never exact random bytes):

```text
PASS csprng-source-available
PASS csprng-source-qualified-local-only
PASS nonce-shape-32hex — fresh nonce is 32 hex chars
PASS nonce-freshness-distinct — two fresh nonces differ (excluded from byte-equality)
PASS good-claim-admissible — {"verdict":"ADMISSIBLE","code":"CLAIM_OK"}
PASS reject-weak-flag — {"verdict":"REJECTED","code":"CLAIM_WEAK_SOURCE"}
PASS reject-predictable-flag — {"verdict":"REJECTED","code":"CLAIM_WEAK_SOURCE"}
PASS reject-short-nonce — {"verdict":"REJECTED","code":"NONCE_MALFORMED"}
PASS reject-constant-nonce-unqualified-source — {"verdict":"REJECTED","code":"NONCE_SOURCE_UNQUALIFIED"}
PASS reject-math-random-label — {"verdict":"REJECTED","code":"NONCE_SOURCE_UNQUALIFIED"}
PASS block-rng-unavailable — {"verdict":"BLOCKED","code":"CLAIM_RNG_UNAVAILABLE"}
CSPRNG CHECKS: all local predicates hold (local host only; native RNG BLOCKED)
```

Audit detail: `node:crypto.randomBytes` available, 16-byte probe OK, qualified
local source `node:crypto.randomBytes/qualified-local-only`, node `v22.23.3`.
Local host only; says nothing about Android availability.

Section 3/4 — synthetic metadata-leak negatives (reports carry id+channel+verdict+code only; no payload echo):

```text
{"id":"NEG-BRANCH-01","channel":"branch_name","verdict":"REJECTED","code":"META_SEMANTIC_VALUE","expect":"REJECTED"}
{"id":"NEG-COMMIT-01","channel":"commit_message","verdict":"REJECTED","code":"META_SEMANTIC_VALUE","expect":"REJECTED"}
{"id":"NEG-PATH-01","channel":"output_path","verdict":"REJECTED","code":"META_SEMANTIC_VALUE","expect":"REJECTED"}
{"id":"NEG-PROVENANCE-01","channel":"provenance_field","verdict":"REJECTED","code":"META_SEMANTIC_KEY","expect":"REJECTED"}
{"id":"NEG-RECEIPT-01","channel":"receipt_value","verdict":"REJECTED","code":"META_SEMANTIC_VALUE","expect":"REJECTED"}
{"id":"NEG-UNKNOWN-CHANNEL-01","channel":"unknown_field","verdict":"REJECTED","code":"META_UNKNOWN_CHANNEL","expect":"REJECTED"}
{"id":"POS-MECHANICAL-01","channel":"mechanical_only","verdict":"ADMISSIBLE","code":"META_OK","expect":"ADMISSIBLE"}
METADATA-LEAK CHECKS: synthetic semantic metadata rejected without echo; native channels remain unqualified
```

(Note: during implementation the initial branch validator accepted
`claims/unit-001-GREEN-finding` on grammar alone; fixed by adding a
pre-integration semantic-token fence to `validateBranchName`, helper digest
`715909a6…` → `ef4265c7…`, manifest regenerated. No PASS label was edited into
any source.)

Section 4/4 — disposable Git fencing (temp repos via `mktemp -d`; project refs untouched):

```text
== GIT-READBACK-01: object/ref readback ==
PASS cat-file readback
PASS ref readback VERIFIED
== GIT-CLAIM-01: two competing claimers, expected-old-head non-force ==
PASS claimer A wins (expected-head match)
PASS claimer B rejected (stale expected-head)
PASS one local current winner VERIFIED
== GIT-STALE-ABA-01: stale/ABA writers rejected ==
PASS stale old-generation publication rejected
NOTE ABA-shaped write moved ref; readback detects non-current lineage (recovery re-reads exact declared identity)
== GIT-PUBLISH-01: publication equivalent with expected-head fence ==
PASS publication fence (expected-head match)
PASS publication readback VERIFIED
== GIT-LOST-01: VERIFIED / NOT_APPLIED / UNKNOWN classification ==
PASS lost-response case1 VERIFIED
PASS lost-response case2 NOT_APPLIED (retry only after verified NOT_APPLIED)
PASS lost-response case3 UNKNOWN (fail closed while UNKNOWN)
ALL DISPOSABLE-GIT CHECKS PASSED (temp repos only; project refs untouched)
```

Blob/commit hashes in this section vary per run (commit timestamps) and are
not asserted byte-identical; the asserted predicates are one-winner,
stale-rejection, fence-match, and classification behavior.

Section 5/5 — helper static audit:

```text
STATIC AUDIT: no runtime network/credential/scheduling/semantic authority found in helper source
RUN-ALL COMPLETE (local only)
EXIT=0
```

Supporting syntax/help checks:

- `node --check probe-package/scripts/op-helper.mjs` → pass (no output).
- `node probe-package/scripts/op-helper.mjs --help` → prints test-only usage
  (`--audit-csprng`, `--new-nonce`, `--validate-claim`, `--validate-head`, `--canonical`).
- Helper imports: only `node:crypto` (`randomBytes`, `createHash`); check
  harnesses additionally use `node:fs`/`node:path`/`node:url` (harness-only,
  never shipped as helper authority).

## 4. Package/source inspections (violations sought: none found in scope)

- Dependencies: helper is plain ESM, no `package.json` dependencies, no
  third-party imports. Probe package ships no build step.
- Network: no runtime `fetch`, `http(s)`, `net`, `child_process`, or GitHub
  calls in `op-helper.mjs`; Git operations live only in the disposable-shell
  harness against `mktemp` repos.
- Credentials: no credential/token/key/cookie handling, storage, or logging
  in probe, helper, fixtures, or checks.
- Semantic authority: helper exposes mechanical validators + narrow CSPRNG
  generation only; no findings/severity/dedup/repair-scope/authority logic.
  The `GREEN|RED|…` strings in source are rejection-denylist fences
  (`SEMANTIC_VALUE_HINT`, branch-token fence), not emitted dispositions.
- Workflow authority: no writes to Cards, Task Board, manifest, planning,
  result, review, or blocker state; `git status` shows only the declared
  implementation/evidence paths (see §5). Leaf receipt shape is documented in
  the probe skill as mechanical-only; no lifecycle routing is emitted.

## 5. Changed-path allowlist (verified)

Allowed prefixes for this obligation:

- `qualification/feasibility/**` (implementation files)
- `implementation/workstreams/op-skill-v1/evidence/M01-T01_IMPLEMENTATION.md` (sole evidence output)

Verification (`git status --short` before commit): only untracked
`qualification/` plus this evidence file; no tracked-file modifications, no
Card/Task Board/manifest/planning/review/result/bl blocker edits. Project refs
were never altered to simulate races (harness uses `mktemp -d` temp repos
with `trap rm -rf` cleanup; confirmed `git diff --stat` empty for tracked
files and `git rev-parse HEAD` still `6adb1e5e8598678fc3d83870c8c54ea6e1b27cd2`
before commit).

## 6. Limitations (observed local facts vs unevaluated predicates)

- Local success proves dev-host mechanics only. Every native predicate in
  `CAPABILITY_MATRIX.md` rows 1–14 (installation, invocation, native ESM,
  native CSPRNG, provider fencing/readback, release policy, authority/
  currentness, consume-time reads, repair-write fencing, context-source
  isolation, installed metadata channels, owner disposition) is BLOCKED.
- No global M01 PASS, no Q9/Q10 PASS, no production-use claim. No FAIL was
  observed locally.
- Disposable-Git results are primitive feasibility witnesses, not proof of
  remote atomicity or installed-provider capability.
- Official package/docs were not fetched live (deliberately, per Card
  exclusion); proposed `plugin.json` shape is UNVERIFIED against the current
  host schema (`PACKAGE_OBSERVATIONS.md`).
- Random nonces and Git commit hashes are excluded from deterministic-byte
  equality; identity determinism was proven on the declared digest inputs.

## 7. Concrete unresolved contract blocker (for Main reconciliation)

No local implementation defect blocks this Card. The contract-level unresolved
blocker is the predecessor-dependent native/owner input set required before
any live M01 gate (canonical JIT trigger `M01-live-feasibility-after-kit`):

- Separately authorized exact candidate/fixture identities, owner-named
  disposable install/Git targets, complete allowed + causally triggered effect
  inventory, non-secret readback plan, and the environment-authorized guarded
  native test realization (`NATIVE_PROCEDURE.md` P0–P4, `TEST_ENVELOPE.md`).
- Until bound, all native predicates remain BLOCKED; this is a real
  authority/access stop, not permission for M02–M07 work and not a local FAIL.

Main reconciles Task Board/manifest/result/review state; this worker performs
no downstream obligations and no self-review.
