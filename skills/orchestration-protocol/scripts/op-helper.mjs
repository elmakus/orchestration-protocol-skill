#!/usr/bin/env node
// op-helper.mjs — sole bundled mechanical helper (op-helper-api/1.0.0).
// Construction release 0.3.0-m03, draft, explicitly unqualified.
// Mechanical projection only: deterministic validation, canonicalization,
// allocation planning from exact snapshots, supplied ancestry/expected-head
// checks, bounded assignment context packs, and the narrow qualified-source
// nonce interface. No profile selection, semantic truth/severity/
// deduplication, repair-scope invention, authority minting, workflow
// ownership, or scheduling. No network, GitHub access, Git writes,
// subprocess scheduling, credential access, or external effects.
// Provider actions are explicit proposed manual/native procedures in the
// finite-claim-substrate owner, not an added backend.
// Structural checks here are never qualification, authenticity, or observed
// ancestry proof. Errors never echo unadmitted semantic input or unknown
// keys/values into coordinator-visible channels.
// Standard built-ins + package data only: node:fs, node:path,
// node:crypto, node:zlib, node:url. No dependencies, no build step.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const HELPER_NAME = "op-helper";
const HELPER_VERSION = "0.3.0-m03";
const HELPER_API = "op-helper-api/1.0.0";
const OP_CONTRACT = "1.0.0";
const RELEASE_ID = "orchestration-protocol-skill@0.3.0-m03";
const PACKAGE_ID = "orchestration-protocol-skill@0.3.0-m03";

const helperDir = path.dirname(fileURLToPath(import.meta.url));
const SK = path.resolve(helperDir, "..");
const ROOT = path.resolve(helperDir, "..", "..", "..");

// ---------- exit codes (documented, stable) ----------
// 0 success / valid / satisfied / VERIFIED
// 1 invalid / not-satisfied / NOT_APPLIED-shape (structural rejection)
// 2 BLOCKED / fail-closed (missing, ambiguous, unknown, stale,
//   unqualified source, unavailable objects, no authority)
// 3 usage error (bad args, unreadable file)
function emit(obj) {
  console.log(JSON.stringify(obj, null, 2));
}
function emitError(code, reason, field = null, extra = {}) {
  // Never echo supplied semantic values; name the mechanical field only.
  const out = {
    ok: false,
    helper: HELPER_NAME,
    helper_version: HELPER_VERSION,
    helper_api: HELPER_API,
    code,
    reason,
    qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION",
  };
  if (field) out.field = field;
  Object.assign(out, extra);
  console.log(JSON.stringify(out, null, 2));
}

// ---------- canonical serialization (contracts-and-versioning section 3) ----------
function canonicalize(v) {
  if (v === null || typeof v !== "object") {
    if (typeof v === "number" && !Number.isFinite(v)) throw new Error("non-finite number");
    return JSON.stringify(v);
  }
  if (Array.isArray(v)) return "[" + v.map(canonicalize).join(",") + "]";
  return "{" + Object.keys(v).sort().map((k) => JSON.stringify(k) + ":" + canonicalize(v[k])).join(",") + "}";
}
const digestOf = (v) => crypto.createHash("sha256").update(canonicalize(v), "utf8").digest("hex");
const sha256Bytes = (buf) => crypto.createHash("sha256").update(buf).digest("hex");
function semanticProjection(env) {
  const { return_id, run_envelope_id, ...rest } = env;
  return rest;
}
const runEnvelopeId = (env) => "runenv:" + digestOf(semanticProjection(env));
function slug(s) {
  return String(s).replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// ---------- closed identity grammars (evidence-and-sources section 6) ----------
const RE = {
  assign: /^assign:[0-9]{4}$/,
  unit: /^unit-[0-9]{2}$/,
  run: /^RUN-[0-9]{3}$/,
  nonceId: /^nonce:[0-9]{4}$/,
  attempt: /^attempt:RUN-[0-9]{3}:[0-9]{4}$/,
  hex40: /^[0-9a-f]{40}$/,
  hex32plus: /^[0-9a-f]{32,}$/,
  hex64: /^[0-9a-f]{64}$/,
  branch: /^op\/[A-Za-z0-9-]+\/[A-Za-z0-9-]+$/,
  ref: /^refs\/heads\/op\/[A-Za-z0-9-]+\/[A-Za-z0-9-]+$/,
  output: /^results\/[A-Za-z0-9-]+\.md$/,
  digestRef: /^(runenv|content|sha256):[0-9a-f]{64}$/,
  opId: /^op:[0-9]{4}$/,
  claimState: /^claim:unit-[0-9]{2}:gen[0-9]+:[a-z-]+$/,
  runenv: /^runenv:[0-9a-f]{64}$/,
  nonceSource: /^qualified-csprng-128$/,
};
const BLOCKER_CODES = new Set([
  "none",
  "missing:authority",
  "missing:evidence",
  "missing:provider-read",
  "missing:claim",
  "missing:generation",
  "unavailable:helper",
  "unavailable:native",
  "conflict:state",
  "conflict:binding",
]);
const POST_RE = /^(ref-points-at:[0-9a-f]{40}|no-write-performed|path-content-matches:[0-9a-f]{64})$/;

// ---------- bounded local validator (sanitized: never echoes values) ----------
const SUPPORTED = new Set([
  "$schema", "$id", "title", "version", "description",
  "normative_owner", "normative_co_owner", "defs", "$ref", "type", "required",
  "properties", "additionalProperties", "items", "enum", "const", "pattern",
  "minLength", "minimum", "minItems", "anyOf",
]);
function loadSchemas() {
  const dir = path.join(SK, "schemas");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const schemaFiles = {};
  for (const f of files) {
    const s = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    schemaFiles[s.$id] = s;
  }
  const allDefs = {};
  for (const [id, s] of Object.entries(schemaFiles)) {
    for (const [d, node] of Object.entries(s.defs || {})) {
      if (!allDefs[d]) allDefs[d] = { id, node };
    }
  }
  return { schemaFiles, allDefs };
}
function resolveRef(ref, baseId, schemaFiles) {
  const idx = ref.indexOf("#");
  const base = idx === -1 ? ref : ref.slice(0, idx);
  const ptr = idx === -1 ? "" : ref.slice(idx + 1);
  const target = base === "" ? schemaFiles[baseId] : schemaFiles[base];
  if (!target) return { error: "unresolvable ref base" };
  let node = target;
  if (ptr) {
    for (const seg of ptr.split("/").filter(Boolean)) {
      node = node[seg];
      if (node === undefined) return { error: "unresolvable pointer" };
    }
  }
  return { node, id: base === "" ? baseId : base };
}
function typeOk(t, v) {
  switch (t) {
    case "string": return typeof v === "string";
    case "integer": return Number.isInteger(v);
    case "number": return typeof v === "number" && Number.isFinite(v);
    case "boolean": return typeof v === "boolean";
    case "null": return v === null;
    case "object": return v !== null && typeof v === "object" && !Array.isArray(v);
    case "array": return Array.isArray(v);
    default: return false;
  }
}
// Sanitized: messages name the field path and rule only, never the value.
function validate(node, value, baseId, schemaFiles, where) {
  const errs = [];
  if (node.$ref !== undefined) {
    const r = resolveRef(node.$ref, baseId, schemaFiles);
    if (r.error) return [`${where}: unresolvable reference`];
    return validate(r.node, value, r.id, schemaFiles, where);
  }
  for (const k of Object.keys(node)) {
    if (!SUPPORTED.has(k)) errs.push(`${where}: unsupported validation keyword`);
  }
  if (node.type !== undefined) {
    const types = Array.isArray(node.type) ? node.type : [node.type];
    if (!types.some((t) => typeOk(t, value))) {
      errs.push(`${where}: type mismatch`);
      return errs;
    }
  }
  if (node.enum !== undefined && !node.enum.some((e) => Object.is(e, value))) errs.push(`${where}: value not in closed enum`);
  if (node.const !== undefined && !Object.is(node.const, value)) errs.push(`${where}: const mismatch`);
  if (node.pattern !== undefined && typeof value === "string") {
    let re;
    try { re = new RegExp(node.pattern); } catch { errs.push(`${where}: bad pattern in schema`); re = null; }
    if (re && !re.test(value)) errs.push(`${where}: pattern mismatch`);
  }
  if (node.minLength !== undefined && typeof value === "string" && value.length < node.minLength) errs.push(`${where}: too short`);
  if (node.minimum !== undefined && typeof value === "number" && value < node.minimum) errs.push(`${where}: below minimum`);
  if (node.minItems !== undefined && Array.isArray(value) && value.length < node.minItems) errs.push(`${where}: too few items`);
  if (node.required !== undefined && value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const k of node.required) if (value[k] === undefined) errs.push(`${where}: missing required field '${k}'`);
  }
  if (node.properties !== undefined && value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const [k, sub] of Object.entries(node.properties)) {
      if (value[k] !== undefined) errs.push(...validate(sub, value[k], baseId, schemaFiles, `${where}.${k}`));
    }
    if (node.additionalProperties === false) {
      for (const k of Object.keys(value)) {
        if (!Object.prototype.hasOwnProperty.call(node.properties, k)) errs.push(`${where}: additional property not in closed grammar`);
      }
    }
  }
  if (node.items !== undefined && Array.isArray(value)) {
    value.forEach((item, i) => errs.push(...validate(node.items, item, baseId, schemaFiles, `${where}[${i}]`)));
  }
  if (node.anyOf !== undefined) {
    const branchErrs = node.anyOf.map((sub) => validate(sub, value, baseId, schemaFiles, where));
    if (!branchErrs.some((e) => e.length === 0)) errs.push(`${where}: no closed alternative matched`);
  }
  return errs;
}
function readJSONFile(p) {
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw);
}
function resolveInput(p) {
  if (p === "-" || p === undefined) {
    const raw = fs.readFileSync(0, "utf8");
    return JSON.parse(raw);
  }
  return readJSONFile(p);
}

