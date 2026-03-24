import { useState, useEffect } from 'react';
import { getAdsByPosition } from '../api/adService';
import AdRenderer from './AdRenderer';

const AdSlot = ({ position, className = '', fallback = null }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const data = await getAdsByPosition(position);
        setAds(data);
      } catch (err) {
        console.error(`Failed to fetch ads for position ${position}:`, err);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, [position]);

  if (loading) return fallback || null;
  if (ads.length === 0) return fallback || null;
  const ad = ads[0];
  return <AdRenderer ad={ad} className={className} />;
};

export default AdSlot;