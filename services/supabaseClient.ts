import { createClient } from '@supabase/supabase-js';

// Add better error handling for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Log error if environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Uploads a file to Supabase Storage.
 * Note: You must create a public bucket named 'cakepics' in your Supabase project.
 * @param file The file to upload.
 * @returns The public URL of the uploaded file, or null on error.
 */
export const uploadFile = async (file: File): Promise<string | null> => {
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