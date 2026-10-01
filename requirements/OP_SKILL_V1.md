# Orchestration Protocol Skill v1 — Definition R4

Status: bounded repaired Definition authority pending focused independent revalidation
Source scope: `orchestration-protocol-skill-v1@1`
Product: Orchestration Protocol Skill v1

## 1. Outcome

Deliver a production Orchestration Protocol Skill for the native ChatGPT Android product that executes bounded multi-context:
- formal research;
- Definition/Plan/execution-package review;
- targeted/global bug hunts;
- continuation-gated bounded repair;
- focused post-repair revalidation.

The caller decides **when** orchestration is required and binds the exact immutable subject, accepted coverage/acceptance surface, continuation authority and effect request. OP decides **how** the authorized wave is decomposed, executed, integrated, recovered and durably reported.

OP never becomes the caller's lifecycle/Definition/Planning/merge/release authority.

Compatible callers must not depend on lane counts, worker roles, allocator internals, prompt layout, helper implementation or other private topology.

## 2. Production surface and packaging

OP v1 is a ChatGPT-Android product.

The canonical distributable is a portable skills-only ChatGPT plugin package containing:
- root plugin metadata;
- one concise `skills/orchestration-protocol/SKILL.md`;
- shallow profile modules;
- shallow shared normative references;
- required templates/schemas;
- one qualified bundled deterministic/mechanical helper implementation.

Normative v1 behavior is self-contained in that qualified package plus authorized provider tools, including Git/GitHub operations where the exact effect envelope permits them.

No mandatory or optional MCP server, hosted orchestration backend, Pi/Paseo/Codex runtime, Android-local daemon, external scheduler or equivalent external execution service participates in normative v1 behavior.

A moving channel may locate a release before a wave begins, but the exact OP release/content identity MUST be resolved, integrity-verified and pinned before any semantic profile execution, decomposition, worker launch, evidence-producing read, claim or mutation that can contribute to the wave. One active wave never mixes releases.

## 3. Public caller, run and durable-result contract

### 3.1 Caller/Run Envelope

A compatible caller binds at least:
- `op_contract` compatible family/range;
- stable `profile_id`;
- accepted `profile_semantics_version` compatible range/identity;
- exact immutable subject identity;
- exact immutable coverage/acceptance identity;
- caller-owned continuation/return identity;
- caller-requested effects;
- applicable continuation prerequisites;
- exact immutable OP release once resolved.

The Run Envelope freezes the accepted normalized values before worker execution.

Supported immutable subject/coverage identities may include Git repository+commit+path+blob, immutable artifact/content digest, or another explicitly versioned identity class whose equivalence rules are defined by the release. A moving branch, path, URL, title or natural-language label alone is not an immutable identity.

If the subject or coverage is composite, the Run Envelope binds a deterministic manifest/content identity for the complete composite surface.

### 3.2 Ordinary `formal_research` preflight

An ordinary user may begin with a natural-language question rather than a pre-existing repository artifact.

Before workers launch, OP normalizes the request into a bounded Run Envelope containing:
- the exact question/decision subject as immutable captured content;
- explicit constraints/criteria supplied by the caller;
- currentness/freshness horizon where material;
- source/evidence classes and required coverage derived only from accepted profile semantics plus caller input;
- explicit exclusions;
- result/return target.

Purely mechanical normalization may be performed by OP. Any missing choice that materially changes subject meaning, criteria, risk tolerance, currentness, allowed effects or acceptance remains caller authority and must be returned rather than guessed.

### 3.3 Continuation-gated admission

`repair_units` requires:
- exact accepted integrated findings/result identity;
- exact caller/consumer continuation authority;
- exact frozen mutation envelope;
- exact candidate/base to mutate;
- applicable accepted repair obligations.

`focused_revalidation` requires:
- exact prior accepted findings/obligations;
- exact repaired candidate;
- exact change cone;
- exact caller/consumer continuation authority.

Presence of arbitrary paths/artifacts is not continuation authority. Missing, stale, ambiguous or non-authority-bound prerequisites fail closed.

### 3.4 Durable Result Contract

Every OP-integrated result exposes stable caller-visible semantics, independent of serialization.

