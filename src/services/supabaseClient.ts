// src/services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kozmamwoekqfakpyeycw.supabase.co';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);