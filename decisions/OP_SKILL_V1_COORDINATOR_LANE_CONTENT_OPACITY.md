# Decision — Orchestration coordinator lane-content opacity

Status: accepted owner decision
Date: 2026-10-01
Product: Orchestration Protocol Skill v1
Scope: orchestration-protocol-skill-v1@1
Incorporation state: pending next Definition revision after current frozen R2 revalidation integration

## Decision

The normal Orchestration Protocol coordinator/orchestrator MUST NOT read semantic contents of individual worker/lane result artifacts before integration.

Its pre-integration duties are mechanical/provenance-only:
- determine whether every required lane/unit exists;
- verify claim/ownership fencing;
- verify expected branch/result ancestry;
- verify exact subject/package/generation identity from mechanical metadata;
- verify the declared output artifact exists;
- verify publication/readback and that only the declared output surface changed where required;
- determine READY_FOR_INTEGRATION versus incomplete/ambiguous state.

The coordinator must not:
- open/read/summarize lane finding text;
- infer the substantive wave result from lane outputs;
- deduplicate/adjudicate findings;
- pre-bias the integrator with lane conclusions;
- continue the consumer lifecycle from a worker result.

When all required outputs are mechanically present and valid, the coordinator gives the user the exact fresh-integrator launcher/handoff.

## Integrator boundary

The fresh integrator is the first orchestration role that reads all admitted lane result contents together.

The integrator:
- admits only mechanically valid results;
- reads all admitted semantic outputs;
- evidence-weights and deduplicates;
- preserves dissent;
- produces one durable integrated result;
- publishes/readbacks that result.

The coordinator may then consume the integrated result for the consumer return/continuation decision.

## Historical/raw evidence

Individual lane outputs remain durably stored in the evidence repository.

They may be inspected later only for an explicit evidence-recovery, audit, debugging or re-adjudication obligation. Normal orchestration continuation uses the integrated result rather than rereading raw lanes.

## Rationale

This preserves worker independence, prevents the coordinator from becoming an accidental pre-integrator, reduces contamination and context load, and gives one clear semantic boundary: workers produce independent evidence; the integrator reads and synthesizes it; the coordinator handles orchestration state and consumes only the integrated result.

## Definition incorporation

This decision MUST be incorporated into the next Definition revision and production skill contract. It intentionally does not mutate the exact frozen R2 subject `elmakus/orchestration-protocol-skill@a4286212ecde0e0c3eb431c6c2a06fb0ca89757c` currently under focused revalidation.
