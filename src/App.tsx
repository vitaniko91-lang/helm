import { LivingMargin } from './components/LivingMargin'
import { PaperGrain } from './components/PaperGrain'

/**
 * Editorial Atelier shell for Helm.
 *
 * The ambient signature (LivingMargin contours + PaperGrain texture) is mounted
 * once here at z-0 so every later section inherits it; page content rides above
 * at z-10. The page paper comes from <body> (index.css), so <main> stays
 * transparent and the margin contours read through on either side of the column.
 * Sections (Nav, Hero, Manifesto, Selected Work, Services, Approach, Proof,
 * Contact, Footer) land in later tasks.
 */
function App() {
  return (
    <>
      <LivingMargin />
      <PaperGrain />
      <main className="relative z-10 min-h-screen text-ink">
        <div className="mx-auto flex min-h-screen max-w-content flex-col justify-center px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
            Boutique AI-agent studio
          </p>
          <h1 className="mt-4 font-serif text-6xl font-medium leading-none tracking-tight text-ink">
            Helm
          </h1>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-ink-soft">
            We design and build the agents that run your business —{' '}
            <span className="text-oxblood">end&#8209;to&#8209;end</span>.
          </p>
        </div>
      </main>
    </>
  )
}

export default App