// ---------- shared binding helpers ----------
function requireCtx(ctx, fields) {
  return fields.filter((f) => ctx[f] === undefined).map((f) => `missing required binding context '${f}'`);
}
function checkFenceObject(fence) {
  // Returns { ok, blocked, reason }. Sanitized, no value echo.
  if (!fence || typeof fence !== "object" || Array.isArray(fence)) {
    return { ok: false, blocked: true, reason: "missing or malformed fence object" };
  }
  if (fence.fence_kind !== "expect-absent" && fence.fence_kind !== "expect-head") {
    return { ok: false, blocked: true, reason: "unknown fence kind" };
  }
  if (fence.readback !== "VERIFIED") {
    return { ok: false, blocked: true, reason: "fence requires VERIFIED readback" };
  }
  if (fence.fence_kind === "expect-absent") {
    if (fence.expected_head !== null && fence.expected_head !== undefined) {
      return { ok: false, blocked: false, reason: "expect-absent requires null expected head" };
    }
    const ap = fence.absence_proof;
    if (!ap || typeof ap !== "object" || ap.state !== "ABSENT" || ap.readback !== "VERIFIED" || typeof ap.proof_locator !== "string" || ap.proof_locator.length === 0) {
      return { ok: false, blocked: true, reason: "expect-absent requires positively verified ABSENT proof with locator" };
    }
    return { ok: true, blocked: false, reason: "expect-absent satisfied structurally" };
  }
  // expect-head
  if (typeof fence.expected_head !== "string" || !RE.hex40.test(fence.expected_head)) {
    return { ok: false, blocked: true, reason: "expect-head requires exact 40-hex head" };
  }
  if (fence.absence_proof !== null && fence.absence_proof !== undefined) {
    return { ok: false, blocked: false, reason: "expect-head requires null absence proof" };
  }
  return { ok: true, blocked: false, reason: "expect-head shape satisfied" };
}

