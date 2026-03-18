import { useState, useEffect } from 'react';
import { AD_POSITIONS } from '../api/adService';

const AdForm = ({ ad, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    type: 'image',
    image_url: '',
    link_url: '',
    ad_code: '',
    is_active: true,
  });

  useEffect(() => {
    if (ad) {
      setFormData({
        name: ad.name || '',
        position: ad.position || '',
        type: ad.type || 'image',
        image_url: ad.image_url || '',
        link_url: ad.link_url || '',
        ad_code: ad.ad_code || '',
        is_active: ad.is_active ?? true,
      });
    }
  }, [ad]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{ad ? 'Edit Advertisement' : 'Add New Advertisement'}</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Ad Name (Internal)</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select position</option>
          {AD_POSITIONS.map(pos => (
            <option key={pos} value={pos}>{pos.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Ad Type</label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="type"
              value="image"
              checked={formData.type === 'image'}
              onChange={handleChange}
              className="mr-2"
            />
            Image Ad
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="type"
              value="code"
              checked={formData.type === 'code'}
              onChange={handleChange}
              className="mr-2"
            />
            Code Ad (HTML/JavaScript)
          </label>
        </div>
      </div>

      {formData.type === 'image' ? (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              required={formData.type === 'image'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
            <input
              type="url"
              name="link_url"
              value={formData.link_url}
              onChange={handleChange}
              required={formData.type === 'image'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://..."
            />
          </div>
        </>
      ) : (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ad Code (HTML/JavaScript)</label>
          <textarea
            name="ad_code"
            value={formData.ad_code}
            onChange={handleChange}
            required={formData.type === 'code'}
            rows="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="<script>...</script>"
          />
          <p className="text-xs text-gray-500 mt-1">
            ⚠️ Be careful: raw HTML/JS will be rendered on the site. Only enter trusted code.
          </p>
        </div>
      )}

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="mr-2"
          />
          Active (ad will be displayed)
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {ad ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default AdForm;