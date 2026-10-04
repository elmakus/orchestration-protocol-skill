#!/usr/bin/env node
/**
 * check-csprng.mjs — narrow helper identity/probe + qualified-source local
 * CSPRNG test path (non-inference, local host only).
 *
 * - Audits Node's actual cryptographic source (node:crypto.randomBytes).
 * - Requires a fresh 128-bit random component for simulated claims.
 * - Rejects weak/predictable/unavailable-source fixtures before simulated claim.
 * - Excludes random output from deterministic-byte equality assertions
 *   (asserts only shape/source/length/policy, never exact random bytes).
 * - Nothing here qualifies Android execution or RNG availability.
 */
import {
  auditCryptoSource,
  validateClaimMetadata,
  generateAttemptNonceHex,
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

// Fresh nonce: shape only (deterministic assertion on policy, not on bytes).
const n1 = generateAttemptNonceHex();
const n2 = generateAttemptNonceHex();
check('nonce-shape-32hex', /^[0-9a-f]{32}$/.test(n1), 'fresh nonce is 32 hex chars');
check('nonce-freshness-distinct', n1 !== n2, 'two fresh nonces differ (excluded from byte-equality)');

// Good claim admitted.
const good = validateClaimMetadata({
  unit_id: 'probe-unit-001',
  claim_generation: 0,
  attempt_nonce_hex: n1,
  nonce_source: QUALIFIED_LOCAL_CSPRNG,
  expected_head: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
});
check('good-claim-admissible', good.verdict === 'ADMISSIBLE', JSON.stringify(good));

// Weak/predictable/unavailable fixtures rejected/blocked before simulated claim.
const weakCases = [
  ['weak-flag', { unit_id: 'probe-unit-001', claim_generation: 0, attempt_nonce_hex: n1, nonce_source: QUALIFIED_LOCAL_CSPRNG, weak_source: true }],
  ['predictable-flag', { unit_id: 'probe-unit-001', claim_generation: 0, attempt_nonce_hex: n1, nonce_source: QUALIFIED_LOCAL_CSPRNG, predictable: true }],
  ['short-nonce', { unit_id: 'probe-unit-001', claim_generation: 0, attempt_nonce_hex: 'abc123', nonce_source: QUALIFIED_LOCAL_CSPRNG }],
  ['constant-nonce-unqualified-source', { unit_id: 'probe-unit-001', claim_generation: 0, attempt_nonce_hex: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', nonce_source: 'timestamp/counter/unqualified' }],
  ['math-random-label', { unit_id: 'probe-unit-001', claim_generation: 0, attempt_nonce_hex: n1, nonce_source: 'Math.random/unqualified' }],
];
for (const [name, input] of weakCases) {
  const r = validateClaimMetadata(input);
  check(`reject-${name}`, r.verdict === 'REJECTED', JSON.stringify(r));
}
const unavailable = validateClaimMetadata({ unit_id: 'probe-unit-001', claim_generation: 0, rng_unavailable: true });
check('block-rng-unavailable', unavailable.verdict === 'BLOCKED', JSON.stringify(unavailable));

if (failures > 0) {
  console.error(`CSPRNG CHECKS: ${failures} failure(s)`);
  process.exit(1);
}
console.log('CSPRNG CHECKS: all local predicates hold (local host only; native RNG BLOCKED)');