// ---------- commands ----------
function cmdProbe() {
  emit({
    ok: true,
    helper: HELPER_NAME,
    helper_version: HELPER_VERSION,
    helper_api: HELPER_API,
    op_contract: OP_CONTRACT,
    release_id: RELEASE_ID,
    runtime: "node ESM, no dependencies, standard built-ins + package data only",
    capabilities: [
      "probe",
      "canonicalize",
      "digest",
      "validate-envelope",
      "validate-claim",
      "validate-publication",
      "validate-reclaim",
      "validate-metadata",
      "validate-receipt",
      "check-fence",
      "validate-ancestry",
      "plan-alloc",
      "context-pack",
      "validate-nonce",
      "issue-claim-nonce",
      "diagnose-csprng",
      "validate-operation",
    ],
    forbids: [
      "network",
      "github-access",
      "git-writes",
      "subprocess-scheduling",
      "credential-access",
      "external-effects",
      "semantic-decisions",
      "profile-selection",
      "scheduling",
      "blind-retry",
    ],
    limitations: [
      "Structural validation only; never qualification, authenticity, or observed-ancestry proof.",
      "Fresh-nonce issuance uses the host OS CSPRNG as an unqualified local candidate until independent release/host qualification is established; missing or invalid qualified source BLOCKS production.",
      "Ancestry is validated only from already-fetched identity-bound objects; the helper never fetches.",
      "Deterministic commands repeat on identical input; issue-claim-nonce and diagnose-csprng are explicitly excluded from identical-output assertions.",
      "Errors never echo unadmitted semantic input or unknown keys/values.",
    ],
    qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION",
    exit_codes: { 0: "success/valid/satisfied", 1: "invalid/not-satisfied", 2: "BLOCKED fail-closed", 3: "usage error" },
  });
  return 0;
}
function cmdCanonicalize(args) {
  const input = args._[0];
  if (!input) { emitError(3, "canonicalize requires <input.json> ('-' for stdin)"); return 3; }
  let v;
  try { v = resolveInput(input); } catch { emitError(3, "unreadable or malformed JSON input", "input"); return 3; }
  try {
    process.stdout.write(canonicalize(v) + "\n");
  } catch { emitError(1, "value cannot be canonically serialized", "input"); return 1; }
  return 0;
}
function cmdDigest(args) {
  const input = args._[0];
  if (!input) { emitError(3, "digest requires <input.json> ('-' for stdin)"); return 3; }
  let v;
  try { v = resolveInput(input); } catch { emitError(3, "unreadable or malformed JSON input", "input"); return 3; }
  try {
    emit({ ok: true, helper: HELPER_NAME, helper_api: HELPER_API, sha256: digestOf(v), qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION" });
  } catch { emitError(1, "value cannot be digested", "input"); return 1; }
  return 0;
}
function cmdValidateEnvelope(args) {
  const input = args._[0];
  if (!input) { emitError(3, "validate-envelope requires <envelope.json>"); return 3; }
  let schemas;
  try { schemas = loadSchemas(); } catch { emitError(2, "package schemas unavailable", "schemas"); return 2; }
  let doc;
  try { doc = resolveInput(input); } catch { emitError(3, "unreadable or malformed JSON input", "input"); return 3; }
  const rec = doc.run_envelope || doc;
  const def = schemas.allDefs["run_envelope"];
  if (!def) { emitError(2, "envelope grammar unavailable", "schemas"); return 2; }
  const errs = validate(def.node, rec, def.id, schemas.schemaFiles, "run_envelope");
  if (errs.length) { emitError(1, "envelope rejected", "run_envelope", { errors: errs.slice(0, 10) }); return 1; }
  // Redundant-identity + derived-identity verification (no silent override).
  if (rec.run_envelope_id) {
    let recomputed;
    try { recomputed = runEnvelopeId(rec); } catch { emitError(1, "envelope cannot be digested", "run_envelope"); return 1; }
    if (recomputed !== rec.run_envelope_id) { emitError(1, "supplied derived identity does not match recomputation", "run_envelope_id"); return 1; }
  }
  emit({ ok: true, helper: HELPER_NAME, helper_api: HELPER_API, valid: true, run_envelope_id: rec.run_envelope_id || runEnvelopeId(rec), qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION" });
  return 0;
}
function cmdValidateClaim(args) {
  const input = args._[0];
  const manifestPath = args["manifest"];
  if (!input) { emitError(3, "validate-claim requires <claim.json> --manifest <manifest.json>"); return 3; }
  if (!manifestPath) { emitError(2, "missing required binding context 'manifest'", "manifest"); return 2; }
  let schemas;
  try { schemas = loadSchemas(); } catch { emitError(2, "package schemas unavailable", "schemas"); return 2; }
  let doc, manifestDoc;
  try { doc = resolveInput(input); } catch { emitError(3, "unreadable or malformed JSON input", "input"); return 3; }
  try { manifestDoc = resolveInput(manifestPath); } catch { emitError(2, "unreadable manifest binding context", "manifest"); return 2; }
  const claim = doc.finite_claim || doc;
  const manifest = manifestDoc.finite_manifest || manifestDoc;
  const def = schemas.allDefs["finite_claim"];
  const mdef = schemas.allDefs["finite_manifest"];
  if (!def || !mdef) { emitError(2, "finite grammar unavailable", "schemas"); return 2; }
  const errs = validate(def.node, claim, def.id, schemas.schemaFiles, "finite_claim");
  if (errs.length) { emitError(1, "claim rejected", "finite_claim", { errors: errs.slice(0, 10) }); return 1; }
  const merrs = validate(mdef.node, manifest, mdef.id, schemas.schemaFiles, "finite_manifest");
  if (merrs.length) { emitError(2, "manifest binding context invalid", "manifest", { errors: merrs.slice(0, 5) }); return 2; }
  // Exact binding, no defaults.
  if (claim.manifest_id !== manifest.manifest_id) { emitError(1, "claim not bound to manifest identity", "manifest_id"); return 1; }
  if (claim.wave_id !== manifest.wave_id) { emitError(1, "claim not bound to wave identity", "wave_id"); return 1; }
  const entry = (manifest.units || []).find((u) => u.unit_id === claim.unit_id);
  if (!entry) { emitError(1, "claim unit absent from manifest", "unit_id"); return 1; }
  if (entry.claim_generation !== claim.claim_generation) { emitError(1, "claim generation not the manifest current generation", "claim_generation"); return 1; }
  if (!RE.unit.test(claim.unit_id)) { emitError(1, "claim unit not in closed grammar", "unit_id"); return 1; }
  if (!RE.hex32plus.test(claim.attempt_nonce)) { emitError(1, "nonce below 128-bit closed grammar", "attempt_nonce"); return 1; }
  if (claim.nonce_source !== "qualified-csprng-128") { emitError(1, "nonce source not the required class", "nonce_source"); return 1; }
  if (claim.force !== false) { emitError(1, "claim must be non-force", "force"); return 1; }
  // Optional envelope binding when supplied.
  if (args["envelope"]) {
    let envDoc;
    try { envDoc = resolveInput(args["envelope"]); } catch { emitError(2, "unreadable envelope binding context", "envelope"); return 2; }
    const env = envDoc.run_envelope || envDoc;
    if (JSON.stringify(claim.subject) !== JSON.stringify(env.subject)) { emitError(1, "claim subject not bound to envelope", "subject"); return 1; }
    if (JSON.stringify(claim.coverage) !== JSON.stringify(env.coverage)) { emitError(1, "claim coverage not bound to envelope", "coverage"); return 1; }
    if (claim.release_id !== env.op_release) { emitError(1, "claim release not bound to envelope", "release_id"); return 1; }
  }
  emit({
    ok: true, helper: HELPER_NAME, helper_api: HELPER_API, valid: true,
    binding: "manifest-bound",
    note: "nonce_source label declares the required class; it is not qualification proof. Production requires independent release/host qualification.",
    qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION",
  });
  return 0;
}
function cmdValidatePublication(args) {
  const input = args._[0];
  const manifestPath = args["manifest"];
  if (!input) { emitError(3, "validate-publication requires <publication.json> --manifest <manifest.json>"); return 3; }
  if (!manifestPath) { emitError(2, "missing required binding context 'manifest'", "manifest"); return 2; }
  let schemas;
  try { schemas = loadSchemas(); } catch { emitError(2, "package schemas unavailable", "schemas"); return 2; }
  let doc, manifestDoc;
  try { doc = resolveInput(input); } catch { emitError(3, "unreadable or malformed JSON input", "input"); return 3; }
  try { manifestDoc = resolveInput(manifestPath); } catch { emitError(2, "unreadable manifest binding context", "manifest"); return 2; }
  const pub = doc.finite_publication || doc;
  const manifest = manifestDoc.finite_manifest || manifestDoc;
  const def = schemas.allDefs["finite_publication"];
  const mdef = schemas.allDefs["finite_manifest"];
  if (!def || !mdef) { emitError(2, "publication grammar unavailable", "schemas"); return 2; }
  const errs = validate(def.node, pub, def.id, schemas.schemaFiles, "finite_publication");
  if (errs.length) { emitError(1, "publication rejected", "finite_publication", { errors: errs.slice(0, 10) }); return 1; }
  const merrs = validate(mdef.node, manifest, mdef.id, schemas.schemaFiles, "finite_manifest");
  if (merrs.length) { emitError(2, "manifest binding context invalid", "manifest"); return 2; }
  if (pub.manifest_id !== manifest.manifest_id) { emitError(1, "publication not bound to manifest", "manifest_id"); return 1; }
  if (pub.wave_id !== manifest.wave_id) { emitError(1, "publication not bound to wave", "wave_id"); return 1; }
  const entry = (manifest.units || []).find((u) => u.unit_id === pub.unit_id);
  if (!entry) { emitError(1, "publication unit absent from manifest", "unit_id"); return 1; }
  if (entry.claim_generation !== pub.claim_generation) { emitError(1, "publication not the current generation", "claim_generation"); return 1; }
  if (pub.force !== false) { emitError(1, "publication must be non-force", "force"); return 1; }
  if (pub.readback !== "VERIFIED") { emitError(1, "publication requires VERIFIED readback", "readback"); return 1; }
  const fence = checkFenceObject(pub.fence);
  if (!fence.ok) {
    if (fence.blocked) { emitError(2, fence.reason, "fence"); return 2; }
    emitError(1, fence.reason, "fence"); return 1;
  }
  // Stale/unbound fence rejected: expect-head must equal a bound role commit
  // (claim commit or manifest wave-base commit); expect-absent carries no head.
  if (pub.fence.fence_kind === "expect-head") {
    const waveBaseCommit = manifest.wave_base && manifest.wave_base.commit;
    const boundHeads = [pub.claim_commit];
    if (typeof waveBaseCommit === "string" && RE.hex40.test(waveBaseCommit)) boundHeads.push(waveBaseCommit);
    if (!boundHeads.includes(pub.fence.expected_head)) { emitError(1, "fence head not a bound claim/wave-base role", "fence"); return 1; }
  }
  emit({ ok: true, helper: HELPER_NAME, helper_api: HELPER_API, valid: true, binding: "manifest-bound-current-generation", qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION" });
  return 0;
}
function cmdValidateReclaim(args) {
  const input = args._[0];
  const manifestPath = args["manifest"];
  if (!input) { emitError(3, "validate-reclaim requires <reclaim.json> --manifest <manifest.json>"); return 3; }
  if (!manifestPath) { emitError(2, "missing required binding context 'manifest'", "manifest"); return 2; }
  let schemas;
  try { schemas = loadSchemas(); } catch { emitError(2, "package schemas unavailable", "schemas"); return 2; }
  let doc, manifestDoc;
  try { doc = resolveInput(input); } catch { emitError(3, "unreadable or malformed JSON input", "input"); return 3; }
  try { manifestDoc = resolveInput(manifestPath); } catch { emitError(2, "unreadable manifest binding context", "manifest"); return 2; }
  const rec = doc.reclaim_action || doc;
  const manifest = manifestDoc.finite_manifest || manifestDoc;
  const def = schemas.allDefs["reclaim_action"];
  const mdef = schemas.allDefs["finite_manifest"];
  if (!def || !mdef) { emitError(2, "reclaim grammar unavailable", "schemas"); return 2; }
  const errs = validate(def.node, rec, def.id, schemas.schemaFiles, "reclaim_action");
  if (errs.length) { emitError(1, "reclaim rejected", "reclaim_action", { errors: errs.slice(0, 10) }); return 1; }
  const merrs = validate(mdef.node, manifest, mdef.id, schemas.schemaFiles, "finite_manifest");
  if (merrs.length) { emitError(2, "manifest binding context invalid", "manifest"); return 2; }
  if (rec.manifest_id !== manifest.manifest_id) { emitError(1, "reclaim not bound to manifest", "manifest_id"); return 1; }
  if (rec.wave_id !== manifest.wave_id) { emitError(1, "reclaim not bound to wave", "wave_id"); return 1; }
  const entry = (manifest.units || []).find((u) => u.unit_id === rec.unit_id);
  if (!entry) { emitError(1, "reclaim unit absent from manifest", "unit_id"); return 1; }
  if (rec.expected_generation !== entry.claim_generation) { emitError(1, "reclaim not the exact current generation", "expected_generation"); return 1; }
  if (!RE.claimState.test(rec.expected_claim_state)) { emitError(1, "reclaim claim state not in closed grammar", "expected_claim_state"); return 1; }
  if (!RE.hex40.test(rec.expected_head)) { emitError(1, "reclaim requires exact 40-hex head", "expected_head"); return 1; }
  if (rec.terminal_result_check.unit_id !== rec.unit_id) { emitError(1, "terminal check not bound to reclaimed unit", "terminal_result_check"); return 1; }
  if (rec.terminal_result_check.found_valid_current_terminal !== false) { emitError(1, "reclaim requires proven absence of valid current terminal", "terminal_result_check"); return 1; }
  if (rec.terminal_result_check.readback !== "VERIFIED") { emitError(1, "reclaim requires VERIFIED terminal readback", "terminal_result_check"); return 1; }
  if (rec.single_use !== true) { emitError(1, "reclaim must be single-use", "single_use"); return 1; }
  emit({ ok: true, helper: HELPER_NAME, helper_api: HELPER_API, valid: true, binding: "exact-current-generation-single-use", qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION" });
  return 0;
}
function cmdValidateMetadata(args) {
  const input = args._[0];
  const ctxPath = args["context"];
  if (!input) { emitError(3, "validate-metadata requires <metadata.json> --context <context.json>"); return 3; }
  if (!ctxPath) { emitError(2, "missing required binding context", "context"); return 2; }
  let schemas;
  try { schemas = loadSchemas(); } catch { emitError(2, "package schemas unavailable", "schemas"); return 2; }
  let doc, ctx;
  try { doc = resolveInput(input); } catch { emitError(3, "unreadable or malformed JSON input", "input"); return 3; }
  try { ctx = resolveInput(ctxPath); } catch { emitError(2, "unreadable binding context", "context"); return 2; }
  const m = doc.mechanical_metadata || doc;
  const def = schemas.allDefs["mechanical_metadata"];
  if (!def) { emitError(2, "metadata grammar unavailable", "schemas"); return 2; }
  const errs = validate(def.node, m, def.id, schemas.schemaFiles, "mechanical_metadata");
  if (errs.length) { emitError(1, "metadata rejected", "mechanical_metadata", { errors: errs.slice(0, 10) }); return 1; }
  const missing = requireCtx(ctx, ["work_kind", "wave_id", "assignment_id", "package_id", "release_id", "subject_digest", "coverage_digest", "generation", "nonce_id", "repository", "claim_commit", "wave_base_commit", "blob", "ref_created", "published"]);
  if (missing.length) { emitError(2, missing[0], "context"); return 2; }
  if (ctx.work_kind !== "finite-unit" && ctx.work_kind !== "homogeneous-run") { emitError(2, "unknown work kind", "context"); return 2; }
  const berrs = [];
  const seg = ctx.work_kind === "finite-unit" ? ctx.unit_id : ctx.run_id;
  if (seg === undefined) berrs.push("binding context missing unit/run for its kind");
  if (m.assignment_id !== ctx.assignment_id) berrs.push("assignment not bound");
  const unitOk = ctx.work_kind === "finite-unit" && m.unit_id === ctx.unit_id && (m.run_id === null || m.run_id === undefined);
  const runOk = ctx.work_kind === "homogeneous-run" && m.run_id === ctx.run_id && (m.unit_id === null || m.unit_id === undefined);
  if (!unitOk && !runOk) berrs.push("unit/run not bound to one frozen work kind");
  if (m.package_id !== ctx.package_id) berrs.push("package not bound");
  if (m.release_id !== ctx.release_id) berrs.push("release not bound");
  if (m.subject_digest !== ctx.subject_digest) berrs.push("subject digest not bound");
  if (m.coverage_digest !== ctx.coverage_digest) berrs.push("coverage digest not bound");
  if (m.claim_generation !== ctx.generation) berrs.push("generation not bound");
  if (m.attempt_nonce_id !== ctx.nonce_id) berrs.push("nonce handle not bound");
  const roleCommits = [ctx.claim_commit, ctx.wave_base_commit];
  if (ctx.publication) roleCommits.push(ctx.publication.commit);
  if (!roleCommits.includes(m.commit)) berrs.push("commit not a bound role");
  if (m.ancestry !== null && m.ancestry !== undefined && !roleCommits.includes(m.ancestry)) berrs.push("ancestry not bound");
  if (m.expected_head !== null && m.expected_head !== undefined && !roleCommits.includes(m.expected_head)) berrs.push("expected head not bound");
  if (m.branch !== `op/${slug(ctx.wave_id)}/${slug(seg)}`) berrs.push("branch not derived");
  if (m.output_path !== `results/${slug(ctx.assignment_id)}.md`) berrs.push("output not derived");
  if (ctx.ref_created === true) {
    if (m.ref !== `refs/heads/${m.branch}`) berrs.push("created ref mismatch");
  } else if (ctx.ref_created === false) {
    if (m.ref !== null && m.ref !== undefined) berrs.push("absent ref must be null");
  } else { emitError(2, "missing ref applicability context", "context"); return 2; }
  if (ctx.published === true) {
    if (!ctx.publication) { emitError(2, "missing verified publication identity", "context"); return 2; }
    const exp = `${ctx.publication.repository}@${ctx.publication.commit}:${ctx.publication.output_path}`;
    if (m.publication !== exp) berrs.push("publication locator mismatch");
    if (m.commit !== ctx.publication.commit) berrs.push("record commit mismatch");
    if (m.blob !== ctx.publication.blob) berrs.push("record blob mismatch");
    if (m.output_path !== ctx.publication.output_path) berrs.push("record output mismatch");
    if (m.readback !== "VERIFIED") berrs.push("published requires VERIFIED");
  } else if (ctx.published === false) {
    if (m.publication !== null && m.publication !== undefined) berrs.push("unpublished publication must be null");
    if (m.blob !== null && m.blob !== undefined) berrs.push("unpublished blob must be null");
    if (m.readback !== "NOT_APPLICABLE") berrs.push("unpublished requires NOT_APPLICABLE");
  } else { emitError(2, "missing publication applicability context", "context"); return 2; }
  if (berrs.length) { emitError(1, berrs[0], "mechanical_metadata"); return 1; }
  emit({ ok: true, helper: HELPER_NAME, helper_api: HELPER_API, valid: true, qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION" });
  return 0;
}
function cmdValidateReceipt(args) {
  const input = args._[0];
  const ctxPath = args["context"];
  const kind = args["kind"];
  if (!input) { emitError(3, "validate-receipt requires <receipt.json> --context <context.json> --kind <execution|provider>"); return 3; }
  if (!ctxPath) { emitError(2, "missing required binding context", "context"); return 2; }
  if (kind !== "execution" && kind !== "provider") { emitError(2, "unknown receipt kind", "kind"); return 2; }
  let schemas;
  try { schemas = loadSchemas(); } catch { emitError(2, "package schemas unavailable", "schemas"); return 2; }
  let doc, ctx;
  try { doc = resolveInput(input); } catch { emitError(3, "unreadable or malformed JSON input", "input"); return 3; }
  try { ctx = resolveInput(ctxPath); } catch { emitError(2, "unreadable binding context", "context"); return 2; }
  if (kind === "execution") {
    const r = doc.execution_receipt || doc;
    const def = schemas.allDefs["execution_receipt"];
    if (!def) { emitError(2, "receipt grammar unavailable", "schemas"); return 2; }
    const errs = validate(def.node, r, def.id, schemas.schemaFiles, "execution_receipt");
    if (errs.length) { emitError(1, "receipt rejected", "execution_receipt", { errors: errs.slice(0, 10) }); return 1; }
    if (ctx.assignment_id === undefined || ctx.durable_result === undefined) { emitError(2, "missing required binding context", "context"); return 2; }
    if (r.assignment_id !== ctx.assignment_id) { emitError(1, "receipt assignment not bound", "assignment_id"); return 1; }
    if (r.durable_result !== ctx.durable_result) { emitError(1, "receipt result not the exact durable result", "durable_result"); return 1; }
    if ((r.blocker === null || r.blocker === undefined) !== (r.status === "COMPLETE")) { emitError(1, "blocker null exactly for COMPLETE", "blocker"); return 1; }
    if (r.readback !== "VERIFIED") { emitError(1, "execution receipt requires VERIFIED readback", "readback"); return 1; }
    emit({ ok: true, helper: HELPER_NAME, helper_api: HELPER_API, valid: true, qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION" });
    return 0;
  }
  // provider
  const r = doc.provider_receipt || doc;
  const def = schemas.allDefs["provider_receipt"];
  if (!def) { emitError(2, "receipt grammar unavailable", "schemas"); return 2; }
  const errs = validate(def.node, r, def.id, schemas.schemaFiles, "provider_receipt");
  if (errs.length) { emitError(1, "receipt rejected", "provider_receipt", { errors: errs.slice(0, 10) }); return 1; }
  const missing = requireCtx(ctx, ["operation_id", "repository", "branch", "operation_kind", "intended_postcondition_kind"]);
  if (missing.length) { emitError(2, missing[0], "context"); return 2; }
  if (ctx.operation_kind !== "ref-mutation" && ctx.operation_kind !== "read-observation") { emitError(2, "unknown operation kind", "context"); return 2; }
  if (r.operation_id !== ctx.operation_id) { emitError(1, "operation not bound", "operation_id"); return 1; }
  if (r.target !== `${ctx.repository}:refs/heads/${ctx.branch}`) { emitError(1, "target not recomposed", "target"); return 1; }
  if (ctx.operation_kind === "ref-mutation") {
    if (ctx.expected_head === undefined || ctx.expected_head === null) { emitError(2, "ref-mutation requires a bound expected-head fence", "context"); return 2; }
    if (r.expected_head !== ctx.expected_head) { emitError(1, "expected head not bound", "expected_head"); return 1; }
    if (ctx.intended_postcondition_kind !== "ref-points-at" && ctx.intended_postcondition_kind !== "no-write-performed") { emitError(2, "ref-mutation intended kind invalid", "context"); return 2; }
  } else {
    if (r.expected_head !== null && r.expected_head !== undefined) { emitError(1, "read-observation declares no fence", "expected_head"); return 1; }
    if (ctx.intended_postcondition_kind !== "path-content-matches") { emitError(2, "read-observation intended kind invalid", "context"); return 2; }
    if (ctx.intended_content_digest === undefined || ctx.intended_content_digest === null) { emitError(2, "read-observation requires a bound content digest", "context"); return 2; }
  }
  const pc = String(r.postcondition || "");
  const isNoWrite = pc === "no-write-performed";
  if ((r.occurrence === "NOT_APPLIED") !== isNoWrite) { emitError(1, "occurrence/postcondition mismatch", "postcondition"); return 1; }
  const kindOf = pc.startsWith("ref-points-at:") ? "ref-points-at" : pc.startsWith("path-content-matches:") ? "path-content-matches" : pc;
  if (kindOf !== ctx.intended_postcondition_kind) { emitError(1, "postcondition kind not bound", "postcondition"); return 1; }
  if (pc.startsWith("ref-points-at:") && pc.slice("ref-points-at:".length) !== ctx.intended_commit) { emitError(1, "postcondition not bound", "postcondition"); return 1; }
  if (pc.startsWith("path-content-matches:") && pc.slice("path-content-matches:".length) !== ctx.intended_content_digest) { emitError(1, "postcondition content not bound", "postcondition"); return 1; }
  if (r.occurrence === "VERIFIED" && r.readback !== "VERIFIED") { emitError(1, "verified occurrence requires verified readback", "readback"); return 1; }
  emit({ ok: true, helper: HELPER_NAME, helper_api: HELPER_API, valid: true, qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION" });
  return 0;
}
function cmdCheckFence(args) {
  const fencePath = args["fence"];
  const observedPath = args["observed"];
  if (!fencePath) { emitError(3, "check-fence requires --fence <fence.json> [--observed <observed.json>]"); return 3; }
  let fence, observed = null;
  try { fence = resolveInput(fencePath); } catch { emitError(3, "unreadable fence input", "fence"); return 3; }
  const f = fence.conditional_fence || fence.fence || fence;
  // Schema shape first (sanitized).
  let schemas;
  try { schemas = loadSchemas(); } catch { emitError(2, "package schemas unavailable", "schemas"); return 2; }
  const def = schemas.allDefs["conditional_fence"];
  if (def) {
    const errs = validate(def.node, f, def.id, schemas.schemaFiles, "conditional_fence");
    if (errs.length) { emitError(2, "fence shape invalid", "fence", { errors: errs.slice(0, 5) }); return 2; }
  }
  const shape = checkFenceObject(f);
  if (!shape.ok) {
    if (shape.blocked) { emitError(2, shape.reason, "fence"); return 2; }
    emitError(1, shape.reason, "fence"); return 1;
  }
  if (observedPath) {
    try { observed = resolveInput(observedPath); } catch { emitError(2, "unreadable observed state", "observed"); return 2; }
    const obsHead = observed.head !== undefined ? observed.head : observed.expected_head !== undefined ? observed.expected_head : observed.current_head;
    if (f.fence_kind === "expect-head") {
      if (typeof obsHead !== "string" || obsHead !== f.expected_head) { emitError(1, "observed head does not equal expected head", "observed"); return 1; }
    } else {
      // expect-absent: observed must positively state ABSENT with VERIFIED readback.
      const st = observed.state || observed.absence;
      const rb = observed.readback;
      if (st !== "ABSENT" || rb !== "VERIFIED") { emitError(1, "observed absence not positively verified", "observed"); return 1; }
    }
  }
  emit({ ok: true, helper: HELPER_NAME, helper_api: HELPER_API, satisfied: true, fence_kind: f.fence_kind, qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION" });
  return 0;
}
function readLooseCommit(objectsDir, oid) {
  // Already-fetched loose objects only. No packfiles, no fetch, no writes.
  // Returns { type, parents } or { missing: true } or { corrupt: true }.
  const p = path.join(objectsDir, oid.slice(0, 2), oid.slice(2));
  let buf;
  try { buf = fs.readFileSync(p); } catch { return { missing: true }; }
  let inflated;
  try { inflated = zlib.inflateSync(buf); } catch { return { corrupt: true }; }
  const nul = inflated.indexOf(0);
  if (nul === -1) return { corrupt: true };
  const header = inflated.slice(0, nul).toString("utf8");
  const body = inflated.slice(nul + 1).toString("utf8");
  const type = header.split(" ")[0];
  if (type !== "commit") return { type, parents: [], notCommit: true };
  const parents = [];
  for (const line of body.split("\n")) {
    const m = line.match(/^parent ([0-9a-f]{40})$/);
    if (m) parents.push(m[1]);
    if (line === "") break;
  }
  return { type, parents };
}
function cmdValidateAncestry(args) {
  const claimCommit = args["claim-commit"];
  const ancestryCommit = args["ancestry-commit"];
  const objectsDir = args["objects-dir"];
  if (!claimCommit || !ancestryCommit || !objectsDir) {
    emitError(3, "validate-ancestry requires --claim-commit <40hex> --ancestry-commit <40hex> --objects-dir <dir>", "args");
    return 3;
  }
  if (!RE.hex40.test(claimCommit) || !RE.hex40.test(ancestryCommit)) {
    emitError(1, "commit identities not in closed 40-hex grammar", "commit");
    return 1;
  }
  let st;
  try { st = fs.statSync(objectsDir); } catch { emitError(2, "objects directory unavailable", "objects-dir"); return 2; }
  if (!st.isDirectory()) { emitError(2, "objects directory unavailable", "objects-dir"); return 2; }
  // Walk parent links from already-fetched loose objects only. The helper
  // never fetches, never writes, and never trusts a bare assertion: both
  // OIDs must resolve to loose commit objects and the ancestry OID must be
  // reachable from the claim OID via parent links. Packed history without
  // loose objects BLOCKS (not guessed). Self-ancestry (same OID) verifies
  // trivially once the object is proven present.
  if (claimCommit === ancestryCommit) {
    const self = readLooseCommit(objectsDir, claimCommit);
    if (self.missing) { emitError(2, "claim object not already-fetched", "objects-dir"); return 2; }
    if (self.corrupt || self.notCommit) { emitError(1, "claim object not a readable commit", "objects-dir"); return 1; }
    emit({ ok: true, helper: HELPER_NAME, helper_api: HELPER_API, ancestry: "VERIFIED", qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION" });
    return 0;
  }
  const seen = new Set();
  const queue = [claimCommit];
  let steps = 0;
  while (queue.length && steps < 10000) {
    const oid = queue.shift();
    if (seen.has(oid)) continue;
    seen.add(oid);
    steps++;
    if (oid === ancestryCommit) {
      emit({ ok: true, helper: HELPER_NAME, helper_api: HELPER_API, ancestry: "VERIFIED", qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION" });
      return 0;
    }
    const c = readLooseCommit(objectsDir, oid);
    if (c.missing) { emitError(2, "ancestry walk blocked: required object not already-fetched", "objects-dir"); return 2; }
    if (c.corrupt || c.notCommit) { emitError(1, "ancestry walk hit an unreadable object", "objects-dir"); return 1; }
    for (const par of c.parents) if (!seen.has(par)) queue.push(par);
    // Reached a root without seeing ancestry: continue until queue drains.
  }
  // Queue drained without reaching ancestry: prove the claim side was fully
  // walked from fetched objects before reporting NOT-ANCESTOR. If the walk
  // hit the step cap, fail closed rather than guessing.
  if (steps >= 10000) { emitError(2, "ancestry walk exceeded bounded steps", "objects-dir"); return 2; }
  if (seen.has(ancestryCommit)) {
    emit({ ok: true, helper: HELPER_NAME, helper_api: HELPER_API, ancestry: "VERIFIED", qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION" });
    return 0;
  }
  emitError(1, "ancestry not proven", "ancestry");
  return 1;
}
function cmdPlanAlloc(args) {
  const manifestPath = args["manifest"];
  const envelopePath = args["envelope"];
  if (!manifestPath || !envelopePath) { emitError(3, "plan-alloc requires --manifest <manifest.json> --envelope <envelope.json>"); return 3; }
  let schemas;
  try { schemas = loadSchemas(); } catch { emitError(2, "package schemas unavailable", "schemas"); return 2; }
  let manifestDoc, envDoc;
  try { manifestDoc = resolveInput(manifestPath); } catch { emitError(2, "unreadable manifest snapshot", "manifest"); return 2; }
  try { envDoc = resolveInput(envelopePath); } catch { emitError(2, "unreadable envelope snapshot", "envelope"); return 2; }
  const manifest = manifestDoc.finite_manifest || manifestDoc;
  const env = envDoc.run_envelope || envDoc;
  const mdef = schemas.allDefs["finite_manifest"];
  const edef = schemas.allDefs["run_envelope"];
  if (!mdef || !edef) { emitError(2, "allocation grammar unavailable", "schemas"); return 2; }
  // Reject homogeneous input explicitly (later owner, no silent handling).
  if (manifestDoc.homogeneous_batch || manifestDoc.batch_revision_id) { emitError(2, "homogeneous batches belong to the later homogeneous owner", "manifest"); return 2; }
  const merrs = validate(mdef.node, manifest, mdef.id, schemas.schemaFiles, "finite_manifest");
  if (merrs.length) { emitError(1, "manifest snapshot rejected", "manifest", { errors: merrs.slice(0, 5) }); return 1; }
  const eerrs = validate(edef.node, env, edef.id, schemas.schemaFiles, "run_envelope");
  if (eerrs.length) { emitError(1, "envelope snapshot rejected", "envelope", { errors: eerrs.slice(0, 5) }); return 1; }
  const units = [...(manifest.units || [])].sort((a, b) => (a.unit_id < b.unit_id ? -1 : a.unit_id > b.unit_id ? 1 : 0));
  const seen = new Set();
  for (const u of units) {
    if (!RE.unit.test(u.unit_id)) { emitError(1, "unit not in closed grammar", "unit_id"); return 1; }
    if (seen.has(u.unit_id)) { emitError(1, "duplicate unit identity", "unit_id"); return 1; }
    seen.add(u.unit_id);
    if (!Number.isInteger(u.claim_generation) || u.claim_generation < 0) { emitError(1, "generation not a non-negative integer", "claim_generation"); return 1; }
  }
  const assignments = units.map((u, i) => {
    const n = String(i + 1).padStart(4, "0");
    const assignment_id = `assign:${n}`;
    const nonce_id = `nonce:${n}`;
    return {
      assignment_id,
      unit_id: u.unit_id,
      claim_generation: u.claim_generation,
      attempt_nonce_id: nonce_id,
      wave_id: manifest.wave_id,
      manifest_id: manifest.manifest_id,
      branch: `op/${slug(manifest.wave_id)}/${slug(u.unit_id)}`,
      output_path: `results/${slug(assignment_id)}.md`,
      fresh_nonce_required: true,
      nonce_source_class: "qualified-csprng-128",
    };
  });
  const out = {
    ok: true,
    helper: HELPER_NAME,
    helper_api: HELPER_API,
    kind: "allocation-plan",
    authority: "none",
    write: false,
    manifest_id: manifest.manifest_id,
    wave_id: manifest.wave_id,
    run_envelope_id: env.run_envelope_id,
    release_id: env.op_release,
    assignments,
    note: "Plan only: not a write and not authority. Fresh nonces MUST be issued via the qualified-source interface before claim creation.",
    qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION",
  };
  if (args["out"]) {
    try { fs.writeFileSync(args["out"], JSON.stringify(out, null, 2) + "\n"); } catch { emitError(3, "cannot write plan output", "out"); return 3; }
  } else {
    emit(out);
  }
  return 0;
}
function cmdContextPack(args) {
  const assignment = args["assignment"];
  const manifestPath = args["manifest"];
  const envelopePath = args["envelope"];
  if (!assignment || !manifestPath || !envelopePath) {
    emitError(3, "context-pack requires --assignment <assign:NNNN> --manifest <manifest.json> --envelope <envelope.json> [--claim <claim.json>]");
    return 3;
  }
  if (!RE.assign.test(assignment)) { emitError(1, "assignment not in closed grammar", "assignment"); return 1; }
  let schemas;
  try { schemas = loadSchemas(); } catch { emitError(2, "package schemas unavailable", "schemas"); return 2; }
  let manifestDoc, envDoc;
  try { manifestDoc = resolveInput(manifestPath); } catch { emitError(2, "unreadable manifest snapshot", "manifest"); return 2; }
  try { envDoc = resolveInput(envelopePath); } catch { emitError(2, "unreadable envelope snapshot", "envelope"); return 2; }
  const manifest = manifestDoc.finite_manifest || manifestDoc;
  const env = envDoc.run_envelope || envDoc;
  const mdef = schemas.allDefs["finite_manifest"];
  const edef = schemas.allDefs["run_envelope"];
  if (!mdef || !edef) { emitError(2, "context grammar unavailable", "schemas"); return 2; }
  const merrs = validate(mdef.node, manifest, mdef.id, schemas.schemaFiles, "finite_manifest");
  if (merrs.length) { emitError(1, "manifest snapshot rejected", "manifest"); return 1; }
  const eerrs = validate(edef.node, env, edef.id, schemas.schemaFiles, "run_envelope");
  if (eerrs.length) { emitError(1, "envelope snapshot rejected", "envelope"); return 1; }
  // Deterministic assignment index: sorted units, assign:NNNN in order.
  const units = [...(manifest.units || [])].sort((a, b) => (a.unit_id < b.unit_id ? -1 : 1));
  const idx = parseInt(assignment.slice("assign:".length), 10) - 1;
  if (!Number.isInteger(idx) || idx < 0 || idx >= units.length) { emitError(1, "assignment out of range for this manifest", "assignment"); return 1; }
  const u = units[idx];
  const pack = {
    ok: true,
    helper: HELPER_NAME,
    helper_api: HELPER_API,
    kind: "assignment-context-pack",
    authority: "none",
    assignment_id: assignment,
    unit_id: u.unit_id,
    claim_generation: u.claim_generation,
    attempt_nonce_id: `nonce:${String(idx + 1).padStart(4, "0")}`,
    fresh_nonce_required: true,
    nonce_source_class: "qualified-csprng-128",
    wave_id: manifest.wave_id,
    manifest_id: manifest.manifest_id,
    run_envelope_id: env.run_envelope_id,
    release_id: env.op_release,
    subject: env.subject,
    coverage: env.coverage,
    allowed_reads: ["subject", "coverage", "manifest", "checkpoint"],
    allowed_effects: ["op-result-publication"],
    output_path: `results/${slug(assignment)}.md`,
    branch: `op/${slug(manifest.wave_id)}/${slug(u.unit_id)}`,
    note: "Assignment-only: no sibling semantic material, no findings, no profile disposition. Fresh nonce bytes are never embedded here.",
    qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION",
  };
  // Optional claim binding: validate only, never echo full nonce bytes.
  if (args["claim"]) {
    let claimDoc;
    try { claimDoc = resolveInput(args["claim"]); } catch { emitError(2, "unreadable claim binding context", "claim"); return 2; }
    const claim = claimDoc.finite_claim || claimDoc;
    if (claim.unit_id !== u.unit_id) { emitError(1, "claim unit not bound to this assignment", "claim"); return 1; }
    if (claim.claim_generation !== u.claim_generation) { emitError(1, "claim generation not bound", "claim"); return 1; }
    pack.claim_bound = true;
  }
  emit(pack);
  return 0;
}
function cmdValidateNonce(args) {
  const nonce = args["nonce"];
  const source = args["source"];
  if (!nonce || !source) { emitError(3, "validate-nonce requires --nonce <hex> --source <source-class> [--binding <binding.json>]"); return 3; }
  if (source !== "qualified-csprng-128") { emitError(2, "nonce source not the required qualified class", "source"); return 2; }
  if (!RE.hex32plus.test(nonce)) { emitError(1, "nonce below 128-bit closed grammar", "nonce"); return 1; }
  if (args["binding"]) {
    let b;
    try { b = resolveInput(args["binding"]); } catch { emitError(2, "unreadable binding context", "binding"); return 2; }
    const binding = b.nonce_binding || b;
    if (binding.unit_id !== undefined && !RE.unit.test(binding.unit_id)) { emitError(1, "binding unit not in closed grammar", "binding"); return 1; }
    if (binding.claim_generation !== undefined && (!Number.isInteger(binding.claim_generation) || binding.claim_generation < 0)) { emitError(1, "binding generation invalid", "binding"); return 1; }
  }
  emit({
    ok: true, helper: HELPER_NAME, helper_api: HELPER_API, valid: true,
    entropy_class: "at-least-128-bit-hex-syntax",
    note: "Syntax and source-class only; the label is not qualification proof. Freshness and qualified provenance require independent establishment.",
    qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION",
  });
  return 0;
}
function cmdIssueClaimNonce(args) {
  const source = args["qualified-source"];
  const locator = args["qualification-locator"];
  if (!source || !locator) {
    emitError(2, "missing qualified source: production nonce issuance BLOCKS without an exact qualified source and independent qualification locator", "qualified-source");
    return 2;
  }
  if (typeof source !== "string" || source.length === 0) { emitError(2, "qualified source identity invalid", "qualified-source"); return 2; }
  if (typeof locator !== "string" || locator.length === 0) { emitError(2, "qualification locator invalid", "qualification-locator"); return 2; }
  if (source === "self-qualified" || source === "user-flag" || source === "label-only") {
    emitError(2, "self-qualified markers never authorize production", "qualified-source");
    return 2;
  }
  let bytes;
  try {
    bytes = crypto.randomBytes(32);
  } catch {
    emitError(2, "local CSPRNG unavailable: issuance BLOCKS", "source");
    return 2;
  }
  const out = {
    ok: true,
    helper: HELPER_NAME,
    helper_api: HELPER_API,
    kind: "fresh-claim-nonce",
    attempt_nonce: bytes.toString("hex"),
    nonce_bytes: 32,
    nonce_bits: 256,
    qualified_source: source,
    qualification_locator: locator,
    qualification: "UNVERIFIED-BY-HELPER",
    warning: "Local OS CSPRNG candidate only; not Android/host qualification and not a production-qualified claim receipt. Production use requires independent release/host qualification of the named source.",
  };
  if (args["out"]) {
    try { fs.writeFileSync(args["out"], JSON.stringify(out, null, 2) + "\n"); } catch { emitError(3, "cannot write nonce output", "out"); return 3; }
  } else {
    emit(out);
  }
  return 0;
}
function cmdDiagnoseCsprng(args) {
  const n = args["bytes"] ? parseInt(args["bytes"], 10) : 32;
  if (!Number.isInteger(n) || n < 16 || n > 64) { emitError(3, "diagnose-csprng --bytes must be an integer 16..64", "bytes"); return 3; }
  let bytes;
  try { bytes = crypto.randomBytes(n); } catch { emitError(2, "local CSPRNG unavailable", "source"); return 2; }
  emit({
    ok: true,
    helper: HELPER_NAME,
    helper_api: HELPER_API,
    kind: "csprng-diagnostic-candidate",
    candidate_bytes: bytes.toString("hex"),
    qualification: "UNQUALIFIED-LOCAL-CANDIDATE",
    warning: "Diagnostic only; never production qualification, never a claim receipt, never Android/host proof.",
  });
  return 0;
}
function cmdValidateOperation(args) {
  const input = args._[0];
  const readbackPath = args["readback"];
  if (!input) { emitError(3, "validate-operation requires <operation.json> [--readback <readback.json>]"); return 3; }
  let schemas;
  try { schemas = loadSchemas(); } catch { emitError(2, "package schemas unavailable", "schemas"); return 2; }
  let doc;
  try { doc = resolveInput(input); } catch { emitError(3, "unreadable or malformed JSON input", "input"); return 3; }
  const op = doc.finite_operation || doc;
  const def = schemas.allDefs["finite_operation"];
  if (!def) { emitError(2, "operation grammar unavailable", "schemas"); return 2; }
  const errs = validate(def.node, op, def.id, schemas.schemaFiles, "finite_operation");
  if (errs.length) { emitError(1, "operation rejected", "finite_operation", { errors: errs.slice(0, 10) }); return 1; }
  const fence = checkFenceObject(op.fence);
  if (!fence.ok) {
    if (fence.blocked) { emitError(2, fence.reason, "fence"); return 2; }
    emitError(1, fence.reason, "fence"); return 1;
  }
  if (!POST_RE.test(op.intended_postcondition)) { emitError(1, "intended postcondition not in closed forms", "intended_postcondition"); return 1; }
  const isNoWrite = op.intended_postcondition === "no-write-performed";
  if ((op.occurrence === "NOT_APPLIED") !== isNoWrite) { emitError(1, "occurrence/postcondition mismatch", "occurrence"); return 1; }
  if (op.occurrence === "VERIFIED" && op.readback !== "VERIFIED") { emitError(1, "verified occurrence requires verified readback", "readback"); return 1; }
  if (op.occurrence === "UNKNOWN") {
    emit({ ok: true, helper: HELPER_NAME, helper_api: HELPER_API, classification: "UNKNOWN", action: "FAIL-CLOSED-NO-RETRY", qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION" });
    return 0;
  }
  if (readbackPath) {
    let rb;
    try { rb = resolveInput(readbackPath); } catch { emitError(2, "unreadable readback", "readback"); return 2; }
    const r = rb.readback || rb;
    if (r.operation_id !== undefined && r.operation_id !== op.operation_id) { emitError(1, "readback operation not bound", "readback"); return 1; }
  }
  const cls = op.occurrence === "VERIFIED" ? "VERIFIED" : "NOT_APPLIED";
  const action = cls === "VERIFIED" ? "CONSUME-WITHOUT-REPLAY" : "RETRY-ONLY-AFTER-PROVEN-NOT-APPLIED";
  emit({ ok: true, helper: HELPER_NAME, helper_api: HELPER_API, classification: cls, action, qualification: "STRUCTURAL-ONLY-NOT-QUALIFICATION" });
  return 0;
}

// ---------- CLI ----------
function parseArgs(argv) {
  const args = { _: [] };
  let i = 0;
  while (i < argv.length) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const eq = a.indexOf("=");
      if (eq !== -1) {
        args[a.slice(2, eq)] = a.slice(eq + 1);
        i++;
      } else if (i + 1 < argv.length && !argv[i + 1].startsWith("--")) {
        args[a.slice(2)] = argv[i + 1];
        i += 2;
      } else {
        args[a.slice(2)] = true;
        i++;
      }
    } else {
      args._.push(a);
      i++;
    }
  }
  return args;
}
function usage() {
  const text = `${HELPER_NAME} ${HELPER_VERSION} (${HELPER_API}) — mechanical helper, draft unqualified.
Usage: node ${"skills/orchestration-protocol/scripts/op-helper.mjs"} <command> [args]

Commands (all deterministic except issue-claim-nonce/diagnose-csprng):
  probe
  canonicalize <input.json>
  digest <input.json>
  validate-envelope <envelope.json>
  validate-claim <claim.json> --manifest <manifest.json> [--envelope <envelope.json>]
  validate-publication <publication.json> --manifest <manifest.json>
  validate-reclaim <reclaim.json> --manifest <manifest.json>
  validate-metadata <metadata.json> --context <context.json>
  validate-receipt <receipt.json> --context <context.json> --kind <execution|provider>
  check-fence --fence <fence.json> [--observed <observed.json>]
  validate-ancestry --claim-commit <40hex> --ancestry-commit <40hex> --objects-dir <dir>
  plan-alloc --manifest <manifest.json> --envelope <envelope.json> [--out <file>]
  context-pack --assignment <assign:NNNN> --manifest <manifest.json> --envelope <envelope.json> [--claim <claim.json>]
  validate-nonce --nonce <hex> --source <source-class> [--binding <binding.json>]
  issue-claim-nonce --qualified-source <id> --qualification-locator <locator> [--out <file>]
  diagnose-csprng [--bytes <16..64>]
  validate-operation <operation.json> [--readback <readback.json>]
  help

Exit codes: 0 success/valid/satisfied, 1 invalid/not-satisfied, 2 BLOCKED fail-closed, 3 usage error.
Inputs are JSON files ('-' reads stdin). Outputs are JSON to stdout.
Limitations: structural validation only, never qualification; no network/Git writes/subprocess/credentials/semantics;
ancestry from already-fetched objects only; random issuance excluded from identical-output assertions;
errors never echo semantic values. See references/finite-claim-substrate.md for the normative contract.`;
  console.log(text);
}
function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv[0] === "help" || argv[0] === "--help" || argv[0] === "-h") { usage(); return 0; }
  const cmd = argv[0];
  const args = parseArgs(argv.slice(1));
  try {
    switch (cmd) {
      case "probe": return cmdProbe();
      case "canonicalize": return cmdCanonicalize(args);
      case "digest": return cmdDigest(args);
      case "validate-envelope": return cmdValidateEnvelope(args);
      case "validate-claim": return cmdValidateClaim(args);
      case "validate-publication": return cmdValidatePublication(args);
      case "validate-reclaim": return cmdValidateReclaim(args);
      case "validate-metadata": return cmdValidateMetadata(args);
      case "validate-receipt": return cmdValidateReceipt(args);
      case "check-fence": return cmdCheckFence(args);
      case "validate-ancestry": return cmdValidateAncestry(args);
      case "plan-alloc": return cmdPlanAlloc(args);
      case "context-pack": return cmdContextPack(args);
      case "validate-nonce": return cmdValidateNonce(args);
      case "issue-claim-nonce": return cmdIssueClaimNonce(args);
      case "diagnose-csprng": return cmdDiagnoseCsprng(args);
      case "validate-operation": return cmdValidateOperation(args);
      default: emitError(3, `unknown command '${cmd}'`, "command"); usage(); return 3;
    }
  } catch (e) {
    emitError(2, "helper internal failure before completion", null);
    return 2;
  }
}
process.exit(main());
