# Testing

## What The Test Suite Covers

- local publication acceptance
- partial response then final response
- plurality across multiple tutorial actors
- delayed responses
- anomaly and domain mismatch classification
- HTTP API behavior over the same local testbed core

## What The Test Suite Does Not Cover

- discovery correctness
- replication correctness
- real transport behavior
- remote runtime participation
- writer admission

## Recommended Local Commands

```bash
npm test
npm run dev
npm run example:session
npm run lab:run -- concern-observe-basic
npm run lab:run -- organism-ratifier-basic
npm run lab:serve
```

## Test Classification

- core tests here are probe/test validation
- they are valuable regression checks
- they are not canonical mesh proof

## Real Mesh Lab Note

The real mesh lab lane currently includes:

- `concern-observe-basic` for concern discovery, publication, state, and trace observation
- `organism-ratifier-basic` for one concern, one observer client, one runner-backed organism, and one runner-backed ratifier

These scenarios use actual `mesh-ecology` concern and discovery surfaces plus an SDK observer client. The actor-backed scenario also boots a canonical concern `STATE` row before seeding jobs so runner warm-up matches upstream expectations.

It requires:

- a sibling checkout by default at `../mesh-v0-2`
- `../mesh-ecology` is also accepted as a fallback sibling path
- `npm install` already run in that sibling repo

Use `MESH_ECOLOGY_ROOT` to override the default sibling path when needed.

Expect this lane to run materially slower than the synthetic testbed tests. Real actor bring-up and mesh observation materialization can take on the order of one to two minutes in this environment.

## Resident Lab Host Note

The resident lab host is for local testing, labs, and debugging against a mature local test surface.

It should be treated as:

- a long-lived local lab host
- a way to separate cold bring-up tax from app-relevant participation timing
- a convenience surface for repeated local mesh-facing app tests

It should not be treated as:

- a mesh runtime
- a production participation surface
- proof that a real remote mesh is healthy

When using `npm run lab:serve`, prefer waiting for `mature.ready` from `GET /api/status` before running ordinary app-facing tests. Use pre-readiness interaction only for explicit cold-start or degraded-condition testing.
