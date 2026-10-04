# Package / source observations (M01-T01, dated 2026-10-04)

> Test-only feasibility observations. Not production qualification. Unavailable
> documentation or unverified schema stays explicit, never invented as current
> compatibility.

## Retrieval date and method

- Date: 2026-10-04 (UTC).
- Method: local inspection of this repository plus the accepted Definition R8 /
  P1 authority snapshot only. **No live network fetch, no Android/account
  probe, no consumer/remote Git write was performed** (per Card exclusion).
- Retrieval of "current official ChatGPT Android plugin requirements" from the
  network was deliberately not attempted in this offline test-only obligation;
  see uncertainty rows below.

## Proposed portable root metadata (observed, not verified against host)

| Field | Proposed value in `probe-package/plugin.json` | Observed source | Status |
|---|---|---|---|
| name | `op-feasibility-probe` | authored test-only fixture | OBSERVED-LOCAL |
| version | `0.1.0-testonly` | authored test-only fixture | OBSERVED-LOCAL |
| test_only / not_for_production | `true` | authored | OBSERVED-LOCAL |
| probe skill path | `skills/orchestration-protocol-probe/SKILL.md` | file exists, sha256 `67cffefd…295293` | OBSERVED-LOCAL |
| helper path | `scripts/op-helper.mjs` | file exists, sha256 `ef4265c7…3bc1803` | OBSERVED-LOCAL |
| engines.node | `>=20` (observed runtime `v22.23.3`) | local `node --version` | OBSERVED-LOCAL |
| Installed-surface plugin schema | unknown | no live host/docs retrieval | UNKNOWN — BLOCKED |
| Official ChatGPT Android skill-manifest field set | unknown | no live docs retrieval | UNKNOWN — BLOCKED |
| Account/device surface (P1 M01 "intended account/device") | unbound | owner setup not yet provided | UNKNOWN — BLOCKED |

## Helper source observations (local)

- Language: plain ESM, imports only `node:crypto` (`randomBytes`, `createHash`).
  `grep` audit for runtime `fetch|http|net|child_process|credential|schedule`
  finds no runtime authority (doc comments only); see evidence file for exact
  command/output.
- `node --check` passes on `v22.23.3`.
- `--audit-csprng` reports `node:crypto.randomBytes` available, 16-byte probe
  OK, qualified local source
  `node:crypto.randomBytes/qualified-local-only`. **Local host only; says
  nothing about Android availability.**
- No third-party dependency: no `package.json` dependencies, no imports beyond
  `node:crypto` (+ `node:fs`/`node:path`/`node:url` in check harnesses only,
  never in the helper's normative path).

## Uncertainty that stays explicit

- Current official package requirements, manifest schema version, plugin
  installation protocol, signing/permission model: UNKNOWN.
- Whether the proposed `plugin.json` shape matches the current qualified
  portable root metadata format: UNVERIFIED.
- Whether plain ESM executes on the intended Android surface and whether a
  qualified CSPRNG exists there: BLOCKED (native observation required).
- No compatibility claim is made. Lack of native access does not authorize an
  ESM→Python replacement; only exact incompatibility evidence can trigger the
  accepted separately qualified Python path.
