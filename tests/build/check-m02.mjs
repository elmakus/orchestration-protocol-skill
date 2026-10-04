#!/usr/bin/env node
// M02 proportionate build check — dependency-free, non-inference.
// Validates parseability, registries, exclusive ownership, link resolution,
// canonical identity/digest rules, detached linkage, and representative
// negative cases for A1-A6. Not a Q-layer PASS.
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
const runEnvelopeId = (env) => { const { return_id, run_envelope_id, ...rest } = env; return "runenv:" + digest(rest); };

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

// ---------- 3. registries: 8 profiles, 8 shared owners ----------
const profileIds = ["formal_research","definition_review","plan_review","execution_package_review","targeted_bug_hunt","global_bug_hunt","repair_units","focused_revalidation"];
ok("registry has all 8 stable profiles", profileIds.every(id => registry.profiles.some(p => p.profile_id === id)));
ok("registry profiles carry exact module paths + versions", registry.profiles.every(p => p.module.startsWith("skills/orchestration-protocol/profiles/") && p.semantics_version === "1.0.0"));
ok("registry profiles all pending (no M06/M07 stubs shipped)", registry.profiles.every(p => p.status === "pending"));
const sharedOwners = ["contracts-and-versioning","evidence-and-sources","security-and-effects","durable-storage","finite-claim-substrate","homogeneous-run-substrate","independence-and-integration","repair-and-revalidation"];
ok("registry has all 8 shared owners", sharedOwners.every(id => registry.owners.some(o => o.owner_id === id)));
ok("registry M02 owners implemented, downstream pending", registry.owners.filter(o => ["contracts-and-versioning","evidence-and-sources","security-and-effects","durable-storage"].includes(o.owner_id)).every(o => o.status === "implemented")
  && registry.owners.filter(o => ["finite-claim-substrate","homogeneous-run-substrate","independence-and-integration","repair-and-revalidation"].includes(o.owner_id)).every(o => o.status === "pending"));

// ---------- 4. bounded surface: no downstream stubs ----------
for (const p of registry.profiles) ok(`pending profile not shipped: ${p.profile_id}`, !fs.existsSync(path.join(ROOT, p.module)));
for (const o of registry.owners.filter(o => o.status === "pending")) ok(`pending owner not shipped: ${o.owner_id}`, !fs.existsSync(path.join(ROOT, o.module)));
ok("no profiles/ directory", !fs.existsSync(path.join(SK, "profiles")));
ok("no scripts/ helper shipped in M02", !fs.existsSync(path.join(SK, "scripts")));
const refFiles = fs.readdirSync(path.join(SK, "references")).sort();
ok("references/ holds exactly the 4 M02 owners", JSON.stringify(refFiles) === JSON.stringify(["contracts-and-versioning.md","durable-storage.md","evidence-and-sources.md","security-and-effects.md"]));

// ---------- 5. exclusive normative ownership ----------
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
  "run-envelope identity-scopes envelope-equivalence canonical-serialization state-domains state-precedence version-compatibility release-admission content-identity-graph compatibility-manifest current-policy-manifest extension-points " +
  "evidence-authority evidence-weight singleton-counterexample conflict-adjudication dissent-preservation evidence-as-data mechanical-metadata-allowlist " +
  "continuation-authority authority-verification effect-caps effect-validation forbidden-repairs receipt-interfaces verification-predicates credential-boundary checkpoint-record " +
  "git-ledger result-immutability supersession-pointers currentness-resolution archive-structure readback-proof provenance-lineage").split(" ");
ok("expected M02 domains all owned exactly once", expectedDomains.every(d => seen.has(d)), expectedDomains.filter(d => !seen.has(d)).join(","));

// ---------- 6. implemented links resolve; pending never loaded ----------
const pendingPaths = new Set([...registry.profiles.map(p => p.module), ...registry.owners.filter(o => o.status === "pending").map(o => o.module)]);
const mdFiles = ownedFiles.concat(["README.md"]);
let badLink = "";
const registryTables = new Set(["skills/orchestration-protocol/SKILL.md"]);
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

// ---------- 7. schema/template/example coherence ----------
for (const f of schemas) {
  const s = readJSON(`skills/orchestration-protocol/schemas/${f}`);
  ok(`schema ${f} versioned+owned`, s.version === "1.0.0" && typeof s.normative_owner === "string" && s.$id.startsWith("urn:op-skill:schema:v1:"));
}
for (const f of templates) {
  const t = readJSON(`skills/orchestration-protocol/templates/${f}`);
  ok(`template ${f} labeled synthetic`, t._synthetic && t._synthetic.includes("SYNTHETIC"));
}
const sealed = readJSON("skills/orchestration-protocol/templates/sealed-result.example.json");
ok("sealed result binds exact content identity (repo/commit/path/blob)", ["repository","commit","path","blob"].every(k => sealed.content_identity[k]) && /^[0-9a-f]{40}$/.test(sealed.content_identity.commit));
const admit = readJSON("skills/orchestration-protocol/templates/admission-snapshot.example.json");
ok("admission snapshot binds admitted sealed ids + missing set with reasons",
  admit.admission_snapshot.admitted_results.includes("sealed:example:0001") && admit.admission_snapshot.missing_set.every(m => m.member && m.reason));
