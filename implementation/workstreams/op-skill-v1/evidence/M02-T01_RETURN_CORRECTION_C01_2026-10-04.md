# M02-T01 initial return — Main bounded correction C01

Date: 2026-10-04
Workstream: `op-skill-v1`
Card: `M02-T01`
Classification: incomplete/incorrect implementation return; stable Card remains valid
Owner route: Execution, bounded correction inside already accepted R8/P2/Card authority

## Exact failed return and observations

The initial implementation is `elmakus/orchestration-protocol-skill@8046cfa808ff9d67dc1fdcb9c5c75bc1430fb39e`, tree `98c2896b4558f205ed45c20c219b49558eac9b14`. Its declared evidence is `implementation/workstreams/op-skill-v1/evidence/M02-T01_IMPLEMENTATION.md`, blob `a8e0baecc1556065d287cca1223f8518ff8cb8ed`.

Main recovered the current canonical PWv2 router/Execution owner and independently read every delivered source/schema/template/manifest/check and the evidence. The worktree is clean on the legal branch. All 31 added paths are inside the Card's allowed surface; original authority, P2, Board revision 7, Card, prior result/review/blocker and historical kit bytes are unchanged. No native input is a construction prerequisite.

Main reproduced `node --check tests/build/check-m02.mjs` (exit 0) and `node tests/build/check-m02.mjs` (113/113, exit 0). Those observations do not establish A1-A8 acceptance: the checker contains weak/misdirected assertions and the source projections below are inconsistent. No real inference, native probe, remote-write test, qualification run or Q PASS was performed.

The current return is not normalized into a semantic result. Board revision 7 remains unchanged with M02-T01 in_progress, no result and no Review attempt. This is not a RED independent Review verdict and creates no new Card, plan cycle or real user stop. The failed source/evidence remain immutable in Git history.

## C01-F01 — shared state rejection cases are knowingly inconsistent

At the exact failed source, `tests/build/check-m02.mjs`'s actual `evaluateDisposition` function returns:
- applicable empty mandatory work, COMPLETE/CURRENT with INCOMPLETE coverage and `empty_coverage=true` -> INCOMPLETE; check 104 labels this “blocked” and asserts INCOMPLETE;
- APPLICABLE + CURRENT + COMPLETE + coverage NOT_APPLICABLE -> EVALUATE_TRUTH;
- APPLICABLE + CURRENT + execution IMPOSSIBLE + coverage COMPLETE -> EVALUATE_TRUTH.

R8 §3.5 and Card A3 require applicable empty-work and contradictory/unlisted tuples to be BLOCKED, not profile truth or INCOMPLETE. Correct the common-owner projection/check and add these small direct negative witnesses, keeping BLOCKED-before-INCOMPLETE, proved neutral applicability and profile-owned truth extension semantics intact. Do not substitute the later exhaustive 1,152-tuple programme.

## C01-F02 — templates are not concrete schema-coherent record examples

`run-envelope.example.json.run_envelope_id` is `runenv:COMPUTED ...`, violating the schema's exact digest pattern. Several other envelope references are all-zero or descriptive placeholder strings rather than coherent cross-linked examples; the finite nonce is an explicit NONCE-PLACEHOLDER. Single-record examples include `_synthetic` although the record schema forbids additional properties, and no extraction/projection rule reconciles them. The checker parses JSON and spots keys but does not validate the actual examples against their declared record definitions or resolve all local schema refs.

Provide valid, concrete synthetic records and an explicit annotation/container projection so the metadata label remains data and never enters a record or its semantic digest. Validate each delivered record-family example against its actual schema definition, including nested required fields, identity refs, patterns/enums and additional-property closure; reject unsupported validation keywords rather than silently ignoring constraints in a bounded local checker. An example nonce may be fixed synthetic bytes for syntax only, never qualified entropy/freshness or a production claim. Freeze coherent digests/references before checks and read them back; do not regenerate expected values inside verification. Keep the dependency-free/non-inference/no-build requirement and do not implement the M03 production helper prematurely.

## C01-F03 — canonical identity and content rules disagree with their checks

The contracts owner's formula says `digest(envelope-minus-return_id)`, while the checker additionally removes `run_envelope_id`; including that derived field would make the formula self-referential. The synthetic annotation currently enters the checker digest. Define one concrete semantic specification projection, exclude routing and derived/self-identity/container annotations, and verify any supplied derived identity instead of letting it silently override content. This is mechanical consistency of the already accepted identity contract, not a new semantic equivalence exception.

The content manifest declares its construction identity to hash canonical JSON of its entry list, but the check hashes ordinary `JSON.stringify(cm.entries)`, which depends on member-object insertion order. Use the declared canonical algorithm consistently; include a small entry-key-order witness. Preserve an acyclic graph, exact raw-file digests, sorted path ordering and detached/self exclusions. Replace `templates:digest:see-content-manifest` and other unresolved functional identity placeholders with concrete digests or explicitly typed resolvable identity references, without creating an attestation/content digest cycle.

