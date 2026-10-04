# M03-T01 — implementation evidence return

- Card ID: `M03-T01`
- Worktree: `/home/paseo/projects/orchestration-protocol-skill-op-skill-v1`, branch `feat/op-skill-v1`
- Launch HEAD: `92d4b460c42f21a68e77339ff5240e86c9eaf9b8`; Board rev 12, M01/M02 DONE, M03 in_progress without result/Review
- Date: 2026-10-04
- Role: sole-source implementation writer only. NOT Main/reviewer/qualification tester. No Task Board/result/Review/blocker record is created here; Main alone reconciles. No push, no policy/config/host changes, no delegation.

## Delivered scope (allowed surface only)

New product files:

- `skills/orchestration-protocol/scripts/op-helper.mjs` (git blob `dba6d84c536596934dad36c05e9ad281fcc66141`, raw sha256 `30f88d58412d72a901638aed4e80390d8ef78a1cdb2328adeed0a2c22041c6c0`, 59123 bytes) — the only executable helper, dependency-free no-build ESM (`op-helper-api/1.0.0`), standard built-ins only (fs, path, crypto, zlib, url).
- `skills/orchestration-protocol/manifests/helper-manifest.json` (blob `ab4830a775076c6e8ca6f01470ac1c5461f49d96`) — detached data identity manifest for the helper (api, sha256, length, commands, forbids, acyclic note).
- `skills/orchestration-protocol/references/finite-claim-substrate.md` (blob `a8b00f895509ff0033f4833b871d5cd769f58b9b`) — sole finite-claim-substrate owner (`1.0.0`, 12 finite- domains), complete ledger/DAG, manifest/generation/ownership, qualified-source nonce interface, publication/reclaim/operation recovery, one conditional-write model, proposed manual/native procedures.
- `skills/orchestration-protocol/templates/finite-publication.example.json` (blob `7b6ae6e0d47f327902a22ec09f90ef53122339fc`) — synthetic update (expect-head) + initial (expect-absent) publications.
- `skills/orchestration-protocol/templates/finite-operation.example.json` (blob `67194b52f9d0660b406f5a0a65733ab032160bdf`) — synthetic VERIFIED / NOT_APPLIED / UNKNOWN operation shapes.
- `tests/build/check-m03.mjs` (blob `24bdc3f6d2a4332b0dfe4e8711f423be886a4061`) — M03 helper/finite build check.
- This sole evidence file: `implementation/workstreams/op-skill-v1/evidence/M03-T01_IMPLEMENTATION.md` (declared A1 evidence surface).

Modified allowed coherence surface (per-file git blobs pre-freeze):

