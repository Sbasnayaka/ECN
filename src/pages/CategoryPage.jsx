import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticlesByCategorySlug } from '../api/articleService';
import RightSidebar from '../components/RightSidebar';
import AdSlot from '../components/AdSlot';

const CategoryPage = ({ categoryName, categorySlug }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const limit = 6;

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(1);
    setArticles([]);
    setHasMore(true);
    fetchArticles(1, true);
  }, [categorySlug]);

  const fetchArticles = async (pageNum, reset = false) => {
    setLoading(true);
    const offset = (pageNum - 1) * limit;
    try {
      const data = await getArticlesByCategorySlug(categorySlug, limit, offset);
      if (reset) {
        setArticles(data);
      } else {
        setArticles(prev => [...prev, ...data]);
      }
      setHasMore(data.length === limit);
      setPage(pageNum);
    } catch (err) {
      console.error('Failed to fetch category articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!hasMore || loading) return;
    fetchArticles(page + 1);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 border-b-4 border-ecn-navy pb-4">
          <h1 className="text-3xl md:text-4xl font-black text-ecn-dark-blue">{categoryName}</h1>
        </div>
        {/* Category-specific banner */}
        <AdSlot position={`${categorySlug}_banner`} className="mb-6" />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 flex flex-col gap-6">
            {articles.map((article) => (
              <article key={article.id} className="group flex flex-col sm:flex-row gap-4 bg-white p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-lg cursor-pointer">
                <div className="sm:w-1/3 shrink-0 overflow-hidden rounded">
                  <Link to={`/article/${article.id}`}>
                    <img src={article.image_url} alt={article.title} className="w-full h-48 sm:h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </Link>
                </div>
                <div className="sm:w-2/3 flex flex-col justify-center py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400 text-xs font-medium"> {new Date(article.published_at).toLocaleDateString()}</span>
                  </div>
                  <Link to={`/article/${article.id}`}>
                    <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-blue-600 text-ecn-dark-blue transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  <div>
                    <Link to={`/article/${article.id}`} className="inline-block bg-ecn-navy text-white text-xs font-medium px-4 py-2 hover:bg-ecn-dark-blue transition-colors rounded">
                      තව කියවන්න (Read More)
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {hasMore && (
              <div className="mt-6 mb-8 text-center bg-white p-6 border border-gray-100 shadow-sm">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className={`font-bold py-3 px-10 rounded transition-all ${loading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white border-2 border-ecn-navy text-ecn-navy hover:bg-ecn-navy hover:text-white"}`}
                >
                  {loading ? "පූරණය වෙමින් පවතී..." : "තවත් පුවත් පෙන්වන්න (Load More)"}
                </button>
              </div>
            )}
          </div>

          <div className="lg:w-1/3">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;