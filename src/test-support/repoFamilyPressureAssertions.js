import assert from "node:assert/strict";

export function findPressureCase(packet, caseId) {
  const pressureCase = packet.cases.find((entry) => entry.caseId === caseId);
  assert.ok(pressureCase, `missing pressure case ${caseId}`);
  return pressureCase;
}

export function findPressureCases(packet, caseIdsByName) {
  return Object.fromEntries(
    Object.entries(caseIdsByName).map(([name, caseId]) => [
      name,
      findPressureCase(packet, caseId)
    ])
  );
}

export function assertBlockedBoundary(pressureCase, expectedFalseBoundaryFields) {
  assert.equal(pressureCase.stopStatus, "blocked", pressureCase.caseId);
  for (const field of expectedFalseBoundaryFields) {
    assert.equal(
      pressureCase.boundary[field],
      false,
      `${pressureCase.caseId} boundary.${field}`
    );
  }
}
