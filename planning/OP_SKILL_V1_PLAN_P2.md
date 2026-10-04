# Orchestration Protocol Skill v1 — Strategic Plan P2

- Workstream: `op-skill-v1`
- Planning cycle: `2`
- Entry subject: `definition:R8|strategy:build-first-test-later@1|planning-cycle:2`
- Date: 2026-10-04
- Strategy: complete candidate best effort first; separate final-candidate testing and evidence-driven correction later.
- Artifact role: material strategy for independent Stage-6 Plan Review, not its own approval or a production qualification verdict.

## 1. Exact authority, preserved evidence and success boundary

### 1.1 Authority snapshot

All paths in this table are bound at `elmakus/orchestration-protocol-skill@260cf0503c4827485e4907839b67dd18ccd3e571`:

| Input | Repository-relative path | Git blob |
|---|---|---|
| Definition R8 | `requirements/OP_SKILL_V1.md` | `79b53cd7ccb766f7290f73b85f49d56dfcaf65e2` |
| Definition-review method | `decisions/OP_SKILL_V1_DEFINITION_REVIEW.md` | `7a60419136277e303934e6099495f04da47c9ff1` |
| R1 owner resolutions | `decisions/OP_SKILL_V1_R1_RED_RESOLUTION.md` | `873643494aa44847aa41590c7106f157e2d467d5` |
| Coordinator opacity | `decisions/OP_SKILL_V1_COORDINATOR_LANE_CONTENT_OPACITY.md` | `a09408e582931b956a40e06de6f2a41729749027` |
| Additional Definition review | `decisions/OP_SKILL_V1_ADDITIONAL_DEFINITION_REVIEW.md` | `7733a8a650a12011797ca2d008710e3cdff05f29` |
| Additional-review resolutions | `decisions/OP_SKILL_V1_ADDITIONAL_REVIEW_RED_RESOLUTION.md` | `56a48744d127be2c05a2884db4d10efc33f24671` |
| Repeated-review lens rotation | `decisions/OP_SKILL_V1_REPEATED_REVIEW_LENS_ROTATION.md` | `29bbcc456d86283d05819814d89c6134db8d3ab6` |
| Definition review round 3 | `decisions/OP_SKILL_V1_ADDITIONAL_DEFINITION_REVIEW_R3.md` | `60a3a690bb7ded44de4b1e776f9de4b45fbd8dcf` |
| Round-3 resolutions D1–D7 | `decisions/OP_SKILL_V1_R3_RED_RESOLUTION.md` | `09ad11dc2fb72d58300cea0f9e391924ff13a4e8` |
| Build-first owner decision, revision 1 | `decisions/OP_SKILL_V1_BEST_EFFORT_BUILD_FIRST.md` | `a849cc5c93d95727f94d7e3190cc79c5c314f92b` |

R8 completeness remains GREEN. Its accepted consumption is `implementation/workstreams/op-skill-v1/evidence/OP_SKILL_V1_DEFINITION_REVALIDATION_R8_GREEN_CONSUMPTION_2026-10-04.md`; the accepted integrated revalidation is `elmakus/project-research@b4dbc1ecfeae9ae3c05d87c06e5b04aadeac99e2:projects/orchestration-protocol-skill/v1-definition-revalidation-r8/FINAL_REVALIDATION.md`, blob `ca7b7e82563a035aa8b4b5de2209a6032073fccf`. No new Definition confidence-review round is requested.

Premium A is satisfied for this exact P2 entry by the owner's continuation, consumed in `260cf0503c4827485e4907839b67dd18ccd3e571:implementation/workstreams/op-skill-v1/evidence/OP_SKILL_V1_P2_PREMIUM_A_CONSUMPTION_2026-10-04.md`. P1 gate subjects do not authorize P2. Recover the current default-branch PWv2 router on continuation; the current observed workflow commit is `d3ab917f02e4de91b7dbb17915c2287c2387333e`, not a permanent policy pin.

### 1.2 Historical inputs, not new clearance

- P1 remains immutable at `a95fb6e3b940726fc75995cc552703b9e006402f:planning/OP_SKILL_V1_PLAN_P1.md`, blob `7d7e5065cd0f2596ae896efb010909fc83266811`. Its terminal GREEN R01 remains reconstructible from `fdeabec9f2ce10a27c6d856554433141d82c7b3b:implementation/workstreams/op-skill-v1/PLAN_REVIEW.toml`, blob `feeed2b65fe08f6949bf4b81f97e42d442635ac1`, and its evidence file.
- M01-T01 is DONE with independent GREEN on `b89c7a2b9f3e3d65f28deff0486d2b2b2e44e7e2:implementation/workstreams/op-skill-v1/results/M01-T01.md`, blob `607abe772a8889c2b2bf4c5fbfffd3db414d49de`. Its non-production implementation is `37995636ffad89e8711aae31d04607e74e450419:qualification/feasibility`, tree `5dcd542127a1d027794a009c8e479be29570561e`.
- The original M01-T02 native-envelope blocker remains a true observation. Package schema, Android helper/context/tool behavior, intended setup and a compliant native test realization are unverified. No native predicate is cleared by P2.
- Historical restrictions in P1 and its result/evidence describe that earlier authorization frontier. P2, once approved and entered legally, replaces the early-native-gate construction order; it does not rewrite those historical artifacts or their observations.

