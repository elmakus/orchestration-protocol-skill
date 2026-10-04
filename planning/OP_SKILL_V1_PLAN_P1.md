# Orchestration Protocol Skill v1 — Strategic Plan P1

- Workstream: `op-skill-v1`
- Planning cycle: `1`
- Entry subject: `definition:R8|planning-cycle:1`
- Date: 2026-10-04
- Artifact role: executable strategy for independent Stage-6 Plan Review, not implementation or release authorization.

## 1. Authority, evidence and planning boundary

### 1.1 Exact inputs

The accepted authority snapshot is `elmakus/orchestration-protocol-skill@54aaad042f173f7881a7e4854d48fbc0588ad1ca`:

| Input | Repository-relative path | Git blob |
|---|---|---|
| Definition R8 | `requirements/OP_SKILL_V1.md` | `79b53cd7ccb766f7290f73b85f49d56dfcaf65e2` |
| Required Definition-review method | `decisions/OP_SKILL_V1_DEFINITION_REVIEW.md` | `7a60419136277e303934e6099495f04da47c9ff1` |
| R1 owner resolutions | `decisions/OP_SKILL_V1_R1_RED_RESOLUTION.md` | `873643494aa44847aa41590c7106f157e2d467d5` |
| Coordinator opacity | `decisions/OP_SKILL_V1_COORDINATOR_LANE_CONTENT_OPACITY.md` | `a09408e582931b956a40e06de6f2a41729749027` |
| Additional Definition review | `decisions/OP_SKILL_V1_ADDITIONAL_DEFINITION_REVIEW.md` | `7733a8a650a12011797ca2d008710e3cdff05f29` |
| Additional-review resolutions | `decisions/OP_SKILL_V1_ADDITIONAL_REVIEW_RED_RESOLUTION.md` | `56a48744d127be2c05a2884db4d10efc33f24671` |
| Repeated-review lens rotation | `decisions/OP_SKILL_V1_REPEATED_REVIEW_LENS_ROTATION.md` | `29bbcc456d86283d05819814d89c6134db8d3ab6` |
| Definition review round 3 | `decisions/OP_SKILL_V1_ADDITIONAL_DEFINITION_REVIEW_R3.md` | `60a3a690bb7ded44de4b1e776f9de4b45fbd8dcf` |
| Round-3 owner resolutions D1–D7 | `decisions/OP_SKILL_V1_R3_RED_RESOLUTION.md` | `09ad11dc2fb72d58300cea0f9e391924ff13a4e8` |

The Definition owner's R8 GREEN consumption is `implementation/workstreams/op-skill-v1/evidence/OP_SKILL_V1_DEFINITION_REVALIDATION_R8_GREEN_CONSUMPTION_2026-10-04.md` at that snapshot. It accepts `elmakus/project-research@b4dbc1ecfeae9ae3c05d87c06e5b04aadeac99e2:projects/orchestration-protocol-skill/v1-definition-revalidation-r8/FINAL_REVALIDATION.md`, blob `ca7b7e82563a035aa8b4b5de2209a6032073fccf`. No Definition repair/review remains due at entry.

Architecture evidence: `elmakus/project-research@26e2fb04feaca027272e8c86fffd0df1abe73051:projects/orchestration-protocol-skill/v1-architecture/FINAL_SYNTHESIS.md`, blob `76bbbf726d72227900b91563c7dd0a0b5ccf2de3`. Use the integrated synthesis, not raw lane results. Its older state enums, optional mechanisms, topology presets and fallback suggestions are evidence only; R8 and accepted decisions supersede them. Neither old fixed lane counts nor an instruction-only/runtime-backend fallback are production authority.

Premium A for this first R8 planning cycle was satisfied by the user's explicit planning entry/request, durably recorded in commit `1538313ea7cf339a7caf3cee91c4f25177e13881`. Canonical workflow routing was recovered from `elmakus/project_workflow_v2` default branch at `d3ab917f02e4de91b7dbb17915c2287c2387333e`; future continuation must recover the then-current router, not treat this observation as a permanently pinned workflow policy.

### 1.2 Scope and success

Deliver one portable skills-only plugin for native ChatGPT Android, with the eight accepted profiles, two allocation substrates, shared safety/contracts, one bundled qualified helper, durable Git evidence, and a release qualification dossier. Success means the exact production candidate passes all Q0–Q10, including the intended account/device gate. A local suite, authored documentation, or a successful synthetic wave alone is not production success.

The caller retains invocation, subject/coverage, continuation, acceptance and lifecycle authority. OP retains only authorized wave mechanics and integrated reporting. Final independent acceptance, ordinary per-Card Review, merge/release/Close, generic implementation, schedulers, agent registries, MCP/backends and Android-local services are not added to OP. Shipping this repository's package is a consumer workflow action, never an OP profile effect.

This is a strategy/coverage document. Requirement summaries below are traceability, not a second normative product specification. Detailed production rules belong exclusively to the R8-selected owners. No Task Board or executable Cards are materialized during Planning.

## 2. Strategy and feasibility gates

### 2.1 Risk-first sequence

1. **Prove the installed-surface route before broad implementation.** Build only a bounded, non-production feasibility package/probe kit. Check actual skills-only installation, bundled ESM execution/CSPRNG, provider Git fencing/readback, authority/currentness reads, and the closed context/metadata surface. Do not infer Android capability from this development host.
2. **Freeze shared contracts before multiplying profiles.** Establish exact identity/state/effect/authority/version semantics, serialization and normative ownership once. Create golden/negative fixtures before implementing mechanisms.
3. **Build and break the two substrates separately.** Finite generation/claim fencing and homogeneous current-attempt/batch fencing have distinct invariants; do not hide either inside a generic scheduler.
4. **Make sealed isolation, opaque coordination and fresh integration work end-to-end.** Prove both complete and partial-wave reporting before implementing every profile's semantic coverage.
5. **Implement six discovery/review profiles, then the two continuation profiles.** Repair is deliberately late: it depends on authenticated continuation, current claims/candidates, result currentness and effect-closure proof.
6. **Qualify an immutable candidate, not an evolving branch.** Finish the deterministic/composed fixture suite, then perform installed Android tests on the exact package. Any repair creates a new candidate and invalidates qualification according to the impact manifest.

