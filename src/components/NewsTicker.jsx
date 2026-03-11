import { Link } from "react-router-dom";

const NewsTicker = () => {
  // Mock data for the ticker. Later this will come from the backend.
  const breakingNews = [
    "කොළඹ වරාය නගරයේ නව ව්‍යාපෘතියක් අරඹයි.",
    "ශ්‍රී ලංකා ක්‍රිකට් කණ්ඩායම නව පුහුණුකරුවෙකු පත් කරයි.",
    "රන් මිලෙහි විශාල වෙනසක් - මහ බැංකුවෙන් නිවේදනයක්.",
    "උසස් පෙළ විභාග ප්‍රතිඵල ලබන සතියේ නිකුත් කෙරේ.",
  ];

  return (
    <div className="flex items-center shadow-md overflow-hidden bg-[#FFB200]">
      {/* Label - Red Section */}
      <div className="bg-red-700 text-white px-4 py-2 font-bold whitespace-nowrap z-10 flex items-center shrink-0">
        <span className="animate-pulse mr-2 h-2.5 w-2.5 bg-yellow-300 rounded-full"></span>
        <span className="md:text-lg">උණුසුම් පුවත්</span>
      </div>

      {/* Scrolling Gold Marquee Section */}
      <div className="flex-1 overflow-hidden relative flex items-center group">
        <div className="flex whitespace-nowrap items-center animate-marquee group-hover:[animation-play-state:paused] w-max">
          {breakingNews.map((news, index) => (
            <span
              key={index}
              className="flex items-center text-[#112240] font-bold text-sm md:text-base pr-12"
            >
              <span className="mx-2 text-red-600">■</span>
              <Link
                to="/latest"
                className="hover:underline hover:text-red-700 transition-colors"
              >
                {news}
              </Link>
            </span>
          ))}
          {/* Duplicate the list to create a seamless infinite scroll loop */}
          {breakingNews.map((news, index) => (
            <span
              key={`dup-${index}`}
              className="flex items-center text-[#112240] font-bold text-sm md:text-base pr-12"
            >
              <span className="mx-2 text-red-600">■</span>
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
