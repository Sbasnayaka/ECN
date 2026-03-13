import React from "react";
import { Link } from "react-router-dom";
const HorizontalNewsCard = ({
  id,
  image,
  title,
  date,
  time,
  excerpt,
  isHotNews,
}) => {
  // Description Logic: Display only the first 20 words + "..."
  const getExcerpt = (text) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
    }
    return text;
  };

  const displayDate = date || time;
  return (
    <div className="flex bg-white hover:bg-gray-50 transition-colors group p-2 border-b border-gray-100 last:border-0 h-full">
      {/* Image (Left) */}
      <div className="w-1/3 shrink-0 overflow-hidden pr-3">
        <Link to={`/article/${id}`}>
          <img
            src={
              image ||
              "https://via.placeholder.com/150x150/e0e0e0/888888?text=img"
            }
            alt={title}
            className="w-full h-32 sm:h-36 md:h-40 object-cover bg-gray-200"
          />
        </Link>
      </div>

      {/* Content (Right) */}
      <div className="w-2/3 flex flex-col justify-start pl-1">
        <Link to={`/article/${id}`}>
          {/* 1. Title Font Size Conditionally Scaled */}
          <h3
            className={`font-raum font-bold leading-tight text-ecn-black group-hover:text-blue-700 transition-colors mb-2 ${isHotNews ? "text-xl md:text-2xl lg:text-3xl" : "text-lg md:text-xl"}`}
          >
            {title}
          </h3>
        </Link>

        {/* 2. Description Text - Exactly 20 words */}
        {excerpt && (
          <p className="text-gray-600 text-[13px] leading-relaxed mb-3">
            {getExcerpt(excerpt)}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          {/* 3. Published Date - Bold */}
          {displayDate && (
            <span className="text-gray-700 text-xs font-bold">
              {displayDate}
            </span>
          )}

          {/* 4. තව කියවන්න Button - Conditionally Scaled */}
          <Link
            to={`/article/${id}`}
            className={`bg-[#3148f8] text-white rounded font-bold hover:bg-blue-800 transition-colors tracking-wide shadow-sm ${isHotNews ? "px-4 py-2.5 text-xs sm:text-[15px]" : "px-3 py-1.5 text-[11px] sm:text-xs"}`}
          >
            තව කියවන්න
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HorizontalNewsCard;
