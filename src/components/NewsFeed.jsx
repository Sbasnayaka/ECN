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

  const basePoliticsNews = [
    {
      id: 6,
      title: "පාර්ලිමේන්තුව හෙට රැස්වෙයි",
      excerpt:
        "විශේෂ පනත් කිහිපයක් විවාදයට ගැනීමට නියමිතයි. මේ පිළිබඳ අවසන් තීරණය කථානායකවරයා විසින් අද ප්‍රකාශයට පත් කරනු ඇත.",
      image: "https://picsum.photos/400/250?random=32",
      date: "March 10, 2026",
    },
    {
      id: 7,
      title: "නව කැබිනට් මණ්ඩලය දිවුරුම් දෙයි",
      excerpt:
        "ජනාධිපති ලේකම් කාර්යාලයේදී දිවුරුම් දීම සිදුවිය. නව අමාත්‍යවරුන් සහ ඔවුන්ගේ විෂය පථයන් අද ප්‍රකාශයට පත් කිරීමට නියමිතයි.",
      image: "https://picsum.photos/400/250?random=33",
      date: "March 7, 2026",
    },
  ];

  // Dynamically generate 40 items to test the exact 4/8/12 pagination logic for Politics section
  const politicsNewsData = Array.from({ length: 40 }).map((_, i) => ({
    ...basePoliticsNews[i % 2],
    id: `politics-news-${i + 1}`,
  }));

  // State to manage Politics News card count
  const [politicsLimit, setPoliticsLimit] = useState(4);

  const baseLocalNews = [
    {
      id: 8,
      title: "අධිවේගී මාර්ගයේ වාහන ගාස්තු සංශෝධනයක්",
      excerpt:
        "ලබන මස සිට ක්‍රියාත්මක වන පරිදි ගාස්තු සංශෝධනයක් සිදු කිරීමට අමාත්‍ය මණ්ඩලය තීරණය කර ඇත.",
      image: "https://picsum.photos/400/250?random=34",
      date: "March 11, 2026",
    },
    {
      id: 9,
      title: "විශ්වවිද්‍යාල සිසුන්ගේ විරෝධතාවක්",
      excerpt:
        "කොළඹ ප්‍රදේශයේ දැඩි රථවාහන තදබදයක් ඇති කරමින් අද දහවල් මෙම විරෝධතාව පැවැත්විණි.",
      image: "https://picsum.photos/400/250?random=35",
      date: "March 10, 2026",
    },
  ];

  // Dynamically generate 20 items to test the exact 4/8 pagination logic for Local News section
  const localNewsData = Array.from({ length: 20 }).map((_, i) => ({
    ...baseLocalNews[i % 2],
    id: `local-news-${i + 1}`,
  }));

  // State to manage Local News card count
  const [localLimit, setLocalLimit] = useState(4);

  // Sports News Data Block
  const baseSportsNews = [
    {
      id: 12,
      title: "ශ්‍රී ලංකා කණ්ඩායමට විශිෂ්ට ජයක්",
      excerpt:
        "අවසන් මහා තරගයේදී ප්‍රතිවාදීන් පරදවමින් ලෝක කුසලානය හිමිකර ගනී.",
      image: "https://picsum.photos/400/250?random=50",
      date: "March 11, 2026",
    },
    {
      id: 13,
      title: "පාසල් ක්‍රීඩා උළෙල අද ආරම්භ වෙයි",
      excerpt: "දිවයින පුරා පාසල් රැසක ක්‍රීඩකයින් මෙම තරගාවලියට එක්වෙති.",
      image: "https://picsum.photos/400/250?random=51",
      date: "March 10, 2026",
    },
  ];

  const sportsNewsData = Array.from({ length: 20 }).map((_, i) => ({
    ...baseSportsNews[i % 2],
    id: `sports-news-${i + 1}`,
  }));

  const [sportsLimit, setSportsLimit] = useState(4);

  // Foreign News Data Block
  const baseForeignNews = [
    {
      id: 14,
      title: "ඇමෙරිකානු ජනාධිපතිවරණයෙන් නව වෙනසක්",
      excerpt: "ජාත්‍යන්තර දේශපාලන කරළියේ ප්‍රබල වෙනස්කම් රැසක් නිරීක්ෂණය වේ.",
      image: "https://picsum.photos/400/250?random=60",
      date: "March 11, 2026",
    },
    {
      id: 15,
      title: "යුරෝපයේ දැවැන්ත ආර්ථික සමුළුව නිමාවෙයි",
      excerpt: "ගෝලීය ආර්ථික අර්බුදයට විසඳුම් සෙවීම සඳහා ලෝක නායකයෝ රැස්වෙති.",
      image: "https://picsum.photos/400/250?random=61",
      date: "March 9, 2026",
    },
  ];

  const foreignNewsData = Array.from({ length: 20 }).map((_, i) => ({
    ...baseForeignNews[i % 2],
    id: `foreign-news-${i + 1}`,
  }));

  const [foreignLimit, setForeignLimit] = useState(4);

  const baseBusinessNews = [
    {
      id: 10,
      title: "කොළඹ කොටස් වෙළෙඳපොළේ කැපී පෙනෙන වර්ධනයක්",
      excerpt:
        "සියලු කොටස් මිල දර්ශකය ඒකක 200කින් ඉහළට ගොස් ඇති අතර ආයෝජකයින්ට මෙය අතිශය සුබදායී ආරංචියක් වේ.",
      image: "https://picsum.photos/400/250?random=36",
      date: "March 11, 2026",
    },
    {
      id: 11,
      title: "ඩොලරයට සාපේක්ෂව රුපියල ශක්තිමත් වෙයි",
      excerpt:
        "මහ බැංකුව විසින් නවතම විනිමය අනුපාත නිකුත් කරයි. ඒ අනුව ආර්ථිකයේ යම් ස්ථායීතාවයක් අපේක්ෂා කෙරේ.",
      image: "https://picsum.photos/400/250?random=37",
      date: "March 10, 2026",
    },
  ];

  // Dynamically generate 20 items to test the exact 4/8 pagination logic for Business News section
  const businessNewsData = Array.from({ length: 20 }).map((_, i) => ({
    ...baseBusinessNews[i % 2],
    id: `business-news-${i + 1}`,
  }));

  // State to manage Business News card count
  const [businessLimit, setBusinessLimit] = useState(4);

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
        <SectionHeader theme="orange" title="දේශපාලන පුවත්" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
          {politicsNewsData.slice(0, politicsLimit).map((news) => (
            <VerticalNewsCard key={news.id} {...news} />
          ))}
        </div>
        {politicsLimit < politicsNewsData.length && (
          <LoadMoreBtn
            text="Load more"
            onClick={() => setPoliticsLimit((prev) => prev + 4)}
          />
        )}
      </div>

      {/* Section 11: Local News */}
      <div>
        <SectionHeader theme="cyan" title="දේශීය පුවත්" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
          {localNewsData.slice(0, localLimit).map((news) => (
            <VerticalNewsCard key={news.id} {...news} />
          ))}
        </div>
        {localLimit < localNewsData.length && (
          <LoadMoreBtn
            text="Load more"
            onClick={() => setLocalLimit((prev) => prev + 4)}
          />
        )}
      </div>

      {/* Section 12: Business News */}
      <div>
        <SectionHeader theme="darkRed" title="ව්‍යාපාරික පුවත්" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
          {businessNewsData.slice(0, businessLimit).map((news) => (
            <VerticalNewsCard key={news.id} {...news} />
          ))}
        </div>
        {businessLimit < businessNewsData.length && (
          <LoadMoreBtn
            text="Load more"
            onClick={() => setBusinessLimit((prev) => prev + 4)}
          />
        )}
      </div>

      {/* New Section: Sports News */}
      <div>
        <SectionHeader theme="green" title="ක්‍රීඩා පුවත්" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
          {sportsNewsData.slice(0, sportsLimit).map((news) => (
            <VerticalNewsCard key={news.id} {...news} />
          ))}
        </div>
        {sportsLimit < sportsNewsData.length && (
          <LoadMoreBtn
            text="Load more"
            onClick={() => setSportsLimit((prev) => prev + 4)}
          />
        )}
      </div>

      {/* New Section: Foreign News */}
      <div>
        <SectionHeader theme="blue" title="විදෙස් පුවත්" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
          {foreignNewsData.slice(0, foreignLimit).map((news) => (
            <VerticalNewsCard key={news.id} {...news} />
          ))}
        </div>
        {foreignLimit < foreignNewsData.length && (
          <LoadMoreBtn
            text="Load more"
            onClick={() => setForeignLimit((prev) => prev + 4)}
          />
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
