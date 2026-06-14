import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xateuyrdodkjwmheqych.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhdGV1eXJkb2RrandtaGVxeWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzODc0NjEsImV4cCI6MjA5Njk2MzQ2MX0.7tKoGcFwK5dsqHbuDI1_AM4nqbw1WhorLebnBnioQLY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
