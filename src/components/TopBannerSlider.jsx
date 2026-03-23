import { useState, useEffect } from 'react';
import { getAds } from '../api/adService';

const TopBannerSlider = () => {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopBanners();
  }, []);

  useEffect(() => {
    if (ads.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [ads]);

  const fetchTopBanners = async () => {
    try {
      const allAds = await getAds();
      const topBanners = allAds.filter(
        (ad) => ad.position === 'top_banner' && ad.is_active === true
      );
      setAds(topBanners);
    } catch (err) {
      console.error('Failed to fetch top banners:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-gray-100 flex items-center justify-center h-32 md:h-40">
        <span className="text-gray-400">Loading banner...</span>
      </div>
    );
  }

  if (ads.length === 0) {
    // Optional: show a placeholder or nothing
    return null;
  }

  const currentAd = ads[currentIndex];
  if (!currentAd) return null;

  return (
    <div className="w-full overflow-hidden rounded shadow-sm border border-gray-100 bg-white">
      {currentAd.type === 'image' ? (
        <a href={currentAd.link_url} target="_blank" rel="noopener noreferrer">
          <img
            src={currentAd.image_url}
            alt={currentAd.name}
            className="w-full h-auto object-contain max-h-[180px] md:max-h-[220px]"
          />
        </a>
      ) : (
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: currentAd.ad_code }}
        />
      )}
      {/* Optional: pagination dots */}
      {ads.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {ads.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopBannerSlider;