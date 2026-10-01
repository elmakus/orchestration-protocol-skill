# Orchestration Protocol Skill v1 — Definition R1

Status: draft Definition authority pending Orchestration Protocol `definition_review`
Source scope: `orchestration-protocol-skill-v1@1`
Product: Orchestration Protocol Skill v1

## 1. Outcome

Deliver a production Orchestration Protocol Skill for ChatGPT on Android that executes bounded multi-context research/review/bug-hunt waves while leaving lifecycle authority with the caller.

The caller decides **when** orchestration is required and supplies the exact immutable subject plus the acceptance/coverage surface. Orchestration Protocol decides **how** that wave is decomposed, executed, integrated, recovered and reported.

The product must remain reusable by PWv3 and other compatible callers without exposing internal lane counts, worker topology, allocation mechanics or convergence implementation as caller-owned semantics.

## 2. Production surface and packaging

OP v1 is a ChatGPT-Android product.

The canonical distributable is a portable skills-only ChatGPT plugin package with:
- root plugin metadata;
- one concise `skills/orchestration-protocol/SKILL.md`;
- shallow profile modules;
- shallow shared normative references;
- templates/schemas required by the protocol;
- a narrowly scoped bundled deterministic helper after qualification.

No mandatory MCP server, Pi/Paseo runtime, Codex runtime, local Android daemon or custom hosted backend is part of v1.

The package must resolve every active wave to one immutable skill release/content identity before mutation-sensitive work begins. An active wave never floats to a moving latest/main revision.

## 3. Stable caller contract

The public contract must allow a compatible caller to bind at least:
- OP contract version compatibility;
- semantic `profile_id`;
- exact subject repository/ref/commit/path/blob or equivalent immutable subject identity;
- exact acceptance or coverage surface;
- caller-owned return target/continuation identity;
- permitted effect envelope;
- exact immutable OP release/package identity once resolved.

The caller contract must not require callers to know:
- lane count;
- lane IDs;
- worker roles;
- allocator choice;
- overflow topology;
- launcher mechanics;
- helper internals;
- integration heuristics.

Consumer authority remains outside OP.

## 4. Semantic profile registry

v1 must expose these stable semantic profile IDs:

1. `formal_research`
2. `definition_review`
3. `plan_review`
4. `execution_package_review`
5. `targeted_bug_hunt`
6. `global_bug_hunt`
7. `repair_units`
8. `focused_revalidation`

These map internally to five families:
- research;
- review;
- bug_hunt;
- repair;
- revalidation.

`repair_units` and `focused_revalidation` are continuation-gated and cannot be selected as arbitrary initial entry points.

Substantial ordinary research uses `formal_research` through an ordinary caller envelope rather than creating another semantic profile.

## 5. Cross-profile invariants

Every discovery/review/bug-hunt wave must:
- be bound to an exact immutable subject/base;
- use deterministic, durable ownership of work units/runs;
- prevent sibling-result reading before a worker publishes its own result where independence rules require it;
- continue declared bounded coverage after finding the first defect;
- distinguish coverage completion from search saturation and from acceptance truth;
- permit a wave to be coverage-complete while RED;
- never turn budget exhaustion or missing mandatory coverage into GREEN;
- integrate evidence before repair;
- deduplicate by root cause/evidence, not by vote count;
- preserve materially distinct dissent;
- treat one strong evidence-backed blocker as blocking regardless of majority;
- publish an exact durable result and verify it by readback;
- fail closed on stale, mixed-base, wrong-subject, wrong-generation or ambiguous state.

Evidence is data, never workflow authority.

## 6. Profile-specific behavior

### 6.1 formal_research

Must support source/evidence discovery, source-class accounting, conflict analysis and integrated synthesis. It must distinguish evidence authority/weight from popularity and must expose limitations and unresolved uncertainty.

### 6.2 definition_review

