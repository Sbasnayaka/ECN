import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MainNewsSlider = () => {
  const slides = [
    {
      id: 1,
      title:
        "ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජයේ නව ජනාධිපතිඳුන් අද දිවුරුම් දෙයි",
      image:
        "https://via.placeholder.com/800x500/0a192f/ffffff?text=Main+Story+01",
      category: "ප්‍රධාන පුවත්",
      time: "පැය 2කට පෙර",
    },
    {
      id: 2,
      title: "කොළඹ කොටස් වෙළෙඳපොළේ කැපී පෙනෙන වර්ධනයක්",
      image:
        "https://via.placeholder.com/800x500/112240/ffffff?text=Main+Story+02",
      category: "ව්‍යාපාරික",
      time: "පැය 4කට පෙර",
    },
    {
      id: 3,
      title: "ලෝක කුසලාන ක්‍රිකට් තරගාවලියට ශ්‍රී ලංකා සංචිතය නම් කෙරේ",
      image:
        "https://via.placeholder.com/800x500/000080/ffffff?text=Main+Story+03",
      category: "ක්‍රීඩා",
      time: "පැය 5කට පෙර",
    },
    {
      id: 4,
      title:
        "දිවයින පුරා පවතින උණුසුම් කාලගුණ තත්ත්වය පිළිබඳ අවවාදාත්මක නිවේදනයක්",
      image:
        "https://via.placeholder.com/800x500/FFB200/ffffff?text=Main+Story+04",
      category: "කාලගුණය",
      time: "පැය 8කට පෙර",
    },
    {
      id: 5,
      title: "අධ්‍යාපන අමාත්‍යාංශයෙන් ගුරුවරුන්ට විශේෂ චක්‍රලේඛයක්",
      image:
        "https://via.placeholder.com/800x500/6b7280/ffffff?text=Main+Story+05",
      category: "දේශීය පුවත්",
      time: "පැය 10කට පෙර",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden group">
      {/* Slider Images and Content */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <Link to={`/article/${slide.id}`} className="block w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
                <span className="bg-red-600 text-white text-[11px] sm:text-xs font-bold px-3 py-1 uppercase rounded mb-3 inline-block">
                  {slide.category}
                </span>
                <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold font-harsha-kotu leading-snug lg:leading-tight hover:text-blue-300 transition-colors drop-shadow-md">
                  {slide.title}
                </h2>
                <span className="text-gray-300 text-xs sm:text-sm mt-2 block opacity-80">
                  {slide.time}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Dots (Gold & Dark Blue like Figma sketch) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === index
                ? "bg-[#FFB200]"
                : "bg-[#000080]/70 hover:bg-[#000080]"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainNewsSlider;
