import { useState } from 'react'
import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section, GlowSpot } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'

type Status = 'idle' | 'submitting' | 'success' | 'mail' | 'error'

const fieldClass =
  'w-full border border-white/12 bg-white/[0.03] px-5 py-4 text-white placeholder:text-white/30 transition-colors hover:border-white/25 focus:border-accent'

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
    success: 'Message sent — we will get back to you within two working days.',
    mail: `Your mail client should now be open. If nothing happened, write to ${content.contact.email}.`,
    error: `Something went wrong. Please email ${content.contact.email} directly.`,
  }[status]

  return (
    <Section
      id="contact"
      grid
      backdrop={<GlowSpot className="left-1/2 top-[20%] h-[360px] w-[640px] -translate-x-1/2" />}
    >
      <Container>
        <SectionHeader
          index="08"
          eyebrow="Contact"
          title={content.contact.title}
          description={content.contact.body}
        />

        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:gap-12">
          <Reveal>
            <form className="flex max-w-2xl flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
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
                <label htmlFor="contact-email" className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
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
              <label htmlFor="contact-message" className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
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
              className={`min-h-6 text-center font-mono text-xs uppercase tracking-[0.14em] ${
                status === 'error' ? 'text-red-400' : 'text-accent'
              }`}
            >
              {message}
            </p>
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <aside className="hud-surface p-7 sm:p-8" aria-label="Open channel response status">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                System status / online
              </p>
              <h3 className="mt-5 font-display text-2xl font-bold text-white sm:text-[28px]">
                Replies in 2 working days
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/70">
                Share your launch date, platform and what success looks like. We will respond with a practical next step.
              </p>
            </aside>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
