import { supabase } from './supabaseClient';

/**
 * Get a setting value by key
 * @param {string} key
 * @returns {Promise<string|null>}
 */
export const getSetting = async (key) => {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null; // no row
    throw error;
  }
  return data?.value || null;
};

/**
 * Set a setting value
 * @param {string} key
 * @param {string} value
 */
export const setSetting = async (key, value) => {
  const { error } = await supabase
    .from('settings')
    .upsert({ key, value }, { onConflict: 'key' });
  if (error) throw error;
};

/**
 * Get multiple settings at once
 * @param {string[]} keys
 * @returns {Promise<Object>}
 */
export const getSettings = async (keys) => {
  const { data, error } = await supabase
    .from('settings')
    .select('key, value')
    .in('key', keys);
  if (error) throw error;
  const result = {};
  data?.forEach(item => { result[item.key] = item.value; });
  return result;
};