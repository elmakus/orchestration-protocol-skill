# M01-T01 implementation evidence (worker role, 2026-10-04)

## Main return reconciliation — initial return requires bounded correction

Initial implementation subject: `5331849938d9d86b17d72726359017a91052addd`.
Classification: incomplete/incorrect return inside the still-valid M01-T01 contract; keep the Card `in_progress`. No accepted semantic result, independent Review verdict or blocker stop is established by this section.

Main reproduced `sh qualification/feasibility/checks/run-all.sh` on that subject. Exit 0 did not establish the claimed acceptance:
- `GIT-STALE-ABA-01` actually moved the ref backwards, then attempted restoration with `|| true`, yet the suite concluded ALL PASSED. Expected-old-head CAS alone does not enforce non-force ancestry or reject ABA/ref-reuse under stale ownership.
- The lost-response classifier maps every observed identity different from intended to `NOT_APPLIED`; a third/divergent/successor state can leave operation occurrence uncertain and must not authorize retry merely by mismatch.
- In a disposable copy, appending a newline to `fixtures/negative-metadata-corpus.json` left `check-identities.mjs` exit 0. The frozen fixture/harness identity and detached helper observation are not checked by the current package-only manifest; the test envelope also conflates fixture identity with package identity.

The corrected return must provide objective negative witnesses for these cases, preserve accurate package-versus-fixture identities, and align source/procedure claims with the evidence actually evaluated. Supplied source labels or keyword denylists cannot become cryptographic-origin or universal semantic-isolation proof. Native capability predicates remain BLOCKED; this is bounded local correction, not permission for broader implementation or native tests. The initial committed subject remains historical evidence.

## Correction return — bounded worker correction (same contract, same allowlist)