It binds at least:
- result schema/version;
- caller/run/wave identity;
- profile ID and profile-semantics version;
- exact immutable subject identity;
- exact immutable coverage/acceptance identity;
- exact OP release/content identity;
- execution state;
- applicability/currentness state;
- coverage state;
- profile disposition;
- canonical findings/conclusions;
- materially distinct dissent and unresolved uncertainty where applicable;
- exact admitted worker/run snapshot;
- exact durable result repository/commit/path/blob or equivalent immutable identity;
- publication/readback state;
- supersession lineage when applicable.

Execution completion, coverage completion and profile truth/disposition are distinct. For example, a review may be execution-complete and coverage-complete while RED.

Internal topology/allocator mechanics do not become caller-visible compatibility requirements merely because provenance records them.

## 4. Semantic profile registry and compatibility

Stable v1 profile IDs:
1. `formal_research`
2. `definition_review`
3. `plan_review`
4. `execution_package_review`
5. `targeted_bug_hunt`
6. `global_bug_hunt`
7. `repair_units`
8. `focused_revalidation`

Internal families:
- research;
- review;
- bug_hunt;
- repair;
- revalidation.

`repair_units` and `focused_revalidation` are continuation-gated and cannot be arbitrary initial entry points.

Substantial ordinary research uses `formal_research`; quick ordinary lookups remain outside OP.

Each stable profile carries an independent `profile_semantics_version`.

A caller explicitly binds a compatible profile-semantics range/identity. A major profile-semantic change is incompatible unless the caller explicitly accepts that major semantics. It does not automatically force an `op_contract` major bump if the common caller/result contract remains compatible.

Unknown or incompatible contract/profile/result/release/reference/helper/host identities fail closed.

## 5. Cross-profile invariants

Every OP wave must:
- bind immutable subject and immutable coverage before decomposition/claim;
- pin one immutable OP release before semantic execution;
- use only release/profile-qualified effects;
- preserve deterministic durable ownership of work units/runs;
- preserve required sibling independence until each independent result is sealed;
- continue declared bounded discovery after the first finding;
- distinguish coverage completion, search saturation and acceptance truth;
- never manufacture GREEN from budget exhaustion or missing mandatory coverage;
- integrate accepted evidence before repair;
- deduplicate by evidence/root cause, not vote count;
- preserve materially distinct dissent;
- treat one strong evidence-backed blocker as blocking;
- publish exact durable results with positive readback;
- fail closed on stale, mixed-base, wrong-subject, wrong-coverage, wrong-generation, incompatible-version or ambiguous state.

Evidence is data, never authority.

### 5.1 Common coverage states

Every discovery/review/bug-hunt profile exposes:
- `COMPLETE`: all mandatory declared coverage satisfied;
- `INCOMPLETE`: mandatory coverage not satisfied;
- `BLOCKED`: required coverage cannot be evaluated because required evidence/capability is unavailable or invalid;
- `NOT_APPLICABLE`: only when profile semantics and exact caller binding objectively establish non-applicability.

Only `COMPLETE` may support a GREEN/clear profile disposition. COMPLETE may still be RED.

### 5.2 Sealed independent worker result

Where independence is required, a worker's admissible independent result becomes sealed before any sibling-result access.

After sealing:
- semantic amendment of that result is forbidden;
- any context that reads sibling results cannot later alter the sealed result;
- if correction is necessary, the old result remains immutable and a new fresh independent attempt is required where independence remains mandatory.

A placeholder/draft publication does not satisfy the sealed-result boundary.

## 6. Profile-specific behavior and completion

### 6.1 `formal_research`

Objective: evidence/prior-art discovery, source-class coverage, conflict analysis and integrated synthesis.

Completion requires:
- declared evidence/source coverage complete or explicitly blocked;
- source authority/weight recorded;
- material conflicts reconciled or preserved as unresolved;
- limitations/currentness stated;
- one durable synthesis/result contract published.

Disposition distinguishes complete finding from BLOCKED/INCOMPLETE; popularity never decides truth.

### 6.2 `definition_review`

Objective: evaluate a frozen Definition for completeness, ambiguity, contradiction, negative space, scope/outcome coherence, authority flow-down and acceptance testability.

