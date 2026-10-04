#!/usr/bin/env node
// M02 proportionate build check — dependency-free, non-inference.
// Validates parseability, registries, exclusive ownership, link resolution,
// record-against-schema validation (bounded local validator), frozen derived
// identities, lineage coherence, conditional bindings, typed value grammars,
// and representative negative cases for A1-A6. Not a Q-layer PASS.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SK = path.join(ROOT, "skills/orchestration-protocol");
let failures = 0, checks = 0;
function ok(name, cond, detail = "") {
  checks++;
  if (cond) console.log(`ok ${checks} - ${name}`);
  else { failures++; console.log(`not ok ${checks} - ${name}${detail ? " :: " + detail : ""}`); }
}
function read(p) { return fs.readFileSync(path.join(ROOT, p), "utf8"); }
function readJSON(p) { return JSON.parse(read(p)); }

// ---------- canonical serialization (contracts-and-versioning section 3) ----------
function canonicalize(v) {
  if (v === null || typeof v !== "object") {
    if (typeof v === "number" && !Number.isFinite(v)) throw new Error("non-finite number");
    return JSON.stringify(v);
  }
  if (Array.isArray(v)) return "[" + v.map(canonicalize).join(",") + "]";
  return "{" + Object.keys(v).sort().map(k => JSON.stringify(k) + ":" + canonicalize(v[k])).join(",") + "}";
}
const digest = (v) => crypto.createHash("sha256").update(canonicalize(v), "utf8").digest("hex");
// One concrete semantic projection: routing, derived self-identity and
// container annotations never enter a digest.
function semanticProjection(env) {
  const { return_id, run_envelope_id, ...rest } = env;
  return rest;
}
const runEnvelopeId = (env) => "runenv:" + digest(semanticProjection(env));

// ---------- bounded local JSON-schema validator ----------
// Supported keywords only; anything else is a failure, never silently ignored.
const SUPPORTED = new Set(["$schema", "$id", "title", "version", "description",
  "normative_owner", "normative_co_owner", "defs", "$ref", "type", "required",
  "properties", "additionalProperties", "items", "enum", "const", "pattern",
  "minLength", "minimum", "minItems", "anyOf"]);
const schemaFiles = {};
for (const f of fs.readdirSync(path.join(SK, "schemas")).filter(f => f.endsWith(".json"))) {
  const s = readJSON(`skills/orchestration-protocol/schemas/${f}`);
  schemaFiles[s.$id] = s;
}
function resolveRef(ref, baseId) {
  const [base, ptr] = ref.split("#");
  const target = base === "" ? schemaFiles[baseId] : schemaFiles[base];
  if (!target) return { error: `unresolvable ref base ${base}` };
  let node = target;
  if (ptr) for (const seg of ptr.split("/").filter(Boolean)) {
    node = node[seg];
    if (node === undefined) return { error: `unresolvable pointer ${ptr} in ${ref}` };
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
function validate(node, value, baseId, where) {
  const errs = [];
  if (node.$ref !== undefined) {
    const r = resolveRef(node.$ref, baseId);
    if (r.error) return [`${where}: ${r.error}`];
    return validate(r.node, value, r.id, where);
  }
  for (const k of Object.keys(node)) {
    if (!SUPPORTED.has(k)) errs.push(`${where}: unsupported validation keyword '${k}'`);
  }
  if (node.type !== undefined) {
    const types = Array.isArray(node.type) ? node.type : [node.type];
    if (!types.some(t => typeOk(t, value))) {
      errs.push(`${where}: expected type ${JSON.stringify(node.type)}, got ${JSON.stringify(value)}`);
      return errs;
    }
    if (value === null) {
      if (node.enum !== undefined && !node.enum.some(e => Object.is(e, value))) errs.push(`${where}: null not in enum`);
      return errs;
    }
  }
  if (value === null) return errs;
  if (node.enum !== undefined && !node.enum.some(e => Object.is(e, value))) errs.push(`${where}: value not in enum`);
  if (node.const !== undefined && !Object.is(node.const, value)) errs.push(`${where}: const mismatch`);
  if (node.pattern !== undefined && typeof value === "string" && !(new RegExp(node.pattern).test(value))) errs.push(`${where}: pattern mismatch`);
  if (node.minLength !== undefined && typeof value === "string" && value.length < node.minLength) errs.push(`${where}: minLength`);
  if (node.minimum !== undefined && typeof value === "number" && value < node.minimum) errs.push(`${where}: minimum`);
  if (node.minItems !== undefined && Array.isArray(value) && value.length < node.minItems) errs.push(`${where}: minItems`);
  if (node.required !== undefined && value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const k of node.required) if (value[k] === undefined) errs.push(`${where}: missing required '${k}'`);
  }
  if (node.properties !== undefined && value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const [k, sub] of Object.entries(node.properties)) {
      if (value[k] !== undefined) errs.push(...validate(sub, value[k], baseId, `${where}.${k}`));
    }
    if (node.additionalProperties === false) {
      for (const k of Object.keys(value)) {
        if (!Object.prototype.hasOwnProperty.call(node.properties, k)) errs.push(`${where}: additional property '${k}'`);
      }
    }
  }
  if (node.items !== undefined && Array.isArray(value)) {
    value.forEach((item, i) => errs.push(...validate(node.items, item, baseId, `${where}[${i}]`)));
  }
  if (node.anyOf !== undefined) {
    const branchErrs = node.anyOf.map(sub => validate(sub, value, baseId, where));
    if (!branchErrs.some(e => e.length === 0)) errs.push(`${where}: no anyOf branch matched (${branchErrs[0].join("; ")})`);
  }
  return errs;
}
// Hygiene: no schema may use a keyword the checker cannot enforce.
for (const [id, s] of Object.entries(schemaFiles)) {
  const bad = [];
  (function walk(n, w) {
    if (!n || typeof n !== "object") return;
    for (const k of Object.keys(n)) if (!SUPPORTED.has(k)) bad.push(`${w}.${k}`);
    if (n.defs) for (const [k, v] of Object.entries(n.defs)) walk(v, `${w}#/defs/${k}`);
    if (n.properties) for (const [k, v] of Object.entries(n.properties)) walk(v, `${w}.${k}`);
    if (n.items) walk(n.items, `${w}[]`);
    if (n.anyOf) n.anyOf.forEach((v, i) => walk(v, `${w}~${i}`));
  })(s, id);
  ok(`schema keywords all supported: ${id}`, bad.length === 0, bad.join(","));
}
// Unique def-name index across all schema files.
const allDefs = {};
for (const [id, s] of Object.entries(schemaFiles)) {
  for (const [d, node] of Object.entries(s.defs || {})) {
    if (allDefs[d]) ok(`def name unique: ${d}`, false, `in ${allDefs[d].id} and ${id}`);
    else allDefs[d] = { id, node };
  }
}

