<!-- normative-owner: durable-storage | version: 1.0.0 | domains: git-ledger, result-immutability, supersession-pointers, archive-structure, readback-proof, provenance-lineage -->
# Shared owner — durable storage (`1.0.0`)

Sole normative owner of the Git wave ledger, result immutability and
supersession pointers, the evidence archive structure, readback proof, and
provenance lineage. Sealing transitions and integration publication fences
belong to their later owners (M05); finite claim/generation/publication/reclaim
transitions belong to `references/finite-claim-substrate.md`; this owner records
their durable effects, never their algorithms. Consume-time currentness resolution is
owned by contracts-and-versioning (§5 there) and referenced here only as
non-normative explanation.

## 1. Git wave ledger

Git/GitHub is the durable wave ledger. Every wave/result preserves enough
identity to reconstruct: caller/run/profile; subject and coverage; OP
release plus current release-policy identity used at launch; exact
qualification/admissibility snapshot and qualification-impact manifest used
at launch; immutable pre-worker wave checkpoint; manifest/package; claim
generations or RUN_ID batches; worker result ancestry and sealed-result
supersession lineage; integration admission snapshot; integrated result and
supersession/revalidation lineage; continuation-authority source/verification
lineage when applicable.

For v1 the durable evidence archive remains `elmakus/project-research`. A
compatible successor **structure** means organization/index/schema/path
evolution inside that repository while preserving immutable historical
commits/results, durable old-to-new index/supersession mapping,
reconstructable lineage, and accepted commit reachability/auditability.
Replacing the repository itself requires future owner/product authority.

## 2. Result immutability and supersession

- Result artifacts are immutable historical records. Stored
  `currentness_state` is publication-time state only.
- Semantic amendment of a sealed/published result identity is forbidden.
  Correction requires a new result identity plus an explicit
  result-supersession transition; the old result remains historical evidence.
- Prior integrated results remain immutable; supersession creates a new
  authorized result/generation and an explicit supersession pointer (grammar:
  `schemas/results.schema.json`). History is never opportunistically
  overwritten, and historical packages/results are never rewritten to appear
  compliant with newer semantics.

## 3. Consume-time currentness pointers (non-normative reference)

The normative consume-time predicate lives in contracts-and-versioning
§5: publication-time `CURRENT` is not consume-time proof, and only a
positive readback of the canonical current-result/supersession authority
permits forward use. This owner provides the pointer and provenance
structure that carries that resolution: before any forward use the
consumer resolves the current-result pointer for the subject, positively
reads it back, and verifies the exact result remains current. Missing,
stale, superseded, or ambiguous effective currentness blocks forward
acceptance (BLOCKED).

## 4. Archive structure

Wave evidence is organized per wave identity: checkpoint → claim/attempt
records → sealed results → admission snapshot → integrated result →
supersession pointers. Each link carries exact repository/commit/path/blob
(or equivalent immutable content-addressed) identity so the full chain is
reconstructible without trusting mutable branch heads.

## 5. Readback proof

Publication claims prove nothing alone. Every durable write (checkpoint,
claim, result, snapshot, integrated result, supersession pointer) requires
positive exact readback of the published immutable identity before it is
relied upon. If exact sealed publication cannot be proven after an
ambiguous write response, the attempt is non-admissible and recovery
re-reads exact declared identities rather than inferring state from a
mutable ref.