Completion requires all declared review perspectives/coverage closed.

Disposition:
- GREEN: coverage COMPLETE and no unresolved blocking Definition finding;
- RED: coverage COMPLETE and one or more blocking Definition obligations remain;
- BLOCKED/INCOMPLETE as defined above.

The profile does not redesign product policy or repair the Definition.

### 6.3 `plan_review`

Objective: verify immutable Plan strategy against accepted Definition, including traceability, feasibility, dependency/order, risk treatment and missing work.

GREEN requires complete declared review coverage and no blocking Plan defect. It does not substitute a different Definition.

### 6.4 `execution_package_review`

Objective: verify concrete Cards/work packages, ordering, dependencies, acceptance/evidence readiness and conformance to the reviewed Plan.

GREEN requires complete declared package-review coverage and no blocking package defect. Upstream strategy is reopened only for an evidence-backed upstream defect.

### 6.5 `targeted_bug_hunt`

Objective: adversarial risk-driven defect discovery across an exact declared high-risk surface.

The Run Envelope freezes explicit attack/risk cells or an equivalent exact coverage manifest. GREEN/clear may be issued only when every mandatory cell is COMPLETE and no unresolved accepted blocker remains.

### 6.6 `global_bug_hunt`

Objective: repeated independent whole-candidate defect discovery over the full declared qualification surface.

Before the first primary run:
- reserve/freeze an exact primary RUN_ID set and batch revision;
- bind exact subject/coverage/release identities;
- publish the batch membership durably.

Every reserved RUN_ID reaches a terminal run state.

Only valid completed results contribute evidence. A failed/blocked/non-result terminal member prevents GREEN coverage closure unless a separately authorized bounded continuation reserves an exact supplemental RUN_ID set before those additional runs begin.

A continuation creates a new durable batch revision; the integrated admitted set is the immutable union of closed accepted batch revisions.

A late result cannot enter or mutate an already closed batch revision. It may be considered only through a later explicitly authorized continuation.

Repeated runs are evidence sampling, never votes or proof of defect absence.

### 6.7 `repair_units`

Requires exact continuation admission under §3.3.

Creates bounded repair units from accepted findings. Every unit binds:
- exact defect/obligation;
- exact candidate/base;
- exact mutation paths/surfaces;
- dependency/conflict relationships;
- exact tests/readback/evidence obligation;
- hard effect ceiling.

Repair cannot self-authorize or self-accept.

Coverage/completion for this public profile is explicit:
- `COMPLETE`: every mandatory authorized repair unit has reached a terminal state and every successful mutation has the required exact tests/readback/evidence;
- `INCOMPLETE`: one or more mandatory authorized repair units has not reached a terminal state;
- `BLOCKED`: a mandatory unit cannot be executed or evaluated because required authority, capability, access, exact state or evidence is unavailable/ambiguous;
- `NOT_APPLICABLE`: only when the exact accepted continuation authority establishes that no repair unit is applicable.

Profile disposition is:
- `GREEN`: coverage COMPLETE and every accepted repair obligation is closed with required evidence/readback;
- `RED`: coverage COMPLETE but one or more accepted repair obligations remains open, a required repair failed, or bounded regression evidence remains;
- `NOT_APPLICABLE`: coverage is NOT_APPLICABLE because exact accepted continuation authority establishes that no repair unit applies; no consumer mutation is executed and this neutral terminal disposition MUST NOT be represented as GREEN;
- `BLOCKED` / `INCOMPLETE` as above.

A repair wave may therefore be execution/coverage-complete while RED. Budget exhaustion, partial mutation, or a successful write without its required validation cannot produce GREEN.

The v1 outcome includes this bounded explicitly authorized mutation profile while excluding generic implementation execution.

### 6.8 `focused_revalidation`

Requires exact repaired candidate, accepted prior obligations and bounded exact change cone.

The change cone identifies at least:
- changed semantic entities/sections/artifacts;
- direct dependent acceptance/coverage surfaces;
- affected shared mechanisms/contracts;
- evidence whose applicability may have changed.

