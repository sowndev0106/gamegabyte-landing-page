import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Stats } from './sections/Stats'
import { Services } from './sections/Services'
import { WorkProcess } from './sections/WorkProcess'
import { WhyChooseUs } from './sections/WhyChooseUs'
import { Portfolio } from './sections/Portfolio'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { Showreel } from './sections/Showreel'

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-accent focus:bg-ink focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-accent"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="min-h-screen bg-ink text-white">
        <Hero />
        <Showreel />
        <Stats />
        <Services />
        <WorkProcess />
        <WhyChooseUs />
        <Portfolio />
        {/* CaseStudy, Testimonials and Academy are parked for now; re-add them
            here to bring them back (section index numbers shift accordingly).
            The Academy nav item now links out to the course site instead. */}
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
