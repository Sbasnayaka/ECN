import { useState, useEffect } from 'react';
import { 
  getArticles, 
  createArticle, 
  updateArticle, 
  deleteArticle, 
  getCategories, 
  getAuthors,
  approveArticle,
  requestArticleDelete 
} from '../api/articleService';
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
  const [statusFilter, setStatusFilter] = useState('all'); 
  const { profile } = useAuth();

  const isAdmin = profile?.role === 'admin';
  const isEditor = profile?.role === 'editor';

  useEffect(() => {
    fetchAllData();
  }, [statusFilter]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [articlesData, categoriesData, authorsData] = await Promise.all([
        getArticles(), // we'll filter client-side for simplicity
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

  const filteredArticles = articles.filter(article => {
    if (statusFilter === 'all') return true;
    return article.status === statusFilter;
  });

  const handleApprove = async (id) => {
    try {
      await approveArticle(id);
      fetchAllData();
    } catch (err) {
      console.error('Error approving article:', err);
      alert('Failed to approve article.');
    }
  };

  const handleRequestDelete = async (id) => {
    if (!window.confirm('Request deletion of this article? Admins will need to approve.')) return;
    try {
      await requestArticleDelete(id);
      fetchAllData();
    } catch (err) {
      console.error('Error requesting delete:', err);
      alert('Failed to request deletion.');
    }
  };

  const handleAdminDelete = async (id) => {
    if (!window.confirm('Permanently delete this article?')) return;
    try {
      await deleteArticle(id);
      fetchAllData();
    } catch (err) {
      console.error('Error deleting article:', err);
      alert('Failed to delete.');
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
        console.log('Sending to service:', formData);
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
      delete_requested: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Articles Management</h1>
        {(isAdmin || isEditor) && (
          <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Create New Article
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
            onClick={() => setStatusFilter('published')}
            className={`pb-2 px-1 ${statusFilter === 'published' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Published
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredArticles.map((article) => (
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
                    {article.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">{article.is_hot ? '🔥' : ''}</td>
                <td className="px-6 py-4">{article.is_featured ? '⭐' : ''}</td>
                <td className="px-6 py-4">
                  {article.published_at
                    ? new Date(article.published_at).toLocaleDateString()
                    : new Date(article.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  {/* Edit button for admin/editor */}
                  {(isAdmin || isEditor) && (
                    <button
                      onClick={() => handleEdit(article)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                  )}

                  {/* Admin-specific actions */}
                  {isAdmin && article.status === 'pending' && (
                    <button
                      onClick={() => handleApprove(article.id)}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      Approve
                    </button>
                  )}
                  {isAdmin && article.status === 'delete_requested' && (
                    <button
                      onClick={() => handleAdminDelete(article.id)}
                      className="text-red-600 hover:text-red-900 mr-3"
                    >
                      Approve Delete
                    </button>
                  )}
                  {isAdmin && article.status !== 'delete_requested' && (
                    <button
                      onClick={() => handleAdminDelete(article.id)}
                      className="text-red-600 hover:text-red-900 mr-3"
                    >
                      Delete
                    </button>
                  )}

                  {/* Editor-specific action */}
                  {isEditor && !isAdmin && article.status !== 'delete_requested' && (
                    <button
                      onClick={() => handleRequestDelete(article.id)}
                      className="text-orange-600 hover:text-orange-900"
                    >
                      Request Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Articles;