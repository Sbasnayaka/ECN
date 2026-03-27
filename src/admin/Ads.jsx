import { useState, useEffect } from 'react';
import { getAds, createAd, updateAd, deleteAd } from '../api/adService';
import AdForm from './AdForm';
import { useAuth } from '../context/AuthContext';

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const { profile } = useAuth();

  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const data = await getAds();
      setAds(data);
      setError('');
    } catch (err) {
      console.error('Error fetching ads:', err);
      setError('Failed to load advertisements.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingAd(null);
    setShowForm(true);
  };

  const handleEdit = (ad) => {
    setEditingAd(ad);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ad?')) return;
    try {
      await deleteAd(id);
      fetchAds();
    } catch (err) {
      console.error('Error deleting ad:', err);
      alert('Failed to delete ad.');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingAd) {
        await updateAd(editingAd.id, formData);
      } else {
        await createAd(formData);
      }
      setShowForm(false);
      fetchAds();
    } catch (err) {
      console.error('Error saving ad:', err);
      alert('Failed to save ad. Check console.');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAd(null);
  };

  if (loading) return <div className="text-center py-8">Loading advertisements...</div>;
  if (error) return <div className="text-red-600 py-8">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Advertisements </h1>
      </div>

      {showForm && (
        <div className="mb-8">
          <AdForm
            ad={editingAd}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
              {isAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ads.map((ad) => (
              <tr key={ad.id}>
                <td className="px-6 py-4 whitespace-nowrap">{ad.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ad.position.replace(/_/g, ' ')}</td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{ad.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ad.is_active ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {ad.type === 'image' && ad.image_url && (
                    <a href={ad.link_url} target="_blank" rel="noopener noreferrer">
                      <img src={ad.image_url} alt={ad.name} className="h-10 w-auto object-contain" />
                    </a>
                  )}
                  {ad.type === 'code' && (
                    <span className="text-xs text-gray-500">Code snippet</span>
                  )}
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleEdit(ad)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ad.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ads;