Disposition:
- GREEN: every accepted repair obligation closed, bounded neighbor/spill checks clear, prior review remains applicable;
- RED: focused scope remains valid but one or more repair/regression obligations remain;
- ESCALATE_FULL_WAVE: material subject/scope/coverage/acceptance/profile meaning changed, impact cannot be bounded, a materially new defect class appeared, or prior evidence/root-cause assumptions are invalidated;
- BLOCKED: required evidence cannot be evaluated.

A full wave is not repeated merely because bytes changed.

## 7. Allocation, claim ownership and reclaim

### 7.1 Finite heterogeneous allocator

Used for a finite manifest of heterogeneous work.

Each unit has its own current `claim_generation`.

Requirements:
- exact common wave base;
- durable unit identity;
- current per-unit generation in the manifest;
- strong claim ownership bound to exact claim commit + unit + generation + collision-resistant attempt nonce;
- non-force claim/publication;
- result publication expected-head/ancestry bound to the winning claim;
- exact readback after mutation;
- only the current generation can satisfy the manifest.

Reclaim:
- is explicitly authorized;
- requires exact-state readback proving no valid current terminal result for the reclaimed unit;
- increments only that unit's generation;
- retains unaffected valid completed sibling units;
- preserves old generations as immutable non-current provenance;
- rejects stale old-generation publication.

Timeout, worker disappearance or branch existence alone never authorizes reclaim.

Supplemental overflow may extend discovery only after mandatory finite work is allocated and cannot replace missing mandatory coverage.

### 7.2 Homogeneous RUN_ID allocator

Used for repeated whole-subject runs.

Requirements:
- monotonic never-reused RUN_ID allocation;
- concurrency-safe exact reservation;
- exact batch membership under §6.6;
- durable subject/coverage/release binding;
- no voting;
- no retroactive batch-membership mutation.

## 8. Recovery and ambiguous remote effects

When remote mutation occurrence is uncertain:
1. exact-read the target state;
2. classify VERIFIED, NOT_APPLIED or UNKNOWN;
3. retry only after verified NOT_APPLIED;
4. fail closed while UNKNOWN.

Force updates are forbidden in ordinary claim/result/integration publication.

Recovery consumes already durable valid results rather than replaying work because a chat/session disappeared.

## 9. Independence and integration

OP v1 guarantees procedural/auditable independence, not statistical model independence.

Independent-worker admission requires:
- exact common immutable subject/coverage/release;
- no sibling-result content intentionally supplied or consulted before the worker seals its own admissible result;
- subject-relative authorship/repair disqualification where independent judgment is required;
- qualified context/launch mode;
- recorded evidence sufficient to audit the independence predicate.

Host qualification must demonstrate, using current supported context surfaces, that the chosen launch mode does not expose sibling result/conclusion content through the permitted context sources used by the worker. If sibling exposure cannot be excluded or detected to the qualified standard, independence is UNKNOWN and the result is not admissible as independent.

Integration:
- verifies every required current result;
- rejects contaminated/stale/wrong-base/wrong-generation/wrong-version outputs;
- deduplicates by root cause/evidence;
- preserves dissent;
- binds one exact immutable admission/completion snapshot.

### 9.1 Integrated-result publication fence

Before publishing an integrated result, the integrator binds:
- exact admission snapshot;
- exact integration generation/result identity;
- expected current integrated-result pointer/head.

Publication uses CAS/expected-head or an equivalent stale-writer fence, then exact readback.

Prior integrated results remain immutable. Supersession creates a new authorized result/generation and explicit supersession pointer; it never overwrites history opportunistically.

## 10. Durable storage and provenance

Git/GitHub is the durable wave ledger.

For v1 the durable evidence archive remains `elmakus/project-research`.

A compatible successor **structure** in v1 means organization/index/schema/path evolution inside that repository while preserving:
- immutable historical commits/results;
- durable old-to-new index/supersession mapping;
- reconstructable caller/profile/subject/base/release/generation/RUN_ID lineage;
- accepted commit reachability/auditability.

Replacing the repository itself requires future owner/product authority.

Every wave/result preserves enough identity to reconstruct:
- caller/run/profile;
- subject and coverage;
- OP release;
- manifest/package;
- claim generations or RUN_ID batches;
- worker result ancestry;
- integration admission snapshot;
- integrated result and supersession/revalidation lineage.

