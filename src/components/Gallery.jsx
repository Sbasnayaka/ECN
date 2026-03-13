import { useState } from "react";
import SectionHeader from "./SectionHeader";
import LoadMoreBtn from "./LoadMoreBtn";

const Gallery = () => {
  const baseGalleryPhotos = [
    {
      id: 1,
      title:
        "ලොව විශාලතම විලාසිතා රාත්‍රිය 'මෙට් ගාලා' ජනප්‍රිය තරු රැසකගෙන් එළිය වූ හැටි (ඡායාරූප)",
      date: "May 6, 2025",
      image: "https://picsum.photos/400/250?random=70",
    },
    {
      id: 2,
      title: "නිදහසේ 77 වන සැමරුම (ඡායාරූප)",
      date: "February 4, 2025",
      image: "https://picsum.photos/400/250?random=71",
    },
    {
      id: 3,
      title: "2025 නව වසර පිළිගත් ලෝකවාසීන් (ඡායාරූප)",
      date: "January 1, 2025",
      image: "https://picsum.photos/400/250?random=72",
    },
  ];

  // Dynamically generate 12 items to test the exact 3/6/9 pagination logic for Gallery
  const galleryData = Array.from({ length: 12 }).map((_, i) => ({
    ...baseGalleryPhotos[i % 3],
    id: `gallery-news-${i + 1}`,
  }));

  const [galleryLimit, setGalleryLimit] = useState(3);

  return (
    <div className="w-full mt-8">
      <SectionHeader theme="purple" title="ඡායාරූප ගැලරිය" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 mb-4">
        {galleryData.slice(0, galleryLimit).map((photo) => (
          <div
            key={photo.id}
            className="group cursor-pointer flex flex-col h-full bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="overflow-hidden">
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-48 md:h-52 object-cover bg-gray-200 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-left font-raum font-bold text-lg md:text-xl leading-snug text-ecn-black group-hover:text-blue-700 transition-colors line-clamp-3">
                {photo.title}
              </h3>
              <span className="text-left text-xs font-bold text-gray-500 mt-auto pt-4">
                {photo.date}
              </span>
            </div>
          </div>
        ))}
      </div>
      {galleryLimit < galleryData.length && (
        <LoadMoreBtn
          text="Load more"
          onClick={() => setGalleryLimit((prev) => prev + 3)}
        />
      )}
    </div>
  );
};

export default Gallery;