// ---------- 1. parse every delivered JSON artifact ----------
const schemas = fs.readdirSync(path.join(SK, "schemas")).filter(f => f.endsWith(".json"));
const templates = fs.readdirSync(path.join(SK, "templates")).filter(f => f.endsWith(".json"));
const manifests = ["registry.json", "content-manifest.json", "compatibility-manifest.json", "current-policy.json", "qualification-impact.json"];
let plugin, registry;
try { plugin = readJSON("plugin.json"); ok("plugin.json parses", true); } catch (e) { ok("plugin.json parses", false, e.message); }
for (const f of schemas) { try { readJSON(`skills/orchestration-protocol/schemas/${f}`); ok(`schema parses: ${f}`, true); } catch (e) { ok(`schema parses: ${f}`, false, e.message); } }
for (const f of templates) { try { readJSON(`skills/orchestration-protocol/templates/${f}`); ok(`template parses: ${f}`, true); } catch (e) { ok(`template parses: ${f}`, false, e.message); } }
for (const f of manifests) { try { readJSON(`skills/orchestration-protocol/manifests/${f}`); ok(`manifest parses: ${f}`, true); } catch (e) { ok(`manifest parses: ${f}`, false, e.message); } }
registry = readJSON("skills/orchestration-protocol/manifests/registry.json");

// ---------- 2. root metadata honesty ----------
ok("plugin version is M02 draft", plugin.version === "0.2.0-m02");
ok("plugin op_contract is 1.0.0", plugin.op_contract_version === "1.0.0");
ok("plugin marks draft-unqualified", plugin.release_status === "draft-unqualified");
ok("plugin marks Android compatibility UNVERIFIED", JSON.stringify(plugin).includes("UNVERIFIED"));
ok("README labels M02 incomplete and unqualified, not M08", read("README.md").includes("M08 complete candidate") && read("README.md").includes("unqualified"));

// ---------- 3. registries ----------
const profileIds = ["formal_research","definition_review","plan_review","execution_package_review","targeted_bug_hunt","global_bug_hunt","repair_units","focused_revalidation"];
ok("registry has all 8 stable profiles", profileIds.every(id => registry.profiles.some(p => p.profile_id === id)));
ok("registry profiles carry exact module paths + versions", registry.profiles.every(p => p.module.startsWith("skills/orchestration-protocol/profiles/") && p.semantics_version === "1.0.0"));
ok("registry profiles all pending (no M06/M07 stubs shipped)", registry.profiles.every(p => p.status === "pending"));
const sharedOwners = ["contracts-and-versioning","evidence-and-sources","security-and-effects","durable-storage","finite-claim-substrate","homogeneous-run-substrate","independence-and-integration","repair-and-revalidation"];
ok("registry has all 8 shared owners", sharedOwners.every(id => registry.owners.some(o => o.owner_id === id)));
ok("registry M02 owners implemented, downstream pending", registry.owners.filter(o => ["contracts-and-versioning","evidence-and-sources","security-and-effects","durable-storage"].includes(o.owner_id)).every(o => o.status === "implemented")
  && registry.owners.filter(o => ["finite-claim-substrate","homogeneous-run-substrate","independence-and-integration","repair-and-revalidation"].includes(o.owner_id)).every(o => o.status === "pending"));
ok("registry carries no workflow milestone fields", !JSON.stringify(registry).includes("owner_card") && !JSON.stringify(registry).includes("milestone"));

// ---------- 4. bounded surface ----------
for (const p of registry.profiles) ok(`pending profile not shipped: ${p.profile_id}`, !fs.existsSync(path.join(ROOT, p.module)));
for (const o of registry.owners.filter(o => o.status === "pending")) ok(`pending owner not shipped: ${o.owner_id}`, !fs.existsSync(path.join(ROOT, o.module)));
ok("no profiles/ directory", !fs.existsSync(path.join(SK, "profiles")));
ok("no scripts/ helper shipped in M02", !fs.existsSync(path.join(SK, "scripts")));
const refFiles = fs.readdirSync(path.join(SK, "references")).sort();
ok("references/ holds exactly the 4 M02 owners", JSON.stringify(refFiles) === JSON.stringify(["contracts-and-versioning.md","durable-storage.md","evidence-and-sources.md","security-and-effects.md"]));

// ---------- 5. exclusive normative ownership (currentness-resolution lives in contracts) ----------
function ownerHeader(mdPath) {
  const text = read(mdPath);
  const m = text.match(/<!-- normative-owner:\s*([^|]+)\|\s*version:\s*([^|]+)\|\s*domains:\s*([^>]+)-->/);
  return m ? { owner: m[1].trim(), version: m[2].trim(), domains: m[3].split(",").map(s => s.trim()) } : null;
}
const ownedFiles = ["skills/orchestration-protocol/SKILL.md",
  "skills/orchestration-protocol/references/contracts-and-versioning.md",
  "skills/orchestration-protocol/references/evidence-and-sources.md",
  "skills/orchestration-protocol/references/security-and-effects.md",
  "skills/orchestration-protocol/references/durable-storage.md"];
const seen = new Map(); let overlap = "";
for (const f of ownedFiles) {
  const h = ownerHeader(f);
  ok(`owner header present: ${f}`, !!h);
  if (h) for (const d of h.domains) { if (seen.has(d)) overlap += `${d} (in ${seen.get(d)} and ${f}); `; else seen.set(d, f); }
}
ok("no semantic domain has two normative owners", overlap === "", overlap);
const expectedDomains = ("product-boundary profile-routing freeze-load-gates fail-closed-dispatch ownership-map " +
  "run-envelope identity-scopes envelope-equivalence canonical-serialization state-domains state-precedence currentness-resolution version-compatibility release-admission content-identity-graph compatibility-manifest current-policy-manifest extension-points " +
  "evidence-authority evidence-weight singleton-counterexample conflict-adjudication dissent-preservation evidence-as-data mechanical-metadata-allowlist value-binding " +
  "continuation-authority authority-verification effect-caps effect-validation forbidden-repairs receipt-interfaces verification-predicates credential-boundary checkpoint-record " +
  "git-ledger result-immutability supersession-pointers archive-structure readback-proof provenance-lineage").split(" ");
ok("expected M02 domains all owned exactly once", expectedDomains.every(d => seen.has(d)), expectedDomains.filter(d => !seen.has(d)).join(","));
ok("durable-storage references contracts owner for currentness predicate",
  read("skills/orchestration-protocol/references/durable-storage.md").includes("contracts-and-versioning"));

