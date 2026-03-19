import { supabase } from './supabaseClient';

/**
 * Fetch all gallery images
 * @returns {Promise<Array>} List of gallery items
 */
export const getGallery = async () => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

/**
 * Create a new gallery item
 * @param {Object} item - { title, image_url }
 * @returns {Promise<Object>} Created gallery item
 */
export const createGalleryItem = async (item) => {
  const { data, error } = await supabase
    .from('gallery')
    .insert([item])
    .select();
  if (error) throw error;
  return data[0];
};

/**
 * Update a gallery item (e.g., change title)
 * @param {string} id - Gallery item ID
 * @param {Object} updates - { title }
 * @returns {Promise<Object>} Updated item
 */
export const updateGalleryItem = async (id, updates) => {
  const { data, error } = await supabase
    .from('gallery')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

/**
 * Delete a gallery item
 * @param {string} id - Gallery item ID
 * @param {string} imageUrl - Full image URL (to extract key for R2 deletion)
 */
export const deleteGalleryItem = async (id, imageUrl) => {
  // First delete from R2 (optional but recommended)
  try {
    // Extract key from URL (assuming public URL format: https://pub-xxx.r2.dev/gallery/filename.jpg)
    const urlParts = imageUrl.split('/');
    const key = urlParts.slice(3).join('/'); // Removes https://domain/ part
    const { deleteImage } = await import('./r2Service');
    await deleteImage(key);
  } catch (err) {
    console.warn('Failed to delete image from R2:', err);
    // Continue with DB deletion even if R2 delete fails
  }

  // Then delete from database
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id);
  if (error) throw error;
};