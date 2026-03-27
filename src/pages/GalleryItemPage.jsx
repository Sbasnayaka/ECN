import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { getGalleryItemById, incrementGalleryViewCount, getRelatedGalleryItems } from '../api/galleryService';
import { getAdsByPosition } from '../api/adService'; // changed import
import RightSidebar from '../components/RightSidebar';
import adBannerImg from "../assets/Top Advertisement  Banner.webp";
import bottomBannerImg from "../assets/single page advertisement bottom banner.jpg";

const GalleryItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topAds, setTopAds] = useState([]);
  const [bottomAd, setBottomAd] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGalleryItemById(id);
        if (!data) throw new Error('Gallery item not found');
        setItem(data);

        // Increment view count
        await incrementGalleryViewCount(id);

        // Fetch related gallery items (other approved items)
        const related = await getRelatedGalleryItems(id);
        setRelatedItems(related);

        // Fetch the three header bottom ads (exactly as on the homepage)
        const positions = ['header_bottom_1', 'header_bottom_2', 'header_bottom_3'];
        const fetchedAds = [];
        for (const pos of positions) {
          const ads = await getAdsByPosition(pos);
          fetchedAds.push(ads[0] || null);
        }
        setTopAds(fetchedAds.filter(ad => ad !== null));

        // Fetch bottom banner
        const bottomAds = await getAdsByPosition('bottom_banner');
        setBottomAd(bottomAds[0] || null);
      } catch (err) {
        console.error('Failed to load gallery item:', err);
        setError('Gallery item not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const formatPublishedDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'ප.ව.' : 'පෙ.ව.';
    hours = hours % 12 || 12;
    const time = `${hours}:${minutes} ${ampm}`;
    return `${year}-${month}-${day} | ${time}`;
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="animate-pulse">Loading gallery item...</div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center text-red-600">
        {error || 'Gallery item not found'}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 py-8">


        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Main Content */}
          <div className="lg:w-2/3 flex flex-col gap-6">
          {/* Top Advertisement Banners */}
        <div className="w-full grid grid-cols-3 gap-1 sm:gap-3 mb-4">
          {topAds.length > 0 ? (
            topAds.map((ad, idx) => (
              <div key={ad.id}>
                {ad.type === 'image' && (
                  <a href={ad.link_url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={ad.image_url}
                      alt={ad.name}
                      className="w-full h-auto object-contain shadow-sm rounded-sm"
                    />
                  </a>
                )}
                {ad.type === 'code' && (
                  <div dangerouslySetInnerHTML={{ __html: ad.ad_code }} />
                )}
              </div>
            ))
          ) : (
            // Fallback static images (same as homepage)
            <>
              <img src={adBannerImg} alt="Advertisement" className="w-full h-auto object-contain shadow-sm rounded-sm" />
              <img src={adBannerImg} alt="Advertisement" className="w-full h-auto object-contain shadow-sm rounded-sm" />
              <img src={adBannerImg} alt="Advertisement" className="w-full h-auto object-contain shadow-sm rounded-sm" />
            </>
          )}
        </div>
            <div className="bg-white p-5 md:p-8 shadow-sm border border-gray-100 rounded-lg">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4 font-medium">
            <Link to="/" className="hover:text-ecn-navy transition-colors">මුල් පිටුව</Link>
            <span>/</span>
            <Link to="/gallery" className="hover:text-ecn-navy transition-colors">ගැලරිය</Link>
            <span>/</span>
            <span className="text-gray-400">{item.title}</span>
            </div>
              {/* Gallery Header */}
              <header className="mb-6">
                <span className="bg-purple-600 text-white text-[11px] px-2 py-1 font-bold inline-block mb-3 rounded-sm uppercase tracking-wide">
                  ගැලරිය
                </span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-ecn-dark-blue leading-snug mb-4">
                  {item.title}
                </h1>

                {/* Author, Date, Views, Social Icons */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-4 text-sm text-gray-500 border-t border-b border-gray-100 py-3 mt-4">
                  <div className="flex flex-wrap items-center gap-4">
                    {/*<span className="font-bold text-ecn-navy flex items-center gap-1">
                        ගැලරි අංශය
                      <span className="hover:text-blue-600 transition-colors">
                        ᝰ.ᐟ
                      </span>
                    </span>*/}
                    <span className="flex items-center gap-1 font-bold">
                       {formatPublishedDate(item.created_at)}
                    </span>
                    <span className="flex items-center gap-1 font-bold">
                       👁 {item.view_count || 2} 
                    </span>
                  </div>
                  <div className="flex gap-2">
                    
                    <button className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                      f
                    </button>
                    <button className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 transition">
                      w
                    </button>
                    <button className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                      x
                    </button>
                  </div>
                </div>
              </header>

              {/* Main Image */}
              <div className="w-full mb-8 rounded overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Description */}
              {item.description && (
                <div className="mb-8 text-gray-700 leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }} />
                </div>
              )}

              {/* Sub-images */}
              {item.sub_images && item.sub_images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {item.sub_images.map((url, idx) => (
                    <div key={idx} className="overflow-hidden rounded shadow-sm hover:shadow-md transition-shadow">
                      <img src={url} alt={`Sub image ${idx+1}`} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              )}

              {/* Reaction Widget (optional) */}
              <div className="mt-10 mb-6 flex flex-col items-center border border-gray-100 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-ecn-dark-blue mb-4">
                  ප්‍රතිචාර දක්වන්න! (React)
                </h3>
                <div className="flex gap-4 sm:gap-6 text-3xl sm:text-4xl cursor-pointer">
                  <span className="hover:scale-125 transition-transform" title="Like">👍</span>
                  <span className="hover:scale-125 transition-transform" title="Haha">😂</span>
                  <span className="hover:scale-125 transition-transform" title="Wow">😮</span>
                  <span className="hover:scale-125 transition-transform" title="Sad">😢</span>
                  <span className="hover:scale-125 transition-transform" title="Angry">😡</span>
                </div>
              </div>

              {/* Footer Social Share */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-bold text-gray-600 text-sm">
                  මෙම ඡායාරූප එකතුව බෙදාගන්න (Share):
                </span>
                <div className="flex gap-3 text-sm">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium">
                    Facebook
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition font-medium">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Advertisement Banner */}
            <div className="w-full mt-4 mb-2 overflow-hidden">
              {bottomAd ? (
                bottomAd.type === 'image' ? (
                  <a href={bottomAd.link_url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={bottomAd.image_url}
                      alt={bottomAd.name}
                      className="w-full max-h-28 object-cover"
                    />
                  </a>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: bottomAd.ad_code }} />
                )
              ) : (
                <img
                  src={bottomBannerImg}
                  alt="Advertisement"
                  className="w-full max-h-28 object-cover"
                />
              )}
            </div>

            {/* Related Gallery Items */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-ecn-navy rounded-full shrink-0" />
                <h3 className="text-2xl md:text-3xl font-black text-ecn-dark-blue font-raum">
                  සම්බන්ධිත ගැලරි
                </h3>
              </div>
              {relatedItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedItems.map((related) => (
                    <div
                      key={related.id}
                      className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                    >
                      <div className="overflow-hidden">
                        <Link to={`/gallery/${related.id}`}>
                          <img
                            src={related.image_url}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                            alt={related.title}
                          />
                        </Link>
                      </div>
                      <div className="p-4">
                        <span className="inline-block bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide mb-2">
                          ගැලරිය
                        </span>
                        <Link to={`/gallery/${related.id}`}>
                          <h4 className="font-raum font-bold text-base md:text-lg leading-snug group-hover:text-blue-700 transition-colors text-ecn-dark-blue line-clamp-2 mb-2">
                            {related.title}
                          </h4>
                        </Link>
                        <span className="text-xs font-bold text-gray-400 block">
                          🕒 {formatPublishedDate(related.created_at)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No related gallery items found.</p>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/3">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryItemPage;