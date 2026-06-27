import { LivingMargin } from './components/LivingMargin'
import { PaperGrain } from './components/PaperGrain'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { Manifesto } from './sections/Manifesto'
import { Work } from './sections/Work'
import { Services } from './sections/Services'

/**
 * Editorial Atelier shell for Helm.
 *
 * The ambient signature (LivingMargin contours + PaperGrain texture) is mounted
 * once here at z-0 so every later section inherits it; page content rides above
 * at z-10. The page paper comes from <body> (index.css), so the content layer
 * stays transparent and the margin contours read through on either side of the
 * column. The Manifesto rides its own quiet paper-sink band; Selected Work returns
 * to open paper as a ruled editorial ledger; Services follows as a numbered
 * capability index on the same open paper. Remaining sections (Approach, Proof,
 * Contact, Footer) land in later tasks.
 */
function App() {
  return (
    <>
      <LivingMargin />
      <PaperGrain />
      <div className="relative z-10 text-ink">
        <Nav />
        <main>
          <Hero />
          <Manifesto />
          <Work />
          <Services />
        </main>
      </div>
    </>
  )
}

export default App
