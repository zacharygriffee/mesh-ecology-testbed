# Resident Lab Host

`npm run lab:serve` starts a resident local lab host.

Its purpose is simple:

- keep a real-mesh-backed local test surface up between runs
- separate cold bring-up tax from app-facing participation behavior
- give local tests, labs, and debugging a stable place to connect

It is not:

- a mesh runtime
- a production surface
- a canonical proof surface
- a substitute for a real remote mesh

## Posture

The resident lab host is a local-only convenience surface for:

- repeated local app tests
- local manual debugging
- local lab experiments
- local parity and timing inspection

It should be spoken about as a `resident lab host` or `local lab service`, not as `the mesh`.

## Lifecycle

The host starts an internal real local mesh lab using:

- discovery host
- concern host
- observer client
- zero or more configured actors

It then warms in the background while exposing a local HTTP control surface.

The control surface may be up before the lab is mature. That is intentional.

## Readiness Gates

The resident host exposes three readiness gates through `GET /api/status`.

`mesh.ready`
- discovery, concern, and observer are up
- the concern is visible to the observer
- a client can inspect state and traces

`actors.ready`
- configured organisms and ratifiers are warmed
- actor-backed scenarios can be exercised without waiting for first join/warm

`mature.ready`
- the resident host is ready for ordinary mature-mesh-style local tests
- this is the usual gate app-facing tests should wait for

## Typical Use

Start the host:

```bash
npm run lab:serve
```

Poll status:

```bash
curl http://127.0.0.1:4328/api/status
```

Wait for:

- `readiness.mature.ready === true`

Then publish jobs, inspect state, and inspect traces against the warmed local lab host.

## When Not To Wait

Do not wait for `mature.ready` when the point of the test is:

- cold start behavior
- late actor join
- delayed actor warm-up
- degraded readiness handling

Those should be explicit tests, not the default app-facing posture.

## Current Backing Scenario

The current resident host defaults to:

- `organism-ratifier-basic`

That gives a simple local concern, one observer, one organism, and one ratifier.

The scenario can be switched on restart through the local API when another resident-ready scenario is added.