Historical packages/results are never rewritten to appear compliant with newer semantics.

## 11. Context architecture and normative precedence

### 11.1 Ownership by domain

`SKILL.md` owns only cross-profile invariants and routing:
- product/authority boundary;
- identity/freeze rules;
- caller/run/result contracts;
- profile registry and selection constraints;
- normative ownership/precedence;
- required-module load gate;
- global sibling/effect/fail-closed/publication invariants.

Each selected profile module owns its profile-specific:
- objective/exclusions;
- coverage model;
- topology defaults/adaptation;
- completion/convergence/disposition;
- overflow;
- repair/revalidation hooks.

Each shared reference is the sole canonical normative owner for its declared common mechanism, including:
- evidence-and-sources;
- finite-claim-substrate;
- homogeneous-run-substrate;
- independence-and-integration;
- repair-and-revalidation;
- durable-storage;
- security-and-effects;
- contracts-and-versioning.

A profile may parameterize a shared mechanism only through explicit extension points defined by the shared owner. It may not override a shared invariant.

Duplicated text outside the canonical owner is non-normative summary only. If two current canonical owners appear to contradict on the same semantic domain, execution fails closed; document placement or worker preference never chooses the winner.

### 11.2 Leaf-worker context opacity

Leaf workers are assignment-only.

Their input contains only minimum assignment material:
- immutable assignment/profile/unit identity;
- exact subject and coverage/evidence bindings;
- allowed reads;
- allowed effects/output;
- durable output/publication/readback contract;
- assignment-local completion rules.

Consumer lifecycle/workflow identity, phase routing, premium gates, downstream continuation logic and next-step advice are not worker inputs.

If consumer workflow/lifecycle text is part of the exact reviewed subject or required evidence, it is treated only as subject data. The worker must not adopt it as its own instructions, continue that lifecycle, mutate its workflow state or issue routing advice.

A leaf completion chat response uses exactly:

```text
Assignment: <assignment-id>
Status: COMPLETE | BLOCKED | EXHAUSTED
Durable result: <repository>@<commit>:<path>
Readback: VERIFIED | NOT_APPLICABLE
Blocker: <none | concise blocker>
```

No lifecycle routing, Premium gate, Planning/implementation authorization, consumer-workflow status or "next legal step" is appended.

Integrators may summarize the integrated result required by their assignment, but likewise do not own/continue the consumer lifecycle.

### 11.3 Coordinator pre-integration lane-content opacity

Before an integration result exists, the normal OP coordinator/orchestrator is mechanical/provenance-only with respect to worker outputs.

It may verify:
- every required lane/unit claim and result exists;
- exact claim/result ancestry and generation/RUN_ID identity;
- exact subject/package/release bindings available from manifest/mechanical metadata;
- the declared output artifact exists;
- publication/readback succeeded;
- only the declared mutation/output surface changed where the profile requires that proof.

It MUST NOT open/read/summarize the semantic contents of individual lane/unit result artifacts, infer the wave conclusion from them, deduplicate/adjudicate their findings, or use them to continue the consumer lifecycle.

Once all required outputs are mechanically admissible, the coordinator marks the wave READY_FOR_INTEGRATION and provides the exact fresh-integrator launcher/handoff. The fresh integrator is the first orchestration role that reads all admitted semantic worker outputs together, performs evidence-weighted synthesis/deduplication and publishes one durable integrated result.

After integration, the coordinator consumes the integrated result for caller return/continuation without normally rereading raw lane contents.

Raw lane contents remain durable evidence and may be opened later only under an explicit audit, evidence-recovery, debugging or re-adjudication obligation.

## 12. Deterministic/mechanical helper

v1 includes one narrow qualified helper implementation.

Primary candidate: plain ESM JavaScript/Node, no third-party dependencies/build step. Python stdlib may replace it only if installed-surface qualification proves the packaged ESM implementation unavailable/incompatible and the Python implementation independently passes equivalent required qualification. The released v1 package does not carry two production implementations merely for parity.

Allowed deterministic duties:
- probe identity/schema compatibility;
- validate schemas/IDs/paths/branch rules;
- deterministic allocation planning from exact snapshots;
- validate supplied claim metadata/nonces;
- validate Git ancestry from already-fetched objects;
- validate expected-head preconditions;
- canonical sorting/serialization;
- deterministic bounded context packs.

