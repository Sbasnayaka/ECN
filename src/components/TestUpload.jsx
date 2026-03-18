import { useState } from 'react';
import { getUploadUrl, getPublicUrl } from '../api/r2Service';

const TestUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      // Generate a unique key
      const key = `test/${Date.now()}-${file.name}`;
      const uploadUrl = await getUploadUrl(key, file.type);
      
      // Upload directly to R2 using fetch
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
      });
      
      if (response.ok) {
        const publicUrl = getPublicUrl(key);
        setUploadedUrl(publicUrl);
        alert('Upload successful!');
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Test R2 Upload</h2>
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadedUrl && (
        <div className="mt-4">
          <p>Uploaded image:</p>
          <img src={uploadedUrl} alt="Uploaded" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default TestUpload;