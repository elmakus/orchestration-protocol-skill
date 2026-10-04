# Package / source observations (M01-T01, dated 2026-10-04)

> Test-only feasibility observations. Not production qualification. Unavailable
> documentation or unverified schema stays explicit, never invented as current
> compatibility.

## Retrieval date and method

- Date: 2026-10-04 (UTC).
- Method: local inspection of this repository plus the accepted Definition R8 /
  P1 authority snapshot, plus narrow public read-only documentation retrieval
  (no Android/account probe, no consumer/remote Git write, per Card exclusion).
- Public read-only retrieval actually performed (curl GET, no credentials):
  - `https://developers.openai.com/` → HTTP 200, 345587 bytes,
    sha256 `b4c5edf07f4843f4e9e12740dd60ef8534f6c8ea9161f13830fb46f195f00ed0`.
  - `https://developers.openai.com/apps-sdk/` (followed redirect to
    `https://developers.openai.com/plugins`) → HTTP 200, 374901 bytes,
    sha256 `995c75665cf6fe786ffb66097970ae7545ea6473267ccc0ea97df4a45165768c`.
  - Both pages are script-rendered shells: no static `<title>`/schema tokens
    for a plugin/skill manifest, `plugin.json` field set, or Android
    skill-manifest surface were retrievable from the static bodies (only
    bundle token counts, e.g. `plugin.json`: 0 hits, `manifest`: 0 hits).
    Full bodies were discarded after hashing; no content is vendored here.
  - Outcome: real retrieval attempted; a usable current official
    skills-only/Android package schema remains UNAVAILABLE from this path —
    recorded as uncertainty below, not invented as compatibility.

## Proposed portable root metadata (observed, not verified against host)

| Field | Proposed value in `probe-package/plugin.json` | Observed source | Status |
|---|---|---|---|
| name | `op-feasibility-probe` | authored test-only fixture | OBSERVED-LOCAL |
| version | `0.1.0-testonly` | authored test-only fixture | OBSERVED-LOCAL |
| test_only / not_for_production | `true` | authored | OBSERVED-LOCAL |
| probe skill path | `skills/orchestration-protocol-probe/SKILL.md` | file exists, sha256 `67cffefd…295293` | OBSERVED-LOCAL |
| helper path | `scripts/op-helper.mjs` | file exists, sha256 `ef4265c7…3bc1803` | OBSERVED-LOCAL |
| engines.node | `>=20` (observed runtime `v22.23.3`) | local `node --version` | OBSERVED-LOCAL |
| Installed-surface plugin schema | unknown | public docs GETs 2026-10-04 returned script shells (hashes above), no static schema retrievable | UNKNOWN — BLOCKED |
| Official ChatGPT Android skill-manifest field set | unknown | same retrieval; `plugin.json`/`manifest` 0 static hits | UNKNOWN — BLOCKED |
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
  installation protocol, signing/permission model: UNKNOWN (public read-only
  retrieval attempted 2026-10-04; usable schema unavailable from that path).
- Whether the proposed `plugin.json` shape matches the current qualified
  portable root metadata format: UNVERIFIED.
- Whether plain ESM executes on the intended Android surface and whether a
  qualified CSPRNG exists there: BLOCKED (native observation required).
- No compatibility claim is made. Lack of native access does not authorize an
  ESM→Python replacement; only exact incompatibility evidence can trigger the
  accepted separately qualified Python path.