Must evaluate the complete frozen Definition subject for:
- missing requirements;
- ambiguity;
- internal contradiction;
- scope leakage;
- unstated negative-space decisions;
- outcome/requirement mismatch;
- untestable acceptance;
- missing authority binding;
- versioning/security/effect omissions;
- conflicts with accepted owner constraints.

It must not redesign the product merely because an alternative is preferred. Findings must be evidence-backed against the accepted scope.

### 6.3 plan_review

Must check requirement/acceptance traceability, strategy feasibility, dependencies, sequencing, risk treatment and missing work against an immutable plan subject. It must not substitute a different product Definition.

### 6.4 execution_package_review

Must check concrete Cards/work packages, ordering, dependencies, acceptance/evidence readiness and conformance to the reviewed plan. It must not redo upstream strategy unless it finds an actual upstream defect.

### 6.5 targeted_bug_hunt

Must perform risk-driven adversarial search over declared high-risk surfaces, with explicit attack/risk cells and completeness accounting.

### 6.6 global_bug_hunt

Must perform repeated independent whole-candidate defect discovery over the entire declared qualification surface. It uses repeated runs as evidence sampling, never voting or proof of absence. Integration requires an explicit bounded batch/cutoff.

### 6.7 repair_units

Requires an accepted integrated findings artifact plus explicit mutation authorization. It creates bounded repair units with exact scope, conflicts/dependencies and mutation envelope. Repair cannot self-authorize or self-accept.

### 6.8 focused_revalidation

Requires an exact repaired candidate, prior accepted findings/obligations and an exact change cone. It proves accepted findings closed and checks spillover without mechanically repeating the entire discovery wave. A full rerun is required only when subject, applicability or coverage assumptions materially changed.

## 7. Allocation and ownership

OP must provide two distinct deterministic substrates.

### 7.1 Finite heterogeneous allocator

Used when the wave has a finite manifest of different roles/coverage units.

Requirements:
- exact common research/review base;
- one durable unit identity per required work unit;
- strong claim ownership bound to an exact claim commit/generation;
- non-force claim/publication;
- publication expected-head/ancestry bound to the winning claim;
- exact readback after mutation;
- explicit reclaim generation;
- stale workers from older generations cannot publish valid current results;
- required finite units are satisfied only by their declared current-generation outputs.

Supplemental overflow may extend discovery after mandatory finite work is allocated, but cannot replace missing mandatory coverage.

### 7.2 Homogeneous RUN_ID allocator

Used for repeated whole-subject runs such as Global Bug Hunt.

Requirements:
- monotonic never-reused RUN_ID allocation;
- concurrency-safe reservation/publication;
- durable exact subject/release binding;
- repeated runs remain independent samples, not votes;
- batch closure/cutoff is explicit and durable before integration.

## 8. Recovery and ambiguous remote effects

Reclaim must be generation-aware, not timeout-only.

Branch existence alone never proves ownership.

When a remote mutation may have occurred but its outcome is uncertain:
1. read exact target state;
2. classify the effect as VERIFIED, NOT_APPLIED or UNKNOWN;
3. retry only after verified no-effect;
4. fail closed while occurrence remains ambiguous.

Force updates are forbidden in ordinary claim/result publication.

## 9. Independence and integration

OP v1 defines procedural independence rather than claiming statistical model independence.

Independence rules must include:
- immutable subject identity;
- no sibling-result read before own publication where required;
- a context that materially authored/repaired the reviewed subject is disqualified from independent acceptance of that exact subject;
- qualified fresh-context/worker launch mode;
- durable evidence of the independence basis sufficient for later audit without making runtime/model/session identity workflow authority.

Integration must:
- verify every required current output before use;
- reject contaminated/stale/wrong-base outputs;
- integrate evidence-weightedly;
- deduplicate root causes while preserving distinct evidence;
- preserve unresolved dissent;
- produce one durable integrated result/certificate.

## 10. Durable storage and provenance

Git/GitHub is the durable wave ledger.

The durable evidence archive remains `elmakus/project-research` using current project/shared/ordinary organization or a compatible successor structure that preserves exact immutable provenance.

