# Decision — rotate lenses across repeated full OP reviews

Status: accepted owner decision
Date: 2026-10-01
Product: Orchestration Protocol Skill v1
Scope: orchestration-protocol-skill-v1@1
Incorporation state: incorporated in Definition R5

## Decision

When the owner explicitly requests another full Orchestration Protocol review of the same materially unchanged subject after a prior full review, OP MUST NOT mechanically replay the same review-lens portfolio.

Every repeated full review receives a monotonically increasing `review_round` identity and a materially rotated lens portfolio.

## Full coverage remains mandatory

Lens rotation MUST NOT reduce the acceptance surface.

Every repeated full review still covers the complete profile-defined review surface and still includes:
- one whole-subject coherence perspective;
- adversarial/falsification coverage;
- targeted coverage sufficient to own every material review surface;
- deliberate overlap on high-risk seams.

A later repeat is not permitted to say "the previous wave already checked that surface" and omit it.

## Material lens rotation

The new review round MUST differ materially in how it searches for defects.

Merely changing:
- lane IDs;
- wording;
- lane order;
- branch names;
- synonyms for the same questions

does not satisfy rotation.

The coordinator MUST compare the prior full-review package's non-semantic orchestration metadata/prompts/lens manifest and construct a substantially different attack portfolio for the next round without reading prior lane result contents.

Useful alternate lens families include, as appropriate:
- state-machine / crash-point / restart / replay attacks;
- contract fuzzing and equivalence-class attacks;
- implementer-vs-caller competing-interpretation analysis;
- authority/escalation/security abuse cases;
- version / compatibility / migration / stale-host drift;
- acceptance false-GREEN and incomplete-evidence attacks;
- concurrency / CAS / reclaim / ABA / late-writer races;
- context contamination / independence / sealing bypass;
- negative-space / empty-set / NOT_APPLICABLE / partial-terminal cases;
- effect-boundary and irreversible-side-effect abuse;
- provenance / supersession / historical-read ambiguity;
- cross-profile composition and boundary mismatch.

These are examples, not a fixed universal topology.

## Stable structural roles

A whole-surface reviewer and an adversarial reviewer may remain required structural roles across rounds, but their exact attack framing and emphasis MUST be materially changed when the same subject is reviewed again.

Targeted lanes MUST be repartitioned or reframed enough that the repeated wave provides genuinely new independent search pressure rather than duplication.

## Independence from prior findings

Before sealing their own result, repeated-review workers MUST NOT read:
- prior full-review lane result contents;
- prior integrated semantic findings;
- prior focused-revalidation findings;

unless the repeated profile is explicitly defined as a follow-up/revalidation profile rather than a fresh full review.

The repeated full review is fresh discovery, not confirmation of prior conclusions.

## Coordinator visibility

The normal coordinator may inspect prior review package metadata needed to rotate lenses, such as:
- prior review_round;
- lens IDs/categories;
- coverage matrix;
- lane prompts;
- package topology.

It MUST NOT inspect prior lane semantic result contents merely to design the next lens set.

This is consistent with the accepted coordinator lane-content-opacity decision.

## Integration

Each review round has its own:
- immutable package/review_round identity;
- independent worker results;
- fresh integrator;
- durable integrated result.

One round never treats agreement with an earlier round as voting evidence. Later rounds may independently rediscover the same defect; integration within that round still deduplicates by evidence/root cause.

## Current in-flight round

The currently running additional R4 full Definition Review package:
- repository: `elmakus/project-research`
- package revision: `83a7c4539b23f00b7c464cd3a7978c9a3e9b5d33`
- package root: `projects/orchestration-protocol-skill/v1-definition-review-r2`

was launched before this owner decision was recorded.

It remains valid and MUST NOT be mutated or invalidated retroactively.

This rotation rule applies to the next repeated full OP review and all later repeated full reviews after incorporation into the Definition/production skill contract.