- `README.md` `497c7fa97454cced62169bc4d1c42d598f1edc95`
- `plugin.json` `f8268f7eddaa3f82482575f72ac82a55a7d5c90a` (`0.3.0-m03`, finite implemented)
- `skills/orchestration-protocol/SKILL.md` `2bf04dfb6a7a78193ad664b5c8afa0371d98e6af` (`0.3.0-m03`, finite implemented)
- `skills/orchestration-protocol/manifests/compatibility-manifest.json` `338a898679943fca2221cea53b4e9a73976e3d62` (`compat:0.3.0-m03`, finite implemented, `helper_api: op-helper-api/1.0.0`, templates digest `949cc341067443433b78e2e424d0f5fcaabd09d5514d3a3fdcba0b95bf0bae3d`)
- `skills/orchestration-protocol/manifests/content-manifest.json` `dd7c98a5c4559eeed6c95a5b728025259c191e56` (`content:0.3.0-m03`, 34 entries, construction identity `content:ac0cb9cddfc584cb301240ccaab66c687af7f207bda5aad75f723136a37bd6fd`)
- `skills/orchestration-protocol/manifests/current-policy.json` `99a812f745dd1ee29b46f0e4909fc0ac639c617e` (`2026-10-04:m03-construction`, floor preserved, ineligible)
- `skills/orchestration-protocol/manifests/qualification-impact.json` `dea4dbd9265e032de0739de5c9e63a8d6da644c6` (`impact:0.3.0-m03`, helper concrete `30f88d58…41c6c0`, finite owner inventoried, schemas `7bd04956…9633c3b1`, templates `949cc341…bf0bae3d`)
- `skills/orchestration-protocol/manifests/registry.json` `b8673d421597fb915d85c157986e7b7ab69beecb` (`op-skill-registry:0.3.0-m03`, finite implemented)
- `skills/orchestration-protocol/references/contracts-and-versioning.md` `404e8c4ba1988d37f644050fdbe39cbeb5b0fa67` (helper-manifest acyclic note, concrete api, finite reference; exclusive R8 semantics preserved)
- `skills/orchestration-protocol/references/durable-storage.md` `3bef62b9ebecce14a875dd2e7b4f6695ecbc0bbf` (finite segment reference only)
- `skills/orchestration-protocol/references/evidence-and-sources.md` `abde37d88539e52f790c03588e6db3ea17a5b26b` (helper projection note, finite fence reference; null-fence regressions unchanged)
- `skills/orchestration-protocol/references/security-and-effects.md` `31a90d05a971ad32524424528bb7b26a0a1a61d9` (finite operation/fence reference; generic ref-mutation/read-observation unchanged; M03 ineligible)
- `skills/orchestration-protocol/schemas/finite.schema.json` `f02a0d1359ed822113170c3c869957925ff092b8` (owner finite-claim-substrate + co-owner security; tightened nonce `^[0-9a-f]{32,}$`, unit `^unit-[0-9]{2}$`, reclaim head/state; new `conditional_fence`, `finite_publication`, `finite_operation`)
- Templates bumped to `0.3.0-m03` with frozen envelope `runenv:4bd8760f9ff68211dd7a4714373b7ba948995c98a37ad977c75d94fc9281048f` and impact `impact:0.3.0-m03`: admission `723661e91e3f8c1c1757f5e3737252c9bac258e6`, finite-claim `df81ac935f48a6ac91167b86d40273228d46d89f`, homogeneous `e9baddd239795d5712944f364777e6a907394eda`, mechanical `b515a4afcc98e5a3662a8176739cd6938a43c300`, checkpoint `9d1293746e16a66fb42f5ef7a8a7680f3e90819a`, qualification `545f9352c6ee305ff8b1fc6a496ffec64fda866c`, run-envelope `5b667d0aa602dfc6d9d96e31578f90dcaf23737b`, sealed-02 `bfbbe8913aeb8a2637b2945c5b1da0c585f0bd69`, sealed `17f5be2df50c18b9d2f834c67a0524258bce36de`; continuation `c1c8841c3c77390b60f50f570e38197200844b08` and verification-proof `3ba9974db9147081d69ee9cffa1ab8fe67555b5f` unchanged (no release fields).
- `tests/build/check-m02.mjs` `4b93eddd26543c63715b7bd644adeaa45d5c0f64` (maintained common check for the actual `0.3.0-m03` stage: version, 5 owners, sole helper, 5 references, 12 new domains, helper-manifest parse, current pins, M03 labels; all M02 null-fence/metadata/state/schema regressions preserved).

`git status --short` before freeze shows only the 23 modified + 6 new paths above (no Card/result/review/blocker/authority/history mutation). `git diff --check` exits 0. No push.

Frozen identities for Main to pin on freeze:

- Construction release `0.3.0-m03` (draft-unqualified, never M08), `op_contract 1.0.0`, helper `op-helper-api/1.0.0`
- Frozen envelope `runenv:4bd8760f9ff68211dd7a4714373b7ba948995c98a37ad977c75d94fc9281048f`
- Templates digest `949cc341067443433b78e2e424d0f5fcaabd09d5514d3a3fdcba0b95bf0bae3d`, schemas `7bd04956ccca40dc7daad46027de078bc9fd370501c9d3060ed4f7999633c3b1`
- Construction identity `content:ac0cb9cddfc584cb301240ccaab66c687af7f207bda5aad75f723136a37bd6fd`
- Helper raw sha256 `30f88d58412d72a901638aed4e80390d8ef78a1cdb2328adeed0a2c22041c6c0` (59123 bytes), detached manifest, never self-embedded
- 27 delivered JSON artifacts parse (7 schemas + 13 templates + 6 manifests + plugin)

