import { useState, useEffect } from 'react';
import { getArticlesByCategorySlug } from '../api/articleService';
import SectionHeader from './SectionHeader';
import VerticalNewsCard from './VerticalNewsCard';
import LoadMoreBtn from './LoadMoreBtn';
import AdSlot from './AdSlot';
import ytIcon from '../assets/icons/youtube.png';
import { getSettings } from '../api/settingsService';

const RightSidebar = () => {
  const [gossipArticles, setGossipArticles] = useState([]);
  const [gossipOffset, setGossipOffset] = useState(0);
  const [gossipHasMore, setGossipHasMore] = useState(true);
  const [popularArticles, setPopularArticles] = useState([]);
  const [popularOffset, setPopularOffset] = useState(0);
  const [popularHasMore, setPopularHasMore] = useState(true);
  const [suwaArticles, setSuwaArticles] = useState([]);
  const [suwaOffset, setSuwaOffset] = useState(0);
  const [suwaHasMore, setSuwaHasMore] = useState(true);
  const [roosarArticles, setRoosarArticles] = useState([]);
  const [roosarOffset, setRoosarOffset] = useState(0);
  const [roosarHasMore, setRoosarHasMore] = useState(true);
  const [youtubeEnabled, setYoutubeEnabled] = useState(true);
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState('');

  const SECTION_LIMIT = 8;

  useEffect(() => {
    console.log('YouTube settings fetch effect started');
  const fetchYouTubeSettings = async () => {
    console.log('Fetching YouTube settings...');
    try {
      const settings = await getSettings(['youtube_widget_enabled', 'youtube_embed_url']);
      console.log('YouTube settings fetched:', settings);
      setYoutubeEnabled(settings.youtube_widget_enabled === 'true');
      setYoutubeEmbedUrl(settings.youtube_embed_url || '');
    } catch (err) {
      console.error('Failed to fetch YouTube settings:', err);
    }
  };
  fetchYouTubeSettings();
}, []);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const [gossip, popular, suwa, roosar] = await Promise.all([
          getArticlesByCategorySlug('gossip', SECTION_LIMIT, 0),
          getArticlesByCategorySlug('popular', SECTION_LIMIT, 0),
          getArticlesByCategorySlug('suwa-diviya', SECTION_LIMIT, 0),
          getArticlesByCategorySlug('roosar', SECTION_LIMIT, 0)
        ]);
        setGossipArticles(gossip);
        setPopularArticles(popular);
        setSuwaArticles(suwa);
        setRoosarArticles(roosar);
        setGossipHasMore(gossip.length === SECTION_LIMIT);
        setPopularHasMore(popular.length === SECTION_LIMIT);
        setSuwaHasMore(suwa.length === SECTION_LIMIT);
        setRoosarHasMore(roosar.length === SECTION_LIMIT);
        setGossipOffset(SECTION_LIMIT);
        setPopularOffset(SECTION_LIMIT);
        setSuwaOffset(SECTION_LIMIT);
        setRoosarOffset(SECTION_LIMIT);
      } catch (err) {
        console.error('Failed to fetch sidebar data:', err);
      }
    };
    fetchInitial();
  }, []);

  const loadMore = async (section, offset, setter, hasMoreSetter) => {
    let newData;
    try {
      newData = await getArticlesByCategorySlug(section, SECTION_LIMIT, offset);
      if (newData.length > 0) {
        if (section === 'gossip') setGossipArticles(prev => [...prev, ...newData]);
        if (section === 'popular') setPopularArticles(prev => [...prev, ...newData]);
        if (section === 'suwa-diviya') setSuwaArticles(prev => [...prev, ...newData]);
        if (section === 'roosar') setRoosarArticles(prev => [...prev, ...newData]);
      }
      if (newData.length < SECTION_LIMIT) hasMoreSetter(false);
      else {
        if (section === 'gossip') setGossipOffset(prev => prev + SECTION_LIMIT);
        if (section === 'popular') setPopularOffset(prev => prev + SECTION_LIMIT);
        if (section === 'suwa-diviya') setSuwaOffset(prev => prev + SECTION_LIMIT);
        if (section === 'roosar') setRoosarOffset(prev => prev + SECTION_LIMIT);
      }
    } catch (err) {
      console.error(`Failed to load more ${section}:`, err);
    }
  };
