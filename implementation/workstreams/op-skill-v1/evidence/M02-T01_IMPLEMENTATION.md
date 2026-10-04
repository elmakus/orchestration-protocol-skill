# M02-T01 — implementation evidence return

- Card ID: `M02-T01`
- Worktree: `/home/paseo/projects/orchestration-protocol-skill-op-skill-v1`, branch `feat/op-skill-v1`
- Date: 2026-10-04
- Role: implementation/evidence return only. No Task Board/result/review/Card/authority mutation is performed here; Main alone reconciles.

## Delivered scope (allowed surface only)

New files, all under the Card's A1 surface:

- `plugin.json` (blob `b069e1d3e87ac4608c8107acf33f9aad01b0c805`) — proposed portable metadata `0.2.0-m02`, `op_contract 1.0.0`, Android compatibility UNVERIFIED.
- `README.md` (blob `58475483a8c565267591f6f828b6767bed84350b`) — labels M02 construction surface incomplete/unqualified, not M08; assumption register U-01..U-05.
- `skills/orchestration-protocol/SKILL.md` (blob `29f2af4ffa84d4d6738dc4abc1d05359623afe16`) — boundary, routing (8 profiles, all pending), freeze/load gates, fail-closed dispatch, ownership map (4 implemented + 4 pending owners).
- `skills/orchestration-protocol/references/contracts-and-versioning.md` (`0f02fba47bbd5258116547b3e07ecd87658ffec5`) — envelope, identity scopes, equivalence/canonical serialization, state domains + deterministic precedence, version compatibility, release admission/policy, acyclic content graph, typed profile extension points.
- `skills/orchestration-protocol/references/evidence-and-sources.md` (`4e6da4d764d2dd1315a588d668bfe3dd1f1a093a`) — evidence authority/weight, singleton counterexample, conflict adjudication, dissent, evidence-as-data, closed mechanical metadata allowlist.
- `skills/orchestration-protocol/references/security-and-effects.md` (`4f2c84855f02121263afac067b720009bac87388`) — continuation authority + verification, checkpoint gate, effect caps/whole-set validation, forbidden repair classes, receipt interfaces/predicates, credential boundary.
- `skills/orchestration-protocol/references/durable-storage.md` (`0da03f7a07e597d7b71a7f3bc4e9edb7c0c7ba76`) — Git ledger, immutability/supersession, consume-time currentness, archive structure, readback proof, lineage.
- `skills/orchestration-protocol/schemas/` — 7 versioned (`1.0.0`) grouped grammars covering all 22 A2 record families: identities, envelope/continuation/proof, finite+checkpoint, homogeneous, results/currentness, metadata/receipts, policy/impact/qualification-record.
- `skills/orchestration-protocol/templates/` — 10 synthetic examples (all `_synthetic`-labeled), cross-linked (sealed→content identity, admission→sealed ids, integrated→snapshot/qualification snapshot).
- `skills/orchestration-protocol/manifests/` — `registry.json` (8 profiles + 8 shared owners, exact paths/versions, pending distinguished), `content-manifest.json` (28 entries, construction identity `content:ee463d1f3e971d5dfd0a5720ee574fdc4721337baa7a2a9ff103ea6485361033`, self-excluded), `compatibility-manifest.json`, `current-policy.json` (floor `0.2.0-m02`, no revocations), `qualification-impact.json` (10 change classes incl. unbounded→all-Q invalidation).
- `tests/build/check-m02.mjs` (blob `10cb9d845f9b74a2652ae593078abffc6707b00a`) — dependency-free local check.
- This evidence file: `implementation/workstreams/op-skill-v1/evidence/M02-T01_IMPLEMENTATION.md` (declared A1 evidence surface).

Per-file Git blobs for schemas/templates/manifests (pre-commit `git hash-object`):

- envelope `c73e5527bed9be43d81f04e5dcd29d3580cb534e`, finite `ca7cdd080faff3788de68a0136b9451011035459`, homogeneous `2e79d7a27b4417f555bf0a276e3beccb75cd3020`, identities `5c6031e0848ec08c40c3fb49a8d083c2e92c8406`, metadata `46abc8c614cbbd2129c96d08bce7e7993b4b87b4`, policy `7b3f382879e08ff93355c9c8372bedaa44a41cfc`, results `0040eab6e51788614a9fa4e6dff8eaa33dc986d6`.
- admission-snapshot `c0328cb0f1b83c0c0a69b04d409eda9daffc7073`, continuation-authority `4279b776e36ca880703f5e593483ac478c1066db`, finite-claim `80bd5ebe44332e2959928bd742acb40681d4fc93`, homogeneous-batch `6901e66366d7f9d90966efbe41419ccae821d34b`, mechanical-receipt `0e901ba82c16277ad8ab65605ae94007d205e429`, pre-worker-checkpoint `5082233bc3a2e47dfead69b081d3e57444678a47`, qualification-record `140bfbcc6e7d1c1655505fb0a0fc01cd74bd9901`, run-envelope `395a950f81228fb677bc360ed080c6eb9b499fdb`, sealed-result `2273e85a8a357aa07c33d6c5d08dc0865065b9a0`, verification-proof `5988d8a74fb05d4bbd7c0a65a5f1fc132256b9fc`.
- compatibility-manifest `671b500542c9a59b0c2a7943af6432e386035ad0`, content-manifest `4a27cf9a6ef480a20e52564ba8b956fcf3785a39`, current-policy `b0835da937a2535357e115cf63ad7c56da651e21`, qualification-impact `ada1dc54cb964be477fce5fe36404a86a684a717`, registry `ced33ca855e284ab7393e099c124d18b067af108`.