### 2.2 Non-circular qualification

A release candidate is not yet an admissible production OP release. Candidate qualification runs under a separate, explicitly authorized test obligation, against frozen fixtures and bounded disposable targets; it does not use the candidate's own production admission to certify itself. Keep test results distinguishable from production wave results. No candidate may mutate a real consumer under the guise of a qualification fixture.

Early feasibility observations reduce investment risk; they are not final Q9/Q10 PASS for a later candidate. Final qualification binds exact shipped content, host/context/tool identities, fixture set, permissions and readbacks. Qualification attestations/dossiers are detached from the content they qualify, preventing self-referential digests and post-test edits to the package merely to insert PASS labels.

### 2.3 Gate outcomes

- Technical predicate proven violated: record FAIL and the exact evidence; repair inside scope or return the incompatibility to the proper owner.
- Missing access, unobservable context source, uncertain effect, unavailable compliant test path, or pending owner disposition: BLOCKED, not optimistic PASS.
- A bounded implementation defect stays in execution; strategy/order/outcome changes return to Planning; product/runtime/effect changes return to Definition; missing facts route to Research.
- No milestone authorizes an external mutation by itself. Execution Prep must bind the exact target, allowed effects and readback obligation before a live test/publication.

## 3. Deliverable architecture

### 3.1 Intended package and repository surfaces

```text
plugin.json
skills/orchestration-protocol/
  SKILL.md
  profiles/                         # eight shallow profile modules
    formal-research.md
    definition-review.md
    plan-review.md
    execution-package-review.md
    targeted-bug-hunt.md
    global-bug-hunt.md
    repair-units.md
    focused-revalidation.md
  references/                       # sole owners of shared mechanisms
    contracts-and-versioning.md
    evidence-and-sources.md
    security-and-effects.md
    finite-claim-substrate.md
    homogeneous-run-substrate.md
    independence-and-integration.md
    repair-and-revalidation.md
    durable-storage.md
  schemas/                          # versioned structural contracts
  templates/                        # envelopes/checkpoints/assignments/results
  manifests/                        # compatibility + qualification impact
  scripts/op-helper.mjs
  HELPER_IDENTITY.json
tests/                              # deterministic, adversarial and DAG fixtures
qualification/                      # frozen fixture manifests and probe procedures
README.md                           # install, invoke, recover, qualify, limitations
```

Paths below these bounded surfaces may be refined in Execution Prep when the exact host schema is known. This does not authorize an alternate product surface. Use the current qualified portable root metadata format; no Codex/Pi-specific packaging becomes the Android distributable. Static tests/probe harnesses need not ship in the installed package unless the qualified invocation needs them.

Use JSON for machine records/fixtures and Markdown for semantic reports and human launch instructions. Establish an explicit deterministic canonical JSON/identity algorithm and schema versions in M02; reject ambiguous representations. The dependency-free ESM helper uses the Node standard library and consumes explicit supplied inputs. Schemas/templates mirror their normative owner's fields and do not become another semantic owner. Generated context packs are derivative, identity-bound outputs, not independent authority.

The helper may validate structural/state consistency and typed, externally supplied predicate results; it must not infer truth, findings, severity, scope, authority or semantic deduplication. Network/GitHub calls and external writes remain authorized provider operations. Source found in an evidence artifact is never the helper to execute.

### 3.2 Identity and publication design obligations

M02 must specify an acyclic content-identity graph: package files -> content manifest -> immutable candidate identity; detached policy/qualification records reference that identity. Define digest inputs/exclusions explicitly, including why routing-only `return_id` does not alter Run Envelope identity. Support the two immediately needed immutable subject classes: exact Git repository/commit/path/blob and captured-content digest; compose them through a deterministic manifest. Do not add a generic identity framework.

The pre-worker checkpoint binds the normalized envelope, subject/coverage, release/current policy, effects, authority prerequisites and applicable qualification snapshot. It is published/read back before claims, evidence-producing worker reads or effects. Git/GitHub in `elmakus/project-research` remains the wave ledger; it is not the implementation workstream's Task Board.

Define one canonical current-result/supersession authority per qualified caller integration, bound from the envelope/release integration and positively read before forward use. A stored result's publication-time CURRENT cannot stand in for this read. Integration uses immutable admission snapshots, current finite generations or homogeneous attempts, and an expected-head publication fence. Worker seal identity, integrated-result identity and mutable current pointers are distinct; history is never overwritten.

### 3.3 Minimal supported host/caller integration

Qualify only concrete authority-source classes and tool primitives that M01 can observe and M02 can bind. A schema-valid file, matching issuer string, or arbitrary Git path alone does not authenticate a caller. Prove the same bound authority channel or accepted successor, source provenance, exact authority content, currentness and permitted action/effect set. Missing proof blocks continuation; do not introduce a PKI/backend as a workaround.

The candidate Android worker path is an explicitly qualified fresh-chat/manual reusable-launcher flow. Native automated sibling creation is not assumed. The launcher resolves one immutable assignment package; the user does not manually choose claim nonces or repair scope. Full host context-source inventory and exclusion/detection proof, not the word “fresh”, determine admissibility. Tool/Git access must remain usable in the qualified isolation mode. Manual launches are product operation, not a new external scheduler.

## 4. Milestones, dependencies and exit evidence

