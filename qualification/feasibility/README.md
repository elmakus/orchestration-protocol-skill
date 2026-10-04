# M01-T01 bounded non-production feasibility kit (test-only)

> All implementation files are confined to `qualification/feasibility/`. The
> sole workstream evidence output is
> `implementation/workstreams/op-skill-v1/evidence/M01-T01_IMPLEMENTATION.md`.
> This kit asserts no production or native qualification PASS.

## Contents

- `probe-package/` — test-only probe package:
  - `plugin.json` — proposed portable root metadata (unverified against host).
  - `skills/orchestration-protocol-probe/SKILL.md` — one concise test-only
    probe skill (not a production OP profile or fallback runtime).
  - `scripts/op-helper.mjs` — one bundled plain ESM mechanical helper
    (Node stdlib only; no network/GitHub/effects/scheduling/semantics/
    authority/credentials). Simulated-claim authority comes only from the
    audited in-session issuance path; labels prove nothing and no entropy is
    inferred from values.
  - `HELPER_IDENTITY.json` — detached helper digest/API observation
    (oracle-set input; content-linked by `check-identities.mjs`, acyclic).
- `fixtures/` — frozen test-only inputs:
  - `FIXTURE_MANIFEST.json` — detached package-content identities
    (`--write-manifest` freeze only; excluded from its own inputs).
  - `ORACLE_MANIFEST.json` — detached frozen fixture/oracle/harness-set
    identities (`--write-oracles` freeze only; never conflated with package
    identity).
  - `csprng-policy.json` (issuance-path authority),
    `negative-metadata-corpus.json` (bounded `tested_scope` + SCOPE-LIMIT-01),
    `claim-fixtures.json` (fenced primitive + three-way occurrence rule).
- `checks/` — non-inference local checks (no LLM, no Android, no remote):
  - `check-identities.mjs` (package + oracle set + helper linkage; verify
    mode never regenerates manifests to pass),
  - `check-csprng.mjs` (issued authority; self-labelled values acquire
    nothing),
  - `check-metadata-leak.mjs` (bounded denylist; known-limit witness),
  - `check-git-fencing.sh` (expected-old + ownership + fast-forward
    ancestry; rejected attempts leave refs unchanged),
  - `check-tamper.sh` (4 tamper classes detected in disposable copies),
  - `run-all.sh`.
- `PACKAGE_OBSERVATIONS.md` — dated package/source observations with explicit
  uncertainty (narrow public read-only retrieval actually performed
  2026-10-04; usable official schema unavailable from that path).
- `CAPABILITY_MATRIX.md` — dated capability/uncertainty matrix; every
  not-observed native predicate is BLOCKED.
- `NATIVE_PROCEDURE.md` — bounded owner-assisted native procedure (requires
  separate authorization; chooses no account/device; disposable content
  targets isolated under owner-bound scope).
- `TEST_ENVELOPE.md` — owner-assisted test-envelope template/procedure
  (separate package/helper-linkage/fixture-set identities; owner-declared
  scope).

## Reproduce (local, non-inference)

```sh
node qualification/feasibility/checks/check-identities.mjs
node qualification/feasibility/checks/check-csprng.mjs
node qualification/feasibility/checks/check-metadata-leak.mjs
sh qualification/feasibility/checks/check-git-fencing.sh
sh qualification/feasibility/checks/check-tamper.sh
# or:
sh qualification/feasibility/checks/run-all.sh
```

## Digest inputs / exclusions (acyclic)

- Package inputs: `probe-package/plugin.json`,
  `probe-package/skills/orchestration-protocol-probe/SKILL.md`,
  `probe-package/scripts/op-helper.mjs` → `FIXTURE_MANIFEST.json`.
- Oracle inputs: `fixtures/*.json` oracle files, `checks/*` harness code,
  `probe-package/HELPER_IDENTITY.json` → `ORACLE_MANIFEST.json`.
- Each manifest excludes itself, the other manifest, all `*.md`
  observations, the evidence file, `.git` state. `HELPER_IDENTITY.json` is
  additionally content-linked (digest+API) against the actual helper. No
  source contains its own asserted digest; no edits merely to insert PASS.

## Limitations

- Local checks prove only dev-host mechanics. Installed-surface feasibility
  (Q9/Q10, authority/currentness, context isolation, metadata channels,
  CSPRNG/repair fencing on-device) remains BLOCKED pending the separately
  authorized native procedure.
- Disposable-Git results are primitive witnesses, not proof of remote
  atomicity. The metadata denylist is a bounded fixture fence, not universal
  isolation proof (see SCOPE-LIMIT-01).
- See `CAPABILITY_MATRIX.md` and the evidence file for exact commands,
  outputs, and the changed-path allowlist.
