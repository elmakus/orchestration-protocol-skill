#!/usr/bin/env node
/**
 * op-helper.mjs — M01-T01 bounded mechanical helper (TEST-ONLY probe helper).
 *
 * Plain ESM, Node standard library only (node:crypto). No third-party
 * dependencies, no build step, no network, no GitHub, no consumer effects,
 * no scheduling, no semantic findings, no authority decisions, no credential
 * handling.
 *
 * Allowed duties (mechanical/deterministic only):
 *  - probe identity/schema compatibility (structural checks on supplied inputs)
 *  - validate schemas/IDs/paths/branch rules
 *  - deterministic allocation planning from exact snapshots (pure function)
 *  - validate supplied claim metadata/nonces (shape + declared source class)
 *  - validate Git ancestry from already-fetched objects (pure list validation)
 *  - validate expected-head preconditions (equality predicate)
 *  - canonical sorting/serialization
 *  - deterministic bounded context packs (derivative, identity-bound)
 *  - narrow CSPRNG nonce generation (fresh 128-bit random component only)
 *
 * Forbidden duties (never implemented here; requests fail closed):
 *  network/GitHub access, external writes, scheduling, semantic conclusions,
 *  severity/dedup, repair scope, workflow ownership, credential storage,
 *  blind retry of ambiguous writes, weak/degraded RNG fallback.
 *
 * CSPRNG policy: fresh attempt_nonce random component MUST be >=128 bits from
 * a qualified CSPRNG. On this local host the qualified source is
 * node:crypto.randomBytes (audited in auditCryptoSource()). Timestamp,
 * counter, model text, Math.random, or predictable sources are rejected.
 * Unavailable/invalid CSPRNG prohibits claim creation (fail closed).
 */

import { randomBytes, createHash } from 'node:crypto';

export const HELPER_API_VERSION = '0.1.0-testonly';
export const NONCE_BYTES_REQUIRED = 16; // 128 bits
export const QUALIFIED_LOCAL_CSPRNG = 'node:crypto.randomBytes/qualified-local-only';

/* ---------- canonical serialization ---------- */