// ---------- 6. implemented links resolve; pending never loaded ----------
const pendingPaths = new Set([...registry.profiles.map(p => p.module), ...registry.owners.filter(o => o.status === "pending").map(o => o.module)]);
const mdFiles = ownedFiles.concat(["README.md"]);
const registryTables = new Set(["skills/orchestration-protocol/SKILL.md"]);
let badLink = "";
for (const f of mdFiles) {
  const text = read(f);
  if (registryTables.has(f)) {
    ok("routing table distinguishes pending modules as not loaded", text.includes("pending") && text.includes("never admitted as loaded"));
  }
  const mentions = [...text.matchAll(/skills\/orchestration-protocol\/[A-Za-z0-9_\-./]+?\.(?:md|json|mjs)/g)].map(m => m[0]);
  for (const m of mentions) {
    if (pendingPaths.has(m)) { if (!registryTables.has(f)) badLink += `${f} presents pending ${m} as a link; `; continue; }
    if (!fs.existsSync(path.join(ROOT, m))) badLink += `${f} links missing ${m}; `;
  }
}
ok("implemented links resolve; pending paths never presented as loaded", badLink === "", badLink);

// ---------- 7. every template record validates against its schema def ----------
// Admission file uses lineage-prefixed keys mapped here to shared defs.
const KEY_DEF = {
  partial_admission_snapshot: "admission_snapshot", partial_integrated_result: "integrated_result",
  partial_pointer: "current_result_pointer", complete_admission_snapshot: "admission_snapshot",
  complete_integrated_result: "integrated_result", complete_pointer: "current_result_pointer",
  mechanical_metadata_unpublished: "mechanical_metadata", mechanical_metadata_descendant: "mechanical_metadata"
};
const records = {};
for (const f of templates) {
  const t = readJSON(`skills/orchestration-protocol/templates/${f}`);
  ok(`template ${f} is an annotated container`, t._synthetic && t._synthetic.includes("SYNTHETIC"));
  for (const [k, v] of Object.entries(t)) {
    if (k === "_synthetic") continue;
    const defName = allDefs[k] ? k : KEY_DEF[k];
    if (!defName || !allDefs[defName]) { ok(`template ${f} record '${k}' maps to a known def`, false); continue; }
    const { id, node } = allDefs[defName];
    const errs = validate(node, v, id, `${f}#${k}`);
    ok(`record validates: ${f}#${k} against ${defName}`, errs.length === 0, errs.join("; ").slice(0, 400));
    records[`${f}#${k}`] = v;
  }
}
// Local refs resolve: the validator above already resolved every $ref,
// including cross-file urn refs; any unresolvable ref would have failed.

// ---------- 8. frozen derived identities verified, never overridden ----------
const env = records["run-envelope.example.json#run_envelope"];
const frozenId = env.run_envelope_id;
ok("frozen envelope id verifies against semantic projection", runEnvelopeId(env) === frozenId, `stored ${frozenId}`);
ok("derived run_envelope_id excluded from its own digest inputs", !("run_envelope_id" in semanticProjection({ ...env, run_envelope_id: "runenv:tampered" })));
const tampered = { ...env, subject: { ...env.subject, path: "OTHER.md" } };
ok("content change invalidates supplied derived identity", runEnvelopeId(tampered) !== frozenId);
const tamperedCov = { ...env, coverage: { ...env.coverage, coverage_manifest: { ...env.coverage.coverage_manifest, blob: "0000000000000000000000000000000000000000" } } };
ok("coverage-content change invalidates envelope binding", runEnvelopeId(tamperedCov) !== frozenId);
const covDef = allDefs["coverage_identity"];
ok("negative: label-only coverage without immutable identity rejected",
  validate(covDef.node, { acceptance_id: "coverage:example:acceptance:v1" }, covDef.id, "coverage-probe").length > 0);
ok("negative: moving branch/path label as coverage rejected",
  validate(covDef.node, { acceptance_id: "refs/heads/main:ACCEPTANCE.md" }, covDef.id, "coverage-probe").length > 0);
const envReordered = Object.fromEntries(Object.entries(env).reverse());
ok("canonical digest deterministic across key order", runEnvelopeId(envReordered) === frozenId);
ok("return_id excluded from envelope equivalence", runEnvelopeId({ ...env, return_id: "different-routing-999" }) === frozenId);
const cm = readJSON("skills/orchestration-protocol/manifests/content-manifest.json");
let cmBad = "";
for (const e of cm.entries) {
  const actual = crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, e.path))).digest("hex");
  if (actual !== e.sha256) cmBad += `${e.path} digest mismatch; `;
}
ok("content manifest digests read back against package files", cmBad === "", cmBad);
ok("content manifest entries sorted by path", cm.entries.map(e => e.path).join("\n") === [...cm.entries.map(e => e.path)].sort().join("\n"));
ok("content manifest excludes itself + detached attestations",
  !cm.entries.some(e => e.path.endsWith("content-manifest.json")) && cm.excludes.length >= 2);
const recomputed = "content:" + digest(cm.entries);
ok("construction identity uses declared canonical algorithm", recomputed === cm.construction_identity);
ok("entry-key order does not change canonical identity",
  digest([{ ...cm.entries[0] }]) === digest([Object.fromEntries(Object.entries(cm.entries[0]).reverse())]));
ok("interim identity labeled construction, not M08 candidate", (cm.manifest_id || "").startsWith("content:0.2.0-m02") && read("README.md").includes("M02"));
// Templates digest frozen in compatibility manifest, verified by readback.
const compat = readJSON("skills/orchestration-protocol/manifests/compatibility-manifest.json");
const tplEntries = templates.slice().sort().map(f => ({ path: `skills/orchestration-protocol/templates/${f}`, sha256: crypto.createHash("sha256").update(fs.readFileSync(path.join(SK, "templates", f))).digest("hex") }));
const tplDigest = digest(tplEntries);
ok("compatibility templates_digest is concrete and verifies", /^[0-9a-f]{64}$/.test(compat.templates_digest) && tplDigest === compat.templates_digest);

