/**
 * Selected work — three fictional Helm engagements.
 * Studios sell on work: each case is client + sector, the problem we walked into,
 * what we actually built, and one result metric that counts up.
 *
 * `result` maps onto <CountUp>: it renders `${prefix}${value}${suffix}`, so a
 * value of 5 with suffix "×" reads "5×" (not "×5"). Choose prefix/suffix so the
 * number reads the way you'd say it aloud.
 */
export type WorkCase = {
  client: string
  sector: string
  /** The situation we were brought in to fix — one specific sentence. */
  problem: string
  /** What Helm designed and shipped. */
  built: string
  result: {
    value: number
    prefix?: string
    suffix?: string
    /** What the number means, in plain language. */
    label: string
  }
}

export const work: WorkCase[] = [
  {
    client: 'Northwind Capital',
    sector: 'Financial operations',
    problem:
      'Reconciling 40 ledgers by hand cost two analyst-days every week, and the exceptions still slipped through.',
    built:
      'An agent that reconciles across every ledger, flags the anomalies that matter, and drafts the exception report for sign-off.',
    result: { value: 92, suffix: '%', label: 'less time spent on reconciliation' },
  },
  {
    client: 'Atlas Freight',
    sector: 'Logistics',
    problem:
      'Dispatchers re-quoted every load by hand against live carrier rates — slow, and rarely the best price.',
    built:
      'A quoting agent wired into their TMS and carrier rate feeds, returning a priced, bookable quote in seconds.',
    result: { value: 5, suffix: '×', label: 'faster quote turnaround' },
  },
  {
    client: 'Vero Health',
    sector: 'Insurance',
    problem:
      'Prior-authorization backlogs delayed patient care by days while staff chased forms and missing fields.',
    built:
      'An eval-gated intake agent that triages each request, pre-fills the authorization, and routes only the edge cases to a human.',
    result: { value: 18, suffix: 'k', label: 'authorizations processed each month' },
  },
]
