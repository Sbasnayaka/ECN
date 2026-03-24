import { supabase } from './supabaseClient';

// Define valid positions (should match enum in DB)
export const AD_POSITIONS = [
  'top_banner',
  'sidebar_top',
  'sidebar_middle',
  'sidebar_bottom',
  'medium_1',
  'medium_2',
  'medium_3',
  'medium_4',
  'medium_5',
  'medium_6',
  'bottom_banner',
  'inline_news'
];

/**
 * Fetch all advertisements
 * @returns {Promise<Array>} List of ads
 */
export const getAds = async () => {
  const { data, error } = await supabase
    .from('advertisements')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

/**
 * Create a new advertisement
 * @param {Object} ad - Ad object (name, position, type, image_url, link_url, ad_code, is_active)
 * @returns {Promise<Object>} Created ad
 */
export const createAd = async (ad) => {
  const { data, error } = await supabase
    .from('advertisements')
    .insert([ad])
    .select();
  if (error) throw error;
  return data[0];
};

/**
 * Update an existing advertisement
 * @param {string} id - Ad ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated ad
 */
export const updateAd = async (id, updates) => {
  const { data, error } = await supabase
    .from('advertisements')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

/**
 * Delete an advertisement
 * @param {string} id - Ad ID
 */
export const deleteAd = async (id) => {
  const { error } = await supabase
    .from('advertisements')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

/**
 * Fetch active advertisements for a given position
 * @param {string} position
 * @returns {Promise<Array>}
 */
export const getAdsByPosition = async (position) => {
  const { data, error } = await supabase
    .from('advertisements')
    .select('*')
    .eq('position', position)
    .eq('is_active', true);
  if (error) throw error;
  return data;
};