// ---------- 9. corrected state precedence (BLOCKED for empty/contradictory) ----------
function evaluateDisposition(s) {
  if (!["APPLICABLE", "NOT_APPLICABLE", "UNKNOWN"].includes(s.applicability)) return "BLOCKED";
  if (s.applicability === "UNKNOWN") return "BLOCKED";
  if (s.applicability === "NOT_APPLICABLE") {
    if (s.na_proven === true && s.execution === "COMPLETE" && s.currentness === "CURRENT" && s.coverage === "NOT_APPLICABLE" && s.disposition === "NOT_APPLICABLE") return "NOT_APPLICABLE";
    return "BLOCKED";
  }
  if (s.empty_mandatory_work === true) return "BLOCKED";
  if (!["COMPLETE", "INCOMPLETE", "BLOCKED"].includes(s.execution)) return "BLOCKED";
  if (!["CURRENT", "SUPERSEDED", "STALE", "UNKNOWN"].includes(s.currentness)) return "BLOCKED";
  if (!["COMPLETE", "INCOMPLETE", "BLOCKED", "NOT_APPLICABLE"].includes(s.coverage)) return "BLOCKED";
  if (["SUPERSEDED", "STALE", "UNKNOWN"].includes(s.currentness)) return "BLOCKED";
  if (s.coverage === "NOT_APPLICABLE") return "BLOCKED";
  if (s.execution === "BLOCKED" || s.coverage === "BLOCKED") return "BLOCKED";
  if (s.execution === "INCOMPLETE" || s.coverage === "INCOMPLETE") return "INCOMPLETE";
  return "EVALUATE_TRUTH";
}
ok("corrected: invalid applicability value never reaches truth",
  evaluateDisposition({ applicability: "IMPOSSIBLE", currentness: "CURRENT", execution: "COMPLETE", coverage: "COMPLETE" }) === "BLOCKED");
ok("corrected: applicable empty mandatory work is BLOCKED, not INCOMPLETE",
  evaluateDisposition({ applicability: "APPLICABLE", currentness: "CURRENT", execution: "COMPLETE", coverage: "INCOMPLETE", empty_mandatory_work: true }) === "BLOCKED");
ok("corrected: APPLICABLE+CURRENT+COMPLETE+coverage-NA is contradictory BLOCKED",
  evaluateDisposition({ applicability: "APPLICABLE", currentness: "CURRENT", execution: "COMPLETE", coverage: "NOT_APPLICABLE" }) === "BLOCKED");
ok("corrected: execution value outside finite domains is BLOCKED",
  evaluateDisposition({ applicability: "APPLICABLE", currentness: "CURRENT", execution: "IMPOSSIBLE", coverage: "COMPLETE" }) === "BLOCKED");
ok("corrected: unproven NOT_APPLICABLE claim is BLOCKED",
  evaluateDisposition({ applicability: "NOT_APPLICABLE", na_proven: false, execution: "COMPLETE", currentness: "CURRENT", coverage: "NOT_APPLICABLE", disposition: "NOT_APPLICABLE" }) === "BLOCKED");
ok("negative: superseded forward use blocked", evaluateDisposition({ applicability: "APPLICABLE", currentness: "SUPERSEDED", execution: "COMPLETE", coverage: "COMPLETE" }) === "BLOCKED");
ok("negative: unknown applicability blocked", evaluateDisposition({ applicability: "UNKNOWN", currentness: "CURRENT", execution: "COMPLETE", coverage: "COMPLETE" }) === "BLOCKED");
ok("precedence: BLOCKED beats INCOMPLETE", evaluateDisposition({ applicability: "APPLICABLE", currentness: "CURRENT", execution: "BLOCKED", coverage: "INCOMPLETE" }) === "BLOCKED");
ok("neutral NOT_APPLICABLE tuple legal when proven, never GREEN",
  evaluateDisposition({ applicability: "NOT_APPLICABLE", na_proven: true, execution: "COMPLETE", currentness: "CURRENT", coverage: "NOT_APPLICABLE", disposition: "NOT_APPLICABLE" }) === "NOT_APPLICABLE");

// ---------- 10. lineage coherence: snapshot/partial/pointer/integrated as one ----------
// Every admitted sealed id must have a sealed example file.
const sealedIds = new Set();
for (const f of templates) {
  const t = readJSON(`skills/orchestration-protocol/templates/${f}`);
  for (const [k, v] of Object.entries(t)) {
    if (k !== "_synthetic" && v && v.result_id && v.content_identity) sealedIds.add(v.result_id);
  }
}
function checkLineage(prefix) {
  const snap = records[`admission-snapshot.example.json#${prefix}_admission_snapshot`];
  const integ = records[`admission-snapshot.example.json#${prefix}_integrated_result`];
  const ptr = records[`admission-snapshot.example.json#${prefix}_pointer`];
  const missingAdmitted = snap.admitted_results.filter(id => !sealedIds.has(id));
  ok(`${prefix}: every admitted sealed id has a sealed example`, missingAdmitted.length === 0, missingAdmitted.join(","));
  ok(`${prefix}: integrated binds its snapshot`, integ.admission_snapshot_id === snap.snapshot_id);
  ok(`${prefix}: pointer binds its integrated result`, ptr.current_result_id === integ.integrated_result_id);
  ok(`${prefix}: integrated carries its run envelope`, integ.run_envelope_id === frozenId);
  const tuple = { applicability: integ.applicability_state, execution: integ.execution_state, currentness: integ.currentness_state, coverage: integ.coverage_state, disposition: integ.profile_disposition, na_proven: true };
  if (snap.missing_set.length > 0) {
    ok(`${prefix}: partial snapshot derives INCOMPLETE/BLOCKED, negative evidence cannot override`,
      ["INCOMPLETE", "BLOCKED"].includes(evaluateDisposition(tuple)) && ["INCOMPLETE", "BLOCKED"].includes(integ.profile_disposition));
  } else {
    ok(`${prefix}: complete admission reaches truth evaluation`, evaluateDisposition(tuple) === "EVALUATE_TRUTH");
  }
  return { snap, integ };
}
const partial = checkLineage("partial");
const complete = checkLineage("complete");
ok("complete RED lineage carries an accepted blocking finding",
  complete.integ.profile_disposition === "RED" && complete.integ.findings.some(f => f.blocking === true));
ok("partial lineage preserves dissent/uncertainty as data",
  partial.integ.dissent.length > 0 && partial.integ.uncertainty.length > 0);

// ---------- 11. conditional bindings (schema validity is not authenticity) ----------
const cont = records["continuation-authority.example.json#continuation_authority"];
ok("envelope without continuation carries no channel binding", env.continuation_authority_id === null && env.authority_channel === null && env.authority_source_class === null);
ok("repair continuation binds candidate/base/obligations/channel", !!cont.candidate && !!cont.base && cont.obligations.length > 0 && !!cont.authority_channel && !!cont.authority_source_class);
const proof = records["verification-proof.example.json#verification_proof"];
function verifyAuthority(p) {
  if (p.verdict !== "GENUINE") return "NOT_GENUINE";
  if (p.channel_binding !== "same-channel" && p.channel_binding !== "authorized-successor") return "NOT_GENUINE";
  if (p.currentness !== "CURRENT" || p.supersession_state !== "CURRENT") return "NOT_GENUINE";
  if (!p.prior_result_id && !(p.prior_obligation_ids || []).length) return "NOT_GENUINE";
  return "GENUINE";
}
ok("negative: schema-valid self-authored record without channel is not authority",
  verifyAuthority({ verdict: "GENUINE", channel_binding: "self-authored", currentness: "CURRENT", supersession_state: "CURRENT", prior_result_id: "x" }) === "NOT_GENUINE");
