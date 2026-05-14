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

## Mesh-Surface Local Lab Note

The mesh-surface local lab lane currently includes:

- `concern-observe-basic` for concern discovery, publication, state, and trace observation
- `organism-ratifier-basic` for one concern, one observer client, one runner-backed organism, and one runner-backed ratifier

These scenarios use actual `mesh-ecology` concern and discovery surfaces plus an SDK observer client. The actor-backed scenario also boots a canonical concern `STATE` row before seeding jobs so runner warm-up matches upstream expectations.

Current proof scope:

- `proofKind: mesh_surface_local_lab`
- `transport: fakeswarm`
- `contactSeam: deterministic_local_fakeswarm`
- `decentralizedSeam: deferred`
- `distributedReadinessClaimed: false`

This lane is a real mesh-surface local lab, not a distributed-readiness proof. It exercises real concern/discovery/actor mechanics through deterministic local `fakeswarm`; decentralized contact through Hyperswarm/HyperDHT/protomux-style seams remains deferred to upstream transport lanes.

## Contact Proof Follow-Up Readiness

The next Testbed contact lab should not invent its own decentralized seam. It should wait for `mesh-v0-2` to implement the direct contact proof lane described in `docs/dev/contact-proof-lane.md`, then consume that lane as upstream evidence.

Until that lane exists, Testbed should keep emitting:

- `transport: fakeswarm`
- `contactSeam: deterministic_local_fakeswarm`
- `decentralizedSeam: deferred`
- `distributedReadinessClaimed: false`

This keeps Testbed useful for local mesh-surface behavior while preventing the deterministic lab seam from becoming accidental proof of HyperDHT, Protomux RPC, NAT traversal, or distributed readiness.

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
- proof of decentralized contact or distributed readiness

When using `npm run lab:serve`, prefer waiting for `mature.ready` from `GET /api/status` before running ordinary app-facing tests. Use pre-readiness interaction only for explicit cold-start or degraded-condition testing.
