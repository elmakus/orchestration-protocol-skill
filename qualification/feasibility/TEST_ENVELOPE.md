# Owner-assisted test-envelope template (M01-T01)

> Separate authorization required. Unknown authority, unknown effects, or
> missing guarded test realization blocks the originating test. Do not choose
> real targets or account settings in this template.

## Envelope fields (all required before realization)

```json
{
  "envelope_id": "<operator-assigned test-only id>",
  "candidate_identity": "<exact package sha256 + HELPER_IDENTITY digest>",
  "fixture_set_identity": "<exact FIXTURE_MANIFEST package_identity_sha256>",
  "authority": {
    "authorizer": "<owner identity>",
    "authorization_locator": "<durable locator>",
    "candidate_binding": "exact",
    "fixture_binding": "exact"
  },
  "disposable_targets": {
    "install_target": "<owner-named disposable account/device/sandbox>",
    "git_targets": ["<newly created disposable repo locator>"],
    "forbidden": ["production account", "consumer repositories", "real branches/refs"]
  },
  "allowed_effects_complete": ["<each permitted mechanical effect>"],
  "causally_triggered_effects": ["<each known automation> or UNKNOWN=>BLOCKED"],
  "readbacks": [
    { "step": "N1", "artifact": "<installed digest>", "rule": "VERIFIED/NOT_APPLIED/UNKNOWN" }
  ],
  "test_realization": "<environment-authorized guarded path + policy locator>",
  "secrets_rule": "no credentials, tokens, keys, pairing offers, or private context in fixtures, prompts, manifests, or logs",
  "owner_disposition": "UNKNOWN until N11 records ACCEPTABLE / UNACCEPTABLE with exact candidate/setup binding"
}
```

## Binding rules

1. Exact candidate/fixture identities are bound before any step; a candidate
   edit creates a new identity and restarts applicable qualification through
   the impact manifest.
2. Disposable targets only. Real targets, blanket permission, behavioral
   inference outside the guarded realization, and fabricated owner ACCEPTABLE
   are forbidden.
3. The complete allowed-effect set plus every causally triggered effect must be
   listed; if any effect is forbidden, unbounded, or UNKNOWN, the originating
   write/test is BLOCKED (no silent auto-narrowing).
4. Readbacks are non-secret exact artifact identities with VERIFIED /
   NOT_APPLIED / UNKNOWN classification; retry only after verified
   NOT_APPLIED; fail closed while UNKNOWN.
5. If authority, effects, or test realization is unknown, the originating test
   is BLOCKED and the missing input is returned as the concrete blocker.
6. ESM replacement is not authorized by lack of native access; only exact
   incompatibility evidence can trigger the accepted separately qualified
   Python replacement (which must then pass equivalent Q8/Q10).

## Worked example (placeholders only — not authorized targets)

- `candidate_identity`: `<sha256 from fixtures/FIXTURE_MANIFEST.json>`
- `install_target`: `<owner to name disposable device>`
- `git_targets`: `<two newly created disposable repos>`
- `test_realization`: `<guarded path to be bound by environment/test authority>`
