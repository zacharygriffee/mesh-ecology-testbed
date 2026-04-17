# Phases

This document defines how `mesh-ecology-testbed` should mature from a small local harness into a high-fidelity mesh behavior test surface for mesh-facing apps.

The target is not "proof that mesh never fails."

The target is:

- same or near-same behavior classes as real mesh
- same or near-same lifecycle shapes as real mesh
- same or near-same degraded-condition behavior that materially affects mesh apps
- explicit parity calibration between what the testbed reproduces and what the real mesh lab actually observes

## Core Lanes

This repo should eventually own three lanes:

### Synthetic Testbed

Purpose:

- fast, repeatable, controlled app-facing behavior checks
- deterministic or seeded replay of scenarios
- low-friction local development

This lane is:

- useful
- fast
- non-authoritative for real mesh behavior by itself

### Real Mesh Lab

Purpose:

- observe actual local mesh participation behavior using real `mesh-ecology` surfaces and real actors
- learn timing envelopes, churn patterns, plurality shapes, restart behavior, and degraded-condition behavior

This lane is:

- the behavior source of truth for this repo's fidelity targets
- a measurement environment, not production truth

### Parity Calibration

Purpose:

- compare synthetic testbed behavior against the real mesh lab
- measure drift
- keep "near-same" explicit and reviewable

This lane is:

- the guard against the testbed mimicking assumptions instead of mesh behavior

## Proof Vocabulary

Use these terms consistently:

- `fixture proof`: synthetic local scenario behavior is correct relative to its declared fixture
- `mesh lab evidence`: actual behavior observed from real local mesh participation
- `parity evidence`: comparison between synthetic and real-mesh runs for the same scenario class
- `app compatibility evidence`: proof that a specific app handles the observed lifecycle and degraded conditions correctly

Avoid claiming:

- universal correctness proof
- distributed correctness proof
- guaranteed convergence proof
- absence of failures in production

## Phase 0: Doctrine And Measurement Model

Goal:

- make the lane split and fidelity target explicit

Deliverables:

- this file
- phase status notes in the README
- explicit distinction between `fixture proof`, `mesh lab evidence`, and `parity evidence`

Exit criteria:

- the repo docs no longer imply that synthetic success alone predicts real mesh behavior
- the repo explicitly states that real mesh lab evidence defines the fidelity target

## Phase 1: Stable Synthetic Harness

Goal:

- keep a fast local lane for app behavior checks while classifying it correctly

Deliverables:

- versioned scenario schema
- versioned observation schema
- seeded delay/jitter controls
- richer synthetic scenarios for absence, duplicates, out-of-order arrival, and anomaly classes
- small app-facing test client

Exit criteria:

- apps can run synthetic scenarios without custom glue
- synthetic scenarios are explicit, replayable, and documented
- fixture results are emitted as local observations, not truth claims

Current status:

- partially present

## Phase 2: Real Mesh Lab Foundation

Goal:

- stand up a disposable real local mesh lab inside this repo

Deliverables:

- real discovery and concern surfaces using actual `mesh-ecology`
- isolated stores for each runtime participant
- disposable lab topology startup and teardown
- concern-facing observer clients

Exit criteria:

- the repo can run at least one scenario against real local discovery and concern surfaces
- the lab uses supported participation surfaces rather than in-process synthetic callbacks
- direct cross-runtime store inspection is not the main observation path

## Phase 3: Real Actor Wrapper Layer

Goal:

- run actual organisms and ratifiers under testbed control without rewriting them into fake actors

Deliverables:

- thin actor wrapper contract
- process lifecycle management for organisms and ratifiers
- actor config projection for local lab scenarios
- explicit actor classification notes: canonical actor, auxiliary, or probe/test

Exit criteria:

- the repo can launch and observe at least one real organism and one real ratifier
- wrappers manage lifecycle and configuration only
- wrappers do not become a hidden orchestration engine

## Phase 4: Shared Scenario Manifest

Goal:

- make scenarios portable across the synthetic and real mesh lanes

Deliverables:

- scenario manifest schema
- manifest fields for concern setup, actors, observer clients, seed publications, expected windows, and optional instability profile
- one runner contract that can target different backends

Exit criteria:

