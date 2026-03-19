import { useState, useEffect } from 'react';
import { getArticles, createArticle, updateArticle, deleteArticle, getCategories, getAuthors } from '../api/articleService';
//import { getArticles, deleteArticle, getCategories, getAuthors } from '../api/articleService';
import ArticleForm from './ArticleForm';
import { useAuth } from '../context/AuthContext';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const { profile } = useAuth();

  const isAdmin = profile?.role === 'admin';
  const isEditor = profile?.role === 'editor';

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [articlesData, categoriesData, authorsData] = await Promise.all([
        getArticles(),
        getCategories(),
        getAuthors(),
      ]);
      setArticles(articlesData);
      setCategories(categoriesData);
      setAuthors(authorsData);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load articles.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingArticle(null);
    setShowForm(true);
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteArticle(id);
      fetchAllData(); // refresh
    } catch (err) {
      console.error('Error deleting article:', err);
      alert('Failed to delete article.');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingArticle) {
        await updateArticle(editingArticle.id, formData);
      } else {
        await createArticle(formData);
      }
      setShowForm(false);
      fetchAllData();
    } catch (err) {
      console.error('Error saving article:', err);
      alert('Failed to save article. Check console.');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingArticle(null);
  };

  const getStatusBadge = (status) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <div className="text-center py-8">Loading articles...</div>;
  if (error) return <div className="text-red-600 py-8">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Articles Management</h1>
        {(isAdmin || isEditor) && (
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create New Article
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-8">
          <ArticleForm
            article={editingArticle}
            categories={categories}
            authors={authors}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hot</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              {(isAdmin || isEditor) && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {article.image_url && (
                      <img src={article.image_url} alt="" className="h-10 w-10 object-cover rounded" />
                    )}
                    <span className="font-medium">{article.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{article.categories?.name}</td>
                <td className="px-6 py-4">{article.profiles?.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(article.status)}`}>
                    {article.status}
                  </span>
                </td>
                <td className="px-6 py-4">{article.is_hot ? '🔥' : ''}</td>
                <td className="px-6 py-4">{article.is_featured ? '⭐' : ''}</td>
                <td className="px-6 py-4">
                  {article.published_at
                    ? new Date(article.published_at).toLocaleDateString()
                    : new Date(article.created_at).toLocaleDateString()}
                </td>
                {(isAdmin || isEditor) && (
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEdit(article)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    )}
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

export default Articles;