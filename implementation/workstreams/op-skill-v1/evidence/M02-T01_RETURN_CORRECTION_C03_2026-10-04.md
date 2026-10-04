# M02-T01 corrected return — Main residual correction C03

Date: 2026-10-04
Workstream: `op-skill-v1`
Card: `M02-T01`
Classification: bounded incorrect/incomplete return; unchanged Card remains in_progress
Owner: Execution, under unchanged R8/P2/Card authority

## Exact inspected return and terminal observations

C02 source commit: `8d829f6a3b076f4d0e6883f3b0dfbcea288a7af4`, tree `491b83ce2d998b88608dac1641503d95e0d5190f`. Evidence: `implementation/workstreams/op-skill-v1/evidence/M02-T01_IMPLEMENTATION.md`, blob `580e3753174adf0f641f034e3da238fdd3a39652`.

Main recovered the current default-branch PWv2 router (`d3ab917f02e4de91b7dbb17915c2287c2387333e`), legal clean feature worktree, approved P2 and satisfied premiums, unchanged Card and Board revision 7. The scoped diff from C02 classification commit `687c02ec2638c6ae852547183651f094cca567cd` contains only the Card's allowed source/check/implementation-evidence surface. Main's prior correction records and accepted authority/workflow state are unchanged.

Main reproduced `node --check tests/build/check-m02.mjs` (exit 0), `node tests/build/check-m02.mjs` (180/180, exit 0), and `git diff --check` for the return (exit 0). Separate bounded readback invoked the actual delivered validator and `bindMetadata` function bodies without altering source. C02-F01 is corrected: the exact IMPOSSIBLE/CURRENT/COMPLETE/COMPLETE input returns BLOCKED. The five original C02-F02 payload witnesses are addressed, but the complete A5 binding/opacity obligation is not yet implemented.

This is not an independent Review verdict, new scope, Plan defect or native qualification result. No semantic result or Review attempt is normalized; M02-T01 remains in_progress. All three returned commits and prior classification records remain immutable/reachable history.

## C03-F01 — the metadata binding projection validates only part of its context

At this exact return, the original example validates with no schema/binding errors against its own frozen MECH_CTX. Each independent replacement below also yields zero errors from BOTH the actual schema validator and `bindMetadata`, with the rest of the record and context unchanged:

| Field | Replacement | Exact defect |
|---|---|---|
| assignment_id | `assign:9999` | Well-shaped identifier for a different assignment is admitted against bound `assign:0001`; the derived output path still names the original assignment. |
| package_id | `red/all-blockers-found` | Free-form semantic content remains admissible in an existing coordinator-visible field. |
| blob | `ffffffffffffffffffffffffffffffffffffffff` | Well-shaped wrong-bound Git identity passes although binding is expressly mandatory. |

`bindMetadata` compares branch, output_path, ref, commit, ancestry, expected_head and publication only. It ignores assignment/unit/RUN_ID, package/release, subject/coverage, generation/nonce and blob; MECH_CTX does not even supply all of those expected values. The owner says values are never freely chosen but gives no complete field-by-field projection/check for these channels. Changing a character grammar or reusing a self-authored context is not exact binding to the frozen authoritative assignment/manifest/envelope/release/subject/coverage.

Complete one explicit closed per-field value/binding contract and its bounded executable projection for every declared mechanical metadata and execution-receipt field. Expected values must come from the exact frozen package/envelope/assignment/manifest and verified claim/publication/readback identities appropriate to that field, not from the returned worker record itself. Reject valid-shape/wrong-binding values, contradictions and missing required context; optional/null fields must have a declared applicability rule rather than an uncontrolled bypass. An execution receipt must bind the same assignment and exact declared durable result, and objective status/blocker/readback values must not be alternate semantic channels. Keep structural schema validity explicitly distinct from authenticity/source qualification.

Retain positive mechanically derived examples and add only small direct negatives sufficient to witness these omitted binding classes. This is not exhaustive Q7 testing or implementation of later substrate transition algorithms.

## C03-F02 — provider receipt fields remain an alternate free-form channel

Each replacement below validates with zero errors against the actual `provider_receipt` schema, with the original example otherwise unchanged:

| Field | Replacement | Exact defect |
|---|---|---|
| operation_id | `op:all-blockers-found:critical-red` | Open alphanumeric operation namespace transports a semantic conclusion. |
| target | `example/repo:refs/heads/red-critical-blocker` | Open ref suffix transports a substantive blocker outside the mechanically derived bound ref. |
| postcondition | `ref-points-at:ffffffffffffffffffffffffffffffffffffffff` | Closed lexical form alone still admits a postcondition for the wrong intended commit. |

No provider-context binding projection exists in the delivered check. Security §6 closes postcondition spelling, but does not define exact derivation/binding for operation_id, target and the objective postcondition digest, or their coherence with expected_head/occurrence/readback. C02-F02 expressly required that provider receipts/postconditions not offer an alternate free-form coordinator channel.

Finish the provider receipt's closed objective per-field forms and exact binding to the frozen mechanical operation/target/intended postcondition and verified readback. An operation identity is mechanically assigned/bound, never freely named by semantic output. A target and postcondition must be recomposed/checked from the declared operation context, not merely shape-valid strings. Missing/wrong/ambiguous binding must fail before coordinator consumption; a self-labelled success remains insufficient production proof. Add these few witnesses, including a well-shaped wrong-bound operation/target/postcondition and a valid bound positive. Do not invent installed provider primitives or a second normative owner.

## Bounded correction return

Correct only these residuals of C02-F02/Card A5 and mechanical consistency of the affected examples/schema/check/owner/manifests/evidence. Preserve C01 repairs and corrected state precedence. Preserve actual initial/C01/C02 outcomes and identities in implementation evidence. Main's C01/C02/C03 classification files remain read-only to implementation work.

Freeze only the unchanged Card's allowed source/check/declared implementation-evidence paths. No push, authority/Plan/Card/Board/result/review/blocker mutation, downstream helper/profile implementation, real inference, native tests, remote-write tests, exhaustive qualification, account/settings changes or qualification PASS claims. A missing qualified authority/provider/currentness source still prohibits production action. Return exact commit/tree/evidence identities for Main's recheck; only a valid accepted result may proceed to fresh independent implementation Review.