Milestones describe outcomes, not execution status. Execution Prep will split bounded Cards just in time, with immutable DONE-result dependencies, acceptance and review requirements. At most the canonical PWv2 execution frontier is active; apparent implementation parallelism does not authorize multiple shared-state writers.

### M01 — Production-surface feasibility and bounded test kit

**Dependencies:** approved P1 and satisfied Premium C; no implementation starts before those workflow gates.

**Work:** package a minimal non-production skill with an exact bundled helper identity/probe; inventory current official package requirements and the intended account/device surface. Prepare test-only immutable inputs and exact disposable Git targets. Probe install/invocation, ESM execution, qualified CSPRNG, object/ref reads, non-force fenced claim/publication equivalents, exact readback, release-policy resolution, caller-authority provenance and current-result reads. Inventory every implicit semantic context source and coordinator-visible metadata channel. Trial the negative sibling/metadata-leak path without exposing real findings.

**Exit evidence:** a dated capability/uncertainty matrix with immutable probe artifacts, proposed supported tool/context mode, permission/setup observation and owner disposition. All blocking feasibility predicates have positive evidence; a mere documentation claim is insufficient. Explicitly prove that the selected Git primitives can realize required fencing, not “read then blindly write”. Feasibility for repair includes a viable current-authority/current-generation/current-candidate fence at consumer write time.

**Stop/reroute:** if account/device access or permission acceptability is unavailable, the live gate is BLOCKED. If ESM is objectively incompatible on the installed surface, record that exact evidence before considering the accepted Python-stdlib replacement; it must later pass equivalent Q8/Q10, and only one implementation ships. Missing isolation, CAS, authority provenance or helper support is not permission to add a backend or weaken guarantees. Do not begin broad M02–M07 implementation while core product feasibility is unresolved.

### M02 — Shared public contracts, authority and release model

**Dependencies:** M01 accepted feasibility result.

**Work:** implement root routing/ownership map, the shared contracts/evidence/security/storage owners, versioned record schemas/templates and fixture oracles. Cover Caller/Run Envelope, continuation authority, wave checkpoint, finite/homogeneous identifiers, separate result states, admission/seal descriptors, current-result pointer, compatibility/release policy, qualification impact and detached qualification evidence. Define coordinator metadata as a closed typed grammar. Make ordinary research normalization/ambiguity handling explicit. Map each supported authority-source class to its positive verification procedure.

**Exit evidence:** Q0/Q1 development fixtures pass for the exact contract revision; deterministic canonicalization vectors include composite identities, conflicting redundant fields, routing-only changes and all invalid state tuples. Static ownership audit finds no duplicated normative owner or hidden template rule. Test release revocation/minimum floor, missing policy and stale qualification before any launch. Supported integration/serialization choices are concrete, not placeholders.

**JIT boundary:** M03–M05 Cards are derived from the accepted schemas and actual M01 primitives. Do not pre-create API-dependent Cards before those results exist.

### M03 — Qualified-helper candidate and finite-claim substrate

**Dependencies:** M02; actual primitives proved by M01.

**Work:** implement the one helper candidate, identity/probe, deterministic validation/allocation/context-pack duties, narrow CSPRNG generation and the finite substrate. Provider-mediated claim/result operations use the exact common base, strong claim identity, per-unit generation, non-force expected-head/ancestry fencing and readback. Implement single-use reclaim and operation recovery without timeout authority; preserve valid siblings. Validate current generation/claim/candidate again at every repair-effect boundary.

**Exit evidence:** Q2/Q3/Q8 deterministic development fixtures and local disposable Git DAG races; two claimers produce one current winner, losing/stale/ABA claimants cannot publish current results or perform consumer writes. Replayed reclaim cannot advance twice. Crash/lost-response fixtures distinguish VERIFIED/NOT_APPLIED/UNKNOWN. Qualified nonce generation has at least 128 bits from the proven cryptographic source; weak-source, failure and concurrency fixtures pass. Random output is excluded from byte-identical deterministic-command assertions.

**Boundary:** statistical uniqueness samples alone do not prove entropy. Audit the actual generator/source path and reject an arbitrary caller-supplied “secure RNG” label. No helper network, credentials, scheduling or side effects.

### M04 — Homogeneous RUN_ID and batch/current-attempt substrate

**Dependencies:** M02 and M03's shared helper/publication primitives; not the finite allocator algorithm.

**Work:** implement monotonic reservation, exact primary batch freeze, per-RUN_ID recovery/current-attempt CAS, sealed-attempt binding, terminalization/replacement and one-shot supplemental authorization. Keep closed batches immutable and primary deficit provenance visible. Overflow rules for finite discovery remain separate from Global Bug Hunt's primary homogeneous runs.

**Exit evidence:** Q4 development race/crash/replay fixtures pass for reservation, lost worker, replacement, late prior attempt, closed-batch late result and replayed supplemental authorization. Admission resolves the current attempt; a formerly current sealed result cannot slip through. Deficit restoration is one-for-one only for valid exact-subject supplemental results, and all reserved members must be terminal before COMPLETE coverage. No retry creates an extra batch revision from the same authorization.

### M05 — Context isolation, sealing, opaque coordination and integration

**Dependencies:** M02–M04.

**Work:** implement minimum assignment/context packs, exact leaf receipt, closed metadata validation, pre-publication sealing and recovery, mechanical coordinator status, fresh integrator/terminalizer handoff, immutable admission/completion snapshots, result publication fencing, supersession and forward-use currentness resolution. Context-source qualification uses the full closed inventory, including project retrieval, history, memory, instructions, connectors and host caches.

