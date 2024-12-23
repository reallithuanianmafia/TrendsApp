import { supabase } from '../services/supabaseClient';
import { Trend } from '../types';

export const fetchTrends = async (): Promise<Trend[]> => {
  const { data, error } = await supabase.from('trends').select('*');
  if (error) {
    console.error('Error fetching trends:', error);
    return [];
  }
  return data || [];
};
