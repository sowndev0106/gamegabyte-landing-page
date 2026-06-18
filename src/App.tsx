import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { TrustBar } from './sections/TrustBar'
import { Services } from './sections/Services'
import { WorkProcess } from './sections/WorkProcess'
import { WhyChooseUs } from './sections/WhyChooseUs'
import { Stats } from './sections/Stats'
import { Portfolio } from './sections/Portfolio'
import { Showreel } from './sections/Showreel'
import { Testimonials } from './sections/Testimonials'
import { Academy } from './sections/Academy'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

function App() {
  return (
    <main className="min-h-screen bg-ink text-white">
      <Header />
      <Hero />
      <TrustBar />
      <Services />
      <WorkProcess />
      <WhyChooseUs />
      <Stats />
      <Portfolio />
      <Showreel />
      <Testimonials />
      <Academy />
      <Faq />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
