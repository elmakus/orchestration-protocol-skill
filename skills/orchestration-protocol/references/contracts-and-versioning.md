<!-- normative-owner: contracts-and-versioning | version: 1.0.0 | domains: run-envelope, identity-scopes, envelope-equivalence, canonical-serialization, state-domains, state-precedence, currentness-resolution, version-compatibility, release-admission, content-identity-graph, compatibility-manifest, current-policy-manifest, extension-points -->
# Shared owner — contracts and versioning (`1.0.0`)

Sole normative owner of the caller/run envelope, identity scopes and
equivalence, canonical serialization, caller-visible state domains and
pre-acceptance precedence, version/compatibility relations, release
admission, the package content-identity graph, and the compatibility and
current-policy manifests. Other documents may cite these rules only as
non-normative explanation.

## 1. Caller/Run Envelope

A compatible caller binds at least:

- `op_contract` compatible family/range;
- stable `profile_id`;
- accepted `profile_semantics_version` compatible range/identity;
- exact immutable subject identity (§2);
- exact immutable coverage/acceptance identity;
- caller-owned continuation authority identity where applicable;
- optional `return_id` routing/correlation metadata;
- caller-requested effects;
- applicable continuation prerequisites;
- exact immutable OP release once resolved.

The Run Envelope freezes accepted normalized values before worker execution.
Record grammar: `schemas/envelope.schema.json`. Synthetic example:
`templates/run-envelope.example.json`.

Ordinary `formal_research` preflight: a natural-language question is
normalized into a bounded envelope (captured-content subject, constraints,
freshness horizon, source/evidence classes from profile semantics plus
caller input, exclusions, return target). Purely mechanical normalization is
allowed only when the value is uniquely derivable from explicit caller
input, immutable accepted profile defaults, and deterministic
canonicalization/equivalence rules. Two or more materially different
interpretations REQUIRE return to caller authority, never guessing.

## 2. Identity scopes and subject classes

Distinct scopes (grammar: `schemas/identities.schema.json`):

- `run_envelope_id`: digest of the normalized envelope specification.
- `wave_id`: one concrete execution of that envelope/profile.
- `batch_revision_id`: child of one wave for frozen homogeneous RUN_ID batches.
- `RUN_ID`: one homogeneous worker/run member inside one batch revision.
- Finite heterogeneous work uses `unit_id + claim_generation + attempt_nonce`,
  never RUN_ID.

Supported immutable subject classes (M02):

- exact Git identity: repository + commit + path + blob;
- immutable captured content: SHA-256 digest plus byte length and capture
  method;
- deterministic composite manifest: ordered member list plus composite digest
  over canonical member identities.

A moving branch, path, URL, title, or natural-language label alone is never
an immutable identity. One envelope may authorize multiple waves; each wave
binds exactly one `run_envelope_id`. Batch/run identities are children of
their owning wave and are never reused across waves.

## 3. Envelope equivalence and canonical serialization

One concrete semantic specification projection is digested. For a Run
Envelope it is the record minus:

- routing-only container content (`return_id`);
- derived self-identity (`run_envelope_id` — digesting it would be
  self-referential);
- container/annotation labels (e.g. synthetic-data markers), which are
  transport metadata outside the record and never enter any digest.

A supplied derived identity MUST be verified against recomputation from
this projection; a mismatch fails closed and the supplied value never
silently overrides content. Canonical serialization:

- UTF-8 JSON, object keys sorted lexicographically by UTF-16 code unit,
  no insignificant whitespace, arrays order-significant, numbers without
  NaN/Infinity, strings as written.
- `digest(x) = lowercase-hex(SHA-256(canonical-bytes(x)))`.
- `run_envelope_id = "runenv:" + digest(semantic-projection(envelope))`,
  where the projection is defined above.
- Redundant exact identity fields for one subject/coverage component MUST be
  mutually consistent under canonical equivalence; conflicting redundant
  components make the envelope invalid/BLOCKED — no field silently wins.

`return_id` is retained separately, excluded from `run_envelope_id`
identity/equivalence, may vary across retries/handoffs, and never grants
authority. Changing only `return_id` never creates a new semantic envelope.

## 4. Caller-visible state domains and precedence

Finite separate domains (persisted separately; never collapsed):

- `execution_state`: `COMPLETE | INCOMPLETE | BLOCKED`.
- `applicability_state`: `APPLICABLE | NOT_APPLICABLE | UNKNOWN`.
- `currentness_state`: `CURRENT | SUPERSEDED | STALE | UNKNOWN`.
- `coverage_state`: `COMPLETE | INCOMPLETE | BLOCKED | NOT_APPLICABLE`.
- `profile_disposition`: `COMPLETE | GREEN | RED | ESCALATE_FULL_WAVE |
  INCOMPLETE | BLOCKED | NOT_APPLICABLE`, restricted per profile below.

Total profile-disposition domains:

- `formal_research`: `COMPLETE | INCOMPLETE | BLOCKED | NOT_APPLICABLE`.
- `definition_review`, `plan_review`, `execution_package_review`,
  `targeted_bug_hunt`, `global_bug_hunt`, `repair_units`:
  `GREEN | RED | INCOMPLETE | BLOCKED | NOT_APPLICABLE`.
- `focused_revalidation`:
  `GREEN | RED | ESCALATE_FULL_WAVE | INCOMPLETE | BLOCKED | NOT_APPLICABLE`.

Deterministic terminal precedence (owned here; profiles MUST NOT redefine):

