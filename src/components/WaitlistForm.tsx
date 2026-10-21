import { useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'

type Status = 'idle' | 'sending' | 'done' | 'exists' | 'error'

export function WaitlistForm({ source }: { source: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!supabase) {
      setStatus('error')
      return
    }
    setStatus('sending')
    const { error } = await supabase
      .from('waitlist')
      .insert({ product: 'stride_lab', email: email.trim(), source })
    if (!error) setStatus('done')
    else if (error.code === '23505') setStatus('exists')
    else setStatus('error')
  }

  if (status === 'done' || status === 'exists') {
    return (
      <p className="text-sm text-slate-700">
        {status === 'done' ? "You're on the list. We'll email you when it's ready." : "You're already on the list."}
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <label className="sr-only" htmlFor={`waitlist-${source}`}>
        Email
      </label>
      <input
        id={`waitlist-${source}`}
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {status === 'sending' ? 'Joining…' : 'Join the waitlist'}
      </button>
      {status === 'error' && <p className="text-sm text-red-700">Something went wrong. Try again.</p>}
    </form>
  )
}
