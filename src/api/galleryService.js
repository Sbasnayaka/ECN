import { supabase } from './supabaseClient';

/**
 * Fetch all gallery items (admin only – includes pending/delete_requested)
 */
export const getAllGalleryItems = async () => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

/**
 * Fetch only approved gallery images (public frontend)
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
 * @param {Object} item - { title, image_url, sub_images, admin_note, status }
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
 * Update a gallery item
 * @param {string} id
 * @param {Object} updates
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
 * Admin delete a gallery item (removes from DB and R2)
 * @param {string} id
 * @param {string} mainImageUrl
 * @param {Array} subImageUrls
 */
export const adminDeleteGalleryItem = async (id, mainImageUrl, subImageUrls = []) => {
  // Delete main image from R2
  if (mainImageUrl) {
    try {
      const urlParts = mainImageUrl.split('/');
      const key = urlParts.slice(3).join('/');
      const { deleteImage } = await import('./r2Service');
      await deleteImage(key);
    } catch (err) {
      console.warn('Failed to delete main image from R2:', err);
    }
  }

  // Delete sub-images from R2
  for (const url of subImageUrls) {
    try {
      const urlParts = url.split('/');
      const key = urlParts.slice(3).join('/');
      const { deleteImage } = await import('./r2Service');
      await deleteImage(key);
    } catch (err) {
      console.warn(`Failed to delete sub-image ${url}:`, err);
    }
  }

  // Delete from database
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

// Keep legacy delete for backward compatibility
export const deleteGalleryItem = async (id, imageUrl) => {
  await adminDeleteGalleryItem(id, imageUrl, []);
};