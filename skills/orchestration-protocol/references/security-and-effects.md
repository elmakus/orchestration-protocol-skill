<!-- normative-owner: security-and-effects | version: 1.0.0 | domains: continuation-authority, authority-verification, effect-caps, effect-validation, forbidden-repairs, receipt-interfaces, verification-predicates, credential-boundary, checkpoint-record -->
# Shared owner — security and effects (`1.0.0`)

Sole normative owner of continuation authority and its verification,
release pinning with the immutable pre-worker checkpoint/readback gate,
effect caps and whole-set validation, the forbidden repair classes,
provider/tool/source receipt interfaces with verification predicates, and
the credential boundary. No helper networking, daemon, PKI/backend, or
external scheduler is introduced here or anywhere in M02.

## 1. Continuation authority

Continuation-gated admission requires an immutable
`continuation_authority_id` / authority record binding at least:

- authority issuer and caller relation;
- authorized profile/action;
- exact prior accepted integrated result/obligation identity where applicable;
- exact subject/candidate/base;
- accepted repair/revalidation obligations and change cone;
- freshness/currentness and supersession constraints;
- caller-requested/frozen mutation/effect envelope.

`repair_units` additionally requires exact accepted findings/result
identity, exact frozen mutation envelope, and exact candidate/base.
`focused_revalidation` additionally requires exact prior accepted
findings/obligations, exact repaired candidate, and exact bounded change
cone. Grammar: `schemas/envelope.schema.json`; synthetic example:
`templates/continuation-authority.example.json`.

## 2. Authority verification (authenticity)

A continuation is genuine only when ALL hold (proof grammar:
`schemas/envelope.schema.json` verification-proof record):

- the original Run Envelope binds one release-qualified caller/consumer
  authority channel and authority-source class;
- the continuation was obtained from that same bound channel or an
  explicitly authorized durable successor;
- positive verification binds exact issuer/caller relation, authority
  locator/content identity, currentness/supersession state, authorized
  profile/action, prior accepted result/obligation, subject/candidate, and
  effect/mutation envelope;
- the authority source is a release-qualified authority-source class of the
  caller integration.

A self-authored schema-valid artifact is evidence, not authority.
OP evidence/results cannot mint authority. Missing, stale, superseded,
ambiguous, or non-authority-bound prerequisites fail closed.

## 3. Release pinning and the pre-worker checkpoint gate

Before any child claim/reservation, evidence-producing worker read, or
consumer/external mutation, OP MUST durably publish and positively read
back one immutable wave checkpoint binding the complete normalized Run
Envelope, release/policy identity, effective effect envelope,
authority/continuation prerequisites, qualification snapshot, and wave
identity (grammar: `schemas/finite.schema.json` checkpoint record;
synthetic example: `templates/pre-worker-checkpoint.example.json`).
Recovery always starts from that checkpoint.

## 4. Effect caps and whole-set validation

Mandatory OP protocol mechanics needed to realize an otherwise authorized
wave (allocator/claim metadata, OP-owned ledger/provenance, own
worker-result and integrated-result publication) are authorized protocol
mechanics, not caller-requested consumer effects. Caller-requested effects
govern consumer/external effects beyond those mechanics.

- Effective consumer/external effects = the complete caller-requested set
  validated as a subset of (profile hard cap ∩ release-qualified
  capability set). Caller authority narrows caps; it never widens them.
- If ANY requested effect is outside the hard cap or cannot be classified,
  the ENTIRE requested-effect set is rejected/BLOCKED. OP never silently
  auto-narrows a mixed allowed+forbidden request.
- Default discovery/review/bug-hunt hard cap: allocator CAS required by OP,
  own claim/ref, own result artifact, authorized integrated-result
  publication. No consumer mutation.
- `repair_units` hard cap: the exact explicitly frozen consumer mutation
  envelope for the accepted continuation plus OP evidence/provenance
  mechanics. `focused_revalidation` hard cap is read/review-like: no
  consumer mutation.