**Exit evidence:** Q6/Q7 development fixtures prove no semantic worker contents or leaks reach the normal coordinator before integration; negative metadata is rejected before publication or declared non-admissible before consumption. A fresh integrator is the first role to combine admitted semantics. Include complete RED, partial INCOMPLETE/BLOCKED, seal-recording crash recovery, mixed/stale/contaminated result rejection, integration writer races and consume-time supersession. A partial wave may preserve strong negative findings but its disposition remains governed by common precedence, never an illicit RED/GREEN override.

**Boundary:** a grammar check alone cannot prove host isolation. Combine static checks, adversarial behavior fixtures and installed-surface qualification later. Unknown/unobservable context sources invalidate affected independence evidence.

### M06 — Six initial-entry profile modules and caller UX

**Dependencies:** M02–M05.

**Work:** implement `formal_research`, `definition_review`, `plan_review`, `execution_package_review`, `targeted_bug_hunt`, `global_bug_hunt`, each owning only its typed applicability/coverage/truth/convergence rules and private topology. Keep quick ordinary lookups outside OP and do not turn these profiles into generic implementation or final acceptance. Supply profile-specific immutable assignment/coverage fixtures and reusable launch instructions. Keep source weighting, bounded discovery beyond the first finding, high-risk overlap and evidence-based integration. Add repeated Definition-review lens rotation without reading prior semantic results; canonical current authority remains mandatory subject data even if it contains historical rationale.

**Exit evidence:** every profile has success/negative/partial/non-applicability fixture coverage per §6 below; formal research meets its full assurance floor and asks the caller on materially ambiguous input. Review coverage distinguishes Definition, strategy and concrete execution readiness. Targeted cells cannot be silently omitted; Global Bug Hunt cannot use voting, no-new-findings or budget exhaustion as acceptance. Coverage-driven topology remains absent from the public caller compatibility contract. User instructions do not ask the coordinator to paste/read findings from workers.

### M07 — Authenticated bounded repair and focused revalidation

**Dependencies:** M03, M05, M06 and accepted shared authority/effect contracts.

**Work:** implement `repair_units` and `focused_revalidation` as continuation-only entries. Bind accepted integrated obligations, exact candidate/base, authentic current continuation and mutation/change cone. Group conflicting repair units or serialize dependencies; every write has a durable operation identity and objective postcondition. Revalidate authority/generation/claim/candidate and expected head immediately before effects; cover aliases, renames, generated/secondary writes and causally triggered automation. Revalidation uses a context that did not repair the subject and did not consume disqualifying conclusions.

**Exit evidence:** Q1/Q3/Q5/Q7 composition fixtures reject self-authored fake authority, stale accepted results, wrong base, replay, reclaimed repair workers, mixed allowed/forbidden requests and every forbidden effect class. Unknown downstream effects block the originating write. Lost-response recovery proves both authorized lineage and complete realized change set. Successful mutation without tests/readback cannot be GREEN. Focused revalidation proves obligation closure, bounded neighbors/spill and origin applicability, or emits RED/ESCALATE_FULL_WAVE/partial/neutral according to R8. Never substitute repairer's producer tests for independent acceptance.

**Boundary:** if qualified tools cannot safely fence current repair authority against a concurrent revoke/reclaim and candidate change, mutation is BLOCKED rather than approximated with an unfenced read/write gap.

### M08 — Composed candidate qualification and operational readiness

**Dependencies:** M01–M07 accepted results.

**Work:** freeze a complete candidate content manifest and Q0–Q10 fixture manifest; run all deterministic/static/DAG tests and permitted behavioral qualification. Exercise ordinary and managed callers, all profile terminal paths, multi-stage continuation chains, recovery after every publication boundary and release/host drift. Complete installation, ordinary use, managed invocation, recovery/reclaim, currentness, qualification and permission documentation. Provide read-only historical package/index interpretation inside `elmakus/project-research`; do not move/rewrite old evidence or delete provenance branches.

**Exit evidence:** exact candidate dossier with terminal evidence for every evaluated layer; Q0–Q8 may be PASS only where all their mandatory predicates, including real behavioral predicates, were actually evaluated. Unevaluated Android-dependent predicates remain BLOCKED/pending work, never inferred from mocks. Q9/Q10 procedures are ready with exact targets and fixtures, and no known local FAIL remains. Profile/default batch choices are bounded and justified by seeded-fixture coverage, not a universal lane count or alleged statistical proof.

**JIT boundary:** final installed-host Cards bind this exact candidate/fixture digest and approved test targets. Any candidate edit restarts applicable qualification through the impact manifest; no moving-branch acceptance.

### M09 — Intended Android gate and release-ready handoff

**Dependencies:** M08 candidate/dossier plus exact owner-authorized account/device/setup and live test envelope.

**Work:** run final Q9/Q10 and any remaining installed-host portions of Q5/Q7/Q8 on the immutable candidate. Verify installation, invocation, exact helper, all context sources, sibling independence, metadata-leak rejection across every exposed channel, concurrent finite claims/CSPRNG negatives, and end-to-end claim/result/integration publication/readback. Obtain the exact durable owner setup disposition: ACCEPTABLE, UNACCEPTABLE or UNKNOWN. Resolve current release policy and qualification impact before reusing any previous evidence.

**Exit evidence:** all Q0–Q10 PASS for the same content identity; owner ACCEPTABLE plus every technical predicate positive. Dossier binds candidate, host/tool/context fingerprints, fixture identities, exact durable readbacks and currentness. A terminal negative is FAIL; missing/ambiguous evidence is BLOCKED. No conditional release on “Q10 later”.

**Release boundary:** prepare an immutable distribution artifact, compatibility/policy references and rollback/admissibility instructions. The repository's workflow/authorized owner, not an OP wave, handles final acceptance and any release publication/merge. If publication is authorized, read back the installed/distributed artifact digest against the qualified candidate; do not edit content after qualification. If authorization is absent, return the exact release-ready evidence and required action without claiming publication or end-of-scope prematurely. Current policy must reject revoked/below-floor rollback; no force-push, historical rewrite or branch pruning.

