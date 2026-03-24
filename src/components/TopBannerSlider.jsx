import { useState, useEffect } from 'react';
import { getAdsByPosition } from '../api/adService';
import AdRenderer from './AdRenderer';

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
      const data = await getAdsByPosition('top_banner');
      setAds(data);
    } catch (err) {
      console.error('Failed to fetch top banners:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="w-full bg-gray-100 h-32 flex items-center justify-center">Loading banner...</div>;
  if (ads.length === 0) return null;

  const currentAd = ads[currentIndex];
  return (
    <div className="w-full overflow-hidden rounded shadow-sm border border-gray-100 bg-white relative">
      <AdRenderer ad={currentAd} />
      {ads.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {ads.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopBannerSlider;