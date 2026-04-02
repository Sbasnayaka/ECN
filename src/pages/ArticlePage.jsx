import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from 'dompurify';
import RightSidebar from "../components/RightSidebar";
import { getArticleById, incrementViewCount, getRelatedArticles, getArticleCategories } from "../api/articleService"; // added getArticleCategories
import { getAdsByPosition } from "../api/adService";
import adBannerImg from "../assets/Top Advertisement  Banner.webp";
import bottomBannerImg from "../assets/single page advertisement bottom banner.jpg";
import Turnstile from 'react-turnstile';
import { getCommentsByArticle, submitComment } from '../api/commentService';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [articleCategories, setArticleCategories] = useState([]); // new
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [topAds, setTopAds] = useState([]);
  const [bottomAd, setBottomAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', phone: '', content: '' });
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentMessage, setCommentMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getArticleById(id);
      if (!data) throw new Error("Article not found");
      setArticle(data);

      // Fetch additional categories for this article
      const categories = await getArticleCategories(id);
      setArticleCategories(categories);

      await incrementViewCount(id);

      const related = await getRelatedArticles(id, data.category_id);
      setRelatedArticles(related);

      const commentsData = await getCommentsByArticle(id);
      setComments(commentsData);

      const positions = ['header_bottom_1', 'header_bottom_2', 'header_bottom_3'];
      const fetchedAds = [];
      for (const pos of positions) {
        const ads = await getAdsByPosition(pos);
        fetchedAds.push(ads[0] || null);
      }
      setTopAds(fetchedAds.filter(ad => ad !== null));

      const bottomAds = await getAdsByPosition('bottom_banner');
      setBottomAd(bottomAds[0] || null);
    } catch (err) {
      console.error("Failed to load article:", err);
      setError("Article not found or failed to load.");
    } finally {
      setLoading(false);
    }
  };

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
        <div className="animate-pulse">Loading article...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center text-red-600">
        {error || "Article not found"}
      </div>
    );
  }

  const handleCommentChange = (e) => {
    setCommentForm({ ...commentForm, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!turnstileToken) {
      setCommentMessage('Please complete the verification.');
      return;
    }
    setCommentSubmitting(true);
    try {
      await submitComment(id, commentForm.name, commentForm.email, commentForm.phone, commentForm.content, turnstileToken);
      setCommentMessage('Comment submitted for approval.');
      setCommentForm({ name: '', email: '', phone: '', content: '' });
      setTurnstileToken(null);
      setTimeout(async () => {
        const updated = await getCommentsByArticle(id);
        setComments(updated);
      }, 3000);
    } catch (err) {
      setCommentMessage(err.message);
    } finally {
      setCommentSubmitting(false);
    }
  };

  // Combine primary category and additional categories for display
  const allCategories = article.categories ? [{ id: article.category_id, name: article.categories.name, slug: article.categories.slug }, ...articleCategories] : [...articleCategories];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 flex flex-col gap-6">
            {/* Top Advertisement Banners */}
            <div className="w-full grid grid-cols-3 gap-1 sm:gap-3 mb-4">
              {topAds.length > 0 ? (
                topAds.map((ad, idx) => (
                  <div key={ad.id}>
                    {ad.type === 'image' && (
                      <a href={ad.link_url} target="_blank" rel="noopener noreferrer">
                        <img src={ad.image_url} alt={ad.name} className="w-full h-auto object-contain shadow-sm rounded-sm" />
                      </a>
                    )}
                    {ad.type === 'code' && (
                      <div dangerouslySetInnerHTML={{ __html: ad.ad_code }} />
                    )}
                  </div>
                ))
              ) : (
                <>
                  <img src={adBannerImg} alt="Advertisement" className="w-full h-auto object-contain shadow-sm rounded-sm" />
                  <img src={adBannerImg} alt="Advertisement" className="w-full h-auto object-contain shadow-sm rounded-sm" />
                  <img src={adBannerImg} alt="Advertisement" className="w-full h-auto object-contain shadow-sm rounded-sm" />
                </>
              )}
            </div>

            {/* Main Article Card */}
            <div className="bg-white p-5 md:p-8 shadow-sm border border-gray-100 rounded-lg">
              {/* Breadcrumb Navigation */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4 font-medium">
                <Link to="/" className="hover:text-ecn-navy transition-colors">මුල් පිටුව</Link>
                <span>/</span>
                <Link to={`/${article.categories?.slug || ''}`} className="hover:text-ecn-navy transition-colors">
                  {article.categories?.name || "පුවත්"}
                </Link>
                <span>/</span>
                <span className="text-gray-400">පුවත</span>
              </div>

              {/* Article Header */}
              <header className="mb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {allCategories.map(cat => (
                    <span key={cat.id} className="bg-blue-600 text-white text-[11px] px-2 py-1 font-bold rounded-sm uppercase tracking-wide">
                      {cat.name}
                    </span>
                  ))}
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-ecn-dark-blue leading-snug mb-4">
                  {article.title}
                </h1>

                {/* Author, Date, Views, Social Icons */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-4 text-sm text-gray-500 border-t border-b border-gray-100 py-3 mt-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-bold text-ecn-navy flex items-center gap-1">
                      <Link to={`/author/${article.author_id}`} className="hover:text-blue-600 transition-colors">
                        {article?.author_display_name || "ප්‍රවෘත්ති අංශය"}
                      </Link>
                    </span>
                    <span className="flex items-center gap-1 font-bold">
                       {formatPublishedDate(article.published_at || article.created_at)}
                    </span>
                    <span className="flex items-center gap-1 font-bold">
                      👁 {article.view_count || 0} views
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-700 transition">f</button>
                    <button className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 transition">w</button>
                    <button className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-800 transition">x</button>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              {article.image_url && (
                <div className="w-full mb-8 rounded overflow-hidden">
                  <img src={article.image_url} alt={article.title} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              )}

              {/* Article Body Content */}
              <div className="max-w-none text-gray-800">
                {(() => {
                  const content = article.content;
                  const isHtml = /<[a-z][\s\S]*>/i.test(content);
                  if (isHtml) {
                    const sanitizedHtml = DOMPurify.sanitize(content, {
                      ADD_TAGS: ['iframe', 'video', 'source'],
                      ADD_ATTR: [
                        'allow', 'allowfullscreen', 'frameborder', 'scrolling',
                        'src', 'title', 'width', 'height',
                        'controls', 'controlslist', 'poster', 'playsinline', 'preload',
                      ],
                    });
                    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
                  } else {
                    return content.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-5 text-[16px] leading-[1.8] text-left font-normal text-gray-700">
                        {paragraph.trim()}
                      </p>
                    ));
                  }
                })()}
              </div>

              {/* Reaction Widget */}
              <div className="mt-10 mb-6 flex flex-col items-center border border-gray-100 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-ecn-dark-blue mb-4">ප්‍රතිචාර දක්වන්න! (React)</h3>
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
                <span className="font-bold text-gray-600 text-sm">මෙම පුවත බෙදාගන්න (Share):</span>
                <div className="flex gap-3 text-sm">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium">Facebook</button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition font-medium">WhatsApp</button>
                </div>
              </div>
            </div>

            {/* Bottom Advertisement Banner */}
            <div className="w-full mt-4 mb-2 overflow-hidden">
              {bottomAd ? (
                bottomAd.type === 'image' ? (
                  <a href={bottomAd.link_url} target="_blank" rel="noopener noreferrer">
                    <img src={bottomAd.image_url} alt={bottomAd.name} className="w-full max-h-28 object-cover" />
                  </a>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: bottomAd.ad_code }} />
                )
              ) : (
                <img src={bottomBannerImg} alt="Advertisement" className="w-full max-h-28 object-cover" />
              )}
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-ecn-navy rounded-full shrink-0" />
                <h3 className="text-2xl md:text-3xl font-black text-ecn-dark-blue font-raum">අදහස් ({comments.length})</h3>
              </div>

              {comments.length > 0 ? (
                <div className="space-y-6">
                  {comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-bold">{comment.user_name}</div>
                      <div className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleString()}</div>
                      <div className="mt-2">{comment.content}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              )}

              <form onSubmit={handleCommentSubmit} className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
                <h4 className="text-xl font-bold mb-4">Leave a Comment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input type="text" name="name" placeholder="Your Name *" required value={commentForm.name} onChange={handleCommentChange} className="border rounded p-2" />
                  <input type="email" name="email" placeholder="Your Email *" required value={commentForm.email} onChange={handleCommentChange} className="border rounded p-2" />
                  <input type="tel" name="phone" placeholder="Phone (optional)" value={commentForm.phone} onChange={handleCommentChange} className="border rounded p-2" />
                  <div className="md:col-span-2">
                    <textarea name="content" placeholder="Your Comment *" required rows="4" value={commentForm.content} onChange={handleCommentChange} className="border rounded p-2 w-full"></textarea>
                  </div>
                </div>
                <Turnstile
                  sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                  onVerify={setTurnstileToken}
                />
                <button type="submit" disabled={commentSubmitting} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                  {commentSubmitting ? 'Submitting...' : 'Submit Comment'}
                </button>
                {commentMessage && <p className="mt-2 text-sm text-red-600">{commentMessage}</p>}
              </form>
            </div>

            {/* Related News Section */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-ecn-navy rounded-full shrink-0" />
                <h3 className="text-2xl md:text-3xl font-black text-ecn-dark-blue font-raum">සම්බන්ධිත පුවත්</h3>
              </div>
              {relatedArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedArticles.map((related) => (
                    <div
                      key={related.id}
                      className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                    >
                      <div className="overflow-hidden">
                        <Link to={`/article/${related.id}`}>
                          <img
                            src={related.image_url || `https://picsum.photos/600/350?random=${related.id}`}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                            alt={related.title}
                          />
                        </Link>
                      </div>
                      <div className="p-4">
                        <span className="inline-block bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide mb-2">
                          {related.categories?.name}
                        </span>
                        <Link to={`/article/${related.id}`}>
                          <h4 className="font-raum font-bold text-base md:text-lg leading-snug group-hover:text-blue-700 transition-colors text-ecn-dark-blue line-clamp-2 mb-2">
                            {related.title}
                          </h4>
                        </Link>
                        <span className="text-xs font-bold text-gray-400 block">
                           {formatPublishedDate(related.published_at)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No related articles found.</p>
              )}
            </div>
          </div>

          {/* Right Column: Persistent Sidebar */}
          <div className="lg:w-1/3">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;