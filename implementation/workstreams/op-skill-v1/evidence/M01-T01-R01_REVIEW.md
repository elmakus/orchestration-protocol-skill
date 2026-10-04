# M01-T01 independent implementation Review — attempt R01 (reviewer role, 2026-10-04)

## Attempt identity and independence

- Review attempt: `implementation/workstreams/op-skill-v1/reviews/M01-T01-R01.toml`
  (`M01-T01`, attempt `R01`, verdict `pending` at review time).
- Frozen subject reviewed (exact, unmodified by this review):
  `elmakus/orchestration-protocol-skill@b89c7a2b9f3e3d65f28deff0486d2b2b2e44e7e2:implementation/workstreams/op-skill-v1/results/M01-T01.md`,
  blob `607abe772a8889c2b2bf4c5fbfffd3db414d49de`.
- Acceptance contract (stable, unchanged):
  `implementation/workstreams/op-skill-v1/cards/M01-T01.md`.
- Semantic independence: this review was produced in a fresh context that did
  not execute or repair the reviewed implementation or normalized result.
  Producer evidence (`M01-T01_IMPLEMENTATION.md`) and the Main reconciliation
  in the result artifact were treated as data only, never as a verdict. No
  repair, no downstream obligation, no other subject was touched.

## Authority recovered (durable sources, read before verdict)

- Workstream/router: `implementation/workstreams/op-skill-v1/WORKSTREAM.toml`
  (branch `feat/op-skill-v1`), canonical router
  `implementation/workstreams/op-skill-v1/TASK_BOARD.toml` (revision 3, Card
  `M01-T01` `in_progress`, frozen result commit/blob as above, review attempt
  `R01` registered, JIT trigger `M01-live-feasibility-after-kit` `waiting`).
- Definition authority `DEFINITION.toml` (R8, `green`, Premium A satisfied);
  Card authority refs (R8, P1 §§2–3/M01/§6/risk table, R1 /
  coordinator-opacity / additional-review-red / R3 decisions).
- Normalized result `results/M01-T01.md` (exact return: impl commit
  `37995636ffad89e8711aae31d04607e74e450419`, subtree
  `qualification/feasibility@5dcd542127a1d027794a009c8e479be29570561e`,
  evidence blob `f67bff1be14d5fae49aa7994405cea3f0e08af3e`, package
  `072a5224…f9d3bf`, oracle-set `8291748a…66e6e09`, helper
  `667673ac…22e93f7` API `0.1.0-testonly`).

## Frozen-subject integrity (reproduced)

- `git ls-tree b89c7a2:results/M01-T01.md` = blob `607abe77…414d49de`;
  working-tree file hashes to the same blob; unchanged since freeze.
- `git ls-tree 3799563:qualification/feasibility` = tree
  `5dcd5421…950561e`; evidence file at that commit hashes to blob
  `f67bff1b…08af3e`; both manifests hash to the result-cited blobs
  (`6f6c623a…80437`, `37152cdb…406e153`). All result-cited identities match.
- Card stable: no Card change between impl commit, frozen commit and review
  HEAD. Diffs confirm: `3799563..b89c7a2` touches only `results/M01-T01.md`;
  `b89c7a2..HEAD(e353b45)` touches only `TASK_BOARD.toml` + review freeze.
  Review HEAD is clean (`git status --short` empty before this file).

## Independent reproduction (allowed local checks only; no LLM, no native/remote)

From worktree root on `e353b45`, all exit 0, matching the result's claims:

```sh
node --check qualification/feasibility/probe-package/scripts/op-helper.mjs  # OK
sh -n qualification/feasibility/checks/check-git-fencing.sh qualification/feasibility/checks/check-tamper.sh qualification/feasibility/checks/run-all.sh  # OK
sh qualification/feasibility/checks/run-all.sh  # EXIT=0, RUN-ALL COMPLETE
```

- §1/5 identities: package `072a5224…f9d3bf`, oracle-set `8291748a…66e6e09`,
  helper linkage digest+API verified; byte-identical on rerun.
- §2/5 CSPRNG: 128-bit issuance authorized (`SIM_CLAIM_OK`); self-labelled /
  foreign-registry acquire nothing (`NONCE_ORIGIN_UNPROVEN`); weak /
  predictable / short / unqualified / unavailable / injected-failure blocked;
  failure path mints nothing. Random output excluded from byte equality.
- §3/5 metadata: 6 synthetic negatives REJECTED with id+channel+verdict+code
  only (no payload echo observed in output lines); positive admitted;
  `SCOPE-LIMIT-01` flagged `OUT_OF_SCOPE` (bounded, non-universal).
- §4/5 disposable Git (fresh `mktemp -d` repos, `trap rm -rf`; project refs
  untouched): one local current winner; stale/backwards (`GIT-STALE-ABA-01`,
  non-fast-forward) / stale-ownership / ref-reuse rejected with refs asserted
  byte-identical before/after; `VERIFIED` / proven-`NOT_APPLIED` /
  third-advanced-missing-`UNKNOWN` (never retryable) all pass.
- §5/5 tamper: pristine control verifies; all 4 tamper classes
  (fixture/harness/helper-observation/helper-source) detected nonzero.
