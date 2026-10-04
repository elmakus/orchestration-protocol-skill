#!/usr/bin/env node
/**
 * check-csprng.mjs — narrow helper identity/probe + qualified-source local
 * CSPRNG test path (non-inference, local host only).
 *
 * Honesty rule: a caller-supplied nonce_source label is not proof of
 * cryptographic origin, and no entropy is inferred from a nonce value.
 * Simulated claim authority comes only from the audited in-session issuance
 * path (issueAttemptNonce through node:crypto.randomBytes + registry
 * presentation). Shape admission (validateClaimMetadata) alone grants no
 * simulated claim authority. Random output is excluded from
 * deterministic-byte equality assertions (shape/issuance/policy only).
 * Nothing here qualifies Android execution or RNG availability.
 */
import {
  auditCryptoSource,
  validateClaimMetadata,
  createNonceRegistry,
  issueAttemptNonce,
  authorizeLocalSimulatedClaim,
  QUALIFIED_LOCAL_CSPRNG,
} from '../probe-package/scripts/op-helper.mjs';

let failures = 0;
function check(name, cond, detail = '') {
  console.log(`${cond ? 'PASS' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`);
  if (!cond) failures++;
}

const audit = auditCryptoSource();
console.log(JSON.stringify({ audit }, null, 2));
check('csprng-source-available', audit.available === true && audit.probe_16_bytes_ok === true);
check('csprng-source-qualified-local-only', audit.qualified_local_source === QUALIFIED_LOCAL_CSPRNG);

// Audited issuance path: two fresh nonces, shape only (never exact bytes).
const reg = createNonceRegistry();
const i1 = issueAttemptNonce(reg);
const i2 = issueAttemptNonce(reg);
check('issue-ok', i1.ok === true && i2.ok === true);
check('nonce-shape-32hex', /^[0-9a-f]{32}$/.test(i1.nonce_hex || ''), 'issued nonce is 32 hex chars');
check('nonce-freshness-distinct', (i1.nonce_hex || '') !== (i2.nonce_hex || ''), 'two issued nonces differ (excluded from byte-equality)');

// Issued nonce acquires simulated claim authority through the issuance path.
const good = authorizeLocalSimulatedClaim(
  {
    unit_id: 'probe-unit-001',
    claim_generation: 0,
    attempt_nonce_hex: i1.nonce_hex,
    nonce_source: QUALIFIED_LOCAL_CSPRNG,
    expected_head: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  },
  reg,
);
check('issued-claim-authorized', good.verdict === 'ADMISSIBLE' && good.code === 'SIM_CLAIM_OK', JSON.stringify(good));

// Self-labelled predictable fixture: shape check alone admits the labelled
// value, but the authority gate must refuse it simulated claim authority.
const predictableHex = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const shapeOnly = validateClaimMetadata({
  unit_id: 'probe-unit-001',
  claim_generation: 0,
  attempt_nonce_hex: predictableHex,
  nonce_source: QUALIFIED_LOCAL_CSPRNG,
});
const authority = authorizeLocalSimulatedClaim(
  {
    unit_id: 'probe-unit-001',
    claim_generation: 0,
    attempt_nonce_hex: predictableHex,
    nonce_source: QUALIFIED_LOCAL_CSPRNG,
  },
  reg,
);
check('self-labelled-shape-admits-value-only', shapeOnly.verdict === 'ADMISSIBLE', JSON.stringify(shapeOnly));
check(
  'self-labelled-acquires-no-authority',
  authority.verdict === 'REJECTED' && authority.code === 'NONCE_ORIGIN_UNPROVEN',
  JSON.stringify(authority),
);

// Foreign/empty registry presentation also acquires nothing.
const foreign = authorizeLocalSimulatedClaim(
  {
    unit_id: 'probe-unit-001',
    claim_generation: 0,
    attempt_nonce_hex: i2.nonce_hex,
    nonce_source: QUALIFIED_LOCAL_CSPRNG,
  },
  createNonceRegistry(),
);
check('foreign-registry-acquires-no-authority', foreign.verdict === 'REJECTED', JSON.stringify(foreign));

// Weak/predictable/unavailable shape fixtures rejected/blocked before any authority check.
const weakCases = [
  ['weak-flag', { unit_id: 'probe-unit-001', claim_generation: 0, attempt_nonce_hex: i1.nonce_hex, nonce_source: QUALIFIED_LOCAL_CSPRNG, weak_source: true }],
  ['predictable-flag', { unit_id: 'probe-unit-001', claim_generation: 0, attempt_nonce_hex: i1.nonce_hex, nonce_source: QUALIFIED_LOCAL_CSPRNG, predictable: true }],
  ['short-nonce', { unit_id: 'probe-unit-001', claim_generation: 0, attempt_nonce_hex: 'abc123', nonce_source: QUALIFIED_LOCAL_CSPRNG }],
  ['unqualified-source', { unit_id: 'probe-unit-001', claim_generation: 0, attempt_nonce_hex: i1.nonce_hex, nonce_source: 'Math.random/unqualified' }],
];
for (const [name, input] of weakCases) {
  const r = authorizeLocalSimulatedClaim(input, reg);
  check(`reject-${name}`, r.verdict === 'REJECTED', JSON.stringify(r));
}
const unavailable = authorizeLocalSimulatedClaim(
  { unit_id: 'probe-unit-001', claim_generation: 0, rng_unavailable: true },
  reg,
);
check('block-rng-unavailable', unavailable.verdict === 'BLOCKED', JSON.stringify(unavailable));

// Generator failure path: injected failure authorizes nothing and mints nothing.
const regSizeBefore = reg.issued.size;
const simFail = issueAttemptNonce(reg, { simulateFailure: true });
check('failure-path-blocked', simFail.ok === false, JSON.stringify(simFail));
check('failure-path-mints-nothing', reg.issued.size === regSizeBefore, `registry size ${reg.issued.size}`);

if (failures > 0) {
  console.error(`CSPRNG CHECKS: ${failures} failure(s)`);
  process.exit(1);
}
console.log('CSPRNG CHECKS: issued authority only; self-labelled values acquire nothing (local host only; native RNG BLOCKED)');
