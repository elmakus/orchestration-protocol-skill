# Decision — Orchestration Protocol Skill v1 Definition review

Status: accepted owner decision
Scope: `orchestration-protocol-skill-v1@1`
Definition revision: `R1`

The Definition completeness audit for Orchestration Protocol Skill v1 must be performed using the Orchestration Protocol `definition_review` profile.

A normal single-context self-review is not sufficient to turn `DEFINITION.toml.completeness_audit` GREEN.

The review must:
- bind an exact immutable Definition subject;
- evaluate completeness, ambiguity, contradictions, negative space, scope/outcome coherence and acceptance testability;
- remain non-fail-fast across its declared coverage;
- integrate findings before any repair;
- preserve evidence-backed dissent and never use majority voting as truth;
- return a durable integrated result that the PWv2 Definition owner can consume.

If the review is RED, repair the Definition only within accepted owner/product authority, then perform focused revalidation of the accepted findings/change cone. A material scope change invalidates the previous promotion subject and must return through the appropriate PWv2 authority boundary.

This decision changes the review method only. It does not authorize implementation and does not make Orchestration Protocol the owner of PWv2 workflow state.
