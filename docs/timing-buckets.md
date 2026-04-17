# Timing Buckets

The resident lab host separates local timing into explicit buckets so app teams do not confuse harness startup with mesh-facing participation behavior.

Current buckets are reported by `GET /api/status`.

## coldMeshBringupMs

Time from resident host start until `mesh.ready`.

This includes:

- discovery host bring-up
- concern host bring-up
- concern advertisement
- observer attach
- observer first successful view of the concern

This is harness bring-up tax.

## coldActorsReadyMs

Time from resident host start until `actors.ready`.

This includes:

- actor runner creation
- actor concern discovery
- actor concern warm-up

This is actor bring-up tax.

## coldMatureReadyMs

Time from resident host start until `mature.ready`.

This is the full cold path to an app-facing mature local lab host.

## How To Use These Buckets

Use them to answer:

- how long did cold lab startup take?
- how long did actor warm-up take?
- when was the lab ready for ordinary app-facing tests?

Do not use them as a proxy for:

- how long a mature mesh publication takes
- how quickly ratification happens once the lab is already warm

## Practical Interpretation

For ordinary app-facing tests:

- wait for `mature.ready`
- then measure publish-to-observation timing separately

For cold-start tests:

- intentionally include the cold buckets
- verify that the app behaves sensibly before readiness

## Why This Matters

Without timing buckets, cold startup delays can be mistaken for normal mesh participation timing.

That leads to bad assumptions:

- apps over-fitting to startup delay
- app teams blaming mesh participation for harness bring-up
- unclear expectations about what a mature local test surface should feel like

The timing buckets exist to keep those concerns separate.
