import { useState } from 'react'
import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section, GlowSpot } from '../components/ui/Section'
import { Panel } from '../components/ui/Panel'
import { SectionHeader } from '../components/ui/SectionHeader'

type Status = 'idle' | 'submitting' | 'success' | 'mail' | 'error'

const fieldClass =
  'w-full border border-white/11 bg-white/1.5 px-5 py-4 text-white transition-colors hover:border-white/25 focus:border-accent'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const { endpoint, email } = content.contact

    // No backend configured: hand the message to the visitor's mail client
    // rather than claiming a delivery that never happened.
    if (!endpoint) {
      const subject = encodeURIComponent(`New enquiry from ${formData.name}`)
      const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`)
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
      setStatus('mail')
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const message = {
    idle: '',
    submitting: '',
    success: 'Message sent — we will be in touch.',
    mail: `Your mail client should now be open. If nothing happened, write to ${content.contact.email}.`,
    error: `Something went wrong. Please email ${content.contact.email} directly.`,
  }[status]

  return (
    <Section
      id="contact"
      grid
      backdrop={<GlowSpot className="top-[20%] left-1/2 h-90 w-160 -translate-x-1/2" />}
    >
      <Container>
        <SectionHeader
          id="contact"
          title={content.contact.title}
          description={content.contact.body}
        />

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:gap-12">
          <Reveal>
            <form className="flex max-w-2xl flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/60">
                  {content.contact.fields.name}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/60">
                  {content.contact.fields.email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/60">
                {content.contact.fields.message}
              </label>
              <textarea
                id="contact-message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className={`${fieldClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-2 inline-flex min-h-14 cursor-pointer items-center justify-center gap-3 border border-accent bg-accent px-8 py-4 text-base font-bold uppercase text-ink shadow-[0_0_28px_rgba(182,232,2,0.18)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' && (
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink"
                />
              )}
              {status === 'submitting' ? 'Sending' : content.contact.cta}
            </button>

            <p
              aria-live="polite"
              className={`min-h-6 font-mono text-[9px] uppercase tracking-[0.22em] ${
                status === 'error' ? 'text-red-400' : 'text-accent'
              }`}
            >
              {message}
            </p>
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <Panel as="aside" className="p-7 sm:p-8" aria-label="Open channel response status">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
                {content.contact.response.status}
              </p>
              <h3 className="mt-5 font-display text-[28px] font-bold text-white">
                {content.contact.response.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/70">{content.contact.response.body}</p>
            </Panel>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
