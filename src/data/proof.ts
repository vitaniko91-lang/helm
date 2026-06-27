/**
 * Proof — one editorial pull-quote plus a quiet row of client names.
 * Fictional, attributed to a role.
 */
export type Quote = {
  quote: string
  author: string
  role: string
}

export const proof: Quote = {
  quote:
    'Helm shipped an agent we actually trust in production. The evals did the convincing — we stopped debating whether it worked and started planning what to hand it next.',
  author: 'Dana Okafor',
  role: 'VP Engineering, fintech',
}

/** Plausible fictional clients for a quiet logo row. */
export const clients: string[] = [
  'Northwind Capital',
  'Atlas Freight',
  'Vero Health',
  'Meridian Labs',
  'Cobalt Logistics',
  'Harbor Mutual',
]
