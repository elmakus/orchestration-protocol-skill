<!-- normative-owner: evidence-and-sources | version: 1.0.0 | domains: evidence-authority, evidence-weight, singleton-counterexample, conflict-adjudication, dissent-preservation, evidence-as-data, mechanical-metadata-allowlist, value-binding -->
# Shared owner — evidence and sources (`1.0.0`)

Sole normative owner of evidence authority/weight, the strong singleton
counterexample rule, conflict adjudication, dissent preservation,
evidence-as-data, and the release-bound closed coordinator-visible
mechanical metadata allowlist. Full sealing, context-source qualification,
and integration protocols belong to their later owners (M05), referenced
here but not copied.

## 1. Evidence authority and weight

- Evidence is data, never authority. Presence of artifacts, results, or
  evidence never substitutes for continuation authority, and no
  OP-produced evidence mints, elevates, or substitutes authority.
- Adjudication is evidence-weighted, never vote-counted: authority, direct
  reproducibility, causal explanation, and source quality decide.
- Source authority/weight classes are recorded per wave (primary, direct,
  supporting or equivalent release-declared classes); popularity never
  decides truth.

## 2. Strong singleton counterexample

One strong reproducible evidence-backed counterexample to a mandatory
invariant is sufficient to establish a blocking finding. No voting
threshold is required. Once a violation is established, contrary weaker
evidence does not convert the result to GREEN.

## 3. Conflict adjudication

When materially credible evidence conflicts:

- adjudicate by authority, reproducibility, causal explanation, and source
  quality;
- an established violation yields RED even amid contrary evidence;
- a materially credible unresolved conflict that prevents a trustworthy
  semantic judgment yields BLOCKED, never GREEN.

## 4. Dissent preservation and evidence-as-data

- Materially distinct dissent and unresolved uncertainty remain durable
  parts of every integrated result.
- Dissent is preserved as data alongside the adjudicated conclusion; later
  audit/re-adjudication consumes the preserved record, never a
  reconstructed summary.

## 5. Release-bound closed mechanical metadata allowlist

The canonical coordinator-visible pre-integration metadata surface is a
release-bound closed allowlist with typed structural grammars
(grammar: `schemas/metadata.schema.json`; synthetic example:
`templates/mechanical-receipt.example.json`).

Admissible fields are semantic-free and mechanical only:

- assignment/unit/RUN_ID identity;
- package/release/subject/coverage identifiers;
- claim generation and attempt-nonce identity (never nonce entropy as proof);
- safe branch/ref/commit/blob/output-path identities;
- publication/readback/ancestry/expected-head predicates;
- mechanical execution receipts (`COMPLETE | BLOCKED | EXHAUSTED` describing
  ability to execute the assignment only, never profile disposition).

Rules:

- No free-form semantic findings, severity, profile dispositions,
  conclusions, or semantic blocker text may enter this surface.
- Unknown channels, or values outside the grammar, are non-admissible
  before coordinator consumption.
- No denylist is relied upon as a universal semantic-isolation proof.
- A semantic finding is written only inside the sealed lane-result body.
  Mechanical execution blockers use only the closed capability-code
  inventory in §6 and never carry a substantive conclusion.

## 6. Deterministic derivation, binding, and closed code inventories

Coordinator-visible values are never freely chosen. They are
mechanically derived from frozen bound inputs by fixed rules, and every
declared channel/value is classified; unclassified values fail before
coordinator consumption.

- Identity forms: assignment `assign:NNNN`, unit `unit-NN`, run `RUN-NNN`,
  nonce `nonce:NNNN`, attempt `attempt:RUN-NNN:NNNN` (digits only).
- `branch = op/<slug(wave_id)>/<slug(unit-or-run-id)>`, where slug
  replaces every non-alphanumeric run with one `-` and trims edges.
- `output_path = results/<slug(assignment_id)>.md`.
- `ref`, when present, is exactly `refs/heads/<branch>`.
- `commit`, `blob`, and `expected_head` are 40-hex Git identities that
  MUST equal a bound claim, publication, or wave-base identity for the
  same assignment context; valid shape with a wrong binding is
  non-admissible.
