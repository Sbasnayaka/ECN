import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        // Do not automatically send the access token
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
    },
    global: {
        headers: {
            // Force only apikey header
            'apikey': supabaseAnonKey
        }
    }
});

// Attach to window for debugging
window.supabase = supabase;
console.log('Supabase client created (with auth disabled)');