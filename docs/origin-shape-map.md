# Origin Shape Map

Read-only first adoption map for `mesh-ecology-testbed`.

This document maps repo-local terms to Origin Shape posture so agents do not infer vocabulary relationships ad hoc. It does not make Origin Shape an implementation dependency, rename code, change behavior, or promote every local term to canon.

## Repo Owns

- Local participation test harness behavior.
- Synthetic scenario fixtures and tutorial actor response patterns.
- Resident local lab host posture for repeated local testing.
- Local observation capture, timing buckets, and parity-oriented evidence records.
- Testbed-owned evidence labels for local fixture review.

## Repo Does Not Own

- Primitive mesh runtime semantics.
- Discovery or replication truth.
- Production participation authority.
- Packs control-surface doctrine.
- Edge operator loop semantics.
- Origin Shape canonical terminology.

## Local Terms And Origin Slice Mapping

| Local term | Origin Shape mapping | Migration posture | Compatibility alias | Owner decision |
| --- | --- | --- | --- | --- |
| local participation testbed | layer expression | adopted repo term | local test surface | Keep local; map to bounded participation surface. |
| observation | evidence | shared candidate / high-drift | local observation | Keep local-qualified where ambiguity matters. |
| local observation | evidence | adopted repo term | observation | Preferred repo wording for testbed outputs. |
| concern surface | layer expression | shared candidate | concern | Keep aligned with mesh-v0-2; do not redefine. |
| discovery surface | layer expression | shared candidate / high-drift | discovery | Use only for real local lab surfaces, not fixture truth. |
| tutorial actor | composition | compatibility alias | actor | Keep local; not a real mesh actor admission claim. |
| organism | composition | shared candidate / high-drift | actor-backed organism | Use when the real mesh lab actually runs organism-shaped actors. |
| ratifier | composition | shared candidate / high-drift | actor-backed ratifier | Use when the real mesh lab actually runs ratifier-shaped actors. |
| resident lab host | scaffold | adopted repo term | local lab service | Keep; label as local-only convenience. |
| mesh-surface local lab | layer expression | adopted repo term | real mesh lab | Keep; evidence source for fidelity targets, not production or distributed-readiness proof. |
| synthetic lane | scaffold | adopted repo term | synthetic backend | Keep; local deterministic fixture path. |
| fixture proof | evidence | compatibility alias / high-drift | fixture evidence | Prefer `fixture evidence`; avoid proof unless scoped. |
| mesh lab evidence | evidence | shared candidate | real lab evidence | Keep; local observed real-mesh-backed evidence only. |
| parity evidence | composition | shared candidate | fidelity comparison | Keep for comparing synthetic and lab observations. |
| maturity / mature.ready | pressure | layer expression | readiness gate | Keep local; not completion proof. |
| cold start | pressure | adopted repo term | cold lane | Keep local; maps to lifecycle pressure. |
| timing bucket | evidence | adopted repo term | timing profile | Keep local; candidate for mapped alias later. |
| instability profile | pressure | shared candidate / high-drift | degraded profile | Keep explicit; do not canonize as deployment profile. |
| backendTargets | scaffold | compatibility alias | runner target lane | Keep manifest field; read as test-runner lane, not authority target. |
| expectedObservationWindows | evidence | compatibility alias | observation expectation | Keep manifest field; not truth guarantee. |

## Scaffold Terms

| Scaffold term | Current use | Drift risk | Correction posture |
| --- | --- | --- | --- |
| `http://localhost:4318` | Browser-facing synthetic testbed server. | Local HTTP can look like durable transport canon. | Label as local dev/test scaffold. |
| `http://127.0.0.1:4328` | Resident lab host API. | Local service endpoint can look like mesh runtime API. | Keep as local lab service transport scaffold. |
| `fakeswarm` | Deterministic local contact seam for mesh-surface lab scenarios. | Can look like decentralized contact proof if unlabeled. | Label as local deterministic seam; direct contact evidence comes from mesh-v0-2 proof artifacts. |
| `.lab/runs/` | Disposable lab run artifacts. | Files can become accidental substrate. | Keep replaceable; call local artifact scaffold. |
| `observations.ndjson` | Local observation capture inside lab runs. | JSONL evidence can look like durable substrate. | Keep as local evidence scaffold, not truth. |
| `MESH_ECOLOGY_ROOT` | Adjacent mesh-v0-2 path override. | Local path can look like dependency canon. | Keep operator-local path scaffold. |
| sibling `../mesh-v0-2` | Default adjacent real mesh lab checkout. | Workspace shape can look mandatory globally. | Keep local checkout convention only. |
| `fixtures/scenarios/*.json` | Synthetic and lab scenario manifests. | Fixture schema can outrun doctrine. | Keep testbed-owned manifest scaffold. |
| `expectedObservationWindows` | Test timing and event-class expectations. | May be mistaken for proof of convergence. | Label as local observation expectation. |
| `backendTargets` | Runner lane selection. | May be mistaken for platform target profile. | Keep as testbed runner scaffold. |
| resident lab API endpoints | Local mature lab host control surface. | API can look like production participation contract. | Label as local-only host API. |

## High-Drift Terms

- `observation`: must remain local-qualified unless referencing a specific evidence record.
- `proof`: prefer `evidence` unless a document already defines a scoped proof posture.
- `organism` / `ratifier`: use only when actor-backed real mesh lab behavior is actually involved.
- `surface`: qualify as `local test surface`, `concern surface`, or `discovery surface`.
- `profile`: qualify as `instability profile` or `timing profile`; do not let it collide with target profiles in Edge/Discovery Ops UI.
- `mature`: readiness gate only; not completion or production readiness.
- `mesh-surface local lab` / `real mesh lab`: evidence source for local fidelity, not deployment or distributed-readiness proof; next decentralized contact evidence should come from the mesh-v0-2 proof lane, not from a Testbed-only transport invention.

## Terms Not To Rename Yet

- `resident lab host`
- `mature.ready`
- `fixture proof` where already used in older docs
- `backendTargets`
- `expectedObservationWindows`
- `instabilityProfile`
- `tutorial actor`

## Term Evolution Posture

| Local term | Origin Shape mapping | Migration posture | Compatibility alias | Owner decision |
| --- | --- | --- | --- | --- |
| fixture proof | evidence | mapped alias | fixture evidence | Prefer fixture evidence in new docs; keep old phrase readable. |
| observation | evidence | mapped alias | local observation | Use local observation when scope matters. |
| resident lab host | scaffold | stable layer expression | local lab service | Keep as repo-owned scaffold term. |
| real mesh lab | layer expression | compatibility alias | mesh-surface local lab | Prefer mesh-surface local lab in new docs so decentralized contact is not implied. |
| backendTargets | scaffold | compatibility alias | runner target lane | Do not export as shared target vocabulary. |
| instability profile | pressure | shared candidate | degraded profile | Candidate for Origin Shape pressure mapping later. |

## First Adoption Rule

Use this map as a read-only interpretation aid. Corrections should stay small: label local HTTP, local paths, lab APIs, scenario manifests, and observation files as scaffolds or local evidence before considering any rename.
