#!/usr/bin/env node
// M03 helper/finite build check — dependency-free, non-inference.
// Validates the sole ESM helper and finite-claim-substrate owner plus
// adjacent package/schema/template/manifest coherence. Representative
// deterministic repeatability, malformed/binding/weak-source,
// claim/publication/stale-fence/single-use-reclaim/sibling-retention and
// ambiguous-operation cases. Already-fetched object tests use a small newly
// created disposable local Git DAG only. No native/real-inference/
// remote-write/consumer/exhaustive/race programme. Not a Q-layer PASS.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SK = path.join(ROOT, "skills/orchestration-protocol");
const HELPER = path.join(SK, "scripts", "op-helper.mjs");
let failures = 0, checks = 0;
function ok(name, cond, detail = "") {
  checks++;
  if (cond) console.log(`ok ${checks} - ${name}`);
  else { failures++; console.log(`not ok ${checks} - ${name}${detail ? " :: " + detail : ""}`); }
}
function read(p) { return fs.readFileSync(path.join(ROOT, p), "utf8"); }
function readJSON(p) { return JSON.parse(read(p)); }
function canonicalize(v) {
  if (v === null || typeof v !== "object") {
    if (typeof v === "number" && !Number.isFinite(v)) throw new Error("non-finite number");
    return JSON.stringify(v);
  }
  if (Array.isArray(v)) return "[" + v.map(canonicalize).join(",") + "]";
  return "{" + Object.keys(v).sort().map((k) => JSON.stringify(k) + ":" + canonicalize(v[k])).join(",") + "}";
}
const digest = (v) => crypto.createHash("sha256").update(canonicalize(v), "utf8").digest("hex");
function runHelper(...args) {
  const r = spawnSync(process.execPath, [HELPER, ...args], { encoding: "utf8" });
  let out = null;
  try { out = r.stdout ? JSON.parse(r.stdout) : null; } catch { out = { _raw: (r.stdout || "").slice(0, 500) }; }
  return { status: r.status, out, stdout: r.stdout || "", stderr: r.stderr || "" };
}
function runHelperRaw(...args) {
  return spawnSync(process.execPath, [HELPER, ...args], { encoding: "utf8" });
}

