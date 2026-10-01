# Decision — Orchestration Protocol Skill v1 Definition R1 RED resolution

Status: accepted owner decision
Scope: `orchestration-protocol-skill-v1@1`
Origin review: `elmakus/project-research@64a8b9a08759e911b467672350d3f633e70b3558:projects/orchestration-protocol-skill/v1-definition-review-r1/FINAL_REVIEW.md`
Origin disposition: RED

## Owner-authorized product decisions

### Global Bug Hunt batch membership

The primary Global Bug Hunt batch is frozen before its first run.

A batch owns an exact reserved RUN_ID set. Every member reaches an explicit terminal run state. Only completed valid results contribute discovery evidence. A failed, blocked or otherwise non-result terminal member prevents GREEN coverage closure unless an explicitly authorized bounded continuation reserves a new exact supplemental RUN_ID set before those additional runs begin.

A result arriving after a batch revision has been durably closed cannot silently enter or mutate that closed batch. It may be considered only through a new authorized bounded continuation/batch revision.

### Finite reclaim generation

Claim/reclaim generation is per finite work unit, not wave-global.

Reclaiming one unit increments only that unit's current generation. Valid completed sibling units remain current. Older generations of the reclaimed unit remain immutable provenance but cannot satisfy the current manifest or publish a current result.

Reclaim requires explicit authority and exact-state readback; timeout or branch existence alone never authorizes reclaim.

### Profile-semantics compatibility

`profile_semantics_version` has its own caller-visible compatibility relation.

A caller binds an accepted compatible range/identity for the selected profile semantics. A major profile-semantic change is incompatible unless the caller explicitly accepts the new major semantics. Such a change does not automatically require a new `op_contract` major version when the common public contract itself remains compatible.

Unknown or incompatible contract/profile/result/helper/release/host tuples fail closed.

### Effect ceiling and caller/release precedence

An immutable OP release/profile defines hard maximum effects. A caller may only narrow those effects; it cannot widen them.

Effective effects are the intersection of:
1. caller-authorized effects;
2. profile hard caps;
3. immutable release-qualified capabilities.

Conflict or uncertainty fails closed.

`repair_units` may mutate only the exact frozen consumer mutation envelope explicitly authorized for that continuation plus its own OP evidence/provenance mechanics. v1 repair does not authorize merge/release/Close, issue/PR comments, email/messages, settings changes, arbitrary HTTP writes, credential operations, or unrelated consumer mutation. Effects beyond the cap return to the consumer/caller authority.

### External runtime/backend boundary

Normative OP v1 behavior is self-contained in the qualified ChatGPT skills-only plugin, authorized provider tools (including Git/GitHub operations where allowed), and the bundled qualified helper.

No optional or mandatory MCP server, hosted orchestration backend, Pi/Paseo/Codex runtime, Android-local daemon, external scheduler, or equivalent external execution service may participate in normative v1 orchestration semantics.

A future product version may change this only through new owner/product authority and qualification.

### Bounded repair remains in v1

`repair_units` and `focused_revalidation` remain continuation-gated v1 profiles.

Bounded explicitly authorized repair is part of the v1 outcome. It remains distinct from and narrower than generic implementation execution.

## Leaf-worker lifecycle opacity and completion response

OP leaf workers are assignment-only execution contexts.

A leaf worker receives only the minimum material needed for its exact assignment:
- immutable assignment/profile/unit identity;
- exact subject and accepted coverage/evidence bindings;
- allowed read set;
- allowed effect/output set;
- required durable output locator and publication/readback rules;
- assignment-local acceptance/completion rules.

Consumer lifecycle/workflow identity, phase routing, premium gates, downstream continuation logic and "next legal step" are not part of a leaf worker assignment.

If workflow/lifecycle text appears inside the exact reviewed subject or required evidence, the worker may inspect it only as subject data. It must not adopt that text as instructions for its own lifecycle, continue the consumer workflow, mutate consumer workflow state, or issue workflow-routing advice.

After durable result publication/readback, the worker's chat response must use only this completion receipt shape:

```text
Assignment: <assignment-id>
Status: COMPLETE | BLOCKED | EXHAUSTED
Durable result: <repository>@<commit>:<path>
Readback: VERIFIED | NOT_APPLICABLE
Blocker: <none | concise blocker>
```

No next-step recommendation, lifecycle routing, Premium gate, planning authorization, implementation authorization, or consumer-workflow status may be added to the leaf completion response.

Integrators may summarize integrated findings as required by their assignment, but they likewise do not own or continue the consumer lifecycle.
