import { useState } from 'react';
import { getUploadUrl, getPublicUrl } from '../api/r2Service';

const GalleryForm = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    image_url: item?.image_url || '',
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(item?.image_url || '');

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

  const handleTitleChange = (e) => {
    setFormData(prev => ({ ...prev, title: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert('Please enter a title/caption');
      return;
    }

    try {
      setUploading(true);

      let imageUrl = formData.image_url;

      // If a new file is selected, upload to R2
      if (file) {
        // Generate unique key: gallery/timestamp-filename
        const key = `gallery/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const uploadUrl = await getUploadUrl(key, file.type);

        // Upload file directly to R2
        const uploadResponse = await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type }
        });

        if (!uploadResponse.ok) {
          throw new Error('Upload to R2 failed');
        }

        imageUrl = getPublicUrl(key);
      }

      // Submit to parent
      await onSubmit({
        title: formData.title,
        image_url: imageUrl,
      });

    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload image. Check console.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{item ? 'Edit Gallery Item' : 'Add New Image'}</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title / Caption</label>
        <input
          type="text"
          value={formData.title}
          onChange={handleTitleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {item ? 'Replace Image (optional)' : 'Image'}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required={!item} // required only for new items
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {preview && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
          <img src={preview} alt="Preview" className="max-h-48 rounded border" />
        </div>
      )}

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
          disabled={uploading || (!item && !file)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : (item ? 'Update' : 'Add to Gallery')}
        </button>
      </div>
    </form>
  );
};

export default GalleryForm;