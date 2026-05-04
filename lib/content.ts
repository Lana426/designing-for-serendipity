export interface CardData {
  number: string
  title: string
  short: string
  long: string
  question?: string
}

export interface StaticCardData {
  number?: string
  title: string
  subtitle: string
  body?: string
}

export interface FrameworkColumnData {
  letter: string
  title: string
  question: string
  body: string
}

export interface FilterResult {
  label: string
  verdict: string
  pass: 'pass' | 'warn' | 'fail'
  annotation: string
}

export interface IndustryTask {
  task: string
  filters: FilterResult[]
  verdict: 'Perimeter' | 'Adjacent' | 'Core'
  verdictNote: string
}

export interface IndustryData {
  id: string
  label: string
  tasks: [IndustryTask, IndustryTask]
}

export interface WorkCategoryCardData {
  eyebrow: string
  title: string
  descriptor: string
  reliance: string
  attributes: string[]
  decision: string
  accentColor: string
}

export interface SceneFootnote {
  prefix: string
  linkText: string
  url: string
}

export interface SceneData {
  id: string
  type:
    | 'hero'
    | 'body'
    | 'cards'
    | 'list'
    | 'thesis'
    | 'minimal'
    | 'framework-hero'
    | 'industry-flow'
    | 'pixar-hero'
    | 'work-types'
  eyebrow?: string
  heading?: string
  subheading?: string
  body?: string[]
  pullquote?: string
  cards?: CardData[]
  staticCards?: StaticCardData[]
  workCards?: WorkCategoryCardData[]
  frameworkColumns?: FrameworkColumnData[]
  framingBody?: string[]
  setupIntro?: string
  setupItems?: string[]
  openingLine?: string
  listItems?: string[]
  closingLine?: string
  finalLine?: string
  footnote?: SceneFootnote
  imageSrc?: string
  imageAlt?: string
}

// ─── Industry flow data ───────────────────────────────────────────────────────

