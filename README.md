# Helm — AI agents, built end-to-end

A concept site for **Helm**, a fictional boutique studio that designs and builds
production AI agents end-to-end — agent design, orchestration, evals & safety,
and the deployment & ops that keep them running.

**Live:** https://vitaniko91-lang.github.io/helm/

> Fictional studio — a portfolio concept by Vitalina Nikulina. Not a real
> company; built to explore an art direction, not to sell a service.

![Helm — Editorial Atelier](./public/og.png)

## Art direction — "Editorial Atelier"

Helm is deliberately the **opposite** of the dark, terminal-driven dev-tool
look. It reads like a printed design quarterly: a **light paper ground**, a
**kinetic Fraunces serif** for the voice, and a single **oxblood** accent used
sparingly for emphasis. The result is calm, confident, and editorial — a studio
that talks like a craftsperson, not a SaaS dashboard.

Three signature moves carry the concept:

- **Kinetic serif headlines** — the hero statement reveals line-by-line via
  mask wipes, letting an opsz-variable Fraunces do the talking.
- **Living-margin contours** — hairline rules and margin marks that draw
  themselves in on scroll, echoing the registration marks of a press sheet.
- **Count-up metrics** — proof numbers tick up once on entry, so the evidence
  feels measured rather than shouted.

Everything sits on a faint **paper grain** and a generous editorial grid, with
restrained Hanken Grotesk body copy and Spline Sans Mono meta labels.

## Tech stack

- **React + TypeScript**
- **Vite** (build/dev, relative `base` for GitHub Pages project paths)
- **Tailwind CSS** (design tokens + styling)
- **motion** (mask reveals, hairline draws, count-up, scroll reveals)
- **@iconify/react** (icons)
- **Vitest + Testing Library** (component/section tests)

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
npm run test     # run the Vitest suite
npm run lint     # oxlint
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to
GitHub Pages. The Vite `base: './'` keeps hashed assets resolving correctly from
the `/helm/` project subpath.

---

Fictional studio — a portfolio concept by Vitalina Nikulina.
