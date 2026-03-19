import { useState, useEffect } from 'react';
import { 
  getGallery, 
  createGalleryItem, 
  updateGalleryItem, 
  deleteGalleryItem,
  approveGalleryItem,
  requestGalleryDelete,
  adminDeleteGalleryItem 
} from '../api/galleryService';
import GalleryForm from './GalleryForm';
import { useAuth } from '../context/AuthContext';

const GalleryAdmin = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const { profile } = useAuth();

  const isAdmin = profile?.role === 'admin';
  const isEditor = profile?.role === 'editor';

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

  const filteredItems = items.filter(item => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  });

  const handleApprove = async (id) => {
    try {
      await approveGalleryItem(id);
      fetchGallery();
    } catch (err) {
      console.error('Error approving gallery item:', err);
      alert('Failed to approve.');
    }
  };

  const handleRequestDelete = async (id) => {
    if (!window.confirm('Request deletion of this image?')) return;
    try {
      await requestGalleryDelete(id);
      fetchGallery();
    } catch (err) {
      console.error('Error requesting delete:', err);
      alert('Failed to request deletion.');
    }
  };

  const handleAdminDelete = async (item) => {
    if (!window.confirm(`Permanently delete "${item.title}"?`)) return;
    try {
      await adminDeleteGalleryItem(item.id, item.image_url);
      fetchGallery();
    } catch (err) {
      console.error('Error deleting gallery item:', err);
      alert('Failed to delete.');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      delete_requested: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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
        {(isAdmin || isEditor) && (
          <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Add New Image
          </button>
        )}
      </div>

      {/* Status Filter Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button onClick={() => setStatusFilter('all')} className={`pb-2 px-1 ${statusFilter === 'all' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>All</button>
          <button onClick={() => setStatusFilter('pending')} className={`pb-2 px-1 ${statusFilter === 'pending' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500'}`}>Pending</button>
          <button onClick={() => setStatusFilter('approved')} className={`pb-2 px-1 ${statusFilter === 'approved' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}>Approved</button>
          <button onClick={() => setStatusFilter('delete_requested')} className={`pb-2 px-1 ${statusFilter === 'delete_requested' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500'}`}>Delete Requests</button>
        </nav>
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
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                  {item.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                Added: {new Date(item.created_at).toLocaleDateString()}
              </p>
              <div className="flex flex-wrap gap-2">
                {/* Edit Title (admin/editor) */}
                {(isAdmin || isEditor) && (
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit Title
                  </button>
                )}

                {/* Admin approve button */}
                {isAdmin && item.status === 'pending' && (
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Approve
                  </button>
                )}

                {/* Admin delete (for delete_requested) */}
                {isAdmin && item.status === 'delete_requested' && (
                  <button
                    onClick={() => handleAdminDelete(item)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Approve Delete
                  </button>
                )}

                {/* Admin delete (any status) – optional, but we can keep for admins */}
                {isAdmin && item.status !== 'delete_requested' && (
                  <button
                    onClick={() => handleAdminDelete(item)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                )}

                {/* Editor request delete */}
                {isEditor && !isAdmin && item.status !== 'delete_requested' && (
                  <button
                    onClick={() => handleRequestDelete(item.id)}
                    className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                  >
                    Request Delete
                  </button>
                )}
              </div>
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