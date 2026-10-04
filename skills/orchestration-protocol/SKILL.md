<!-- normative-owner: op-skill-root | version: 0.2.0-m02 | domains: product-boundary, profile-routing, freeze-load-gates, fail-closed-dispatch, ownership-map -->
# Orchestration Protocol Skill — concise root

> M02 construction snapshot (`0.2.0-m02`, `op_contract 1.0.0`). Draft and
> unqualified. Android compatibility of this layout is **unverified**.
> Normative detail lives only in the declared owner; this root never restates
> another owner's rules as normative text.

## 1. Product/consumer authority boundary

- The caller decides **when** orchestration is required and binds the exact
  immutable subject, coverage/acceptance, continuation authority, and effect
  request. OP decides **how** the authorized wave is decomposed, executed,
  integrated, recovered, and durably reported.
- OP never becomes the caller's lifecycle, Definition, Planning, merge, or
  release authority.
- Compatible callers MUST NOT depend on lane counts, worker roles, allocator
  internals, prompt layout, helper implementation, or other private topology.
- Normative v1 behavior is self-contained in the qualified package plus
  authorized provider tools. No MCP server, hosted backend, Pi/Paseo/Codex
  runtime, Android-local daemon, or external scheduler participates in
  normative behavior. None is introduced by M02.

## 2. Profile registry and routing/selection

Stable v1 profiles (`profile_semantics_version 1.0.0` each). All modules are
**pending** (M06/M07); a pending path is inventory, never a loaded module.

| profile_id | family | intended module | entry |
|---|---|---|---|
| `formal_research` | research | `skills/orchestration-protocol/profiles/formal-research.md` | initial |
| `definition_review` | review | `skills/orchestration-protocol/profiles/definition-review.md` | initial |
| `plan_review` | review | `skills/orchestration-protocol/profiles/plan-review.md` | initial |
| `execution_package_review` | review | `skills/orchestration-protocol/profiles/execution-package-review.md` | initial |
| `targeted_bug_hunt` | bug_hunt | `skills/orchestration-protocol/profiles/targeted-bug-hunt.md` | initial |
| `global_bug_hunt` | bug_hunt | `skills/orchestration-protocol/profiles/global-bug-hunt.md` | initial |
| `repair_units` | repair | `skills/orchestration-protocol/profiles/repair-units.md` | continuation-gated only |
| `focused_revalidation` | revalidation | `skills/orchestration-protocol/profiles/focused-revalidation.md` | continuation-gated only |

Selection constraints (see contracts owner for semantics):

- `repair_units` and `focused_revalidation` are unreachable as initial entry;
  they require exact continuation admission (see security owner).
- Quick ordinary lookups stay outside OP; substantial ordinary research uses
  `formal_research`.
- Unknown or incompatible contract/profile/result/release/reference/helper/
  host identities fail closed.

## 3. Freeze/load gates

Before any semantic profile execution, decomposition, worker launch,
evidence-producing read, claim, or mutation that can contribute to the wave,
the consumer MUST, in order:

1. Freeze the normalized caller Run Envelope (subject, coverage, contract/
   profile/release tuple, continuation prerequisites, requested effects).
2. Resolve, integrity-verify, and pin exactly one immutable OP release;
   verify it against the compatibility manifest and the current release
   policy (see contracts owner).
3. Load the required normative owners for the bound profile: always the four
   M02 common owners; profile/substrate/helper owners only when their
   implemented modules exist. A pending registry path MUST NOT satisfy a
   load gate — an unavailable or not-yet-implemented owner or profile fails
   closed, as does any unqualified production tuple.

## 4. Fail-closed dispatch invariants

- One active wave never mixes releases.
- Missing, stale, superseded, ambiguous, or non-authority-bound prerequisites
  fail closed (BLOCKED), never guessed.
- The whole requested effect set is validated against profile/release caps;
  mixed allowed/forbidden or unclassifiable requests are rejected whole —
  never auto-narrowed (see security owner).
- Schemas/templates are serialization projections of their sole owner, never
  independent semantic authorities. In any apparent conflict, the owning
  reference wins; apparent cross-owner contradiction fails closed.
- Future profile extensions are typed applicability, coverage/completion,
  truth, and convergence predicates only. Shared state
  precedence/equivalence/currentness cannot be overridden by any profile.

## 5. Normative ownership/precedence map

Exclusive ownership by semantic domain. Machine-readable registry:
`manifests/registry.json`.

| owner id | version | module | status |
|---|---|---|---|
| `op-skill-root` | `0.2.0-m02` | `SKILL.md` | implemented (this file) |
| `contracts-and-versioning` | `1.0.0` | `references/contracts-and-versioning.md` | implemented |
| `evidence-and-sources` | `1.0.0` | `references/evidence-and-sources.md` | implemented |
| `security-and-effects` | `1.0.0` | `references/security-and-effects.md` | implemented |
| `durable-storage` | `1.0.0` | `references/durable-storage.md` | implemented |
| `finite-claim-substrate` | `1.0.0` | `references/finite-claim-substrate.md` | **pending (M03)** |
| `homogeneous-run-substrate` | `1.0.0` | `references/homogeneous-run-substrate.md` | **pending (M04)** |
| `independence-and-integration` | `1.0.0` | `references/independence-and-integration.md` | **pending (M05)** |
| `repair-and-revalidation` | `1.0.0` | `references/repair-and-revalidation.md` | **pending (M07)** |

Implemented links resolve; planned inventory entries are distinguished and
never admitted as loaded. No downstream stub file exists in this snapshot.
