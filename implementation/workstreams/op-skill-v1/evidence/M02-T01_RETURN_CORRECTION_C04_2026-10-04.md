# M02-T01 corrected return — Main residual correction C04

Date: 2026-10-04
Workstream: `op-skill-v1`
Card: `M02-T01`
Classification: bounded incorrect/incomplete return; unchanged Card remains in_progress
Owner: Execution, under unchanged R8/P2/Card authority

## Exact inspected return and terminal observations

C03 source commit: `d2deabf534098593c80211307eff81e2b3770d10`, tree `ddb27bc10878dfead5fad11a3bf5cf60dde904c5`. Evidence: `implementation/workstreams/op-skill-v1/evidence/M02-T01_IMPLEMENTATION.md`, blob `21acd18e3fcd4275db06e31056719f4f3ce41a6a`.

Main recovered the legal clean feature worktree, current default-branch PWv2 router at `d3ab917f02e4de91b7dbb17915c2287c2387333e`, unchanged approved P2/authority/Card and Board revision 7. All nine changed paths since C03 classification `88df01bc743e1945a4ac92868d6e6434602d6100` are inside the allowed source/check/declared implementation-evidence surface. Prior classification and workflow/authority bytes are unchanged.

Main reproduced `node --check tests/build/check-m02.mjs` (exit 0), `node tests/build/check-m02.mjs` (197/197, exit 0), and `git diff --check` (exit 0). Main separately invoked the actual delivered schema validator/binding functions without changing source. All six C03 literal witnesses are now rejected and original positive examples pass. The residuals below still violate the same complete binding/record obligations; passing the listed witnesses is not sufficient acceptance.

No semantic result or independent Review attempt is created. This is not Review RED, a new Card/Plan cycle, native qualification or a real user stop. The existing source/evidence and C01-C03 history remain immutable/reachable.

## C04-F01 — null/applicability bypasses and incomplete publication context

The actual `bindMetadata` and schema both admit these independent changes to the original otherwise-positive record against the same original frozen MECH_CTX:

- `ref = null`;
- `publication = null, readback = NOT_APPLICABLE`.

The owner permits null ref only when no ref was created and null publication only when nothing was published. The delivered context has no authoritative ref-created/publication-applicability facts or exact verified publication locator; the checks decide those conditions from the returned record itself. This permits suppressing the applicable field instead of proving its applicability. Missing context is not proof that no ref/publication exists. It also prevents the checker from verifying publication against the exact verified P identity as required by §6.1/C03-F01; merely recomposing from a worker-selected member of a claim/base set is not exact P publication binding.

Complete the declared context projection with frozen authoritative applicability/stage facts and exact verified claim/publication/readback identities, and check both presence and absence against those facts. Required context missing/ambiguous must fail, not default to a permissive null/undefined branch. Distinguish claim/base/publication roles and bind fields to the role actually being reported. A result publication commit can legitimately be a descendant of the claim: preserve the general §6 claim/publication/wave-base rule and A5 publication/ancestry requirements rather than making all publication metadata equal the claim/base commit. Do not add the later transition algorithms or implement a provider.

Add only bounded valid/invalid publication and no-publication/no-ref examples sufficient to prove the chosen applicability contract, including the null bypasses and missing-context cases. Keep exact output/blob/locator linkage and all prior mechanical value rejection repairs.

## C04-F02 — provider coherence/fence checks still disagree with their owner

Both the actual provider schema and `bindProvider` admit these independent changes to the original otherwise-positive receipt and OP_CTX:

- `occurrence = VERIFIED, postcondition = no-write-performed`;
- `expected_head = null`.

Security §6 explicitly requires `no-write-performed` to have occurrence NOT_APPLIED, but the function checks only the reverse direction. It checks expected-head equality only if the returned receipt supplies a non-null value, although the original context supplies an expected head and the proposed operation is a ref mutation. Missing expected-head fence cannot prove the bound operation. Similarly, the intended postcondition kind/applicability must be bound by the declared operation, not freely selectable among unrelated grammar branches by the receipt.

Implement one coherent, closed operation-context/receipt predicate for the operation kind, required fence, intended postcondition kind/value and occurrence/readback. Validate the relevant finite domains and required context before accepting any branch; validate both implications for no-write/NOT_APPLIED and declared applicability for non-mutation observations. UNKNOWN remains non-admissible for production action, self-labelled success remains insufficient proof and missing qualified provider/current authority/exact readback still prohibits action. Do not claim real provider atomicity or invent installed primitives.

Add these few direct witnesses and a bound no-write positive. Do not merely add a negative with a mismatched literal while leaving the actual intended-kind/null/missing-context bypass open.

## C04-F03 — immutable coverage is still replaced by a label-only identity

This is a residual of C01-F06/Card A2, not new scope. `schemas/identities.schema.json` defines coverage with only a required arbitrary `acceptance_id`; its immutable `coverage_manifest` is optional and may be null. The actual run-envelope example uses only:

`{ "acceptance_id": "coverage:example:acceptance:v1" }`.

The actual run-envelope schema likewise admits:

`{ "acceptance_id": "refs/heads/main:ACCEPTANCE.md" }`.

Neither record contains an immutable Git/captured-content/composite coverage identity. Hashing the envelope or that label does not bind acceptance content: criteria can change behind the same label without changing these recorded bytes. R8 §3.1, common contracts §§1-3 and Card A2 require exact immutable coverage/acceptance, and explicitly reject a moving branch/path/title/natural-language label alone. No release-defined alternative immutable identity/equivalence class is supplied here.

Require coverage to carry/reference one of the already supported exact immutable identity classes for its complete acceptance surface. A descriptive/routing acceptance label may be retained separately but must not substitute for that identity. Update the concrete cross-linked examples and their supplied digests coherently, and add small label-only/missing-immutable-identity rejection plus valid immutable-coverage/change-invalidates-binding witnesses. Do not invent a general identity framework or a new upstream acceptance surface; do not mutate accepted R8/P2/Card.

## Bounded correction return

Correct C04-F01/F02 residuals of A5/C03 and C04-F03 residual of A2/C01-F06, plus required mechanical source/schema/template/check/manifest/evidence consistency. This remains the unchanged M02 common-contract outcome. Preserve all previously corrected state/owner/effect/policy/identity/lineage behavior and prior exact return outcomes/identities in the declared evidence file. Main's C01-C04 records are read-only to implementation work.

Freeze only the Card's allowed source/check/declared implementation-evidence paths. No push; no workflow/Card/Board/result/review/blocker or accepted authority change; no downstream helper/substrate/profile implementation; no exhaustive/native/real-inference/remote-write/consumer tests, setup changes or Q PASS claims. Return actual bounded commands/outcomes and exact commit/tree/evidence identities. Main rechecks source semantics before normalizing a result and obtaining fresh independent implementation Review.
