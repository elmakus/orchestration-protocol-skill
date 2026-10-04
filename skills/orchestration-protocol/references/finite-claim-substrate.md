<!-- normative-owner: finite-claim-substrate | version: 1.0.0 | domains: finite-ledger-dag, finite-manifest, finite-claim-ownership, finite-nonce-source, finite-publication-fence, finite-reclaim, finite-operation-identity, finite-recovery-classification, finite-conditional-write, finite-provider-procedures, finite-allocation-planning, finite-context-packs -->
# Sole owner — finite claim substrate (`1.0.0`)

Sole normative owner of the finite heterogeneous allocation substrate:
reconstructible ledger/DAG, manifest, per-unit generation and strong claim
ownership, qualified-source nonce interface, non-force publication with
expected-head/ancestry and exact readback, single-use fenced reclaim with
sibling retention, durable operation identity with three-way recovery, the
one concrete conditional-write model, proposed manual/native provider
procedures, and deterministic allocation planning plus bounded context-pack
projection. Other documents may cite these rules only as non-normative
explanation.

Canonical serialization, envelope equivalence, version/release admission,
the closed mechanical metadata allowlist with value binding, generic
receipt interfaces, and the Git ledger/immutability/readback structure are
owned by their existing owners and referenced here without restatement. In
any apparent conflict the owning reference wins and execution fails closed.
Record grammars: `schemas/finite.schema.json`
(`finite_manifest`, `finite_claim`, `conditional_fence`,
`finite_publication`, `finite_operation`, `reclaim_action`).
Synthetic examples: `templates/finite-claim.example.json`,
`templates/finite-publication.example.json`,
`templates/finite-operation.example.json`.
Mechanical implementation:
`skills/orchestration-protocol/scripts/op-helper.mjs`
(`op-helper-api/1.0.0`); detached identity:
`skills/orchestration-protocol/manifests/helper-manifest.json`.

Construction release `0.3.0-m03` is incomplete, draft and unqualified. No
host, source, provider, or qualification claim is made here. Missing
qualified primitives BLOCK production; they do not block authoring this
complete source contract.

## 1. Reconstructible ledger/DAG

One wave owns one finite ledger segment. Nodes, in causal order:

1. Common immutable wave base (repository + commit) and the immutable
   pre-worker checkpoint (security owner) binding the normalized Run
   Envelope, release/policy identity, effective effects, authority
   prerequisites, qualification snapshot, and wave identity with VERIFIED
   readback. Recovery always starts from that checkpoint.
2. One finite manifest (`finite_manifest`) listing every heterogeneous unit
   (`unit-NN`) with its current `claim_generation` (integer `>= 0`).
3. Zero or more strong winning claims (`finite_claim`), one current owner
   per unit/generation, each binding exact claim commit + unit + generation
   + fresh `attempt_nonce` (§3).
4. Zero or more finite publications (`finite_publication`) carrying exact
   immutable publication identity with fence, ancestry, and VERIFIED
   readback (§5).
5. Zero or more durable finite operations (`finite_operation`) binding one
   mechanical operation identity to exact target, fence, intended
   postcondition, and exact readback (§7).
6. Zero or more immutable single-use reclaim actions (`reclaim_action`)
   advancing exactly one unit after positive proof of no valid current
   terminal result (§6).
7. Sealed lane results and later integration effects are recorded by their
   owners (M05); this substrate records only the claim/generation/ancestry
   bindings they consume, never their algorithms.

Every edge carries exact repository/commit/path/blob (or equivalent
immutable) identity so the full chain — checkpoint → manifest → claim →
publication/operation → reclaim → next generation — is reconstructible
without trusting mutable branch heads. Historical generations are immutable
non-current provenance, never overwritten. Ledger scope, attempt namespace
(`attempt_nonce` full entropy per claim vs `attempt_nonce_id` mechanical
handle `nonce:NNNN` per assignment), assignment/output identity
(`assign:NNNN` → `results/<slug>.md`), and generation/nonce scopes are
explicit per record. No stale namespace, token, ref, or role is reused;
physical shape alone never proves current ownership.

## 2. Finite manifest

`finite_manifest` binds `manifest_id`, `wave_id`, `wave_base`
(repository + commit), and a non-empty `units` list. Each unit entry binds
`unit_id` (`^unit-[0-9]{2}$`, digits only, no truncated/lossy aliases) and
its current `claim_generation`. The manifest is the only authority for
which generations are current; a claim/publication/reclaim naming a
generation absent from the manifest, or a generation older than current, is
non-admissible. Unit identity is durable across generations; generation
advances only through §6. Supplemental overflow may extend discovery only
after mandatory finite work is allocated and cannot replace missing
mandatory coverage. Homogeneous `RUN_ID`/batch/current-attempt mechanics
belong to the later homogeneous owner (M04) and are not implemented here.

