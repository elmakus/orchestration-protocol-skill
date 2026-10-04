# M02-T01 corrected return — Main residual correction C05

Date: 2026-10-04
Workstream: `op-skill-v1`
Card: `M02-T01`
Classification: bounded incorrect/incomplete return; unchanged Card remains in_progress
Owner: Execution, under unchanged R8/P2/Card authority

## Exact inspected return and observations

C04 implementation commit: `437c7c21468c069e7805dae9545c9d36fda0840b`, tree `07adbebb08d2f6fdcfff90e9b2289de41034cbdf`. Declared evidence: `implementation/workstreams/op-skill-v1/evidence/M02-T01_IMPLEMENTATION.md`, blob `c6a18ac1bbc443aadfae196f18171de9245ddac9`.

Main recovered current canonical default-branch PWv2 (`d3ab917f02e4de91b7dbb17915c2287c2387333e`), legal clean branch, approved P2/satisfied premiums, unchanged Card and Board revision 7. All 17 changed paths since classification `29655d7aeeab702f20544dcc6c5607f6d0502789` are permitted source/check/declared implementation-evidence paths; prior Main records and authority/workflow bytes are unchanged.

Main reproduced `node --check tests/build/check-m02.mjs` (exit 0), `node tests/build/check-m02.mjs` (218/218, exit 0), and `git diff --check` (exit 0). Separate invocation of actual delivered validators/binding bodies confirms the C04 null-ref/null-publication/fence/no-write/label-only coverage witnesses are now rejected, and the original bound positives pass. The remaining concrete source/check consistency defects below are within A2/A5/A6/A7 and prior C01 obligations. No semantic result or independent Review attempt is created; M02-T01 remains in_progress. This is not Review RED, new scope, a qualification test or a user stop.

## C05-F01 — the bounded validator silently exempts null from const/anyOf

The actual local `validate` function returns zero errors for each independent modification of the run-envelope example:

- `subject = null`;
- `subject.identity_class = null`, leaving the otherwise valid Git identity fields unchanged;
- `coverage.coverage_manifest = null`.

These violate the actual supported immutable identity definitions: the subject union has no null branch, Git's class tag is const git, and immutable coverage is required in a supported non-null class. The validator's unconditional early null return before const/anyOf evaluation silently ignores supported constraints. This undermines C01-F02's schema-enforcement correction and the C04-F03 immutable-coverage negative checks.

Enforce supported enum/const/anyOf/ref constraints for null as well as non-null values. Explicitly allowed null alternatives must remain valid, but absence/null must not bypass a non-null identity or constant. Add these few exact negatives and a legitimate nullable positive; keep unsupported-keyword fail-closed behavior and dependency-free bounded validation, not a general new validator framework or exhaustive test project.

## C05-F02 — actual policy/compatibility/impact manifests do not validate

Using the actual delivered validator against their declared defs in `schemas/policy.schema.json` yields:

- compatibility-manifest.json against compatibility_manifest: additional property note;
- current-policy.json against current_policy: additional property note;
- qualification-impact.json against qualification_impact: additional property rule.

All three record definitions are closed with additionalProperties=false. The build check parses manifests but never validates these actual shipped records against the corresponding defs. Unlike templates, no manifest annotation/container projection is defined. Card A2/A6/A7 require concrete schema-coherent manifests, not just JSON parse success.

Make each actual manifest's record/projection and its sole-owner schema consistent. Non-normative annotations must be explicitly separated/projected or declared as such, never silently ignored or promoted into another rule owner. Validate the actual manifest records in the bounded check. Preserve proposed-construction policy labeling, ineligibility and freshness inputs, acyclic content/detached graph, and unknown-property rejection for actual record fields. Rebind/read back changed template/content/component identities consistently.

## C05-F03 — homogeneous example points to an envelope for a different subject

The C04 homogeneous_batch uses run_envelope_id `runenv:740d6c7267b059f9dab8198b9840d17870b0972a955606246061fd20b0e35745`, the exact digest of the shipped definition_review envelope whose subject is Git example/repo@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:SPEC.md with blob bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb. The batch and its linked current_attempt/supplemental_action instead bind captured-content SHA-256 ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, byte_length 128. Coverage now matches, but subject does not.

A separate wave may reuse an envelope; it cannot change its frozen immutable subject under the same envelope digest. Homogeneous repeated whole-subject work binds the exact owning envelope/wave subject/coverage/release. The checker verifies current_attempt against batch but does not verify the batch against its declared envelope, permitting this mixed-subject positive.

Provide coherent exact synthetic lineage: either bind the homogeneous records to the actual declared envelope subject, or supply a separate valid frozen envelope for the intended homogeneous example. Verify all redundant envelope/batch/attempt/supplemental subject/coverage/release and parent identities appropriate to these examples, and add a small wrong-subject binding witness. Do not implement the later homogeneous allocation/state algorithm or introduce a new product topology requirement.

## C05-F04 — broad impact classes still omit known dependent mechanisms

Actual classification schema-template-record-change maps only Q0/Q1/Q5/Q6. That class includes finite claim/reclaim ownership/fence schema changes, which can directly affect Q2/Q3 evidence, and homogeneous current-attempt/batch changes, which can directly affect Q4. Common-contract-text-change maps Q0/Q1/Q5/Q6/Q7 but can include canonical serialization/identity rules consumed by the helper and allocator, so Q8 and relevant allocator evidence cannot be assumed unaffected. These are already declared dependency surfaces in R8/P2; no safe no-dependency proof is supplied by this broad class mapping.

This is a residual of C01-F07/Card A6. Use a conservative mapping for broad classes that includes every plausibly affected layer, or explicit bounded sub-classification/dependency proof before preserving an omitted PASS. Unknown/unbounded relevance must invalidate all plausibly affected evidence (all Q0-Q10 if not safely bounded). Do not let lookup of a broadly recognized class manufacture a no-dependency proof. Add only representative finite-schema/homogeneous-schema/common-identity impact witnesses; do not run any qualification layer or generate exhaustive fixtures.

## C05-F05 — a necessary occurrence condition is labelled production admission

The actual `productionAdmissible` function returns true for the bare self-authored object `{ occurrence: VERIFIED, readback: VERIFIED }`, with no operation identity/binding, expected-head fence, current authority, qualified source or qualification. The build suite explicitly labels its synthetic positive as production-admissible. Source security §6 correctly says such a self-labelled receipt is not authenticity/atomicity proof, and missing required proof gives no production action.

Keep this small check honestly scoped: a structural occurrence/readback condition may permit further verification, but must not be named or asserted as sufficient production admission. Either model all mandatory proof gates in a clearly hypothetical bounded projection, or rename/label it explicitly as a necessary structural condition and preserve a negative showing that the unqualified fixture/self-labelled object cannot authorize production. Do not add actual qualification/provider execution or weaken the correct source contract.

## Bounded correction return

Correct C05-F01-F05 plus necessary source/schema/example/check/manifest/evidence consistency, preserving C01-C04 repairs and history. This remains the unchanged common-contract outcome, not a new confidence review or exhaustive qualification programme. Main's C01-C05 records are read-only. Only the unchanged Card's permitted source/check/sole implementation-evidence paths may be changed and frozen.

No push; no accepted authority/Plan/Card/Board/result/review/blocker mutation; no downstream helper/profile/substrate implementation; no native/real-inference/remote-write/consumer/exhaustive tests, setup changes or qualification PASS claims. Return actual bounded terminal commands/outcomes and exact commit/tree/evidence identities. Main rechecks the complete current source/check return before normalization and fresh independent implementation Review.