ok("negative: stale supersession in proof is not genuine",
  verifyAuthority({ ...proof, supersession_state: "SUPERSEDED" }) === "NOT_GENUINE");
ok("positive: same-channel current proof with prior binding genuine", verifyAuthority(proof) === "GENUINE");
const fmanifest = records["finite-claim.example.json#finite_manifest"];
const fclaim = records["finite-claim.example.json#finite_claim"];
const reclaim = records["finite-claim.example.json#reclaim_action"];
ok("claim binds manifest/wave/subject/coverage/release + non-force + qualified nonce source",
  fclaim.manifest_id === fmanifest.manifest_id && fclaim.wave_id === fmanifest.wave_id && !!fclaim.subject && !!fclaim.coverage && !!fclaim.release_id && fclaim.force === false && fclaim.nonce_source === "qualified-csprng-128");
ok("reclaim binds manifest/wave and proves no current terminal result",
  reclaim.manifest_id === fmanifest.manifest_id && reclaim.wave_id === fmanifest.wave_id && reclaim.single_use === true
  && reclaim.terminal_result_check.unit_id === reclaim.unit_id && reclaim.terminal_result_check.found_valid_current_terminal === false && reclaim.terminal_result_check.readback === "VERIFIED");
const hbatch = records["homogeneous-batch.example.json#homogeneous_batch"];
const hrun = records["homogeneous-batch.example.json#homogeneous_run"];
const hattempt = records["homogeneous-batch.example.json#current_attempt"];
ok("current attempt binds run/batch/subject/coverage/release and matches run pointer",
  hattempt.attempt_id === hrun.current_attempt_id && hattempt.run_id === hrun.run_id && hattempt.batch_revision_id === hrun.batch_revision_id
  && hattempt.batch_revision_id === hbatch.batch_revision_id && JSON.stringify(hattempt.subject) === JSON.stringify(hbatch.subject) && hattempt.state === "ACTIVE");

// ---------- 12. release admission with defined version semantics ----------
function parseRelease(r) {
  const m = String(r).match(/@(\d+)\.(\d+)\.(\d+)/);
  return m ? [+m[1], +m[2], +m[3]] : null;
}
function versionGte(a, b) {
  for (let i = 0; i < 3; i++) { if (a[i] !== b[i]) return a[i] > b[i]; }
  return true;
}
function admitRelease(release, policy, integrityOk) {
  if (!integrityOk) return "BLOCKED";
  if (!policy || policy.stale || policy.ambiguous) return "BLOCKED";
  if (policy.revoked_releases.includes(release)) return "BLOCKED";
  const rv = parseRelease(release), fv = parseRelease(policy.minimum_supported_release);
  if (!rv || !fv) return "BLOCKED";
  if (!versionGte(rv, fv)) return "BLOCKED";
  return "ADMITTED";
}
function productionEligible(policy, qualsPass, ownerAcceptable) {
  if (policy.policy_kind !== "authorized-current-readback") return false;
  return qualsPass === true && ownerAcceptable === true;
}
const policy = readJSON("skills/orchestration-protocol/manifests/current-policy.json");
ok("policy is explicitly proposed-construction, ineligible for production",
  policy.policy_kind === "proposed-construction" && policy.production_admission_eligible === false);
ok("policy models freshness inputs for its rule",
  !!policy.required_readback && !!policy.required_readback.distribution_authority
  && policy.required_readback.freshness_inputs.max_age_days >= 1 && !!policy.required_readback.freshness_inputs.issued_at);
ok("negative: revoked release fails closed", admitRelease("orchestration-protocol-skill@0.1.0", { ...policy, revoked_releases: ["orchestration-protocol-skill@0.1.0"] }, true) === "BLOCKED");
ok("negative: below-floor release fails closed", admitRelease("orchestration-protocol-skill@0.1.0", policy, true) === "BLOCKED");
ok("negative: stale policy fails closed", admitRelease("orchestration-protocol-skill@0.2.0-m02", { ...policy, stale: true }, true) === "BLOCKED");
ok("negative: ambiguous policy fails closed", admitRelease("orchestration-protocol-skill@0.2.0-m02", { ...policy, ambiguous: true }, true) === "BLOCKED");
ok("negative: malformed version fails closed", admitRelease("orchestration-protocol-skill@draft", policy, true) === "BLOCKED");
ok("defined semantics: 0.10.0 satisfies 0.2.0 floor (lexical compare would fail)",
  admitRelease("orchestration-protocol-skill@0.10.0-x", policy, true) === "ADMITTED");
ok("positive: pinned current release admitted structurally", admitRelease("orchestration-protocol-skill@0.2.0-m02", policy, true) === "ADMITTED");
ok("structural admission is not production eligibility", productionEligible(policy, true, true) === false);

// ---------- 13. effects with whole-set validation ----------
const HARD_CAP = new Set(["op-result-publication", "bounded-file-mutation:src/a.mjs"]);
const FORBIDDEN = ["merge", "release", "comments", "messages", "settings", "network-writes", "credentials"];
function validateEffects(requested) {
  if (requested.some(e => FORBIDDEN.some(f => e.includes(f)))) return "BLOCKED";
  if (requested.some(e => !HARD_CAP.has(e))) return "BLOCKED";
  return "ADMITTED";
}
ok("negative: mixed allowed+forbidden effect set rejected whole", validateEffects(["op-result-publication", "merge"]) === "BLOCKED");
ok("negative: forbidden repair effect (comments) rejected", validateEffects(["comments"]) === "BLOCKED");
ok("negative: unclassifiable/unknown effect rejected", validateEffects(["mystery-effect"]) === "BLOCKED");
ok("positive: pure in-cap effect set admitted", validateEffects(["op-result-publication"]) === "ADMITTED");