This plan is an implementation strategy and coverage map. Product-rule summaries below are traceability, not additional normative owners. R8 and its accepted decisions continue to own product semantics; the build-first decision owns the changed development order/risk acceptance only.

### 1.3 Two distinct outcomes

**First delivery — complete implementation candidate:** one self-contained portable skills-only package with all eight profiles, both substrates, the shared contracts, one bundled helper candidate, templates/schemas/manifests, concise user instructions and a separate final-candidate test procedure. It is integrity-bound and explicitly unqualified. Completion is based on authored functionality, basic coherence checks and required source review, not early native feasibility or exhaustive qualification.

**Later outcome — qualified production release:** separate final-candidate tests, corrections and applicable requalification establish the unchanged R8 production predicates. Every Q0–Q10 layer must be PASS for that exact production candidate, with exact owner ACCEPTABLE setup disposition. Candidate completion alone is neither this outcome nor durable completion of all approved production scope.

No MCP/backend, Pi/Paseo product dependency, Android-local daemon, scheduler, generic implementation profile, consumer lifecycle owner or final acceptance authority is added. Development orchestration is not part of the shipped skill's normative runtime.

## 2. Build-first strategy and changed gate placement

### 2.1 Sequence

1. Adopt practical portable package conventions and explicit host assumptions without waiting for a phone/account probe. Build the common contracts/root/package skeleton first.
2. Implement the dependency-free ESM helper and the two distinct durable allocation substrates from concrete package-owned record contracts. Provider operations remain authorized provider tools, not helper networking.
3. Implement assignment-only launch/context packs, sealing, opaque coordination, fresh integration and durable recovery/currentness.
4. Implement six initial-entry profiles, then the two continuation-gated profiles against those common mechanisms.
5. Assemble and freeze the complete candidate, basic checks/readbacks, assumption register and separate test instructions. Deliver the candidate before requesting native test setup.
6. Under a later exact test obligation, bind that candidate and fixtures, perform the qualification procedure, correct observed defects and rebind/retest affected content. Missing native access then blocks testing/admission, not construction of the remaining candidate.

There is **no dependency from M02–M08 construction to a live M01 feasibility PASS**. M01-T01 is reusable bounded preparation/evidence, not Android clearance. Exhaustive race/crash/behavior/native tests are not disguised as early build exits.

### 2.2 Best-effort assumptions without unsafe runtime guesses

| Candidate assumption | Build treatment | Later observation required |
|---|---|---|
| Portable root metadata/skill layout accepted by Android host | Use a concrete proposed format, label it unverified; no invented verified install menu/API | Actual installed schema, visibility and digest readback |
| Bundled ESM/Node execution and OS cryptographic RNG are available | Ship one plain ESM implementation; explicit capability/failure contract | Exact installed execution/RNG source and failure behavior |
| Provider tools can realize non-force expected-head/ownership/ancestry fences and exact reads | Implement protocol/receipt contracts and capability-required dispatch; never approximate with blind writes | Actual provider primitives, races, operation readbacks and repair-time revocation fence |
| Fresh-chat/manual assignment launch can preserve independence | Supply reusable immutable launch instructions and a closed source inventory | Sibling exclusion/exposure detection for every relevant context category while retaining tools |
| Caller authority, current results and current release policy can be authenticated/read back | Implement concrete record/verification interfaces and fail-closed missing-proof paths; schema validity is not authenticity | Qualified same-channel/successor provenance, currentness, floor/revocation readbacks |

Unknown runtime capability continues to prohibit the affected production action. Best effort permits authoring complete implementations against documented interfaces; it never invents an API, a provider success, qualified authority, a cryptographic-source proof or independence evidence. There is no permissive "unqualified production" switch. Missing native access does not trigger Python fallback; only exact installed ESM incompatibility and equivalent later qualification may justify that separately authorized replacement, with one implementation shipped.

### 2.3 Proportionate build controls

Each construction Card uses only checks material to its source contract: syntax/JSON parsing, bounded example/schema consistency, internal links/profile registry/owner graph, helper identity and deterministic repeatability where applicable, plus small representative state/identity/effect/metadata rejection cases. No real inference, native install/account probe, remote-write test or consumer test mutation is required for a construction exit. A known source/syntax/contract defect still needs correction; best effort does not mean knowingly inconsistent files.

These observations are basic build evidence. They do not claim an entire Q-layer PASS or prove semantic model behavior, concurrent remote atomicity, cryptographic entropy from output appearance, or native isolation. Exhaustive fixtures and host experiments are prepared/run in the later separate procedure, not prerequisites to building subsequent profiles. Required independent source Review under PWv2 remains distinct from running the product's deferred qualification programme.

### 2.4 Transition the old execution frontier after approval

Only after exact independent P2 GREEN, approval and premium C satisfaction may Main/Execution Prep reconcile Task Board revision 5:

