import React from "react";

const SectionHeader = ({ title, theme = "darkBlue", className = "" }) => {
  // Define color themes based on the Figma design ("Main news", "Hot news", "...news")
  const themeClasses = {
    red: "bg-red-600 border-red-700",
    darkBlue: "bg-ecn-dark-blue border-ecn-navy",
    grey: "bg-gray-500 border-gray-600",
  };

  const appliedTheme = themeClasses[theme] || themeClasses.darkBlue;

  return (
    <div
      className={`w-full py-2 px-4 shadow-md flex items-center justify-center ${appliedTheme} ${className}`}
    >
      <h2 className="text-white font-kotu text-xl md:text-2xl tracking-wide">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