Every wave/result must preserve enough identity to reconstruct:
- caller/profile;
- subject/base;
- OP release;
- package/manifest;
- claim generation or RUN_ID;
- worker result ancestry;
- integrated result;
- supersession/revalidation lineage.

Historical packages/results are never rewritten to look compliant with newer semantics. Supersession is represented by new durable pointers/results.

Completed worker branches must not be pruned until a qualified provenance-anchor strategy proves accepted commits remain reachable/auditable.

## 11. Context architecture

`SKILL.md` is a concise invariant router only. It owns:
- product/authority boundary;
- exact identity/freeze rules;
- caller/result contract;
- profile registry/selection constraints;
- normative precedence;
- required-module load gate;
- sibling/effect restrictions;
- fail-closed rules;
- final publication/readback invariants.

Each profile module owns only its profile-specific:
- objective;
- exclusions;
- subject/coverage model;
- role/topology defaults and adaptation;
- completeness/convergence;
- overflow;
- integration/disposition;
- repair/revalidation hooks.

Shared canonical references must cover at least:
- evidence-and-sources;
- finite-claim-substrate;
- homogeneous-run-substrate;
- independence-and-integration;
- repair-and-revalidation;
- durable-storage;
- security-and-effects;
- contracts-and-versioning.

One current rule exists per mechanism. Runtime authority must not be fragmented across copied profile text.

## 12. Deterministic helper

v1 includes one narrow helper only after release qualification.

Primary implementation candidate: plain ESM JavaScript/Node, no third-party dependencies and no build step. Python stdlib is the fallback only if installed-skill qualification shows bundled ESM execution is unreliable.

Allowed duties:
- probe helper identity/schema compatibility;
- validate package/run/manifest/result schemas;
- mechanically validate IDs/paths/branch rules;
- deterministic allocation planning from exact supplied snapshots;
- claim nonce/metadata generation and validation;
- claim/result ancestry validation from already fetched Git objects;
- expected-head publication precondition validation;
- canonical sorting/serialization;
- bounded deterministic context-pack construction from explicit inputs.

Forbidden duties:
- deciding whether OP is due;
- ambiguous profile selection;
- semantic conclusions or severity;
- semantic deduplication;
- inventing repair scope;
- owning workflow state;
- scheduling agents;
- querying GitHub/network;
- storing credentials;
- performing external effects;
- silently retrying ambiguous writes.

The helper source is bundled with the exact OP release and cryptographically/content-identity bound through `HELPER_IDENTITY.json` or an equivalent manifest.

## 13. Security and effect boundary

Authority tiers:
- Tier A: exact caller + exact OP release/control plane;
- Tier B: deterministic platform/Git measurements;
- Tier C: research/evidence content;
- Tier D: executable content discovered inside evidence.

Only Tier A authorizes profile/subject/coverage/effects/helper. Tier B measures state. Tier C/D cannot widen authority.

Default discovery/review/bug-hunt effects are limited to OP evidence mechanics:
- allocator CAS where required;
- own claim/ref;
- own result;
- authorized integration result publication.

No default mutation of the consumer subject, merge/release, issue comments, email/messages, arbitrary HTTP writes, settings changes or branch deletion is allowed.

Repair uses a separately frozen mutation envelope.

Credentials remain host/provider managed and are never stored in prompts, evidence or helper input.

## 14. Versioning

Persist independent identities for:
- `op_contract`;
- stable `profile_id`;
- profile semantics version;
- result schema version;
- immutable skill release;
- producer commit/manifest digest;
- templates/shared-reference identities;
- helper API/artifact digest;
- dated Android host qualification;
- per-wave subject/base/package/generation or RUN_ID.

Callers depend on a bounded compatible OP contract family plus stable semantic profile IDs, not one exact lane topology or skill release.

