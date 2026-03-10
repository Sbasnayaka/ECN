import React from "react";

const AdBanner = ({
  title = "Advertisement Banner",
  size = "small",
  className = "",
}) => {
  // Define height classes based on the requested size from the Figma design
  const sizeClasses = {
    small: "h-[100px]", // Small ad banners
    medium: "h-[250px]", // Medium sidebar/feed ads
    large: "h-[400px]", // Large skyscraper / special ads
    leaderboard: "h-[90px]", // Top leaderboard ad
  };

  const appliedHeight = sizeClasses[size] || sizeClasses.small;

  return (
    <div
      className={`w-full bg-[#e8f4f8] border border-blue-200 flex items-center justify-center p-4 shadow-sm ${appliedHeight} ${className}`}
    >
      <span className="text-gray-500 font-noto text-sm sm:text-base font-medium text-center">
        {title}
      </span>
    </div>
  );
};

export default AdBanner;
