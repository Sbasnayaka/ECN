import { useState, useEffect } from 'react';
import { getHotArticles, getArticlesByCategorySlug } from '../api/articleService';
import AdSlot from './AdSlot';
import MainNewsSlider from './MainNewsSlider';
import SectionHeader from './SectionHeader';
import HorizontalNewsCard from './HorizontalNewsCard';
import VerticalNewsCard from './VerticalNewsCard';
import LoadMoreBtn from './LoadMoreBtn';
import videoLoopGif from '../assets/WEB-SIZE-VIDEO-LOOP.gif';

const NewsFeed = () => {
  // Section states
  const [hotArticles, setHotArticles] = useState([]);
  const [hotOffset, setHotOffset] = useState(0);
  const [hotHasMore, setHotHasMore] = useState(true);
  const [politicsArticles, setPoliticsArticles] = useState([]);
  const [politicsOffset, setPoliticsOffset] = useState(0);
  const [politicsHasMore, setPoliticsHasMore] = useState(true);
  const [localArticles, setLocalArticles] = useState([]);
  const [localOffset, setLocalOffset] = useState(0);
  const [localHasMore, setLocalHasMore] = useState(true);
  const [businessArticles, setBusinessArticles] = useState([]);
  const [businessOffset, setBusinessOffset] = useState(0);
  const [businessHasMore, setBusinessHasMore] = useState(true);
  const [sportsArticles, setSportsArticles] = useState([]);
  const [sportsOffset, setSportsOffset] = useState(0);
  const [sportsHasMore, setSportsHasMore] = useState(true);
  const [foreignArticles, setForeignArticles] = useState([]);
  const [foreignOffset, setForeignOffset] = useState(0);
  const [foreignHasMore, setForeignHasMore] = useState(true);

  const [loading, setLoading] = useState(true);

  // Define limits per section
  const HOT_LIMIT = 20;
  const SECTION_LIMIT = 4;

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [
          hot,
          politics,
          local,
          business,
          sports,
          foreign
        ] = await Promise.all([
          getHotArticles(HOT_LIMIT, 0),
          getArticlesByCategorySlug('politics', SECTION_LIMIT, 0),
          getArticlesByCategorySlug('local', SECTION_LIMIT, 0),
          getArticlesByCategorySlug('business', SECTION_LIMIT, 0),
          getArticlesByCategorySlug('sports', SECTION_LIMIT, 0),
          getArticlesByCategorySlug('world', SECTION_LIMIT, 0)
        ]);
        setHotArticles(hot);
        setPoliticsArticles(politics);
        setLocalArticles(local);
        setBusinessArticles(business);
        setSportsArticles(sports);
        setForeignArticles(foreign);
        setHotHasMore(hot.length === HOT_LIMIT);
        setPoliticsHasMore(politics.length === SECTION_LIMIT);
        setLocalHasMore(local.length === SECTION_LIMIT);
        setBusinessHasMore(business.length === SECTION_LIMIT);
        setSportsHasMore(sports.length === SECTION_LIMIT);
        setForeignHasMore(foreign.length === SECTION_LIMIT);
        setHotOffset(HOT_LIMIT);
        setPoliticsOffset(SECTION_LIMIT);
        setLocalOffset(SECTION_LIMIT);
        setBusinessOffset(SECTION_LIMIT);
        setSportsOffset(SECTION_LIMIT);
        setForeignOffset(SECTION_LIMIT);
      } catch (err) {
        console.error('Failed to fetch initial news:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const loadMore = async (section, offset, limit, setter, hasMoreSetter) => {
    if (!hasMoreSetter) return;
    let newData;
    try {
      if (section === 'hot') {
        newData = await getHotArticles(limit, offset);
      } else {
        newData = await getArticlesByCategorySlug(section, limit, offset);
      }
      if (newData.length > 0) {
        if (section === 'hot') setHotArticles(prev => [...prev, ...newData]);
        if (section === 'politics') setPoliticsArticles(prev => [...prev, ...newData]);
        if (section === 'local') setLocalArticles(prev => [...prev, ...newData]);
        if (section === 'business') setBusinessArticles(prev => [...prev, ...newData]);
        if (section === 'sports') setSportsArticles(prev => [...prev, ...newData]);
        if (section === 'world') setForeignArticles(prev => [...prev, ...newData]);
      }
      if (newData.length < limit) hasMoreSetter(false);
      else {
        if (section === 'hot') setHotOffset(prev => prev + limit);
        if (section === 'politics') setPoliticsOffset(prev => prev + limit);
        if (section === 'local') setLocalOffset(prev => prev + limit);
        if (section === 'business') setBusinessOffset(prev => prev + limit);
        if (section === 'sports') setSportsOffset(prev => prev + limit);
        if (section === 'world') setForeignOffset(prev => prev + limit);
      }
    } catch (err) {
      console.error(`Failed to load more ${section}:`, err);
    }
  };

  if (loading) return <div className="flex justify-center py-12">Loading news...</div>;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* 3 Small Ads (positions medium_1, medium_2, medium_3) */}
      <div className="grid grid-cols-3 gap-4">
        <AdSlot position="medium_1" className="w-full" fallback={
          <div className="w-full bg-[#e8f4f8] border border-blue-200 flex items-center justify-center shadow-sm overflow-hidden p-4 h-[100px]">
            <span className="text-gray-500 text-sm">Ad Space</span>
          </div>
        } />
        <AdSlot position="medium_2" className="w-full" fallback={
          <div className="w-full bg-[#e8f4f8] border border-blue-200 flex items-center justify-center shadow-sm overflow-hidden p-4 h-[100px]">
            <span className="text-gray-500 text-sm">Ad Space</span>
          </div>
        } />
        <AdSlot position="medium_3" className="w-full" fallback={
          <div className="w-full bg-[#e8f4f8] border border-blue-200 flex items-center justify-center shadow-sm overflow-hidden p-4 h-[100px]">
            <span className="text-gray-500 text-sm">Ad Space</span>
          </div>
        } />
      </div>

      {/* Video Loop GIF */}
      <div className="w-full relative rounded overflow-hidden shadow-sm">
        <img src={videoLoopGif} alt="News Video Loop" className="w-full h-auto block object-contain bg-gray-200" />
      </div>

      {/* Main News Slider */}
      <div>
        <SectionHeader theme="mainNews" title="ප්‍රධාන පුවත්" />
        <div className="mt-4">
          <MainNewsSlider />
        </div>
      </div>

      {/* 2 Medium Ads */}
      <div className="grid grid-cols-2 gap-4">
        <AdSlot position="medium_4" className="w-full" fallback={
          <div className="w-full bg-[#e8f4f8] border border-blue-200 flex items-center justify-center shadow-sm overflow-hidden p-4 h-[250px]">
            <span className="text-gray-500">Ad Space</span>
          </div>
        } />
        <AdSlot position="medium_5" className="w-full" fallback={
          <div className="w-full bg-[#e8f4f8] border border-blue-200 flex items-center justify-center shadow-sm overflow-hidden p-4 h-[250px]">
            <span className="text-gray-500">Ad Space</span>
          </div>
        } />
      </div>

      {/* Hot News Section */}
      <div>
        <SectionHeader theme="red" title="උණුසුම් පුවත්" />
        <div className="flex flex-col gap-4 mt-4 mb-4">
          {hotArticles.map((news) => (
            <HorizontalNewsCard key={news.id} {...news} isHotNews={true} />
          ))}
        </div>
        {hotHasMore && (
          <LoadMoreBtn
            text="Load more"
            onClick={() => loadMore('hot', hotOffset, HOT_LIMIT, null, setHotHasMore)}
          />
        )}
      </div>

      {/* 2 Medium Ads */}
      <div className="grid grid-cols-2 gap-4">
        <AdSlot position="medium_6" className="w-full" fallback={
          <div className="w-full bg-[#e8f4f8] border border-blue-200 flex items-center justify-center shadow-sm overflow-hidden p-4 h-[250px]">
            <span className="text-gray-500">Ad Space</span>
          </div>
        } />
        <AdSlot position="medium_7" className="w-full" fallback={
          <div className="w-full bg-[#e8f4f8] border border-blue-200 flex items-center justify-center shadow-sm overflow-hidden p-4 h-[250px]">
            <span className="text-gray-500">Ad Space</span>
          </div>
        } />
      </div>

      {/* Politics News */}
      <div>
        <SectionHeader theme="orange" title="දේශපාලන පුවත්" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
          {politicsArticles.map((news) => (
            <VerticalNewsCard key={news.id} {...news} />
          ))}
        </div>
        {politicsHasMore && (
          <LoadMoreBtn
            text="Load more"
            onClick={() => loadMore('politics', politicsOffset, SECTION_LIMIT, null, setPoliticsHasMore)}
          />
        )}
      </div>

      {/* Local News */}
      <div>
        <SectionHeader theme="cyan" title="දේශීය පුවත්" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
          {localArticles.map((news) => (
            <VerticalNewsCard key={news.id} {...news} />
          ))}
        </div>
        {localHasMore && (
          <LoadMoreBtn
            text="Load more"
            onClick={() => loadMore('local', localOffset, SECTION_LIMIT, null, setLocalHasMore)}
          />
        )}
      </div>

      {/* Business News */}
      <div>
        <SectionHeader theme="darkRed" title="ව්‍යාපාරික පුවත්" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
          {businessArticles.map((news) => (
            <VerticalNewsCard key={news.id} {...news} />
          ))}
        </div>
        {businessHasMore && (
          <LoadMoreBtn
            text="Load more"
            onClick={() => loadMore('business', businessOffset, SECTION_LIMIT, null, setBusinessHasMore)}
          />
        )}
      </div>

      {/* Sports News */}
      <div>
        <SectionHeader theme="green" title="ක්‍රීඩා පුවත්" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
          {sportsArticles.map((news) => (
            <VerticalNewsCard key={news.id} {...news} />
          ))}
        </div>
        {sportsHasMore && (
          <LoadMoreBtn
            text="Load more"
            onClick={() => loadMore('sports', sportsOffset, SECTION_LIMIT, null, setSportsHasMore)}
          />
        )}
      </div>

      {/* Foreign News */}
      <div>
        <SectionHeader theme="blue" title="විදෙස් පුවත්" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
          {foreignArticles.map((news) => (
            <VerticalNewsCard key={news.id} {...news} />
          ))}
        </div>
        {foreignHasMore && (
          <LoadMoreBtn
            text="Load more"
            onClick={() => loadMore('world', foreignOffset, SECTION_LIMIT, null, setForeignHasMore)}
          />
        )}
      </div>
    </div>
  );
};

export default NewsFeed;