## 3. Strong claim ownership and fresh nonce

A winning claim binds all of: `manifest_id`/`wave_id` equal to the bound
manifest; exact immutable `subject` and `coverage` (with required
`coverage_manifest` in one supported immutable class); `release_id` equal
to the pinned release; `unit_id` + `claim_generation` equal to one manifest
entry; `attempt_nonce` full hex `^[0-9a-f]{32,}$` (at least 32 hex chars =
128 bits); `nonce_source` exactly `qualified-csprng-128`;
`claim_commit` 40-hex; `force` exactly `false`. Missing, unknown, malformed,
or ambiguous required facts cannot become defaults, equality of omissions,
or successful plans.

Only the current generation can satisfy the manifest. Result publication
expected-head/ancestry is bound to the winning claim (§5). Exact readback
after mutation is required before the claim is relied upon.

## 4. Qualified-source nonce interface without weak fallback

Every production fresh `attempt_nonce` contains at least 128 bits of fresh
cryptographic entropy from the exact release/host-qualified source and is
bound to its winning unit/generation/claim. Timestamp, counter,
model-generated text, ordinary PRNG, predictable, weak, degraded,
substitute, foreign-source, stale-nonce, or self-qualified markers are
rejected. Missing, unavailable, or invalid qualified source BLOCKS before
claim creation; no weak/degraded fallback is permitted.

Generation occurs only through the explicit source interface
(`issue-claim-nonce --qualified-source <id>
--qualification-locator <locator>`). Source identity, provenance, and
current qualification MUST be independently established; a user flag, a
schema-valid `nonce_source` label, or a well-shaped hex string is never
authenticity, qualification, or observed ancestry. The label declares the
required source class; it does not prove it.

Local candidate CSPRNG/probe observations (`diagnose-csprng`,
`probe`) may be exercised without inference but are explicitly
UNQUALIFIED and never Android/host qualification or authority to claim. A
local diagnostic that emits candidate bytes labels them
`UNQUALIFIED-LOCAL-CANDIDATE` with an explicit warning and never produces a
production-qualified claim receipt. Deterministic commands
(`validate-nonce`, `validate-claim`) consume and validate a supplied nonce
and its exact source/ownership bindings; random issuance is excluded from
identical-output assertions. The shipped qualification remains BLOCKED and
the snapshot draft-ineligible; no host or source is manufactured as
qualified.

Counter/identity representation never admits lossy or truncated aliases:
`assign:NNNN`, `unit-NN`, `RUN-NNN`, `nonce:NNNN`,
`attempt:RUN-NNN:NNNN` are digits-only fixed widths; commits/blobs are
40-hex; digests are typed `runenv:`/`content:`/`sha256:` plus 64 hex.
Truncated, upper-case-coerced, or re-spaced variants are rejected even when
charset-safe, and well-shaped but wrong-bound values are non-admissible.

## 5. Finite publication procedure

`finite_publication` binds `publication_id`, `manifest_id`/`wave_id` equal
to the bound manifest, `unit_id` + `claim_generation` equal to the winning
claim generation, `attempt_nonce_id` mechanical handle bound to the same
assignment context, `claim_commit` equal to the winning claim commit,
`publication_commit`/`publication_blob`/`output_path` exact immutable
publication identity, `release_id` equal to the pinned release, one
`conditional_fence` (§8), `ancestry` bound 40-hex commit (claim or wave
base; a publication commit may legitimately be a descendant of the claim
commit with lineage preserved via `ancestry`), `readback` exactly
`VERIFIED` by exact readback, and `force` exactly `false`.

Admission requires only-current-generation: a publication naming a
superseded, stale, ambiguous, or manifest-absent generation is rejected,
and late/stale-generation publication revokes its mutation authority before
write time (see §6 for repair-time revalidation). Non-force publication
only; force updates are forbidden. Expected-head and ancestry are bound to
the winning claim; exact immutable publication identity is positively read
back before reliance.

Plans are not writes or authority. Expected-head, ownership, generation,
and candidate checks needed later by repair effects are represented
mechanically here without implementing repair semantics; the complete
required predicate is enforced at effect time, not merely in stale
preflight.

## 6. Exact single-use fenced reclaim

`reclaim_action` binds `action_id`, `manifest_id`/`wave_id` equal to the
bound manifest, `unit_id`, `expected_generation` equal to the exact current
manifest generation for that unit, `expected_claim_state`
(`^claim:unit-[0-9]{2}:gen[0-9]+:[a-z-]+$`) naming the exact consumed claim
state, `expected_head` exact 40-hex bound head, one
`terminal_result_check` (`unit_id` equal to the reclaimed unit,
`found_valid_current_terminal` exactly `false`, `readback` exactly
`VERIFIED` by exact readback proving no valid current terminal result for
that unit), and `single_use` exactly `true`.