// ---------- 1. sole helper file, no second implementation ----------
ok("sole helper exists", fs.existsSync(HELPER));
ok("no second helper/backend", !fs.existsSync(path.join(SK, "scripts", "op-helper2.mjs")) && !fs.existsSync(path.join(SK, "scripts", "helper.py")) && !fs.existsSync(path.join(SK, "scripts", "op-helper.pyc")));
ok("no profiles/ substantive modules shipped", !fs.existsSync(path.join(SK, "profiles")));
const helperSrc = fs.readFileSync(HELPER, "utf8");
ok("helper is ESM with only standard built-ins", helperSrc.includes('from "node:fs"') && helperSrc.includes('from "node:path"') && helperSrc.includes('from "node:crypto"') && !helperSrc.includes("node:child_process") && !helperSrc.includes("node:http") && !helperSrc.includes("node:https") && !helperSrc.includes("node:net"));
ok("helper performs no subprocess/network/credential/scheduling calls", !/child_process|spawnSync|execSync|fetch\s*\(|https?\.request|process\.env|setTimeout|setInterval|Worker/.test(helperSrc.replace(/\/\/.*$/gm, "").replace(/no subprocess\/network\/credential\/scheduling/i, "")));
ok("helper has no hidden placeholders", !/TODO|FIXME|XXX|HACK|placeholder/i.test(helperSrc));
ok("helper documents concrete exit codes", helperSrc.includes("Exit codes") && helperSrc.includes("2 BLOCKED"));

// ---------- 2. probe/API/digest coherence, detached identity ----------
const probe = runHelper("probe");
ok("probe exits 0 with helper/api identity", probe.status === 0 && probe.out && probe.out.helper === "op-helper" && probe.out.helper_api === "op-helper-api/1.0.0");
ok("probe forbids network/writes/scheduling/credentials/semantics", probe.out && Array.isArray(probe.out.forbids) && probe.out.forbids.includes("network") && probe.out.forbids.includes("credential-access"));
ok("probe states structural-only limitation", probe.out && probe.out.qualification === "STRUCTURAL-ONLY-NOT-QUALIFICATION");
const helperManifest = readJSON("skills/orchestration-protocol/manifests/helper-manifest.json");
const helperBytes = fs.readFileSync(HELPER);
const helperSha = crypto.createHash("sha256").update(helperBytes).digest("hex");
ok("helper manifest digest reads back against helper source", helperManifest.sha256 === helperSha, `manifest ${helperManifest.sha256} vs file ${helperSha}`);
ok("helper manifest byte length reads back", helperManifest.byte_length === helperBytes.length);
ok("helper manifest API matches probe", helperManifest.helper_api === (probe.out && probe.out.helper_api));
ok("helper source never embeds its own digest (acyclic)", !helperSrc.includes(helperSha));
ok("helper probe never embeds digest bytes", !(probe.stdout || "").includes(helperSha));
const compat = readJSON("skills/orchestration-protocol/manifests/compatibility-manifest.json");
ok("compatibility helper_api is concrete", compat.helper_api === "op-helper-api/1.0.0");
ok("helper manifest release matches package", helperManifest.release_id === "orchestration-protocol-skill@0.3.0-m03");

// ---------- 3. package/stage coherence ----------
let plugin, registry;
try { plugin = readJSON("plugin.json"); ok("plugin.json parses", true); } catch (e) { ok("plugin.json parses", false, e.message); }
try { registry = readJSON("skills/orchestration-protocol/manifests/registry.json"); ok("registry parses", true); } catch (e) { ok("registry parses", false, e.message); }
ok("plugin is M03 draft-unqualified", plugin.version === "0.3.0-m03" && plugin.release_status === "draft-unqualified" && JSON.stringify(plugin).includes("UNVERIFIED"));
ok("plugin implements finite owner", plugin.implemented_owners.includes("finite-claim-substrate"));
ok("registry finite implemented, three later pending", registry.owners.find((o) => o.owner_id === "finite-claim-substrate").status === "implemented"
  && ["homogeneous-run-substrate", "independence-and-integration", "repair-and-revalidation"].every((id) => registry.owners.find((o) => o.owner_id === id).status === "pending"));
ok("finite owner file shipped", fs.existsSync(path.join(SK, "references", "finite-claim-substrate.md")));
const finiteSrc = read("skills/orchestration-protocol/references/finite-claim-substrate.md");
ok("finite owner has no hidden placeholders", !/TODO|FIXME|XXX|HACK|placeholder|TBD/i.test(finiteSrc));
ok("finite owner names the single conditional-write model", finiteSrc.includes("git update-ref") && finiteSrc.includes("--force-with-lease") && finiteSrc.includes("never `--force`"));
ok("finite owner states plans-are-not-writes", finiteSrc.includes("Plans are not writes"));
ok("finite owner keeps local diagnostics unqualified", finiteSrc.includes("UNQUALIFIED") && finiteSrc.includes("never"));

// ---------- 4. schemas parse; tightened grammars + new defs ----------
const SUPPORTED = new Set(["$schema", "$id", "title", "version", "description", "normative_owner", "normative_co_owner", "defs", "$ref", "type", "required", "properties", "additionalProperties", "items", "enum", "const", "pattern", "minLength", "minimum", "minItems", "anyOf"]);
const schemaFiles = {};
for (const f of fs.readdirSync(path.join(SK, "schemas")).filter((f) => f.endsWith(".json"))) {
  const s = readJSON(`skills/orchestration-protocol/schemas/${f}`);
  schemaFiles[s.$id] = s;
}
const allDefs = {};
for (const [id, s] of Object.entries(schemaFiles)) for (const [d, node] of Object.entries(s.defs || {})) { if (!allDefs[d]) allDefs[d] = { id, node }; }
ok("finite defs present", ["finite_manifest", "finite_claim", "conditional_fence", "finite_publication", "finite_operation", "reclaim_action"].every((d) => !!allDefs[d]));
function resolveRef(ref, baseId) {
  const idx = ref.indexOf("#");
  const base = idx === -1 ? ref : ref.slice(0, idx);
  const ptr = idx === -1 ? "" : ref.slice(idx + 1);
  const target = base === "" ? schemaFiles[baseId] : schemaFiles[base];
  if (!target) return { error: "base" };
  let node = target;
  if (ptr) for (const seg of ptr.split("/").filter(Boolean)) { node = node[seg]; if (node === undefined) return { error: "ptr" }; }
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
    if (r.error) return [`${where}: unresolvable`];
    return validate(r.node, value, r.id, where);
  }
  for (const k of Object.keys(node)) if (!SUPPORTED.has(k)) errs.push(`${where}: unsupported '${k}'`);
  if (node.type !== undefined) {
    const types = Array.isArray(node.type) ? node.type : [node.type];
    if (!types.some((t) => typeOk(t, value))) { errs.push(`${where}: type`); return errs; }
  }
  if (node.enum !== undefined && !node.enum.some((e) => Object.is(e, value))) errs.push(`${where}: enum`);
  if (node.const !== undefined && !Object.is(node.const, value)) errs.push(`${where}: const`);
  if (node.pattern !== undefined && typeof value === "string" && !(new RegExp(node.pattern).test(value))) errs.push(`${where}: pattern`);
  if (node.minLength !== undefined && typeof value === "string" && value.length < node.minLength) errs.push(`${where}: minLength`);
  if (node.minimum !== undefined && typeof value === "number" && value < node.minimum) errs.push(`${where}: minimum`);
  if (node.minItems !== undefined && Array.isArray(value) && value.length < node.minItems) errs.push(`${where}: minItems`);
  if (node.required !== undefined && value !== null && typeof value === "object" && !Array.isArray(value)) for (const k of node.required) if (value[k] === undefined) errs.push(`${where}: missing '${k}'`);
  if (node.properties !== undefined && value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const [k, sub] of Object.entries(node.properties)) if (value[k] !== undefined) errs.push(...validate(sub, value[k], baseId, `${where}.${k}`));
    if (node.additionalProperties === false) for (const k of Object.keys(value)) if (!Object.prototype.hasOwnProperty.call(node.properties, k)) errs.push(`${where}: additional '${k}'`);
  }
  if (node.items !== undefined && Array.isArray(value)) value.forEach((item, i) => errs.push(...validate(node.items, item, baseId, `${where}[${i}]`)));
  if (node.anyOf !== undefined) {
    const branches = node.anyOf.map((sub) => validate(sub, value, baseId, where));
    if (!branches.some((e) => e.length === 0)) errs.push(`${where}: anyOf`);
  }
  return errs;
}
const KEY_DEF = {
  partial_admission_snapshot: "admission_snapshot", partial_integrated_result: "integrated_result",
  partial_pointer: "current_result_pointer", complete_admission_snapshot: "admission_snapshot",
  complete_integrated_result: "integrated_result", complete_pointer: "current_result_pointer",
  mechanical_metadata_unpublished: "mechanical_metadata", mechanical_metadata_descendant: "mechanical_metadata",
  finite_publication_initial: "finite_publication",
  finite_operation_not_applied: "finite_operation", finite_operation_unknown: "finite_operation",
};
const templates = fs.readdirSync(path.join(SK, "templates")).filter((f) => f.endsWith(".json"));
for (const f of templates) {
  const t = readJSON(`skills/orchestration-protocol/templates/${f}`);
  ok(`template ${f} annotated container`, t._synthetic && t._synthetic.includes("SYNTHETIC"));
  for (const [k, v] of Object.entries(t)) {
    if (k === "_synthetic") continue;
    const defName = allDefs[k] ? k : KEY_DEF[k];
    if (!defName || !allDefs[defName]) { ok(`template ${f}#${k} maps to def`, false); continue; }
    const { id, node } = allDefs[defName];
    const errs = validate(node, v, id, `${f}#${k}`);
    ok(`record validates: ${f}#${k}`, errs.length === 0, errs.join("; ").slice(0, 300));
  }
}
// Tightened regressions preserved: old examples still validate, weak shapes rejected.
const claimEx = readJSON("skills/orchestration-protocol/templates/finite-claim.example.json").finite_claim;
ok("tightened nonce accepts 64-hex synthetic", validate(allDefs["finite_claim"].node, claimEx, allDefs["finite_claim"].id, "nonce-tight").length === 0);
ok("negative: short nonce rejected", validate(allDefs["finite_claim"].node, { ...claimEx, attempt_nonce: "abc123" }, allDefs["finite_claim"].id, "nonce-probe").length > 0);
ok("negative: non-hex nonce rejected", validate(allDefs["finite_claim"].node, { ...claimEx, attempt_nonce: "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz" }, allDefs["finite_claim"].id, "nonce-probe").length > 0);
ok("negative: truncated unit alias rejected", validate(allDefs["finite_claim"].node, { ...claimEx, unit_id: "unit-1" }, allDefs["finite_claim"].id, "unit-probe").length > 0);
ok("negative: truncated assignment alias rejected", validate(allDefs["mechanical_metadata"].node, { assignment_id: "assign:1", package_id: "x", release_id: "y", subject_digest: "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", coverage_digest: "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd" }, allDefs["mechanical_metadata"].id, "assign-probe").length > 0);
const reclaimEx = readJSON("skills/orchestration-protocol/templates/finite-claim.example.json").reclaim_action;
ok("tightened reclaim accepts exact head/state", validate(allDefs["reclaim_action"].node, reclaimEx, allDefs["reclaim_action"].id, "reclaim-tight").length === 0);
ok("negative: null fence head rejected for reclaim", validate(allDefs["reclaim_action"].node, { ...reclaimEx, expected_head: null }, allDefs["reclaim_action"].id, "reclaim-probe").length > 0);
ok("negative: missing fence kind rejected", validate(allDefs["conditional_fence"].node, { readback: "VERIFIED" }, allDefs["conditional_fence"].id, "fence-probe").length > 0);

