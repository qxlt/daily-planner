import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_ANON_KEY;

// Debugging: Log the environment variables to ensure they are loaded correctly
//console.log("URL:", supabaseUrl); 
//console.log("Key:", supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

// console.log("Supabase is ready:", supabase);

export default supabase