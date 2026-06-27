/**
 * How we work — four steps for the pinned approach section.
 * Discovery → Design → Build → Run. Crisp one-liners on what happens in each.
 */
export type Step = {
  /** Two-digit index, e.g. "01". */
  n: string
  title: string
  desc: string
}

export const approach: Step[] = [
  {
    n: '01',
    title: 'Discovery',
    desc: 'We sit with the work, map where the time and errors go, and find the one task worth handing to an agent.',
  },
  {
    n: '02',
    title: 'Design',
    desc: 'We shape the agent’s reasoning, its tools, and its limits — and agree on what “good” looks like before any code.',
  },
  {
    n: '03',
    title: 'Build',
    desc: 'We build against evals from day one, integrate with your systems, and prove each step holds before the next.',
  },
  {
    n: '04',
    title: 'Run',
    desc: 'We ship to production, watch it in the real world, and keep tuning quality, cost, and latency.',
  },
]
