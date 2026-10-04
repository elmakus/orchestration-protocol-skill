# Orchestration Protocol Skill v1 — M03 construction snapshot

> **Status: incomplete construction surface, explicitly unqualified.**
> This directory holds the M02 common contracts plus the M03 bundled helper
> and finite claim/reclaim substrate only.
> It is **not** the M08 complete candidate, not a production release, and carries
> **no qualification PASS, no Android compatibility claim, and no install
> verification**. All host/tool/authority interfaces proposed here are
> **explicitly unverified**; production admission with this snapshot fails
> closed for any unqualified production tuple.

## What M03 delivers

- `plugin.json` — concrete **proposed** portable metadata (`0.3.0-m03`,
  `op_contract 1.0.0`); Android acceptance of this layout is **unverified**.
- `skills/orchestration-protocol/SKILL.md` — concise root: consumer boundary,
  profile routing, freeze/load gates, fail-closed dispatch, ownership map
  (five implemented owners, three pending).
- `skills/orchestration-protocol/references/` — the four M02 shared owners
  plus the complete M03 `finite-claim-substrate` owner (each `1.0.0`);
  four common owners carry only the minimal M03 integration references and
  keep their exclusive R8 semantics.
- `skills/orchestration-protocol/scripts/op-helper.mjs` — the sole
  dependency-free no-build ESM mechanical helper (`op-helper-api/1.0.0`)
  with its detached data identity manifest
  (`manifests/helper-manifest.json`); no network, Git writes, subprocess
  scheduling, credential access, external effects, or semantic decisions.
- `skills/orchestration-protocol/schemas/` — versioned record grammars for
  every M02 record family plus M03 `conditional_fence`,
  `finite_publication`, and `finite_operation` with tightened finite
  nonce/unit/generation/head grammars; prior null-fence regressions preserved.
- `skills/orchestration-protocol/templates/` — usable **synthetic** examples
  (labeled data, not authority/host proof) projecting their sole owner,
  including finite publication (update + initial expected-absence) and
  three-way operation recovery shapes.
- `skills/orchestration-protocol/manifests/` — machine-readable registry,
  interim construction content identity, compatibility manifest with concrete
  helper API, current release policy, qualification-impact manifest, and
  helper identity manifest.
- `tests/build/check-m02.mjs` — maintained common build check for the actual
  current construction stage (parse/registry/ownership/link/
  canonical-identity/negative coverage).
- `tests/build/check-m03.mjs` — M03 helper/finite build check (probe/API/
  digest, validation, planning, fence, nonce-source, reclaim, operation,
  ancestry via disposable local DAG, coherence without oracle regeneration).

## What M03 explicitly does NOT deliver

Homogeneous `RUN_ID`/batch/current-attempt algorithms (M04), full
launch/sealing/integration/context-source protocols (M05), substantive
profiles or repair/revalidation algorithms (M06/M07), M08 assembly, M09
exhaustive/native qualification, Python/second helper/backend/MCP/Pi/Paseo/
Codex runtime, helper networking/GitHub access/subprocess scheduling/
external effects/credential access/semantic decisions, native/real-inference/
remote-write/consumer tests, or any Q PASS. Three later owners and all eight
profiles remain **pending inventory, never admitted as loaded modules**.
No `profiles/` directory and no second helper exists in this snapshot on purpose.

## Assumption register (all unverified)

| # | Assumption | Build treatment | Later proof required |
|---|---|---|---|
| U-01 | Proposed `plugin.json` + skills layout accepted by Android host | Concrete proposed format, no install menu/API invented | Installed schema, visibility, digest readback (Q9/Q10) |
| U-02 | ESM/Node + OS CSPRNG available on host | Bundled helper uses only standard built-ins; issued bytes are explicitly unqualified local candidates, never Android qualification | Installed execution/RNG source and failure behavior (Q8/Q10) |
| U-03 | Provider tools realize non-force expected-head/ownership/ancestry fences + exact reads | Single-ref `update-ref` + `push --force-with-lease` conditional model with exact readback; unavailable primitives BLOCK production, not source authorship | Provider primitives, races, readbacks, repair-time revocation (Q2–Q4/Q7) |
| U-04 | Fresh-context/manual launch can preserve independence | Reusable record contracts; no native spawn API assumed | Sibling exclusion/exposure detection per context category (Q7/Q10) |
| U-05 | Caller authority, current results, current release policy authenticatable | Concrete verification interfaces; schema validity ≠ authenticity | Same-channel/successor provenance, floor/revocation readbacks (Q1) |

Missing proof prohibits the affected production action. There is no
"unqualified production" switch.

## Use

Read `skills/orchestration-protocol/SKILL.md` first; it owns the boundary and
routes to exactly one normative owner per rule. Validate locally with:

```sh
node --check skills/orchestration-protocol/scripts/op-helper.mjs
node --check tests/build/check-m02.mjs
node --check tests/build/check-m03.mjs
node tests/build/check-m02.mjs
node tests/build/check-m03.mjs
```
