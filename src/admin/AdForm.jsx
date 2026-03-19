import { useState, useEffect } from 'react';
import { AD_POSITIONS } from '../api/adService';
import { getUploadUrl, getPublicUrl } from '../api/r2Service';

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
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState('');

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
      setPreview(ad.image_url || '');
    }
  }, [ad]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear file and preview if switching away from image type
    if (name === 'type' && value !== 'image') {
      setFile(null);
      setPreview('');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create local preview
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // For image ads, if a new file is selected, upload it first
    if (formData.type === 'image' && file) {
      try {
        setUploading(true);
        // Generate unique key: ads/timestamp-filename
        const key = `ads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const uploadUrl = await getUploadUrl(key, file.type);

        const uploadResponse = await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type }
        });

        if (!uploadResponse.ok) {
          throw new Error('Upload to R2 failed');
        }

        // Set the public URL in formData
        formData.image_url = getPublicUrl(key);
      } catch (err) {
        console.error('Upload error:', err);
        alert('Failed to upload image. Please try again.');
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    // Submit the form data (with possibly new image_url)
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to keep existing image (when editing).
            </p>
          </div>

          {preview && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
              <img src={preview} alt="Preview" className="max-h-32 rounded border" />
            </div>
          )}

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

          {/* Hidden field for image_url – it will be set after upload */}
          <input type="hidden" name="image_url" value={formData.image_url} />
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
          disabled={uploading}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : (ad ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
};

export default AdForm;