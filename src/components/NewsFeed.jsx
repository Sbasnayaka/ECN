import { useState } from "react";
import AdBanner from "./AdBanner";
import topAdImage from "../assets/Top Advertisement  Banner.webp";
import videoLoopGif from "../assets/WEB-SIZE-VIDEO-LOOP.gif";
import MainNewsSlider from "./MainNewsSlider";
import SectionHeader from "./SectionHeader";
import HorizontalNewsCard from "./HorizontalNewsCard";
import VerticalNewsCard from "./VerticalNewsCard";
import LoadMoreBtn from "./LoadMoreBtn";

const NewsFeed = () => {
  // Shared Mock Data for structural blocks
  const baseHotNews = [
    {
      id: 4,
      title: "දිවයිනේ ප්‍රදේශ කිහිපයකට අදත් වැසි",
      excerpt:
        "කාලගුණ විද්‍යා දෙපාර්තමේන්තුවෙන් නවතම නිවේදනයක් නිකුත් කෙරේ. බස්නාහිර, සබරගමුව සහ මධ්‍යම පළාත්වලට තද වැසි අපේක්ෂා කරන බව කාලගුණ විද්‍යා දෙපාර්තමේන්තුව අද නිවේදනය කර ඇත. අකුණු සහ ගිගුරුම් සහිත කාලගුණය පිළිබඳව ජනතාව අවධානයෙන් සිටිය යුතු බව දන්වා සිටියි.",
      image: "https://picsum.photos/400/250?random=30",
      time: "පැයකට පෙර",
    },
    {
      id: 5,
      title: "රන් මිලෙහි විශාල වෙනසක්",
      excerpt:
        "ලෝක වෙළඳපොළේ රන් මිල වාර්තාගත ලෙස ඉහළ යයි. මේ හේතුවෙන් දේශීය වෙළඳපොළේද රන් මිල අද උදෑසන සීඝ්‍රයෙන් ඉහළ ගොස් ඇත. පාරිභෝගිකයින් මේ පිළිබඳව දැඩි අවධානයෙන් සිටින බව කොළඹ රන් වෙළඳපොල ආරංචි මාර්ග තහවුරු කරයි.",
      image: "https://picsum.photos/400/250?random=31",
      time: "පැය 3කට පෙර",
    },
  ];

  // Dynamically generate 80 items to test the exact 20/40/60 pagination logic
  const hotNewsData = Array.from({ length: 80 }).map((_, i) => ({
    ...baseHotNews[i % 2],
    id: `hot-news-${i + 1}`,
  }));

  // State to manage Hot News card count
  const [hotNewsLimit, setHotNewsLimit] = useState(20);

  const politicsNews = [
    {
      id: 6,
      title: "පාර්ලිමේන්තුව හෙට රැස්වෙයි",
      excerpt: "විශේෂ පනත් කිහිපයක් විවාදයට ගැනීමට නියමිතයි...",
      image: "https://picsum.photos/400/250?random=32",
      time: "පැය 2කට පෙර",
    },
    {
      id: 7,
      title: "නව කැබිනට් මණ්ඩලය දිවුරුම් දෙයි",
      excerpt: "ජනාධිපති ලේකම් කාර්යාලයේදී දිවුරුම් දීම සිදුවිය...",
      image: "https://picsum.photos/400/250?random=33",
      time: "පැය 4කට පෙර",
    },
  ];

  const localNews = [
    {
      id: 8,
      title: "අධිවේගී මාර්ගයේ වාහන ගාස්තු සංශෝධනයක්",
      excerpt: "ලබන මස සිට ක්‍රියාත්මක වන පරිදි ගාස්තු සංශෝධනයක්...",
      image: "https://picsum.photos/400/250?random=34",
      time: "පැය 5කට පෙර",
    },
    {
      id: 9,
      title: "විශ්වවිද්‍යාල සිසුන්ගේ විරෝධතාවක්",
      excerpt: "කොළඹ ප්‍රදේශයේ දැඩි රථවාහන තදබදයක්...",
      image: "https://picsum.photos/400/250?random=35",
      time: "පැය 6කට පෙර",
    },
  ];

  const businessNews = [
    {
      id: 10,
      title: "කොළඹ කොටස් වෙළෙඳපොළේ කැපී පෙනෙන වර්ධනයක්",
      excerpt: "සියලු කොටස් මිල දර්ශකය ඒකක 200කින් ඉහළට...",
      image: "https://picsum.photos/400/250?random=36",
      time: "පැය 7කට පෙර",
    },
    {
      id: 11,
      title: "ඩොලරයට සාපේක්ෂව රුපියල ශක්තිමත් වෙයි",
      excerpt: "මහ බැංකුව විසින් නවතම විනිමය අනුපාත නිකුත් කරයි...",
      image: "https://picsum.photos/400/250?random=37",
      time: "පැය 9කට පෙර",
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Section 4: 3 Small Ads */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdBanner size="small" image={topAdImage} />
        <AdBanner size="small" image={topAdImage} />
        <AdBanner size="small" image={topAdImage} />
      </div>

      {/* Section 5: Video Loop Area (GIF) */}
      <div className="w-full relative rounded overflow-hidden shadow-sm">
        <img
          src={videoLoopGif}
          alt="News Video Loop"
          className="w-full h-auto block object-contain bg-gray-200"
        />

        {/* Overlay to identify the section clearly for the client */}
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none"></div>
      </div>

      {/* Section 6: Main News Section */}
      <div>
        <SectionHeader theme="mainNews" title="ප්‍රධාන පුවත්" />
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
          {hotNewsData.slice(0, hotNewsLimit).map((news) => (
            <HorizontalNewsCard key={news.id} {...news} isHotNews={true} />
          ))}
        </div>
        {hotNewsLimit < hotNewsData.length && (
          <LoadMoreBtn
            text="Load more"
            onClick={() => setHotNewsLimit((prev) => prev + 20)}
          />
        )}
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