- one declared scenario can run against both a synthetic backend and a real mesh backend
- scenario behavior is reviewable without reading runner internals

## Phase 5: Baseline Real Mesh Scenario Matrix

Goal:

- learn actual behavior from repeated real mesh runs before deciding what to mimic

Initial scenario matrix:

- concern-only publication and observation
- plurality from multiple actors
- partial then final lifecycle
- delayed outcomes
- anomaly and domain mismatch
- temporary absence or no-response case
- restart and catch-up behavior

Deliverables:

- repeatable lab runner
- stored observation captures
- summary reports of event classes, ordering, timing envelopes, and failure modes

Exit criteria:

- each baseline scenario has been run repeatedly enough to establish observed ranges rather than one-off anecdotes
- the repo can point to measured behavior instead of guessed behavior

## Phase 6: Fidelity Target Derivation

Goal:

- convert real mesh lab findings into explicit testbed reproduction targets

Deliverables:

- documented event classes to preserve
- lifecycle shapes to preserve
- timing envelopes to approximate
- failure and degraded-condition classes that materially affect apps
- explicit list of behavior that is `lab-only` and should not be forced into deterministic synthetic replay

Exit criteria:

- the repo has a declared fidelity target per scenario family
- "near-same" is defined as measurable ranges, not intuition

## Phase 7: Instability And Degradation Profiles

Goal:

- reproduce the mesh conditions that most affect real app behavior

Profiles should cover:

- startup skew
- delayed actor joins
- jittered timing
- temporary isolation
- intermittent visibility
- pause and resume of actors
- delayed and absent outcomes

Deliverables:

- reusable instability profile schema
- profile support in the synthetic backend
- profile support in the real mesh lab where appropriate

Exit criteria:

- core scenarios can be run under at least one degraded profile
- degraded outcomes are captured as first-class evidence rather than ad hoc notes

## Phase 8: Parity Calibration

Goal:

- compare synthetic behavior against real mesh behavior for the same scenario family

Deliverables:

- parity comparison tooling
- drift report between synthetic runs and real mesh runs
- thresholds for acceptable timing drift, lifecycle drift, and failure-mode drift

Parity dimensions:

- event class parity
- lifecycle parity
- plurality parity
- delay envelope parity
- degraded-condition parity

Exit criteria:

- the repo can quantify where synthetic behavior matches real mesh behavior and where it does not
- scenarios that drift out of bounds are flagged for recalibration

## Phase 9: App-Facing Compatibility Harness

Goal:

- let real mesh-facing apps test against this repo directly

Deliverables:

- app-facing SDK or helper package
- scenario runner for integration tests
- browser automation support where relevant
- per-app expectation helpers for plurality, partiality, anomaly handling, and degraded timing

Exit criteria:

- a mesh-facing app can run against the synthetic lane for speed and the real mesh lab lane for fidelity
- app compatibility evidence is produced without app-specific harness rewrites every time

## Phase 10: Confidence And Release Gates

Goal:

- make repo claims operationally defensible

Confidence here means:

- the testbed reproduces same or near-same behavior seen in the real mesh lab for app-relevant scenario families

It does not mean:

- mesh never fails
- production failures are impossible

Deliverables:

- release gate criteria by lane
- minimum parity thresholds
- minimum repeated-run thresholds
- drift policy when upstream mesh behavior changes

Exit criteria:

- the repo can say what level of app-facing predictive confidence a green run actually supports
- confidence claims are backed by repeated parity evidence, not single-run optimism

## Recommended Build Order

1. Phase 0
2. Phase 1
3. Phase 2
4. Phase 3
5. Phase 4
6. Phase 5
7. Phase 6
8. Phase 7
9. Phase 8
10. Phase 9
11. Phase 10

## Immediate Next Work

The next practical implementation steps should be:

1. Add backend split scaffolding for `synthetic` and `mesh`.
2. Define a scenario manifest schema that can target both backends.
3. Build the first disposable real mesh lab scenario using a real concern, one observer, one organism, and one ratifier.
4. Add behavior capture artifacts for event classes, sequence shape, and timing envelope.
5. Use those captures to define the first parity target for the synthetic lane.

Execution detail for Phases 2 through 4:

- [phase-2-4-plan.md](./phase-2-4-plan.md)
