import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  buildTransportLaneComparisonEvidence,
  listTransportLaneStates,
  TESTBED_TRANSPORT_LANE_COMPARISON_SCHEMA_VERSION,
  TESTBED_TRANSPORT_LANE_STATES
} from "../src/testbed/transport-lane-evidence.js";

const CREATED_AT = "2026-05-14T12:00:00.000Z";

function directProof() {
  return {
    contactSucceeded: true,
    distributedReadinessClaimed: false,
    selectedTransport: {
      transportKind: "protomux-rpc",
      contactSeam: "hyperdht_direct_peer"
    },
    readinessEvidence: {
      distributedReadinessClaimed: false
    },
    capabilityDescriptor: {
      proofScope: "bounded_direct_participant_contact",
      discoveryRequired: false
    }
  };
}

function assertPassiveEvidence(evidence) {
  assert.equal(evidence.reviewOnly, true);
  assert.equal(evidence.evidenceOnly, true);
  assert.equal(evidence.testbedOwnsTransport, false);
  assert.equal(evidence.testbedExecutedContact, false);
  assert.equal(evidence.productionProofClaimed, false);
  assert.equal(evidence.distributedReadinessProofClaimed, false);
  assert.equal(evidence.meshTruthClaimed, false);
  assert.equal(evidence.completionClaimed, false);
}

test("transport comparison keeps HyperDHT direct contact distinct from Hyperswarm observation", () => {
  const evidence = buildTransportLaneComparisonEvidence({
    directContactProof: directProof(),
    swarmObservation: {
      transportKind: "hyperswarm",
      contactSeam: "hyperswarm_discovery",
      observationWindowMs: 45_000,
      peersObserved: 2,
      distributedReadinessClaimed: false
    },
    createdAt: CREATED_AT
  });

  assert.equal(evidence.artifactKind, "testbed_transport_lane_comparison");
  assert.equal(evidence.schemaVersion, TESTBED_TRANSPORT_LANE_COMPARISON_SCHEMA_VERSION);
  assert.equal(evidence.directContactLane.state, TESTBED_TRANSPORT_LANE_STATES.DIRECT_CONTACT_PROVEN);
  assert.equal(evidence.directContactLane.boundedContactClaim, true);
  assert.equal(evidence.directContactLane.discoveryClaimed, false);
  assert.equal(evidence.directContactLane.distributedReadinessClaimed, false);
  assert.equal(evidence.swarmDiscoveryLane.state, TESTBED_TRANSPORT_LANE_STATES.SWARM_OBSERVED);
  assert.equal(evidence.swarmDiscoveryLane.pluralEvidenceClaimed, true);
  assert.equal(evidence.swarmDiscoveryLane.distributedReadinessClaimed, false);
  assertPassiveEvidence(evidence);
});

test("transport comparison treats zero-peer swarm windows as bounded absence", () => {
  const evidence = buildTransportLaneComparisonEvidence({
    directContactProof: directProof(),
    swarmObservation: {
      transportKind: "hyperswarm",
      contactSeam: "hyperswarm_discovery",
      observationWindowMs: 45_000,
      peersObserved: 0,
      boundedAbsence: true,
      flakeClass: "transport_window_elapsed"
    },
    createdAt: CREATED_AT
  });

  assert.equal(evidence.directContactLane.state, TESTBED_TRANSPORT_LANE_STATES.DIRECT_CONTACT_PROVEN);
  assert.equal(evidence.swarmDiscoveryLane.state, TESTBED_TRANSPORT_LANE_STATES.SWARM_BOUNDED_ABSENCE);
  assert.equal(evidence.swarmDiscoveryLane.boundedAbsence, true);
  assert.equal(evidence.swarmDiscoveryLane.flakeClass, "transport_window_elapsed");
  assert.equal(evidence.swarmDiscoveryLane.pluralEvidenceClaimed, false);
  assertPassiveEvidence(evidence);
});

test("transport comparison does not promote failed direct contact or swarm readiness claims", () => {
  const proof = directProof();
  proof.contactSucceeded = false;
  proof.readinessEvidence.distributedReadinessClaimed = true;
  const evidence = buildTransportLaneComparisonEvidence({
    directContactProof: proof,
    swarmObservation: {
      peersObserved: 1,
      distributedReadinessClaimed: true
    },
    createdAt: CREATED_AT
  });

  assert.equal(evidence.directContactLane.state, TESTBED_TRANSPORT_LANE_STATES.DIRECT_CONTACT_NOT_PROVEN);
  assert.equal(evidence.directContactLane.boundedContactClaim, false);
  assert.equal(evidence.directContactLane.distributedReadinessClaimed, true);
  assert.equal(evidence.swarmDiscoveryLane.distributedReadinessClaimed, true);
  assert.equal(evidence.distributedReadinessProofClaimed, false);
  assertPassiveEvidence(evidence);
});

test("transport lane state vocabulary is bounded", () => {
  assert.deepEqual(listTransportLaneStates(), [
    "direct_contact_proven",
    "direct_contact_not_proven",
    "swarm_observed",
    "swarm_bounded_absence",
    "swarm_not_observed"
  ]);
});

test("transport comparison fixtures preserve HyperDHT certainty and Hyperswarm uncertainty", async () => {
  const observed = JSON.parse(await readFile(
    new URL("./fixtures/transport-lanes/hyperdht-direct-plus-swarm-observed.json", import.meta.url),
    "utf8"
  ));
  const boundedAbsence = JSON.parse(await readFile(
    new URL("./fixtures/transport-lanes/hyperdht-direct-plus-swarm-bounded-absence.json", import.meta.url),
    "utf8"
  ));

  assert.equal(observed.directContactLane.state, TESTBED_TRANSPORT_LANE_STATES.DIRECT_CONTACT_PROVEN);
  assert.equal(observed.swarmDiscoveryLane.state, TESTBED_TRANSPORT_LANE_STATES.SWARM_OBSERVED);
  assert.equal(observed.swarmDiscoveryLane.pluralEvidenceClaimed, true);
  assert.equal(boundedAbsence.directContactLane.state, TESTBED_TRANSPORT_LANE_STATES.DIRECT_CONTACT_PROVEN);
  assert.equal(boundedAbsence.swarmDiscoveryLane.state, TESTBED_TRANSPORT_LANE_STATES.SWARM_BOUNDED_ABSENCE);
  assert.equal(boundedAbsence.swarmDiscoveryLane.boundedAbsence, true);
  for (const fixture of [observed, boundedAbsence]) {
    assert.equal(fixture.reviewOnly, true);
    assert.equal(fixture.evidenceOnly, true);
    assert.equal(fixture.testbedOwnsTransport, false);
    assert.equal(fixture.distributedReadinessProofClaimed, false);
    assert.equal(fixture.meshTruthClaimed, false);
  }
});
