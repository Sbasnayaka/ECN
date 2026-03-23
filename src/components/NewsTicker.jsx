import { Link } from "react-router-dom";

const NewsTicker = () => {
  const breakingNews = [
    "කොළඹ වරාය නගරයේ නව ව්‍යාපෘතියක් අරඹයි.",
    "ශ්‍රී ලංකා ක්‍රිකට් කණ්ඩායම නව පුහුණුකරුවෙකු පත් කරයි.",
    "රන් මිලෙහි විශාල වෙනසක් - මහ බැංකුවෙන් නිවේදනයක්.",
    "උසස් පෙළ විභාග ප්‍රතිඵල ලබන සතියේ නිකුත් කෙරේ.",
  ];

  return (
    <div className="flex items-center overflow-hidden bg-[#FFB200]">
      {/* Label - Red Section – smaller */}
      <div className="bg-red-700 text-white px-2 py-0.5 font-bold whitespace-nowrap z-10 flex items-center shrink-0">
        <span className="animate-pulse mr-1 h-1.5 w-1.5 bg-yellow-300 rounded-full"></span>
        <span className="text-xs">උණුසුම් <span className="hidden sm:inline">පුවත්</span></span>
      </div>

      {/* Scrolling Marquee */}
      <div className="flex-1 overflow-hidden relative flex items-center group">
        <div className="flex whitespace-nowrap items-center animate-marquee group-hover:[animation-play-state:paused] w-max">
          {breakingNews.map((news, index) => (
            <span
              key={index}
              className="flex items-center text-[#112240] font-semibold text-[11px] md:text-xs pr-8"
            >
              <span className="mx-1 text-red-600 text-[10px]">■</span>
              <Link
                to="/latest"
                className="hover:underline hover:text-red-700 transition-colors"
              >
                {news}
              </Link>
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {breakingNews.map((news, index) => (
            <span
              key={`dup-${index}`}
              className="flex items-center text-[#112240] font-semibold text-[11px] md:text-xs pr-8"
            >
              <span className="mx-1 text-red-600 text-[10px]">■</span>
              <Link
                to="/latest"
                className="hover:underline hover:text-red-700 transition-colors"
              >
                {news}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;