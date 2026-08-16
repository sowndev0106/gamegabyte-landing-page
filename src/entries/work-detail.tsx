import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { WorkDetailPage } from '../pages/WorkDetailPage'
import { loadWorkDetail } from '../content/work/types'

/**
 * Every project detail page is the same bundle; the URL says which project.
 *
 * All sixteen HTML files point at this entry, so the slug cannot come from the
 * module — it comes from where the browser already is. `/work/<slug>/` is the
 * canonical shape, and the trailing segment survives with or without the
 * trailing slash.
 */
const slug = window.location.pathname.split('/').filter(Boolean).pop() ?? ''
const root = createRoot(document.getElementById('root')!)
const project = await loadWorkDetail(slug)

if (project) {
  root.render(
    <StrictMode>
      <WorkDetailPage project={project} />
    </StrictMode>,
  )
} else {
  // Only reachable if a page file outlives its content record — the generator
  // rebuilds `work/` from the index each run, so this is a broken build, not a
  // user-facing 404. Say so plainly rather than rendering an empty shell.
  root.render(
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
        No project record for “{slug}” — <a href="/work/" className="text-accent underline">back to the archive</a>
      </p>
    </main>,
  )
}