- preserve the DONE M01-T01 result and its terminal review attempt;
- withdraw the not-started early-M01-T02 contract from the **current construction frontier**, without marking it DONE, clearing its factual blocker or fabricating a result;
- retain its original Card/blocker/evidence and the exact revision-5 Board in Git history; retire its obsolete early live-probe JIT trigger from the current Board rather than leaving a blocked Card to dominate build routing;
- preserve consumed historical kit work without interpreting it as a new native test authorization;
- atomically materialize the first well-defined M02 construction Card and the appropriate bounded successor JIT trigger. Use only canonical supported statuses, not a new cancelled/deferred lifecycle or a second Board.

The later native/test-envelope obligation is rematerialized JIT against the **complete M08 candidate**, not the old probe identity. Future Cards are not placeholders. The plan's milestone graph owns future outcomes until predecessor results make concrete contracts knowable. No Board/Card mutation is performed during authoring this plan.

## 3. Deliverable structure and mechanism ownership

```text
plugin.json                         # concrete proposed portable metadata; compatibility unverified
skills/orchestration-protocol/
  SKILL.md                          # concise entry/routing/ownership map
  profiles/
    formal-research.md
    definition-review.md
    plan-review.md
    execution-package-review.md
    targeted-bug-hunt.md
    global-bug-hunt.md
    repair-units.md
    focused-revalidation.md
  references/
    contracts-and-versioning.md
    evidence-and-sources.md
    security-and-effects.md
    finite-claim-substrate.md
    homogeneous-run-substrate.md
    independence-and-integration.md
    repair-and-revalidation.md
    durable-storage.md
  schemas/                          # explicit versioned records and typed extension points
  templates/                        # envelopes/checkpoints/assignments/receipts/results
  manifests/                        # content/compatibility/qualification-impact
  scripts/op-helper.mjs
  HELPER_IDENTITY.json
README.md                           # candidate status, intended installation/use/recovery, assumptions
qualification/final-candidate/      # separate procedure, detached bindings/evidence; not production code
tests/                              # basic build checks; later qualification harness/fixtures
```

M02 makes the required records concrete: caller/run envelope; immutable/composite subject and coverage; continuation authority and verification proof; pre-worker checkpoint; finite manifest/claim/reclaim; homogeneous batch/run/current attempt/supplemental action; sealed result; admission/completion snapshot; durable integrated result; current-result/supersession pointer; allowed mechanical metadata/receipt; compatibility/current policy; qualification impact and detached qualification record. JSON/Markdown serializations mirror their sole normative owner; templates are not a second rule source.

Support the two immediately needed subject classes — exact Git repository/commit/path/blob and immutable captured-content digest — plus deterministic composite manifests. Fix canonical JSON/digest inputs, redundant-field consistency and routing-only `return_id` exclusion. Do not invent a general identity framework. Establish an acyclic content graph: package files -> content manifest -> candidate identity, with explicit exclusions for the manifest's own identity and detached qualification/policy/readback material. A dossier must not change the bytes it attests.

The helper performs only deterministic/mechanical validation, allocation planning from supplied exact snapshots, supplied ancestry/expected-head checks, canonical serialization and bounded assignment/context-pack generation, plus the narrow cryptographic nonce operation. It does not decide truth, severity, deduplication, coverage meaning, scope or authority; it does not schedule, fetch Git/network data, hold credentials or write consumer/external state. Provider receipts must have qualified provenance before forward production use, not merely a self-labelled success field. Random generation is separate from byte-identical deterministic commands.

Profiles own only their typed applicability/coverage/completion/truth/convergence rules. The shared contracts owner alone defines common state precedence/equivalence/currentness. The root routes and requires the correct owners; it must not clone shared rules into every profile. Leaf packs omit caller lifecycle/premium state; workflow text in a reviewed subject remains data. Coordinator-visible metadata is closed, typed and semantic-free; semantic findings stay in sealed result bodies until a fresh integrator reads the immutable admitted snapshot.

## 4. Milestones and source exit evidence

Milestones are revisioned outcomes, not another execution-state store. Construction exits below mean source completion with proportionate checks, not qualification PASS. Execution Prep derives bounded Cards JIT, with exact accepted DONE-result dependencies and Review where material. No complete downstream Card backlog is pre-created.

### M01 — retained preparation, native investment gate removed

M01-T01's accepted kit/limitations remain input data. P1's live feasibility outcome is not falsely marked complete. The unperformed installed-surface obligations move to M09's separate completed-candidate procedure. No M01-T02 runtime/access input is a construction prerequisite in P2.

### M02 — package skeleton, shared contracts, policy and identities

**Dependencies:** approved P2 and satisfied C; optional reuse of the exact DONE M01-T01 preparation, not a live feasibility result.

**Work:** concrete root/package layout; shared contracts/evidence/security/storage owners; record schemas/templates; profile/version registry; state/identity/effect/authenticity/currentness models; pre-worker checkpoint; closed metadata grammar; content/compatibility/current-policy/impact records. Choose and document proposed host/tool/authority interfaces with explicit unverified status and missing-proof behavior. Production caps and authenticity checks remain enforceable even when no host class is yet qualified.

**Build exit:** coherent package-owned contracts and owner graph; parseable records and bounded canonicalization/state/identity/effect examples; missing/incompatible/revoked/ambiguous inputs have explicit rejection paths; no self-referential digest or hidden authority in templates. Full Q0/Q1 testing is later.

