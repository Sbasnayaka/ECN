import { supabase } from './supabaseClient';
import { getAccessToken } from './tokenStore';

/**
 * Fetch all articles with author and primary category info
 */
export const getArticles = async () => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories!articles_category_id_fkey (name, slug),
      profiles (name, email)
    `)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

/**
 * Fetch a single article by ID
 */
export const getArticleById = async (id) => {
  console.log('Fetching article with id:', id);
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories!articles_category_id_fkey (name, slug),
      profiles (name, email)
    `)
    .eq('id', id)
    .single();
  console.log('Article result:', { data, error });
  if (error) throw error;
  return data;
};

/**
 * Create a new article
 */
export const createArticle = async (article) => {
  console.log('createArticle called with:', JSON.parse(JSON.stringify(article)));

  const token = getAccessToken();
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const response = await fetch(`${supabaseUrl}/rest/v1/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${token || supabaseKey}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(article),
  });

  const data = await response.json();
  console.log('Supabase response status:', response.status, data);

  if (!response.ok) {
    console.error('Supabase insert error — message:', data.message);
    console.error('Supabase insert error — code:', data.code);
    console.error('Supabase insert error — details:', data.details);
    console.error('Supabase insert error — hint:', data.hint);
    throw new Error(data.message || 'Insert failed');
  }

  console.log('Article created successfully:', data);
  return Array.isArray(data) ? data[0] : data;
};

/**
 * Update an existing article
 */
export const updateArticle = async (id, updates) => {
  const { data, error } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

/**
 * Delete an article
 */
export const deleteArticle = async (id) => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

/**
 * Fetch all categories for dropdown
 */
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name');
  if (error) throw error;
  return data;
};

/**
 * Fetch all authors (profiles with role editor or admin)
 */
export const getAuthors = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email')
    .in('role', ['admin', 'editor']);
  if (error) throw error;
  return data;
};

/**
 * Approve an article (admin only)
 */
export const approveArticle = async (id) => {
  const { error } = await supabase
    .from('articles')
    .update({
      status: 'published',
      published_at: new Date().toISOString()
    })
    .eq('id', id);
  if (error) throw error;
};

/**
 * Request deletion of an article (editor)
 */
export const requestArticleDelete = async (id) => {
  const { error } = await supabase
    .from('articles')
    .update({ status: 'delete_requested' })
    .eq('id', id);
  if (error) throw error;
};

/**
 * Increment view count for an article
 */
export const incrementViewCount = async (id) => {
  const { error } = await supabase.rpc('increment_article_view', { article_id: id });
  if (error) {
    console.error('Failed to increment view count:', error);
  }
};

/**
 * Get related articles (same primary category, published, exclude current)
 */
export const getRelatedArticles = async (articleId, categoryId, limit = 6) => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      id, title, excerpt, image_url, published_at,
      categories!articles_category_id_fkey (name, slug),
      profiles (name)
    `)
    .eq('status', 'published')
    .eq('category_id', categoryId)
    .neq('id', articleId)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
};

/**
 * Fetch articles by category slug (using junction table)
 */