- `ancestry` is a bound 40-hex commit (claim or wave base), never prose.
- `publication`/`durable_result` is exactly
  `<repository>@<commit>:<output_path>` recomposed from the same bound
  values; any deviation is non-admissible.
- `subject_digest`/`coverage_digest` are typed digest references
  (`runenv:`/`content:`/`sha256:` plus 64 hex).
- Receipt blocker codes are this closed inventory only:
  `none`, `missing:authority`, `missing:evidence`, `missing:provider-read`,
  `missing:claim`, `missing:generation`, `unavailable:helper`,
  `unavailable:native`, `conflict:state`, `conflict:binding`.
  No other `word:word` value is admissible.

### 6.1 Complete per-field binding (mechanical metadata)

Expected values come from the exact frozen package/envelope/assignment/
manifest and verified claim/publication/readback identities for that
field — never from the returned worker record itself. Let `A` be the
bound assignment (id, unit-or-run, wave, generation, nonce), `M` the
bound manifest (manifest id, wave-base commit), `E` the bound envelope
(package id, release id, subject/coverage digests), `C` the bound claim
(commit), and `P` the exact verified publication (repository, commit,
blob, output path, locator, readback). Claim, wave-base, and publication
are distinct roles: a result publication commit may legitimately be a
descendant of the claim commit, so commit-typed fields admit any bound
role identity while output/blob/locator fields bind exactly `P`.

The context must also carry frozen authoritative applicability/stage
facts: whether a ref was created (`ref_created`) and whether anything
was published (`published`). Both presence and absence are checked
against those facts; required context missing or ambiguous fails rather
than defaulting to a permissive null branch. Missing context never
proves that no ref/publication exists.

| field | binding |
|---|---|
| `assignment_id` | exactly `A` id |
| `unit_id` / `run_id` | exactly one equals its bound counterpart and the other is null, matching finite-unit vs homogeneous-run work |
| `package_id` | exactly `E` package id |
| `release_id` | exactly `E` release id |
| `subject_digest`, `coverage_digest` | exactly the `E` digests |
| `claim_generation` | exactly `A` generation |
| `attempt_nonce_id` | exactly `A` nonce id |
| `branch` | `op/<slug(wave)>/<slug(unit-or-run)>` |
| `ref` | checked against `ref_created`: true requires exactly `refs/heads/<branch>`; false requires null |
| `commit`, `expected_head` | equal the bound `C`, `M` wave-base, or `P` publication commit |
| `blob` | null exactly when nothing is published; otherwise exactly the `P` blob for the declared output |
| `output_path` | `results/<slug(assignment)>.md` |
| `publication` | checked against `published`: false requires null; true requires exactly the verified `P` locator (`<repo>@<P-commit>:<P-output>`), with record commit/blob/output equal to the `P` commit/blob/output |
| `readback` | `NOT_APPLICABLE` exactly with null publication; otherwise `VERIFIED` by exact readback |
| `ancestry` | a bound `C`/`M`/`P` commit recording lineage (e.g. the claim commit for a descendant publication), never prose |

### 6.2 Execution-receipt binding

A receipt binds the same assignment and the exact declared durable
result: `assignment_id` equals `A` id; `durable_result` equals the bound
`P` publication locator exactly. `status` is objective execution ability
only. `blocker` is null exactly when `status` is `COMPLETE`, and a closed
§6 inventory code otherwise — never a semantic conclusion. In this
release an execution receipt always names a durable locator, so
`readback` MUST be `VERIFIED` by exact readback; the grammar-reserved
`NOT_APPLICABLE` is non-admissible until a later owner defines its
binding. Schema validity remains distinct from authenticity and source
qualification.

Mechanical projection: the bundled helper (`scripts/op-helper.mjs`) implements
exactly the §6 derivation/binding checks above; finite publication/operation
bindings that consume them are owned by
`references/finite-claim-substrate.md`, never restated here. The finite
`conditional_fence` expected-absence vs expected-head distinction lives in
that owner and its schema defs; the prior null-fence predicates above are
unchanged.