console.log('Rendering RightSidebar, youtubeEnabled:', youtubeEnabled);
  return (
    <aside className="w-full flex flex-col gap-8">
      {/* YouTube Section */}
      {youtubeEnabled && (
        <div className="bg-[#000000] border border-blue-200 p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-16 h-16 mb-3 opacity-90">
            <img src={ytIcon} alt="YouTube" className="w-full h-full object-contain filter drop-shadow-md" />
          </div>
          <h3 className="text-lg font-bold text-ecn-white mb-2">අපගේ නිල යූටියුබ් නාලිකාව සමග එක්වන්න</h3>
          <p className="text-sm text-gray-600 mb-4 font-noto"></p>
          {youtubeEmbedUrl ? (
            <div className="w-full">
              <iframe
                src={youtubeEmbedUrl}
                title="YouTube Video"
                className="w-full h-48 rounded"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <a
              href="#"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors shadow"
            >
              Subscribe Now
            </a>
          )}
        </div>
      )}

      {/* Gossip */}
      <div className="flex flex-col bg-white border border-gray-100 shadow-sm">
        <SectionHeader title="ගොසිප්" theme="goldenAmber" />
        <div className="flex flex-col gap-4 p-4">
          {gossipArticles.map((article) => (
            <VerticalNewsCard key={article.id} {...article} />
          ))}
        </div>
        {gossipHasMore && (
          <LoadMoreBtn onClick={() => loadMore('gossip', gossipOffset, setGossipHasMore)} text="Load more" />
        )}
      </div>

      {/* Sidebar Top Ad */}
      <AdSlot position="sidebar_top" className="w-full" fallback={
        <div className="w-full bg-[#e8f4f8] border border-blue-200 flex items-center justify-center shadow-sm overflow-hidden p-4 h-[250px]">
          <span className="text-gray-500">Ad Space</span>
        </div>
      } />

      {/* Popular News (custom layout) */}
      <div className="flex flex-col bg-white border border-gray-100 shadow-sm">
        <SectionHeader title="ජනප්‍රිය පුවත්" theme="violet" />
        <div className="flex flex-col">
          {popularArticles.map((article) => (
            <div key={article.id} className="group cursor-pointer flex flex-row gap-3 px-3 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 w-32 h-28 overflow-hidden">
                <img src={article.image_url} alt={article.title} className="w-full h-full object-cover bg-gray-200 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <h3 className="font-raum font-bold text-lg md:text-xl leading-snug text-ecn-black group-hover:text-blue-700 transition-colors line-clamp-3">
                  {article.title}
                </h3>
                <span className="text-xs font-bold text-gray-500 block">
                  {new Date(article.published_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        {popularHasMore && (
          <LoadMoreBtn onClick={() => loadMore('popular', popularOffset, setPopularHasMore)} text="Load more" />
        )}
      </div>

      {/* Suwa Diviya */}
      <div className="flex flex-col bg-white border border-gray-100 shadow-sm">
        <SectionHeader title="සුව දිවිය" theme="lightGreen" />
        <div className="flex flex-col gap-4 p-4">
          {suwaArticles.map((article) => (
            <VerticalNewsCard key={article.id} {...article} />
          ))}
        </div>
        {suwaHasMore && (
          <LoadMoreBtn onClick={() => loadMore('suwa-diviya', suwaOffset, setSuwaHasMore)} text="Load more" />
        )}
      </div>

      {/* Sidebar Middle Ad */}
      <AdSlot position="sidebar_middle" className="w-full" fallback={
        <div className="w-full bg-[#e8f4f8] border border-blue-200 flex items-center justify-center shadow-sm overflow-hidden p-4 h-[250px]">
          <span className="text-gray-500">Ad Space</span>
        </div>
      } />

      {/* Roosar */}
      <div className="flex flex-col bg-white border border-gray-100 shadow-sm">
        <SectionHeader title="රූසර" theme="brownGold" />
        <div className="flex flex-col gap-4 p-4">
          {roosarArticles.map((article) => (
            <VerticalNewsCard key={article.id} {...article} />
          ))}
        </div>
        {roosarHasMore && (
          <LoadMoreBtn onClick={() => loadMore('roosar', roosarOffset, setRoosarHasMore)} text="Load more" />
        )}
      </div>

      {/* Sidebar Bottom Ad */}
      <AdSlot position="sidebar_bottom" className="w-full" fallback={
        <div className="w-full bg-[#e8f4f8] border border-blue-200 flex items-center justify-center shadow-sm overflow-hidden p-4 h-[250px]">
          <span className="text-gray-500">Ad Space</span>
        </div>
      } />
    </aside>
  );
};

export default RightSidebar;