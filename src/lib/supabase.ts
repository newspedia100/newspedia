import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration
// Get these from your Supabase project settings > API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Storage bucket name for uploads
export const STORAGE_BUCKET = 'uploads';

// Create Supabase client only if credentials are available
let supabaseInstance: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase credentials not configured. File upload will not work.');
}

export const supabase = supabaseInstance;

// Helper to check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
