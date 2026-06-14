import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xateuyrdodkjwmheqych.supabase.co'
const supabaseAnonKey = 'PASTE_YOUR_LONG_ANON_KEY_HERE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
