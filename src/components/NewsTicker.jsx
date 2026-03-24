import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestArticles } from '../api/articleService';

const NewsTicker = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const data = await getLatestArticles(5);
        setArticles(data);
      } catch (err) {
        console.error('Failed to fetch ticker:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicker();
  }, []);

  if (loading || articles.length === 0) return null;

  return (
    <div className="flex items-center overflow-hidden bg-[#FFB200]">
      <div className="bg-red-700 text-white px-2 py-0.5 font-bold whitespace-nowrap z-10 flex items-center shrink-0">
        <span className="animate-pulse mr-1 h-1.5 w-1.5 bg-yellow-300 rounded-full"></span>
        <span className="text-xs">උණුසුම් <span className="hidden sm:inline">පුවත්</span></span>
      </div>
      <div className="flex-1 overflow-hidden relative flex items-center group">
        <div className="flex whitespace-nowrap items-center animate-marquee group-hover:[animation-play-state:paused] w-max">
          {articles.map((article, idx) => (
            <span key={article.id} className="flex items-center text-[#112240] font-semibold text-[11px] md:text-xs pr-8">
              <span className="mx-1 text-red-600 text-[10px]">■</span>
              <Link to={`/article/${article.id}`} className="hover:underline hover:text-red-700 transition-colors">
                {article.title}
              </Link>
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {articles.map((article, idx) => (
            <span key={`dup-${article.id}`} className="flex items-center text-[#112240] font-semibold text-[11px] md:text-xs pr-8">
              <span className="mx-1 text-red-600 text-[10px]">■</span>
              <Link to={`/article/${article.id}`} className="hover:underline hover:text-red-700 transition-colors">
                {article.title}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;