export type FAQItem = { q: string; a: string }
export type FAQCategory = { category: string; slug: string; questions: FAQItem[] }

export const architectFAQ: FAQCategory[] = [
  {
    category: 'Why this is an architecture problem',
    slug: 'why-architecture',
    questions: [
      {
        q: "Why should I, as an architect, care? Isn't this a product or governance call?",
        a: "Because the implementation of a Perimeter / Adjacent / Core decision is in your architecture — service boundaries, write permissions, where human checkpoints sit. If the architect doesn't translate the framework into the system, the framework doesn't exist in the system.",
      },
      {
        q: "We already do \"human in the loop\" — isn't this the same?",
        a: "Human-in-the-loop is a pattern; the framework tells you when to use it. Today it gets applied either everywhere (defensively, slowing things down) or nowhere (optimistically, eroding trust). Adjacent is where the pattern belongs. Perimeter shouldn't have it. Core shouldn't be agent-driven at all.",
      },
      {
        q: 'What does ignoring this actually cost?',
        a: "Three failure modes, all invisible in throughput metrics. Silent trust erosion — automating Source-bearing interactions until users notice. Review-loop debt — automating things that still require human verification, where you've moved the work but not eliminated it. Asset liquidation — automating Tie-bearing interactions and watching relational equity dissolve. None show up in your dashboards. All show up in renewal rates 18 months later.",
      },
      {
        q: "What's the smallest version I can adopt without a big initiative?",
        a: "Add one column to your workflow design docs: Perimeter / Adjacent / Core per step. The classification forces the conversation, and the conversation surfaces the work. You can do this on the next workflow you design without asking permission.",
      },
    ],
  },
  {
    category: 'Designing agentic workflows',
    slug: 'agentic-workflows',
    questions: [
      { q: 'Placeholder question — paste your content here.', a: 'Placeholder answer.' },
    ],
  },
  {
    category: 'Governance and the Truth layer',
    slug: 'truth-governance',
    questions: [
      { q: 'Placeholder question — paste your content here.', a: 'Placeholder answer.' },
    ],
  },
  {
    category: 'Identity and the Source layer',
    slug: 'source-identity',
    questions: [
      { q: 'Placeholder question — paste your content here.', a: 'Placeholder answer.' },
    ],
  },
  {
    category: 'Measuring and evolving over time',
    slug: 'measuring-evolving',
    questions: [
      { q: 'Placeholder question — paste your content here.', a: 'Placeholder answer.' },
    ],
  },
]