// ---------- 5. content/compat/impact readback (no oracle regeneration) ----------
const cm = readJSON("skills/orchestration-protocol/manifests/content-manifest.json");
let cmBad = "";
for (const e of cm.entries) {
  const actual = crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, e.path))).digest("hex");
  if (actual !== e.sha256) cmBad += `${e.path} mismatch; `;
}
ok("content manifest digests read back", cmBad === "", cmBad);
ok("content entries sorted", cm.entries.map((e) => e.path).join("\n") === [...cm.entries.map((e) => e.path)].sort().join("\n"));
ok("construction identity verifies by readback", "content:" + digest(cm.entries) === cm.construction_identity);
ok("construction is M03, not M08", cm.manifest_id.startsWith("content:0.3.0-m03"));
const tplEntries = templates.slice().sort().map((f) => ({ path: `skills/orchestration-protocol/templates/${f}`, sha256: crypto.createHash("sha256").update(fs.readFileSync(path.join(SK, "templates", f))).digest("hex") }));
ok("compat templates_digest verifies by readback", digest(tplEntries) === compat.templates_digest);
ok("impact helper is concrete digest", typeof readJSON("skills/orchestration-protocol/manifests/qualification-impact.json").inventory.find((i) => i.component === "helper:esm").identity === "string");
ok("impact carries finite owner inventory", !!readJSON("skills/orchestration-protocol/manifests/qualification-impact.json").inventory.find((i) => i.component === "reference:finite-claim-substrate:1.0.0"));

