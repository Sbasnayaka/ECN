import { useState, useEffect } from 'react';
import { getAllComments, approveComment, rejectComment } from '../api/commentService';
import { useAuth } from '../context/AuthContext';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const data = await getAllComments();
      setComments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveComment(id);
      fetchComments();
    } catch (err) {
      alert('Failed to approve comment');
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await rejectComment(id);
      fetchComments();
    } catch (err) {
      alert('Failed to delete comment');
    }
  };

  if (loading) return <div>Loading comments...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Comment Moderation</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Article ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comments.map(comment => (
              <tr key={comment.id}>
                <td className="px-6 py-4 text-sm">{comment.article_id.substring(0, 8)}...</td>
                <td className="px-6 py-4">{comment.user_name}</td>
                <td className="px-6 py-4">{comment.email}</td>
                <td className="px-6 py-4 max-w-xs truncate">{comment.content}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${comment.status === 'approved' ? 'bg-green-100 text-green-800' : comment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {comment.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {comment.status === 'pending' && (
                    <button onClick={() => handleApprove(comment.id)} className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                  )}
                  <button onClick={() => handleReject(comment.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;