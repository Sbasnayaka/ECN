import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import VerticalNewsCard from "./VerticalNewsCard";
import HorizontalNewsCard from "./HorizontalNewsCard";
import LoadMoreBtn from "./LoadMoreBtn";
import AdBanner from "./AdBanner";

import ytIcon from "../assets/icons/youtube.png";

const RightSidebar = () => {
  // Gossip News Data for Sidebar
  const baseGossipNews = [
    {
      id: 301,
      title: "මෙවර සම්මාන උළෙලේදී කැපී පෙනුණු තරු සහ ඔවුන්ගේ විලාසිතා",
      excerpt:
        "කලා ලොවේ ජනප්‍රිය තරු රැසක් සහභාගී වූ සම්මාන උළෙලේ විශේෂ අවස්ථා.",
      image: "https://picsum.photos/400/250?random=40",
      date: "March 9, 2026",
    },
    {
      id: 302,
      title: "ජනප්‍රිය ගායන ශිල්පියාගේ නවතම ගීතය අන්තර්ජාලය කැළඹූ අයුරු",
      excerpt:
        "යූටියුබ් නාලිකාව හරහා ඊයේ මුදාහළ ගීතය පැය 24ක් තුළ වාර්තාගත නැරඹුම් ප්‍රමාණයක් ලබාගෙන ඇත.",
      image: "https://picsum.photos/400/250?random=41",
      date: "March 8, 2026",
    },
  ];

  const gossipData = Array.from({ length: 32 }).map((_, i) => ({
    ...baseGossipNews[i % 2],
    id: `sidebar-gossip-${i + 1}`,
  }));

  const [gossipLimit, setGossipLimit] = useState(8);

  // Popular News (ජනප්‍රිය පුවත්) - image + title only
  const basePopularNews = [
    {
      id: 401,
      title: "කොළඹ රථවාහන තදබදයට නව විසඳුමක්",
      image: "https://picsum.photos/400/250?random=80",
      date: "March 12, 2026",
    },
    {
      id: 402,
      title: "ගෑස් මිල යළිත් වරක් සංශෝධනය වන ලකුණු",
      image: "https://picsum.photos/400/250?random=81",
      date: "March 11, 2026",
    },
    {
      id: 403,
      title: "ඩිජිටල් හැඳුනුම්පත ලබන මස සිට නිකුත් කිරීමට සූදානම්",
      image: "https://picsum.photos/400/250?random=82",
      date: "March 10, 2026",
    },
    {
      id: 404,
      title: "විදේශ ශ්‍රමිකයින්ගෙන් මෙරටට වාර්තාගත ආදායමක් හිමිවෙයි",
      image: "https://picsum.photos/400/250?random=83",
      date: "March 9, 2026",
    },
  ];

  const popularNewsData = Array.from({ length: 20 }).map((_, i) => ({
    ...basePopularNews[i % 4],
    id: `popular-news-${i + 1}`,
  }));

  const [popularLimit, setPopularLimit] = useState(8);

  // සුව දිවිය (Health) Data
  const baseSuwaDiviNews = [
    {
      id: 501,
      title: "ප්‍රතිදින ව්‍යායාමයන්ට මිනිත්තු 30ක් කැදෑමෙ ඡායිතාය",
      excerpt:
        "හදවත් සුව්පත් අද්දේශියක් ලලා ගැනීමේ හැකියාක් පිළිබඳව විශේෂඥීන් කියයි.",
      image: "https://picsum.photos/400/250?random=90",
      date: "March 12, 2026",
    },
    {
      id: 502,
      title: "සුවදිය පෝෂණ කුළු පිළිබඳව ඡායිතා",
      excerpt: "කුළුම භාවිතාව ගැනීමේදී ශරීරය විශාල ප්‍රයෝජනයක් ලබැදෑ.",
      image: "https://picsum.photos/400/250?random=91",
      date: "March 11, 2026",
    },
  ];

  const suwaDiviData = Array.from({ length: 20 }).map((_, i) => ({
    ...baseSuwaDiviNews[i % 2],
    id: `suwa-divi-${i + 1}`,
  }));

  const [suwaDiviLimit, setSuwaDiviLimit] = useState(8);

  // රූසර (Beauty) Data
  const baseRoosarNews = [
    {
      id: 601,
      title: "සෙනෙහෙ නිසා රූ සර පෙනීමට හේතු",
      excerpt:
        "ආදරය ශරීරයේ ස්වාභාවික ආලෝකය ප්‍රකාශ කරන බව පර්යේෂකයෝ ප්‍රකාශ කරයි.",
      image: "https://picsum.photos/400/250?random=100",
      date: "March 12, 2026",
    },
    {
      id: 602,
      title: "ගේය කේශ විලාසයන් සෙලියයන්ගේ පසුබිම්",
      excerpt: "විවිධ විලාසිතා පාරිභෝගිකයින්ට කුමක්වු රූට ගෑලට හැකි ඡරී ගැනීම.",
      image: "https://picsum.photos/400/250?random=101",
      date: "March 11, 2026",
    },
  ];

  const roosarData = Array.from({ length: 20 }).map((_, i) => ({
    ...baseRoosarNews[i % 2],
    id: `roosar-${i + 1}`,
  }));

  const [roosarLimit, setRoosarLimit] = useState(8);

  return (
    <aside className="w-full flex flex-col gap-2">
      {/* Section 14: YouTube Channel Dropdown Section */}
      <div className="bg-[#e0f2fe] border border-blue-200 p-3 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="w-16 h-16 mb-3 opacity-90">
          <img
            src={ytIcon}
            alt="YouTube"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>
        <h3 className="text-lg font-bold text-ecn-navy mb-2">
          youtube channel video drop down section
        </h3>
        <p className="text-sm text-gray-600 mb-4 font-noto">
          අපගේ නිල යූටියුබ් නාලිකාව සමග එක්වන්න
        </p>
        <a
          href="#"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors shadow"
        >
          Subscribe Now
        </a>
      </div>

      {/* Section 15: ගොසිප් */}
      <div className="flex flex-col bg-white border border-gray-100 shadow-sm">
        <SectionHeader title="ගොසිප්" theme="goldenAmber" />
        <div className="flex flex-col gap-2 p-2">
          {gossipData.slice(0, gossipLimit).map((article) => (
            <VerticalNewsCard
              key={article.id}
              id={article.id}
              title={article.title}
              excerpt={article.excerpt}
              image={article.image}
              date={article.date}
            />
          ))}
        </div>
        {gossipLimit < gossipData.length && (
          <LoadMoreBtn
            onClick={() => setGossipLimit((prev) => prev + 8)}
            text="Load more"
          />
        )}
      </div>

      {/* Section 16: Medium Advertisement Banner 05 */}
      <AdBanner title="Medium advertisement Banner 05" size="medium" />

      {/* Section 17: ජනප්‍රිය පුවත් - horizontal thumbnail + title layout */}
      <div className="flex flex-col bg-white border border-gray-100 shadow-sm">
        <SectionHeader title="ජනප්‍රිය පුවත්" theme="violet" />
        <div className="flex flex-col">
          {popularNewsData.slice(0, popularLimit).map((article) => (
            <div
              key={article.id}
              className="group cursor-pointer flex flex-row gap-3 px-3 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              {/* Small left thumbnail */}
              <div className="flex-shrink-0 w-32 h-28 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover bg-gray-200 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Title and date stacked right */}
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <h3 className="font-raum font-bold text-lg md:text-xl leading-snug text-ecn-black group-hover:text-blue-700 transition-colors line-clamp-3">
                  {article.title}
                </h3>
                <span className="text-xs font-bold text-gray-500 block">
                  {article.date}
                </span>
              </div>
            </div>
          ))}
        </div>
        {popularLimit < popularNewsData.length && (
          <LoadMoreBtn
            onClick={() => setPopularLimit((prev) => prev + 8)}
            text="Load more"
          />
        )}
      </div>

      {/* Section 18: සුව දිවිය */}
      <div className="flex flex-col bg-white border border-gray-100 shadow-sm">
        <SectionHeader title="සුව දිවිය" theme="lightGreen" />
        <div className="flex flex-col gap-2 p-2">
          {suwaDiviData.slice(0, suwaDiviLimit).map((article) => (
            <VerticalNewsCard
              key={article.id}
              id={article.id}
              title={article.title}
              excerpt={article.excerpt}
              image={article.image}
              date={article.date}
            />
          ))}
        </div>
        {suwaDiviLimit < suwaDiviData.length && (
          <LoadMoreBtn
            onClick={() => setSuwaDiviLimit((prev) => prev + 8)}
            text="Load more"
          />
        )}
      </div>

      {/* Section 19: Medium Advertisement Banner 06 */}
      <AdBanner title="Medium advertisement Banner 06" size="medium" />

      {/* Section 20: රූසර */}
      <div className="flex flex-col bg-white border border-gray-100 shadow-sm">
        <SectionHeader title="රූසර" theme="brownGold" />
        <div className="flex flex-col gap-2 p-2">
          {roosarData.slice(0, roosarLimit).map((article) => (
            <VerticalNewsCard
              key={article.id}
              id={article.id}
              title={article.title}
              excerpt={article.excerpt}
              image={article.image}
              date={article.date}
            />
          ))}
        </div>
        {roosarLimit < roosarData.length && (
          <LoadMoreBtn
            onClick={() => setRoosarLimit((prev) => prev + 8)}
            text="Load more"
          />
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;
