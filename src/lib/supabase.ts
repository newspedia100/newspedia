import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Get these from your Supabase project settings > API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. File upload will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Storage bucket name for uploads
export const STORAGE_BUCKET = 'uploads';