The transition advances only that unit (`claim_generation + 1`) via the
exact-state/CAS fence against the bound generation/claim/head. Stale
authorization cannot advance a newer generation. Replay of the same action
is idempotent to the exact already-created generation or fails closed; it
cannot increment repeatedly or reclaim a newer generation. Timeout,
disappearing worker, or branch existence alone never authorizes reclaim.
Unknown, stale, ambiguous, or contradictory action, state, terminal-result,
or currentness proof yields no reclaim.

Unaffected valid completed siblings are retained; immutable old-generation
provenance is preserved. Late/stale-generation publication is rejected.
For mutation-capable repair work, current-generation, current-claim, and
current-candidate authority MUST be revalidated immediately before every
consumer effect, so reclaim revokes stale-generation mutation authority
before write time, not merely at result publication. Records, templates,
helper plans, and this procedure agree on action identity,
consumed/already-applied evidence, current ownership, and generation.
Homogeneous allocation/replacement and full repair/revalidation remain
later owners.

## 7. Durable operation identity and three-way recovery

Every material proposed provider mutation binds one durable mechanical
`finite_operation`: `operation_id` (`^op:[0-9]{4}$`, mechanically assigned,
never freely named from semantic output), `manifest_id`/`wave_id`/`unit_id`/
`claim_generation` equal to the owning claim context, `target` exactly
`<repository>:refs/heads/<branch>` recomposed from the bound operation
context, one `conditional_fence` (§8), objective `intended_postcondition`
in closed mechanical forms only
(`ref-points-at:<40-hex>` | `no-write-performed` |
`path-content-matches:<64-hex>`), `occurrence`
(`VERIFIED` | `NOT_APPLIED` | `UNKNOWN`) coherent with fence and
postcondition, and exact `readback`. Free-form outcome prose is not a
receipt and never reaches the coordinator as an alternate semantic channel.

Classification, owned here and projected by the helper without semantic
decisions:

- `VERIFIED`: exact readback proves the intended postcondition holds for
  the bound operation/fence; consume the verified prior success without
  replay.
- `NOT_APPLIED`: exact readback proves no write occurred for the bound
  operation; retry is permitted only after this proven state.
- `UNKNOWN`: occurrence cannot be proven (lost response, ambiguous
  readback, stale/contradictory proof); fail closed while UNKNOWN, retry
  is forbidden, and no production action is authorized.

A lost response triggers exact operation/target readback by operation
identity plus objective postcondition; never blind retry, never inference
from a mutable ref. Authoritative lineage and complete realized effect
closure are preserved; aliases, renames, generated/secondary, and causally
triggered writes cannot silently escape the frozen envelope. Provider
success labels are not atomicity or authenticity proof. No actual remote or
consumer mutation test is authorized in this construction stage.

## 8. Conditional-write fences: expected-absence vs expected-head

`conditional_fence` carries `fence_kind` (`expect-absent` |
`expect-head`), `expected_head` (40-hex or null), `absence_proof` (null or
`{ state: ABSENT, readback: VERIFIED, proof_locator }`), and `readback`
`VERIFIED`. The predicate, enforced at effect time by the provider
primitive (§9) and projected mechanically by the helper (`check-fence`):

- `expect-absent` (initial creation): `expected_head` MUST be null,
  `absence_proof.state` MUST be `ABSENT` with `readback` `VERIFIED` and a
  non-empty `proof_locator` positively proving the ref does not exist, and
  the enclosing `readback` MUST be `VERIFIED`. A missing field, null
  without proof, unknown, or stale proof is not expected-absence and
  fails closed. Suppression is not proof.
- `expect-head` (updates): `expected_head` MUST be exact 40-hex equal to
  the verified bound head, `absence_proof` MUST be null, and `readback`
  MUST be `VERIFIED` with the observed head equal to expected. A missing,
  null, unknown, or mismatched head fails closed.

Expected-absence is thus represented distinctly from missing, unknown, and
null fence. This adjacent closed extension preserves the prior generic
null-fence regressions: generic `ref-mutation` still requires a bound
non-null expected head and generic `read-observation` still declares no
fence (security owner, unchanged); the new finite fence lives only in
`conditional_fence` and never weakens those predicates.

## 9. One concrete conditional-write model

The single atomic model covering all finite state/fence predicates is
single-ref Git conditional mutation:

- Local ledger: `git update-ref <ref> <new-commit> <expected-old>` where
  `<expected-old>` is the exact verified expected head, or the zero OID
  (`0000000000000000000000000000000000000000`) for `expect-absent`. The
  command fails atomically when the current value differs; an unfenced
  `update-ref` without `<expected-old>`, a check-then-unconditional-write
  sequence, or presumed cross-ref atomicity is not a substitute.
