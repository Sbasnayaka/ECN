import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import RightSidebar from "../components/RightSidebar";

const ArticlePage = () => {
  // useParams allows us to get the :id from the URL (e.g. /article/123 -> id is "123")
  const { id } = useParams();

  // Scroll to the top of the page whenever a new article is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Mock Article Data (In Phase 5, we will fetch this specific ID from Cloudflare D1)
  const articleInfo = {
    title:
      "ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජයේ නවතම ආර්ථික ප්‍රතිසංස්කරණ",
    category: "ව්‍යාපාරික",
    author: "ප්‍රවෘත්ති අංශය",
    publishedAt: "2023-11-20 | පෙ.ව. 10:30",
    imageUrl:
      "https://via.placeholder.com/800x400/112240/ffffff?text=Full+Article+Image",
    content: `
            මෙරට ආර්ථිකය ශක්තිමත් කිරීමේ අරමුණින් රජය විසින් නවතම ආර්ථික ප්‍රතිසංස්කරණ ක්‍රියාවලියක් හඳුන්වා දී ඇත. මෙම වැඩපිළිවෙළ යටතේ අපනයන කර්මාන්ත දිරිගැන්වීම සහ දේශීය නිෂ්පාදන ඉහළ නැංවීම සඳහා විශේෂ අවධානයක් යොමු කර තිබේ.
            
            මීට අමතරව, විදේශ ආයෝජන ආකර්ෂණය කර ගැනීම සඳහා නව ආයෝජන කලාප කිහිපයක් ස්ථාපිත කිරීමටද යෝජනා වී ඇත. මෙමගින් ඉදිරි වසර 5 තුළ රැකියා අවස්ථා ලක්ෂයක් පමණ නිර්මාණය වනු ඇතැයි අපේක්ෂා කෙරේ.
            
            මෙම නව ආර්ථික ක්‍රමෝපාය පිළිබඳව අදහස් දක්වමින් මුදල් අමාත්‍යාංශයේ ජ්‍යෙෂ්ඨ නිලධාරියෙකු ප්‍රකාශ කළේ, මෙය රටේ දිගුකාලීන ආර්ථික ස්ථාවරත්වය තහවුරු කිරීමේ තීරණාත්මක පියවරක් බවයි. විශේෂයෙන්ම ඩිජිටල් ආර්ථිකයක් කරා ගමන් කිරීමේ අවශ්‍යතාව ඔහු අවධාරණය කළේය.
            
            තවද, සුළු හා මධ්‍ය පරිමාණ ව්‍යාපාරිකයින්ට සහනදායී ණය යෝජනා ක්‍රමයක් හඳුන්වා දීමටද රජය සැලසුම් කර ඇත. මෙමඟින් දේශීය ව්‍යවසායකයින්ට විශාල පිටිවහලක් ලැබෙනු ඇතැයි විශ්වාස කෙරේ.
        `,
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="flex gap-2 text-sm text-gray-500 mb-4 font-medium items-center">
          <Link to="/" className="hover:text-ecn-navy transition-colors">
            මුල් පිටුව
          </Link>
          <span>/</span>
          <Link
            to={`/${articleInfo.category}`}
            className="hover:text-ecn-navy transition-colors"
          >
            {articleInfo.category}
          </Link>
          <span>/</span>
          <span className="text-gray-400">පුවත</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Full Article Reading Area */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            {/* Main Article Card */}
            <div className="bg-white p-5 md:p-8 shadow-sm border border-gray-100 rounded-lg">
              {/* Article Header */}
              <header className="mb-6">
                <span className="bg-blue-600 text-white text-[11px] px-2 py-1 font-bold inline-block mb-3 rounded-sm uppercase tracking-wide">
                  {articleInfo.category}
                </span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-ecn-dark-blue leading-snug mb-4">
                  {articleInfo.title}
                </h1>

                {/* Author & Date Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-gray-500 border-t border-b border-gray-100 py-3 mt-4">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-ecn-navy">
                      ✍️ {articleInfo.author}
                    </span>
                    <span>🕒 {articleInfo.publishedAt}</span>
                  </div>
                  <div className="flex gap-2">
                    {/* Top Socials */}
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

              {/* Featured Image */}
              <div className="w-full mb-8 rounded overflow-hidden">
                <img
                  src={articleInfo.imageUrl}
                  alt={articleInfo.title}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Article Body Content */}
              <div className="max-w-none text-gray-800 font-medium">
                {/* Rendering paragraphs with clean, modern CSS. NO DROP CAP. */}
                {articleInfo.content.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-5 text-[16px] md:text-[18px] leading-[1.8] text-justify text-gray-700"
                  >
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              {/* Reaction Widget */}
              <div className="mt-10 mb-6 flex flex-col items-center border border-gray-100 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-ecn-dark-blue mb-4">
                  ප්‍රතිචාර දක්වන්න! (React)
                </h3>
                <div className="flex gap-4 sm:gap-6 text-3xl sm:text-4xl cursor-pointer">
                  <span
                    className="hover:scale-125 transition-transform"
                    title="Like"
                  >
                    👍
                  </span>
                  <span
                    className="hover:scale-125 transition-transform"
                    title="Haha"
                  >
                    😂
                  </span>
                  <span
                    className="hover:scale-125 transition-transform"
                    title="Wow"
                  >
                    😮
                  </span>
                  <span
                    className="hover:scale-125 transition-transform"
                    title="Sad"
                  >
                    😢
                  </span>
                  <span
                    className="hover:scale-125 transition-transform"
                    title="Angry"
                  >
                    😡
                  </span>
                </div>
              </div>

              {/* Footer Social Share */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="font-bold text-gray-600 text-sm">
                  මෙම පුවත බෙදාගන්න (Share):
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

            {/* Related News Section */}
            <div className="mt-4">
              <h3 className="text-xl font-bold border-b-2 border-ecn-navy pb-2 mb-4">
                <span className="bg-ecn-navy text-white px-4 py-1 inline-block">
                  සම්බන්ධිත පුවත් (Related)
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mock Related Card 1 */}
                <div className="bg-white border border-gray-100 rounded overflow-hidden shadow-sm hover:shadow-md transition">
                  <img
                    src="https://via.placeholder.com/400x250/112240/ffffff?text=Related+News+1"
                    className="w-full h-32 object-cover"
                    alt="Related"
                  />
                  <div className="p-3">
                    <h4 className="font-bold text-sm leading-snug hover:text-blue-600 cursor-pointer text-ecn-dark-blue">
                      මහ බැංකුවෙන් නව වාර්තාවක් නිකුත් කෙරේ
                    </h4>
                    <span className="text-xs text-gray-400 mt-2 block">
                      පැය 2කට පෙර
                    </span>
                  </div>
                </div>
                {/* Mock Related Card 2 */}
                <div className="bg-white border border-gray-100 rounded overflow-hidden shadow-sm hover:shadow-md transition">
                  <img
                    src="https://via.placeholder.com/400x250/112240/ffffff?text=Related+News+2"
                    className="w-full h-32 object-cover"
                    alt="Related"
                  />
                  <div className="p-3">
                    <h4 className="font-bold text-sm leading-snug hover:text-blue-600 cursor-pointer text-ecn-dark-blue">
                      කොටස් වෙළෙඳපොළ මිල දර්ශක ඉහළට
                    </h4>
                    <span className="text-xs text-gray-400 mt-2 block">
                      පැය 4කට පෙර
                    </span>
                  </div>
                </div>
              </div>
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
