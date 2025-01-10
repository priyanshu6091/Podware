import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_URL.startsWith('https://')) {
  throw new Error(
    'Please click the "Connect to Supabase" button to configure your project. ' +
    'This will set up the required environment variables.'
  );
}

if (!SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing Supabase anonymous key. ' +
    'Please click the "Connect to Supabase" button to configure your project.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);