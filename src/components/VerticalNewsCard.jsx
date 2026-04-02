import React from "react";
import { Link } from "react-router-dom";

const VerticalNewsCard = ({
  id,
  image,
  image_url,
  title,
  date,
  time,
  published_at,
  excerpt,
  showReadMore = false,
}) => {
  const displayDate = date || time || (published_at ? new Date(published_at).toLocaleDateString() : null);
  // Truncate excerpt to precisely 10 words
  const getExcerpt = (text) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow group h-full">
      {/* Image Section */}
      <Link to={`/article/${id}`} className="w-full overflow-hidden">
        <img
          src={
            image || image_url ||
            "https://via.placeholder.com/400x250/e0e0e0/888888?text=news+image"
          }
          alt={title}
          className="w-full h-32 md:h-40 object-cover bg-gray-200 group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/article/${id}`}>
          <h3 className="font-raum font-bold text-xl md:text-2xl leading-snug text-ecn-black group-hover:text-blue-700 transition-colors line-clamp-2 mb-2">
            {title}
          </h3>
        </Link>

        {excerpt && (
          <p className="text-gray-600 text-[13px] sm:text-sm leading-relaxed mb-3">
            {getExcerpt(excerpt)}
          </p>
        )}

        {/* Date shifted under description as client requested */}
        {displayDate && (
          <span className="text-gray-500 text-xs font-bold mt-auto">
            {displayDate}
          </span>
        )}

        {/* Optional Read More Button (specifically requested in Hot News section Figma design) */}
        {showReadMore && (
          <div className="mt-auto pt-2 flex justify-end">
            <Link
              to={`/article/${id}`}
              className="bg-ecn-dark-blue text-white px-5 py-1.5 rounded-full text-xs font-bold hover:bg-blue-800 transition-colors"
            >
              Read more
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerticalNewsCard;
