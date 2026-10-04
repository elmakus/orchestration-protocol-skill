# Owner-assisted test-envelope template (M01-T01)

> Separate authorization required. Unknown authority, unknown effects, or
> missing guarded test realization blocks the originating test. This template
> chooses no account/device and grants no effects.

## Envelope fields (all required before realization)

```json
{
  "envelope_id": "<operator-assigned test-only id>",
  "candidate_identity": "<exact FIXTURE_MANIFEST.json package_identity_sha256>",
  "helper_linkage": "<exact HELPER_IDENTITY.json sha256_observed + helper_api>",
  "fixture_set_identity": "<exact ORACLE_MANIFEST.json oracle_identity_sha256 (fixture/oracle/harness set; never the package identity)>",
  "authority": {
    "authorizer": "<owner identity>",
    "authorization_locator": "<durable locator>",
    "candidate_binding": "exact",
    "fixture_binding": "exact",
    "account_device_scope": "<owner-declared intended account/device identity; the procedure names nothing>"
  },
  "targets": {
    "account_device_scope": "<owner-bound intended scope from authority above; no substitution>",
    "disposable_content_targets": ["<newly created disposable repo/branch/payload locators under that authority>"],
    "forbidden": ["production account", "consumer repositories", "real branches/refs", "any account/device chosen by the procedure"]
  },
  "allowed_effects_complete": ["<each permitted mechanical effect>"],
  "causally_triggered_effects": ["<each known automation> or UNKNOWN=>BLOCKED"],
  "readbacks": [
    { "step": "N1", "artifact": "<installed digest>", "rule": "VERIFIED requires observed == intended; NOT_APPLIED requires observed == proven precondition; otherwise UNKNOWN, never retryable" }
  ],
  "test_realization": "<environment-authorized guarded path + policy locator>",
  "secrets_rule": "no credentials, tokens, keys, pairing offers, or private context in fixtures, prompts, manifests, or logs",
  "owner_disposition": "UNKNOWN until N11 records ACCEPTABLE / UNACCEPTABLE with exact candidate/setup binding"
}
```

## Binding rules

1. Exact candidate, helper-linkage, and fixture-set identities are bound
   before any step from their separate manifests (`FIXTURE_MANIFEST.json`
   package identity, `HELPER_IDENTITY.json` digest/API,
   `ORACLE_MANIFEST.json` oracle identity). Package and fixture-set
   identities are never conflated. A candidate/oracle edit creates a new
   identity and restarts applicable qualification through the impact manifest.
2. The intended account/device scope is owner-declared in the authorization;
   disposable test content/targets are isolated under that separately bound
   owner authority. The procedure chooses no real account/device. Real
   targets, blanket permission, behavioral inference outside the guarded
   realization, and fabricated owner ACCEPTABLE are forbidden.
3. The complete allowed-effect set plus every causally triggered effect must be
   listed; if any effect is forbidden, unbounded, or UNKNOWN, the originating
   write/test is BLOCKED (no silent auto-narrowing).
4. Readbacks are non-secret exact artifact identities with the three-way
   occurrence rule (VERIFIED / proven NOT_APPLIED / UNKNOWN); retry only
   after positively proven NOT_APPLIED; fail closed while UNKNOWN. A bare
   observed != intended mismatch never proves NOT_APPLIED.
5. If authority, effects, or test realization is unknown, the originating test
   is BLOCKED and the missing input is returned as the concrete blocker.
6. ESM replacement is not authorized by lack of native access; only exact
   incompatibility evidence can trigger the accepted separately qualified
   Python replacement (which must then pass equivalent Q8/Q10).

## Worked example (placeholders only — not authorized targets)

- `candidate_identity`: `<package_identity_sha256 from fixtures/FIXTURE_MANIFEST.json>`
- `fixture_set_identity`: `<oracle_identity_sha256 from fixtures/ORACLE_MANIFEST.json>`
- `account_device_scope`: `<owner to declare; procedure names nothing>`
- `disposable_content_targets`: `<newly created disposable repos/branches>`
- `test_realization`: `<guarded path to be bound by environment/test authority>`