**JIT:** actual M02 outputs bind M03–M05 APIs; no early native-probe dependency or unbound downstream schema Card.

### M03 — bundled ESM helper and finite claim/reclaim substrate

**Dependencies:** exact M02 contracts.

**Work:** helper probe/API/digest, structural validation/canonicalization/context packs and qualified-source nonce interface; finite unit/generation/attempt-nonce ownership; common base, expected-head/ancestry/non-force publication and exact readback; single-use fenced reclaim; retained siblings; durable operation identity and three-way occurrence recovery. Implement generation/claim/candidate revalidation needed by later repair effects.

**Build exit:** complete narrow helper/substrate source and instructions; syntax/probe/identity and representative valid/invalid inputs are coherent; explicit weak/unavailable RNG and stale/ambiguous fence rejection paths. No network, semantic or scheduling authority. Concurrent/provider/CSPRNG qualification is deferred; local issued nonces do not qualify Android.

### M04 — homogeneous RUN_ID, batches and current attempts

**Dependencies:** M02 records and M03 common validation/publication interfaces, not the finite allocation algorithm.

**Work:** monotonic never-reused reservations; frozen primary membership; per-run fenced recovery/current-attempt activation, replacement and terminalization; sealed-attempt binding/admission; closed-batch immutability; one-shot supplemental authorization and deficit restoration. Keep this state machine separate from finite generation reclaim.

**Build exit:** complete schemas/protocol/helper support and representative transition checks; exact-current-attempt and action idempotency are explicit; all-terminal/one-for-one restoration and late/stale result rejection are represented. Exhaustive races/crashes remain separate tests.

### M05 — assignment launch, sealing, opaque coordination and integration

**Dependencies:** M02–M04 outputs.

**Work:** reusable immutable manual/fresh-context launch instructions (no assumed native child-spawn API); minimal assignment-only context packs and exact five-line receipts; closed metadata channels; sealing and seal-recording recovery; mechanical coordinator -> fresh integrator handoff; immutable admission/completion snapshots; partial-wave terminalizer; integration generation/expected-head publication; supersession/consume-time currentness. Include the full context-source category inventory and unknown/exposure response.

**Build exit:** complete linked workflow/templates and bounded pack/receipt/metadata/state examples; a coordinator is never instructed to open lane semantics or paste findings to an integrator; partial negative evidence cannot override shared INCOMPLETE/BLOCKED precedence; replaced homogeneous attempts cannot become current at seal/admission. Native isolation and real behavior remain unqualified.

### M06 — six initial-entry profiles and ordinary/managed caller UX

**Dependencies:** M02–M05.

**Work:** `formal_research`, `definition_review`, `plan_review`, `execution_package_review`, `targeted_bug_hunt`, `global_bug_hunt`; typed applicability/coverage/truth/convergence and adaptive private topology; ordinary research capture/ambiguity return; source weighting/conflicts/assurance floor; review-surface distinctions; bounded non-fail-fast attack cells; primary/supplemental Global behavior; repeat-review lens rotation and authority-as-subject-data exception. Provide concise entry/launch/result guidance; quick lookups stay outside OP.

**Build exit:** all six complete modules and linked templates; registry/schema ownership and representative terminal examples consistent; no fixed public lane-count dependency, majority voting, budget-success or omitted mandatory coverage. Source coherence is checked; profile behavioral qualification is later.

### M07 — bounded authenticated repair and focused revalidation

**Dependencies:** M03, M05, M06 and exact M02 authority/effect contracts.

**Work:** continuation-only `repair_units` and `focused_revalidation`; genuine same-channel/successor authority; exact accepted integrated obligations, base/candidate, mutation/change cone and causal effect closure; conflict grouping/dependency serialization; current authority/generation/claim/candidate + expected head at write time; operation/readback recovery. Revalidation disqualifies the repairer and evaluates closure, bounded neighbors/spill/origin applicability and escalation.

**Build exit:** both complete profiles and shared substrate; explicit handling of neutral no-op, partial, failed repair and all focused dispositions; whole mixed-forbidden-effect rejection; unknown downstream effects/currentness/capability cannot originate a write. No unfenced provider approximation. Dynamic repair/security/independence tests are deferred.

### M08 — complete best-effort candidate and separate test handoff

**Dependencies:** M02–M07 source completion and required source Reviews; not early/final native PASS.

**Work:** assemble the single complete package; finish concise install/intended-use/recovery/currentness/permission/limitation docs; run the basic build checklist in §6.1; compute/read back exact package and helper identities; freeze a complete content/owner/assumption manifest. Deliver separate final-candidate qualification instructions and a detached register of Q0–Q10 obligations, observations and missing inputs. Do not grow this into a pre-delivery exhaustive test project.

**Build exit:** every promised module/mechanism/helper/template present and internally coherent; immutable candidate and reconstruction locators; terminal basic-check evidence with known source defects corrected; explicit unverified assumptions and deferred test status; readable separate test procedure. A complete candidate is delivered even if native setup/guarded realization is still unavailable. There is no fake Q PASS, production-ready label or conditional production release.

**JIT:** only now can final test Cards bind the actual complete candidate. Fixture/oracle generation for exhaustive qualification is a later exact test-preparation obligation derived from this result, not an upfront condition to implementation.

### M09 — separate final-candidate tests, corrections and production admission

**Dependencies:** complete M08 candidate; a separate exact test obligation and, per step, available authorized capabilities/targets/readbacks. No later test prerequisite feeds back into M02–M08 construction.

**Work:** prepare/freeze the full test fixture/oracle set for that candidate; perform permitted deterministic/exhaustive and then guarded behavioral/native tests under §6.2; capture exact PASS/FAIL/BLOCKED evidence; implement bounded observed corrections in this development workstream with proportional independent source Review; create a changed candidate and apply qualification-impact invalidation/retesting. Native envelope binding is based on this full candidate, not the old probe kit. Keep candidate test outputs distinct from production OP wave results; never use a candidate's own production admission to certify itself.

**Later exit:** all required Q0–Q10 PASS and owner ACCEPTABLE for the same exact candidate/setup, with positive readbacks/currentness, permit a production-ready handoff. Otherwise the relevant test/admission stays FAIL/BLOCKED while the authored candidate remains available. Unknown/unclassified repair impact invalidates all plausibly affected evidence, all Q0–Q10 if unbounded. No second bundled helper merely for parity or backend workaround is authorized.

**Authorization/Close:** test-procedure preparation is included in candidate delivery; executing it is a separate test obligation, not implied blanket permission. If that obligation/targets/owner authority are missing, bind the concrete human-authority boundary; if the required compliant native realization remains unavailable, persist the concrete runtime/access/input blocker. Do not infer either a workflow stop or approved-scope completion merely from M08/Card completion. Canonical Close/Recovery and fresh rerouting establish the actual next obligation/stop. Production release/publication/final acceptance remain consumer/owner workflow actions, not OP effects, and require their own accepted authority.

### 4.1 Dependency graph

```text
P2 independent GREEN -> approval -> C satisfied
  -> reconcile old early-M01 frontier (no fabricated DONE)
  -> M02 common contracts/package
  -> M03 finite/helper -> M04 homogeneous
  -> M05 isolation/sealing/integration
  -> M06 six entry profiles -> M07 two continuation profiles
  -> M08 COMPLETE UNQUALIFIED CANDIDATE + separate test procedure
  -> separate exact test obligation
  -> M09 full-candidate fixtures/tests -> evidence-driven corrections/requalification
  -> all Q0–Q10 PASS + owner ACCEPTABLE -> authorized production-ready handoff

M01-T01 DONE preparation ---- optional bounded input, NOT a native PASS dependency
M01-T02 old native blocker -- preserved observation, NOT an early construction gate
```

No numerical effort/date promise or statistical-independence claim is made. Serial common-contract-first delivery keeps Cards bounded without speculative shared-state parallelism. Downstream implementation assumptions are explicit; native facts are not required just to author interfaces/source.

## 5. Requirement/decision coverage and deferred witnesses

C01–C37 retain the P1 obligation identities; C38 covers the changed owner direction. The build-owner column means implementation of the obligation. The witness column names **later** qualification evidence, not an early build gate or proof already obtained. §6 gives the separate test programme.