- Card: `implementation/workstreams/op-skill-v1/cards/M01-T01.md` (unchanged; still `in_progress`, no semantic result or review attempt).
- Workstream: `op-skill-v1`, branch `feat/op-skill-v1`.
- Durable reconciliation base: `936efde00f05c0d059f5b6ac97d399bf86d93405` (Main's correction-required record above, preserved verbatim).
- Authority: `requirements/OP_SKILL_V1.md` (R8), `planning/OP_SKILL_V1_PLAN_P1.md` (P1 §§2–3, M01, §6, risk table), decisions R1 / coordinator-opacity / additional-review-red / R3 as cited by the Card. P1 subject `a95fb6e3b940726fc75995cc552703b9e006402f:planning/OP_SKILL_V1_PLAN_P1.md@7d7e5065cd0f2596ae896efb010909fc83266811`.
- Role boundary: bounded correction of the still-active M01-T01 execution return only, inside `qualification/feasibility/**` plus this evidence file. No edits to Cards, Task Board, manifest, planning, result, review, or blocker state. No real LLM inference tests. No native/account/consumer/remote-write tests. No downstream work. No self-review.

## Correction log (required corrections 1–5, what changed)

1. Disposable Git fence: replaced bare expected-old-head `update-ref` with a small fenced primitive (`fenced_create`/`fenced_update` in `checks/check-git-fencing.sh`) requiring expected-old-head match AND generation/owner-ledger match AND fast-forward ancestry (`merge-base --is-ancestor`, new != old). Added `GIT-CLAIM-02` (stale loser, ref unchanged), rewrote `GIT-STALE-ABA-01` (backwards write to an already-seen value rejected, ref unchanged — no move, no `|| true` repair), added `GIT-STALE-ABA-02` (true stale-ownership case: post-reclaim gen0/ownerA write with a fresh descendant value rejected; already-seen-value ref-reuse rejected; current gen1/ownerB still advances). Every rejected attempt asserts the ref byte-identical before/after. Direct `update-ref` remains only in harness setup to model world states (third-party heads, missing refs), never as a claimant operation.
2. Occurrence classification: `classify` now takes (intended, proven precondition, observed, ref-readable). VERIFIED requires observed == intended (positive postcondition readback); NOT_APPLIED requires observed == precondition with the operation identity absent (proven absence); every third/divergent/advanced/unreadable state is UNKNOWN and never retryable (`retry_allowed` yes only for proven NOT_APPLIED). Added negatives: third-party head UNKNOWN, advanced/divergent UNKNOWN, missing-ref UNKNOWN. A bare observed != intended mismatch never proves NOT_APPLIED.
3. Identities: split into `FIXTURE_MANIFEST.json` (package-content identity) and new `ORACLE_MANIFEST.json` (frozen fixture/oracle/harness-set identity, 10 inputs), plus content linkage of `HELPER_IDENTITY.json` (sha256_observed + helper_api verified against the actual helper file/source). `check-identities.mjs` verify mode checks all three and never regenerates to pass. New `checks/check-tamper.sh` proves in disposable copies: pristine control verifies; corpus / harness / helper-observation / helper-source tampering each detected (non-zero exit). `TEST_ENVELOPE.md` now binds three separate identities (package, helper-linkage, oracle set) and no longer conflates fixture-set with package identity.
4. Honest probe claims + bounded grammar: helper adds `createNonceRegistry` / `issueAttemptNonce` (audited `node:crypto.randomBytes` path, failure/injected-failure returns ok:false and mints nothing) / `authorizeLocalSimulatedClaim` (shape AND in-session issuance required). `check-csprng.mjs` proves: issued nonce authorized (`SIM_CLAIM_OK`); self-labelled predictable hex with a qualified label is shape-admitted as a value yet acquires NO authority (`NONCE_ORIGIN_UNPROVEN`); foreign/empty registry acquires nothing; weak/unavailable/injected-failure blocked. No entropy is inferred from any value. Metadata fence is explicitly bounded: corpus `tested_scope` lists exact channels/tokens; new `SCOPE-LIMIT-01` demonstrates an outside-denylist encoding the grammar admits, flagged OUT_OF_SCOPE — the denylist is a bounded fixture, not universal isolation proof.
5. Preparation scope: narrow public read-only documentation retrieval actually performed 2026-10-04 (two curl GETs, HTTP 200, bodies hashed then discarded; script-rendered shells, no usable official schema — recorded as real unavailability in `PACKAGE_OBSERVATIONS.md`, not invented compatibility). `NATIVE_PROCEDURE.md` P1 no longer mandates a substitute disposable account: the owner declares the exact intended account/device scope in the envelope authorization (procedure names nothing, grants nothing); disposable test content/targets are isolated under that separately bound owner authority. `TEST_ENVELOPE.md` mirrors this (`account_device_scope` owner-declared + `disposable_content_targets`).

## 1. Deliverables index (all under `qualification/feasibility/`)

| Card deliverable | File(s) |
|---|---|
| 1. README + test-only probe package (root metadata, 1 probe skill, 1 ESM helper, observations/uncertainty) | `README.md`, `probe-package/plugin.json`, `probe-package/skills/orchestration-protocol-probe/SKILL.md`, `probe-package/scripts/op-helper.mjs`, `probe-package/HELPER_IDENTITY.json`, `PACKAGE_OBSERVATIONS.md` |
| 2. Exact package/helper + frozen fixture/oracle/harness identities, acyclic, reproducible | `fixtures/FIXTURE_MANIFEST.json`, `fixtures/ORACLE_MANIFEST.json`, `checks/check-identities.mjs`, `checks/check-tamper.sh` |
| 3. Helper identity/probe + qualified-source *local* CSPRNG issuance path | `probe-package/scripts/op-helper.mjs` (`auditCryptoSource`, `issueAttemptNonce`, `authorizeLocalSimulatedClaim`), `fixtures/csprng-policy.json`, `checks/check-csprng.mjs` |
| 4. Local/disposable-Git fixtures (readback, fenced claim/publication, 2 claimers, stale/backwards/stale-ownership/ref-reuse, three-way occurrence) | `fixtures/claim-fixtures.json`, `checks/check-git-fencing.sh` |
| 5. Synthetic metadata-leak negative corpus (bounded `tested_scope` + limit witness) + mechanical non-semantic reporting | `fixtures/negative-metadata-corpus.json`, `checks/check-metadata-leak.mjs` (bounded fence in helper) |
| 6. Dated capability/uncertainty matrix + bounded native procedure (owner-bound scope) | `CAPABILITY_MATRIX.md`, `NATIVE_PROCEDURE.md` |
| 7. Owner-assisted test-envelope template/procedure (separate identities, owner-declared scope) | `TEST_ENVELOPE.md` |
| Suite runner | `checks/run-all.sh` |

## 2. Exact content identities (reproducible)

Digest algorithm: `sha256` over raw file bytes. Set identity: `sha256` over
sorted `relative-path:digest` lines for declared inputs only.

Package inputs (`FIXTURE_MANIFEST.json`; manifests/observations/harness/evidence/`.git` excluded; no source contains its own asserted digest):

- `probe-package/plugin.json`: `4852ee9d6bb25592eff4e1ee19e580b1488bfaf4dd7fee682c6e5d19db2bc0fd`
- `probe-package/skills/orchestration-protocol-probe/SKILL.md`: `67cffefd692773bc490e80602d26e8ccb526b6490cbefa89725a316ef1295293`
- `probe-package/scripts/op-helper.mjs`: `667673acbc79e6ea0dc9fa1ce98c648cdee5bccffb28e34e1ee12431322e93f7`
- Package identity: `072a52247419b744dde3bde2403c24edbe07d765e2015cc3212ca43d12f9d3bf`

Oracle-set inputs (`ORACLE_MANIFEST.json`; package content, both manifests, observations, evidence, `.git` excluded):

- `fixtures/negative-metadata-corpus.json`: `5eba48dec95937d1e343b3daa322c626c706bf6e402af88958072853f67b3b5f`
- `fixtures/claim-fixtures.json`: `89634a169ffbe9150b3bbde202391d6cc19fab481658f31ccdc7aab8885b7607`
- `fixtures/csprng-policy.json`: `154b62ed85c86dc848e4201662a8d16157f4bd1536117cfa05eeedd1c79e0066`
- `checks/check-identities.mjs`: `80da391edcdacd64270f6a2baf56cf4021bb40060be635cd8073da484520e94e`
- `checks/check-csprng.mjs`: `44fdda461ae7cdd5197a8932b342d9dcb3edc896410ca3ffaf4b4200443c94f6`
- `checks/check-metadata-leak.mjs`: `6f6f085b6a80f1b5b654b90420623d660b3f5ffe49b0a949d9b30278b679617b`
- `checks/check-git-fencing.sh`: `3f514e042e1ff337a5ff3587340a9e09a52b7cf251ca1aec94f4b9e55670953a`
- `checks/check-tamper.sh`: `4533a2d3212a3e6639a0c364fccaf2b9f04ade624242091915da8524cbfd2295`
- `checks/run-all.sh`: `1403ee2695d593179ee9d30293780557644ecb659b4f0c8ee0af2704e683cd7e`
- `probe-package/HELPER_IDENTITY.json`: `b39b772cdbe23cc80fc6e818af2a5ab48c776173445abeda0921de3afad4227b`
- Oracle identity: `8291748adbe7ad7bf63530bcfeb6df9ca26c390fe378a646f717ba08a66e6e09`

Helper linkage: `HELPER_IDENTITY.json` sha256_observed `667673ac…22e93f7` == actual helper digest; helper_api `0.1.0-testonly` == helper source `HELPER_API_VERSION` (both verified by `check-identities.mjs`).

Remaining file digests (recorded 2026-10-04, `sha256sum`):

- `fixtures/FIXTURE_MANIFEST.json`: `a2f264bef85b2ba6fd49e96267682425fc5aec8017035f2653c7285fc6bb8714`
- `fixtures/ORACLE_MANIFEST.json`: `109891c7bd4c4c3afa404e07bf987773f319cfc6a392851cfe094bd05f4d36db`
- `README.md`: `90b6e660fdfdd6b3789dd33dc1ea7eaf4023201fc3ddec5dc2ce658172201b96`
- `PACKAGE_OBSERVATIONS.md`: `fe50dbca26fc00ad4af513e388149f61274e5de0df0c29991c49e4320c28affc`
- `CAPABILITY_MATRIX.md`: `08b79cbefa2bfec0610d25ad9465046a5189e13c6df5f9ce2cad2aa30e626880`
- `NATIVE_PROCEDURE.md`: `40a0da9839e66f81512ee9d2fe03a9944e766fd644a5b8e6fdb97331e39ea376`
- `TEST_ENVELOPE.md`: `75a581b8d5597ccf8fb40372522a0b4504854e0b91693f5b28886b583c62bf26`

Environment: `node v22.23.3`, `git 2.39.5`.

## 3. Exact commands and terminal outputs (local, non-inference)

All commands run from the worktree root on branch `feat/op-skill-v1`. No LLM
inference, no native/account/consumer/remote-write tests.

### 3.1 Freeze actions (explicit; never used to pass verification)

```sh
node qualification/feasibility/checks/check-identities.mjs --write-manifest --write-oracles
```

```text
wrote .../qualification/feasibility/fixtures/FIXTURE_MANIFEST.json
wrote .../qualification/feasibility/fixtures/ORACLE_MANIFEST.json
```

### 3.2 Full suite (`sh qualification/feasibility/checks/run-all.sh`, exit 0)

Section 1/5 — package + oracle set + helper linkage (deterministic, byte-identical on rerun):

```text
PACKAGE IDENTITIES VERIFIED
ORACLE-SET IDENTITIES VERIFIED
HELPER LINKAGE VERIFIED (digest+API)
IDENTITIES VERIFIED: package, oracle set, and helper linkage byte-identical for identical explicit inputs
```

Package identity `072a5224…f9d3bf`; oracle identity `8291748a…66e6e09` (full per-file digests in §2).

Section 2/5 — CSPRNG issued-authority path (shape/issuance/policy only, never exact random bytes):

```text
PASS csprng-source-available
PASS csprng-source-qualified-local-only
PASS issue-ok
PASS nonce-shape-32hex — issued nonce is 32 hex chars
PASS nonce-freshness-distinct — two issued nonces differ (excluded from byte-equality)
PASS issued-claim-authorized — {"verdict":"ADMISSIBLE","code":"SIM_CLAIM_OK"}
PASS self-labelled-shape-admits-value-only — {"verdict":"ADMISSIBLE","code":"CLAIM_OK"}
PASS self-labelled-acquires-no-authority — {"verdict":"REJECTED","code":"NONCE_ORIGIN_UNPROVEN"}
PASS foreign-registry-acquires-no-authority — {"verdict":"REJECTED","code":"NONCE_ORIGIN_UNPROVEN"}
PASS reject-weak-flag — {"verdict":"REJECTED","code":"CLAIM_WEAK_SOURCE"}
PASS reject-predictable-flag — {"verdict":"REJECTED","code":"CLAIM_WEAK_SOURCE"}
PASS reject-short-nonce — {"verdict":"REJECTED","code":"NONCE_MALFORMED"}
PASS reject-unqualified-source — {"verdict":"REJECTED","code":"NONCE_SOURCE_UNQUALIFIED"}
PASS block-rng-unavailable — {"verdict":"BLOCKED","code":"CLAIM_RNG_UNAVAILABLE"}
PASS failure-path-blocked — {"ok":false,"code":"RNG_UNAVAILABLE_SIM"}
PASS failure-path-mints-nothing — registry size 2
CSPRNG CHECKS: issued authority only; self-labelled values acquire nothing (local host only; native RNG BLOCKED)
```

Section 3/5 — synthetic metadata-leak negatives (id+channel+verdict+code only; no payload echo):

```text
{"id":"NEG-BRANCH-01","channel":"branch_name","verdict":"REJECTED","code":"META_SEMANTIC_VALUE","expect":"REJECTED"}
{"id":"NEG-COMMIT-01","channel":"commit_message","verdict":"REJECTED","code":"META_SEMANTIC_VALUE","expect":"REJECTED"}
{"id":"NEG-PATH-01","channel":"output_path","verdict":"REJECTED","code":"META_SEMANTIC_VALUE","expect":"REJECTED"}
{"id":"NEG-PROVENANCE-01","channel":"provenance_field","verdict":"REJECTED","code":"META_SEMANTIC_KEY","expect":"REJECTED"}
{"id":"NEG-RECEIPT-01","channel":"receipt_value","verdict":"REJECTED","code":"META_SEMANTIC_VALUE","expect":"REJECTED"}
{"id":"NEG-UNKNOWN-CHANNEL-01","channel":"unknown_field","verdict":"REJECTED","code":"META_UNKNOWN_CHANNEL","expect":"REJECTED"}
{"id":"POS-MECHANICAL-01","channel":"mechanical_only","verdict":"ADMISSIBLE","code":"META_OK","expect":"ADMISSIBLE"}
{"id":"SCOPE-LIMIT-01","channel":"scope_limit_demo","verdict":"ADMISSIBLE","code":"BRANCH_OK","expect":"ADMISSIBLE-OOS","scope":"OUT_OF_SCOPE"}
METADATA-LEAK CHECKS: listed semantic encodings rejected without echo; denylist is bounded (SCOPE-LIMIT-01 OUT_OF_SCOPE); native channels remain unqualified
```

Section 4/5 — disposable Git fencing (temp repos via `mktemp -d`; project refs untouched; no `|| true` repair):

```text
== GIT-READBACK-01: object/ref readback ==
PASS cat-file readback
PASS ref readback VERIFIED
== GIT-CLAIM-01: two competing claimers, fenced creation ==
PASS claimer A wins creation
PASS claimer B rejected (ref already claimed)
PASS one local current winner (ref unchanged)
== GIT-CLAIM-02: fenced advance, stale loser rejected ==
PASS claimer A advances (expected-head+ownership+ancestry)
PASS claimer B rejected (stale expected-head)
PASS current winner retained (ref unchanged)
== GIT-STALE-ABA-01: backwards write rejected, ref unchanged ==
PASS backwards write rejected (non-fast-forward)
PASS backwards attempt leaves ref unchanged
== GIT-STALE-ABA-02: stale-ownership ABA/ref-reuse rejected, ref unchanged ==
PASS owner A advances to HEADB
PASS reclaim advances ownership (gen 0 -> 1)
PASS stale-ownership write rejected (generation/owner mismatch)
PASS stale-ownership attempt leaves ref unchanged
PASS ref-reuse rejected (stale ownership + non-descendant value)
PASS ref-reuse attempt leaves ref unchanged
PASS current owner advances after rejected stale attempts
== GIT-PUBLISH-01: publication equivalent with fenced update + readback ==
PASS publication ref created
PASS publication fence (expected-head+ownership+ancestry)
PASS publication readback VERIFIED
== GIT-LOST-01: VERIFIED / NOT_APPLIED / UNKNOWN classification ==
PASS lost-response case1 VERIFIED
PASS VERIFIED needs no retry
PASS lost-response case2 NOT_APPLIED (proven absence against precondition)
PASS retry allowed only after proven NOT_APPLIED
PASS lost-response case3 third/divergent head UNKNOWN (not NOT_APPLIED)
PASS third-state UNKNOWN never retryable
PASS lost-response case4 advanced/divergent state UNKNOWN
PASS lost-response case5 missing/unreadable ref UNKNOWN (fail closed)
PASS unreadable UNKNOWN never retryable
ALL DISPOSABLE-GIT CHECKS PASSED (temp repos only; project refs untouched)
```

Blob/commit hashes vary per run (commit timestamps) and are not asserted byte-identical; asserted predicates are fence rejection with refs unchanged, one-winner behavior, and classification/retry gating.

Section 5/5 — tamper detection (disposable copies, verify mode only):

```text
PASS pristine copy verifies
PASS fixture tampering detected
PASS harness tampering detected
PASS helper-observation tampering detected
PASS helper source tampering detected
TAMPER CHECKS: control verifies; all 4 tamper classes detected (manifests never regenerated to pass)
```

Section 6/6 — helper static audit:

```text
STATIC AUDIT: no runtime network/credential/scheduling/semantic authority found in helper source
RUN-ALL COMPLETE (local only)
EXIT=0
```

Supporting checks: `node --check probe-package/scripts/op-helper.mjs` passes; `--help` prints test-only usage; helper imports only `node:crypto` (`randomBytes`, `createHash`; harness-only `node:fs`/`node:path`/`node:url` never shipped as helper authority). During correction one shell typo (unclosed quote, `sh -n` exit 2) and one audit-strip regression (flagged own doc lines, exit 1) were caught by the suite itself, fixed in-source, and re-verified exit 0 — no manifest was regenerated to pass (regeneration preceded the final green run only as a freeze after intentional source edits, then verified).

## 4. Package/source inspections (violations sought: none found in scope)

- Dependencies: helper is plain ESM, no `package.json` dependencies, no third-party imports. No build step.
- Network: no runtime `fetch`, `http(s)`, `net`, `child_process`, or GitHub calls in `op-helper.mjs`; Git operations live only in the disposable-shell harness against `mktemp` repos. The only network in this obligation is the documented read-only docs retrieval (§6), performed by the operator (curl), never by the probe/helper.
- Credentials: no credential/token/key/cookie handling, storage, or logging in probe, helper, fixtures, or checks.
- Semantic authority: helper exposes mechanical validators + narrow issuance-gated CSPRNG generation only; no findings/severity/dedup/repair-scope/authority logic. Denylist strings are bounded rejection fences (`tested_scope`), not emitted dispositions and not universal-isolation proof.
- Workflow authority: no writes to Cards, Task Board, manifest, planning, result, review, or blocker state; `git status` shows only the declared implementation/evidence paths (see §5). Probe skill is explicitly test-only; no lifecycle routing emitted.

## 5. Changed-path allowlist (verified)

Allowed prefixes for this obligation:

- `qualification/feasibility/**` (implementation files, including new `checks/check-tamper.sh` and `fixtures/ORACLE_MANIFEST.json`)
- `implementation/workstreams/op-skill-v1/evidence/M01-T01_IMPLEMENTATION.md` (sole evidence output)

Verification (`git status --short` before commit): only modified/new paths under those two prefixes; no tracked-file modifications outside them, no Card/Task Board/manifest/planning/review/result/blocker edits. Project refs were never altered to simulate races (harness uses `mktemp -d` temp repos with `trap rm -rf` cleanup; `git diff --stat` against `936efde` lists only allowlisted paths; HEAD was `936efde00f05c0d059f5b6ac97d399bf86d93405` before this correction commit).

## 6. Limitations (observed local facts vs unevaluated predicates)

- Local success proves dev-host mechanics only. Every native predicate in `CAPABILITY_MATRIX.md` (installation, invocation, native ESM, native CSPRNG, provider fencing/readback, release policy, authority/currentness, consume-time reads, repair-write fencing, context-source isolation, installed metadata channels, owner disposition) is BLOCKED.
- No global M01 PASS, no Q9/Q10 PASS, no production-use claim. No local FAIL remains (two in-correction defects were fixed and re-verified; see §3).
- Disposable-Git results are primitive feasibility witnesses, not proof of remote atomicity or installed-provider capability. The metadata denylist is a bounded fixture fence (SCOPE-LIMIT-01 admitted OUT_OF_SCOPE by design).
- Public read-only docs retrieval was actually performed 2026-10-04: `https://developers.openai.com/` → HTTP 200, 345587 bytes, sha256 `b4c5edf0…f195f00ed0`; `https://developers.openai.com/apps-sdk/` → redirect `https://developers.openai.com/plugins`, HTTP 200, 374901 bytes, sha256 `995c7566…45165768c`. Both are script-rendered shells with no statically retrievable plugin/skill-manifest schema (`plugin.json`/`manifest`: 0 static hits); bodies discarded after hashing. Usable official schema remains UNAVAILABLE — recorded uncertainty, not compatibility. Proposed `plugin.json` shape stays UNVERIFIED.
- Random nonces and Git commit hashes are excluded from deterministic-byte equality; identity determinism was proven on the declared package + oracle inputs (byte-identical reruns).

## 7. Genuine remaining contract blocker (for Main reconciliation)

No local implementation defect remains. The contract-level remaining blocker is the predecessor-dependent native/owner input set before any live M01 gate (canonical JIT trigger `M01-live-feasibility-after-kit`):

- Separately authorized exact candidate + helper-linkage + fixture-set identities, owner-declared intended account/device scope, isolated disposable content targets under that authority, complete allowed + causally triggered effect inventory, non-secret readback plan with the three-way occurrence rule, and the environment-authorized guarded native test realization (`NATIVE_PROCEDURE.md` P0–P4, `TEST_ENVELOPE.md`).
- Until bound, all native predicates remain BLOCKED; this is a real authority/access stop, not permission for M02–M07 work and not a local FAIL.

Main reconciles Task Board/manifest/result/review state; this worker performs no downstream obligations and no self-review.