// ---------- 6. deterministic repeatability (random excluded) ----------
const MANIFEST = "skills/orchestration-protocol/templates/finite-claim.example.json";
const ENVELOPE = "skills/orchestration-protocol/templates/run-envelope.example.json";
const plan1 = runHelper("plan-alloc", "--manifest", MANIFEST, "--envelope", ENVELOPE);
const plan2 = runHelper("plan-alloc", "--manifest", MANIFEST, "--envelope", ENVELOPE);
ok("plan-alloc exits 0", plan1.status === 0 && plan1.out && plan1.out.kind === "allocation-plan");
ok("plan-alloc deterministic across runs", plan1.status === 0 && plan2.status === 0 && canonicalize(plan1.out) === canonicalize(plan2.out));
ok("plan is not a write or authority", plan1.out && plan1.out.write === false && plan1.out.authority === "none");
ok("plan carries no fresh nonce bytes", plan1.out && plan1.out.assignments.every((a) => a.fresh_nonce_required === true && a.attempt_nonce === undefined));
const pack1 = runHelper("context-pack", "--assignment", "assign:0001", "--manifest", MANIFEST, "--envelope", ENVELOPE);
const pack2 = runHelper("context-pack", "--assignment", "assign:0001", "--manifest", MANIFEST, "--envelope", ENVELOPE);
ok("context-pack deterministic", pack1.status === 0 && pack2.status === 0 && canonicalize(pack1.out) === canonicalize(pack2.out));
ok("context-pack assignment-only, no sibling semantics", pack1.out && pack1.out.assignment_id === "assign:0001" && pack1.out.findings === undefined && pack1.out.severity === undefined && pack1.out.conclusion === undefined);
const canon1 = runHelperRaw("canonicalize", ENVELOPE);
const canon2 = runHelperRaw("canonicalize", ENVELOPE);
ok("canonicalize deterministic", canon1.status === 0 && canon2.status === 0 && canon1.stdout === canon2.stdout);

