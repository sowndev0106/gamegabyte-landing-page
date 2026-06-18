import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Stats } from './sections/Stats'
import { Services } from './sections/Services'
import { WorkProcess } from './sections/WorkProcess'
import { WhyChooseUs } from './sections/WhyChooseUs'
import { Portfolio } from './sections/Portfolio'
import { Testimonials } from './sections/Testimonials'
import { Academy } from './sections/Academy'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { Showreel } from './sections/Showreel'

function App() {
  return (
    <main className="min-h-screen bg-ink text-white">
      <Header />
      <Hero />
      <Showreel />
      <Stats />
      <Services />
      <WorkProcess />
      <WhyChooseUs />
      <Portfolio />
      <Testimonials />
      <Academy />
      <Faq />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
