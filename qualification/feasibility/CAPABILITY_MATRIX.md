# Capability / uncertainty matrix (M01-T01, dated 2026-10-04)

Legend: LOCAL-PASS = positive local evidence in this kit; BLOCKED = required
native/owner evidence missing (fail closed, never inferred); FAIL = terminal
evaluated violation (none observed locally). There is **no global M01 PASS**,
no Q9/Q10 PASS, and no production-use claim from this kit.

| # | M01 predicate (Card deliverable 6) | Local evidence in this kit | Native/owner evidence | Verdict |
|---|---|---|---|---|
| 1 | Skills-only installation on intended Android | none (probe never installed) | owner-assisted install observation required (`NATIVE_PROCEDURE.md` step N1) | BLOCKED |
| 2 | Native invocation (probe skill launch) | none | native launch observation required (N2) | BLOCKED |
| 3 | Bundled ESM helper executes on native surface | local `node --check` + helper CLI on dev host only | native helper execution observation required (N3) | BLOCKED |
| 4 | Qualified CSPRNG (>=128-bit) on native surface | LOCAL-PASS (local): `check-csprng.mjs` audits `node:crypto.randomBytes`, fresh 32-hex nonces, weak/unavailable rejected | native RNG source audit + concurrency fixtures (N4) | BLOCKED (native) |
| 5 | Git object/ref reads on provider surface | LOCAL-PASS: `GIT-READBACK-01` blob hash/cat-file/ref resolve in temp repos | provider-surface read observation (N5) | BLOCKED (native) |
| 6 | Fenced non-force claim/publication equivalents | LOCAL-PASS: `GIT-CLAIM-01` one winner + loser rejected; `GIT-PUBLISH-01` expected-head + readback | provider CAS/readback proof (N5) | BLOCKED (native) |
| 7 | Stale/ABA/lost-response handling | LOCAL-PASS: `GIT-STALE-ABA-01` stale rejected; `GIT-LOST-01` VERIFIED/NOT_APPLIED/UNKNOWN classification | provider-surface equivalents (N5) | BLOCKED (native) |
| 8 | Canonical release policy resolution (current/minimum/revocation) | none (no policy artifact bound in this kit) | current-policy read + minimum/revocation checks (N6) | BLOCKED |
| 9 | Authentic caller authority + currentness provenance | none (no authority channel observed) | same-channel/successor proof per bound integration (N7) | BLOCKED |
| 10 | Consume-time current-result reads (not publication-time CURRENT) | local fixture describes predicate; no live result authority read | positive readback of canonical current-result authority (N7) | BLOCKED |
| 11 | Repair-write fencing under concurrent revoke/reclaim/candidate change | local generation/claim fence witnessed on temp refs only | native fenced write-time revalidation proof (N8) | BLOCKED |
| 12 | Full context-source categories inventoried (explicit assignment, project files/knowledge+retrieval, history, memory, instructions, connectors, caches, other injection) | LOCAL-PASS (inventory list in `NATIVE_PROCEDURE.md` N9 with per-category disposition UNKNOWN) | per-category exclusion/detection proof on qualified launch mode (N9) | BLOCKED |
| 13 | Coordinator-visible metadata channels closed + semantic-free | LOCAL-PASS (synthetic): `check-metadata-leak.mjs` 6 negatives rejected without echo + 1 mechanical admissible | installed-surface channel inventory + leak negatives on every exposed channel (N10) | BLOCKED (native) |
| 14 | Exact owner setup disposition (ACCEPTABLE/UNACCEPTABLE/UNKNOWN) | none | durable owner disposition for exact candidate/setup (N11) | BLOCKED (UNKNOWN) |
| 15 | Local determinism (byte-identical for identical explicit inputs) | LOCAL-PASS: `check-identities.mjs` per-file + package digests verified; random output excluded from equality | n/a (local property) | LOCAL-PASS |
| 16 | Package/source dependency/network/credential/semantic/workflow-authority hygiene | LOCAL-PASS: static inspection recorded in evidence (no runtime network/credential/scheduling/semantic authority; probe explicitly test-only, no workflow state writes) | native re-audit on exact candidate | LOCAL-PASS (dev-host scope) |

## Explicit non-assertions

- No M01 feasibility gate is cleared by this kit. Live target/permission/test
  realization and concrete native observations are a predecessor-dependent next
  obligation (JIT trigger `M01-live-feasibility-after-kit`).
- Local disposable-Git results are primitive feasibility witnesses, not proof
  of remote atomicity and not installed-provider evidence.
- The native channel inventory is explicitly incomplete until observed on the
  intended account/device; newly discovered or unobservable installed channels
  remain unqualified.
- Q9/Q10 remain BLOCKED. No FAIL was observed locally; a local FAIL would have
  been recorded as FAIL with exact evidence per P1 §2.3.
