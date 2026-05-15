export const TESTBED_TRANSPORT_LANE_COMPARISON_SCHEMA_VERSION =
  "testbed_transport_lane_comparison.v1";

export const TESTBED_TRANSPORT_LANE_STATES = Object.freeze({
  DIRECT_CONTACT_PROVEN: "direct_contact_proven",
  DIRECT_CONTACT_NOT_PROVEN: "direct_contact_not_proven",
  SWARM_OBSERVED: "swarm_observed",
  SWARM_BOUNDED_ABSENCE: "swarm_bounded_absence",
  SWARM_NOT_OBSERVED: "swarm_not_observed"
});

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value, fallback = null) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
}

function selectedTransport(proof) {
  return isPlainObject(proof?.selectedTransport) ? proof.selectedTransport : {};
}

function directContactState(proof) {
  const transport = selectedTransport(proof);
  return proof?.contactSucceeded === true &&
    transport.transportKind === "protomux-rpc" &&
    transport.contactSeam === "hyperdht_direct_peer"
    ? TESTBED_TRANSPORT_LANE_STATES.DIRECT_CONTACT_PROVEN
    : TESTBED_TRANSPORT_LANE_STATES.DIRECT_CONTACT_NOT_PROVEN;
}

function swarmObservationState(observation) {
  if (!isPlainObject(observation)) return TESTBED_TRANSPORT_LANE_STATES.SWARM_NOT_OBSERVED;
  if (observation.boundedAbsence === true) return TESTBED_TRANSPORT_LANE_STATES.SWARM_BOUNDED_ABSENCE;
  return Number.isInteger(observation.peersObserved) && observation.peersObserved > 0
    ? TESTBED_TRANSPORT_LANE_STATES.SWARM_OBSERVED
    : TESTBED_TRANSPORT_LANE_STATES.SWARM_BOUNDED_ABSENCE;
}

export function buildTransportLaneComparisonEvidence({
  directContactProof = null,
  swarmObservation = null,
  createdAt = new Date().toISOString(),
  evidenceId = null
} = {}) {
  const directTransport = selectedTransport(directContactProof);
  const directState = directContactState(directContactProof);
  const swarmState = swarmObservationState(swarmObservation);

  return Object.freeze({
    artifactKind: "testbed_transport_lane_comparison",
    schemaVersion: TESTBED_TRANSPORT_LANE_COMPARISON_SCHEMA_VERSION,
    evidenceId: nonEmptyString(evidenceId, `testbed-transport-lanes:${createdAt}`),
    createdAt,
    directContactLane: Object.freeze({
      state: directState,
      transportKind: nonEmptyString(directTransport.transportKind),
      contactSeam: nonEmptyString(directTransport.contactSeam),
      proofScope: nonEmptyString(directContactProof?.capabilityDescriptor?.proofScope),
      boundedContactClaim: directState === TESTBED_TRANSPORT_LANE_STATES.DIRECT_CONTACT_PROVEN,
      discoveryClaimed: directContactProof?.capabilityDescriptor?.discoveryRequired === true,
      distributedReadinessClaimed: directContactProof?.distributedReadinessClaimed === true ||
        directContactProof?.readinessEvidence?.distributedReadinessClaimed === true
    }),
    swarmDiscoveryLane: Object.freeze({
      state: swarmState,
      transportKind: nonEmptyString(swarmObservation?.transportKind, "hyperswarm"),
      contactSeam: nonEmptyString(swarmObservation?.contactSeam, "hyperswarm_discovery"),
      observationWindowMs: Number.isInteger(swarmObservation?.observationWindowMs)
        ? swarmObservation.observationWindowMs
        : null,
      peersObserved: Number.isInteger(swarmObservation?.peersObserved)
        ? swarmObservation.peersObserved
        : 0,
      boundedAbsence: swarmState === TESTBED_TRANSPORT_LANE_STATES.SWARM_BOUNDED_ABSENCE,
      flakeClass: nonEmptyString(swarmObservation?.flakeClass),
      pluralEvidenceClaimed: Number.isInteger(swarmObservation?.peersObserved) &&
        swarmObservation.peersObserved > 1,
      distributedReadinessClaimed: swarmObservation?.distributedReadinessClaimed === true
    }),
    reviewOnly: true,
    evidenceOnly: true,
    testbedOwnsTransport: false,
    testbedExecutedContact: false,
    productionProofClaimed: false,
    distributedReadinessProofClaimed: false,
    meshTruthClaimed: false,
    completionClaimed: false
  });
}

export function listTransportLaneStates() {
  return Object.freeze(Object.values(TESTBED_TRANSPORT_LANE_STATES));
}