- Static audit line passes; independent `grep` audit confirms helper imports
  only `node:crypto` (`randomBytes`, `createHash`); no runtime
  `fetch/http/net/child_process`/GitHub calls; no credential/token/key
  handling (hits are doc comments + the bounded rejection regex itself); no
  scheduling; no semantic/authority logic. Direct `git update-ref` occurs only
  in harness setup (zero-old creation, world-state modeling) and inside the
  `fenced_*` primitive; every claimant mutation requires expected-old-head +
  generation/owner-ledger + fast-forward ancestry (`merge-base --is-ancestor`,
  new != old), with no `|| true` repair.
- `sha256sum` recomputation of all 3 package + 10 oracle inputs matches the
  manifests exactly. No source contains its own asserted digest (acyclic;
  manifests/observations/evidence/`.git` excluded from inputs); verification
  never regenerates manifests.
- Changed-path allowlist: `936efde..3799563 --name-only` lists only
  `qualification/feasibility/**` + the single declared evidence file. No
  Card/Task Board/manifest/result/review/blocker edits by implementation.

## Acceptance-witness coverage (all hold)

1. Inventory/identities reproducible; package fields observed or UNKNOWN —
   HOLD. `plugin.json` fields each carry an observed source or explicit
   UNKNOWN/BLOCKED (`PACKAGE_OBSERVATIONS.md` table); manifests verify
   byte-identical. (One stale truncated helper digest in that doc, see
   finding O1 — non-blocking; authoritative identities verify.)
2. Deterministic local commands byte-identical for identical inputs —
   HOLD (§1/5 rerun identical; randomness/disposable hashes excluded by design).
3. Disposable Git proves one winner + rejection/classification; nothing
   presented as provider proof — HOLD (§4/5 + explicit matrix/procedure
   non-assertions).
4. Synthetic metadata rejected without echo; native inventory incomplete —
   HOLD (no echo in outputs; `tested_scope` + `SCOPE-LIMIT-01`; matrix row 13
   BLOCKED native).
5. Matrix covers every required M01 predicate; local vs BLOCKED vs FAIL
   distinguished; no global/Q9/Q10/production PASS — HOLD (16 rows covering
   installation, invocation, ESM/CSPRNG, reads, fenced writes, release policy,
   authority/currentness, consume-time reads, repair-write fencing,
   context-source categories, metadata channels, owner disposition, local
   determinism, hygiene; all native predicates BLOCKED; zero FAIL).
6. Procedure concrete enough for next Execution Prep binding — HOLD
   (`NATIVE_PROCEDURE.md` P0–P4 prerequisites + N1–N11 steps; `TEST_ENVELOPE.md`
   binds separate package/helper-linkage/fixture-set identities,
   owner-declared account/device scope, disposable targets, complete effects,
   three-way readback rule, guarded realization; chooses no account, requests
   no blanket permission, fabricates no ACCEPTABLE).
7. Changed paths + outputs recorded in `M01-T01_IMPLEMENTATION.md`; no other
   state changed — HOLD (§§2–5 recorded; allowlist diff confirms; only
   discrepancy is finding O2, confined to evidence prose).

Deliverables 1–7 (Card): README + test-only package (root metadata, 1 probe
skill, 1 ESM helper, dated observations/uncertainty) ✓; split acyclic
package/helper/oracle identities + tamper proof ✓; issuance-gated local CSPRNG
path ✓; disposable-Git fixtures incl. 2 claimers, stale/ABA/ref-reuse,
three-way classification ✓; synthetic negative corpus + mechanical reporting
with explicit limit witness ✓; dated matrix + bounded owner-assisted procedure
✓; envelope template with owner-declared scope ✓. Exclusions honored: no
production OP surface, no M02–M09, no real LLM inference, no installed/
account/consumer/remote-write tests, no publication, no secrets, no native
PASS inferred (every native predicate BLOCKED; remaining native/owner inputs
correctly returned as the JIT-gated blocker, not a local FAIL).

## Findings (non-blocking; neither breaks acceptance nor asserts a defect in the result)

- O1 (observation staleness, minor): `PACKAGE_OBSERVATIONS.md:36` records the
  helper as `ef4265c7…3bc1803` — the digest of the superseded initial return
  (`5331849` helper hashes exactly to `ef4265c7…1803`); the corrected helper
  is `667673ac…22e93f7` as correctly cited in `HELPER_IDENTITY.json`, both
  manifests, the evidence §2 and the normalized result. Authoritative
  identities verify; only this one observation row is stale.
- O2 (evidence transcription variance, minor): implementation evidence §3.2
  records `NEG-RECEIPT-01` code `META_SEMANTIC_VALUE`; the current harness +
  corpus emit `META_SEMANTIC_KEY` (receipt path goes through
  `validateCoordinatorMetadata`). The harness asserts verdict (`REJECTED`),
  which holds in both; suite is green; the normalized result does not repeat
  per-case codes. Confined to evidence prose.

## Verdict

**GREEN for attempt R01 on the exact frozen subject**
`b89c7a2b9f3e3d65f28deff0486d2b2b2e44e7e2:results/M01-T01.md@607abe77…414d49de`
against the unchanged Card contract. The bounded feasibility kit satisfies the
complete M01-T01 acceptance surface; local checks reproduce exit 0 with the
cited identities; all native predicates remain correctly BLOCKED for the
predecessor-dependent JIT obligation. This review changes nothing else; Main
owns reconciliation, Task Board/manifest/result/review-state writes and all
subsequent routing.
