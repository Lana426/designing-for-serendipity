export type FAQItem = { q: string; a: string }
export type FAQCategory = { category: string; slug: string; questions: FAQItem[] }

export const architectFAQ: FAQCategory[] = [
  {
    category: 'Why this is an architecture problem',
    slug: 'why-architecture',
    questions: [
      {
        q: "Why should I, as an architect, care? Isn't this a product or governance call?",
        a: "Because the implementation of a Perimeter / Adjacent / Core decision lives in your architecture — service boundaries, write permissions, where human checkpoints sit, how agents are scoped. If the architect doesn't translate the framework into the system, the framework doesn't exist in the system. Policy documents don't enforce themselves; code paths do.",
      },
      {
        q: 'We already do "human in the loop" — isn\'t this the same?',
        a: "Human-in-the-loop is a pattern; the framework tells you when to use it. Today it gets applied either everywhere (defensively, slowing things down and creating review fatigue) or nowhere (optimistically, eroding trust and producing silent quality issues). Adjacent is where the pattern belongs. Perimeter shouldn't have it — it just adds drag. Core shouldn't be agent-driven at all, so the question doesn't apply. The framework gives you a principled basis for when to deploy the pattern instead of defaulting to one extreme.",
      },
      {
        q: 'What does ignoring this actually cost?',
        a: "Three failure modes, all invisible in throughput metrics. Silent trust erosion — automating Source-bearing interactions until users notice and engagement quietly degrades. Review-loop debt — automating things that still require human verification, where you've moved the work but not eliminated it; the time \"saved\" gets consumed by checking. Asset liquidation — automating Tie-bearing interactions and watching the relational equity that took years to build dissolve in a few quarters. None of these show up in your dashboards. All of them show up in renewals, NPS, and engagement depth 12–18 months later, by which point the cause is hard to pin to a specific decision.",
      },
    ],
  },
  {
    category: 'Designing agentic workflows',
    slug: 'designing-workflows',
    questions: [
      {
        q: 'What architecture pattern fits each zone?',
        a: "Perimeter: full delegation. The agent owns the step end-to-end. Standard observability, automated retry, alerting on persistent failure. Example: an agent that auto-tags incoming support tickets and routes them to the right queue. Adjacent: propose-then-confirm. The agent prepares; a human approves before the action is committed or sent externally. The approval is a structural gate, not optional. Example: an agent drafts ten outbound emails in parallel; the rep approves each with one click. Core: the agent supports the human's preparation but does not act in the interaction itself. Example: in a high-stakes sales conversation, the agent prepares a context dossier — account history, recent signals, risk flags — and surfaces it before the call. The agent does not draft what the rep says, does not join the call, does not generate follow-up communications without the rep authoring them. Architecturally: read-only context access; no agent write-access to the customer-facing channel.",
      },
      {
        q: 'Where in the architecture does the classification get encoded?',
        a: "At least three places. In workflow metadata — machine-readable, attached to each step, so other systems can respect it. In tool permissions — Perimeter tools have full agent access; Adjacent tools require a confirm step; Core tools simply aren't exposed to agents. In the audit trail — so when something goes wrong, you can trace whether the architecture honored the classification or quietly violated it. If the classification only lives in a design document, it's not real.",
      },
      {
        q: 'How do I handle workflows that cross multiple zones?',
        a: "Most real workflows do. Classify each step independently, then design the transitions explicitly. Perimeter → Adjacent is a \"promotion\": the agent's output now needs human review before continuing. Adjacent → Core is a \"handoff\": the agent's preparation feeds the human, who then takes over the rest of the workflow. Don't classify the whole workflow with one label — you'll either over-protect or under-protect. Design each step, then design the seams between them.",
      },
      {
        q: 'How do I design for graceful degradation when the agent layer fails?',
        a: "Per zone. Perimeter: fall back to queueing — the work waits, no human is impacted. Adjacent: fall back to manual — the existing process must remain operable without the agent; the agent is an accelerant, not a dependency. Core: the agent never had the responsibility, so its failure is invisible — the human-led workflow continues unaffected. Test this explicitly. Turn the agent layer off in staging and confirm the business still functions. If it doesn't, you've put agents in places they shouldn't be.",
      },
      {
        q: "What's the equivalent of code review for classifications?",
        a: "A workflow design review where the artifact is the classification map. Each step gets defended: why is this Perimeter and not Adjacent? Who decided this is Core, and what's the basis? Does the architecture actually enforce the classification, or is it a stated intention with nothing behind it? Run this quarterly — workflows drift. Steps that started as Adjacent quietly get downgraded to Perimeter as confidence rises, sometimes correctly, sometimes silently and wrongly. The review is what catches the drift before it shows up in outcomes.",
      },
    ],
  },
  {
    category: 'Governance and the Truth layer',
    slug: 'governance-truth',
    questions: [
      {
        q: 'How do I measure whether an agent passes the Truth test?',
        a: "The metric isn't accuracy in the abstract — it's intervention rate. How often does the human downstream of the agent edit, override, or redo the agent's output? Below ~5%, the agent is meaningfully creating capacity. Above ~30%, you've built a review loop and you've actually made things worse — the agent is producing work that has to be substantially redone. Track this per-workflow, not in aggregate. An agent that scores well overall can still be failing the Truth test in specific high-stakes flows.",
      },
      {
        q: 'What additional observability do I need beyond standard application telemetry?',
        a: "Three streams. Decision traces — every step the agent took, including tool calls and the reasoning artifacts behind them. Confidence signals — where the agent flagged uncertainty (and where it didn't but should have, identified post-hoc). Downstream interventions — what the human did with the output, captured as feedback. Without intervention telemetry, you can't measure whether you're creating capacity or just shifting it. Standard APM tells you whether the agent ran; this tells you whether the agent helped.",
      },
      {
        q: 'How does the framework change my approach to access control?',
        a: "Agents should have less access than the humans they support, not more. A common failure mode is giving an agent a powerful service account so it can \"do its job\" — that's Perimeter mindset applied indiscriminately, and it creates blast radius far beyond what was intended. In Adjacent and Core zones, agent access should be read-mostly, with writes either disabled or human-mediated. Treat agents as a new principal type in your IAM model with their own permission schema, not as proxies for the humans they support.",
      },
      {
        q: "What's the failure mode where the framework gets gamed?",
        a: "Classification drift toward Perimeter. The pressure on every team is to automate more, faster — which creates pressure to classify steps as Perimeter when they're really Adjacent. The architectural defense is to make the classification a design artifact, not a runtime config. Changing it requires a design review. Make Perimeter classification the expensive call, not the default. The default should be Adjacent until proven Perimeter — same instinct as default-to-least-privilege in security.",
      },
    ],
  },
  {
    category: 'Identity and the Source layer',
    slug: 'identity-source',
    questions: [
      {
        q: 'Should we always disclose when AI is involved?',
        a: "No, and the framework actually makes this answerable. In Perimeter zones, disclosure is usually unnecessary and adds noise — no one needs a label saying \"this support ticket was auto-tagged by AI.\" In Adjacent zones, disclosure varies by context — an AI-drafted email approved by a rep usually doesn't need a label, because the human took ownership at the approval gate. In Core zones, disclosure isn't enough; the work shouldn't be agent-driven in the first place. The blanket \"always disclose AI\" rule is too coarse — it treats Source-irrelevant and Source-critical interactions the same way.",
      },
      {
        q: 'What about persona agents — agents designed to act as a specific person?',
        a: "Treat them as a Source-layer architectural decision, not a product feature. A persona agent that operates without the represented person's awareness or per-action approval is a Source violation by construction — it forges presence. The defensible pattern: the agent represents the person to the person (helping them prepare, draft, or summarize) — never to others on their behalf without explicit per-output approval. In other words, persona agents are personal assistants, not personal proxies.",
      },
      {
        q: 'How do I architect for "agent acts on behalf of user"?',
        a: "With active, per-action, informed consent — not standing consent. The agent prepares the action, the user sees what's about to happen, the user explicitly authorizes it. Standing authorizations (\"the agent can send emails on my behalf\") are a Source-layer footgun: they migrate work into Perimeter when it should be Adjacent. The exception is genuinely Perimeter actions — filing a ticket, updating a calendar, tagging a record — where the user has no Source promise to other parties.",
      },
      {
        q: 'How do I think about authentication and identity for agents?',
        a: "Agents need their own identity in your auth system, distinct from the human they support. When an agent acts, the audit trail should show the agent acted on behalf of this human, with these specific permissions — not this human did this thing. The latter is a Source violation in your own internal records: it makes humans accountable for actions they didn't take, and it makes agent behavior invisible to investigation. Treat agents as a distinct principal class with delegated authority, scoped explicitly to the zones they're designed to operate in.",
      },
    ],
  },
  {
    category: 'Measuring and evolving over time',
    slug: 'measuring-evolving',
    questions: [
      {
        q: "What's the right metric for \"did we automate the right work\"?",
        a: "A composite. Capacity reclaimed (hours saved on Perimeter work) minus intervention overhead (hours spent reviewing Adjacent work) minus trust erosion (signals from Source and Tie zones — engagement depth, renewal rates, NPS, complaint volume). If you only measure the first term, you'll over-automate. The other two terms are the corrective force that keeps automation pointed at the right targets.",
      },
      {
        q: 'How do I detect Source or Tie erosion before it shows up in renewal numbers?',
        a: "Leading indicators are usually present months earlier. Source erosion: engagement depth on automated channels (do customers reply, or just read?), sentiment trends in inbound communication, reply rates on automated outbound, complaint volume on automated touchpoints. Tie erosion: relationship velocity — are deepening conversations still happening, or has the relationship plateaued at a transactional level? In B2B, this is often visible in account expansion patterns; accounts where Tie-bearing interactions got automated tend to renew but not expand. They become contracts, not relationships. By the time renewal goes south, the asset has been liquidated for a year.",
      },
      {
        q: 'What changes as the underlying models get more capable?',
        a: "The Truth axis moves significantly — more workflows become reliably automatable as models improve. The Source axis moves slowly — human expectations of human presence change at the speed of culture, not at the speed of models. The Tie axis doesn't move at all — relational compounding is a property of human relationships, not of technology. Architectural implication: build for evolution on the Truth axis (you'll re-classify many workflows over the next 24 months as capability gains arrive), but treat Source and Tie classifications as much more stable. Don't over-architect for changes that won't happen.",
      },
    ],
  },
]