### 4.1 Dependency graph and JIT frontier

```text
P1 independent GREEN -> approval -> Premium C satisfied
  -> M01 feasibility
  -> M02 common contracts
  -> M03 finite/helper -> M04 homogeneous
  -> M05 isolation/integration
  -> M06 discovery/review profiles
  -> M07 repair/revalidation
  -> M08 exact candidate + composed qualification
  -> M09 Android PASS + release-ready/authorized publication handoff
```

This intentionally favors an auditable serial critical path over speculative parallelism. Test vectors and documentation are delivered with each mechanism, not deferred to M08. M08 composes and rebinds them to one candidate. First Execution Prep should materialize only bounded M01 preparation/probe Cards; later milestones remain JIT outcomes until predecessor results establish stable inputs. No numerical effort/date promise is justified before M01 resolves the dominant host risk.

## 5. Requirement and accepted-decision coverage

`R8 §n` refers to the exact Definition snapshot in §1. `Qn` refers to the accepted qualification layer, not a claim that it has run. Every row has an implementation owner milestone and an observable exit witness; Execution Prep must flow these rows into Card acceptance/dependencies without treating the matrix as a second Task Board.

| Coverage ID | Authority / obligation | Delivery | Required witness |
|---|---|---|---|
| C01 | §§1–2: Android skills-only, eight profiles, no backend | M01, M06–M09 | Exact installed package and native invocation; dependency scan; Q0/Q9/Q10 |
| C02 | §2, §5: release pin precedes semantic work | M02, M05 | Drift/mixed-release/pre-pin worker-read negatives; checkpoint readback; Q1/Q7 |
| C03 | §3.1: immutable/composite subject+coverage, equivalence, routing-only return_id | M02 | Golden canonicalization and conflicting-redundant-identity rejection; Q1 |
| C04 | §3.2, §6.1: ordinary normalization and assurance floor | M02, M06 | Ambiguity returns to caller; coherence/adversarial/source coverage; Q1/Q5 |
| C05 | §3.3: authentic continuation and exact frozen effects/prerequisites | M02, M07 | Same-channel/successor proof; forged/stale/unauthorized continuation rejected; Q1/Q7 |
| C06 | §§3.4–3.5: separate total state domains and publication vs consume currentness | M02, M05 | State oracle, immutable results, current-result readback, invalid/partial negatives; Q1/Q6 |
| C07 | §3.6, §7: envelope/wave/batch/RUN_ID vs unit/generation/nonce hierarchy | M02–M04 | Identity cross-scope/reuse negatives; Q1–Q4 |
| C08 | §4, §14: profile semantics independent compatibility | M02, M06, M08 | Unknown/incompatible major rejection; topology-only compatible change; Q0/Q1 |
| C09 | §5: checkpoint before claim/read/effect; non-fail-fast/no votes/dissent | M02, M05–M06 | Checkpoint ordering attacks, first-finding continuation and dissent fixtures; Q6/Q7 |
| C10 | §§5.2, 9: sealing, immutable terminal identity, crash recovery | M03–M05 | Pre-sibling seal/readback; amendment/late-ref rejection and recovered seal; Q2/Q4/Q6/Q7 |
| C11 | §5.3, §3.5: partial/blocked-wave terminalizer and shared precedence | M05 | Immutable missing-work snapshot; strong negative evidence does not override partial disposition; Q6 |
| C12 | §6.1: research source weights/conflicts/convergence | M06 | Frozen evidence classes, unresolved credible conflict BLOCKED, no budget success; Q5/Q6 |
| C13 | §6.2: Definition review/lens rotation/authority-as-subject-data | M06 | Full-surface matrix, materially different repeat lens, prohibited prior-results fixture; Q5/Q7 |
| C14 | §6.3: Plan strategy/traceability/dependency/feasibility | M06 | Seeded missing requirement, dependency/order and unproved-host strategy findings; Q5 |
| C15 | §6.4: execution package review without silent replanning | M06 | Concrete readiness/Plan-conformance/JIT fixtures and upstream-defect routing data; Q5 |
| C16 | §6.5: targeted risk cells | M06 | Missing mandatory attack cell prevents clear; singleton blocker persists; Q5/Q6 |
| C17 | §6.6: Global primary/supplemental batches, deficit restoration | M04, M06 | Exact closed sets, one-shot restoration, all-terminal predicate, no voting; Q4/Q5 |
| C18 | §6.7: bounded repair and total completion including RED/NA | M07 | Exact units/tests/readbacks, incomplete and terminal failed repair, neutral no-op; Q5/Q7 |
| C19 | §6.8: fresh revalidation, bounded cone/origin applicability/escalation | M07 | Repairer disqualification; all six disposition branches with spill/applicability checks; Q5/Q7 |
| C20 | §7.1: current finite ownership, CSPRNG, per-unit reclaim | M03, M07 | CAS/ABA/replayed reclaim/stale-effect fixtures; sibling retention; Q2/Q3/Q8/Q10 |
| C21 | §7.2: homogeneous recovery/current attempt at seal and admission | M04–M05 | Lost-worker replacement CAS; stale attempt cannot seal, admit or change current state; Q4/Q6 |
| C22 | §8: ambiguous effects/repair operation identity/complete change closure | M03, M07 | VERIFIED/NOT_APPLIED/UNKNOWN; wrong lineage/alias/generated spill rejection; Q3/Q7 |
| C23 | §9: full implicit context inventory and semantic independence | M01, M05, M09 | Every context category excluded or reliably detected; unclassified source stales PASS; Q7/Q9/Q10 |
| C24 | §9.1: integration stale-writer fence/currentness/supersession | M05 | Two integrators, expected-head failure, immutable history and consume-time stale rejection; Q6 |
| C25 | §10: archive, complete provenance and reachable history | M02, M08 | Reconstruct checkpoint->claim/attempt->seal->snapshot->result->supersession; Q0/Q6 |
| C26 | §11.1: exclusive normative owners and typed extensions | M02, M06 | Ownership inventory/graph lint and semantic review; no profile redefines precedence; Q0/Q5 |
| C27 | §11.2: assignment-only leaf context and exact five-line receipt | M05–M07 | Workflow subject injection does not become instructions; receipt shape/field-value tests; Q7 |
| C28 | §11.3: closed semantic-free coordinator metadata and fresh integration | M02, M05, M09 | Exhaustive channel negatives, no semantic blocker/severity/disposition leak; Q7/Q10 |
| C29 | §12: one no-build helper, deterministic boundary, qualified RNG/fallback | M01, M03, M09 | Identity/probe, repeatability, source audit, no network/credentials; Q8/Q10 |
| C30 | §13: protocol mechanics vs requested effects; reject whole forbidden mix | M02, M07 | Default caps, every repair prohibition, downstream-effect/unknown negatives; Q7 |
| C31 | §14: independent version tuple, current policy/minimum/revocation | M02, M08–M09 | Rejected revoked/below-floor/unknown policy; exact artifact readback; Q0/Q1/Q9 |
| C32 | §14.1: qualification impact/freshness, unknown invalidation | M02, M08–M09 | Mapped changes stale dependent PASS; unsafe bound stales all; safe reuse proof; Q0/Q8/Q9 |
| C33 | §15: Q0–Q10 finite verdict meanings, exact evidence | M01–M09 | Complete fixture/layer register and detached candidate dossier; every required layer PASS before use |
| C34 | Q5: every profile terminal branch and mandatory negatives | M06–M08 | At least 40 legal terminal-branch fixtures plus common/individual fail-closed cases; Q5 |
| C35 | Q10: owner acceptability + real metadata/CSPRNG/concurrency gate | M09 | ACCEPTABLE and all technical PASS; UNACCEPTABLE=>FAIL, UNKNOWN=>BLOCKED |
| C36 | §§16–17: exclusions and non-rewriting donor migration | M02, M08 | No runtime/scheduler/dual helper/backend; historical read/index proof, no rewrites; Q0/Q7 |
| C37 | §§18–19: accepted Definition/review provenance | Planning input, M02, M08 | Preserve R8 acceptance and decisions; no reopen/replay or mutation of historical reviews |

