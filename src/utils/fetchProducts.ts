import { supabase } from '../services/supabaseClient';
import { Product, Trend } from '../types';

export const fetchProducts = async (trend: Trend): Promise<Product[]> => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data?.filter((product) =>
    product.tags.some((tag) => trend.keywords.includes(tag))
  ) || [];
};
