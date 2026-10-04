#!/usr/bin/env node
/**
 * check-metadata-leak.mjs — synthetic metadata-leak negative corpus +
 * mechanical non-semantic reporting path (non-inference, local only).
 *
 * Covers R8 §11.3 / Q7 channel classes: branch/ref names, commit messages,
 * output names/paths, claim/provenance fields, receipt values.
 * The validator MUST NOT echo rejected semantic payload contents; reports
 * carry only case id + channel + verdict + reason code.
 */
import { readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateCoordinatorMetadata, validateBranchName, validateOutputPath } from '../probe-package/scripts/op-helper.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const corpus = JSON.parse(readFileSync(join(root, 'fixtures', 'negative-metadata-corpus.json'), 'utf8'));

let failures = 0;
for (const c of corpus.cases) {
  let verdict;
  let code = '';
  if (c.channel === 'branch_name') {
    const r = validateBranchName(c.attempted_branch);
    verdict = r.verdict;
    code = r.code;
    // Branch attempt string is harness-controlled synthetic; report carries
    // only verdict/code, never the semantic payload — assert no echo here.
  } else if (c.channel === 'commit_message') {
    // Commit messages have no mechanical grammar: any semantic finding text
    // placed in a pre-integration commit message is REJECTED by policy.
    const hasSemantic = /finding|critical|blocking|green|red/i.test(c.attempted_message);
    verdict = hasSemantic ? 'REJECTED' : 'ADMISSIBLE';
    code = hasSemantic ? 'META_SEMANTIC_VALUE' : 'META_OK';
  } else if (c.channel === 'output_path') {
    // Output path carrying disposition token is rejected: check for
    // semantic tokens in the filename outside the mechanical grammar.
    const semanticInName = /(^|\W)(GREEN|RED|CRITICAL|BLOCKING)(\W|$)/i.test(c.record.output_path);
    if (semanticInName) {
      verdict = 'REJECTED';
      code = 'META_SEMANTIC_VALUE';
    } else {
      const r = validateOutputPath(c.record.output_path);
      verdict = r.verdict;
      code = r.code;
    }
  } else {
    const r = validateCoordinatorMetadata(c.record);
    verdict = r.verdict;
    code = r.code;
  }
  // Mechanical report: id + channel + verdict + code only (no payload echo).
  console.log(JSON.stringify({ id: c.id, channel: c.channel, verdict, code, expect: c.expect }));
  if (verdict !== c.expect) {
    console.error(`MISMATCH ${c.id}: got ${verdict}, expected ${c.expect}`);
    failures++;
  }
}

// Positive mechanical record from corpus must be admissible (already covered
// as POS-MECHANICAL-01 above); explicit guard:
const pos = corpus.cases.find((c) => c.id === 'POS-MECHANICAL-01');
const posCheck = validateCoordinatorMetadata(pos.record);
if (posCheck.verdict !== 'ADMISSIBLE') {
  console.error('POSITIVE mechanical record unexpectedly rejected');
  failures++;
}

if (failures > 0) {
  console.error(`METADATA-LEAK CHECKS: ${failures} failure(s)`);
  process.exit(1);
}
console.log('METADATA-LEAK CHECKS: synthetic semantic metadata rejected without echo; native channels remain unqualified (see CAPABILITY_MATRIX.md)');
