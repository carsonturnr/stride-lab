import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const YEAR = new Date().getFullYear()
const REPO = 'https://github.com/carsonturnr/stride-lab'

export function SitePage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link to="/" className="text-base font-semibold tracking-tight">
          Stride Lab
        </Link>
        <nav className="flex items-center gap-5 text-sm text-slate-600">
          <a href="/#metrics" className="hover:text-slate-900">
            Metrics
          </a>
          <a href="/#how" className="hover:text-slate-900">
            How it works
          </a>
          <a href={REPO} className="hover:text-slate-900">
            GitHub
          </a>
        </nav>
      </header>
      {children}
      <footer className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 text-sm text-slate-500 sm:flex-row sm:justify-between">
        <span>© {YEAR} Stride Lab. Open source under the MIT license.</span>
        <nav className="flex gap-4">
          <Link to="/privacy" className="hover:text-slate-900">
            Privacy
          </Link>
          <a href={REPO} className="hover:text-slate-900">
            GitHub
          </a>
        </nav>
      </footer>
    </div>
  )
}

export function Prose({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-1 text-sm text-slate-500">Last updated {updated}</p>
      <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-slate-800">{children}</div>
    </main>
  )
}