- Remote publication: `git push --force-with-lease=<ref>:<expected> <ref>`
  (never `--force`, never unfenced push). The lease fails when the remote
  differs; non-force fast-forward publication without a lease is not a
  substitute.
- Readback: `git cat-file -e <commit>` / `git rev-parse --verify <ref>`
  locally, or exact `ls-remote`/object readback remotely, positively
  verifying the published immutable identity before reliance.

Each unit transition is one single-ref atomic conditional write; multi-unit
waves use per-unit refs, never presumed cross-ref atomicity. If the
qualified provider cannot enforce the required condition, production is
BLOCKED. Absence of current native qualification does not block authoring
this complete source contract.

## 10. Native/manual provider procedures (proposed, unverified)

Provider actions are explicit proposed manual/native procedures, not an
added backend. No mandatory external backend or native child-spawn API is
assumed. No helper networking, GitHub access, subprocess scheduling,
credential access, external effects, or semantic decisions are introduced;
the helper performs mechanical validation, canonicalization, allocation
planning, and bounded context-pack projection only (§11).

Proposed initial claim publication (manual; verify each step):

```sh
# 1. Positively prove expected-absence for the unit ref.
git rev-parse --verify refs/heads/op/<wave-slug>/<unit-slug> 2>/dev/null \
  && echo "REF-EXISTS — do not create" \
  || echo "ABSENT — record proof_locator with VERIFIED readback"
# 2. Atomically create only when absent (zero-OID expected-old).
git update-ref refs/heads/op/<wave-slug>/<unit-slug> \
  <claim-commit> 0000000000000000000000000000000000000000
# 3. Exact readback before reliance.
git rev-parse --verify refs/heads/op/<wave-slug>/<unit-slug>
git cat-file -e <claim-commit>
```

Proposed update/reclaim publication (manual):

```sh
# 1. Read the exact current head.
git rev-parse --verify refs/heads/op/<wave-slug>/<unit-slug>
# 2. Atomically advance only when it still equals <expected-head>.
git update-ref refs/heads/op/<wave-slug>/<unit-slug> \
  <new-commit> <expected-head>
# 3. Exact readback; on mismatch fail closed, classify via §7.
```

Proposed remote publication (manual; never `--force`):

```sh
git push --force-with-lease=refs/heads/op/<wave-slug>/<unit-slug>:<expected-head> \
  origin refs/heads/op/<wave-slug>/<unit-slug>
```

Native/qualified variants of the same predicates (exact expected-absence
or exact expected head, single-ref atomicity, exact readback) remain
proposed and unverified; the exact native primitive identities, host
capabilities, and readback surfaces are deferred to Q9/Q10. If the
available provider cannot enforce the required condition, the affected
production action is BLOCKED.

## 11. Deterministic planning, context packs, and helper boundary

Deterministic finite allocation plans (`plan-alloc`) are derived from the
exact frozen manifest + envelope snapshots only (sorted by `unit_id`,
`assign:NNNN` in manifest order, `branch = op/<slug(wave)>/<slug(unit)>`,
`output_path = results/<slug(assignment)>.md`), never from sibling
semantic material. Bounded assignment-only context packs (`context-pack`)
project exactly one assignment's frozen identities, allowed reads/effects,
and output/publication/readback contract. Neither emits full fresh-nonce
bytes; both carry `fresh_nonce_required: true` with the qualified-source
class, and neither mints authority, schedules workers, fetches data, holds
credentials, writes state, retries writes, or decides truth, severity,
deduplication, coverage meaning, scope, or profile selection. Errors and
receipts never echo unadmitted semantic input or unknown keys/values into
coordinator-visible channels; they name the mechanical field and reason
without reproducing supplied semantic values.

Structural helper checks and qualified source/authority verification remain
distinct: a declared boolean, label, proof-marker shape, or input parent
list is not authenticity, qualification, or observed ancestry. Ancestry is
validated only from already-fetched identity-bound Git objects/evidence
(`validate-ancestry --objects-dir <dir>` reads loose objects, walks parent
links, never fetches); an unbound ancestry assertion is not trusted.
Publication, readback, and self-identity receipts use the acyclic
intent/published-object/detached-readback representation: the helper source
never embeds its own unknown Git commit hash or digest; probe/API report
version and capabilities while the detached manifest carries the digest.

## 12. What this substrate does not do

No homogeneous `RUN_ID`/batch/current-attempt algorithms (M04); no full
launch, sealing, integration, or context-source protocols (M05); no
substantive profile semantics (M06/M07); no M08 assembly; no M09
exhaustive, native, real-inference, remote-write, consumer, or race
qualification. No Python, second helper, backend, MCP, Pi/Paseo/Codex
runtime, networking, GitHub access, subprocess scheduling, credential
access, external effects, or semantic decisions. No substantive profiles,
no repair/revalidation algorithms beyond the effect-time predicate
representation in §§6–7, and no production qualification PASS.
