import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'http://localhost:54321'; // Default local placeholder
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key';

// We use the service role key on the backend to bypass RLS for administrative actions
// Make sure to NEVER expose this key to the frontend.
export const supabase = createClient(supabaseUrl, supabaseKey);
