import { supabase } from './supabaseClient';


/**
 * Fetch all approved gallery images
 */
export const getGallery = async () => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

/**
 * Create a new gallery item
 * @param {Object} item - { title, image_url }
 * @returns {Promise<Object>}
 */
export const createGalleryItem = async (item) => {
  // New items start with status 'pending'
  const { data, error } = await supabase
    .from('gallery')
    .insert([{ ...item, status: 'pending' }])
    .select();
  if (error) throw error;
  return data[0];
};

/**
 * Update a gallery item (e.g., change title)
 * @param {string} id
 * @param {Object} updates - { title }
 * @returns {Promise<Object>}
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
 * Approve a gallery item (admin only)
 * @param {string} id
 */
export const approveGalleryItem = async (id) => {
  const { error } = await supabase
    .from('gallery')
    .update({ status: 'approved' })
    .eq('id', id);
  if (error) throw error;
};

/**
 * Request deletion of a gallery item (editor)
 * @param {string} id
 */
export const requestGalleryDelete = async (id) => {
  const { error } = await supabase
    .from('gallery')
    .update({ status: 'delete_requested' })
    .eq('id', id);
  if (error) throw error;
};

/**
 * Admin delete a gallery item (after approving delete request)
 * @param {string} id
 * @param {string} imageUrl - for R2 deletion
 */
export const adminDeleteGalleryItem = async (id, imageUrl) => {
  // Delete from R2
  try {
    const urlParts = imageUrl.split('/');
    const key = urlParts.slice(3).join('/');
    const { deleteImage } = await import('./r2Service');
    await deleteImage(key);
  } catch (err) {
    console.warn('Failed to delete image from R2:', err);
  }

  // Delete from database
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id);
  if (error) throw error;
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

