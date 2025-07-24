import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://phdmjisojymhvelxpofw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZG1qaXNvanltaHZlbHhwb2Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNzMyNTgsImV4cCI6MjA2ODk0OTI1OH0.lR8o0NoDbGUyGxUE9XsMlndr9GZEywkkBvJ8jax2b1g';

export const supabase = createClient(supabaseUrl, supabaseKey)