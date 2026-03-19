import { supabase } from './supabaseClient';

/**
 * Fetch all articles with author and category info
 * @returns {Promise<Array>} List of articles with related data
 */
export const getArticles = async () => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories (name, slug),
      profiles (name, email)
    `)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

/**
 * Fetch a single article by ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export const getArticleById = async (id) => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories (name, slug),
      profiles (name, email)
    `)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

/**
 * Create a new article
 * @param {Object} article - Article data
 * @returns {Promise<Object>}
 */
export const createArticle = async (article) => {
  const { data, error } = await supabase
    .from('articles')
    .insert([article])
    .select();
  if (error) throw error;
  return data[0];
};

/**
 * Update an existing article
 * @param {string} id
 * @param {Object} updates
 * @returns {Promise<Object>}
 */
export const updateArticle = async (id, updates) => {
  const { data, error } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

/**
 * Delete an article
 * @param {string} id
 */
export const deleteArticle = async (id) => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

/**
 * Fetch all categories for dropdown
 */
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name');
  if (error) throw error;
  return data;
};

/**
 * Fetch all authors (profiles with role editor or admin) for dropdown
 */
export const getAuthors = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email')
    .in('role', ['admin', 'editor']);
  if (error) throw error;
  return data;
};

/**
 * Approve an article (admin only)
 * Sets status to 'published' and sets published_at if not already set
 * @param {string} id
 */
export const approveArticle = async (id) => {
  const { error } = await supabase
    .from('articles')
    .update({ 
      status: 'published', 
      published_at: new Date().toISOString() 
    })
    .eq('id', id);
  if (error) throw error;
};

/**
 * Request deletion of an article (editor)
 * @param {string} id
 */
export const requestArticleDelete = async (id) => {
  const { error } = await supabase
    .from('articles')
    .update({ status: 'delete_requested' })
    .eq('id', id);
  if (error) throw error;
};