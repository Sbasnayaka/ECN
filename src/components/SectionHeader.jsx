import React from "react";

const SectionHeader = ({ title, theme = "darkBlue", className = "" }) => {
  // Define color themes based on the Figma design ("Main news", "Hot news", "...news")
  const themeClasses = {
    red: "bg-red-600 border-red-700",
    darkBlue: "bg-ecn-dark-blue border-ecn-navy",
    grey: "bg-gray-500 border-gray-600",
    mainNews: "bg-[#0b5ed7] border-[#0a58ca]", // Matched from Dasatha Lanka reference
    orange: "bg-[#FF7F50] border-[#ea580c]", // Politics section custom orange
    pink: "bg-[#DB7093] border-[#d81b60]", // Gossip section custom pink
    cyan: "bg-[#00B6DC] border-[#0096B4]", // Local News custom cyan
    darkRed: "bg-[#A30000] border-[#8B0000]", // Business News custom red
    green: "bg-[#228B22] border-[#1e7a1e]", // Sports News custom green
    blue: "bg-[#0F52BA] border-[#0c449c]", // Foreign News custom blue
    purple: "bg-[#8A2BE2] border-[#B68EE6]", // Gallery component custom purple
    goldenAmber: "bg-[#A17015] border-[#8a5e10]", // Gossip sidebar section
    lightGreen: "bg-[#53AB4A] border-[#428a3a]", // සුව දිවිය sidebar section
    brownGold: "bg-[#BF8931] border-[#a0731f]", // රූසර sidebar section
  };

  const appliedTheme = themeClasses[theme] || themeClasses.darkBlue;

  // Apply conditional padding and height logic for the main news variant
  const isMainNews = theme === "mainNews";
  const paddingClass = isMainNews ? "py-4 md:py-5" : "py-2";

  // Shared text size class across ALL section headers to match main news size
  const textSizeClass = "text-3xl md:text-4xl";
  const textClass = isMainNews
    ? `${textSizeClass} font-bathala font-normal tracking-normal drop-shadow-sm`
    : `${textSizeClass} font-kotu font-bold tracking-wide`;

  return (
    <div
      className={`w-full px-4 shadow-sm flex items-center justify-center ${paddingClass} ${appliedTheme} ${className}`}
    >
      <h2 className={`text-white ${textClass}`}>{title}</h2>
    </div>
  );
};

export default SectionHeader;
