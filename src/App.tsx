/**
 * Editorial Atelier placeholder for Helm.
 * Sections (Nav, Hero, Manifesto, Selected Work, Services, Approach, Proof,
 * Contact, Footer) and motion primitives land in later tasks. This is just
 * the paper-and-ink shell that proves the tokens + fonts are wired.
 */
function App() {
  return (
    <main className="min-h-screen bg-paper-base text-ink">
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
  )
}

export default App
