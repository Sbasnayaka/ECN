import React from "react";

const SectionHeader = ({ title, theme = "darkBlue", className = "" }) => {
  // Define color themes based on the Figma design ("Main news", "Hot news", "...news")
  const themeClasses = {
    red: "bg-red-600 border-red-700",
    darkBlue: "bg-ecn-dark-blue border-ecn-navy",
    grey: "bg-gray-500 border-gray-600",
    mainNews: "bg-[#0b5ed7] border-[#0a58ca]", // Matched from Dasatha Lanka reference
  };

  const appliedTheme = themeClasses[theme] || themeClasses.darkBlue;

  // Apply conditional padding and height logic for the main news variant
  const isMainNews = theme === "mainNews";
  const paddingClass = isMainNews ? "py-4 md:py-5" : "py-2";
  const textClass = isMainNews
    ? "text-3xl md:text-4xl font-bathala font-normal tracking-normal drop-shadow-sm"
    : "text-2xl md:text-3xl font-kotu font-bold tracking-wide";

  return (
    <div
      className={`w-full px-4 shadow-sm flex items-center justify-center ${paddingClass} ${appliedTheme} ${className}`}
    >
      <h2 className={`text-white ${textClass}`}>{title}</h2>
    </div>
  );
};

export default SectionHeader;