| ID | R8 obligation | Build owner | Deferred witness |
|---|---|---|---|
| C01 | §§1–2 Android skills-only/eight profiles/no backend | M02, M06–M08 | Package/native installation/invocation; Q0/Q9/Q10 |
| C02 | §§2,5 pin release/checkpoint before semantic work | M02, M05 | Mixed/drifting/pre-pin work rejection and checkpoint readback; Q1/Q7 |
| C03 | §3.1 immutable/composite identities, equivalence, routing-only return_id | M02 | Canonicalization/conflicting redundancy/return-id vectors; Q1 |
| C04 | §§3.2,6.1 ordinary normalization and research floor | M02, M06 | Ambiguity return, coherence/adversarial/source coverage; Q1/Q5 |
| C05 | §3.3 authentic current continuation and exact effects/prerequisites | M02, M07 | Same-channel/successor, forged/stale/unauthorized negatives; Q1/Q7 |
| C06 | §§3.4–3.5 separate total states and consume-time currentness | M02, M05 | State oracle, neutral/partial/invalid/current-result cases; Q1/Q6 |
| C07 | §§3.6,7 distinct envelope/wave/batch/RUN_ID/unit/generation/nonce | M02–M04 | Cross-scope/reuse rejection; Q1–Q4 |
| C08 | §§4,14 independent profile/version compatibility | M02, M06, M08 | Incompatible majors vs private topology changes; Q0/Q1 |
| C09 | §5 checkpoint/non-fail-fast/no votes/dissent | M02, M05–M06 | Ordering, coverage after first finding, evidence conflicts; Q6/Q7 |
| C10 | §§5.2,9 exact immutable sealing/crash recovery | M03–M05 | Pre-sibling seal/readback/amendment/late-writer cases; Q2/Q4/Q6/Q7 |
| C11 | §§5.3,3.5 partial-wave terminalizer/common precedence | M05 | Immutable missing set; strong negative cannot override partial disposition; Q6 |
| C12 | §6.1 research source weights/conflicts/convergence | M06 | Assurance floor/conflict/currentness/no budget success; Q5/Q6 |
| C13 | §6.2 Definition review and rotated repeat lenses | M06 | Full surface, material rotation, prior-result exclusion; Q5/Q7 |
| C14 | §6.3 Plan strategy/traceability/feasibility | M06 | Missing coverage/order/assumption fixtures; Q5 |
| C15 | §6.4 execution package readiness without silent replanning | M06 | Card/dependency/Plan conformance/upstream-defect fixtures; Q5 |
| C16 | §6.5 targeted declared attack cells | M06 | Missing cell and singleton blocker; Q5/Q6 |
| C17 | §6.6 exact primary/supplemental batches and deficit restoration | M04, M06 | One-shot/all-terminal/one-for-one/no-votes cases; Q4/Q5 |
| C18 | §6.7 bounded repair total completion/RED/NA | M07 | Exact units/effects/readbacks; partial/failed/neutral cases; Q5/Q7 |
| C19 | §6.8 independent focused cone/spill/origin/escalation | M07 | Repairer disqualification and all six dispositions; Q5/Q7 |
| C20 | §7.1 finite ownership/qualified CSPRNG/per-unit reclaim | M03, M07 | CAS/ABA/replay/stale write/sibling retention; Q2/Q3/Q8/Q10 |
| C21 | §7.2 homogeneous recovery/current attempt at seal/admission | M04–M05 | Replacement CAS and late prior attempt rejection; Q4/Q6 |
| C22 | §8 operation identity/ambiguous effects/complete change closure | M03, M07 | VERIFIED/proven-NOT_APPLIED/UNKNOWN, lineage/spill; Q3/Q7 |
| C23 | §9 full context inventory/procedural independence | M05 | Every source excluded or exposure detected; new source stales evidence; Q7/Q9/Q10 |
| C24 | §9.1 integrated result fence/supersession/currentness | M05 | Competing integrators, immutable history, consume-time stale; Q6 |
| C25 | §10 archive/reconstructible provenance/reachable history | M02, M05, M08 | Checkpoint->claim/attempt->seal->snapshot->result lineage; Q0/Q6 |
| C26 | §11.1 exclusive normative owners/typed extensions | M02, M06 | Ownership graph; profiles cannot redefine shared state; Q0/Q5 |
| C27 | §11.2 assignment-only leaf/exact five-line receipt | M05–M07 | Workflow subject injection remains data, mechanical receipt; Q7 |
| C28 | §11.3 closed semantic-free metadata/fresh integrator | M02, M05 | All exposed channel leak negatives; Q7/Q10 |
| C29 | §12 one no-build helper/mechanical boundary/RNG/fallback | M03, M08 | Digest/API/repeatability/source/failure/installed execution; Q8/Q10 |
| C30 | §13 whole effect set, protocol mechanics, hard caps/ambient effects | M02, M07 | Every prohibited effect/mixed request/spill/unknown downstream case; Q7 |
| C31 | §14 exact versions/current policy/minimum/revocation | M02, M08 | Revoked/below-floor/unknown/stale policy and artifact reads; Q0/Q1/Q9 |
| C32 | §14.1 impact/freshness/unknown invalidation | M02, M08 | Changed dependency stales evidence; safe reuse only proven; Q0/Q8/Q9 |
| C33 | §15 exact Q0–Q10 PASS/FAIL/BLOCKED and production admission | M02, M08 | Detached exact-candidate dossier; all required PASS before production use |
| C34 | Q5 every legal profile terminal branch and mandatory negative | M06–M08 | Full-candidate frozen branch/negative manifest in M09; Q5 |
| C35 | Q10 exact owner acceptability/native metadata/CSPRNG/concurrency | M08 procedure | ACCEPTABLE plus technical positives, rejected/unknown cases; Q10 |
| C36 | §§16–17 exclusions/non-rewriting donor interpretation | M02, M08 | No backend/runtime/scheduler/dual helper/history rewrite; Q0/Q7 |
| C37 | §§18–19 accepted R8/review provenance | Planning input, M02, M08 | Exact accepted identities retained; no confidence-review replay |
| C38 | build-first decision revision 1 | §2, M02–M08 | Complete candidate delivered without native/exhaustive prerequisite; later test record separate |

Decision flow-down:
- Definition-review method, additional review and round-3 confidence gate are discharged by accepted R8 GREEN; the historical 15-lane round is not a universal production topology (C37).
- R1 decisions map to exact batches/current attempts C17/C21, per-unit reclaim C20, independent compatibility C08, caps/no backend C01/C30, bounded continuation C18/C19 and leaf opacity C27.
- Coordinator opacity maps to sealing/partial terminalization/integration C10/C11/C24/C28; no raw-lane reread during ordinary continuation.
- Additional resolutions C02/C03/C04/C07/C08/C09/C10/C16 map respectively to C06/C17/C04+C12/C07/C05/C26/C32/C20+C29+C35.
- Repeated-review lens rotation maps to C13/C28; canonical authority is subject data, prior semantic result artifacts are not fresh-review inputs.
- Round-3 D1–D7 map to C06+C11+C34, C03, C30, C04+C12, C09+C11+C12, C05, C31. Partial-wave precedence and replaced homogeneous attempt sealing/admission remain explicit implementation obligations, not omitted because prior reviews were GREEN.
- The new decision changes investment/development order only (C38). It does not drop any production qualification predicate or weaken the above decisions.

