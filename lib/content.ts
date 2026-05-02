export interface CardData {
  number: string
  title: string
  short: string
  long: string
  question?: string
}

export interface StaticCardData {
  number: string
  title: string
  subtitle: string
  body: string
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
  verdict: 'Automate' | 'Augment' | 'Leave alone'
  verdictNote: string
}

export interface IndustryData {
  id: string
  label: string
  tasks: [IndustryTask, IndustryTask]
}

export interface PracticeCardData {
  title: string
  body: string
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
    | 'practice-cards'
  eyebrow?: string
  heading?: string
  subheading?: string
  body?: string[]
  pullquote?: string
  cards?: CardData[]
  staticCards?: StaticCardData[]
  practiceCards?: PracticeCardData[]
  frameworkColumns?: FrameworkColumnData[]
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
        verdict: 'Automate',
        verdictNote: "Free up the rep's attention for the next conversation.",
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
        verdict: 'Leave alone',
        verdictNote: 'Or at most, augment — let an agent prep context, but the human sends and signs.',
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
        verdict: 'Augment',
        verdictNote: 'Agent prepares; clinician verifies and decides.',
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
        verdict: 'Leave alone',
        verdictNote: 'Fully human. An agent has no place in this room.',
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
        verdict: 'Augment',
        verdictNote: 'Agent surfaces deviations; attorney decides what matters.',
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
            annotation: "This is the relationship — every conversation builds the trust the engagement runs on.",
          },
        ],
        verdict: 'Leave alone',
        verdictNote: "Fully human. The framework's job is to protect this work, not optimize it.",
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
        verdict: 'Automate',
        verdictNote: 'Free up the analyst for the analysis that actually matters.',
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
            annotation: 'The judgment itself can be agent-supported, but the framing must be human.',
          },
          {
            label: 'Ties',
            verdict: 'Fail',
            pass: 'fail',
            annotation: 'Audit committee trust is built one meeting at a time; automating erodes it silently.',
          },
        ],
        verdict: 'Leave alone',
        verdictNote: 'Agent can prep the analysis. The room belongs to the CFO.',
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
    heading: 'The old growth equation is breaking.',
    body: [
      'For decades, growth followed one equation: more inputs, exponential outputs. Specialization was the engine. Coordination tools scaled it. Organizations got very good at producing more of the same thing, faster.',
      "But inputs are collapsing in cost. Code that took a quarter takes an afternoon. A deck that took a week takes an hour. Output is exploding — and most of it looks the same as everyone else's. The old equation still runs. It just doesn't differentiate anymore.",
    ],
  },
  {
    id: 'creativity',
    type: 'body',
    heading: 'Creativity is the new differentiator.',
    body: [
      "When everyone can produce, production stops being the differentiator. Take the music industry as an example: the cost of making music collapsed, anyone can record on a laptop and go viral, volume exploded — and yet certain artists still cut through. The democratization of tools didn't eliminate the difference between noise and art. It made the difference matter more. The same dynamic is hitting every knowledge industry now.",
      "What separates the work that lands is the rare thing automation can't manufacture: genuine creative insight, the unexpected angle, the idea that lands in someone's chest. The next wave of growth is indexed on creativity — and most organizations aren't designed for it.",
    ],
    pullquote: 'Output is solved. The human layer is wide open.',
  },
  {
    id: 'conditions',
    type: 'cards',
    heading: "Creativity isn't magic. It has conditions.",
    subheading:
      'Three conditions, all required. Most organizations achieve one. Almost none achieve all three.',
    staticCards: [
      {
        number: '01',
        title: 'Safety',
        subtitle: 'Believing the other person is actually with you.',
        body: 'The freedom to say the half-formed thing without self-censoring.',
      },
      {
        number: '02',
        title: 'Autonomy',
        subtitle: 'A real problem with freedom in how to solve it.',
        body: 'Expert judgment unblocked from process labor.',
      },
      {
        number: '03',
        title: 'Collision',
        subtitle: 'Different minds, in the same room, thinking together.',
        body: 'Cognitive diversity with enough trust to think badly out loud.',
      },
    ],
    closingLine:
      'These are the conditions creativity needs. The question is: how do we design agentic systems that protect them?',
    footnote: {
      prefix: 'On the conditions for creativity →',
      linkText: 'hintsa.com',
      url: 'https://www.hintsa.com/insights/blogs/unleashing-creativity-how-to-create-perfect-conditions-for-generating-unique-value-and-novel-insight',
    },
  },
  {
    id: 'framework',
    type: 'framework-hero',
    eyebrow: 'THE FRAMEWORK',
    heading: 'The 3T Framework.',
    subheading: 'A diagnostic lens for deciding what to automate.',
    frameworkColumns: [
      {
        letter: 'Trust',
        title: 'Source',
        question: 'Does the other party expect a human?',
        body: 'Some interactions carry an implicit promise of human presence. Automating where that promise lives erodes trust silently. Ask: would the person on the other end feel deceived if they knew?',
      },
      {
        letter: 'Truth',
        title: 'Output',
        question: 'Can the result be trusted on its own?',
        body: "This is where most of the industry's energy goes today — reliability, accuracy, governance, oversight. It's the prerequisite, not the destination. Ask: is the output safe to act on without human judgment in the loop?",
      },
      {
        letter: 'Ties',
        title: 'Relationship',
        question: 'Can it be automated — and should it?',
        body: "Some interactions compound trust between people over time. Every exchange is a deposit. Automating them doesn't just make them less meaningful; it liquidates an asset that took years to build. Ask: would automating this take something away that compounds?",
      },
    ],
    closingLine:
      'Run any task through these three filters. The answer that comes out the other side is one of three verdicts: Automate. Augment. Leave alone.',
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
    heading: 'The trap: automating the work without redesigning where it happens.',
    body: [
      'Running tasks through the 3T Framework returns time and attention to humans. But that only matters if humans then have somewhere worth putting that attention. If we automate the manual labor and leave people to "collaborate" through the same screens we always have — pings, status updates, async threads, back-to-back Zooms — we\'ve freed up time without freeing up anything else. You can\'t have a creative collision over Slack. You can\'t build the kind of trust that produces genuine innovation in a 45-minute recurring. The framework is the start, not the finish. The work that follows is rebuilding the environments where human creativity can actually surface.',
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
    id: 'practice',
    type: 'practice-cards',
    heading: 'What this means in practice.',
    subheading:
      'A starting point for clients designing for human creativity in an agentic world.',
    practiceCards: [
      {
        title: 'AUDIT THE WORK',
        body: "Run every recurring task through the 3T Framework. Most knowledge organizations have never explicitly asked which work compounds human relationships and which is just process labor. The audit itself surfaces what's been hidden in plain sight.",
      },
      {
        title: 'AUTOMATE THE MAINTENANCE',
        body: 'Hand the Truth-only work to agents — the bounded, governable, judgment-free tasks that consume expert attention without building anything. This is where the time and creative capacity come from.',
      },
      {
        title: 'PROTECT THE TIES',
        body: 'Identify the interactions that compound trust between people over time and explicitly designate them as human. Make this a stated principle, not an accident. The work that builds relationships should never quietly drift toward automation just because it\'s possible.',
      },
      {
        title: 'REDESIGN WHERE WORK HAPPENS',
        body: 'Returned attention is wasted if it lands back in Slack and Zoom. Build the rooms — physical, recurring, cross-functional — where creative collision can actually happen. The framework returns the time. Leadership has to decide what to do with it.',
      },
    ],
  },
  {
    id: 'thesis',
    type: 'thesis',
    eyebrow: 'THE THESIS',
    heading:
      'Transparent enough to preserve trust.\nTargeted enough to return attention to what matters.\nRestrained enough to leave the authentically human work alone.',
    body: [
      "The 3T Framework isn't a tool for doing less. It's a tool for being deliberate. About which work we hand to agents. About which work we protect because it's how trust is built, how creativity surfaces, how people stay people in the work. The decisions are still ours to make. The framework just makes the questions impossible to ignore.",
      "So the question for every leader, every team, every organization is the same: which of your work is genuinely human, and what are you doing to protect it?",
    ],
    finalLine: "That's not a math problem. That's closer to art.",
  },
]