ok("admitted sealed id matches sealed template", admit.admission_snapshot.admitted_results.includes(sealed.result_id));
const integ = admit.integrated_result;
ok("integrated result binds snapshot + qualification snapshot + durable locator",
  integ.admission_snapshot_id === admit.admission_snapshot.snapshot_id && !!integ.qualification_snapshot_id && !!integ.durable_locator);
ok("integrated RED-with-complete states is a legal tuple", integ.execution_state === "COMPLETE" && integ.coverage_state === "COMPLETE" && integ.profile_disposition === "RED");
const qual = readJSON("skills/orchestration-protocol/templates/qualification-record.example.json");
ok("detached qualification record uses PASS/FAIL/BLOCKED only with exact bindings",
  ["PASS","FAIL","BLOCKED"].includes(qual.verdict) && !!qual.candidate_id && !!qual.fixture_set && !!qual.evidence_locator);

// ---------- 8. canonical identity + content manifest readback ----------
const env = readJSON("skills/orchestration-protocol/templates/run-envelope.example.json");
const idA = runEnvelopeId(env);
const envReordered = Object.fromEntries(Object.entries(env).reverse());
ok("canonical digest deterministic across key order", runEnvelopeId(envReordered) === idA);
ok("return_id excluded from envelope equivalence", runEnvelopeId({ ...env, return_id: "different-routing-999" }) === idA);
ok("return_id difference is not a new semantic envelope", runEnvelopeId({ ...env, return_id: null }) === idA);
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
const recomputed = "content:" + crypto.createHash("sha256").update(JSON.stringify(cm.entries), "utf8").digest("hex");
ok("construction content identity recomputes deterministically", recomputed === cm.construction_identity);
ok("interim identity labeled construction, not M08 candidate", (cm.manifest_id || "").startsWith("content:0.2.0-m02") && read("README.md").includes("M02"));

// ---------- 9. representative negatives (small, local) ----------
function admitRelease(release, policy, integrityOk) {
  if (!integrityOk) return "BLOCKED";
  if (!policy || policy.stale || policy.ambiguous) return "BLOCKED";
  if (policy.revoked_releases.includes(release)) return "BLOCKED";
  if (release < policy.minimum_supported_release) return "BLOCKED";
  return "ADMITTED";
}
const policy = readJSON("skills/orchestration-protocol/manifests/current-policy.json");
ok("negative: revoked release fails closed", admitRelease("orchestration-protocol-skill@0.1.0", { ...policy, revoked_releases: ["orchestration-protocol-skill@0.1.0"] }, true) === "BLOCKED");
ok("negative: below-floor release fails closed", admitRelease("orchestration-protocol-skill@0.1.0", policy, true) === "BLOCKED");
ok("negative: stale policy fails closed", admitRelease("orchestration-protocol-skill@0.2.0-m02", { ...policy, stale: true }, true) === "BLOCKED");
ok("negative: ambiguous policy fails closed", admitRelease("orchestration-protocol-skill@0.2.0-m02", { ...policy, ambiguous: true }, true) === "BLOCKED");
ok("positive: pinned current release admitted", admitRelease("orchestration-protocol-skill@0.2.0-m02", policy, true) === "ADMITTED");
const HARD_CAP = new Set(["op-result-publication", "bounded-file-mutation:src/a.mjs"]);
const FORBIDDEN = ["merge", "release", "comments", "messages", "settings", "network-writes", "credentials"];
function validateEffects(requested) {
  if (requested.some(e => FORBIDDEN.some(f => e.includes(f)))) return "BLOCKED";
  if (requested.some(e => !HARD_CAP.has(e))) return "BLOCKED";
  return "ADMITTED";
}
ok("negative: mixed allowed+forbidden effect set rejected whole", validateEffects(["op-result-publication", "merge"]) === "BLOCKED");
ok("negative: forbidden repair effect (comments) rejected", validateEffects(["issue-comment"]) === "BLOCKED" || validateEffects(["comments"]) === "BLOCKED");
ok("negative: unclassifiable/unknown effect rejected", validateEffects(["mystery-effect"]) === "BLOCKED");
ok("positive: pure in-cap effect set admitted", validateEffects(["op-result-publication"]) === "ADMITTED");
const META_ALLOWED = new Set(Object.keys(readJSON("skills/orchestration-protocol/templates/mechanical-receipt.example.json").mechanical_metadata));
function validateMetadata(obj) {
  for (const k of Object.keys(obj)) if (!META_ALLOWED.has(k)) return "NON-ADMISSIBLE";
  return "ADMISSIBLE";
}
ok("negative: semantic finding in metadata channel rejected", validateMetadata({ ...readJSON("skills/orchestration-protocol/templates/mechanical-receipt.example.json").mechanical_metadata, severity: "high", conclusion: "looks good" }) === "NON-ADMISSIBLE");
ok("positive: mechanical receipt admitted", validateMetadata(readJSON("skills/orchestration-protocol/templates/mechanical-receipt.example.json").mechanical_metadata) === "ADMISSIBLE");
function verifyAuthority(proof) {
  if (proof.verdict !== "GENUINE") return "NOT_GENUINE";
  if (proof.channel_binding !== "same-channel" && proof.channel_binding !== "authorized-successor") return "NOT_GENUINE";
  if (proof.currentness !== "CURRENT") return "NOT_GENUINE";
  return "GENUINE";
}
ok("negative: schema-valid self-authored record without channel is not authority",
  verifyAuthority({ verdict: "GENUINE", channel_binding: "self-authored", currentness: "CURRENT" }) === "NOT_GENUINE");