export const getArticlesByCategorySlug = async (categorySlug, limit = 10, offset = 0) => {
  const { data: cat } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();
  if (!cat) return [];

  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      profiles(name, email),
      article_categories!inner(category_id)
    `)
    .eq('article_categories.category_id', cat.id)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return data;
};

/**
 * Get articles for the homepage sections
 */
export const getHomepageSections = async () => {
  const sectionSlugs = {
    hot: null,
    politics: 'politics',
    local: 'local',
    business: 'business',
    sports: 'sports',
    foreign: 'world',
  };

  const { data: categories } = await supabase
    .from('categories')
    .select('id, slug');
  const catMap = categories.reduce((acc, cat) => {
    acc[cat.slug] = cat.id;
    return acc;
  }, {});

  const result = {
    hot: [],
    politics: [],
    local: [],
    business: [],
    sports: [],
    foreign: [],
  };

  // Hot news (is_hot = true, published)
  const { data: hotData } = await supabase
    .from('articles')
    .select('*, categories!articles_category_id_fkey(name, slug), profiles(name, email)')
    .eq('status', 'published')
    .eq('is_hot', true)
    .order('published_at', { ascending: false })
    .limit(20);
  result.hot = hotData || [];

  // Politics
  const politicsId = catMap.politics;
  if (politicsId) {
    const { data: polData } = await supabase
      .from('articles')
      .select('*, categories!articles_category_id_fkey(name, slug), profiles(name, email)')
      .eq('status', 'published')
      .eq('category_id', politicsId)
      .order('published_at', { ascending: false })
      .limit(40);
    result.politics = polData || [];
  }

  // Local
  const localId = catMap.local;
  if (localId) {
    const { data: localData } = await supabase
      .from('articles')
      .select('*, categories!articles_category_id_fkey(name, slug), profiles(name, email)')
      .eq('status', 'published')
      .eq('category_id', localId)
      .order('published_at', { ascending: false })
      .limit(20);
    result.local = localData || [];
  }

  // Business
  const businessId = catMap.business;
  if (businessId) {
    const { data: bizData } = await supabase
      .from('articles')
      .select('*, categories!articles_category_id_fkey(name, slug), profiles(name, email)')
      .eq('status', 'published')
      .eq('category_id', businessId)
      .order('published_at', { ascending: false })
      .limit(20);
    result.business = bizData || [];
  }

  // Sports
  const sportsId = catMap.sports;
  if (sportsId) {
    const { data: sportsData } = await supabase
      .from('articles')
      .select('*, categories!articles_category_id_fkey(name, slug), profiles(name, email)')
      .eq('status', 'published')
      .eq('category_id', sportsId)
      .order('published_at', { ascending: false })
      .limit(20);
    result.sports = sportsData || [];
  }

  // Foreign (world)
  const foreignId = catMap.world;
  if (foreignId) {
    const { data: foreignData } = await supabase
      .from('articles')
      .select('*, categories!articles_category_id_fkey(name, slug), profiles(name, email)')
      .eq('status', 'published')
      .eq('category_id', foreignId)
      .order('published_at', { ascending: false })
      .limit(20);
    result.foreign = foreignData || [];
  }

  return result;
};

/**
 * Get articles for sidebar sections
 */
export const getSidebarArticles = async () => {
  const { data: categories } = await supabase
    .from('categories')
    .select('id, slug');
  const catMap = categories.reduce((acc, cat) => {
    acc[cat.slug] = cat.id;
    return acc;
  }, {});

  const result = {
    gossip: [],
    popular: [],
    health: [],
    beauty: [],
  };

  // Gossip
  const gossipId = catMap.gossip;
  if (gossipId) {
    const { data: gossipData } = await supabase
      .from('articles')
      .select('*, categories!articles_category_id_fkey(name, slug), profiles(name, email)')
      .eq('status', 'published')
      .eq('category_id', gossipId)
      .order('published_at', { ascending: false })
      .limit(32);
    result.gossip = gossipData || [];
  }

  // Popular articles (top viewed)
  const { data: popularData } = await supabase
    .from('articles')
    .select('*, categories!articles_category_id_fkey(name, slug), profiles(name, email)')
    .eq('status', 'published')
    .order('view_count', { ascending: false })
    .limit(20);
  result.popular = popularData || [];

  // Health (suwa-diviya)
  const healthId = catMap['suwa-diviya'];
  if (healthId) {
    const { data: healthData } = await supabase
      .from('articles')
      .select('*, categories!articles_category_id_fkey(name, slug), profiles(name, email)')
      .eq('status', 'published')
      .eq('category_id', healthId)
      .order('published_at', { ascending: false })
      .limit(20);
    result.health = healthData || [];
  }

  // Beauty (roosar)
  const beautyId = catMap.roosar;
  if (beautyId) {
    const { data: beautyData } = await supabase
      .from('articles')
      .select('*, categories!articles_category_id_fkey(name, slug), profiles(name, email)')
      .eq('status', 'published')
      .eq('category_id', beautyId)
      .order('published_at', { ascending: false })
      .limit(20);
    result.beauty = beautyData || [];
  }

  return result;
};

/**
 * Fetch featured articles for slider
 */
export const getFeaturedArticles = async (limit = 5) => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories!articles_category_id_fkey (name, slug),
      profiles (name, email)
    `)
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
};

/**
 * Get articles by author ID
 */
export const getArticlesByAuthor = async (authorId, page = 1, limit = 6) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { data, error, count } = await supabase
    .from('articles')
    .select('*, categories!articles_category_id_fkey(name, slug), profiles(name, email)', { count: 'exact' })
    .eq('author_id', authorId)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(from, to);
  if (error) throw error;
  return { data, count };
};

/**
 * Fetch hot articles (is_hot = true)
 */
export const getHotArticles = async (limit = 20, offset = 0) => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories!articles_category_id_fkey (name, slug),
      profiles (name, email)
    `)
    .eq('status', 'published')
    .eq('is_hot', true)
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return data;
};

/**
 * Fetch latest articles for ticker
 */
export const getLatestArticles = async (limit = 5) => {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
};

// ============================================
// MULTI-CATEGORY HELPER FUNCTIONS
// ============================================

/**
 * Get all categories for an article (primary + additional)
 */
export const getArticleCategories = async (articleId) => {
  const { data, error } = await supabase
    .from('article_categories')
    .select('category_id, categories(name, slug)')
    .eq('article_id', articleId);
  if (error) throw error;
  return data.map(item => ({ id: item.category_id, name: item.categories.name, slug: item.categories.slug }));
};

/**
 * Save categories for an article (delete existing, insert new)
 */
export const setArticleCategories = async (articleId, categoryIds) => {
  const token = getAccessToken();
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  // Delete existing
  await fetch(`${supabaseUrl}/rest/v1/article_categories?article_id=eq.${articleId}`, {
    method: 'DELETE',
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${token}`,
    },
  });

  // Insert new if any
  if (categoryIds.length === 0) return;
  const inserts = categoryIds.map(catId => ({ article_id: articleId, category_id: catId }));
  const response = await fetch(`${supabaseUrl}/rest/v1/article_categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(inserts),
  });
  if (!response.ok) throw new Error('Failed to save article categories');
};