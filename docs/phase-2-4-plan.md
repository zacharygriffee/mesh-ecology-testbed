# Phase 2 Through Phase 4 Plan

This document expands the roadmap in [phases.md](./phases.md) into a concrete execution list for:

- Phase 2: Real Mesh Lab Foundation
- Phase 3: Real Actor Wrapper Layer
- Phase 4: Shared Scenario Manifest

The aim is to get `mesh-ecology-testbed` from a synthetic local harness to a repo that can:

- run real local mesh participation scenarios
- launch real organisms and ratifiers under controlled test conditions
- measure what real mesh behavior looks like locally
- reuse the same scenario declarations across synthetic and real-mesh lanes

## Guiding Rules

- `mesh-ecology-testbed` remains adjacent and must not redefine mesh physics.
- Real mesh behavior should come from real participation surfaces, not from callbacks pretending to be actors.
- Wrappers may manage lifecycle and configuration, but must not mutate actor semantics.
- Direct cross-runtime store inspection may exist only as diagnostic support, not as the primary app-facing observation path.
- Scenario declarations should be explicit enough to review without reading runner internals.

## Phase 2: Real Mesh Lab Foundation

### Objective

Stand up a disposable local mesh lab that uses actual `mesh-ecology` concern and discovery participation so this repo can measure real local behavior instead of guessing what to mimic.

### Workstreams

#### 2.1 Lab Workspace Layout

Create a disposable lab workspace model under repo control.

Planned shape:

```text
.lab/
  runs/
    <run-id>/
      topology.json
      artifacts/
      logs/
      stores/
        discovery/
        concern-host/
        observer/
        org-*/
        rat-*/
```

Tasks:

- define run directory layout
- define cleanup rules
- define artifact retention policy
- ensure runs are isolated from one another

Deliverables:

- `src/lab/run-layout.js`
- `src/lab/run-id.js`
- `scripts/lab-clean.mjs`

#### 2.2 Topology Controller

Add a lab topology controller that can create and tear down a minimal real-mesh local topology.

Minimum topology for the first milestone:

- one discovery participant
- one concern host
- one observer client

Tasks:

- choose supported runtime entrypoints from `mesh-ecology`
- materialize topology config from repo-local inputs
- start and stop processes cleanly
- capture process metadata and logs

Deliverables:

- `src/lab/topology-controller.js`
- `src/lab/process-registry.js`
- `src/lab/runtime-config.js`
- `scripts/lab-up.mjs`
- `scripts/lab-down.mjs`

#### 2.3 App-Facing Observation Capture

Add a primary observation path based on supported surfaces and explicit runtime outputs.

Tasks:

- define observation capture shape for real mesh lab runs
- collect concern/discovery-facing observations without making store peeks the main truth path
- attach timestamps, participant identity, and scenario identity to captures

Deliverables:

- `src/lab/observation-capture.js`
- `src/lab/capture-writers.js`
- `docs/testing.md` update for lab evidence handling

#### 2.4 First Real Lab Scenario

Run the simplest possible real-mesh scenario before adding more abstraction.

First required scenario:

- one concern
- one observer
- one seed publication
- no organism or ratifier yet

Tasks:

- publish to a real concern
- observe acceptance/materialized updates
- persist evidence artifacts for the run

Deliverables:

- `fixtures/scenarios/mesh/concern-observe-basic.json`
- `scripts/lab-run-scenario.mjs`
- `test/lab/concern-observe-basic.test.js`

### Phase 2 Exit Criteria

- repo can bring up and tear down a disposable real local topology
- repo can run one concern-observation scenario against real local mesh surfaces
- repo emits run artifacts and observation captures for that scenario
- supported surfaces are the main observation lane

### Phase 2 Milestones

- `2A`: disposable run layout and cleanup
- `2B`: topology startup and shutdown
- `2C`: observation capture
- `2D`: first real concern-observation scenario

## Phase 3: Real Actor Wrapper Layer

### Objective

Add a thin wrapper layer so the testbed can launch actual organisms and ratifiers in the real mesh lab without turning them into fake in-process tutorial actors.

### Workstreams

#### 3.1 Actor Descriptor Contract

Define a repo-local actor descriptor format for testbed use.

Descriptor concerns:

- actor identity
- actor class: organism or ratifier
- actor posture classification: canonical actor, auxiliary, or probe/test
- runtime entrypoint
- required configuration
- expected concern attachment

Deliverables:

- `src/actors/descriptor-schema.js`
- `fixtures/actors/*.json`
- `docs/repo-boundary.md` update for actor wrapper posture

#### 3.2 Actor Launcher

Build a process launcher that starts real actors with controlled config and logs.

Tasks:

- launch actor processes with explicit env/config inputs
- assign isolated workdirs and stores
- collect stdout/stderr
- expose lifecycle hooks for start, stop, restart, and health timeout

Deliverables:

- `src/actors/launch-actor.js`
- `src/actors/actor-runtime.js`
- `src/actors/actor-logs.js`

#### 3.3 Wrapper Boundaries

Keep wrappers thin and explicit.

Wrappers may:

- project config
- assign stores and logs
- manage lifecycle
- record observation metadata

Wrappers must not:

- rewrite actor behavior
- invent synthetic responses for real actors
- silently change publish or observe semantics
- become a scheduler or workflow engine

Deliverables:

- `docs/design-note.md` update for wrapper boundaries
- wrapper contract comments in `src/actors/*`

#### 3.4 First Real Actor Scenario

After concern-only behavior works, add one organism and one ratifier.

First required real actor scenario:

- one concern
- one observer
- one organism
- one ratifier
- one seed publication

Tasks:

- launch actor set
- verify actors participate through supported surfaces
- capture resulting observation stream
- preserve logs/artifacts per actor

Deliverables:

- `fixtures/scenarios/mesh/organism-ratifier-basic.json`
- `test/lab/organism-ratifier-basic.test.js`
- artifact capture under `.lab/runs/<run-id>/`

### Phase 3 Exit Criteria

- repo can launch a real organism and a real ratifier through wrapper-managed lifecycle
- wrappers remain thin and do not redefine actor behavior
- actor logs and participation evidence are retained per run
- one end-to-end actor-backed scenario runs successfully in the real mesh lab

### Phase 3 Milestones

- `3A`: actor descriptor contract
- `3B`: actor launcher and lifecycle hooks
- `3C`: wrapper-boundary documentation
- `3D`: first organism plus ratifier scenario

## Phase 4: Shared Scenario Manifest

### Objective

Define one scenario manifest format that can be executed by either the synthetic backend or the real mesh lab backend.

### Workstreams

#### 4.1 Scenario Schema

Create a versioned manifest schema.

Core fields should include:

- `id`
- `title`
- `backendTargets`
- `concerns`
- `actors`
- `observerClients`
- `seedPublications`
- `expectedObservationWindows`
- `instabilityProfile`
- `evidencePolicy`

Deliverables:

- `src/scenarios/schema.js`
- `fixtures/schema/scenario-manifest.v1.json`

#### 4.2 Backend-Neutral Runner Contract

Define the runner API shared by synthetic and mesh backends.

Minimal contract:

- `prepareScenario(manifest)`
- `startScenario()`
- `collectObservations()`
- `stopScenario()`
- `collectArtifacts()`

Deliverables:

- `src/backends/backend-contract.js`
- `src/backends/synthetic/index.js`
- `src/backends/mesh/index.js`

#### 4.3 Scenario Authoring Rules

Keep scenarios reviewable and explicit.

Rules:

- concern setup must be declared, not inferred
- actor set must be declared, not hidden in runner defaults
- expected observation windows should describe event class and timing envelope, not exact single-run timestamps
- instability profile use must be explicit

Deliverables:

- `docs/scenario-authoring.md`
- inline examples in `fixtures/scenarios/`

#### 4.4 Dual-Backend Demonstration

Prove the manifest abstraction is real.

Required demonstration:

- one scenario that can run on synthetic backend
- the same scenario class can run on mesh backend
- observation outputs can be compared later in parity work

Deliverables:

- `fixtures/scenarios/shared/partial-plurality-basic.json`
- `test/scenarios/shared-manifest.test.js`

### Phase 4 Exit Criteria

- one scenario manifest can target both synthetic and mesh backends
- scenario declarations are explicit enough to review directly
- backend runner contract is stable enough to support parity work next

### Phase 4 Milestones

- `4A`: manifest schema
- `4B`: backend contract
- `4C`: scenario authoring rules
- `4D`: dual-backend scenario proof

## Recommended Implementation Order Across Phases 2 Through 4

1. Build disposable lab run layout.
2. Build topology controller for concern-only runs.
3. Add observation capture and run artifacts.
4. Prove one concern-only real mesh scenario.
5. Define actor descriptor contract.
6. Add actor launcher and thin wrapper lifecycle.
7. Prove one organism plus ratifier scenario.
8. Define versioned shared scenario manifest.
9. Add backend-neutral runner contract.
10. Prove one scenario class across both synthetic and mesh backends.

## Immediate Next Tasks

If work begins now, the first concrete task list should be:

1. Scaffold `src/lab/`, `src/actors/`, and `src/backends/mesh/`.
2. Add run layout and topology controller for a concern-only real mesh lab run.
3. Add one script to bring the lab up and one script to run a concern-only scenario.
4. Add observation capture artifacts for that run.
5. Only after that, add actor wrapper descriptors and lifecycle support.

## Out Of Scope For Phases 2 Through 4

Do not absorb these yet:

- full parity drift scoring
- rich instability profile matrix
- browser automation certification
- repo-wide confidence gates

Those belong later, after real mesh lab behavior is observable and scenario declarations are stable.

