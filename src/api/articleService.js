import { supabase } from './supabaseClient';
import { getAccessToken } from './tokenStore';


/**
 * Fetch all articles with author and category info
 * @returns {Promise<Array>} List of articles with related data
 */
export const getArticles = async () => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories (name, slug),
      profiles (name, email)
    `)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

/**
 * Fetch a single article by ID
 * @param {string} id
 * @returns {Promise<Object>}
 
export const getArticleById = async (id) => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories (name, slug),
      profiles (name, email)
    `)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};*/

export const getArticleById = async (id) => {
  console.log('Fetching article with id:', id);
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories (name, slug),
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
 * @param {Object} article - Article data
 * @returns {Promise<Object>}
 */
export const createArticle = async (article) => {
  console.log('createArticle called with:', JSON.parse(JSON.stringify(article)));

  // Use direct fetch to bypass Supabase client's internal getSession (which hangs with persistSession:false)
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
 * @param {string} id
 * @param {Object} updates
 * @returns {Promise<Object>}
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
 * @param {string} id
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
 * Fetch all authors (profiles with role editor or admin) for dropdown
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
 * Sets status to 'published' and sets published_at if not already set
 * @param {string} id
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
 * @param {string} id
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
 * @param {string} id
 */
export const incrementViewCount = async (id) => {
  const { error } = await supabase.rpc('increment_article_view', { article_id: id });
  if (error) {
    console.error('Failed to increment view count:', error);
  }
};

/**
 * Get related articles (same category, published, exclude current, limit 6)
 * @param {string} articleId
 * @param {string} categoryId
 * @param {number} limit
 */
export const getRelatedArticles = async (articleId, categoryId, limit = 6) => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      id, title, excerpt, image_url, published_at,
      categories (name, slug),
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

// ... existing imports and functions ...

/**
 * Fetch articles by category slug
 */
export const getArticlesByCategorySlug = async (categorySlug, limit = 10, offset = 0) => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories!inner(name, slug),
      profiles(name, email)
    `)
    .eq('categories.slug', categorySlug)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return data;
};

/**
 * Get articles for the homepage sections (hot, politics, local, business, sports, foreign)
 * Returns object with arrays keyed by section name
 */
export const getHomepageSections = async () => {
  const sectionSlugs = {
    hot: null, // special handling
    politics: 'politics',
    local: 'local',
    business: 'business',
    sports: 'sports',
    foreign: 'world',
  };

  // Get category IDs for each slug
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

  // Hot news (is_hot = true, published, limit 20)
  const { data: hotData } = await supabase
    .from('articles')
    .select('*, categories(name, slug), profiles(name, email)')
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
      .select('*, categories(name, slug), profiles(name, email)')
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
      .select('*, categories(name, slug), profiles(name, email)')
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
      .select('*, categories(name, slug), profiles(name, email)')
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
      .select('*, categories(name, slug), profiles(name, email)')
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
      .select('*, categories(name, slug), profiles(name, email)')
      .eq('status', 'published')
      .eq('category_id', foreignId)
      .order('published_at', { ascending: false })
      .limit(20);
    result.foreign = foreignData || [];
  }

  return result;
};

/**
 * Get articles for sidebar sections (gossip, popular, health, beauty)
 * @returns {Promise<{gossip: array, popular: array, health: array, beauty: array}>}
 */
export const getSidebarArticles = async () => {
  // Get category IDs
  const { data: categories } = await supabase
    .from('categories')
    .select('id, slug');
  const catMap = categories.reduce((acc, cat) => {
    acc[cat.slug] = cat.id;
    return acc;
  }, {});

  const result = {
    gossip: [],
    popular: [], // we'll use top viewed articles instead of a category
    health: [],
    beauty: [],
  };

  // Gossip
  const gossipId = catMap.gossip;
  if (gossipId) {
    const { data: gossipData } = await supabase
      .from('articles')
      .select('*, categories(name, slug), profiles(name, email)')
      .eq('status', 'published')
      .eq('category_id', gossipId)
      .order('published_at', { ascending: false })
      .limit(32);
    result.gossip = gossipData || [];
  }

  // Popular articles (top viewed, published)
  const { data: popularData } = await supabase
    .from('articles')
    .select('*, categories(name, slug), profiles(name, email)')
    .eq('status', 'published')
    .order('view_count', { ascending: false })
    .limit(20);
  result.popular = popularData || [];

  // Health (suwa diviya)
  const healthId = catMap['suwa-diviya'];
  if (healthId) {
    const { data: healthData } = await supabase
      .from('articles')
      .select('*, categories(name, slug), profiles(name, email)')
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
      .select('*, categories(name, slug), profiles(name, email)')
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
      categories(name, slug),
      profiles(name, email)
    `)
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
};

/**
 * Get articles by author ID (for author page)
 * @param {string} authorId
 * @param {number} page
 * @param {number} limit
 */
export const getArticlesByAuthor = async (authorId, page = 1, limit = 6) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { data, error, count } = await supabase
    .from('articles')
    .select('*, categories(name, slug), profiles(name, email)', { count: 'exact' })
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
      categories(name, slug),
      profiles(name, email)
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