export function canonicalStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalStringify).join(',')}]`;
  const keys = Object.keys(value).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${canonicalStringify(value[k])}`).join(',')}}`;
}

export function sha256HexOfString(s) {
  return createHash('sha256').update(s, 'utf8').digest('hex');
}

export function sha256HexOfCanonical(value) {
  return sha256HexOfString(canonicalStringify(value));
}

/* ---------- source audit ---------- */

export function auditCryptoSource() {
  // Audit the actual local cryptographic source path used by this helper.
  // Returns a mechanical observation, never a native qualification claim.
  const hasRandomBytes = typeof randomBytes === 'function';
  let probeOk = false;
  let probeBytes = 0;
  try {
    const p = randomBytes(16);
    probeOk = p instanceof Uint8Array && p.length === 16;
    probeBytes = p.length;
  } catch {
    probeOk = false;
  }
  return {
    helper_api: HELPER_API_VERSION,
    node_version: process.version,
    crypto_module: 'node:crypto',
    function: 'randomBytes',
    available: hasRandomBytes,
    probe_16_bytes_ok: probeOk,
    probe_bytes: probeBytes,
    qualified_local_source: hasRandomBytes && probeOk ? QUALIFIED_LOCAL_CSPRNG : null,
    note: 'Local-host observation only. Does not qualify Android/native RNG availability.',
  };
}

/* ---------- validators ---------- */

const HEX40 = /^[0-9a-f]{40}$/;
const HEX64 = /^[0-9a-f]{64}$/;
const UNIT_ID = /^[a-z0-9][a-z0-9-]{0,63}$/;
const BRANCH_RULE = /^(?!.*\.\.)(?!.*\s)(?!.*~)(?!.*\^)(?!.*:)(?!.*\?)(?!.*\*)(?!.*\[)[A-Za-z0-9][A-Za-z0-9/._-]{0,127}$/;

export function validateNonceHex(nonceHex, declaredSource) {
  if (typeof nonceHex !== 'string' || !/^[0-9a-f]{32,}$/.test(nonceHex)) {
    return { verdict: 'REJECTED', code: 'NONCE_MALFORMED' };
  }
  if (nonceHex.length < 32) {
    return { verdict: 'REJECTED', code: 'NONCE_TOO_SHORT' };
  }
  if (declaredSource !== QUALIFIED_LOCAL_CSPRNG) {
    return { verdict: 'REJECTED', code: 'NONCE_SOURCE_UNQUALIFIED' };
  }
  return { verdict: 'ADMISSIBLE', code: 'NONCE_OK' };
}

export function validateClaimMetadata(input) {
  if (!input || typeof input !== 'object') return { verdict: 'REJECTED', code: 'CLAIM_MALFORMED' };
  const { unit_id, claim_generation, attempt_nonce_hex, nonce_source } = input;
  if (typeof unit_id !== 'string' || !UNIT_ID.test(unit_id)) {
    return { verdict: 'REJECTED', code: 'CLAIM_UNIT_ID' };
  }
  if (!Number.isInteger(claim_generation) || claim_generation < 0) {
    return { verdict: 'REJECTED', code: 'CLAIM_GENERATION' };
  }
  // Reject weak/predictable/unavailable fixtures before any simulated claim.
  if (input.weak_source === true || input.predictable === true) {
    return { verdict: 'REJECTED', code: 'CLAIM_WEAK_SOURCE' };
  }
  if (input.rng_unavailable === true || attempt_nonce_hex == null) {
    return { verdict: 'BLOCKED', code: 'CLAIM_RNG_UNAVAILABLE' };
  }
  const n = validateNonceHex(attempt_nonce_hex, nonce_source);
  if (n.verdict !== 'ADMISSIBLE') return { verdict: n.verdict, code: n.code };
  if (typeof input.expected_head !== 'undefined') {
    if (typeof input.expected_head !== 'string' || !HEX40.test(input.expected_head)) {
      return { verdict: 'REJECTED', code: 'CLAIM_EXPECTED_HEAD' };
    }
  }
  return { verdict: 'ADMISSIBLE', code: 'CLAIM_OK' };
}

export function validateExpectedHead(expected, actual) {
  if (typeof expected !== 'string' || typeof actual !== 'string') {
    return { verdict: 'REJECTED', code: 'HEAD_MALFORMED' };
  }
  if (!HEX40.test(expected) || !HEX40.test(actual)) {
    return { verdict: 'REJECTED', code: 'HEAD_NOT_HEX40' };
  }
  if (expected === actual) return { verdict: 'ADMISSIBLE', code: 'HEAD_MATCH' };
  return { verdict: 'REJECTED', code: 'HEAD_MISMATCH' };
}

export function validateBranchName(name) {
  if (typeof name !== 'string' || !BRANCH_RULE.test(name) || name.includes('//')) {
    return { verdict: 'REJECTED', code: 'BRANCH_RULE' };
  }
  if (name.endsWith('/') || name.endsWith('.lock') || name.startsWith('-')) {
    return { verdict: 'REJECTED', code: 'BRANCH_RULE' };
  }
  // Pre-integration semantic opacity: disposition/finding/severity tokens
  // MUST NOT be encoded in coordinator-visible branch names. Mechanical
  // names (unit/run/generation/nonce/commit ids) remain admissible.
  const tokens = name.split(/[\/_\-.]+/);
  for (const t of tokens) {
    if (/^(green|red|finding|findings|severity|critical|blocking|blocked|vuln|vulnerability|exploit|escalate|pass|fail)$/i.test(t)) {
      return { verdict: 'REJECTED', code: 'META_SEMANTIC_VALUE' };
    }
  }
  return { verdict: 'ADMISSIBLE', code: 'BRANCH_OK' };
}

export function validateOutputPath(p) {
  if (typeof p !== 'string' || p.length === 0 || p.length > 256) {
    return { verdict: 'REJECTED', code: 'PATH_RULE' };
  }
  if (p.startsWith('/') || p.includes('..') || p.includes('\\')) {
    return { verdict: 'REJECTED', code: 'PATH_RULE' };
  }
  if (!/^[A-Za-z0-9][A-Za-z0-9/._-]*$/.test(p)) return { verdict: 'REJECTED', code: 'PATH_RULE' };
  return { verdict: 'ADMISSIBLE', code: 'PATH_OK' };
}

export function validateGitAncestry(suppliedHeads) {
  // Pure validation of an already-fetched ancestry list. No fetching here.
  if (!Array.isArray(suppliedHeads) || suppliedHeads.length === 0) {
    return { verdict: 'REJECTED', code: 'ANCESTRY_EMPTY' };
  }
  for (const h of suppliedHeads) {
    if (typeof h !== 'string' || !HEX40.test(h)) return { verdict: 'REJECTED', code: 'ANCESTRY_HEAD' };
  }
  const dup = new Set(suppliedHeads);
  if (dup.size !== suppliedHeads.length) return { verdict: 'REJECTED', code: 'ANCESTRY_DUP' };
  return { verdict: 'ADMISSIBLE', code: 'ANCESTRY_OK' };
}

/* Closed, semantic-free coordinator metadata grammar (mechanical fields only).
 * Any semantic finding/disposition/conclusion text is rejected before
 * coordinator consumption. Diagnostics never echo payload contents. */
const META_ALLOW = {
  assignment_id: UNIT_ID,
  unit_id: UNIT_ID,
  run_id: /^[A-Za-z0-9][A-Za-z0-9-]{0,63}$/,
  package_id: /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/,
  release_id: /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/,
  subject_id: /^[A-Za-z0-9][A-Za-z0-9._:-]{0,255}$/,
  claim_generation: null, // integer >= 0 checked separately
  attempt_nonce_id: /^[0-9a-f]{8,128}$/,
  commit: HEX40,
  blob: /^[0-9a-f]{40}$/,
  output_path: null, // checked via validateOutputPath
  receipt_state: /^(COMPLETE|BLOCKED|EXHAUSTED)$/,
  readback: /^(VERIFIED|NOT_APPLIED|UNKNOWN)$/,
};

const SEMANTIC_KEYS = [
  'finding', 'findings', 'severity', 'disposition', 'conclusion', 'conclusions',
  'summary', 'blocker_text', 'semantic', 'verdict_text',
];

const SEMANTIC_VALUE_HINT = /(GREEN|RED|CRITICAL|HIGH SEVERITY|BLOCKING FINDING|VULNERAB|EXPLOIT|SECRET|PASSWORD)/i;

export function validateCoordinatorMetadata(record) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    return { verdict: 'REJECTED', code: 'META_MALFORMED' };
  }
  for (const k of SEMANTIC_KEYS) {
    if (k in record) return { verdict: 'REJECTED', code: 'META_SEMANTIC_KEY' };
  }
  for (const [k, v] of Object.entries(record)) {
    if (!(k in META_ALLOW)) return { verdict: 'REJECTED', code: 'META_UNKNOWN_CHANNEL' };
    if (k === 'claim_generation') {
      if (!Number.isInteger(v) || v < 0) return { verdict: 'REJECTED', code: 'META_FIELD' };
      continue;
    }
    if (k === 'output_path') {
      const r = validateOutputPath(v);
      if (r.verdict !== 'ADMISSIBLE') return { verdict: 'REJECTED', code: 'META_FIELD' };
      continue;
    }
    const re = META_ALLOW[k];
    if (typeof v !== 'string' || !re.test(v)) return { verdict: 'REJECTED', code: 'META_FIELD' };
  }
  // Free-form string scan: any value carrying semantic conclusion hints is rejected.
  for (const v of Object.values(record)) {
    if (typeof v === 'string' && SEMANTIC_VALUE_HINT.test(v)) {
      return { verdict: 'REJECTED', code: 'META_SEMANTIC_VALUE' };
    }
  }
  return { verdict: 'ADMISSIBLE', code: 'META_OK' };
}

/* Deterministic allocation planning from an exact snapshot (pure). */
export function planAllocation(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') return { verdict: 'REJECTED', code: 'ALLOC_MALFORMED' };
  const units = snapshot.units;
  if (!Array.isArray(units) || units.length === 0) return { verdict: 'REJECTED', code: 'ALLOC_EMPTY' };
  if (units.length > 64) return { verdict: 'REJECTED', code: 'ALLOC_BOUND' };
  const seen = new Set();
  for (const u of units) {
    if (!u || typeof u.unit_id !== 'string' || !UNIT_ID.test(u.unit_id)) {
      return { verdict: 'REJECTED', code: 'ALLOC_UNIT_ID' };
    }
    if (seen.has(u.unit_id)) return { verdict: 'REJECTED', code: 'ALLOC_DUP' };
    seen.add(u.unit_id);
    if (!Number.isInteger(u.claim_generation) || u.claim_generation < 0) {
      return { verdict: 'REJECTED', code: 'ALLOC_GENERATION' };
    }
  }
  const ordered = [...units].sort((a, b) => (a.unit_id < b.unit_id ? -1 : 1));
  return { verdict: 'ADMISSIBLE', code: 'ALLOC_OK', order: ordered.map((u) => u.unit_id) };
}

/* Deterministic bounded context pack (derivative output, identity-bound). */
export function buildContextPack(input, maxBytes = 4096) {
  const s = canonicalStringify(input);
  if (s.length > maxBytes) return { verdict: 'REJECTED', code: 'PACK_BOUND' };
  return { verdict: 'ADMISSIBLE', code: 'PACK_OK', pack: s, digest: sha256HexOfString(s) };
}

/* Narrow CSPRNG generation: fresh 128-bit random component only. */
export function generateAttemptNonceHex() {
  return randomBytes(NONCE_BYTES_REQUIRED).toString('hex');
}

/* ---------- minimal CLI for local checks (no network, no side effects) ---------- */

function printHelp() {
  console.log(`op-helper ${HELPER_API_VERSION} (test-only)
