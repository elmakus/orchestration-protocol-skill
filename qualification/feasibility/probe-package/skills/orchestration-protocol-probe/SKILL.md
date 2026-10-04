# OP Feasibility Probe (TEST-ONLY)

> **TEST-ONLY probe. Not a production Orchestration Protocol profile, not a fallback runtime, not an admission of production capability.** Completing local checks with this probe does not qualify Android execution, RNG availability, or any production use.

## Purpose

Provide one minimal portable skills-only probe used by M01-T01 local feasibility checks:

- verify the probe package files resolve and parse;
- exercise the bundled mechanical helper (`scripts/op-helper.mjs`) on explicit test-only inputs;
- support disposable local Git fencing equivalents and synthetic negative metadata checks.

## Scope (included)

- Read explicit local test-only inputs supplied by the caller/operator.
- Call the bundled helper for deterministic validation (IDs, paths, branch rules, claim metadata, expected-head preconditions, canonical serialization) and narrow CSPRNG nonce generation.
- Write results only to operator-supplied local output paths or stdout for capture in evidence.

## Scope (excluded — the probe MUST NOT)

- Perform production OP orchestration, admission, or semantic review/bug-hunt/repair/revalidation.
- Perform network calls, GitHub operations, consumer mutations, scheduling, semantic findings, authority decisions, or credential handling.
- Assert native Android installability, invocation, helper availability, or RNG qualification.
- Become a production profile by renaming, copying, or editing PASS labels into it.

## Inputs

Explicit test-only inputs only. Example:

```json
{
  "unit_id": "probe-unit-001",
  "claim_generation": 0,
  "attempt_nonce_hex": "<64 hex chars from qualified CSPRNG>",
  "nonce_source": "node:crypto.randomBytes/qualified-local-only",
  "expected_head": "<40 hex chars>",
  "actual_head": "<40 hex chars>"
}
```

Weak, predictable, short, or unavailable-source fixtures MUST be rejected before any simulated claim. Random output is excluded from deterministic-byte equality assertions.

## Outputs

Mechanical validation verdicts only, e.g. `ADMISSIBLE`, `REJECTED:<code>`, `BLOCKED:<reason>`. No semantic disposition (GREEN/RED/COMPLETE) is emitted by the probe.

## Invocation (local test-only)

```sh
node qualification/feasibility/probe-package/scripts/op-helper.mjs --help
node qualification/feasibility/checks/run-all.sh
```

Native Android installation/invocation is explicitly out of scope for this probe and remains BLOCKED until the owner-assisted procedure in `NATIVE_PROCEDURE.md` is realized under separate authorization.

## Limitations

- Local success proves only local mechanics on this development host.
- Installed-surface predicates (installation, invocation, bundled ESM execution, CSPRNG availability, provider Git fencing, authority/currentness reads, context-source isolation, metadata channels) remain BLOCKED pending native observation.
- See `CAPABILITY_MATRIX.md` and `PACKAGE_OBSERVATIONS.md` for the dated uncertainty inventory.
