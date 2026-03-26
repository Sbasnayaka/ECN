import { useState, useEffect } from 'react';
import { 
  getAllGalleryItems,
  createGalleryItem,
  updateGalleryItem,
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
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'approved', 'delete_requested'
  const { profile } = useAuth();

  const isAdmin = profile?.role === 'admin';
  const isEditor = profile?.role === 'editor';

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await getAllGalleryItems();
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
      await adminDeleteGalleryItem(item.id, item.image_url, item.sub_images || []);
      fetchGallery();
    } catch (err) {
      console.error('Error deleting gallery item:', err);
      alert('Failed to delete.');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Determine status based on role
      const status = isAdmin ? (formData.status || 'approved') : 'pending';
      const payload = { ...formData, status };

      if (editingItem) {
        await updateGalleryItem(editingItem.id, payload);
      } else {
        await createGalleryItem(payload);
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

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      delete_requested: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Filter items based on selected status
  const filteredItems = items.filter(item => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  });

  if (loading) return <div className="text-center py-8">Loading gallery...</div>;
  if (error) return <div className="text-red-600 py-8">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
        {(isAdmin || isEditor) && (
          <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Add New Gallery Item
          </button>
        )}
      </div>

      {/* Status Filter Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setStatusFilter('all')}
            className={`pb-2 px-1 ${statusFilter === 'all' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`pb-2 px-1 ${statusFilter === 'pending' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('approved')}
            className={`pb-2 px-1 ${statusFilter === 'approved' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Approved
          </button>
          <button
            onClick={() => setStatusFilter('delete_requested')}
            className={`pb-2 px-1 ${statusFilter === 'delete_requested' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Delete Requests
          </button>
        </nav>
      </div>

      {showForm && (
        <div className="mb-8">
          <GalleryForm
            item={editingItem}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            isAdmin={isAdmin}
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
              {item.sub_images && item.sub_images.length > 0 && (
                <div className="flex gap-1 mb-2 flex-wrap">
                  {item.sub_images.slice(0, 3).map((url, idx) => (
                    <img key={idx} src={url} alt="" className="w-12 h-12 object-cover rounded" />
                  ))}
                  {item.sub_images.length > 3 && <span className="text-xs">+{item.sub_images.length-3}</span>}
                </div>
              )}
              {item.admin_note && (
                <p className="text-xs text-gray-500 italic mt-1">{item.admin_note}</p>
              )}
              <p className="text-sm text-gray-500 mb-3">
                Added: {new Date(item.created_at).toLocaleDateString()}
              </p>
              <div className="flex flex-wrap gap-2">
                {(isAdmin || isEditor) && (
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                )}

                {isAdmin && item.status === 'pending' && (
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Approve
                  </button>
                )}

                {isAdmin && item.status === 'delete_requested' && (
                  <button
                    onClick={() => handleAdminDelete(item)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Approve Delete
                  </button>
                )}

                {isAdmin && item.status !== 'delete_requested' && (
                  <button
                    onClick={() => handleAdminDelete(item)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                )}

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

      {filteredItems.length === 0 && (
        <p className="text-center py-8 text-gray-500">No gallery items in this status.</p>
      )}
    </div>
  );
};

export default GalleryAdmin;