1. Applicability `UNKNOWN` → disposition `BLOCKED`.
2. Applicability `NOT_APPLICABLE` → legal only with the profile-owned
   NOT_APPLICABLE predicate proven before substantive execution; the only
   legal tuple is execution `COMPLETE` + applicability `NOT_APPLICABLE` +
   currentness `CURRENT` + coverage `NOT_APPLICABLE` + disposition
   `NOT_APPLICABLE`. Unproven predicate → `UNKNOWN` → `BLOCKED`.
3. Currentness `SUPERSEDED | STALE | UNKNOWN` → `BLOCKED`.
4. Execution or coverage `BLOCKED` → `BLOCKED`.
5. Else execution or coverage `INCOMPLETE` → `INCOMPLETE`.
6. Else the only acceptance-evaluation tuple is execution `COMPLETE` +
   applicability `APPLICABLE` + currentness `CURRENT` + coverage `COMPLETE`;
   apply the profile truth rule (profile-owned predicate through §9).
7. Any unlisted or contradictory tuple is invalid → `BLOCKED`. In
   particular: an applicable profile whose mandatory coverage/work set
   resolves empty without a proven profile NOT_APPLICABLE predicate is
   BLOCKED (never GREEN, never INCOMPLETE-as-success, never profile
   truth); and a tuple such as APPLICABLE + CURRENT + COMPLETE +
   coverage NOT_APPLICABLE, or any value outside the finite domains
   (including applicability), is contradictory → `BLOCKED` rather than
   truth evaluation.

`BLOCKED` takes precedence over `INCOMPLETE`. `NOT_APPLICABLE` is terminal
and neutral, never GREEN. Coverage `NOT_APPLICABLE` requires applicability
`NOT_APPLICABLE` and disposition `NOT_APPLICABLE`. An applicable profile
whose mandatory coverage/work set resolves empty without an explicit
profile NOT_APPLICABLE predicate is invalid/BLOCKED, never GREEN/clear.
For the legal acceptance tuple, profile truth is total per profile family
as declared through §9 extension points (e.g. review GREEN iff no accepted
blocking finding remains; research COMPLETE iff synthesis obligations hold).

## 5. Consume-time currentness resolution

Publication-time `CURRENT` is not consume-time proof. Before any forward
use, continuation, acceptance reuse, or superseding action, the consumer
MUST resolve effective currentness through the canonical
current-result/supersession authority bound by the release/caller
integration, positively read it back, and verify the exact result remains
current. Missing, stale, superseded, or ambiguous effective currentness
blocks forward acceptance (BLOCKED). Durable-storage owns the pointer and
provenance structure that carries this resolution; the predicate itself is
owned here.

## 6. Version compatibility

Persisted independently: `op_contract` version, profile ID + profile
semantics version, result schema version, release/content digest, producer
manifest digest, template/reference identities, helper API/artifact digest,
dated host qualification identity, per-wave subject/coverage/package/
generation/RUN_ID batch identities.

- Unknown or incompatible contract/profile/result/release/reference/helper/
  host identities fail closed.
- A major profile-semantic change is incompatible unless the caller
  explicitly accepts that major semantics; it does not automatically force
  an `op_contract` major bump while the common contract stays compatible.
- Internal topology changes preserving compatible profile semantics need no
  compatibility change.

## 7. Release admission and current policy

A moving channel may locate a release, but the exact release/content
identity MUST be resolved, integrity-verified, and pinned before any
semantic work, and one wave never mixes releases. Admission requires:

- integrity/compatibility checks pass against `manifests/compatibility-manifest.json`;
- the release is not revoked and satisfies the current minimum-supported floor;
- the current release-policy manifest is resolved and positively read back
  from the canonical distribution authority already used by the skills-only
  product.

The current-policy manifest binds at least: policy identity/version,
currentness/freshness rule, `minimum_supported_release`, explicitly revoked
release identities/digests, optional supersession/reason metadata. Forged,
stale, ambiguous, or unresolvable policy fails closed. Historical releases
are admissible only while integrity/compatibility/qualification checks pass,
unrevoked, and at/above floor. Manifest grammar:
`schemas/policy.schema.json`; live manifest: `manifests/current-policy.json`.

## 8. Content-identity graph (acyclic)

Implemented package files → content manifest → construction content
identity. Rules:

- The manifest's own bytes, detached policy/qualification/readback
  attestations, and evidence files are explicitly excluded from the content
  the manifest attests.
- Package projections and source identities are deterministic: digest over
  canonical bytes with sorted path ordering.
- This interim M02 construction identity MUST NOT be confused with the M08
  complete-candidate identity.
- A dossier/report MUST NOT change the bytes it attests; verification reads
  back recorded digests without regenerating expected values as evidence.

Live manifest: `manifests/content-manifest.json`.

## 9. Typed profile extension points

Profiles may parameterize shared mechanisms ONLY through these typed
extension points declared here (implemented by M06/M07 profile modules):

- `applicability_predicate(profile, envelope) -> NOT_APPLICABLE-proof | none`;
- `coverage_predicate(profile, envelope) -> coverage obligations`;
- `completion_predicate(profile, evidence) -> COMPLETE | INCOMPLETE | BLOCKED`;
- `truth_predicate(profile, complete-tuple-evidence) -> disposition`;
- `convergence_rule(formal_research, evidence) -> saturated | open`.

No extension point may redefine state precedence (§4), identity equivalence
(§3), or currentness resolution (§5). If two canonical
owners appear to govern one rule or contradict, execution/qualification
fails closed.
