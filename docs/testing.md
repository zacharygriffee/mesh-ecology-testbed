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

## Local-Layer Projection Log Review

Testbed also pressure-checks Edge's first single-writer projection-log proof as
review evidence only. The consumer in
`src/testbed/local-layer-projection-log-evidence.js` validates the exported
`edge_projection_event_log_entry.v0` shape without opening Corestore, running
Edge, or treating a local store root as an integration seam.

This review accepts the narrow proof only when it preserves:

- one semantic namespace prefix:
  `mesh-ecology > local-layer > projection-event > v0 > producer-mesh-ecology-edge > projection-operator-situation-view`
- a source-referenced Spine projection event inside the log entry
- matching projection event id, projection ref, and payload hash
- `appendedAt` as operator-local wall-clock observation metadata, not causal
  order
- local causal order from single-writer sequence and event refs
- collaborative causal order pointing toward Autobase or equivalent
  linearization instead of wall-clock timestamp comparison
- `singleWriterLocalCorestoreProof=true`
- `writesProjectionLog=true`
- `replicatedLocalLayerState=false`
- `autobaseBackend=false`
- `hyperbeeIndex=false`
- `httpSeam=false`
- `sshSeam=false`
- `localStoreRootIsIntegrationSeam=false`

It blocks:

- URL, path, localhost, IP, SSH, or HTTP scaffold values in namespace or
  transport refs
- storage, transport, or local-store seam overclaims
- missing source refs
- embedded payload promotion
- wall-clock-as-causal-order drift
- truth, completion, authority, or replicated-state claims

The review does not prove multi-device replication. It only makes the current
single-writer Corestore proof harder to accidentally promote into Autobase,
Hyperbee, HTTP/SSH, or local-file substrate before those lanes exist.

## Projection-Key Exchange Review

Testbed consumes Edge's bounded projection-key exchange proof as passive review
evidence only. The consumer in
`src/testbed/projection-key-exchange-evidence.js` validates
`edge_projection_key_exchange_proof` artifacts from Edge's HyperDHT direct-peer
/ Protomux RPC proof lane without opening HyperDHT, opening Protomux, opening
Corestore, running Edge, or treating the exchange as distributed readiness.

This review accepts the proof only when it preserves:

- `transportKind=protomux-rpc`
- `contactSeam=hyperdht_direct_peer`
- `transportRole=proof_lane`
- `scope=isolated_local_hyperdht`
- a 64-character projection-log `sourceCoreKey`
- semantic source refs, not URLs, endpoints, SSH strings, or local paths
- capability posture for `projection-source-core-key.exchange`
- append-log style refs with `truthClaimed=false` and `completionClaimed=false`
- `distributedReadinessClaimed=false`
- `replicatedStateClaimed=false`
- `autobaseBackend=false`
- `meshPublicationClaimed=false`

When Edge also supplies a read-only replica-inspection result, Testbed checks
that the exchanged `sourceCoreKey` is the same key used for replica inspection
and that the referenced semantic source refs remain visible in the inspected
latest entry.

The review blocks:

- HTTP, SSH, path, localhost, or IP-shaped source refs
- transport or capability posture drift away from HyperDHT / Protomux RPC
- distributed-readiness, replicated-state, Autobase, mesh-publication, truth,
  completion, or authority overclaims
- source-core-key mismatches between exchange evidence and replica inspection
- missing exchanged source refs in the inspected replica entry

This keeps the decentralized key handoff testable outside Edge before any
Autobase backend is introduced.

## Local-Layer Projection Happening Map Review

Testbed consumes causal-substrate's
`causal-substrate/edge-projection-log-happening-map/v1` output as a separate
review evidence lane. The consumer in
`src/testbed/local-layer-projection-happening-map-evidence.js` validates the
causal-substrate artifact without executing Edge, calling causal-substrate,
opening Corestore, replaying Edge's projection log, writing continuity records,
or accepting canonical history.

This review accepts the map only when:

- causal-substrate keeps the artifact review-only and evidence-only
- Edge remains the declared source repo and `edge_projection_event_log_entry.v0`
  remains the source schema
- happening refs preserve source entry, projection event, projection, payload
  hash, namespace, source, transport, sequence, and observation-time refs
- wall-clock temporal refs are explicitly observation metadata, not causal
  order
- single-writer order comes from sequence and refs
- collaborative causal order points toward Autobase or equivalent linearization
- causal-substrate does not open Edge Corestore, replay the log, write
  continuity records, start a backend, publish to mesh, claim causal truth, or
  accept canonical history

It blocks namespace, transport, local-store, wall-clock causal-order, canonical
history, truth, authority, and boundary overclaims. This closes the current
single-writer projection loop as review evidence only: Edge emits the log entry,
causal-substrate maps it to happening refs, and Testbed pressures that mapping
without turning it into local-layer truth.

## Local-Layer Frontier Candidate Review

Testbed consumes causal-substrate's
`causal-substrate/local-layer-frontier-candidate-evidence/v1` output as a
review evidence lane for the Spine collaborative causality candidate. The
consumer in `src/testbed/local-layer-frontier-candidate-evidence.js` validates
the causal-substrate artifact without calling causal-substrate, opening
Autobase, opening Corestore, writing continuity records, or accepting canonical
history.

This review accepts the evidence only when it preserves:

- writer refs
- head refs
- linearized entry refs
- causal frontier refs
- source projection event refs
- source happening refs
- Autobase or equivalent linearization as the collaborative ordering candidate
- wall-clock time as observation metadata, not causal order

It blocks boundary overclaims, HTTP/SSH/local path seam refs, missing
writer/head/frontier/source refs, wall-clock ordering drift, canonical-history
acceptance, layer settlement claims, truth claims, authority claims, and mesh
publication claims. This keeps the next Autobase step from inventing
collaborative causality semantics inside backend code.

## Resolution Refinement Review

Testbed consumes causal-substrate's
`causal-substrate/resolution-refinement-evidence/v1` output as a passive review
evidence lane for resolution-relative happenings. The consumer in
`src/testbed/resolution-refinement-evidence.js` validates compatible
coarse-to-refined happening evidence without calling causal-substrate, opening
Autobase, opening Corestore, writing continuity records, or accepting canonical
history.

This review accepts compatible refinement when refined happenings aggregate
back to the coarse happening and the coarse happening remains a valid source
ref. It blocks contradictory refinement until explicit divergence posture is
present, and it blocks causal-substrate authority, backend, HTTP/SSH/local
path, and universal-observer overclaims.

## Edge Self-Work Trace Review

Testbed consumes causal-substrate's
`causal-substrate/edge-self-work-trace-evidence/v1` output as a passive review
lane for the Edge self-work goal point. The consumer in
`src/testbed/edge-self-work-trace-evidence.js` requires operator intent refs,
work packet refs, operator mediation refs, executor receipt refs, verification
refs, causal refs, and operator return-surface refs.

This review blocks causal-substrate execution, Edge calls, backend ownership,
completion/truth claims, and HTTP/SSH/local path refs. It proves that the
self-work loop is traceable without making causal-substrate or Testbed the
executor.

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