- Known causally triggered automation/effects of an OP write belong to the
  complete realized effect closure; alias/rename/generated/secondary writes
  are included. Unknown, unbounded, or forbidden downstream effects prohibit
  the originating write.

## 5. Forbidden repair classes (immutable)

Even when named by a frozen mutation envelope, v1 `repair_units` can NEVER
authorize: merge, release, or Close; issue/PR comments or other
tracker/social publication; email, chat, or other outbound messages;
repository/account/workspace/settings changes outside the exact bounded
content mutation; arbitrary HTTP/network writes; credential/token/key/cookie
operations; unrelated consumer mutation outside the accepted repair
obligations. Read-only discovery/review/revalidation profiles authorize no
consumer mutation at all.

## 6. Receipt interfaces and verification predicates

Concrete proposed provider/tool/source receipt interfaces (grammar:
`schemas/metadata.schema.json`): operation identity, expected-head/ancestry
precondition, target state locator, occurrence classification
(`VERIFIED | NOT_APPLIED | UNKNOWN`), a closed postcondition form, and
exact postcondition/readback locator. Predicates:

- Postconditions use closed mechanical forms only:
  `ref-points-at:<40-hex-commit>`, `no-write-performed`, or
  `path-content-matches:<64-hex-digest>`. Free-form outcome prose is not
  a receipt and must never reach the coordinator as an alternate semantic
  channel.
- Operation identities are mechanically assigned (`op:NNNN`) and bound to
  the authorized operation — never freely named from semantic output.
- A target is exactly `<repository>:refs/heads/<branch>` recomposed from
  the bound operation context (repository plus the mechanically derived
  bound branch); any other ref suffix is non-admissible.
- A postcondition is checked against the same context: `ref-points-at:X`
  requires `X` to equal the bound intended commit; `no-write-performed`
  requires occurrence `NOT_APPLIED`; `path-content-matches:D` requires a
  bound intended content digest equal to `D`.
- Occurrence/readback coherence: `VERIFIED` occurrence requires `VERIFIED`
  readback; a self-labelled success with any other readback proves
  nothing. `UNKNOWN` occurrence prohibits the originating production
  action regardless of readback.
- One coherent operation-context predicate governs kind, fence, intended
  postcondition, and occurrence together. The declared operation kind is
  `ref-mutation` or `read-observation`, validated before any branch:
  - `ref-mutation` requires a non-null expected head equal to the bound
    fence; a missing expected-head fence cannot prove the bound
    operation. Its intended postcondition kind is `ref-points-at` (or
    `no-write-performed` only with occurrence `NOT_APPLIED`).
  - `read-observation` requires a null expected head (no fence to check)
    and a `path-content-matches` postcondition bound to the declared
    intended content digest.
  - Occurrence and postcondition kind imply each other both ways:
    `NOT_APPLIED` holds exactly with `no-write-performed`; `VERIFIED`
    never pairs with `no-write-performed`. The intended postcondition
    kind is bound by the declared operation, never freely selected among
    unrelated grammar branches by the receipt.
  - Required kind context missing or ambiguous fails before coordinator
    consumption.
- A self-labelled success receipt is NOT authenticity/atomicity proof.
- Missing qualified source, expected-head fence, current authority, or exact
  readback yields NO production action.
- Uncertain remote-mutation occurrence: exact-read the target, classify,
  retry only after verified NOT_APPLIED, fail closed while UNKNOWN.
- No host class is claimed qualified by M03; every native capability
  predicate remains unverified (assumptions U-01..U-05 in `README.md`).
- Finite operation identity, its `conditional_fence` expected-absence vs
  expected-head form, and three-way recovery classification are owned by
  `references/finite-claim-substrate.md` and projected by the helper; the
  generic `ref-mutation` (non-null fence) vs `read-observation` (null fence)
  predicates above are unchanged and never weakened by that adjacent extension.

## 7. Credential boundary

Credentials remain provider-managed and are absent from package inputs,
templates, examples, helper interfaces, receipts, and evidence. No M03
record carries secrets, tokens, private keys, or cookies.
