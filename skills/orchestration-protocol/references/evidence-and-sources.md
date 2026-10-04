<!-- normative-owner: evidence-and-sources | version: 1.0.0 | domains: evidence-authority, evidence-weight, singleton-counterexample, conflict-adjudication, dissent-preservation, evidence-as-data, mechanical-metadata-allowlist -->
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
  Mechanical execution blockers may name the missing capability/state
  without disclosing a substantive conclusion.
