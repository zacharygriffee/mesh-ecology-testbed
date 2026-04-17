export const concerns = [
  {
    id: "math/basic",
    label: "Math / Basic",
    description: "Simple arithmetic-style publications for stable local responses."
  },
  {
    id: "text/transform",
    label: "Text / Transform",
    description: "Text-oriented publications for local transform and partial response behavior."
  },
  {
    id: "scoring/estimate",
    label: "Scoring / Estimate",
    description: "Heuristic estimate publications used to demonstrate plurality and delay."
  },
  {
    id: "anomaly/testing",
    label: "Anomaly / Testing",
    description: "Explicit anomaly and domain-mismatch fixtures for defensive client handling."
  }
];

export const concernsById = new Map(concerns.map((item) => [item.id, item]));