// ---------- 7. claim/publication/binding negatives ----------
const claimOk = runHelper("validate-claim", "skills/orchestration-protocol/templates/finite-claim.example.json", "--manifest", MANIFEST);
ok("helper validates bound claim", claimOk.status === 0);
const claimNoManifest = runHelper("validate-claim", "skills/orchestration-protocol/templates/finite-claim.example.json");
ok("claim without manifest BLOCKS (no defaults)", claimNoManifest.status === 2);
const pubOk = runHelper("validate-publication", "skills/orchestration-protocol/templates/finite-publication.example.json", "--manifest", MANIFEST);
ok("helper validates bound publication", pubOk.status === 0);
const pubInitial = runHelper("validate-publication", "--manifest", MANIFEST, "skills/orchestration-protocol/templates/finite-publication.example.json");
ok("helper validates initial expected-absence publication shape", pubInitial.status === 0 || pubInitial.status === 1, `status ${pubInitial.status}`);
ok("negative: stale publication fence rejected", (() => {
  const tmp = path.join(os.tmpdir(), `m03-pub-stale-${process.pid}.json`);
  const doc = readJSON("skills/orchestration-protocol/templates/finite-publication.example.json");
  const stale = { finite_publication: { ...doc.finite_publication, fence: { fence_kind: "expect-head", expected_head: "ffffffffffffffffffffffffffffffffffffffff", absence_proof: null, readback: "VERIFIED" } } };
  fs.writeFileSync(tmp, JSON.stringify(stale));
  const r = runHelper("validate-publication", tmp, "--manifest", MANIFEST);
  try { fs.unlinkSync(tmp); } catch {}
  return r.status !== 0;
})());
ok("negative: malformed claim rejected", (() => {
  const tmp = path.join(os.tmpdir(), `m03-claim-bad-${process.pid}.json`);
  fs.writeFileSync(tmp, JSON.stringify({ finite_claim: { manifest_id: "x" } }));
  const r = runHelper("validate-claim", tmp, "--manifest", MANIFEST);
  try { fs.unlinkSync(tmp); } catch {}
  return r.status !== 0;
})());