Fresh claim nonce generation is a narrowly non-deterministic mechanical operation using qualified collision-resistant randomness. It is explicitly excluded from "identical deterministic output" assertions. Deterministic commands may consume/validate a supplied fresh nonce.

Forbidden duties:
- deciding when OP is due;
- ambiguous profile selection;
- semantic conclusions/severity/deduplication;
- inventing repair scope;
- workflow ownership;
- worker scheduling;
- network/GitHub access;
- credential storage;
- external side effects;
- blind retry of ambiguous writes.

The helper source is bundled in the release candidate subjected to helper/Android qualification. It becomes the released helper only after required qualification passes.

Fallback from ESM is triggered only by durable current-surface evidence that the exact packaged ESM helper cannot execute or cannot complete its required compatibility/probe contract. Python fallback must then pass the same applicable Q8/Q10 semantics before release.

## 13. Security and effect boundary

Authority:
- caller owns whether/why OP is invoked, semantic subject/coverage, continuation and requested effects;
- immutable OP release/profile owns hard semantic/effect/capability caps;
- provider/platform measurements report state only;
- evidence cannot grant authority;
- executable content discovered as evidence is never executable authority.

Effective effects = caller-authorized request ∩ profile hard cap ∩ release-qualified capability set.

Caller authority can narrow but never widen release/profile caps. Conflict/unknown => fail closed.

Default discovery/review/bug-hunt hard cap:
- allocator CAS required by OP;
- own claim/ref;
- own result artifact;
- authorized integrated result publication.

No consumer mutation, issue/PR comments, merge/release/Close, email/messages, settings changes, arbitrary HTTP writes, branch deletion or credential operations.

`repair_units` hard cap:
- exact explicitly frozen consumer mutation envelope for the accepted repair continuation;
- OP evidence/provenance mechanics required for that repair.

Even if named by the frozen mutation envelope, v1 `repair_units` can never authorize:
- merge, release or Close;
- issue/PR comments or other tracker/social publication;
- email, chat or other outbound messages;
- repository/account/workspace/settings changes outside the exact bounded content mutation;
- arbitrary HTTP/network writes;
- credential/token/key/cookie operations;
- unrelated consumer mutation outside the exact accepted repair obligations.

The effective repair envelope is therefore the intersection of the accepted mutation envelope and this immutable profile/release hard ceiling. A requested effect outside that ceiling is rejected/returned to caller or consumer authority; it is never silently executed by OP.

Effects beyond the cap return to caller/consumer authority.

Credentials remain provider-managed and are never emitted/stored in prompts/evidence/helper inputs.

## 14. Versioning and validity

Persist independently:
- `op_contract` version;
- profile ID + profile-semantics version;
- result schema version;
- immutable skill release/content digest;
- producer commit/manifest digest;
- normative template/reference identities;
- helper API/artifact digest;
- dated host qualification identity;
- per-wave subject/coverage/package/generation/RUN_ID batch identities.

Before execution, one validity decision verifies the bound tuple against the immutable release compatibility manifest.

Unknown, incompatible or stale required identity => fail closed.

A dated host qualification becomes stale when a materially relevant host capability/surface changes or a required probe fails; affected waves/releases require proportional requalification before relying on that capability again.

Major profile-semantic changes require caller acceptance of the new profile major semantics. Internal topology changes that preserve compatible profile semantics need not change caller compatibility.

## 15. Qualification and release state machine

Every qualification layer returns exactly one of:
- `PASS`: every mandatory predicate assigned to the layer was evaluated and positive evidence proves it satisfied;
- `FAIL`: the required predicate was evaluable and terminal evidence proves at least one mandatory predicate violated, including a negative terminal fixture/probe outcome;
- `BLOCKED`: the layer cannot reach a trustworthy PASS/FAIL decision because required authority, capability, access, fixture, exact state, readback or evidence is unavailable, denied, ambiguous, stale, incompatible or non-terminal.

UNKNOWN, pending, missing and ambiguous evidence are never PASS; while they prevent a terminal decision they map to BLOCKED.