### 5.1 Decision flow-down audit

- `OP_SKILL_V1_DEFINITION_REVIEW.md`, `...ADDITIONAL_DEFINITION_REVIEW.md`, `...ADDITIONAL_DEFINITION_REVIEW_R3.md`: their entry gates are discharged by the R8 GREEN consumption, not new production lane-count requirements. The historical exactly-15-lane round is not a v1 universal topology. Covered by C37.
- `...R1_RED_RESOLUTION.md`: frozen batch membership C17/C21; per-unit reclaim C20; separate profile compatibility C08; effects/no backend C01/C30; bounded repair C18/C19; leaf lifecycle opacity C27.
- `...COORDINATOR_LANE_CONTENT_OPACITY.md`: mechanical-only coordinator, fresh integrator, later raw-data access only for explicit audit/recovery — C10/C11/C24/C28.
- `...ADDITIONAL_REVIEW_RED_RESOLUTION.md`: C02 state model -> C06; C03 deficit restoration -> C17; C04 research floor -> C04/C12; C07 identity hierarchy -> C07; C08 continuation -> C05; C09 ownership -> C26; C10 impact -> C32; C16 nonce policy -> C20/C29/C35.
- `...REPEATED_REVIEW_LENS_ROTATION.md`: complete coverage retained, material attack rotation, no prior semantic result consumption, immutable rounds — C13/C28.
- `...R3_RED_RESOLUTION.md`: D1 total state/NA -> C06/C11/C34; D2 return_id -> C03; D3 whole-set/ambient effects -> C30; D4 normalization -> C04/C12; D5 evidence adjudication -> C09/C11/C12; D6 authentic authority -> C05; D7 anti-rollback -> C31.
- Latest R8 seams remain explicit regression targets: partial-wave negatives never override common precedence (C11); replaced homogeneous attempts cannot seal/admit current results (C21). Prior closed review findings are not treated as permission to omit these tests.

## 6. Qualification and test strategy

### 6.1 Layers and mandatory evidence

| Layer | Mandatory test families / objective evidence | Main delivery |
|---|---|---|
| Q0 | Package/owner graph, all paths, manifests/schema identities/digests, no conflicting normative owners; reconstructible detached qualification links | M02, M08 |
| Q1 | Managed + ordinary envelope/result contracts; composites/redundant identity conflicts; optional return_id equivalence; version/profile gates; authentic continuation; stale/mixed/wrong identities; current-result and release-policy reads | M02, M07–M08 |
| Q2 | Concurrent finite claimers, exact winner, expected head/ancestry/non-force/readback, loser publication prevention | M03, M08 |
| Q3 | Crash/reclaim/branch reuse/ABA; single-use authorization replay; retained siblings; stale generation/claim/candidate effect revoked before write | M03, M07–M08 |
| Q4 | Concurrent monotonic reservations; frozen batches; current-attempt activation/replacement/terminalization CAS; late attempt seal/admission rejection; all-terminal membership; supplemental deficit restoration and one-shot replay | M04–M05, M08 |
| Q5 | Frozen per-profile fixture manifest; every legal disposition and applicable-empty-set/stale/superseded/UNKNOWN negatives; each semantic completion/coverage/authority boundary | M06–M08 |
| Q6 | Exact admitted snapshots, same-root vs distinct-root dedup, dissent, strong singleton counterexample amid weaker contrary evidence, unresolved credible conflict BLOCKED, RED-complete, partial-wave precedence, contamination/missing work and integration CAS/currentness | M05, M08 |
| Q7 | Non-fail-fast behavior; subject/evidence injection; assignment-only workers; exact receipt; pre-seal sibling exposure; repair self-acceptance; all metadata channels; mixed forbidden effects, discovery/revalidation mutation, every forbidden repair class, alias/generated/downstream-effect spills | M05–M09 |
| Q8 | Identical deterministic outputs; exact helper identity/API; RNG source/entropy audit plus failure/weak-source/concurrency fixtures; no network/credential/semantic/scheduling authority; mismatch negatives | M03, M08–M09 |
| Q9 | Current exact host plugin/tools/Git/ref/readback/helper/context and policy/authority capabilities; drift and failed probes invalidate affected evidence | M01 preliminary; M09 final |
| Q10 | Intended installed Android/account/device end-to-end; owner permission disposition; actual bundled helper; qualified context launch; complete metadata-leak channel inventory; >=128-bit CSPRNG concurrent finite claims; weak/unavailable RNG negatives; claim/result/integration readback | M09 only final PASS |

