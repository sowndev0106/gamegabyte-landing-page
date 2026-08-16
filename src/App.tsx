import { CommandShell } from './components/shell/CommandShell'
import { Hero } from './sections/Hero'
import { Showreel } from './sections/Showreel'
import { Stats } from './sections/Stats'
import { Services } from './sections/Services'
import { Portfolio } from './sections/Portfolio'
import { WhyChooseUs } from './sections/WhyChooseUs'
import { Academy } from './sections/Academy'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

/**
 * Document order must match `src/content/sections.ts` — the rail, the mobile
 * menu and every section heading number are generated from that registry.
 */
function App() {
  return (
    <CommandShell footer={<Footer />}>
      <Hero />
      <Showreel />
      <Stats />
      <Services />
      <Portfolio />
      <WhyChooseUs />
      <Academy />
      <Faq />
      <Contact />
    </CommandShell>
  )
}

export default App
