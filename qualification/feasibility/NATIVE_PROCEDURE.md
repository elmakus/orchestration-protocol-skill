# Bounded native procedure (owner-assisted, M01-T01 preparation only)

> This procedure authorizes nothing by itself. Each native step requires
> separately authorized exact candidate/fixture identities, disposable targets,
> and the environment-authorized guarded test realization (see
> `TEST_ENVELOPE.md`). Missing owner authority or access is a real stop, not
> permission for broad M02–M07 implementation. Do not choose real targets or
> account settings here.

## Prerequisites (all must be bound before any native step)

- P0: exact immutable candidate identity (package digest from
  `FIXTURE_MANIFEST.json` lineage) and exact fixture-set identity, separately
  authorized in writing by the owner.
- P1: disposable install/invocation target (test account/device/sandbox)
  named by the owner; no production account, no consumer repository.
- P2: complete allowed-effect list plus causally triggered automation inventory
  for each step; any unknown/forbidden downstream effect blocks the step.
- P3: non-secret readback plan per step (exact artifact identity + VERIFIED /
  NOT_APPLIED / UNKNOWN classification rule).
- P4: environment-authorized guarded test realization for the native surface;
  if the execution policy cannot realize it, return the concrete blocker and
  stop — do not substitute another host or fabricate PASS.

## Steps (each records exact commands, outputs, readbacks, limitations)

- N1 Installation: install the exact candidate on the disposable target via
  the owner-operated flow. Record host/tool fingerprints, prompts, and the
  exact installed artifact digest read back against the candidate. Native
  installability predicate stays BLOCKED until VERIFIED readback.
- N2 Invocation: launch the probe skill through the qualified invocation path
  only. Record the exact invocation, assignment package identity, and output
  locator. No semantic OP wave is run.
- N3 Bundled ESM: execute `op-helper.mjs --audit-csprng` and
  `--validate-claim` on the exact fixture on-device. Record outputs. Any
  incompatibility is FAIL evidence; only exact incompatibility evidence can
  trigger the accepted separately qualified Python replacement.
- N4 CSPRNG: audit the on-device RNG source path, generate concurrent fresh
  nonces, prove >=128-bit entropy per claim, and prove weak/predictable
  sources rejected and unavailable RNG fails closed without creating a claim.
- N5 Provider Git fencing/readback: on disposable targets only, repeat
  object/ref readback, two-claimer expected-old-head, stale/ABA rejection,
  publication fence + readback, and VERIFIED/NOT_APPLIED/UNKNOWN
  classification through the provider primitives. Local temp-repo results do
  not substitute for this step.
- N6 Release policy: resolve the canonical current release-policy manifest
  from the distribution authority, verify minimum floor and revocation state
  for the exact candidate, and read back currentness. Stale/ambiguous policy
  blocks use.
- N7 Authority/currentness: verify the bound caller authority channel (or
  explicitly authorized durable successor) with exact issuer/locator/content/
  currentness/action/effect proof, and positively read back the canonical
  current-result authority before any forward use.
- N8 Repair-write fence readiness (observation only, no consumer mutation):
  prove current-authority/current-generation/current-candidate can be
  revalidated at write time against a concurrent revoke/reclaim/candidate
  change on a disposable target. No consumer write occurs in M01.
- N9 Context-source inventory: for each category — explicit assignment/prompt,
  project files/knowledge + connected retrieval, conversation/history,
  memory/personal-context, system/developer/project instructions,
  connector/app injection, host retrieval/recommendation/caches, any other
  automatic injection — prove sibling-result exclusion or reliable exposure
  detection. Any newly introduced, unobservable, or unclassified source stales
  affected qualification. Disposition per category today: UNKNOWN (BLOCKED).
- N10 Metadata channels: enumerate every coordinator-visible channel exposed
  on the account/device (branch/ref, commit message, output name/path,
  claim/provenance fields, receipts, plus any newly discovered channel) and
  run the Q7/Q10 negative leak fixture on each; deterministic
  rejection/non-admission is required before coordinator semantic exposure.
- N11 Owner setup disposition: obtain the durable exact-candidate/setup
  disposition ACCEPTABLE, UNACCEPTABLE, or UNKNOWN. UNACCEPTABLE = FAIL;
  UNKNOWN = BLOCKED. Blanket permission is never requested.

## Stop / reroute

- Any step lacking P0–P4 is BLOCKED; record the missing input as the blocker.
- Any violated technical predicate is FAIL with exact evidence.
- Fabricating owner ACCEPTABLE, claiming a compliant path exists, inferring
  native PASS from local checks, or running behavioral inference outside the
  guarded realization is forbidden.
- On completion, hand exact observations to the next Execution Prep step so it
  can bind real targets/authorization/currentness/readbacks after this kit is
  reviewed.
