import React from "react";

const LoadMoreBtn = ({ onClick, text = "Load more" }) => {
  return (
    <div className="w-full flex justify-center py-4">
      <button
        onClick={onClick}
        className="px-6 py-1.5 border border-ecn-navy text-ecn-navy rounded-full text-sm font-bold hover:bg-ecn-navy hover:text-white transition-colors tracking-wide shadow-sm"
      >
        {text}
      </button>
    </div>
  );
};

export default LoadMoreBtn;