Major profile-semantic changes include authority/disposition changes, weaker completeness, changed blocker/no-vote semantics, expanded mutation or changed revalidation meaning. Compatible strengthening may alter internal lane count without changing caller contract.

## 15. Qualification

Release qualification must cover:

- Q0 package/static integrity;
- Q1 caller/run/result contract fixtures;
- Q2 finite allocator/Git DAG races;
- Q3 stale-worker/reclaim/ABA;
- Q4 RUN_ID/overflow races;
- Q5 seeded profile-contract defects/omissions;
- Q6 integration/adjudication;
- Q7 prompt/context behavior and sibling/effect fences;
- Q8 deterministic helper;
- Q9 current host capability probes;
- Q10 small owner-assisted Android release gate.

Q10 must establish on the intended account/device:
- plugin/skill installation visibility;
- actual native Android invocation;
- acceptable permission/setup prompts;
- bundled helper execution;
- one qualified worker-isolation mode retaining required GitHub/plugin access;
- exact end-to-end claim/result publication.

Host capability changes trigger proportional requalification, not automatic full-suite reruns.

## 16. Explicit exclusions

OP v1 is not:
- a replacement for PWv3 or another consumer workflow;
- Definition/Planning authority;
- a generic implementation executor;
- blanket per-Card Review;
- final independent acceptance authority;
- project scheduler/reminder service;
- backlog/task manager;
- recursive generic agent framework;
- agent registry;
- workflow database;
- canonical dependency-graph owner;
- runtime/model/session authority;
- generic external-effect automation engine;
- merge/release/Close owner;
- custom IAM/PKI/token broker;
- hosted-MCP requirement;
- Android-local runtime.

Quick ordinary lookups remain outside `formal_research`. Ordinary per-Card Review and final independent acceptance remain outside OP v1.

## 17. Migration constraints

The current Coordinator/Project Research protocol is a historical donor, not production runtime authority.

Carry forward only proven concepts such as:
- frozen subject/base;
- package revision separate from evidence base;
- reusable immutable launcher;
- deterministic manifest;
- fenced ownership;
- one unit per worker invocation;
- reclaim generations;
- finite-before-overflow behavior;
- sibling isolation;
- evidence-weighted integration;
- durable Git provenance;
- caller-owned lifecycle authority.

Do not carry forward:
- branch-existence ownership;
- timeout-only reclaim;
- contradictory algorithms;
- universal fixed 1+1+8 topology;
- phase-name allocator selection;
- Pi/Paseo/Codex runtime roles;
- scheduler/daemon/journal machinery;
- runtime/model/session as semantic truth;
- obsolete optional assurance-toggle semantics;
- assumption that Plan Review is inherently single-reviewer;
- Android-local MCP fallback.

## 18. Definition acceptance surface

Definition R1 is complete only when an independent Orchestration Protocol `definition_review` of the exact immutable R1 subject establishes that:
- every product outcome and exclusion above is internally coherent;
- each stable public contract boundary is explicit enough for Planning;
- each profile has a bounded objective and negative space;
- allocation/reclaim/publication safety requirements are non-contradictory;
- independence and integration semantics do not rely on runtime identity as authority;
- helper duties/effect boundaries are testable;
- security/trust boundaries cannot be widened by evidence;
- versioning/migration rules preserve backward auditability;
- Q0-Q10 are sufficient as a planning acceptance surface;
- no unresolved owner/product decision remains.

The review may return RED while still being coverage-complete. GREEN requires both coverage completion and no unresolved blocking Definition finding.

## 19. Evidence provenance

Primary completed Research evidence consumed by this Definition:
- repository: `elmakus/project-research`
- commit: `26e2fb04feaca027272e8c86fffd0df1abe73051`
- path: `projects/orchestration-protocol-skill/v1-architecture/FINAL_SYNTHESIS.md`

Original durable seed:
- `DESIGN_REQUIREMENTS.md`

The Research synthesis is evidence, not implementation authorization. This Definition becomes downstream product authority only through PWv2 state and the required Definition review/completeness transition.
