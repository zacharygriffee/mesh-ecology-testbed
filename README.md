# mesh-ecology-testbed

`mesh-ecology-testbed` is a local participation testbed for exercising mesh-app behavior against controlled concern surfaces, tutorial actors, and observation-oriented response patterns.

It is designed to help an app inspect local participation behavior such as:

- immediate publication acceptance
- zero or more observed responses
- delayed responses
- partial responses that later finalize
- plurality and competing responses
- anomaly and domain-mismatch cases

## What This Repo Is

- a controlled local mesh participation harness
- an observation-oriented local test surface
- a reusable local fixture for mesh-adjacent apps
- a doctrine-aware probe/test environment

## What This Repo Is Not

- not a production mesh runtime
- not a discovery or replication proof surface
- not a scheduler, orchestration engine, or workflow engine
- not a substitute for `mesh-ecology`
- not a substitute for `mesh-ecology-packs`
- not Edge-specific

## Doctrine Boundary

This repo was shaped against:

- `mesh-ecology` for participation posture and actor boundaries
- `mesh-ecology-packs` for adjacent-repo, packaging, and non-overclaim posture

The resulting rule here is simple:

- this repo emits local observations and tutorial responses
- it does not claim canonical mesh proof
- it does not redefine mesh physics
- it does not imply that passing local scenarios means real-world mesh correctness

See:

- [docs/repo-boundary.md](docs/repo-boundary.md)
- [docs/doctrine-boundary.md](docs/doctrine-boundary.md)
- [docs/design-note.md](docs/design-note.md)
- [docs/phases.md](docs/phases.md)

## Quick Start

```bash
npm run dev
```

Then open `http://localhost:4318`.

If `4318` is already in use:

```bash
PORT=4319 npm run dev
```

## Initial Surface

Concerns:

- `math/basic`
- `text/transform`
- `scoring/estimate`
- `anomaly/testing`

Tutorial actors:

- `deterministic-responder`
- `transform-responder`
- `delayed-responder`
- `partial-responder`
- `plural-responder/low`
- `plural-responder/high`
- `domain-mismatch-responder`

Scenarios:

- `math-basic-deterministic`
- `text-partial-transform`
- `scoring-plurality-delay`
- `anomaly-domain-mismatch`

## Local Workflow

- `npm run dev` starts the local testbed server and browser-facing inspection UI.
- Use the scenario picker in the browser to publish example payloads and watch observations arrive live over SSE.
- `npm run example:session` runs a small scripted local session against the HTTP API.
- `npm run example:plurality` runs the plurality scenario from a script.
- `npm run lab:run -- concern-observe-basic` runs the first real local mesh lab scenario and writes artifacts under `.lab/runs/`.
- `npm test` validates the core local participation flows.

## Real Mesh Lab Requirement

The real mesh lab lane depends on a sibling `mesh-ecology` checkout.

Default expectation:

- `../mesh-ecology` exists beside this repo
- `../mesh-ecology` has had `npm install` run

Override path:

```bash
MESH_ECOLOGY_ROOT=/abs/path/to/mesh-ecology npm run lab:run -- concern-observe-basic
```

## API Surface

- `GET /api/catalog`
- `POST /api/publications`
- `GET /api/publications/:id/observations`
- `GET /api/observations`
- `GET /api/observations/stream`
- `POST /api/reset`

All responses are local testbed records. They are not shared truth and they are not mesh proof.

## Passing Tests Here Means

- the local testbed emitted the expected local observations
- the tutorial actors behaved as configured
- the browser/API surface preserved the intended scenario behavior

## Passing Tests Here Does Not Mean

- distributed correctness is proven
- discovery or replication is proven
- a real mesh deployment will converge
- actor posture is canonical on the real mesh
- a client is production-ready

## File Shape

```text
mesh-ecology-testbed/
  docs/
  fixtures/scenarios/
  public/
  scripts/
  src/testbed/
  test/
```
