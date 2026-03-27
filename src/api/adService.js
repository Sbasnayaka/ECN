import { supabase } from './supabaseClient';
import { getAccessToken } from './tokenStore';

export const AD_POSITIONS = [
  'top_banner',
  'header_bottom_1', 'header_bottom_2', 'header_bottom_3',
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
 * Helper: Perform a fetch with the stored access token
 */
const fetchWithAuth = async (url, options = {}) => {
  const token = getAccessToken();
  if (!token) throw new Error('No access token available');
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      ...options.headers,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
};

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
  const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/advertisements`;
  const data = await fetchWithAuth(url, {
    method: 'POST',
    body: JSON.stringify([ad]),
  });
  return data[0];
};

/**
 * Update an existing advertisement
 * @param {string} id - Ad ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated ad
 */
export const updateAd = async (id, updates) => {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/advertisements?id=eq.${id}`;
  const data = await fetchWithAuth(url, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
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