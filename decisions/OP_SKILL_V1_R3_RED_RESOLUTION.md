# Decision — Orchestration Protocol Skill v1 round-3 owner resolutions

Status: accepted owner decision
Date: 2026-10-01
Scope: `orchestration-protocol-skill-v1@1`
Origin review:
- `elmakus/project-research@1b64a08474683b8ad8e0d343bda7772d863f1470:projects/orchestration-protocol-skill/v1-definition-review-r3/FINAL_REVIEW.md`
- blob `df1bfad45359f59608cb91754bffc308dd34be10`
- disposition RED
- coverage COMPLETE
- canonical findings CR3-01..CR3-18

The owner explicitly delegated selection of the seven unresolved product/security semantics to the coordinator. The following choices are accepted authority.

## D1 — terminal state and applicability model

A proven `NOT_APPLICABLE` result has exactly this caller-visible tuple:
- `execution_state = COMPLETE`;
- `applicability_state = NOT_APPLICABLE`;
- `currentness_state = CURRENT`;
- `coverage_state = NOT_APPLICABLE`;
- `profile_disposition = NOT_APPLICABLE`.

NOT_APPLICABLE is reachable only through the exact profile-owned applicability predicate before substantive profile execution for the relevant obligation. If that predicate is not objectively provable, applicability is UNKNOWN and the terminal disposition is BLOCKED.

For all non-success cases, common state precedence is release-owned shared semantics and must map every legal tuple to one deterministic disposition; contradictory/unlisted tuples fail closed to BLOCKED.

## D2 — routing identity

`return_id` is optional routing/correlation metadata only:
- it is not part of semantic `run_envelope_id` identity/equivalence;
- changing only `return_id` does not create a new semantic Run Envelope;
- it may vary across technical retries/handoffs;
- when present it is retained separately for traceability;
- it never grants continuation or effect authority.

## D3 — effect authorization and ambient effects

Mandatory OP protocol mechanics needed to realize an otherwise authorized wave — allocator/claim metadata, OP-owned ledger/provenance, worker result publication and integrated-result publication — are protocol mechanics authorized by valid OP invocation, not caller-requested consumer effects.

Caller-requested effects govern consumer/external effects beyond those protocol mechanics.

If a caller requests any effect outside the profile/release hard cap, the entire requested-effect set is rejected/BLOCKED. OP never silently auto-narrows a mixed allowed+forbidden request.

A known causally triggered automation/effect caused by an OP write is part of the realized effect envelope when it can materially mutate consumer/external state. If such downstream effects are forbidden, unbounded, unknown or cannot be proven within the cap, the originating write is not authorized.

## D4 — ordinary formal_research normalization

OP may normalize only values uniquely derivable from:
- explicit caller input;
- immutable accepted profile defaults;
- deterministic canonicalization/equivalence rules.

If two or more materially different interpretations remain for subject meaning, criteria, exclusions, freshness, risk tolerance, evidence classes, acceptance or effects, OP must return to caller authority rather than guess.

The review/coverage minimum and convergence/completion sufficiency are profile semantics, participate in `profile_semantics_version`, and are not private topology.

## D5 — evidence adjudication

One strong reproducible evidence-backed counterexample to a mandatory invariant is sufficient to establish a blocking finding; no voting threshold is required.

When materially credible evidence conflicts:
- authority, direct reproducibility, causal explanation and source quality are used to adjudicate;
- if a violation is established, disposition is RED even if contrary evidence exists;
- if the material conflict cannot be resolved to a trustworthy semantic judgment, disposition is BLOCKED, never GREEN;
- dissent remains durably preserved.

An `accepted blocking finding` is an integrator adjudication under these rules, not majority agreement.

## D6 — continuation-authority authenticity

No new backend, PKI service or identity service is introduced.

A continuation-authority object is genuine only when:
- the original Run Envelope binds a qualified caller/consumer authority channel and authority class;
- the continuation is obtained from that same bound authority channel or its explicitly authorized durable successor;
- positive verification binds exact issuer/caller relation, authority locator/content identity, currentness/supersession state, authorized profile/action, prior accepted result/obligation, subject/candidate and effect/mutation envelope;
- the authority source is one of the release-qualified authority-source classes supported by the caller integration.

A self-authored file/artifact that merely has the right schema is evidence, not authority. OP-produced evidence/results cannot mint or elevate continuation authority.

## D7 — release currentness and anti-rollback

Immutable historical releases remain valid only if current release policy says they are still admissible.

Before starting or reusing a wave through a moving/current release channel, OP must resolve and positively read back a current release-policy manifest from the canonical distribution authority already used by the skills-only product.

That manifest binds at least:
- current policy identity/version;
- `minimum_supported_release` or equivalent floor;
- explicitly revoked release identities/digests;
- optional supersession/reason metadata;
- currentness/freshness rule.

A candidate release is admissible only if:
- integrity/compatibility/qualification checks pass;
- it is not revoked;
- it satisfies the current minimum-supported floor.

If current release policy is required but cannot be resolved/read back or is stale/ambiguous, execution fails closed.

This mechanism uses the existing distribution/provider surface and does not introduce a hosted OP backend, daemon or PKI service.

## Repair authorization

The Definition owner is authorized to perform bounded repair for CR3-01..CR3-18 and directly affected seams using these seven decisions.

The repair must preserve:
- native ChatGPT Android target;
- skills-only package;
- no normative external backend/MCP/daemon/runtime;
- all eight stable profile IDs;
- caller-owned lifecycle authority;
- coordinator pre-integration semantic opacity;
- repeated-review lens rotation;
- fail-closed semantics;
- immutable evidence history.

Fresh independent focused revalidation is required after repair. A new full review is required only if repair proves the accepted cone cannot contain the change or materially changes the preserved product/runtime/security/lifecycle boundary.
