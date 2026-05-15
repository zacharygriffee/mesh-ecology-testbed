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

Testbed does not invent its own decentralized seam. It consumes producer-owned
direct contact proof lanes as upstream evidence, starting with the `mesh-v0-2`
direct contact proof lane described in `docs/dev/contact-proof-lane.md` and the
`mesh-ecology-platform` local-service proof lane.

The Testbed-owned consumer in `src/testbed/contact-proof-evidence.js` reads the
`mesh_contact_proof_evidence` and
`platform_local_service_contact_proof_evidence` shapes and emits
`testbed_contact_proof_evidence` as review evidence only. When the upstream
proof includes `capabilityAdvertisement.capabilities[]`, Testbed treats the
advertised participant capability as the preferred descriptor and preserves the
inline `capabilityDescriptor` as fallback posture. It blocks overclaims such as
treating the direct-peer proof as a mesh-layer default or required discovery
proof.

When the producer includes append-log-ready fields, Testbed preserves
`proofId`, `payloadHash`, `payloadHashAlgorithm`, `appendLogRefs.entryId`,
`appendLogRefs.capabilityAdvertisementRef`, and
`appendLogRefs.selectedTransportRef` without treating those refs as runtime
execution or distributed readiness.

Current contact-proof review requires those producer-owned proof/hash/append-log
refs to be present. If the append-log refs claim truth or completion, Testbed
blocks the evidence instead of treating the proof as visible.

The static fixture at
`test/fixtures/cross-repo-contact-proof/platform-edge-causal-testbed-handoff.json`
is the current golden handoff packet for the repo family. It shows the same
Platform proof refs preserved through Edge readiness, Causal Substrate evidence,
and Testbed review evidence.

The mesh-surface local lab still emits:

- `transport: fakeswarm`
- `contactSeam: deterministic_local_fakeswarm`
- `decentralizedSeam: deferred`
- `distributedReadinessClaimed: false`

This keeps Testbed useful for local mesh-surface behavior while preventing the deterministic lab seam from becoming accidental proof of HyperDHT, Protomux RPC, NAT traversal, or distributed readiness. Direct contact evidence comes from the upstream mesh-v0-2 proof lane, not from Testbed's `fakeswarm` lab seam.

`src/testbed/transport-lane-evidence.js` provides the comparison shape used for
this distinction:

- HyperDHT direct peer + Protomux RPC can be recorded as bounded direct contact
  when upstream proof succeeds.
- Hyperswarm discovery is recorded as observation, plural evidence, or bounded
  absence within an observation window.
- Neither lane becomes production readiness, mesh truth, or completion inside
  Testbed.

Reusable fixture examples live under `test/fixtures/transport-lanes/`. They are
static evidence fixtures for agent review and ecosystem audits; they do not run
transport, own a decentralized seam, or convert a bounded Hyperswarm absence
into failure.

## Local-Layer Projection Event Review

Testbed also consumes Edge's Spine-shaped local-layer projection event as
review evidence only. The consumer in
`src/testbed/local-layer-projection-event-evidence.js` checks that the event
preserves producer refs, source refs, transport refs, a `sha256-canonical-json`
payload hash, single-writer proof posture, storage posture, and explicit
non-claims.

This review intentionally runs before any Hypercore/Corestore or Autobase
backend exists. It blocks:

- malformed projection events
- missing required source refs
- stale source refs supplied by the reviewer
- truth, completion, authority, durable-state, or replicated-state claims
- storage backend overclaims
- HTTP/SSH/localhost compatibility refs presented as transport proof

The Testbed evidence does not write a projection log, install a storage backend,
claim local-layer durability, execute Edge, or make the local JSON status export
into substrate.

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