## Acceptance coverage

- A1: one narrow helper + detached manifest + sole finite owner; supporting records in existing schemas/templates/manifests; checks in tests/build; plugin/README/SKILL/registry/four owners minimally integrated with exclusive R8 semantics preserved; sole evidence this file; `0.3.0-m03` incomplete/draft/unqualified, never M08; Android assumptions preserved; finite implemented only when complete; three later owners + eight profiles pending with no stubs; common checks reflect the actual current stage.
- A2: package-bound validation (unsupported fails closed; exact IDs/paths/branches/value-binding; nullable/applicability; canonical sorting/serialization/envelope projection; deterministic plans + assignment-only packs from frozen context, never sibling semantics); unknown/missing/malformed/ambiguous never defaults; no lossy aliases; probe/API + detached digest match source without self-reference; compat/content/impact coherently and conservatively include new dependencies; structural vs qualification distinct; ancestry from already-fetched loose objects only (zlib walk, no fetch, packed history BLOCKS); acyclic intent/object/detached-readback, no self commit hash.
- A3: every production nonce needs ≥128-bit fresh entropy from the exact qualified source bound to unit/generation/claim; timestamp/counter/model-text/PRNG/weak/degraded/foreign/stale/self-qualified rejected; missing/unavailable/invalid BLOCKS before claim; explicit `--qualified-source` + `--qualification-locator` interface, never a user flag/label; local `diagnose-csprng`/`probe` candidates labeled UNQUALIFIED, never qualification; deterministic `validate-nonce`/`validate-claim` vs excluded random issuance; BLOCKED qualification + draft-ineligible policy preserved; no host/source manufactured.
- A4: sole finite owner specifies the reconstructible ledger/DAG with base/checkpoint/manifest/generation/claim/commit/nonce, non-force publication, expected-head/ancestry, exact readback, only-current-generation admission; scopes explicit, no reuse/role collapse, shape alone never ownership; initial creation needs positively verified expected-absence distinct from missing/unknown/null, updates need exact head; adjacent `conditional_fence` extension preserves prior null-fence regressions; one concrete single-ref model (`update-ref` with exact old/zero-OID + `push --force-with-lease`, never `--force`, plus exact readback; no unfenced/check-then-write/cross-ref atomicity); unavailable primitives BLOCK production, not authorship; plans not writes; repair predicates represented mechanically, enforced at effect time; manual/native procedures proposed/unverified, no backend/child-spawn.
- A5: exact single-use fenced reclaim binding unit/generation/claim-state/manifest/head/terminal readback; advances only that unit via exact-state/CAS after proven no-valid-terminal; timeout/disappearance/branch never authority; replay idempotent or fail-closed, never repeated increment or newer-generation reclaim; siblings retained, old generations preserved, late/stale rejected with pre-write revocation; unknown/stale/ambiguous yields no reclaim; records/templates/plans/procedure agree; no supplemental substitution; no homogeneous/repair implementation.
- A6: durable `finite_operation` with exact target/preconditions/ownership/postcondition/readback; VERIFIED / proven NOT_APPLIED / UNKNOWN coherently; lost response triggers exact readback, retry only after NOT_APPLIED, consume verified success, fail closed UNKNOWN; lineage/closure preserved, no alias escape; success labels not proof; no remote/consumer test.
- A7: complete helper/finite source + proportionate checks + sole evidence with actual history below; synthetic/disposable-DAG cases are source observations only, not Q2/Q3/Q8/Q10 or concurrent/provider/entropy/native qualification; no oracle/race growth; freeze limited to allowed paths; Main alone normalizes and seeks independent Review; missing native capability is deferred qualification, not a construction blocker; no ambiguity invented (none blocked acceptance).

## Commands and outcomes (exact)

