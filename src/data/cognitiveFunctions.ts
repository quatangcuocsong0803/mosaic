// ============================================================
// Cognitive Functions Data
// ============================================================
// The 8 Jungian cognitive functions used in the MOSAIC test.
// Scores for these functions are calculated first,
// then compared against MBTI type stacks in mbtiTypeStacks.ts.
// ============================================================

export type CognitiveFunctionCode =
  | "Ni"
  | "Ne"
  | "Si"
  | "Se"
  | "Ti"
  | "Te"
  | "Fi"
  | "Fe";

export interface CognitiveFunction {
  /** Short code identifier, e.g. "Ni" */
  code: CognitiveFunctionCode;
  /** Full name, e.g. "Introverted Intuition" */
  name: string;
  /** One-sentence description of what this function does */
  description: string;
  /** Attitude: Introverted or Extraverted */
  attitude: "Introverted" | "Extraverted";
  /** Domain: Intuition, Sensing, Thinking, or Feeling */
  domain: "Intuition" | "Sensing" | "Thinking" | "Feeling";
}

const cognitiveFunctions: Record<CognitiveFunctionCode, CognitiveFunction> = {
  Ni: {
    code: "Ni",
    name: "Introverted Intuition",
    description:
      "Focuses on patterns, meanings, connections and possible long-term directions behind information.",
    attitude: "Introverted",
    domain: "Intuition",
  },
  Ne: {
    code: "Ne",
    name: "Extraverted Intuition",
    description:
      "Explores multiple possibilities, ideas, interpretations and connections from the external world.",
    attitude: "Extraverted",
    domain: "Intuition",
  },
  Si: {
    code: "Si",
    name: "Introverted Sensing",
    description:
      "Uses past experience, stored information and familiar references to understand the present.",
    attitude: "Introverted",
    domain: "Sensing",
  },
  Se: {
    code: "Se",
    name: "Extraverted Sensing",
    description:
      "Focuses on concrete information, present experience and what is directly happening in the environment.",
    attitude: "Extraverted",
    domain: "Sensing",
  },
  Ti: {
    code: "Ti",
    name: "Introverted Thinking",
    description:
      "Builds an internally consistent logical framework and analyzes how and why something works.",
    attitude: "Introverted",
    domain: "Thinking",
  },
  Te: {
    code: "Te",
    name: "Extraverted Thinking",
    description:
      "Organizes information, resources and actions toward practical external results and efficiency.",
    attitude: "Extraverted",
    domain: "Thinking",
  },
  Fi: {
    code: "Fi",
    name: "Introverted Feeling",
    description:
      "Evaluates situations through personal values, authenticity and internal principles.",
    attitude: "Introverted",
    domain: "Feeling",
  },
  Fe: {
    code: "Fe",
    name: "Extraverted Feeling",
    description:
      "Pays attention to interpersonal needs, shared values, emotional atmosphere and social harmony.",
    attitude: "Extraverted",
    domain: "Feeling",
  },
};

export default cognitiveFunctions;
