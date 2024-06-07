import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Type assertion for environment variables
const supabaseUrl: string | undefined = process.env.SUPABASE_URL;
const supabaseKey: string | undefined = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
    console.log("Missing Supabase URL");
    throw new Error("Missing Supabase URL");
} else if (!supabaseKey) {
    console.log("Missing Supabase Key");
    throw new Error("Missing Supabase Key");
}

// Create a single Supabase client for interacting with your database
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