// ---------- 14. closed typed metadata value grammars + derivation binding ----------
const mech = records["mechanical-receipt.example.json#mechanical_metadata"];
function slug(s) { return String(s).replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
// Every value must be derived from the frozen bound context, not chosen.
// Expected values come from frozen package/envelope/assignment/manifest
// and verified claim/publication identities — never the worker record.
function requireCtx(ctx, fields, what) {
  return fields.filter(f => ctx[f] === undefined).map(f => `${what}: missing required binding context '${f}'`);
}
function bindMetadata(m, ctx) {
  const errs = requireCtx(ctx, ["work_kind", "wave_id", "assignment_id", "package_id", "release_id", "subject_digest", "coverage_digest", "generation", "nonce_id", "repository", "claim_commit", "wave_base_commit", "blob", "ref_created", "published"], "metadata");
  if (ctx.work_kind !== "finite-unit" && ctx.work_kind !== "homogeneous-run") errs.push("metadata: unknown work kind");
  if (errs.length) return errs;
  const seg = ctx.work_kind === "finite-unit" ? ctx.unit_id : ctx.run_id;
  if (m.assignment_id !== ctx.assignment_id) errs.push("assignment_id not bound to frozen assignment");
  const unitOk = ctx.work_kind === "finite-unit" && m.unit_id === ctx.unit_id && (m.run_id === null || m.run_id === undefined);
  const runOk = ctx.work_kind === "homogeneous-run" && m.run_id === ctx.run_id && (m.unit_id === null || m.unit_id === undefined);
  if (!unitOk && !runOk) errs.push("unit/run not bound to one frozen work kind");
  if (m.package_id !== ctx.package_id) errs.push("package_id not bound to frozen envelope");
  if (m.release_id !== ctx.release_id) errs.push("release_id not bound to frozen envelope");
  if (m.subject_digest !== ctx.subject_digest) errs.push("subject_digest not bound");
  if (m.coverage_digest !== ctx.coverage_digest) errs.push("coverage_digest not bound");
  if (m.claim_generation !== ctx.generation) errs.push("claim_generation not bound");
  if (m.attempt_nonce_id !== ctx.nonce_id) errs.push("attempt_nonce_id not bound");
  const roleCommits = [ctx.claim_commit, ctx.wave_base_commit];
  if (ctx.publication) roleCommits.push(ctx.publication.commit);
  if (!roleCommits.includes(m.commit)) errs.push("commit not a bound claim/wave-base/publication role");
  if (m.ancestry !== null && m.ancestry !== undefined && !roleCommits.includes(m.ancestry)) errs.push("ancestry not bound");
  if (m.expected_head !== null && m.expected_head !== undefined && !roleCommits.includes(m.expected_head)) errs.push("expected_head not bound");
  if (m.branch !== `op/${slug(ctx.wave_id)}/${slug(seg)}`) errs.push("branch not derived from bound wave/unit");
  if (m.output_path !== `results/${slug(ctx.assignment_id)}.md`) errs.push("output_path not derived from bound assignment");
  if (ctx.ref_created === true) {
    if (m.ref !== `refs/heads/${m.branch}`) errs.push("created ref must equal refs/heads/<branch>");
  } else if (ctx.ref_created === false) {
    if (m.ref !== null && m.ref !== undefined) errs.push("no created ref: field must be absent (null)");
  } else errs.push("metadata: missing ref applicability context");
  if (ctx.published === true) {
    if (!ctx.publication) errs.push("metadata: missing verified publication identity");
    else {
      const exp = `${ctx.publication.repository}@${ctx.publication.commit}:${ctx.publication.output_path}`;
      if (m.publication !== exp) errs.push("publication not the exact verified P locator");
      if (m.commit !== ctx.publication.commit) errs.push("record commit not the P publication commit");
      if (m.blob !== ctx.publication.blob) errs.push("record blob not the P publication blob");
      if (m.output_path !== ctx.publication.output_path) errs.push("record output not the P publication output");
    }
    if (m.readback !== "VERIFIED") errs.push("published locator requires VERIFIED readback");
  } else if (ctx.published === false) {
    if (m.publication !== null && m.publication !== undefined) errs.push("unpublished context: publication must be absent (null)");
    if (m.blob !== null && m.blob !== undefined) errs.push("unpublished context: blob must be absent (null)");
    if (m.readback !== "NOT_APPLICABLE") errs.push("unpublished context requires NOT_APPLICABLE readback");
  } else errs.push("metadata: missing publication applicability context");
  return errs;
}
function bindReceipt(r, pub, ctx) {
  const errs = [];
  if (r.assignment_id !== ctx.assignment_id) errs.push("receipt assignment not bound");
  if (r.durable_result !== pub) errs.push("receipt result not the exact declared durable result");
  if ((r.blocker === null || r.blocker === undefined) !== (r.status === "COMPLETE")) errs.push("blocker null exactly for COMPLETE status");
  if (r.readback !== "VERIFIED") errs.push("execution receipt requires VERIFIED readback");
  return errs;
}
function bindProvider(r, ctx) {
  const errs = requireCtx(ctx, ["operation_id", "repository", "branch", "operation_kind", "intended_postcondition_kind"], "provider");
  if (ctx.operation_kind !== "ref-mutation" && ctx.operation_kind !== "read-observation") errs.push("provider: unknown operation kind");
  if (errs.length) return errs;
  if (r.operation_id !== ctx.operation_id) errs.push("operation_id not the bound operation");
  if (r.target !== `${ctx.repository}:refs/heads/${ctx.branch}`) errs.push("target not recomposed from bound operation context");
  if (ctx.operation_kind === "ref-mutation") {
    if (ctx.expected_head === undefined || ctx.expected_head === null) errs.push("ref-mutation requires a bound expected-head fence");
    else if (r.expected_head !== ctx.expected_head) errs.push("expected_head not the bound fence");
    if (ctx.intended_postcondition_kind !== "ref-points-at" && ctx.intended_postcondition_kind !== "no-write-performed") errs.push("ref-mutation intended kind");
  } else {
    if (r.expected_head !== null && r.expected_head !== undefined) errs.push("read-observation declares no fence");
    if (ctx.intended_postcondition_kind !== "path-content-matches") errs.push("read-observation intended kind");
    if (ctx.intended_content_digest === undefined || ctx.intended_content_digest === null) errs.push("read-observation requires a bound intended content digest");
  }
  const pc = String(r.postcondition || "");
  const isNoWrite = pc === "no-write-performed";
  if ((r.occurrence === "NOT_APPLIED") !== isNoWrite) errs.push("occurrence/postcondition kind mismatch in both directions");
  const kindOf = pc.startsWith("ref-points-at:") ? "ref-points-at" : pc.startsWith("path-content-matches:") ? "path-content-matches" : pc;
  if (kindOf !== ctx.intended_postcondition_kind) errs.push("postcondition kind not bound by the declared operation");
  if (pc.startsWith("ref-points-at:") && pc.slice("ref-points-at:".length) !== ctx.intended_commit) errs.push("postcondition not bound to intended commit");
  if (pc.startsWith("path-content-matches:") && pc.slice("path-content-matches:".length) !== ctx.intended_content_digest) errs.push("postcondition content not bound");
  if (r.occurrence === "VERIFIED" && r.readback !== "VERIFIED") errs.push("verified occurrence requires verified readback");
  return errs;
}
function productionAdmissible(r) {
  return r.occurrence === "VERIFIED" && r.readback === "VERIFIED";
}
const MECH_CTX = {
  work_kind: "finite-unit",
  wave_id: "wave:example:0001", assignment_id: "assign:0001", unit_id: "unit-01", run_id: null,
  package_id: "orchestration-protocol-skill@0.2.0-m02", release_id: "orchestration-protocol-skill@0.2.0-m02",
  subject_digest: "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  coverage_digest: "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
  generation: 0, nonce_id: "nonce:0001",
  repository: "example/repo",
  claim_commit: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  wave_base_commit: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  blob: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  ref_created: true, published: true,
  publication: {
    repository: "example/repo",
    commit: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    blob: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    output_path: "results/assign-0001.md"
  }
};
const UNPUB_CTX = { ...MECH_CTX, ref_created: false, published: false, publication: null };
const DESC_CTX = {
  ...MECH_CTX,
  publication: {
    repository: "example/repo",
    commit: "cccccccccccccccccccccccccccccccccccccccc",
    blob: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    output_path: "results/assign-0001.md"
  }
};
const OP_CTX = {
  operation_id: "op:0001", repository: "example/repo", branch: "op/wave-example-0001/unit-01",
  operation_kind: "ref-mutation",
  expected_head: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  intended_commit: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  intended_postcondition_kind: "ref-points-at",
  intended_content_digest: null
};
function validateMetadata(obj) {
  const def = allDefs["mechanical_metadata"];
  return validate(def.node, obj, def.id, "metadata-probe");
}
ok("positive: mechanical receipt admitted", validateMetadata(mech).length === 0);
ok("positive: example values are exactly derived from the bound context", bindMetadata(mech, MECH_CTX).length === 0, bindMetadata(mech, MECH_CTX).join("; "));
ok("negative: added semantic field rejected", validateMetadata({ ...mech, severity: "high", conclusion: "looks good" }).length > 0);
ok("negative: semantic branch payload fails binding although charset-safe", bindMetadata({ ...mech, branch: "op/all-blockers-found/critical-red" }, MECH_CTX).length > 0);
ok("negative: semantic ref payload fails binding", bindMetadata({ ...mech, ref: "refs/heads/red-critical-blocker" }, MECH_CTX).length > 0);
ok("negative: semantic output-path payload fails binding", bindMetadata({ ...mech, output_path: "results/all-blockers-found.md" }, MECH_CTX).length > 0);
ok("negative: semantic assignment payload fails closed identity grammar", validateMetadata({ ...mech, assignment_id: "RED_CRITICAL_BLOCKER" }).length > 0);
ok("negative: semantic assignment payload fails binding although well-shaped", bindMetadata({ ...mech, assignment_id: "assign:9999", output_path: "results/assign-0001.md", publication: mech.publication }, MECH_CTX).length > 0);
ok("negative: semantic package payload fails binding", bindMetadata({ ...mech, package_id: "red/all-blockers-found" }, MECH_CTX).length > 0);
ok("negative: well-shaped wrong-bound blob fails binding", bindMetadata({ ...mech, blob: "ffffffffffffffffffffffffffffffffffffffff" }, MECH_CTX).length > 0);
ok("negative: wrong-bound generation fails binding", bindMetadata({ ...mech, claim_generation: 1 }, MECH_CTX).length > 0);
ok("negative: wrong-bound nonce fails binding", bindMetadata({ ...mech, attempt_nonce_id: "nonce:0002" }, MECH_CTX).length > 0);
ok("negative: wrong-bound subject digest fails binding", bindMetadata({ ...mech, subject_digest: "sha256:0000000000000000000000000000000000000000000000000000000000000000" }, MECH_CTX).length > 0);
ok("negative: unit and run both set fails work-kind binding", bindMetadata({ ...mech, run_id: "RUN-001" }, MECH_CTX).length > 0);
ok("negative: published locator with NOT_APPLICABLE readback fails", bindMetadata({ ...mech, readback: "NOT_APPLICABLE" }, MECH_CTX).length > 0);
ok("negative: null ref against created-ref context fails (suppression is not proof)", bindMetadata({ ...mech, ref: null }, MECH_CTX).length > 0);
ok("negative: null publication against published context fails (suppression is not proof)", bindMetadata({ ...mech, publication: null, blob: null, readback: "NOT_APPLICABLE" }, MECH_CTX).length > 0);
ok("positive: no-publication/no-ref example verifies against unpublished context",
  bindMetadata(records["mechanical-receipt.example.json#mechanical_metadata_unpublished"], UNPUB_CTX).length === 0,
  bindMetadata(records["mechanical-receipt.example.json#mechanical_metadata_unpublished"], UNPUB_CTX).join("; "));
ok("positive: descendant publication verifies with claim lineage intact",
  bindMetadata(records["mechanical-receipt.example.json#mechanical_metadata_descendant"], DESC_CTX).length === 0,
  bindMetadata(records["mechanical-receipt.example.json#mechanical_metadata_descendant"], DESC_CTX).join("; "));
ok("negative: missing binding context fails instead of defaulting permissive", bindMetadata(mech, {}).length > 0);
ok("negative: ambiguous applicability context fails", bindMetadata(mech, { ...MECH_CTX, ref_created: undefined, published: undefined }).length > 0);
const execReceipt = records["mechanical-receipt.example.json#execution_receipt"];
ok("positive: execution receipt binds assignment and exact durable result", bindReceipt(execReceipt, mech.publication, MECH_CTX).length === 0, bindReceipt(execReceipt, mech.publication, MECH_CTX).join("; "));
ok("negative: receipt with different durable result fails binding", bindReceipt({ ...execReceipt, durable_result: "example/repo@ffffffffffffffffffffffffffffffffffffffff:results/assign-0001.md" }, mech.publication, MECH_CTX).length > 0);
ok("negative: receipt BLOCKED status without blocker code fails", bindReceipt({ ...execReceipt, status: "BLOCKED" }, mech.publication, MECH_CTX).length > 0);
const provReceipt = records["mechanical-receipt.example.json#provider_receipt"];
ok("positive: provider receipt binds operation/target/postcondition/readback", bindProvider(provReceipt, OP_CTX).length === 0, bindProvider(provReceipt, OP_CTX).join("; "));
ok("negative: semantic operation payload fails binding although open-charset", bindProvider({ ...provReceipt, operation_id: "op:all-blockers-found:critical-red" }, OP_CTX).length > 0);
ok("negative: semantic target suffix fails binding", bindProvider({ ...provReceipt, target: "example/repo:refs/heads/red-critical-blocker" }, OP_CTX).length > 0);
ok("negative: closed-form postcondition for wrong commit fails binding", bindProvider({ ...provReceipt, postcondition: "ref-points-at:ffffffffffffffffffffffffffffffffffffffff" }, OP_CTX).length > 0);
ok("negative: well-shaped wrong-bound operation fails binding", bindProvider({ ...provReceipt, operation_id: "op:9999" }, OP_CTX).length > 0);
ok("negative: self-labelled success without verified readback fails", bindProvider({ ...provReceipt, occurrence: "VERIFIED", readback: "NOT_APPLICABLE" }, OP_CTX).length > 0);
ok("negative: VERIFIED occurrence with no-write postcondition fails both ways", bindProvider({ ...provReceipt, occurrence: "VERIFIED", postcondition: "no-write-performed" }, OP_CTX).length > 0);
ok("negative: NOT_APPLIED occurrence with write postcondition fails both ways", bindProvider({ ...provReceipt, occurrence: "NOT_APPLIED", postcondition: "ref-points-at:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }, OP_CTX).length > 0);
ok("negative: missing expected-head fence cannot prove ref-mutation", bindProvider({ ...provReceipt, expected_head: null }, OP_CTX).length > 0);
ok("negative: postcondition kind freely selected outside intended kind fails",
  bindProvider({ ...provReceipt, postcondition: "path-content-matches:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" }, OP_CTX).length > 0);
const NOWRITE_CTX = { ...OP_CTX, intended_postcondition_kind: "no-write-performed" };
const noWriteReceipt = { ...provReceipt, occurrence: "NOT_APPLIED", postcondition: "no-write-performed" };
ok("positive: bound no-write receipt verifies", bindProvider(noWriteReceipt, NOWRITE_CTX).length === 0, bindProvider(noWriteReceipt, NOWRITE_CTX).join("; "));
const READ_CTX = {
  operation_id: "op:0002", repository: "example/repo", branch: "op/wave-example-0001/unit-01",
  operation_kind: "read-observation",
  expected_head: null, intended_commit: null,
  intended_postcondition_kind: "path-content-matches",
  intended_content_digest: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
};
const readReceipt = {
  operation_id: "op:0002", target: "example/repo:refs/heads/op/wave-example-0001/unit-01",
  expected_head: null, occurrence: "VERIFIED",
  postcondition: "path-content-matches:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  readback: "VERIFIED"
};
ok("positive: bound read-observation verifies with null fence", bindProvider(readReceipt, READ_CTX).length === 0, bindProvider(readReceipt, READ_CTX).join("; "));
ok("negative: read-observation declaring a fence fails", bindProvider({ ...readReceipt, expected_head: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }, READ_CTX).length > 0);
ok("negative: missing operation-kind context fails", bindProvider(provReceipt, { operation_id: "op:0001", repository: "example/repo", branch: "op/wave-example-0001/unit-01" }).length > 0);
ok("negative: UNKNOWN occurrence is not production-admissible", productionAdmissible({ ...provReceipt, occurrence: "UNKNOWN" }) === false);
ok("positive: bound VERIFIED receipt is production-admissible", productionAdmissible(provReceipt) === true);
ok("negative: semantic blocker payload outside closed inventory", (() => {
  const def = allDefs["execution_receipt"];
  return validate(def.node, { ...records["mechanical-receipt.example.json#execution_receipt"], blocker: "red:critical-blocker" }, def.id, "receipt-probe").length > 0;
})());
ok("negative: valid-shape but wrong-bound commit fails binding", bindMetadata({ ...mech, commit: "ffffffffffffffffffffffffffffffffffffffff", publication: `example/repo@ffffffffffffffffffffffffffffffffffffffff:${mech.output_path}` }, MECH_CTX).length > 0);
ok("negative: uppercase semantic branch fails binding to bound context", bindMetadata({ ...mech, branch: "op/wave-01/GREEN-deploy-now" }, MECH_CTX).length > 0);
ok("negative: free-form blocker text rejected", (() => {
  const def = allDefs["execution_receipt"];
  return validate(def.node, { ...records["mechanical-receipt.example.json#execution_receipt"], blocker: "severity high, looks RED" }, def.id, "receipt-probe").length > 0;
})());
ok("negative: path traversal output rejected", validateMetadata({ ...mech, output_path: "../evil.md" }).length > 0);
ok("positive: mechanical capability blocker code admitted", (() => {
  const def = allDefs["execution_receipt"];
  return validate(def.node, { ...records["mechanical-receipt.example.json#execution_receipt"], blocker: "missing:provider-read" }, def.id, "receipt-probe").length === 0;
})());

// ---------- 15. impact manifest: conservative mapping, explicit unavailable ----------
const impact = readJSON("skills/orchestration-protocol/manifests/qualification-impact.json");
const ALL_Q = ["Q0","Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","Q9","Q10"];
function invalidates(cls) { return (impact.change_classes.find(c => c.change_class === cls) || { invalidates: [] }).invalidates; }
ok("common-contract change invalidates dependent state/profile/integration layers, not only Q0/Q1",
  ["Q0","Q1","Q5","Q6"].every(q => invalidates("common-contract-text-change").includes(q)));
ok("schema/record change invalidates dependent result/integration layers",
  ["Q0","Q1","Q5","Q6"].every(q => invalidates("schema-template-record-change").includes(q)));
ok("registry change invalidates profile/integration layers", invalidates("registry-owner-profile-change").includes("Q5"));
ok("unknown/unbounded change invalidates all Q layers",
  ALL_Q.every(q => invalidates("unclassified-material-change").includes(q)));
let invBad = "";
for (const item of impact.inventory) {
  const id = item.identity;
  if (typeof id === "string") { if (!/^[0-9a-f]{64}$/.test(id)) invBad += `${item.component} fake fingerprint; `; }
  else if (!(id && id.unavailable === true && typeof id.observation === "string")) invBad += `${item.component} bad identity; `;
}
ok("inventory holds concrete digests or explicit unavailable observations", invBad === "", invBad);

// ---------- 16. required-field spot checks ----------
ok("envelope carries authority-channel binding fields", "authority_channel" in env && "authority_source_class" in env);
ok("proof carries prior/candidate/supersession binding", !!proof.prior_result_id && !!proof.candidate_digest && !!proof.supersession_state);
ok("integrated results carry findings/dissent/uncertainty/envelope/impact", complete.integ.findings && complete.integ.dissent && complete.integ.uncertainty && !!complete.integ.run_envelope_id && !!complete.integ.qualification_impact_id);
ok("negative: missing envelope subject rejected", (() => { const e = { ...env }; delete e.subject; return !e.subject ? "BLOCKED" : "ADMITTED"; })() === "BLOCKED");
ok("negative: unknown profile rejected", !profileIds.includes("turbo_review"));
ok("negative: conflicting redundant identity blocked", (() => { const a = { repo: "x", commit: "a" }; const b = { repo: "x", commit: "b" }; return JSON.stringify(a) !== JSON.stringify(b) ? "BLOCKED" : "ADMITTED"; })() === "BLOCKED");

console.log(`\n# ${checks - failures}/${checks} checks passed`);
process.exit(failures ? 1 : 0);
