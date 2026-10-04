# Build-first owner direction — material Planning re-entry

Date: 2026-10-04
Workstream: `op-skill-v1`
Authority: `decisions/OP_SKILL_V1_BEST_EFFORT_BUILD_FIRST.md`, decision revision 1.

## Resolution classification

The owner's direct instruction changes construction order and investment risk: complete the skill candidate best effort before separate final-candidate testing/correction. It does not ask for a different product runtime, a weaker effect cap, fabricated compatibility or unguarded inference.

Canonical `classify_jit_refinement("strategy")` selects `planning`; `classify_resolution("plan_strategy")` agrees. Definition R8 already distinguishes candidate/helper authoring from qualification and production admission (§§12 and 15). Its accepted production/security semantics remain unchanged. Repeating Definition Review is not needed merely to reorder construction and final-candidate testing.

P1 §2.1, M01's hard broad-build prerequisite, the dependency graph and test-delivery strategy require material correction. This cannot be labeled `editorial_exempt`. A new cycle is first materialized with exact premium A due, as required by `workflow/PLANNING.md` and `workflow/STATE.md`. No material P2 plan is authored before that gate, no previous P1 approval is reused for it, and no Stage-6 reviewer is delegated or self-selected.

New entry subject: `definition:R8|strategy:build-first-test-later@1|planning-cycle:2`.
Current plan revision: P2, draft, planner audit pending, no frozen subject.

## Preserved exact previous state

The pre-entry repository commit is `fdeabec9f2ce10a27c6d856554433141d82c7b3b`.

| Record | Exact historical identity |
|---|---|
| P1 approved planning state | `fdeabec9f2ce10a27c6d856554433141d82c7b3b:implementation/workstreams/op-skill-v1/PLANNING.toml`, blob `b647b232df97507a4557de6443cbdbd02e306f1b` |
| P1 terminal independent R01 state | `fdeabec9f2ce10a27c6d856554433141d82c7b3b:implementation/workstreams/op-skill-v1/PLAN_REVIEW.toml`, blob `feeed2b65fe08f6949bf4b81f97e42d442635ac1` |
| Frozen reviewed P1 plan | `a95fb6e3b940726fc75995cc552703b9e006402f:planning/OP_SKILL_V1_PLAN_P1.md`, blob `7d7e5065cd0f2596ae896efb010909fc83266811` |
| Definition R8 | `fdeabec9f2ce10a27c6d856554433141d82c7b3b:requirements/OP_SKILL_V1.md`, blob `79b53cd7ccb766f7290f73b85f49d56dfcaf65e2` |
| M01-T01 DONE semantic result | `b89c7a2b9f3e3d65f28deff0486d2b2b2e44e7e2:implementation/workstreams/op-skill-v1/results/M01-T01.md`, blob `607abe772a8889c2b2bf4c5fbfffd3db414d49de` |
| Reviewed feasibility subtree | `37995636ffad89e8711aae31d04607e74e450419:qualification/feasibility`, tree `5dcd542127a1d027794a009c8e479be29570561e` |

P1 plan/review/evidence and the DONE implementation remain byte-identical. The old PLAN_REVIEW.toml is retained as historical P1 evidence, but the manifest no longer selects it as a current P2 review: no P2 subject exists yet.

Task Board revision 5, its exact results/review history, M01-T02 contract/blocker and JIT triggers are deliberately not rewritten during replan entry. They describe the prior execution frontier and factual native limitations, not successful tests. Planning has routing precedence over that old frontier. After exact P2 approval and premium C, Execution Prep owns the necessary not-yet-started Card/JIT reconciliation. No unsupported cancellation status, fake result, new placeholder implementation Card or shadow queue is introduced here.

## Current boundary

The current obligation is the new-cycle premium A entry to Strategic Planning, not supplying an Android test harness. The owner may continue planning in the current context or use a better planning context; the offered handoff contains only canonical repository/branch/obligation/start-pointer locators.

No native/behavioral inference tests, external test effects, product runtime change, release publication or production qualification PASS occurred during this reconciliation.
