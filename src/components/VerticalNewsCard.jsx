import React from "react";
import { Link } from "react-router-dom";

const VerticalNewsCard = ({
  id,
  image,
  title,
  date,
  excerpt,
  showReadMore = false,
}) => {
  return (
    <div className="flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow group h-full">
      {/* Image Section */}
      <Link to={`/article/${id}`} className="w-full overflow-hidden">
        <img
          src={
            image ||
            "https://via.placeholder.com/400x250/e0e0e0/888888?text=news+image"
          }
          alt={title}
          className="w-full h-48 md:h-56 object-cover bg-gray-200 group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/article/${id}`}>
          <h3 className="font-kotu font-bold text-lg leading-snug text-ecn-black group-hover:text-blue-700 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {date && (
          <span className="text-gray-400 text-xs mt-2 mb-2 font-medium">
            {date}
          </span>
        )}

        {excerpt && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 font-noto">
            {excerpt}
          </p>
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
