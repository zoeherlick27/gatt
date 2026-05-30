import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Restaurant {
  id?: string
  name: string
  neighborhood: string
  cuisine: string
  stars: number
  price: string
  vibe_tags: string[]
  notes: string
  created_at?: string
}

export async function saveVisit(data: Omit<Restaurant, 'id' | 'created_at'>) {
  const { error } = await supabase.from('restaurants').insert([data])
  if (error) throw error
}

export async function getVisits(): Promise<Restaurant[]> {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}
