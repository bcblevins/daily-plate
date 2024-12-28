import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://rrdsqjjcfjrlhanrgwhc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZHNxampjZmpybGhhbnJnd2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NjMwMDQsImV4cCI6MjA0OTQzOTAwNH0.ItFO7FJIB69t6Vm8duXXRb6UozyCY0KvGjaPx_TfaAc';


const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;