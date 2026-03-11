import React from "react";
import { Link } from "react-router-dom";

const HorizontalNewsCard = ({ id, image, title, date, excerpt }) => {
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
            className="w-full h-24 object-cover bg-gray-200"
          />
        </Link>
      </div>

      {/* Content (Right) */}
      <div className="w-2/3 flex flex-col justify-start">
        <Link to={`/article/${id}`}>
          <h3 className="font-kotu font-bold text-base md:text-sm lg:text-base leading-tight text-ecn-black group-hover:text-blue-700 transition-colors line-clamp-2 mb-1">
            {title}
          </h3>
        </Link>

        {excerpt && (
          <p className="text-gray-500 text-xs line-clamp-2 mb-1">{excerpt}</p>
        )}

        {date && (
          <span className="text-gray-400 text-[10px] mt-auto font-medium">
            {date}
          </span>
        )}
      </div>
    </div>
  );
};

export default HorizontalNewsCard;
