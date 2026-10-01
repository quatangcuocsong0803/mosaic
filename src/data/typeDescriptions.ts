import type { MbtiTypeCode } from "./mbtiTypeStacks";

export interface TypeDescription {
  type: MbtiTypeCode;
  overview: string;
  keywords: string[];
}

const typeDescriptions: Record<MbtiTypeCode, TypeDescription> = {
  INTJ: {
    type: "INTJ",
    overview:
      "People with this pattern may tend to focus on underlying patterns and long-term direction while organizing ideas toward clear, practical outcomes.",
    keywords: [
      "Long-term vision",
      "Systems",
      "Strategy",
      "Independence",
      "Structure",
    ],
  },

  INTP: {
    type: "INTP",
    overview:
      "People with this pattern may tend to build internally consistent explanations, explore possibilities, and examine how ideas work at a deeper level.",
    keywords: [
      "Analysis",
      "Logical frameworks",
      "Possibilities",
      "Curiosity",
      "Precision",
    ],
  },

  ENTJ: {
    type: "ENTJ",
    overview:
      "People with this pattern may tend to organize resources and decisions around practical results while using long-term patterns to guide direction.",
    keywords: [
      "Organization",
      "Results",
      "Strategy",
      "Planning",
      "Decisiveness",
    ],
  },

  ENTP: {
    type: "ENTP",
    overview:
      "People with this pattern may tend to explore many possibilities, test ideas through analysis, and look for alternative ways of understanding a problem.",
    keywords: [
      "Exploration",
      "Ideas",
      "Analysis",
      "Alternatives",
      "Experimentation",
    ],
  },

  INFJ: {
    type: "INFJ",
    overview:
      "People with this pattern may tend to look for underlying meanings and long-term patterns while paying attention to interpersonal context and shared understanding.",
    keywords: [
      "Meaning",
      "Patterns",
      "Insight",
      "Interpersonal context",
      "Long-term direction",
    ],
  },

  INFP: {
    type: "INFP",
    overview:
      "People with this pattern may tend to evaluate experiences through personal values and authenticity while exploring different possibilities and meanings.",
    keywords: [
      "Values",
      "Authenticity",
      "Possibilities",
      "Reflection",
      "Personal meaning",
    ],
  },

  ENFJ: {
    type: "ENFJ",
    overview:
      "People with this pattern may tend to pay attention to shared values and interpersonal needs while using broader patterns to guide direction and interpretation.",
    keywords: [
      "Shared values",
      "People",
      "Meaning",
      "Coordination",
      "Direction",
    ],
  },

  ENFP: {
    type: "ENFP",
    overview:
      "People with this pattern may tend to explore possibilities and connections while considering personal values and the practical implications of ideas.",
    keywords: [
      "Possibilities",
      "Connections",
      "Values",
      "Creativity",
      "Exploration",
    ],
  },

  ISTJ: {
    type: "ISTJ",
    overview:
      "People with this pattern may tend to rely on past experience and established information while organizing actions toward reliable and practical outcomes.",
    keywords: [
      "Experience",
      "Reliability",
      "Organization",
      "Consistency",
      "Practicality",
    ],
  },

  ISFJ: {
    type: "ISFJ",
    overview:
      "People with this pattern may tend to draw on familiar experience while paying attention to interpersonal needs, shared expectations, and practical support.",
    keywords: [
      "Experience",
      "Support",
      "Reliability",
      "Relationships",
      "Practical care",
    ],
  },

  ESTJ: {
    type: "ESTJ",
    overview:
      "People with this pattern may tend to organize people, resources, and actions around practical goals while drawing on established information and experience.",
    keywords: [
      "Organization",
      "Efficiency",
      "Practical goals",
      "Experience",
      "Coordination",
    ],
  },

  ESFJ: {
    type: "ESFJ",
    overview:
      "People with this pattern may tend to pay attention to interpersonal needs and practical experience while organizing activities around shared expectations.",
    keywords: [
      "Relationships",
      "Coordination",
      "Experience",
      "Shared expectations",
      "Support",
    ],
  },

  ISTP: {
    type: "ISTP",
    overview:
      "People with this pattern may tend to analyze how things work, respond to concrete situations, and use pattern recognition when navigating changing circumstances.",
    keywords: [
      "Analysis",
      "Practical response",
      "Problem-solving",
      "Observation",
      "Adaptability",
    ],
  },

  ISFP: {
    type: "ISFP",
    overview:
      "People with this pattern may tend to evaluate experiences through personal values while responding to concrete situations and present experience.",
    keywords: [
      "Values",
      "Authenticity",
      "Present experience",
      "Observation",
      "Personal expression",
    ],
  },

  ESTP: {
    type: "ESTP",
    overview:
      "People with this pattern may tend to focus on immediate information and practical action while using internal analysis to evaluate how things work.",
    keywords: [
      "Present action",
      "Observation",
      "Problem-solving",
      "Practicality",
      "Responsiveness",
    ],
  },

  ESFP: {
    type: "ESFP",
    overview:
      "People with this pattern may tend to engage with present experience while considering personal values and practical ways to respond to what is happening around them.",
    keywords: [
      "Present experience",
      "Values",
      "Engagement",
      "Observation",
      "Adaptability",
    ],
  },
};

export default typeDescriptions;
