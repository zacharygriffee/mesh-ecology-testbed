function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeTextPayload(payload) {
  return typeof payload?.text === "string" ? payload.text : "";
}

function normalizeMathPayload(payload) {
  const operands = asArray(payload?.operands).map((value) => Number(value)).filter((value) => Number.isFinite(value));
  return {
    operation: payload?.operation === "multiply" ? "multiply" : "add",
    operands: operands.length ? operands : [0, 0]
  };
}

function normalizeScoringPayload(payload) {
  return {
    subject: typeof payload?.subject === "string" ? payload.subject : "unknown subject",
    evidence: asArray(payload?.evidence).map((value) => String(value))
  };
}

function buildWordList(text) {
  return text.trim().split(/\s+/).filter(Boolean);
}

export const tutorialActors = [
  {
    id: "deterministic-responder",
    label: "Deterministic responder",
    description: "Emits one stable final response for simple math-style publications.",
    concernIds: ["math/basic"],
    plan({ publication, createResponseId }) {
      const { operation, operands } = normalizeMathPayload(publication.payload);
      const result = operation === "multiply"
        ? operands.reduce((product, value) => product * value, 1)
        : operands.reduce((sum, value) => sum + value, 0);

      return [
        {
          delayMs: 40,
          kind: "response.final",
          responseId: createResponseId(),
          domainStatus: "matched",
          note: "Stable local tutorial response.",
          payload: {
            operation,
            operands,
            result,
            method: "deterministic/local"
          }
        }
      ];
    }
  },
  {
    id: "transform-responder",
    label: "Transform responder",
    description: "Emits one immediate transform-oriented final response for text concerns.",
    concernIds: ["text/transform"],
    plan({ publication, createResponseId }) {
      const text = normalizeTextPayload(publication.payload);
      const normalizedText = text.trim().replace(/\s+/g, " ");

      return [
        {
          delayMs: 120,
          kind: "response.final",
          responseId: createResponseId(),
          domainStatus: "matched",
          note: "Local final transform response.",
          payload: {
            originalText: text,
            normalizedText,
            uppercaseText: normalizedText.toUpperCase(),
            words: buildWordList(normalizedText)
          }
        }
      ];
    }
  },
  {
    id: "partial-responder",
    label: "Partial responder",
    description: "Emits a local partial observation followed by a later final response.",
    concernIds: ["text/transform"],
    plan({ publication, createResponseId }) {
      const text = normalizeTextPayload(publication.payload);
      const normalizedText = text.trim().replace(/\s+/g, " ");
      const responseId = createResponseId();

      return [
        {
          delayMs: 80,
          kind: "response.partial",
          responseId,
          domainStatus: "matched",
          note: "First partial observation from a local tutorial actor.",
          payload: {
            preview: normalizedText.slice(0, 24),
            characterCount: normalizedText.length,
            wordCount: buildWordList(normalizedText).length
          }
        },
        {
          delayMs: 620,
          kind: "response.final",
          responseId,
          domainStatus: "matched",
          note: "Partial response finalized with a fuller local transform.",
          payload: {
            normalizedText,
            reversedText: normalizedText.split("").reverse().join(""),
            words: buildWordList(normalizedText)
          }
        }
      ];
    }
  },
  {
    id: "plural-responder/low",
    label: "Plural responder / low",
    description: "One competing local estimate in a plurality scenario.",
    concernIds: ["scoring/estimate"],
    plan({ publication, createResponseId }) {
      const { subject, evidence } = normalizeScoringPayload(publication.payload);
      const estimate = Math.max(12, Math.min(99, 20 + evidence.length * 4 + (subject.length % 9)));

      return [
        {
          delayMs: 150,
          kind: "response.final",
          responseId: createResponseId(),
          domainStatus: "matched",
          note: "One local actor in a competing estimate set.",
          payload: {
            subject,
            estimate,
            confidence: "conservative",
            method: "plural/local-low"
          }
        }
      ];
    }
  },
  {
    id: "plural-responder/high",
    label: "Plural responder / high",
    description: "Another competing local estimate in a plurality scenario.",
    concernIds: ["scoring/estimate"],
    plan({ publication, createResponseId }) {
      const { subject, evidence } = normalizeScoringPayload(publication.payload);
      const estimate = Math.max(18, Math.min(99, 46 + evidence.length * 8 + (subject.length % 13)));

      return [
        {
          delayMs: 280,
          kind: "response.final",
          responseId: createResponseId(),
          domainStatus: "matched",
          note: "A second local actor offering a competing estimate.",
          payload: {
            subject,
            estimate,
            confidence: "expansive",
            method: "plural/local-high"
          }
        }
      ];
    }
  },
  {
    id: "delayed-responder",
    label: "Delayed responder",
    description: "Emits a deliberately delayed final response to exercise observation over time.",
    concernIds: ["scoring/estimate"],
    plan({ publication, createResponseId }) {
      const { subject, evidence } = normalizeScoringPayload(publication.payload);
      const estimate = Math.max(10, Math.min(99, 32 + evidence.length * 6 + (subject.length % 7)));

      return [
        {
          delayMs: 1200,
          kind: "response.final",
          responseId: createResponseId(),
          domainStatus: "matched",
          note: "Delayed local tutorial response.",
          payload: {
            subject,
            estimate,
            confidence: "deferred",
            method: "delayed/local"
          }
        }
      ];
    }
  },
  {
    id: "domain-mismatch-responder",
    label: "Domain mismatch responder",
    description: "Emits an intentional anomaly observation with a declared domain mismatch.",
    concernIds: ["anomaly/testing"],
    plan({ publication, createResponseId }) {
      return [
        {
          delayMs: 180,
          kind: "response.anomaly",
          responseId: createResponseId(),
          domainStatus: "mismatch",
          note: "Intentional tutorial mismatch. This is for client anomaly handling, not truth.",
          payload: {
            receivedConcern: publication.concern,
            expectedConcern: "math/basic",
            receivedKeys: Object.keys(publication.payload || {}),
            anomalyCode: "domain-mismatch"
          }
        }
      ];
    }
  }
];

export const tutorialActorsById = new Map(tutorialActors.map((item) => [item.id, item]));

