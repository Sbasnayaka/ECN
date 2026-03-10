import AdBanner from "./AdBanner";
import MainNewsSlider from "./MainNewsSlider";
import SectionHeader from "./SectionHeader";
import HorizontalNewsCard from "./HorizontalNewsCard";
import VerticalNewsCard from "./VerticalNewsCard";
import LoadMoreBtn from "./LoadMoreBtn";

const NewsFeed = () => {
  // Shared Mock Data for structural blocks
  const hotNews = [
    {
      id: 4,
      title: "දිවයිනේ ප්‍රදේශ කිහිපයකට අදත් වැසි",
      excerpt: "කාලගුණ විද්‍යා දෙපාර්තමේන්තුවෙන් නවතම නිවේදනයක් නිකුත් කෙරේ...",
      image:
        "https://via.placeholder.com/400x250/112240/ffffff?text=Hot+News+01",
      time: "පැයකට පෙර",
    },
    {
      id: 5,
      title: "රන් මිලෙහි විශාල වෙනසක්",
      excerpt: "ලෝක වෙළඳපොළේ රන් මිල වාර්තාගත ලෙස ඉහළ යයි...",
      image:
        "https://via.placeholder.com/400x250/112240/ffffff?text=Hot+News+02",
      time: "පැය 3කට පෙර",
    },
  ];

  const politicsNews = [
    {
      id: 6,
      title: "පාර්ලිමේන්තුව හෙට රැස්වෙයි",
      excerpt: "විශේෂ පනත් කිහිපයක් විවාදයට ගැනීමට නියමිතයි...",
      image:
        "https://via.placeholder.com/400x250/000080/ffffff?text=Politics+01",
      time: "පැය 2කට පෙර",
    },
    {
      id: 7,
      title: "නව කැබිනට් මණ්ඩලය දිවුරුම් දෙයි",
      excerpt: "ජනාධිපති ලේකම් කාර්යාලයේදී දිවුරුම් දීම සිදුවිය...",
      image:
        "https://via.placeholder.com/400x250/000080/ffffff?text=Politics+02",
      time: "පැය 4කට පෙර",
    },
  ];

  const localNews = [
    {
      id: 8,
      title: "අධිවේගී මාර්ගයේ වාහන ගාස්තු සංශෝධනයක්",
      excerpt: "ලබන මස සිට ක්‍රියාත්මක වන පරිදි ගාස්තු සංශෝධනයක්...",
      image: "https://via.placeholder.com/400x250/0a192f/ffffff?text=Local+01",
      time: "පැය 5කට පෙර",
    },
    {
      id: 9,
      title: "විශ්වවිද්‍යාල සිසුන්ගේ විරෝධතාවක්",
      excerpt: "කොළඹ ප්‍රදේශයේ දැඩි රථවාහන තදබදයක්...",
      image: "https://via.placeholder.com/400x250/0a192f/ffffff?text=Local+02",
      time: "පැය 6කට පෙර",
    },
  ];

  const businessNews = [
    {
      id: 10,
      title: "කොළඹ කොටස් වෙළෙඳපොළේ කැපී පෙනෙන වර්ධනයක්",
      excerpt: "සියලු කොටස් මිල දර්ශකය ඒකක 200කින් ඉහළට...",
      image:
        "https://via.placeholder.com/400x250/333333/ffffff?text=Business+01",
      time: "පැය 7කට පෙර",
    },
    {
      id: 11,
      title: "ඩොලරයට සාපේක්ෂව රුපියල ශක්තිමත් වෙයි",
      excerpt: "මහ බැංකුව විසින් නවතම විනිමය අනුපාත නිකුත් කරයි...",
      image:
        "https://via.placeholder.com/400x250/333333/ffffff?text=Business+02",
      time: "පැය 9කට පෙර",
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Section 4: 3 Small Ads */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdBanner size="small" />
        <AdBanner size="small" />
        <AdBanner size="small" />
      </div>

      {/* Section 5: Video Loop Area */}
      <div className="w-full bg-gray-100 flex items-center justify-center p-4">
        {/* Embedded YouTube video placeholder matching Figma request */}
        <div className="w-full aspect-video bg-gray-300 relative rounded overflow-hidden shadow">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
            </div>
          </div>
          <p className="absolute bottom-4 right-4 text-white font-bold bg-black/50 px-3 py-1 text-sm rounded">
            Video Loop 01
          </p>
        </div>
      </div>

      {/* Section 6: Main News Section */}
      <div>
        <SectionHeader theme="dark-blue" title="ප්‍රධාන පුවත්" />
        <div className="mt-4">
          <MainNewsSlider />
        </div>
      </div>

      {/* Section 7: 2 Medium Ads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AdBanner size="medium" />
        <AdBanner size="medium" />
      </div>

      {/* Section 8: Hot News Section */}
      <div>
        <SectionHeader theme="red" title="උණුසුම් පුවත්" />
        <div className="flex flex-col gap-4 mt-4 mb-4">
          {hotNews.map((news) => (
            <HorizontalNewsCard key={news.id} {...news} />
          ))}
        </div>
        <LoadMoreBtn text="Load more" />
      </div>

      {/* Section 9: 2 Medium Ads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AdBanner size="medium" />
        <AdBanner size="medium" />
      </div>

      {/* Section 10: Politics News */}
      <div>
        <SectionHeader theme="dark-blue" title="දේශපාලන පුවත්" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
          {politicsNews.map((news) => (
            <VerticalNewsCard key={news.id} {...news} />
          ))}
        </div>
        <LoadMoreBtn text="Load more" />
      </div>

      {/* Section 11: Local News */}
      <div>
        <SectionHeader theme="dark-blue" title="දේශීය පුවත්" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
          {localNews.map((news) => (
            <VerticalNewsCard key={news.id} {...news} />
          ))}
        </div>
        <LoadMoreBtn text="Load more" />
      </div>

      {/* Section 12: Business News */}
      <div>
        <SectionHeader theme="dark-blue" title="ව්‍යාපාරික පුවත්" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
          {businessNews.map((news) => (
            <VerticalNewsCard key={news.id} {...news} />
          ))}
        </div>
        <LoadMoreBtn text="Load more" />
      </div>
    </div>
  );
};

export default NewsFeed;
