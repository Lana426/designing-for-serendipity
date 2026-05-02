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
  questions?: string[]
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
      'For decades, growth ran on a familiar equation: more inputs, exponential outputs. Specialization was the engine, economies of scale rewarded it, and organizations were built around the logic — functional silos, deep expertise, repeatable processes producing more of the same thing, faster. To be world-class at marketing, you became a marketer. To scale engineering, you built engineering orgs. The result was organizations full of deeply knowledgeable people optimizing within their lanes — and for a long time, that was enough.',
      "But inputs are collapsing in cost. Code that took a quarter takes an afternoon. A deck that took a week takes an hour. Content, analysis, first drafts, prototypes — the cost of producing them is trending toward zero. Output is multiplying, ROI is harder to track, and most of what's being produced is starting to look indistinguishable from everyone else's. The old equation still runs. It just no longer differentiates.",
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
        subtitle: 'Trusting what — and who — you\'re working with.',
        body: 'Creative work moves at the speed of trust. When people doubt the inputs, the systems, or the people around them, energy quietly shifts from creating to checking.',
      },
      {
        number: '02',
        title: 'Autonomy',
        subtitle: 'Time to solve the problems you\'ve built a career to solve.',
        body: 'Expertise compounds when the people who hold it get to actually use it. The constraint that fuels creativity is the problem itself — but most experts never reach it, buried under the procedural work that fills the day before the thinking can begin.',
      },
      {
        number: '03',
        title: 'Collision',
        subtitle: 'Different minds, encountering the same problem, thinking together.',
        body: 'Breakthroughs come from the friction between disciplines and perspectives. Access through screens isn\'t enough — it takes shared context and the trust to think badly out loud.',
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
        question: "Can the agent's work be trusted without your eyes on it?",
        body: "This is the prerequisite for everything else. Reclaimed time is only real if you can act on the output without re-doing it in your head. Reliability, accuracy, and governance are what determine whether automation returns capacity or quietly consumes it.",
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
    heading: 'A note on where the work happens.',
    body: [
      'Returning time to people only matters if there\'s somewhere meaningful for that time to land. Most knowledge work has gone hybrid, and most hybrid setups have quietly lost what the office was actually for. Productivity transferred to remote just fine. Collision didn\'t — the unplanned conversation, the cross-functional friction, the trust that builds when people share space without an agenda.',
      "The opportunity isn't to mandate days back in the office. It's to design the moments that benefit most from being together, and let agents handle the coordination overhead that currently fills them. The Pixar atrium worked because it was deliberate architecture for accidental collision. The modern version isn't a building — it's a small set of intentional moments where the right minds meet with the context to actually think together.",
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
      'A diagnostic for leaders deciding which work to automate, which to protect, and where to design for connection.',
    practiceCards: [
      {
        title: 'AUDIT THE WORK',
        body: "Most knowledge organizations have never explicitly mapped which work compounds human relationships and which is pure process labor. The audit itself surfaces what's hiding in plain sight.",
        questions: [
          "For each senior role, what percentage of weekly hours actually requires that role's judgment versus what could be handled below it — or by an agent?",
          "Which roles have we hired for senior expertise but staffed with junior tasks?",
          "Where in the workflow does an expert's time create real differentiation, and where is it indistinguishable from anyone else's?",
          "If we redesigned a given role from scratch today, what would we cut, automate, or elevate?",
        ],
      },
      {
        title: 'AUTOMATE THE MAINTENANCE',
        body: "The clearest near-term opportunity is the Truth-only layer — bounded, governable, judgment-free tasks that consume expert attention without producing differentiation. This is where reclaimed capacity comes from.",
        questions: [
          "Which tasks in this role pass the Truth test today, and which need governance investment to get there?",
          "What is the cost — in senior hours, decision latency, opportunity foregone — of not automating these?",
          "If automation reclaimed 20% of this role's week, what higher-leverage work would fill it?",
          "Where are we currently using review loops as a substitute for trust in the underlying output?",
        ],
      },
      {
        title: 'PROTECT THE TIES',
        body: "Some interactions compound trust between people over time. They look like maintenance but they're the actual asset. Automating them quietly erodes the foundation the rest of the work runs on.",
        questions: [
          "For each client-facing or stakeholder-facing role, which interactions build relational capital that compounds over years?",
          "Where would automating save measurable time this quarter but cost unmeasurable trust over multiple cycles?",
          "Which moments in this role are explicitly for the relationship, not the deliverable — and is that distinction protected in policy?",
          "What signal would tell us the relationship is eroding before the revenue does?",
        ],
      },
      {
        title: 'DESIGN FOR SERENDIPITY',
        body: "Reclaimed time only creates leverage if it lands somewhere generative. The opportunity is to engineer the conditions for unexpected collision — giving experts the space, the trust in their inputs, and the cross-pollination that lets them see familiar problems through new lenses. Sometimes that's an in-person convergence. Sometimes it's an agent-curated introduction. The form varies; the intent is deliberate.",
        questions: [
          "When did our most senior experts last engage with a perspective outside their domain on a problem that mattered?",
          "What would it take for an SME to trust that the work running in the background — the analysis, the drafting, the synthesis — is credible enough to step away from?",
          "Where in our organization is cross-functional contact accidental, and where could we make it intentional?",
          "If we redesigned how a senior expert spent a typical month, how much of it would be spent on novel problems versus familiar ones?",
        ],
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
      "The 3T Framework isn't about doing less. It's about being deliberate — separating the work that should be handed to agents from the work that compounds value precisely because it's human. The judgment is still yours. The framework's role is to make the trade-offs explicit, so they get made on purpose, not by default.",
      "The question for every leader is the same: which of your organization's work is genuinely human — and what are you doing to protect it?",
    ],
    finalLine: "The next era of competitive advantage won't be engineered. It will be designed.",
  },
]
