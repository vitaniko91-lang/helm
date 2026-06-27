import { LivingMargin } from './components/LivingMargin'
import { PaperGrain } from './components/PaperGrain'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { Manifesto } from './sections/Manifesto'
import { Work } from './sections/Work'
import { Services } from './sections/Services'
import { Approach } from './sections/Approach'
import { Proof } from './sections/Proof'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

/**
 * Editorial Atelier shell for Helm.
 *
 * The ambient signature (LivingMargin contours + PaperGrain texture) is mounted
 * once here at z-0 so every later section inherits it; page content rides above
 * at z-10. The page paper comes from <body> (index.css), so the content layer
 * stays transparent and the margin contours read through on either side of the
 * column. The Manifesto rides its own quiet paper-sink band; Selected Work returns
 * to open paper as a ruled editorial ledger; Services follows as a numbered
 * capability index on the same open paper. Approach follows as the page's one
 * pinned moment — a sticky "how we work" sequence that degrades to a static list
 * on touch / reduced motion. The page then closes on a quiet Proof testimonial
 * band, a confident Contact crescendo, and the editorial Footer colophon (sibling
 * of <main>, still on the content layer above the ambient signature).
 */
function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[3px] focus:bg-oxblood focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-medium focus:text-paper-base focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink"
      >
        Skip to content
      </a>
      <LivingMargin />
      <PaperGrain />
      <div className="relative z-10 text-ink">
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <Manifesto />
          <Work />
          <Services />
          <Approach />
          <Proof />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
