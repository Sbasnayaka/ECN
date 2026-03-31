import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { getUploadUrl, getPublicUrl } from '../api/r2Service';
import { useAuth } from '../context/AuthContext';
import { getArticleCategories, setArticleCategories } from '../api/articleService'; // added

const ArticleForm = ({ article, categories, authors, onSubmit, onCancel }) => {
  const { profile } = useAuth();
  const isEditor = profile?.role === 'editor';
  const isAdmin = profile?.role === 'admin';
  const isNewArticle = !article; // if no article passed, it's a new article

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    category_id: '',
    author_id: '',
    author_display_name: '',
    status: 'draft',
    is_hot: false,
    is_featured: false,
    published_at: null,
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (article) {
        let contentValue = article.content || '';
        if (!contentValue.includes('<') && !contentValue.includes('>')) {
          contentValue = contentValue.split('\n\n').map(para => `<p>${para.trim()}</p>`).join('');
        }
        setFormData({
          title: article.title || '',
          excerpt: article.excerpt || '',
          content: contentValue,
          image_url: article.image_url || '',
          category_id: article.category_id || '',
          author_id: article.author_id || '',
          author_display_name: article.author_display_name || '',
          status: article.status || 'draft',
          is_hot: article.is_hot || false,
          is_featured: article.is_featured || false,
          published_at: article.published_at || null,
        });
        setPreview(article.image_url || '');
        // Fetch additional categories
        const existingCats = await getArticleCategories(article.id);
        setSelectedCategories(existingCats.map(c => c.id));
      } else {
        // New article: auto-assign author from logged-in user
        setFormData(prev => ({
          ...prev,
          author_id: profile?.id || '',
        }));
        setSelectedCategories([]);
      }
    };
    fetchData();
  }, [article, profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
    console.log('Editor content updated:', content);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const uploadEditorImage = async (blobInfo) => {
    const blob = blobInfo.blob();
    const safeName = blobInfo.filename().replace(/[^a-zA-Z0-9.-]/g, '');
    const key = `articles/content/${Date.now()}-${safeName}`;
    const uploadUrl = await getUploadUrl(key, blob.type);
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: blob,
      headers: { 'Content-Type': blob.type },
    });
    if (!response.ok) throw new Error('Inline image upload failed');
    return getPublicUrl(key);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = { ...formData };
    let savedArticle;

    if (file) {
      try {
        setUploading(true);
        const key = `articles/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const uploadUrl = await getUploadUrl(key, file.type);
        const uploadResponse = await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type }
        });
        if (!uploadResponse.ok) throw new Error('Upload failed');
        submitData.image_url = getPublicUrl(key);
      } catch (err) {
        console.error('Upload error:', err);
        alert('Image upload failed. Please try again.');
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    // Editor: force pending status
    if (isEditor) {
      submitData.status = 'pending';
    }

    if (submitData.status === 'published' && !submitData.published_at) {
      submitData.published_at = new Date().toISOString();
    }

    console.log('Submitting article data:', submitData);

    try {
      if (article) {
        savedArticle = await updateArticle(article.id, submitData);
        await setArticleCategories(article.id, selectedCategories);
      } else {
        savedArticle = await createArticle(submitData);
        await setArticleCategories(savedArticle.id, selectedCategories);
      }
      onSubmit(savedArticle);
    } catch (err) {
      console.error('Error saving article:', err);
      alert('Failed to save article. Check console.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {article ? 'Edit Article' : 'Create New Article'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short summary)</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Category</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Categories</label>
            <select
              multiple
              value={selectedCategories}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                setSelectedCategories(selected);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Cmd on Mac) to select multiple categories.</p>
          </div>

          {/* Author field – hidden for new articles, visible for admin when editing */}
          {!isNewArticle && isAdmin && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <select
                name="author_id"
                value={formData.author_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select author</option>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name (optional)</label>
            <input
              type="text"
              name="author_display_name"
              value={formData.author_display_name}
              onChange={handleChange}
              placeholder="Leave blank to use author's name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {!isEditor && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="draft">Draft</option>
                <option value="pending">Pending Approval</option>
                <option value="published">Published</option>
              </select>
            </div>
          )}

          {isEditor && (
            <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded-md">
              <p className="text-sm">Your article will be submitted as <strong>pending</strong> for admin approval.</p>
            </div>
          )}

          <div className="flex gap-4 mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="is_hot"
                checked={formData.is_hot}
                onChange={handleChange}
                className="mr-2"
              />
              Hot News
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="mr-2"
              />
              Featured (Main Slider)
            </label>
          </div>
        </div>

        {/* Right Column – Image */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {preview && (
              <div className="mt-2">
                <img src={preview} alt="Preview" className="max-h-48 rounded border" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content – Full width with TinyMCE */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <Editor
          apiKey="kki12gk5xv0oz46zpx7xfnxtgj4i2mlddgzrg1ne3ulo6zrw"
          value={formData.content}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'preview', 'anchor', 'searchreplace', 'visualblocks',
              'code', 'fullscreen', 'insertdatetime', 'media', 'table',
              'wordcount'
            ],
            toolbar:
              'undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | removeformat code preview',
            automatic_uploads: true,
            images_upload_handler: uploadEditorImage,
            image_title: true,
            file_picker_types: 'image',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; line-height:1.7; } img { max-width:100%; height:auto; }',
          }}
          onEditorChange={handleEditorChange}
        />
      </div>

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
          {uploading ? 'Uploading...' : (article ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;