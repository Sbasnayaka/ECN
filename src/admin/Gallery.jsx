import { useState, useEffect } from 'react';
import { getGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../api/galleryService';
import GalleryForm from './GalleryForm';
import { useAuth } from '../context/AuthContext';

const GalleryAdmin = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { profile } = useAuth();

  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await getGallery();
      setItems(data);
      setError('');
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError('Failed to load gallery images.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await deleteGalleryItem(item.id, item.image_url);
      fetchGallery(); // refresh
    } catch (err) {
      console.error('Error deleting gallery item:', err);
      alert('Failed to delete. Check console.');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateGalleryItem(editingItem.id, { title: formData.title });
        // Note: image_url cannot be updated separately (would need new upload)
        // For simplicity, we don't allow image replacement in edit. Could extend later.
      } else {
        await createGalleryItem(formData);
      }
      setShowForm(false);
      fetchGallery();
    } catch (err) {
      console.error('Error saving gallery item:', err);
      alert('Failed to save. Check console.');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  if (loading) return <div className="text-center py-8">Loading gallery...</div>;
  if (error) return <div className="text-red-600 py-8">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
        {isAdmin && (
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add New Image
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-8">
          <GalleryForm
            item={editingItem}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-3">
                Added: {new Date(item.created_at).toLocaleDateString()}
              </p>
              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit Title
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-center py-8 text-gray-500">No images in gallery yet.</p>
      )}
    </div>
  );
};

export default GalleryAdmin;