This generic derivation rule applies to Q0-Q10 unless a layer states a stricter compatible predicate. A layer-specific rule may refine which evidence constitutes PASS/FAIL/BLOCKED but may not redefine these meanings.

Every result is durably bound to exact release candidate, applicable profile/mechanism identities, fixture/probe set and evidence locator.

A required FAIL or BLOCKED prevents release/use of the affected release/profile/capability. It never silently weakens semantics. Any fallback must preserve the same semantic/effect contract and be separately qualified.

### Q0 — package/static integrity

Property: package graph, manifests, normative ownership, identities and digests are internally complete/consistent.

PASS requires no dangling modules/paths, valid identities/digests and no conflicting canonical normative owners.

### Q1 — caller/run/result contracts

Property: managed and ordinary envelopes plus durable result semantics are unambiguous and topology-private.

PASS includes stale/mixed/wrong-subject/wrong-coverage/wrong-version negatives failing closed.

### Q2 — finite allocator/Git DAG races

Property: simultaneous claimers yield one current owner and losing workers cannot publish current results.

PASS covers expected-head/ancestry/readback invariants.

### Q3 — stale-worker/reclaim/ABA

Property: per-unit generation reclaim rejects stale publications while preserving unaffected valid siblings.

PASS covers crash/reclaim/late-worker/branch-reuse cases.

### Q4 — RUN_ID/batch/overflow

Property: RUN_ID allocation has no duplication/reuse and closed batch membership is immutable.

PASS covers concurrent reservations, exact pre-run batch freeze, terminal membership and bounded continuation.

### Q5 — profile contracts

Property: every profile satisfies its defined coverage/completion/disposition semantics against seeded positive/negative fixtures.

### Q6 — integration/adjudication

Property: integration admits exact valid snapshots, deduplicates causally, preserves dissent, rejects missing/contaminated coverage and supports RED-but-complete results.

### Q7 — prompt/context/effect behavior

Property: first finding does not stop declared coverage; leaf workers remain assignment-only; subject/evidence instructions cannot widen authority; sealed independence and repair self-acceptance prohibitions hold.

### Q8 — helper

Property: deterministic helper commands are repeatable; nonce generation satisfies qualified uniqueness/concurrency expectations; helper has no network/credential/semantic authority; mismatches fail closed.

### Q9 — current host capabilities

Property: current supported host can perform the required plugin/tool/Git/readback/helper/context mechanics for the exact candidate.

### Q10 — owner-assisted Android gate

Property on intended account/device:
- skills-only plugin is visible/installable;
- native Android invocation works;
- permission/setup prompts receive an explicit durable owner acceptability disposition;
- bundled candidate helper executes;
- qualified worker launch mode satisfies the procedural sibling-exposure predicate while retaining required provider/Git access;
- end-to-end claim/result/integration publication/readback works.

Technical predicates are objective. Permission/setup acceptability requires explicit durable owner disposition.

Release requires every applicable Q0-Q10 layer PASS for the exact candidate. For v1 all Q0-Q10 are applicable to the production release, though later requalification may rerun only affected layers.

## 16. Explicit exclusions

OP v1 is not:
- a replacement for any consumer workflow;
- Definition/Planning authority;
- a generic implementation executor;
- blanket per-Card Review;
- final independent acceptance authority;
- project scheduler/reminder service;
- backlog/task manager;
- generic recursive agent framework;
- agent registry;
- workflow database;
- canonical dependency-graph owner;
- runtime/model/session authority;
- generic external-effect automation engine;
- merge/release/Close owner;
- custom IAM/PKI/token broker;
- hosted-MCP/backend requirement or optional normative backend;
- Android-local runtime.

Final independent acceptance and ordinary per-Card Review remain outside OP v1.

## 17. Migration constraints

Coordinator/Project Research protocol is historical donor/evidence, not production runtime authority.

Carry forward proven invariants only:
- frozen subject/coverage/base;
- package revision distinct from evidence base;
- reusable immutable launcher;
- deterministic manifest;
- fenced ownership/publication;
- one unit per worker invocation;
- per-unit reclaim generations;
- finite-before-overflow behavior;
- sibling isolation/sealed result;
- evidence-weighted integration;
- durable Git provenance;
- caller-owned lifecycle authority.

