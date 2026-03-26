import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import LoadMoreBtn from "./LoadMoreBtn";
import { getGallery } from "../api/galleryService";
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGallery();
        setGalleryItems(data);
      } catch (err) {
        console.error("Failed to fetch gallery images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const visibleItems = galleryItems.slice(0, visibleCount);
  const hasMore = visibleCount < galleryItems.length;

  if (loading) {
    return (
      <div className="w-full mt-8">
        <SectionHeader theme="purple" title="ඡායාරූප ගැලරිය" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 mb-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-64 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && galleryItems.length === 0) {
    return (
      <div className="w-full mt-8">
        <SectionHeader theme="purple" title="ඡායාරූප ගැලරිය" />
        <p className="text-center text-gray-500 py-8">No gallery images yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-8">
      <SectionHeader theme="purple" title="ඡායාරූප ගැලරිය" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 mb-4">
        {visibleItems.map((photo) => (
          <Link
            to={`/gallery/${photo.id}`}
            key={photo.id}
            className="group block cursor-pointer flex flex-col h-full bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="overflow-hidden">
              <img
                src={photo.image_url}
                alt={photo.title}
                className="w-full h-48 md:h-52 object-cover bg-gray-200 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-left font-raum font-bold text-lg md:text-xl leading-snug text-ecn-black group-hover:text-blue-700 transition-colors line-clamp-3">
                {photo.title}
              </h3>
              <span className="text-left text-xs font-bold text-gray-500 mt-auto pt-4">
                {new Date(photo.created_at).toLocaleDateString()}
              </span>
            </div>
          </Link>
        ))}
      </div>
      {hasMore && (
        <LoadMoreBtn
          text="Load more"
          onClick={() => setVisibleCount((prev) => prev + 3)}
        />
      )}
    </div>
  );
};

export default Gallery;