# Decision — Orchestration Protocol Skill v1 additional-review RED owner resolutions

Status: accepted owner decision
Date: 2026-10-01
Scope: `orchestration-protocol-skill-v1@1`
Origin integrated review:
- `elmakus/project-research@d8a9e153f9d072a534d933627645f3e0ada54eed:projects/orchestration-protocol-skill/v1-definition-review-r2/FINAL_REVIEW.md`
- blob `9faf7f512faeaf684343186c10780495e66fb98e`
- disposition RED
- coverage COMPLETE

This authority resolves the eight owner/product-choice findings C02, C03, C04, C07, C08, C09, C10 and C16. The remaining additional-review findings are bounded Definition repairs under already accepted authority.

## C02 — caller-visible result-state and profile-disposition model

The production contract uses finite semantic domains for:
- execution state;
- applicability state;
- currentness state;
- coverage state;
- profile disposition.

The Definition must define these domains and total profile-specific mappings for all eight stable profiles.

Required invariants:
- `NOT_APPLICABLE` is terminal and neutral, never GREEN;
- an applicable profile cannot obtain GREEN/clear from an empty mandatory coverage/work set unless its exact profile semantics explicitly establish NOT_APPLICABLE;
- GREEN/clear requires current, applicable, execution-complete and coverage-complete evidence;
- stale, superseded, UNKNOWN, BLOCKED or INCOMPLETE states cannot authorize forward acceptance;
- the Durable Result Contract persists the separate state fields rather than collapsing them into one status.

## C03 — Global Bug Hunt supplemental coverage restoration

For one frozen Global Bug Hunt primary batch:
- `sample_deficit` equals the number of reserved primary RUN_ID members that terminate without a valid completed admissible result;
- failed, blocked or non-result primary members each contribute exactly one deficit;
- a separately authorized supplemental batch revision may restore coverage only with valid completed admissible supplemental runs on the exact same frozen subject/coverage/release semantics;
- valid supplemental results restore deficits one-for-one;
- invalid/blocked/non-result supplemental members do not restore a deficit;
- coverage can become COMPLETE again only when all reserved members of all admitted batch revisions are terminal and the cumulative valid supplemental restoration count is at least the primary `sample_deficit`;
- original failed/blocked primary provenance remains permanently visible and is never rewritten as success.

This is evidence-sampling restoration, not voting.

## C04 — minimum ordinary formal_research assurance floor

`formal_research` keeps topology private/adaptive; no public fixed lane count is required.

Every substantial formal_research wave must nevertheless have a release/profile-owned minimum assurance floor:
- exact frozen question/decision subject and coverage matrix;
- one whole-subject coherence perspective;
- one independent adversarial/falsification perspective;
- targeted coverage sufficient to own every mandatory material question/source class;
- explicit required evidence/source classes appropriate to the subject and caller constraints;
- explicit conflict/contradiction handling;
- bounded convergence/saturation criteria that cannot be satisfied merely by budget exhaustion;
- one integrated synthesis with currentness/limitations and unresolved conflict.

The number and partitioning of targeted workers may adapt to the subject and remain private OP topology.

## C07 — canonical identity hierarchy

Use these distinct scopes:
- `run_envelope_id`: immutable identity/digest of the normalized caller Run Envelope specification;
- `wave_id`: one concrete OP execution of that envelope/profile;
- `batch_revision_id`: child of a wave for profiles using frozen homogeneous RUN_ID batches;
- `RUN_ID`: one individual homogeneous worker/run member inside one batch revision;
- finite heterogeneous work uses `unit_id + claim_generation + attempt_nonce`, not RUN_ID.

One Run Envelope may have multiple authorized waves/continuations; each wave binds exactly one Run Envelope identity. Batch revisions and worker/run identities are children of their owning wave and are never reused across waves.

## C08 — continuation authority versus return/correlation identity

`return_id` is opaque routing/correlation only. It never grants authority.

Continuation-gated admission requires a separate immutable `continuation_authority` identity/record binding at least:
- authority issuer/caller relation;
- authorized profile/action;
- exact prior accepted integrated result/obligation identity where applicable;
- exact subject/candidate/base;
- accepted repair/revalidation obligations/change cone;
- freshness/currentness and supersession constraints;
- caller-requested/frozen mutation/effect envelope.

The integrated durable result must bind an immutable Run Envelope identity/digest that includes or references:
- resolved caller contract/profile/release tuple;
- continuation-authority/prerequisite identities;
- caller-requested effects;
- effective effects after cap intersection;
- exact repair mutation envelope when applicable.

Evidence/result presence never substitutes for continuation authority.

## C09 — non-overlapping normative ownership

Normative ownership is non-overlapping:
- root `SKILL.md` owns only cross-profile product/authority boundary, profile routing/selection, identity freeze/load gates, fail-closed dispatch invariants and the ownership/precedence map itself;
- each profile module solely owns that profile's objective, exclusions, coverage, topology adaptation, convergence/completion/disposition and profile-specific hooks;
- shared references solely own common mechanisms in their declared domains, including contracts/versioning, evidence/sources, security/effects, finite claims, homogeneous runs, independence/integration, repair/revalidation substrate and durable storage.

A root/profile document may reference or summarize a shared mechanism but cannot restate it as a second normative owner. Explicit typed extension points are the only legal profile-specific parameterization of a shared mechanism. Apparent cross-owner contradiction fails closed.

## C10 — qualification freshness and partial requalification impact

Every immutable release owns a `qualification-impact manifest` that:
- inventories qualified host/context/capability/helper/reference/profile identities or fingerprints;
- classifies materially relevant change classes;
- deterministically maps each changed class/identity to the Q0-Q10 layers whose PASS evidence is invalidated.

On any observed change:
- recompute the impact mapping before reusing qualification evidence;
- invalidate every mapped PASS until requalification succeeds;
- UNKNOWN/unclassified relevance or dependency fails closed and invalidates every plausibly affected Q-layer;
- if the impact cannot be safely bounded, Q0-Q10 are all stale and must be requalified for the candidate.

Harmless changes may preserve unrelated PASS evidence only when the release-owned impact manifest proves no dependency.

## C16 — claim nonce security requirement

Every fresh finite-claim `attempt_nonce` must contain at least 128 bits of entropy produced by a qualified cryptographically secure random-number generator (CSPRNG).

Requirements:
- use an OS/platform/provider cryptographic RNG qualified for the release/host;
- no timestamp, model-generated text, counter, ordinary pseudo-random generator or other predictable source may substitute for the required entropy;
- formatting/encoding may add deterministic metadata but the fresh random component itself must provide at least 128 bits of entropy;
- no weak/degraded fallback is permitted;
- if a qualified CSPRNG is unavailable, invalid or cannot supply the required entropy, claim creation is prohibited and the operation fails closed;
- Q8/Q10 must exercise this exact source/entropy/failure policy under concurrency.

The nonce is uniqueness/collision defense for claim ownership; it is not a credential or authorization token.

## Repair authorization

The Definition owner is authorized to incorporate these decisions and bounded editorial/normative repairs for C01-C16 without reopening product scope.

The already accepted repeated-full-review lens-rotation decision is also to be incorporated into the next Definition revision.

After repair, fresh independent focused revalidation must cover all C01-C16 plus directly affected seams and the lens-rotation incorporation. A full review is required only if revalidation proves an unbounded/material scope or architecture change outside this authorized repair cone.
