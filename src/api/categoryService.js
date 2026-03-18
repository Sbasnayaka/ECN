import { supabase } from './supabaseClient';

/**
 * Fetch all categories
 * @returns {Promise<Array>} List of categories
 */
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  if (error) throw error;
  return data;
};

/**
 * Create a new category
 * @param {Object} category - { name, slug, theme_color, section_type }
 * @returns {Promise<Object>} Created category
 */
export const createCategory = async (category) => {
  const { data, error } = await supabase
    .from('categories')
    .insert([category])
    .select();
  if (error) throw error;
  return data[0];
};

/**
 * Update an existing category
 * @param {string} id - Category ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated category
 */
export const updateCategory = async (id, updates) => {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

/**
 * Delete a category
 * @param {string} id - Category ID
 */
export const deleteCategory = async (id) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
  if (error) throw error;
};