Deliberately absent (pending inventory, no stubs): `profiles/`, `scripts/`, the four downstream references, any helper. `git status` before freeze shows only `?? README.md`, `?? plugin.json`, `?? skills/`, `?? tests/` plus this evidence file — no Card/result/review/authority modification.

## Acceptance coverage

- A1: bounded surface above; one concrete proposed portable format with explicit unverified Android compatibility; 8 profiles + 8 owners registered with exact paths/versions; only the 4 M02 owners delivered; root fails closed on unavailable/pending/unqualified tuples; implemented links resolve, pending entries distinguished and never admitted as loaded (check 56 + registry note).
- A2: 22 record families as versioned schemas + synthetic templates; Git + captured-content + composite identities; canonical serialization/digest/ordering with redundant-identity consistency and `return_id` excluded from equivalence.
- A3: separate finite state domains, canonical precedence (BLOCKED > INCOMPLETE, neutral NOT_APPLICABLE tuple, illegal-tuple rejection), typed profile extension points without profile override; consume-time currentness via current-result authority.
- A4: release pinning + checkpoint/readback gate; same-channel/successor authenticity with exact binding; whole-effect-set validation, no auto-narrow; all R8 §13 forbidden classes; realized-effect closure; provider receipt interfaces with qualified-provenance predicates; no helper networking/daemon/PKI/scheduler; credentials absent.
- A5: closed typed mechanical allowlist (unknown channels/values non-admissible, no denylist proof); evidence weight, singleton counterexample, conflict→BLOCKED, dissent, evidence-as-data, no voting; sealing/integration referenced as later owners, not copied.
- A6: acyclic package→content-manifest→construction identity with self/detached exclusions; interim identity not M08; compatibility/current-policy/impact/detached-record interfaces with revoked/stale/unknown fail-closed and unbounded-impact→all-Q-stale.
- A7: `tests/build/check-m02.mjs` — 113/113 local checks (parse, registry, ownership exclusivity, link resolution, canonical determinism, return_id exclusion, manifest readback, schema/template coherence, detached linkage, 20 negative/positive behavior probes). Synthetic fixtures labeled data only.
- A8: this return; scoped freeze commit (identities in Main return); no push; no workflow-state mutation.

## Commands and outcomes (exact)

```sh
node --check tests/build/check-m02.mjs   # exit 0
node tests/build/check-m02.mjs           # 113/113 checks passed, exit 0
git status --short                        # only ?? README.md, ?? plugin.json, ?? skills/, ?? tests/, ?? implementation/.../M02-T01_IMPLEMENTATION.md
```

First full run was 108/112 with 4 failures, each corrected with recorded cause: (1) content-manifest entry order unsorted → regenerated fully sorted, new construction identity `content:ee46…0353`; (2) README assertion string split by markdown bold → assertion now matches `M08 complete candidate`; (3) link check treated registry-table pending mentions as loaded → check now permits pending paths only in the SKILL.md routing table that explicitly marks them pending/never-loaded; (4) key-order determinism probe omitted 3 envelope keys → probe now reverses all keys. Re-run: 113/113, exit 0.

## Limitations (bounded build observations, not qualification)

- No real-inference, native install/account, remote-write, or consumer test was run (per Card exclusion and test policy).
- Canonical JSON/digest behavior is verified for the check's own implementation, not as installed-helper proof; no helper ships in M02.
- Provider fences, CSPRNG entropy, context-source exclusion, and installed metadata channels remain unverified assumptions U-01..U-05; production admission with this snapshot fails closed.
- No Q0–Q10 PASS is claimed; exhaustive 1,152-tuple/40-branch/race/native programme is M09 matter.
- Missing native capability is a deferred test prerequisite, not a construction blocker. No source-contract ambiguity blocked acceptance; no authority was invented or altered.
```