## 6. Basic build checks now; qualification procedure later

### 6.1 Construction checklist

For the complete candidate, aggregate only the proportionate checks already needed by source Cards:
- all eight profiles, required shared owners, record/templates/manifests and one helper exist with valid relative links and no placeholder functional sections;
- JSON/ESM syntax and representative records/command input-output contracts are valid;
- canonical identities, helper source/API linkage and package manifest/readbacks agree; deterministic commands repeat on the same supplied input;
- representative missing/invalid/stale identity, state, effect and metadata cases have coherent rejection paths;
- no forbidden helper network/credentials/scheduler/consumer effects, duplicated semantic owner or mandatory external runtime is introduced;
- README/assumption register separates authored content from unverified Android compatibility; detached test evidence cannot alter package identity.

These are build checks, not a requirement to execute every negative/race/profile branch. Report actual command/outcome/limitations only. Candidate exit does not require the owner's account/device, native effect envelope or available real-inference harness.

### 6.2 Separate procedure on the completed candidate

M08 documents the following programme; M09's authorized test preparation derives/fills/finalizes executable fixtures from the actual M08 content and freezes the oracle manifest before any qualification run. No guessed expected output or regenerated oracle is acceptance evidence.

| Layer | Later test families |
|---|---|
| Q0 | Full package/manifest/schema/digest/owner graph and detached identity links |
| Q1 | Ordinary/managed envelopes, composite/redundant identity, versions, return_id, authentic continuation, effects, result/currentness/release policy |
| Q2 | Concurrent finite claimers, exact winner, expected-head/ancestry/non-force/readback, losing publication |
| Q3 | Crash/reclaim/ABA/ref reuse, single-use replay, retained siblings, stale authority/generation/claim/candidate before effects |
| Q4 | Concurrent monotonic reservation, frozen batches, lost/current-attempt replacement, late attempts, closed membership, one-shot supplementation |
| Q5 | Every profile's legal terminal branch, applicability/empty work, mandatory coverage/completion/authority boundaries and stale/unknown cases |
| Q6 | Snapshot admission/root-cause dedup/dissent, strong singleton counterexample, credible unresolved conflict, complete RED, partial precedence, integration CAS/supersession |
| Q7 | Non-fail-fast/injection/assignment-only/receipt, sibling exposure/sealing/self-acceptance, every metadata channel and every forbidden/mixed/downstream/spill effect |
| Q8 | Exact helper/API/repeatability; audited cryptographic source and >=128-bit fresh nonce; weak/unavailable failure/concurrency; forbidden duties/mismatch |
| Q9 | Actual current host/package/provider fences/readbacks/helper/context/authority/policy capabilities and drift |
| Q10 | Intended installed Android/setup owner disposition; native invocation/helper; all context/metadata surfaces; concurrent claims and entropy/failure negatives; end-to-end durable readbacks |

The full structural oracle includes 144 common tuples per profile (1,152 across eight) plus invalid inputs. Q5 includes at least the 40 legal terminal-disposition branches: four for formal research; five each for the six GREEN/RED profiles including repair; six for focused revalidation. Add the accepted mandatory negatives, not just label coverage. These counts describe the deferred exhaustive programme, not construction gates or statistical proof.

Separate candidate test authorization binds exact candidate/helper/oracle identities, intended owner account/device scope, isolated disposable content targets, complete allowed and causally triggered effects, exact non-secret operation/object readbacks and a compliant guarded realization for the tested surface. Qualification is non-circular and its output is distinguishable from production waves. A template grants no permission and a schema-valid self-authored authority file is not authentication. Do not request blanket permission, select a substitute account or mutate a real consumer for fixtures.

Any deliberate real-LLM test must use the execution environment's canonical guarded launcher/validator and fixed permitted profile; no fallback, direct/manual unguarded inference or substitute host qualifies Android. If the current guard cannot realize native Android, that later test remains BLOCKED and is returned to the environment/test authority. No change to the environment's guarded invocation harness, backend or fixed test-profile policy is authorized by this plan; repository-local non-inference fixture/harness preparation remains the separate test obligation described above. Ordinary development work is not a real-inference qualification test merely because an assistant authors source.

Qualification verdicts remain exactly PASS/FAIL/BLOCKED. Unevaluated/pending/unknown/stale predicates map to BLOCKED while preventing a trustworthy verdict; do not add a fourth optimistic state or convert syntax/exit 0 into Q PASS. Immutable corrections produce new candidate identities; use the impact manifest before reusing evidence. Policy/qualification attestations are detached and must have authorized provenance/currentness. Current release policy rejects revoked/below-floor content; all required Q0–Q10 must be positive before production use or release-ready claims.

## 7. Risks and later correction routing

