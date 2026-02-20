import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fdtjrpjmvvgbqjrtsdcq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkdGpycGptdnZnYnFqcnRzZGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjI4ODcsImV4cCI6MjA4NzA5ODg4N30.Ws8rZC8zIirSiIpk51zp3gEvhdaA3h-YKGekAQjHKGk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
