import { useState } from 'react'
import { content, assets } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSent(true)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-brand px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.18] pointer-events-none"
        style={{ backgroundImage: `url(${assets.backgrounds.pattern})` }}
      />
      <Container className="relative z-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl lg:text-6xl">
              {content.contact.title}
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {content.contact.body}
            </p>
            
            <form className="mt-12 flex flex-col gap-5 text-left" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-sm font-semibold uppercase tracking-wider text-white/90">
                  {content.contact.fields.name}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white px-5 py-4 text-black outline-none border border-transparent focus:border-accent"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-sm font-semibold uppercase tracking-wider text-white/90">
                  {content.contact.fields.email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-white px-5 py-4 text-black outline-none border border-transparent focus:border-accent"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-sm font-semibold uppercase tracking-wider text-white/90">
                  {content.contact.fields.message}
                </label>
                <textarea
                  id="contact-message"
                  required
                  style={{ minHeight: '160px' }}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-white px-5 py-4 text-black outline-none border border-transparent focus:border-accent resize-y"
                />
              </div>

              <button 
                type="submit" 
                className="mt-4 min-h-16 border border-accent bg-accent px-8 py-4 text-base font-bold uppercase text-ink transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-[0_0_28px_rgba(182,232,2,0.18)]"
              >
                {content.contact.cta}
              </button>
              
              {sent && (
                <p className="mt-4 text-center text-accent font-semibold">
                  Form submitted - thank you!
                </p>
              )}
            </form>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
