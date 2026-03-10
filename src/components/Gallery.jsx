import SectionHeader from "./SectionHeader";

const Gallery = () => {
  const galleryPhotos = [
    {
      id: 12,
      title: "නිදහස් දින සැමරුම",
      image:
        "https://via.placeholder.com/400x250/112240/ffffff?text=Gallery+01",
    },
    {
      id: 13,
      title: "ජාත්‍යන්තර ක්‍රිකට් තරගය",
      image:
        "https://via.placeholder.com/400x250/112240/ffffff?text=Gallery+02",
    },
    {
      id: 14,
      title: "සංස්කෘතික මංගල්‍යය",
      image:
        "https://via.placeholder.com/400x250/112240/ffffff?text=Gallery+03",
    },
  ];

  return (
    <div className="w-full mt-8">
      <SectionHeader theme="dark-blue" title="Gallery" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {galleryPhotos.map((photo) => (
          <div key={photo.id} className="group cursor-pointer">
            <div className="overflow-hidden rounded border border-gray-200">
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-center font-bold text-sm sm:text-base mt-3 text-ecn-navy group-hover:text-blue-600 transition-colors">
              {photo.title}
            </h3>
            <p className="text-center text-xs text-gray-500 mt-1">අද</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
