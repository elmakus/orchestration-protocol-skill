#!/usr/bin/env node
/**
 * check-identities.mjs — reproducible content-identity checks (non-inference).
 *
 * Two separate detached identity records (distinct roles, never conflated):
 *
 *  A. Package identity (fixtures/FIXTURE_MANIFEST.json): sha256 over raw
 *     file bytes of the probe package content, plus package =
 *     sha256(sorted path:digest lines) over declared PACKAGE_INPUTS only.
 *  B. Fixture/oracle/harness-set identity (fixtures/ORACLE_MANIFEST.json):
 *     sha256 over raw bytes of the frozen fixture/oracle/harness files,
 *     plus oracle_identity = sha256(sorted path:digest lines) over declared
 *     ORACLE_INPUTS only.
 *
 *  C. Helper linkage: probe-package/HELPER_IDENTITY.json (itself an ORACLE
 *     input, i.e. its bytes are frozen) must additionally satisfy content
 *     linkage — its sha256_observed equals the actual helper file digest
 *     and its helper_api equals the helper source HELPER_API_VERSION.
 *     A byte-identical copy of a tampered observation therefore still fails.
 *
 * Acyclic exclusions (frozen): each manifest excludes itself and the other
 * manifest, all *.md observations, the evidence file, and .git state. No
 * source file contains its own asserted digest.
 *
 * Freeze discipline: --write-manifest / --write-oracles are freeze actions
 * only (run when sources intentionally change, then re-record evidence).
 * Default verify mode NEVER regenerates a manifest to pass: any mismatch
 * (fixture, harness, or helper-observation tampering) exits non-zero.
 * Tamper detection in disposable copies is exercised by check-tamper.sh.
 *
 * Usage:
 *   node checks/check-identities.mjs [--write-manifest] [--write-oracles]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PACKAGE_MANIFEST = join(root, 'fixtures', 'FIXTURE_MANIFEST.json');
const ORACLE_MANIFEST = join(root, 'fixtures', 'ORACLE_MANIFEST.json');
const HELPER_REL = 'probe-package/scripts/op-helper.mjs';
const HELPER_OBS_REL = 'probe-package/HELPER_IDENTITY.json';

const PACKAGE_INPUTS = [
  'probe-package/plugin.json',
  'probe-package/skills/orchestration-protocol-probe/SKILL.md',
  HELPER_REL,
];

const ORACLE_INPUTS = [
  'fixtures/negative-metadata-corpus.json',
  'fixtures/claim-fixtures.json',
  'fixtures/csprng-policy.json',
  'checks/check-identities.mjs',
  'checks/check-csprng.mjs',
  'checks/check-metadata-leak.mjs',
  'checks/check-git-fencing.sh',
  'checks/check-tamper.sh',
  'checks/run-all.sh',
  HELPER_OBS_REL,
];

function shaFile(p) {
  return createHash('sha256').update(readFileSync(p)).digest('hex');
}

function digestSet(inputs) {
  const perFile = {};
  for (const rel of inputs) {
    const abs = join(root, rel);
    if (!existsSync(abs)) {
      console.error(`MISSING: ${rel}`);
      process.exit(1);
    }
    perFile[rel] = shaFile(abs);
  }
  const lines = Object.keys(perFile).sort().map((k) => `${k}:${perFile[k]}`).join('\n');
  return { perFile, identity: createHash('sha256').update(lines, 'utf8').digest('hex') };
}

function helperApiFromSource() {
  const src = readFileSync(join(root, HELPER_REL), 'utf8');
  const m = src.match(/HELPER_API_VERSION\s*=\s*'([^']+)'/);
  if (!m) {
    console.error('HELPER API VERSION NOT FOUND in helper source');
    process.exit(1);
  }
  return m[1];
}

const pkg = digestSet(PACKAGE_INPUTS);
const oracle = digestSet(ORACLE_INPUTS);

const packageManifest = {
  role: 'detached package-content identity record (test-only)',
  algorithm: 'sha256(file bytes); package = sha256(sorted path:digest lines)',
  inputs: PACKAGE_INPUTS,
  exclusions: [
    'fixtures/ORACLE_MANIFEST.json (separate fixture-set identity, never conflated)',
    'HELPER_IDENTITY.json (detached helper observation; content-linked, not digested here)',
    'fixtures/*.json oracle inputs (bound by ORACLE_MANIFEST.json)',
    'checks/* harness code (bound by ORACLE_MANIFEST.json)',
    'PACKAGE_OBSERVATIONS.md / CAPABILITY_MATRIX.md / NATIVE_PROCEDURE.md / TEST_ENVELOPE.md / README.md',
    'evidence file implementation/workstreams/op-skill-v1/evidence/M01-T01_IMPLEMENTATION.md',
    '.git state',
  ],
  per_file_sha256: pkg.perFile,
  package_identity_sha256: pkg.identity,
  note: 'Reproducible: identical explicit inputs yield byte-identical output. Manifest itself is excluded from digested inputs (acyclic).',
};

const oracleManifest = {
  role: 'detached frozen fixture/oracle/harness-set identity record (test-only)',
  algorithm: 'sha256(file bytes); oracle_identity = sha256(sorted path:digest lines)',
  inputs: ORACLE_INPUTS,
  exclusions: [
    'fixtures/FIXTURE_MANIFEST.json (separate package-content identity, never conflated)',
    'this ORACLE_MANIFEST.json itself (acyclic)',
    'probe-package/* shipped content (bound by FIXTURE_MANIFEST.json)',
    'PACKAGE_OBSERVATIONS.md / CAPABILITY_MATRIX.md / NATIVE_PROCEDURE.md / TEST_ENVELOPE.md / README.md',
    'evidence file implementation/workstreams/op-skill-v1/evidence/M01-T01_IMPLEMENTATION.md',
    '.git state',
  ],
  per_file_sha256: oracle.perFile,
  oracle_identity_sha256: oracle.identity,
  note: 'Freezes the exact oracle/harness set the checks ran against. Verify mode detects fixture, harness, and helper-observation tampering without regenerating.',
};

if (process.argv.includes('--write-manifest')) {
  writeFileSync(PACKAGE_MANIFEST, JSON.stringify(packageManifest, null, 2) + '\n');
  console.log(`wrote ${PACKAGE_MANIFEST}`);
}
if (process.argv.includes('--write-oracles')) {
  writeFileSync(ORACLE_MANIFEST, JSON.stringify(oracleManifest, null, 2) + '\n');
  console.log(`wrote ${ORACLE_MANIFEST}`);
}

if (!process.argv.includes('--write-manifest') && !process.argv.includes('--write-oracles')) {
  let failures = 0;
  if (!existsSync(PACKAGE_MANIFEST)) {
    console.error('PACKAGE MANIFEST MISSING — freeze action required');
    failures++;
  } else {
    const recorded = JSON.parse(readFileSync(PACKAGE_MANIFEST, 'utf8'));
    const ok =
      JSON.stringify(recorded.per_file_sha256) === JSON.stringify(pkg.perFile) &&
      recorded.package_identity_sha256 === pkg.identity;
    console.log(JSON.stringify({ package: pkg.perFile, package_identity_sha256: pkg.identity }, null, 2));
    console.log(ok ? 'PACKAGE IDENTITIES VERIFIED' : 'PACKAGE IDENTITY MISMATCH vs recorded manifest');
    if (!ok) failures++;
  }
  if (!existsSync(ORACLE_MANIFEST)) {
    console.error('ORACLE MANIFEST MISSING — freeze action required');
    failures++;
  } else {
    const recorded = JSON.parse(readFileSync(ORACLE_MANIFEST, 'utf8'));
    const ok =
      JSON.stringify(recorded.per_file_sha256) === JSON.stringify(oracle.perFile) &&
      recorded.oracle_identity_sha256 === oracle.identity;
    console.log(JSON.stringify({ oracle_set: oracle.perFile, oracle_identity_sha256: oracle.identity }, null, 2));
    console.log(ok ? 'ORACLE-SET IDENTITIES VERIFIED' : 'ORACLE-SET MISMATCH vs recorded manifest (fixture/harness tampering?)');
    if (!ok) failures++;
  }
  // Helper linkage: detached observation content must match the actual helper.
  const obs = JSON.parse(readFileSync(join(root, HELPER_OBS_REL), 'utf8'));
  const actualHelperSha = pkg.perFile[HELPER_REL];
  const actualApi = helperApiFromSource();
  const shaOk = obs.sha256_observed === actualHelperSha;
  const apiOk = obs.helper_api === actualApi;
  console.log(JSON.stringify({ helper_linkage: { sha256_observed: obs.sha256_observed, actual: actualHelperSha, sha_ok: shaOk, api_observed: obs.helper_api, api_actual: actualApi, api_ok: apiOk } }));
  console.log(shaOk && apiOk ? 'HELPER LINKAGE VERIFIED (digest+API)' : 'HELPER LINKAGE MISMATCH (observation does not match helper artifact)');
  if (!(shaOk && apiOk)) failures++;
  if (failures > 0) {
    console.error(`IDENTITY VERIFICATION: ${failures} failure(s) — manifests are never regenerated to pass`);
    process.exit(1);
  }
  console.log('IDENTITIES VERIFIED: package, oracle set, and helper linkage byte-identical for identical explicit inputs');
}