## C01-F04 — partial-wave and result-lineage examples contradict common precedence

`admission-snapshot.example.json` admits `sealed:example:0002` without a corresponding sealed example and has one missing mandatory unit (`unit-03`, required source unavailable), yet its linked integrated tuple is COMPLETE/APPLICABLE/CURRENT/COMPLETE/RED. The check calls that tuple legal solely from its fields while ignoring the mandatory missing snapshot. Its current pointer targets another result ID not bound by that integrated record.

Make the snapshot, admitted results, integrated result and pointer usable/coherent as one exact synthetic lineage. A partial/blocked snapshot must derive INCOMPLETE/BLOCKED through the shared owner; negative evidence may remain recorded but cannot override precedence. A distinct complete RED example is allowed only with complete mandatory admission/coverage. Add small lineage/partial consistency checks, not a production qualification wave.

## C01-F05 — consume-time currentness owner is contrary to R8

R8 §11.1 assigns common state domains, equivalence and result-currentness resolution to the sole shared contracts/state owner. The delivered durable-storage header/body claims sole normative `currentness-resolution`, and contracts §8 explicitly assigns the resolution rule to durable-storage. Move the normative consume-time predicate to contracts-and-versioning, retaining durable-storage as owner of storage/pointer/provenance structure and non-normative references. Update owner headers/registry/checks consistently; no duplicate normative rule should remain. P2 and Card A1/A3 preserve R8 ownership rather than replacing it.

## C01-F06 — closed schemas cannot represent mandatory accepted bindings

Trace all required A2 record families and required R8/Card A2-A4 information to concrete schema fields or immutable linked records; current additionalProperties=false projections omit required information, for example:
- integrated results cannot carry canonical findings/conclusions, dissent, uncertainty or run-envelope identity and do not concretely bind the qualification-impact information required by the result contract;
- the original run envelope cannot carry its qualified authority-channel/source-class binding; verification proof cannot carry the complete prior-result/obligation, candidate and supersession binding required to authenticate continuation;
- envelope subject has an arbitrary-object escape and coverage is an unconstrained object rather than the supported exact immutable identity classes;
- no distinct homogeneous current-attempt record binds attempt identity/state to RUN_ID, batch, subject/coverage/release; a current_attempt_id string plus history is not that record;
- finite claim/reclaim grammar lacks sufficient immutable manifest/wave/subject/coverage/release and exact expected current claim/result bindings for its specified ownership/fencing relation.

Complete the structural projections and their examples, with mandatory fields/conditional binding for applicable continuation/attempt/repair cases. Schema validity must remain distinct from actual authenticity/host/provider proof. Do not add the future allocation/sealing algorithms or invent a general identity framework. Corrections stay within M02's already promised common record/API outcome.

## C01-F07 — mechanical values and proposed policy/impact records are insufficiently bounded

`metadata.schema.json` accepts arbitrary strings for branch/ref/output_path/publication/ancestry/blocker fields; the checker only checks allowed key names, so a semantic conclusion can pass in an existing field. A closed list of field names is not Card A5's closed typed value grammar. Define concrete mechanical identifiers/paths/ref/receipt value grammars and generation/binding rules; reject unknown or semantic/free-form values before coordinator consumption. Test a leak in an existing field as well as an added field. Mechanical blocker capability codes must not carry semantic conclusions. This is bounded source/check behavior, not proof that installed metadata channels are qualified.

`current-policy.json` is described by the common owner as a live manifest but is self-authored construction data with no current qualified distribution proof, while the test positively “admits” this unqualified release from only a floor and integrity flag. Clearly separate proposed/synthetic policy from external current authorized readback and hypothetical structural examples from actual production admission. Model the freshness inputs needed by the chosen proposed rule; compare release versions by defined version semantics, not lexical full-string comparison. This snapshot must remain ineligible for production without exact positive authority/qualification.

Impact entries that select only Q0/Q1 for arbitrary common-contract or schema changes do not prove that dependent state/profile/integration/effect/allocator layers are unaffected. Use an explicit conservative dependency mapping (all plausible layers if classification is not safely bounded), and retain unknown/unbounded -> all-Q stale. Pending host/helper identities must be explicit unavailable observations, not functional fake fingerprints. Keep concrete package identities acyclic. Remove unnecessary PWv2 milestone/`owner_card` fields from shipped registries; release-owned module inventory is not consumer workflow state.

## Correction return and next owner

Correct C01-F01 through C01-F07 under the unchanged Card's allowed source/check/evidence surface. Preserve the initial return identity, failures and this classification in the updated implementation evidence; report actual new commands/outcomes, limitations and exact changed source identities. Main's correction record is read-only to implementation work. No workflow/authority/Card/result/review/Board change or push is authorized to the correcting implementation context.

After a valid corrected return, Main independently checks acceptance/readbacks, normalizes the exact semantic result and freezes the required fresh independent source Review. Native/exhaustive qualification remains deferred by accepted P2, and no production or Q success can be inferred from the source correction.