```sh
node --check skills/orchestration-protocol/scripts/op-helper.mjs   # exit 0
node --check tests/build/check-m02.mjs                             # exit 0
node --check tests/build/check-m03.mjs                             # exit 0
node tests/build/check-m02.mjs                                     # 258/258 checks passed, exit 0
node tests/build/check-m03.mjs                                     # 124/124 checks passed, exit 0
git diff --check                                                   # exit 0
git status --short                                                 # only 23 M + 6 ?? allowed paths (see scope)
```

Representative helper readbacks (terminal, bounded):

```sh
node skills/orchestration-protocol/scripts/op-helper.mjs probe
# exit 0, helper op-helper 0.3.0-m03, api op-helper-api/1.0.0, forbids network/writes/scheduling/credentials/semantics, STRUCTURAL-ONLY
node skills/orchestration-protocol/scripts/op-helper.mjs plan-alloc --manifest skills/orchestration-protocol/templates/finite-claim.example.json --envelope skills/orchestration-protocol/templates/run-envelope.example.json
# exit 0, kind allocation-plan, authority none, write false, no fresh bytes; twice identical (repeatable)
node skills/orchestration-protocol/scripts/op-helper.mjs context-pack --assignment assign:0001 --manifest skills/orchestration-protocol/templates/finite-claim.example.json --envelope skills/orchestration-protocol/templates/run-envelope.example.json
# exit 0, assignment-only, no findings/severity/conclusion; twice identical
node skills/orchestration-protocol/scripts/op-helper.mjs validate-claim skills/orchestration-protocol/templates/finite-claim.example.json --manifest skills/orchestration-protocol/templates/finite-claim.example.json
# exit 0, manifest-bound (label is not qualification proof)
node skills/orchestration-protocol/scripts/op-helper.mjs validate-claim skills/orchestration-protocol/templates/finite-claim.example.json
# exit 2 BLOCKED, missing manifest (no defaults)
node skills/orchestration-protocol/scripts/op-helper.mjs validate-nonce --nonce abc123 --source qualified-csprng-128
# exit 1, below 128-bit grammar
node skills/orchestration-protocol/scripts/op-helper.mjs validate-nonce --nonce 9f2c4a7e1b5d83f06a4c9e2b7d5f1836a4c9e2b7d5f1836a4c9e2b7d5f1836a4 --source timestamp-counter
# exit 2 BLOCKED, foreign source
node skills/orchestration-protocol/scripts/op-helper.mjs issue-claim-nonce
# exit 2 BLOCKED, missing qualified source
node skills/orchestration-protocol/scripts/op-helper.mjs issue-claim-nonce --qualified-source self-qualified --qualification-locator x
# exit 2 BLOCKED, self-qualified marker
node skills/orchestration-protocol/scripts/op-helper.mjs issue-claim-nonce --qualified-source example-qualified-csprng --qualification-locator example/repo@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:qual/001.md
# exit 0, 64-hex candidate, qualification UNVERIFIED-BY-HELPER, never a qualified receipt; second issuance shape-valid only (excluded from identical-output)
node skills/orchestration-protocol/scripts/op-helper.mjs diagnose-csprng
# exit 0, UNQUALIFIED-LOCAL-CANDIDATE
node skills/orchestration-protocol/scripts/op-helper.mjs check-fence --fence <expect-absent-with-proof>
# exit 0; without proof or null-without-proof -> exit 2 BLOCKED (distinct from missing/null)
node skills/orchestration-protocol/scripts/op-helper.mjs check-fence --fence <expect-head-aaa> --observed <head-aaa>
# exit 0; observed fff... -> exit 1 stale
node skills/orchestration-protocol/scripts/op-helper.mjs validate-publication <stale-fence-fff> --manifest <manifest>
# exit 1 after correction (unbound fence head rejected; see corrections)
node skills/orchestration-protocol/scripts/op-helper.mjs validate-reclaim <reclaim> --manifest <manifest>
# exit 0, exact-current-generation single-use; generation 99 -> non-zero (no increment)
node skills/orchestration-protocol/scripts/op-helper.mjs validate-operation <VERIFIED|NOT_APPLIED|UNKNOWN>
# exit 0 with VERIFIED/CONSUME-WITHOUT-REPLAY, NOT_APPLIED/RETRY-ONLY-AFTER-PROVEN, UNKNOWN/FAIL-CLOSED-NO-RETRY
node skills/orchestration-protocol/scripts/op-helper.mjs validate-ancestry --claim-commit <claim> --ancestry-commit <base> --objects-dir <disposable-dag/.git/objects>
# exit 0 VERIFIED for ancestor, 1 for non-ancestor, 2 for missing objects (small newly created disposable local Git DAG only, cleaned afterwards; no project/remote/consumer effects)
```