Each fixture declares immutable input/oracle, required capabilities, expected state/disposition or rejection, permitted test effects, exact observed output/readback and evidence locator. PASS requires every assigned mandatory predicate; FAIL needs a terminal evaluated violation; missing/non-terminal/stale/ambiguous evidence is BLOCKED. Coverage of test names without observations is not evidence.

### 6.2 Exhaustive state/profile coverage

Start with the finite common state space: 3 execution × 3 applicability × 4 currentness × 4 coverage values = 144 tuples per profile (1,152 across eight profiles), plus invalid/out-of-domain fields. The oracle applies R8 common precedence and explicit typed profile predicates; exhaustive structural checks do not replace semantic behavior tests. Verify BLOCKED over INCOMPLETE, the sole neutral NOT_APPLICABLE tuple, empty applicable work rejection and the prerequisite COMPLETE/APPLICABLE/CURRENT/COMPLETE tuple for truth evaluation.

Freeze at least these **40 legal terminal-disposition branch fixtures**:

| Profiles | Branches per profile |
|---|---|
| `formal_research` | COMPLETE, INCOMPLETE, BLOCKED, NOT_APPLICABLE |
| `definition_review`, `plan_review`, `execution_package_review`, `targeted_bug_hunt`, `global_bug_hunt`, `repair_units` | GREEN, RED, INCOMPLETE, BLOCKED, NOT_APPLICABLE (five each) |
| `focused_revalidation` | GREEN, RED, ESCALATE_FULL_WAVE, INCOMPLETE, BLOCKED, NOT_APPLICABLE |

Add the mandatory negatives and cross-products that can change each branch, not merely one happy case per label: Global NA forbidden after first primary reservation; failed/non-result supplemental member restores zero; repair neutral executes no consumer write; focused escalation requires COMPLETE coverage; material conflict prevents trustworthy judgment; partial wave with a proven blocker still reports common INCOMPLETE/BLOCKED. Seed all profile-specific coverage failures, including missing research evidence class, Definition ambiguity, Plan feasibility/order, execution-package readiness and targeted uncovered cell.

### 6.3 Crash, race and security composition

Inject failure immediately before/after checkpoint publication, claim/reservation, current-attempt CAS, consumer effect, worker result publication/readback/seal recording, snapshot freeze, integration publication and supersession. Recover from exact durable state without replaying known effects. Lost responses require readback; retry only verified NOT_APPLIED; UNKNOWN remains blocked.

Exercise generation/attempt/candidate changes between validation and publication/effect. Require actual qualified fencing, not timing luck. Run concurrent local Git DAG tests and repeat applicable cases through installed provider primitives. Local mocks test algorithms but cannot qualify remote atomicity or Android permissions.

The metadata-leak corpus covers every exposed branch/ref, commit message, output path/name, claim/provenance field and receipt value; enumerate newly discovered channels before reuse. Semantic content must not be displayed to the coordinator by the validator itself. Fixture diagnostics remain mechanical on that surface. Treat unknown fields/channels as non-admissible, not an extensibility shortcut.

### 6.4 Test execution boundary

Prefer static/unit/schema/finite-state/disposable-Git fixtures without LLM inference. Behavioral inference tests must use the execution environment's authorized guarded real-test path; lack of a compliant path is BLOCKED, never a substitute provider/host or a fabricated PASS. A development-harness behavioral result cannot establish installed Android capability. Owner-assisted native tests require their own permitted realization and durable observations; if the applicable execution policy cannot realize that native surface, return the blocker to the environment/test authority without weakening R8 or rerouting production through an external runtime.

No real LLM tests, child workers, Android probes, consumer mutations or production waves are run merely to author this plan. Runtime identity is not added to project workflow authority.

## 7. Operational evidence, migration and release safeguards

- Product source and implementation workflow remain in this repository. OP wave/qualification evidence that needs the archive is published inside `elmakus/project-research` only under the exact authorized test/wave obligation. Cross-repository writes are not inferred from a filename in this plan.
- Every accepted result is reconstructible from immutable checkpoint, package/base distinction, identity tuple, current-generation/current-attempt evidence, sealed results, admission snapshot, integrated result and supersession lineage. Keep historical refs/anchors reachable; no pruning project is included.
- Archive layout may evolve through bounded indexes/mappings within the existing repository; no repository replacement, bulk move or reinterpretation of old results as newly qualified evidence.
- Distribution resolves a moving channel only into an exact integrity-verified release. Current compatibility/minimum/revocation policy must be positively read; stale policy or host qualification blocks new use/reuse. A running wave never silently switches release.
- A candidate repair retains prior FAIL/BLOCKED evidence and creates a new content identity. The release-owned impact manifest determines reruns; unknown impact invalidates all plausibly affected layers, all Q0–Q10 when unbounded. Owner acceptability is exact-candidate/setup evidence, not a perpetual blanket grant.
- Do not store credentials, pairing material, personal account secrets or raw injected private context in fixtures, prompts, manifests or logs. Record sanitized capability observations and exact non-secret artifact identities.