usage:
  --help                       this text
  --audit-csprng               print local CSPRNG source audit (JSON)
  --new-nonce                  print fresh 32-hex-char nonce (random; excluded from deterministic assertions)
  --validate-claim <jsonFile>  validate supplied claim metadata (JSON file)
  --validate-head <exp> <act>  validate expected-head precondition
  --canonical <jsonFile>       print canonical serialization + sha256
`);
}

const args = process.argv.slice(2);
if (args.length > 0) {
  const { readFileSync } = await import('node:fs');
  const cmd = args[0];
  if (cmd === '--help' || cmd === '-h') {
    printHelp();
  } else if (cmd === '--audit-csprng') {
    console.log(JSON.stringify(auditCryptoSource(), null, 2));
  } else if (cmd === '--new-nonce') {
    console.log(generateAttemptNonceHex());
  } else if (cmd === '--validate-claim') {
    const obj = JSON.parse(readFileSync(args[1], 'utf8'));
    console.log(JSON.stringify(validateClaimMetadata(obj)));
  } else if (cmd === '--validate-head') {
    console.log(JSON.stringify(validateExpectedHead(args[1], args[2])));
  } else if (cmd === '--canonical') {
    const obj = JSON.parse(readFileSync(args[1], 'utf8'));
    const s = canonicalStringify(obj);
    console.log(s);
    console.log(sha256HexOfString(s));
  } else {
    console.error(`REJECTED: unknown command ${cmd}`);
    process.exit(2);
  }
}