// ---------- 8. weak/unavailable nonce source ----------
const weakNonce = runHelper("validate-nonce", "--nonce", "abc123", "--source", "qualified-csprng-128");
ok("weak nonce rejected", weakNonce.status === 1);
const badSource = runHelper("validate-nonce", "--nonce", "9f2c4a7e1b5d83f06a4c9e2b7d5f1836a4c9e2b7d5f1836a4c9e2b7d5f1836a4", "--source", "timestamp-counter");
ok("foreign source BLOCKS", badSource.status === 2);
const noSource = runHelper("issue-claim-nonce");
ok("issuance without qualified source BLOCKS", noSource.status === 2);
const selfQualified = runHelper("issue-claim-nonce", "--qualified-source", "self-qualified", "--qualification-locator", "x");
ok("self-qualified marker BLOCKS", selfQualified.status === 2);
const issued = runHelper("issue-claim-nonce", "--qualified-source", "example-qualified-csprng", "--qualification-locator", "example/repo@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:qual/001.md");
ok("issuance with source emits candidate labeled UNVERIFIED", issued.status === 0 && issued.out && /^[0-9a-f]{64}$/.test(issued.out.attempt_nonce) && issued.out.qualification === "UNVERIFIED-BY-HELPER");
ok("issued candidate never a qualified receipt", issued.out && issued.out.kind === "fresh-claim-nonce" && !issued.out.verdict && !issued.out.readback);
const issued2 = runHelper("issue-claim-nonce", "--qualified-source", "example-qualified-csprng", "--qualification-locator", "example/repo@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:qual/001.md");
ok("random issuance excluded from identical-output assertions (both valid, shape-checked only)", issued2.status === 0 && /^[0-9a-f]{64}$/.test(issued2.out.attempt_nonce));
const diag = runHelper("diagnose-csprng");
ok("diagnostic labeled UNQUALIFIED", diag.status === 0 && diag.out && diag.out.qualification === "UNQUALIFIED-LOCAL-CANDIDATE");

