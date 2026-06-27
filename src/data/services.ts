/**
 * Capabilities — a numbered editorial list, not a feature grid.
 * Serif title + one confident, concrete grotesk line each.
 */
export type Service = {
  /** Two-digit index, e.g. "01". */
  n: string
  title: string
  desc: string
}

export const services: Service[] = [
  {
    n: '01',
    title: 'Agent design',
    desc: 'We scope the job to be done, then design the agent’s reasoning, its tools, and the guardrails that keep it honest.',
  },
  {
    n: '02',
    title: 'Orchestration',
    desc: 'Multi-agent workflows wired into your systems — tools, integrations, shared state, and clean handoffs between steps.',
  },
  {
    n: '03',
    title: 'Evals & safety',
    desc: 'Measurable eval suites and regression gates, so nothing reaches production until it provably behaves.',
  },
  {
    n: '04',
    title: 'Deployment & ops',
    desc: 'We ship to production and stay — monitoring quality, cost, and latency, and iterating once it’s live.',
  },
]
