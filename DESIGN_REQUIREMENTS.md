# Orchestration Protocol Skill — design requirements

Status: seed requirements for future formal Research; not the finished skill.

## Product boundary

This repository will own the **Orchestration Protocol Skill**.

Consumer workflows (including PWV3) decide **when** Orchestration Protocol is required and provide the exact subject / acceptance or coverage surface. The skill decides **how** the orchestration wave is executed.

Do not copy orchestration internals into PWV3. In particular PWV3 must not own lane counts, worker roles, launcher layout, integration topology, convergence rules, or profile-specific search strategy.

Changing those internals later must not require a PWV3 change while the stable invocation/result contract remains compatible.

## Do not build one generic lane layout

The finished skill must have task-specific orchestration profiles/paths. Research must determine the exact profiles and topology rather than hard-coding one universal formula such as "1 whole-scope + 1 red-team + 8 lanes".

At minimum, formally research distinct profiles for:

1. **Research** — evidence/prior-art discovery, source coverage, conflicts, synthesis.
2. **Definition Review** — completeness, ambiguity, contradictions, scope/outcome/acceptance coherence.
3. **Plan Review** — strategy, requirement/acceptance coverage, dependencies, feasibility, risk and missing work.
4. **Execution Prep / Execution Package Review** — concrete Cards, ordering, dependencies, acceptance/evidence readiness and conformance to the reviewed Plan; do not redo strategy unless a real upstream defect is found.
5. **Targeted Bug Hunt** — risk-driven/adversarial search focused on identified high-risk surfaces.
6. **Global Bug Hunt** — broad whole-candidate defect discovery across the complete declared qualification surface.
7. **Focused post-repair revalidation** — determine whether this should be a dedicated profile or a protocol mode for proving accepted findings closed without mechanically repeating a full discovery wave.

Different profiles may use different lane types, counts, prompts, coverage partitioning and integration rules.

## Current planned PWV3 use

PWV3 currently plans to invoke this skill as a mandatory normal mechanism for:

- Brainstorming Research;
- Definition Review;
- Plan Review;
- Execution Prep / Execution Package Review;
- Final Qualification Targeted Bug Hunt;
- Final Qualification Global Bug Hunt.

Fresh independent final acceptance remains a separate PWV3 acceptance obligation unless later Research explicitly makes it an OP profile.

Ordinary per-Card implementation Review is also not automatically an OP profile unless later product evidence says otherwise.

## Skill-owned discovery/review behavior

For OP-backed profiles, the skill owns discovery mechanics.

The finished protocol must preserve at least these properties unless future formal Research establishes a safer replacement:

- discovery does not stop merely because the first valid defect/finding was found;
- continue declared bounded coverage until coverage is exhausted, evidence-backed convergence is reached, or a genuine blocker prevents meaningful further evidence gathering;
- sibling discovery remains isolated as required by the protocol;
- integrate and deduplicate findings before ordinary repair;
- truth is not majority voting;
- one evidence-backed blocker remains blocking;
- preserve materially distinct dissent/evidence;
- after bounded repair, use fresh focused revalidation rather than automatically repeating the entire full wave;
- repeat a full wave only when subject/applicability/coverage assumptions have materially changed.

These are **Orchestration Protocol Skill semantics**, not duplicated PWV3 lane/orchestration semantics.

## Required future Research before implementation

Before implementing the production skill, run a large formal Research using Orchestration Protocol itself to determine:

- exact profile taxonomy;
- objectives and exclusion boundaries for every profile;
- profile-specific lane roles and coverage partitioning;
- sensible default lane counts/topologies and how they may be tuned;
- stopping/convergence rules;
- evidence and independence requirements;
- integrator/adjudication behavior;
- RED/repair/focused-revalidation behavior;
- recovery/reclaim semantics;
- stable caller invocation contract and durable result contract;
- how consumers such as PWV3 select a profile without learning its internal topology.

The current Coordinator/Project Research protocol is a donor and starting point, not a requirement to freeze its present topology forever.