Do not carry forward:
- branch-existence ownership;
- timeout-only reclaim;
- universal fixed topology;
- phase-name allocator selection;
- Pi/Paseo/Codex runtime roles;
- scheduler/daemon/journal machinery;
- model/session identity as truth;
- optional assurance-toggle semantics;
- old single-reviewer assumptions;
- local/hosted MCP fallback.

Historical packages/results remain immutable and are interpreted according to their original generation/version.

## 18. Definition acceptance surface

Definition R4 is complete only when fresh independent focused revalidation of the exact immutable R4 subject establishes:
- all previously GREEN C01-C16 closures remain applicable and the final residual C04 NOT_APPLICABLE disposition mapping is closed;
- owner decisions in `decisions/OP_SKILL_V1_R1_RED_RESOLUTION.md` are represented without contradiction;
- caller/run/result and continuation admission are sufficiently explicit for Planning;
- every profile has bounded objective, coverage/completion/disposition semantics;
- Global Bug Hunt batch and finite reclaim state models are deterministic and safe;
- sealed procedural independence and integration fencing are objectively verifiable;
- compatibility/effect/normative precedence have one fail-closed interpretation;
- Android skills-only/no-external-backend boundary remains intact;
- helper uniqueness vs determinism semantics are coherent;
- Q0-Q10 form an objective release state machine;
- leaf workers remain consumer-lifecycle-opaque and use the fixed completion receipt;
- the coordinator remains semantic-content-blind to raw lane/unit outputs before integration, while the fresh integrator is the first role that reads them together;
- no unresolved owner/product choice remains.

GREEN revalidation requires every accepted repair obligation closed, bounded spill clear and the R1 full-wave review still applicable.

If focused revalidation proves a material product/profile/security/runtime/coverage change outside the accepted repair cone, it must escalate to a new full Definition Review rather than stretching focused revalidation.

## 19. Evidence provenance

Original seed:
- `DESIGN_REQUIREMENTS.md`

Completed architecture Research evidence:
- repository: `elmakus/project-research`
- commit: `26e2fb04feaca027272e8c86fffd0df1abe73051`
- path: `projects/orchestration-protocol-skill/v1-architecture/FINAL_SYNTHESIS.md`

Integrated R1 Definition Review:
- repository: `elmakus/project-research`
- commit: `64a8b9a08759e911b467672350d3f633e70b3558`
- path: `projects/orchestration-protocol-skill/v1-definition-review-r1/FINAL_REVIEW.md`
- disposition: RED
- canonical findings: C01-C16

Durable R1 RED consumption:
- `implementation/workstreams/op-skill-v1/evidence/OP_SKILL_V1_DEFINITION_REVIEW_R1_RED_CONSUMPTION_2026-10-01.md`

Integrated R2 focused revalidation:
- repository: `elmakus/project-research`
- commit: `070ab8c02883eea8d233f30295621a9a414cd2a8`
- path: `projects/orchestration-protocol-skill/v1-definition-revalidation-r2/FINAL_REVALIDATION.md`
- disposition: RED
- residual obligations: C04, C09, C14

Durable R2 revalidation RED consumption:
- `implementation/workstreams/op-skill-v1/evidence/OP_SKILL_V1_DEFINITION_REVALIDATION_R2_RED_CONSUMPTION_2026-10-01.md`

Coordinator lane-content opacity decision:
- `decisions/OP_SKILL_V1_COORDINATOR_LANE_CONTENT_OPACITY.md`

Integrated R3 focused revalidation:
- repository: `elmakus/project-research`
- commit: `e298f856174915ca320ab24c6e98905ce080babd`
- path: `projects/orchestration-protocol-skill/v1-definition-revalidation-r3/FINAL_REVALIDATION.md`
- disposition: RED
- sole residual obligation: C04-NOT-APPLICABLE-DISPOSITION

Durable R3 revalidation RED consumption:
- `implementation/workstreams/op-skill-v1/evidence/OP_SKILL_V1_DEFINITION_REVALIDATION_R3_RED_CONSUMPTION_2026-10-01.md`

Research/review artifacts are evidence. Definition/decision files are product authority under PWv2.
