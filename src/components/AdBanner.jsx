import React from "react";

const AdBanner = ({
  title = "Advertisement Banner",
  size = "small",
  image = null,
  className = "",
}) => {
  // Define height classes based on the requested size from the Figma design
  const sizeClasses = {
    small: "h-[100px]", // Small ad banners
    medium: "h-[250px]", // Medium sidebar/feed ads
    large: "h-[400px]", // Large skyscraper / special ads
    leaderboard: "h-[90px]", // Top leaderboard ad
  };

  const appliedHeight = image
    ? "h-auto"
    : sizeClasses[size] || sizeClasses.small;

  return (
    <div
      className={`w-full bg-[#e8f4f8] border border-blue-200 flex items-center justify-center shadow-sm overflow-hidden ${
        !image ? "p-4 " + appliedHeight : appliedHeight
      } ${className}`}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-auto block object-contain"
        />
      ) : (
        <span className="text-gray-500 font-noto text-sm sm:text-base font-medium text-center">
          {title}
        </span>
      )}
    </div>
  );
};

export default AdBanner;