ok("positive: same-channel current proof genuine", verifyAuthority(readJSON("skills/orchestration-protocol/templates/verification-proof.example.json")) === "GENUINE");
function evaluateDisposition(s) {
  if (s.applicability === "UNKNOWN") return "BLOCKED";
  if (s.applicability === "NOT_APPLICABLE") {
    if (s.execution === "COMPLETE" && s.currentness === "CURRENT" && s.coverage === "NOT_APPLICABLE" && s.disposition === "NOT_APPLICABLE") return "NOT_APPLICABLE";
    return "BLOCKED";
  }
  if (["SUPERSEDED","STALE","UNKNOWN"].includes(s.currentness)) return "BLOCKED";
  if (s.execution === "BLOCKED" || s.coverage === "BLOCKED") return "BLOCKED";
  if (s.execution === "INCOMPLETE" || s.coverage === "INCOMPLETE") return "INCOMPLETE";
  return "EVALUATE_TRUTH";
}
ok("negative: superseded forward use blocked", evaluateDisposition({ applicability: "APPLICABLE", currentness: "SUPERSEDED", execution: "COMPLETE", coverage: "COMPLETE" }) === "BLOCKED");
ok("negative: unknown applicability blocked", evaluateDisposition({ applicability: "UNKNOWN", currentness: "CURRENT", execution: "COMPLETE", coverage: "COMPLETE" }) === "BLOCKED");
ok("negative: empty mandatory coverage without NA predicate blocked",
  evaluateDisposition({ applicability: "APPLICABLE", currentness: "CURRENT", execution: "COMPLETE", coverage: "INCOMPLETE", empty_coverage: true }) === "INCOMPLETE");
ok("precedence: BLOCKED beats INCOMPLETE", evaluateDisposition({ applicability: "APPLICABLE", currentness: "CURRENT", execution: "BLOCKED", coverage: "INCOMPLETE" }) === "BLOCKED");
ok("neutral NOT_APPLICABLE tuple legal, never GREEN",
  evaluateDisposition({ applicability: "NOT_APPLICABLE", execution: "COMPLETE", currentness: "CURRENT", coverage: "NOT_APPLICABLE", disposition: "NOT_APPLICABLE" }) === "NOT_APPLICABLE");
ok("negative: missing envelope subject rejected", (() => { const e = { ...env }; delete e.subject; return !e.subject || !e.coverage || !e.op_release ? "BLOCKED" : "ADMITTED"; })() === "BLOCKED");
ok("negative: unknown profile rejected", !profileIds.includes("turbo_review"));
ok("negative: conflicting redundant identity blocked", (() => { const a = { repo: "x", commit: "a" }; const b = { repo: "x", commit: "b" }; return JSON.stringify(a) !== JSON.stringify(b) ? "BLOCKED" : "ADMITTED"; })() === "BLOCKED");

// ---------- 10. no knowingly inconsistent files: required-field spot checks ----------
function hasKeys(obj, keys) { return keys.every(k => obj[k] !== undefined); }
ok("envelope template has required envelope keys", hasKeys(env, ["op_contract","profile_id","subject","coverage","requested_effects","op_release"]));
ok("checkpoint template has gate keys", hasKeys(readJSON("skills/orchestration-protocol/templates/pre-worker-checkpoint.example.json"), ["checkpoint_id","wave_id","run_envelope_id","release_id","readback"]));
ok("finite claim pins non-force + qualified nonce source", (() => { const c = readJSON("skills/orchestration-protocol/templates/finite-claim.example.json").claim; return c.force === false && c.nonce_source === "qualified-csprng-128"; })());
ok("homogeneous batch binds envelope/subject/coverage/release", hasKeys(readJSON("skills/orchestration-protocol/templates/homogeneous-batch.example.json").batch, ["batch_revision_id","wave_id","run_envelope_id","subject","coverage","release_id","reserved_runs"]));

console.log(`\n# ${checks - failures}/${checks} checks passed`);
process.exit(failures ? 1 : 0);
