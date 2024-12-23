// src/services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kozmamwoekqfakpyeycw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtvem1hbXdvZWtxZmFrcHlleWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2NTg0OTYsImV4cCI6MjA1MDIzNDQ5Nn0.DY8pPPJE2j4fDj4V7EoCwgBuZbNDa2wRhVVTSK5cph8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);