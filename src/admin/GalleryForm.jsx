import { useState, useEffect } from 'react';
import { getUploadUrl, getPublicUrl } from '../api/r2Service';

const GalleryForm = ({ item, onSubmit, onCancel, isAdmin }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    sub_images: [],
    admin_note: '',
    status: 'pending',
  });
  const [mainFile, setMainFile] = useState(null);
  const [subFiles, setSubFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previewMain, setPreviewMain] = useState('');
  const [previewSubs, setPreviewSubs] = useState([]);

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || '',
        description: item.description || '',
        image_url: item.image_url || '',
        sub_images: item.sub_images || [],
        admin_note: item.admin_note || '',
        status: item.status || 'pending',
      });
      setPreviewMain(item.image_url || '');
      setPreviewSubs(item.sub_images || []);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMainFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewMain(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setSubFiles(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewSubs(previews);
  };

  const uploadFile = async (file, folder) => {
    const key = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const uploadUrl = await getUploadUrl(key, file.type);
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type }
    });
    if (!response.ok) throw new Error(`Upload failed for ${file.name}`);
    return getPublicUrl(key);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let mainUrl = formData.image_url;
      if (mainFile) {
        mainUrl = await uploadFile(mainFile, 'gallery');
      }

      let subUrls = [...formData.sub_images];
      if (subFiles.length > 0) {
        const uploaded = await Promise.all(subFiles.map(file => uploadFile(file, 'gallery/sub')));
        subUrls = [...subUrls, ...uploaded];
      }

      const payload = {
        ...formData,
        image_url: mainUrl,
        sub_images: subUrls,
      };
      onSubmit(payload);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{item ? 'Edit Gallery Item' : 'Add New Gallery Item'}</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleMainFileChange}
          required={!item}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {previewMain && (
          <img src={previewMain} alt="Main preview" className="mt-2 max-h-32 rounded" />
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Images (optional)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleSubFilesChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {previewSubs.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {previewSubs.map((url, idx) => (
              <img key={idx} src={url} alt={`sub-${idx}`} className="h-16 w-16 object-cover rounded" />
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Describe the gallery item..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Admin Note (internal only)</label>
        <textarea
          name="admin_note"
          value={formData.admin_note}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {isAdmin && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="delete_requested">Delete Requested</option>
          </select>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={uploading}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : (item ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
};

export default GalleryForm;