| Risk accepted for build investment | Build response | Later evidence/route |
|---|---|---|
| Proposed Android packaging/helper is unavailable | Complete concrete candidate, record assumption, no compatibility claim | Exact FAIL/BLOCKED; authorized source correction, evidence-triggered qualified fallback or product owner |
| Provider lacks atomic fences or reliable readback/current authority | Complete capability-required interfaces; no blind-write fallback | Reject affected operation; preserve operation proof; owner boundary if product cannot be realized |
| Context/memory/history/retrieval or metadata leaks | Implement full inventory/closed grammar/seal/fresh integration; no "fresh means proven" shortcut | Actual exposure/unclassified category invalidates independence/affected qualification |
| Authentication/current-result/release-policy source unverifiable | Missing-proof paths remain fail-closed | No self-authored authority, stale forward use or rollback; proper authority resolution |
| Full candidate needs rework after late host finding | Owner explicitly accepts sunk-work risk; keep interfaces/modules narrow | Evidence-driven bounded repairs; material product change returns to Definition |
| Native test profile/guard unavailable | Does not delay building M02–M08 | Later concrete test blocker; no unguarded manual prompt or runtime substitution |
| Basic checks mistaken for qualification | Candidate label, exact bounded evidence and detached Q register | No Q/production PASS absent all assigned observations |
| Reordering accidentally leaves old M01 blocked Card controlling builds | Approved-P2 frontier reconciliation in §2.4 | Fresh router must select the first construction obligation, not old native setup |
| Shared semantics duplicated/partial truth or late attempt admitted | Concrete owner graph/common precedence/current-attempt contracts; source Review | Bounded shared correction and impacted later tests; no profile overrides |
| Scope grows into workflow/backend/runtime or rewrites historical archive | Explicit exclusions and effect/source Review | Return to accepted authority, no new service/queue or migration project |

Bounded implementation correction stays in execution; missing facts needed for a current test/repair route to Research; material strategy/order changes return to Planning; product/global runtime/effect changes return to Definition; genuinely missing human authority or non-remediable access/runtime/input reaches its real stop. Best-effort authoring does not waive these boundaries.

## 8. Execution Prep, evidence and continuation handoff

After independent P2 GREEN consumption and satisfied C, Main owns §2.4's frontier reconciliation and JIT Cards. Every Card has exact accepted authority refs (R8, selected decisions, build-first decision and P2), stable scope/acceptance, proportionate build checks or explicitly separate test scope, immutable DONE-result dependencies, required Review and optional technical contract only when material. First M02 boundaries are knowable from this strategy; later interfaces follow actual predecessor results rather than a speculative whole-package task list.

No new Board or executable Card is authored by Planning. Preserve all previous terminal attempts and failed/blocked subjects. P1 is not edited or re-reviewed. A material P2 repair changes the subject and requires a new cycle/attempt; source/editorial treatment cannot hide a changed gate/dependency strategy.

OP's Git wave ledger remains `elmakus/project-research`; this repository's PWv2 Task Board is not shipped or copied into OP. Test/archive writes require their exact obligation/authority; do not bulk-migrate evidence, delete branches or rewrite historical results. Distribution/release/merge/final acceptance are consumer workflow actions and never delegated to an OP profile.

After every Main/child return, reconcile durable state and reroute until a real canonical stop. Neither Card completion nor delivery of M08 creates an artificial end-of-scope or generic "continue?" boundary. Close must distinguish complete candidate delivery from outstanding separate testing/production obligations. Missing current test authority or an unavailable native realization can establish the concrete later stop; ordinary result/review reconciliation cannot.

## 9. Planner completeness/challenge audit

**Planner audit: GREEN for freezing P2.** This is an author's completeness/challenge audit, not independent Plan Review GREEN, implementation completion or any Q PASS.

- Exact R8/eight accepted decisions/new build-first direction and this cycle's A consumption are bound; no Definition confidence gate is replayed or old P1 premium subject reused.
- C01–C38 cover R8 §§1–19, all eight profiles, both substrates, shared mechanisms, exclusions, archive/currentness and every later Q-layer; source ownership and deferred witness are separate.
- M02–M08 can complete under documented unverified host assumptions without native/exhaustive prerequisite; M08 delivers the entire candidate before requesting test setup. §2.4 explicitly removes the old early blocker from construction routing without a fake DONE or invented status.
- Dependencies preserve contracts -> helper/substrates -> sealing/integration -> six entry profiles -> two continuations -> complete candidate. No unobserved host API, native child creation or secure-source label is asserted as fact.
- Production admission, authentic continuation, qualified effects, cryptographic entropy, procedural independence and current policy remain strict; the new order changes investment risk, not safety truth.
- Basic checks are proportionate and non-inference. Full 1,152-tuple/40-branch/race/behavior/native testing is later, independently bound to the complete candidate under separate authority; missing evidence remains BLOCKED.
- Candidate identity is acyclic and frozen; qualification evidence is detached; repairs invalidate dependent evidence and do not rewrite history. One helper ships; absent access is not fallback evidence.
- Partial-wave common precedence, replaced homogeneous-attempt admission, metadata opacity, stale consumer effects and ordinary input ambiguity remain explicit source obligations despite deferred dynamic testing.
- The plan creates no second Board, approval store, runtime/model/session identity, backend or generic executor. Future Cards remain JIT; candidate completion is not approved-scope completion.
- Main must freeze one exact P2 Git subject with premium B due and stop for a fresh independent best-available Main Plan Review context. The planning context cannot review/repair-verdict its own subject or spawn a Stage-6 child reviewer. No approval/C/implementation authorization is claimed here.