## 8. Risks, challenge findings and response

| Risk | Earliest control / falsification | Response if realized |
|---|---|---|
| Skills-only installation/helper unsupported on intended Android | M01 real package/probe; M09 exact candidate | BLOCKED/FAIL; only evidence-triggered qualified Python replacement; otherwise product-owner boundary |
| Hidden history/memory/retrieval/context leak | M01 closed inventory; M05 adversarial isolation; M09 installed source checks | Independence UNKNOWN/not admissible; stale dependent qualification; no “fresh chat” assumption |
| Provider primitives cannot fence claims/attempts/repair writes | M01 primitive proof; M03/M04/M07 races | Block affected mutation; no force update/read-write approximation/backend |
| Metadata transmits semantics before integrator | M02 grammar; M05 exhaustive negatives; M09 actual channels | Reject before publication/consumption; fail Q7/Q10 if semantic exposure occurs |
| Authenticated continuation/currentness cannot be resolved | M01 source/tool probe; M02 binding; M07 forged/stale negatives | Block forward use/repair; no self-authored authority or correlation-ID authorization |
| Qualification becomes circular or stale | M02 identity/impact DAG; M08 frozen candidate; M09 readback | Detached attestations; test-only authority; candidate revision and mapped reruns |
| Local suite is mistaken for Android certification | Separate preliminary/final evidence, Q9/Q10 exact host gate | Missing native evidence BLOCKED; do not release |
| Semantic duplication/profile divergence | M02 owner graph; M06 extension-only profiles | Shared owner repair plus impacted profile/Q5 reruns; no eight cloned protocols |
| Inference-test policy cannot realize required host | M01 feasibility/test authorization | Concrete blocker to test/environment authority; no bypass or model change |
| Scope expansion into runtime/workflow/consumer automation | C01/C26/C30/C36 and per-Card boundaries | Return to Definition/owner; no scheduler, backend, merge/release profile |
| Expensive full implementation before fatal host finding | M01 hard prerequisite to broad build | Limit sunk work to feasibility package/probes; no speculative broad Cards |

There is no unresolved product-choice request at planning entry: R8 resolves the semantic choices. Host availability, exact qualified primitives and real-test realization remain factual risks with explicit early gates. They are not asserted facts and cannot be solved by quietly changing the target product.

## 9. Execution Prep and change-control handoff

After exact independent Plan Review GREEN is consumed and Premium C is satisfied, Execution Prep can derive the initial Cards from M01. Each Card must cite exact requirement/decision/plan sections, stable included/excluded scope, immutable predecessor result identities, observable acceptance, tests/readback and independent review where required. Use a technical contract only for genuinely cross-component API/schema/idempotency/security seams; do not manufacture one for every documentation/probe Card.

A future Card is represented only when its contract is knowable; otherwise retain a bounded canonical JIT trigger tied to the predecessor result. Qualification setup needing the owner's device/permissions is a real authority/access stop, not a fake READY implementation workaround. Card or milestone completion alone is not an invocation stop; canonical rerouting continues to the next authorized obligation.

Bounded implementation-detail refinement stays in Execution Prep. Material strategy/order/outcome corrections require a new Planning cycle and its gates; product/effect/host-boundary changes require Definition authority. Keep exact failed subjects and independent review evidence immutable. This plan does not approve its own future implementation or delegate workflow semantics to OP.

## 10. Planner completeness/challenge audit

**Planner audit: GREEN for freezing P1.** This is the author's completeness/challenge audit only, not independent Stage-6 GREEN and not any qualification PASS.

- Authority: exact accepted R8/decision blobs and GREEN consumption are bound; architecture evidence is subordinate. Premium A is durable for cycle 1; no stale review gate is replayed.
- Coverage: C01–C37 cover R8 §§1–19, all eight decisions, all eight profiles, Q0–Q10 and both final R8 residual seams. Every item has an implementation outcome and evidence witness.
- Feasibility: host uncertainty is challenged before broad implementation; only skills-only/native/tools/bundled helper are admissible. No unavailable automation, external backend or claimed current host PASS is assumed.
- Dependencies: contracts precede mechanisms; separate finite/homogeneous substrates precede integration; authenticated current effects precede repair; exact candidate precedes final installed qualification. Test-authority separation prevents production-admission circularity.
- Safety/recovery: whole effect-set rejection, ambient effects, pre-effect fencing, current-attempt admission, partial-wave precedence, seal/readback crash recovery, currentness and immutable supersession have explicit adversarial witnesses.
- Independence: assignment-only leaves, opaque coordinator, fresh integration and repairer disqualification are explicit; host inventory/metadata behavior cannot be replaced by textual promises.
- Test sufficiency: 1,152 structural tuples plus at least 40 terminal profile branches and mandatory adversarial/composed/native fixtures; deterministic tests do not claim semantic or installed-host proof.
- Delivery/release: one helper candidate; exact digest/detached dossier; no production use before every Q0–Q10 PASS; owner permission disposition and consumer release authority remain distinct gates.
- Proportionality: no speculative Task Board/Cards, second workflow ledger, generic runtime, bulk evidence migration, dual helper or new authority service. JIT boundaries retain unknown detail without hiding required outcomes.
- Independence boundary: P1 must be frozen as one exact Git commit/path/blob subject with Premium B due. The planning author does not perform or spawn Stage-6 Plan Review. No review approval or Premium C satisfaction is claimed.