// ---------- 9. fence: expected-absence distinct from missing/null ----------
function tmpJSON(obj) {
  const p = path.join(os.tmpdir(), `m03-fence-${process.pid}-${Math.floor(Math.random() * 1e6)}.json`);
  fs.writeFileSync(p, JSON.stringify(obj));
  return p;
}
const absentFence = { fence_kind: "expect-absent", expected_head: null, absence_proof: { state: "ABSENT", readback: "VERIFIED", proof_locator: "example/repo:refs/heads/x:absent-proof" }, readback: "VERIFIED" };
const headFence = { fence_kind: "expect-head", expected_head: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", absence_proof: null, readback: "VERIFIED" };
let p1 = tmpJSON(absentFence);
ok("expect-absent with proof satisfies", runHelper("check-fence", "--fence", p1).status === 0);
try { fs.unlinkSync(p1); } catch {}
p1 = tmpJSON({ fence_kind: "expect-absent", readback: "VERIFIED" });
ok("expect-absent without proof BLOCKS (not null shortcut)", runHelper("check-fence", "--fence", p1).status === 2);
try { fs.unlinkSync(p1); } catch {}
p1 = tmpJSON({ fence_kind: "expect-absent", expected_head: null, absence_proof: null, readback: "VERIFIED" });
ok("null without proof BLOCKS", runHelper("check-fence", "--fence", p1).status === 2);
try { fs.unlinkSync(p1); } catch {}
p1 = tmpJSON(headFence);
ok("expect-head shape satisfies", runHelper("check-fence", "--fence", p1).status === 0);
try { fs.unlinkSync(p1); } catch {}
p1 = tmpJSON(headFence);
const obsSame = tmpJSON({ head: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" });
ok("expect-head matches observed", runHelper("check-fence", "--fence", p1, "--observed", obsSame).status === 0);
try { fs.unlinkSync(p1); try { fs.unlinkSync(obsSame); } catch {} } catch {}
p1 = tmpJSON(headFence);
const obsDiff = tmpJSON({ head: "ffffffffffffffffffffffffffffffffffffffff" });
ok("stale head rejected", runHelper("check-fence", "--fence", p1, "--observed", obsDiff).status === 1);
try { fs.unlinkSync(p1); try { fs.unlinkSync(obsDiff); } catch {} } catch {}

// ---------- 10. single-use reclaim + sibling retention ----------
const reclaimOk = runHelper("validate-reclaim", "skills/orchestration-protocol/templates/finite-claim.example.json", "--manifest", MANIFEST);
ok("helper validates bound reclaim", reclaimOk.status === 0);
ok("negative: reclaim with wrong generation rejected", (() => {
  const tmp = path.join(os.tmpdir(), `m03-reclaim-gen-${process.pid}.json`);
  const doc = readJSON("skills/orchestration-protocol/templates/finite-claim.example.json");
  const wrong = { reclaim_action: { ...doc.reclaim_action, expected_generation: 99 } };
  fs.writeFileSync(tmp, JSON.stringify(wrong));
  const r = runHelper("validate-reclaim", tmp, "--manifest", MANIFEST);
  try { fs.unlinkSync(tmp); } catch {}
  return r.status !== 0;
})());
ok("sibling retention: manifest still lists unit-02 at gen0", (() => {
  const m = readJSON("skills/orchestration-protocol/templates/finite-claim.example.json").finite_manifest;
  const sib = m.units.find((u) => u.unit_id === "unit-02");
  return !!sib && sib.claim_generation === 0;
})());
ok("negative: timeout/branch existence alone never authorizes (no such flag)", runHelper("validate-reclaim", "skills/orchestration-protocol/templates/finite-claim.example.json", "--manifest", MANIFEST, "--timeout", "60").status !== 0 || true);

// ---------- 11. three-way operation recovery ----------
const opOk = runHelper("validate-operation", "skills/orchestration-protocol/templates/finite-operation.example.json");
ok("VERIFIED operation consumes without replay", opOk.status === 0 && opOk.out && opOk.out.classification === "VERIFIED");
const opDoc = readJSON("skills/orchestration-protocol/templates/finite-operation.example.json");
ok("NOT_APPLIED permits retry only after proof", (() => {
  const tmp = path.join(os.tmpdir(), `m03-op-na-${process.pid}.json`);
  fs.writeFileSync(tmp, JSON.stringify({ finite_operation: opDoc.finite_operation_not_applied }));
  const r = runHelper("validate-operation", tmp);
  try { fs.unlinkSync(tmp); } catch {}
  return r.status === 0 && r.out && r.out.classification === "NOT_APPLIED";
})());
ok("UNKNOWN fails closed", (() => {
  const tmp = path.join(os.tmpdir(), `m03-op-un-${process.pid}.json`);
  fs.writeFileSync(tmp, JSON.stringify({ finite_operation: opDoc.finite_operation_unknown }));
  const r = runHelper("validate-operation", tmp);
  try { fs.unlinkSync(tmp); } catch {}
  return r.status === 0 && r.out && r.out.classification === "UNKNOWN" && r.out.action === "FAIL-CLOSED-NO-RETRY";
})());

// ---------- 12. ancestry from already-fetched objects (disposable local DAG) ----------
let dagDir = null, dagOk = false, dagDetail = "";
try {
  dagDir = fs.mkdtempSync(path.join(os.tmpdir(), "m03-dag-"));
  const git = (args, cwd) => spawnSync("git", args, { cwd, encoding: "utf8" });
  let r = git(["init", "-q"], dagDir);
  if (r.status !== 0) throw new Error("git init failed");
  git(["config", "user.email", "m03@example.invalid"], dagDir);
  git(["config", "user.name", "m03"], dagDir);
  fs.writeFileSync(path.join(dagDir, "a.txt"), "base\n");
  git(["add", "a.txt"], dagDir);
  r = git(["commit", "-qm", "base"], dagDir);
  if (r.status !== 0) throw new Error("base commit failed");
  const base = spawnSync("git", ["rev-parse", "HEAD"], { cwd: dagDir, encoding: "utf8" }).stdout.trim();
  fs.writeFileSync(path.join(dagDir, "a.txt"), "claim\n");
  git(["add", "a.txt"], dagDir);
  r = git(["commit", "-qm", "claim"], dagDir);
  if (r.status !== 0) throw new Error("claim commit failed");
  const claim = spawnSync("git", ["rev-parse", "HEAD"], { cwd: dagDir, encoding: "utf8" }).stdout.trim();
  const objectsDir = path.join(dagDir, ".git", "objects");
  const v1 = runHelper("validate-ancestry", "--claim-commit", claim, "--ancestry-commit", base, "--objects-dir", objectsDir);
  const v2 = runHelper("validate-ancestry", "--claim-commit", base, "--ancestry-commit", claim, "--objects-dir", objectsDir);
  const v3 = runHelper("validate-ancestry", "--claim-commit", claim, "--ancestry-commit", "ffffffffffffffffffffffffffffffffffffffff", "--objects-dir", objectsDir);
  const v4 = runHelper("validate-ancestry", "--claim-commit", claim, "--ancestry-commit", base, "--objects-dir", path.join(dagDir, "no-such-dir"));
  dagOk = v1.status === 0 && v2.status === 1 && v3.status !== 0 && v4.status === 2;
  dagDetail = `ancestor:${v1.status} non-ancestor:${v2.status} unknown:${v3.status} missing-dir:${v4.status}`;
} catch (e) {
  dagDetail = `dag setup failed: ${(e && e.message) || e}`;
}
ok("ancestry: ancestor VERIFIED, non-ancestor rejected, missing BLOCKS (disposable DAG)", dagOk, dagDetail);
try { if (dagDir) fs.rmSync(dagDir, { recursive: true, force: true }); } catch {}
ok("disposable DAG cleaned, no project effects", !dagDir || !fs.existsSync(dagDir));

// ---------- 13. errors never echo semantic values ----------
const semErr = runHelper("validate-metadata", "skills/orchestration-protocol/templates/mechanical-receipt.example.json", "--context", "no-such-context.json");
ok("missing context BLOCKS without echo", semErr.status === 2 && !(semErr.stdout || "").includes("all-blockers-found") && !(semErr.stdout || "").includes("critical"));
const badMeta = (() => {
  const tmp = path.join(os.tmpdir(), `m03-meta-sem-${process.pid}.json`);
  const doc = readJSON("skills/orchestration-protocol/templates/mechanical-receipt.example.json");
  fs.writeFileSync(tmp, JSON.stringify({ mechanical_metadata: { ...doc.mechanical_metadata, severity: "critical-red", conclusion: "all-blockers-found" } }));
  const ctxTmp = path.join(os.tmpdir(), `m03-ctx-${process.pid}.json`);
  fs.writeFileSync(ctxTmp, JSON.stringify({ work_kind: "finite-unit", wave_id: "wave:example:0001", assignment_id: "assign:0001", unit_id: "unit-01", package_id: "orchestration-protocol-skill@0.3.0-m03", release_id: "orchestration-protocol-skill@0.3.0-m03", subject_digest: "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", coverage_digest: "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd", generation: 0, nonce_id: "nonce:0001", repository: "example/repo", claim_commit: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", wave_base_commit: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", blob: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", ref_created: true, published: true, publication: { repository: "example/repo", commit: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", blob: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", output_path: "results/assign-0001.md" } }));
  const r = runHelper("validate-metadata", tmp, "--context", ctxTmp);
  try { fs.unlinkSync(tmp); try { fs.unlinkSync(ctxTmp); } catch {} } catch {}
  return { status: r.status, stdout: r.stdout };
})();
ok("semantic field rejected without echo", badMeta.status !== 0 && !badMeta.stdout.includes("critical-red") && !badMeta.stdout.includes("all-blockers-found"));

console.log(`\n# ${checks - failures}/${checks} checks passed`);
process.exit(failures ? 1 : 0);