All 27 delivered JSON artifacts parse. No expected hashes were regenerated as verification; all digests were read back and compared, failures recorded below.

Intermediate correction (recorded, not overridden):

- First full `check-m03` run was 123/124 with `negative: stale publication fence rejected` failing: `validate-publication` accepted a well-shaped but unbound `ffffffff…` fence head because it checked only fence shape, not role binding. Cause: missing bound-role check for `expect-head`. Correction: helper now requires `expect-head` to equal the bound claim commit or manifest wave-base commit (finite owner §§5/8); stale/unbound heads fail closed. Re-run: `node --check` exits 0, `check-m02` 258/258, `check-m03` 124/124, `git diff --check` 0. No failure was overridden and no expected value was rewritten to pass.

## Limitations (bounded build observations, not qualification)

- No real-inference, native install/account, remote-write, consumer, exhaustive, or race programme was run (per Card exclusion and test policy).
- Canonical JSON/digest, fence, binding, and ancestry projections are source-level consistency only, verified by the helper/check implementations themselves, not as installed-helper proof.
- Provider conditional primitives (`update-ref` zero/exact-old, `push --force-with-lease`, exact readback), OS CSPRNG entropy, context-source exclusion, and installed metadata channels remain unverified assumptions U-01..U-05; production admission with this snapshot fails closed.
- Local `issue-claim-nonce`/`diagnose-csprng` bytes use the host OS CSPRNG as explicitly unqualified candidates; they are not Android/host qualification and never authorize production.
- Ancestry validation reads loose objects only from already-fetched dirs; packed history without loose objects BLOCKS rather than guessing.
- No Q0–Q10 PASS is claimed; the deferred 1,152-tuple/40-branch/race/native programme is M09 matter.
- Missing native capability is a deferred test prerequisite, not a construction blocker. No source-contract ambiguity blocked acceptance; no authority was invented or altered.

## Permitted diff and freeze identities (for Main)

Allowed diff: 23 modified + 6 new paths listed in scope above (`git diff --stat`: 23 files changed, 288 insertions, 146 deletions, plus 6 new files). No authority/Card/result/review/blocker/history mutation. No push.

Frozen source identities (pre-freeze readback; Main pins commit/tree on freeze):

- Helper: raw `30f88d58412d72a901638aed4e80390d8ef78a1cdb2328adeed0a2c22041c6c0` (59123 bytes), git blob `dba6d84c536596934dad36c05e9ad281fcc66141`
- Construction: `content:ac0cb9cddfc584cb301240ccaab66c687af7f207bda5aad75f723136a37bd6fd` (`content:0.3.0-m03`, 34 entries)
- Envelope: `runenv:4bd8760f9ff68211dd7a4714373b7ba948995c98a37ad977c75d94fc9281048f`
- Templates: `949cc341067443433b78e2e424d0f5fcaabd09d5514d3a3fdcba0b95bf0bae3d`, schemas `7bd04956ccca40dc7daad46027de078bc9fd370501c9d3060ed4f7999633c3b1`
- Checks: `check-m02` 258/258, `check-m03` 124/124, all syntax/diff checks exit 0

Main alone classifies/normalizes this return into the durable result, freezes the exact implementation commit/tree/evidence blob, and obtains the required fresh independent implementation Review. Missing native capability is returned as deferred qualification input.
