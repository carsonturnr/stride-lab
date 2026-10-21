import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// The site renders without Supabase; only the waitlist form needs it.
export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null