export const industryData: IndustryData[] = [
  {
    id: 'sales',
    label: 'Sales',
    tasks: [
      {
        task: 'Logging call notes into the CRM after a customer meeting.',
        filters: [
          {
            label: 'Trust',
            verdict: 'Pass',
            pass: 'pass',
            annotation: "No one expects a human to type these notes.",
          },
          {
            label: 'Truth',
            verdict: 'Pass',
            pass: 'pass',
            annotation: 'Output can be reviewed and corrected by the rep.',
          },
          {
            label: 'Ties',
            verdict: 'Pass',
            pass: 'pass',
            annotation: "Doesn't build relationship — it's record-keeping.",
          },
        ],
        verdict: 'Perimeter',
        verdictNote: 'Reversible, internally scoped, not load-bearing.',
      },
      {
        task: 'Sending the quarterly check-in email to a top-tier customer.',
        filters: [
          {
            label: 'Trust',
            verdict: 'Fail',
            pass: 'fail',
            annotation: 'The customer believes their account lead is personally checking in.',
          },
          {
            label: 'Truth',
            verdict: 'Pass',
            pass: 'pass',
            annotation: 'An agent could draft something accurate.',
          },
          {
            label: 'Ties',
            verdict: 'Fail',
            pass: 'fail',
            annotation: 'This is a relationship deposit. Automating liquidates it.',
          },
        ],
        verdict: 'Core',
        verdictNote: 'Identity-bearing and trust-bearing. Agent prepares context; human sends and signs.',
      },
    ],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    tasks: [
      {
        task: "Summarizing a patient's chart before a clinician walks into the room.",
        filters: [
          {
            label: 'Trust',
            verdict: 'Pass',
            pass: 'pass',
            annotation: "The patient doesn't expect a human to read the whole chart in advance.",
          },
          {
            label: 'Truth',
            verdict: 'Warn',
            pass: 'warn',
            annotation: 'Output must be governed — accuracy is life-or-death.',
          },
          {
            label: 'Ties',
            verdict: 'Pass',
            pass: 'pass',
            annotation: "Doesn't replace the patient interaction, it prepares for it.",
          },
        ],
        verdict: 'Adjacent',
        verdictNote: 'Externally consequential and identity-bearing. Agent drafts, clinician verifies.',
      },
      {
        task: 'Delivering a difficult diagnosis to a patient.',
        filters: [
          {
            label: 'Trust',
            verdict: 'Fail',
            pass: 'fail',
            annotation: 'The patient expects — and needs — a human.',
          },
          {
            label: 'Truth',
            verdict: 'Fail',
            pass: 'fail',
            annotation: 'No output is safe enough to substitute for clinical judgment in the moment.',
          },
          {
            label: 'Ties',
            verdict: 'Fail',
            pass: 'fail',
            annotation: "This is the relationship. Automating it doesn't just fail; it harms.",
          },
        ],
        verdict: 'Core',
        verdictNote: 'Constitutively human. Presence is the product.',
      },
    ],
  },
  {
    id: 'legal',
    label: 'Legal',
    tasks: [
      {
        task: 'Reviewing a 200-page contract for standard clause deviations.',
        filters: [
          {
            label: 'Trust',
            verdict: 'Pass',
            pass: 'pass',
            annotation: "No client expects an associate to manually compare every line.",
          },
          {
            label: 'Truth',
            verdict: 'Warn',
            pass: 'warn',
            annotation: 'Output must be governed — flagged deviations need attorney review.',
          },
          {
            label: 'Ties',
            verdict: 'Pass',
            pass: 'pass',
            annotation: "Doesn't replace client counsel — it prepares for it.",
          },
        ],
        verdict: 'Adjacent',
        verdictNote: 'Externally consequential, recoverable but costly. Agent surfaces deviations; attorney decides.',
      },
      {
        task: 'Counseling a client through a high-stakes negotiation strategy.',
        filters: [
          {
            label: 'Trust',
            verdict: 'Fail',
            pass: 'fail',
            annotation: 'The client is paying for human judgment, presence, and accountability.',
          },
          {
            label: 'Truth',
            verdict: 'Fail',
            pass: 'fail',
            annotation: 'No model output is safe enough to substitute for legal advice in real time.',
          },
          {
            label: 'Ties',
            verdict: 'Fail',
            pass: 'fail',
            annotation: "Every conversation builds the trust the engagement runs on.",
          },
        ],
        verdict: 'Core',
        verdictNote: 'Trust-bearing. Presence is the product.',
      },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    tasks: [
      {
        task: 'Generating the standard variance commentary in the monthly close package.',
        filters: [
          {
            label: 'Trust',
            verdict: 'Pass',
            pass: 'pass',
            annotation: "No one expects the analyst to write boilerplate variance language by hand.",
          },
          {
            label: 'Truth',
            verdict: 'Pass',
            pass: 'pass',
            annotation: 'Output is structured, reviewable, and bounded by the underlying numbers.',
          },
          {
            label: 'Ties',
            verdict: 'Pass',
            pass: 'pass',
            annotation: "Doesn't shape any relationship — it's reporting hygiene.",
          },
        ],
        verdict: 'Perimeter',
        verdictNote: 'Reversible, internally scoped, not load-bearing.',
      },
      {
        task: 'Walking the audit committee through a controversial accounting judgment.',
        filters: [
          {
            label: 'Trust',
            verdict: 'Fail',
            pass: 'fail',
            annotation: "The committee expects the CFO's personal reasoning and accountability.",
          },
          {
            label: 'Truth',
            verdict: 'Warn',
            pass: 'warn',
            annotation: 'The judgment can be agent-supported, but the framing must be human.',
          },
          {
            label: 'Ties',
            verdict: 'Fail',
            pass: 'fail',
            annotation: 'Audit committee trust is built one meeting at a time.',
          },
        ],
        verdict: 'Core',
        verdictNote: 'Identity-bearing and trust-bearing. Agent preps the analysis; the room belongs to the CFO.',
      },
    ],
  },
]

// ─── Scenes ───────────────────────────────────────────────────────────────────

export const scenes: SceneData[] = [
  {
    id: 'hero',
    type: 'hero',
    eyebrow: 'A FRAMEWORK FOR AGENTIC DESIGN',
    heading: 'Designing Agents for Serendipity',
    subheading:
      'How to decide what to automate — and what to leave alone — so humans can do the work only humans can do.',
  },
  {
    id: 'old-equation',
    type: 'body',
    heading: 'Falling input costs are eroding differentiation in traditional growth models',
    body: [
      'For decades, growth followed a simple logic: more inputs equal more output. Specialization scaled it — functional silos, repeatable processes, deep expertise.',
      'That model still runs. It just no longer differentiates.',
      'The cost of producing knowledge work is collapsing. What took weeks now takes hours. Code, analysis, content — all cheaper, faster, and increasingly indistinguishable.',
      'Output is exploding. Differentiation is not.',
    ],
  },
  {
    id: 'creativity',
    type: 'body',
    heading: 'As production commoditizes, creativity becomes a credible scalable differentiator',
    body: [
      "As production commoditizes, creativity becomes the differentiator. When anyone can produce, production stops being scarce. What stands out is what can't be manufactured: genuine insight, unexpected angles, ideas that resonate.",
      "We've already seen this dynamic play out. Take the music industry as an example: the cost of making music collapsed, anyone can record on a laptop and go viral, volume exploded — and yet certain artists still cut through. The democratization of tools didn't eliminate the difference between noise and art. It made the difference matter more.",
      'The same shift is now hitting every knowledge industry.',
      "The next wave of growth won't come from producing more. It will come from thinking differently.",
      "Most organizations aren't designed for that.",
    ],
  },
  {
    id: 'conditions',
    type: 'cards',
    heading: "Creativity isn't random — it emerges under specific conditions.",
    subheading:
      'If we want to design agentic systems that enhance it (rather than suppress it), we need to understand what those conditions are.',
    staticCards: [
      {
        title: 'Safety',
        subtitle: "When people don't trust inputs, systems, or each other, they stop creating and start checking.",
      },
      {
        title: 'Autonomy',
        subtitle: 'Expertise compounds only when people have time to use it — most are buried in process work before thinking begins.',
      },
      {
        title: 'Collision',
        subtitle: 'Breakthroughs come from different perspectives meeting the same problem — which requires shared context, not just shared tools.',
      },
    ],
    closingLine: 'These conditions define what we need to protect — the question is how?',
    footnote: {
      prefix: 'On the conditions for creativity →',
      linkText: 'hintsa.com',
      url: 'https://www.hintsa.com/insights/blogs/unleashing-creativity-how-to-create-perfect-conditions-for-generating-unique-value-and-novel-insight',
    },
  },
  {
    id: 'framework',
    type: 'framework-hero',
    eyebrow: 'A SIMPLE LENS',
    heading: 'Trust, Truth, and Ties',
    subheading: 'A diagnostic lens for deciding what to automate — because not everything that can be automated should be.',
    framingBody: [
      'Poorly applied automation breaks trust, introduces unreliable outputs, and removes the human interactions where ideas emerge.',
      'Trust, Truth, and Ties define where that risk exists. They are the constraints that determine whether automation creates space for better thinking — or quietly destroys it.',
    ],
    setupIntro: "Not all work should be automated — but the reason isn't always obvious. In practice, it comes down to three factors:",
    setupItems: [
      'Trust — whether a human is expected',
      'Truth — whether the output can be relied on',
      'Ties — whether the interaction builds a relationship',
    ],
    frameworkColumns: [
      {
        letter: 'Trust',
        title: 'Source',
        question: 'Does the other party expect a human?',
        body: 'Some interactions carry an implicit promise of human presence. Automating them erodes trust — often invisibly.',
      },
      {
        letter: 'Truth',
        title: 'Output',
        question: 'Can the output be trusted without rework?',
        body: 'Automation only creates capacity if the result can be used as-is. Otherwise, it quietly shifts the work from doing the work to overseeing the work.',
      },
      {
        letter: 'Ties',
        title: 'Relationship',
        question: 'Does this interaction build trust over time?',
        body: "Some exchanges compound value. Automating them doesn't save time — it erodes an asset.",
      },
    ],
    closingLine:
      "In practice, these three factors don't need to be evaluated independently — they consistently resolve into three types of work.",
  },
  {
    id: 'work-types',
    type: 'work-types',
    heading: 'Three types of work.',
    setupIntro: 'Tasks differ in how much they depend on trust, truth, and relationships. That difference determines how they should be handled:',
    setupItems: [
      'Automate — when these factors are low',
      'Augment — when they matter, but can be supported',
      'Protect — when they are the value',
    ],
    workCards: [
      {
        eyebrow: 'PERIMETER',
        title: 'Automate',
        descriptor: 'Full autonomy.',
        reliance: 'Low reliance on Trust, Truth, and Ties.',
        attributes: [
          '**Reversible** — no external party is affected by failure',
          '**Internally scoped** — stays within the human\'s workspace',
          '**Not load-bearing** — does not shape how understanding of the work is formed',
        ],
        decision: 'Automate fully',
        accentColor: 'var(--bcg-green)',
      },
      {
        eyebrow: 'ADJACENT',
        title: 'Augment',
        descriptor: 'Propose, then confirm.',
        reliance: 'Moderate reliance on Trust, Truth, and Ties.',
        attributes: [
          '**Externally consequential** — others rely on the output',
          '**Identity-bearing** — represents the human\'s judgment',
          '**Recoverable, but costly** — errors damage credibility',
        ],
        decision: 'Agent drafts, human decides',
        accentColor: 'var(--accent-warm)',
      },
      {
        eyebrow: 'CORE',
        title: 'Protect',
        descriptor: 'No autonomy.',
        reliance: 'High reliance on Trust, Truth, and Ties.',
        attributes: [
          '**Constitutively human** — value depends on human origin',
          '**Trust-bearing** — builds relationships over time',
          '**Presence is the product** — the interaction itself creates value',
        ],
        decision: 'Do not automate — remove other work instead',
        accentColor: 'var(--accent-protect)',
      },
    ],
  },
  {
    id: 'industry-flow',
    type: 'industry-flow',
    heading: 'See it in action.',
    subheading: 'Pick an industry. Watch a real task move through the framework.',
  },
  {
    id: 'the-trap',
    type: 'body',
    heading: 'A note on where the work happens.',
    body: [
      'Returning time to people only matters if there\'s somewhere meaningful for that time to land. Most knowledge work has gone hybrid, and most hybrid setups have quietly lost what the office was actually for. Productivity transferred to remote just fine. Collision didn\'t — the unplanned conversation, the cross-functional friction, the trust that builds when people share space without an agenda.',
      "The opportunity isn't to mandate days back in the office. It's to design the moments that benefit most from being together, and let agents handle the coordination overhead that currently fills them.",
    ],
  },
  {
    id: 'what-unlocks',
    type: 'body',
    heading: 'What this unlocks.',
    body: [
      'Automation doesn\'t create advantage by saving time. It creates advantage by where that time goes.',
      'When perimeter work is removed and adjacent work is streamlined, capacity shifts toward the core — where trust is built, perspectives collide, and new ideas emerge.',
      'This is where serendipity lives. Not in randomness — but in deliberate exposure to the right people and problems.',
    ],
  },
  {
    id: 'pixar',
    type: 'pixar-hero',
    imageSrc: '/pixar-atrium.png',
    imageAlt:
      "Pixar's central atrium, where animators, engineers, and writers crossed paths daily by design",
    heading: 'Pixar understood this.',
    body: [
      "Steve Jobs designed Pixar's building so that animators, engineers, and writers all had to pass through the same central atrium every day. No agenda, no meeting invite — just architecture that made accidental cross-functional collision inevitable. The creative output Pixar became famous for didn't emerge from optimized silos. It emerged from those intersections.",
      "The 3T Framework is the modern version of that atrium. It doesn't tell you which conversations to have. It tells you which work to clear out of the way so the conversations can happen at all. Automation is the renovation. The collisions are still up to us.",
    ],
    pullquote: '"The building was the product."',
  },
  {
    id: 'thesis',
    type: 'thesis',
    eyebrow: 'THE THESIS',
    openingLine: 'Automation should be precise — not pervasive.',
    heading:
      'Transparent enough to preserve trust.\nTargeted enough to return attention.\nRestrained enough to leave the authentically human work alone.',
    body: [
      "The goal isn't to automate more. It's to automate deliberately — separating what can be scaled from what creates value because it can't.",
      "The question for every leader is simple: what work in your organization is truly human — and are you protecting it?",
    ],
    finalLine: "The next era of competitive advantage won't be engineered. It will be designed.",
  },
]
