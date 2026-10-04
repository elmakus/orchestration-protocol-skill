#!/usr/bin/env node
/**
 * check-identities.mjs — reproducible content-identity check (non-inference).
 *
 * Digest algorithm: sha256 over raw file bytes (hex).
 * Package identity: sha256 over sorted "relative-path:digest" lines for the
 *   declared inputs only.
 *
 * Acyclic inputs/exclusions (frozen):
 *   INPUTS (package content): probe-package/plugin.json,
 *     probe-package/skills/orchestration-protocol-probe/SKILL.md,
 *     probe-package/scripts/op-helper.mjs
 *   EXCLUDED (detached observations, never digested into package identity):
 *     HELPER_IDENTITY.json, FIXTURE_MANIFEST.json, PACKAGE_OBSERVATIONS.md,
 *     CAPABILITY_MATRIX.md, NATIVE_PROCEDURE.md, TEST_ENVELOPE.md, README.md,
 *     checks/, fixtures/*.json (harness/test inputs, not shipped content),
 *     evidence file, any .git state.
 *
 * No source file contains its own asserted digest.
 * Usage: node checks/check-identities.mjs [--write-manifest]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const INPUTS = [
  'probe-package/plugin.json',
  'probe-package/skills/orchestration-protocol-probe/SKILL.md',
  'probe-package/scripts/op-helper.mjs',
];
const MANIFEST = join(root, 'fixtures', 'FIXTURE_MANIFEST.json');

function shaFile(p) {
  return createHash('sha256').update(readFileSync(p)).digest('hex');
}

const perFile = {};
for (const rel of INPUTS) {
  const abs = join(root, rel);
  if (!existsSync(abs)) {
    console.error(`MISSING: ${rel}`);
    process.exit(1);
  }
  perFile[rel] = shaFile(abs);
}
const lines = Object.keys(perFile).sort().map((k) => `${k}:${perFile[k]}`).join('\n');
const packageIdentity = createHash('sha256').update(lines, 'utf8').digest('hex');

const manifest = {
  role: 'detached frozen fixture/content identity record (test-only)',
  algorithm: 'sha256(file bytes); package = sha256(sorted path:digest lines)',
  inputs: INPUTS,
  exclusions: [
    'HELPER_IDENTITY.json (detached observation of helper digest)',
    'fixtures/*.json harness inputs',
    'checks/* harness code',
    'PACKAGE_OBSERVATIONS.md / CAPABILITY_MATRIX.md / NATIVE_PROCEDURE.md / TEST_ENVELOPE.md / README.md',
    'evidence file implementation/workstreams/op-skill-v1/evidence/M01-T01_IMPLEMENTATION.md',
    '.git state',
  ],
  per_file_sha256: perFile,
  package_identity_sha256: packageIdentity,
  note: 'Reproducible: identical explicit inputs yield byte-identical output. Manifest itself is excluded from digested inputs (acyclic).',
};

if (process.argv.includes('--write-manifest')) {
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`wrote ${MANIFEST}`);
} else {
  if (!existsSync(MANIFEST)) {
    console.error('MANIFEST MISSING — run with --write-manifest first');
    process.exit(1);
  }
  const recorded = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  const okFiles = JSON.stringify(recorded.per_file_sha256) === JSON.stringify(perFile);
  const okPkg = recorded.package_identity_sha256 === packageIdentity;
  console.log(JSON.stringify({ per_file: perFile, package_identity_sha256: packageIdentity }, null, 2));
  if (!okFiles || !okPkg) {
    console.error('IDENTITY MISMATCH vs recorded manifest');
    process.exit(1);
  }
  console.log('IDENTITIES VERIFIED: byte-identical for identical explicit inputs');
}
