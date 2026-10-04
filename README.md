# Orchestration Protocol Skill v1 — M02 construction snapshot

> **Status: incomplete construction surface, explicitly unqualified.**
> This directory holds the M02 common package/record/admission contracts only.
> It is **not** the M08 complete candidate, not a production release, and carries
> **no qualification PASS, no Android compatibility claim, and no install
> verification**. All host/tool/authority interfaces proposed here are
> **explicitly unverified**; production admission with this snapshot fails
> closed for any unqualified production tuple.

## What M02 delivers

- `plugin.json` — concrete **proposed** portable metadata (`0.2.0-m02`,
  `op_contract 1.0.0`); Android acceptance of this layout is **unverified**.
- `skills/orchestration-protocol/SKILL.md` — concise root: consumer boundary,
  profile routing, freeze/load gates, fail-closed dispatch, ownership map.
- `skills/orchestration-protocol/references/` — the four complete M02 shared
  owners: `contracts-and-versioning`, `evidence-and-sources`,
  `security-and-effects`, `durable-storage` (each `1.0.0`).
- `skills/orchestration-protocol/schemas/` — versioned record grammars for
  every M02 record family (envelope, identities, continuation, checkpoint,
  finite/homogeneous actions, sealed/admission/integrated results,
  currentness pointers, mechanical metadata, compatibility/policy/impact,
  detached qualification records).
- `skills/orchestration-protocol/templates/` — usable **synthetic** examples
  (labeled data, not authority/host proof) projecting their sole owner.
- `skills/orchestration-protocol/manifests/` — machine-readable registry,
  interim construction content identity, compatibility manifest, current
  release policy, and qualification-impact manifest.
- `tests/build/check-m02.mjs` — dependency-free local build check
  (parse/registry/ownership/link/canonical-identity/negative coverage).

## What M02 explicitly does NOT deliver

Profile modules (`profiles/`), allocation substrates, the bundled helper
(`scripts/`), launch/sealing/integration mechanics, exhaustive fixtures, or
any native/installed-surface evidence belong to M03–M09. Their registry
entries are **pending inventory, never admitted as loaded modules**.
No `profiles/`, `scripts/`, or helper stub exists in this snapshot on purpose.

## Assumption register (all unverified)

| # | Assumption | Build treatment | Later proof required |
|---|---|---|---|
| U-01 | Proposed `plugin.json` + skills layout accepted by Android host | Concrete proposed format, no install menu/API invented | Installed schema, visibility, digest readback (Q9/Q10) |
| U-02 | ESM/Node + OS CSPRNG available on host | Record/contract interfaces only; no helper shipped here | Installed execution/RNG source and failure behavior (Q8/Q10) |
| U-03 | Provider tools realize non-force expected-head/ownership/ancestry fences + exact reads | Capability-required dispatch, never blind writes | Provider primitives, races, readbacks, repair-time revocation (Q2–Q4/Q7) |
| U-04 | Fresh-context/manual launch can preserve independence | Reusable record contracts; no native spawn API assumed | Sibling exclusion/exposure detection per context category (Q7/Q10) |
| U-05 | Caller authority, current results, current release policy authenticatable | Concrete verification interfaces; schema validity ≠ authenticity | Same-channel/successor provenance, floor/revocation readbacks (Q1) |

Missing proof prohibits the affected production action. There is no
"unqualified production" switch.

## Use

Read `skills/orchestration-protocol/SKILL.md` first; it owns the boundary and
routes to exactly one normative owner per rule. Validate locally with:

```sh
node --check tests/build/check-m02.mjs
node tests/build/check-m02.mjs
```
