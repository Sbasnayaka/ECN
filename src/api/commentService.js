import { supabase } from './supabaseClient';
import { getAccessToken } from './tokenStore';

export const getCommentsByArticle = async (articleId) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('article_id', articleId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const submitComment = async (articleId, name, email, phone, content, turnstileToken) => {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ articleId, name, email, phone, content, turnstileToken }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Failed to submit comment');
  return result;
};

export const getAllComments = async () => {
  const token = getAccessToken();
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/comments?select=*&order=created_at.desc`, {
    headers: {
      'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch comments');
  return response.json();
};

export const approveComment = async (id) => {
  const token = getAccessToken();
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/comments?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status: 'approved' }),
  });
  if (!response.ok) throw new Error('Failed to approve comment');
  return response.json();
};

export const rejectComment = async (id) => {
  const token = getAccessToken();
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/comments?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to reject comment');
  return true;
};