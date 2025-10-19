import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Add better error handling for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Log error if environment variables are missing
if (!supabaseUrl) {
  console.error('Missing VITE_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  console.error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

// Only create the Supabase client if both variables are present
let supabase: SupabaseClient | null = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('Supabase client initialized successfully');
} else {
  console.error('Supabase client not initialized due to missing environment variables');
}

/**
 * Uploads a file to Supabase Storage.
 * Note: You must create a public bucket named 'cakepics' in your Supabase project.
 * @param file The file to upload.
 * @returns The public URL of the uploaded file, or null on error.
 */
export const uploadFile = async (file: File): Promise<string | null> => {
  // Check if Supabase client is initialized
  if (!supabase) {
    console.error('Supabase client not initialized');
    return null;
  }

  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
  const bucketName = 'cakepics'; // FIX: Corrected bucket name
  
  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file);

  if (uploadError) {
    console.error('Error uploading file:', uploadError.message);
    return null;
  }

  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);
    
  return data.publicUrl;
};

// Export the Supabase client
export { supabase };