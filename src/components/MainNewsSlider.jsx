import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHotArticles } from '../api/articleService'; // ✅ Changed import

const MainNewsSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        // Fetch top 5 hot articles (limit=5, offset=0)
        const data = await getHotArticles(5, 0);
        setSlides(data);
      } catch (err) {
        console.error('Failed to fetch hot articles for slider:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  if (loading) return <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">Loading...</div>;
  if (slides.length === 0) return null;

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60);
    if (diff < 60) return `මිනිත්තු ${diff}කට පෙර`;
    if (diff < 1440) return `පැය ${Math.floor(diff / 60)}කට පෙර`;
    return `දින ${Math.floor(diff / 1440)}කට පෙර`;
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden group">
      <div className="flex h-full transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <Link to={`/article/${slide.id}`} className="block w-full h-full">
              <img
                src={slide.image_url || 'https://via.placeholder.com/800x500/0a192f/ffffff?text=No+Image'}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
                <span className="bg-red-600 text-white text-[11px] sm:text-xs font-bold px-3 py-1 uppercase rounded mb-3 inline-block">
                  {slide.categories?.name}
                </span>
                <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold font-harsha-kotu leading-snug lg:leading-tight hover:text-blue-300 transition-colors drop-shadow-md">
                  {slide.title}
                </h2>
                <span className="text-gray-300 text-xs sm:text-sm mt-2 block opacity-80">
                  {formatTimeAgo(slide.published_at)}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentIndex === index ? "bg-[#FFB200]" : "bg-[#000080]/70 hover:bg-[#000080]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainNewsSlider;