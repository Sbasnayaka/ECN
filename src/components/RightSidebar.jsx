import React from "react";
import SectionHeader from "./SectionHeader";
import VerticalNewsCard from "./VerticalNewsCard";
import HorizontalNewsCard from "./HorizontalNewsCard";
import LoadMoreBtn from "./LoadMoreBtn";
import AdBanner from "./AdBanner";

import ytIcon from "../assets/icons/youtube.png";

const RightSidebar = () => {
  // Mock Data for the sidebar sections
  const societyGossips = [
    {
      id: 201,
      title: "මෙවර සම්මාන උළෙලේදී කැපී පෙනුණු තරු සහ ඔවුන්ගේ විලාසිතා",
      date: "2026-03-09",
    },
    {
      id: 202,
      title: "ජනප්‍රිය ගායන ශිල්පියාගේ නවතම ගීතය අන්තර්ජාලය කැළඹූ අයුරු",
      date: "2026-03-08",
    },
  ];

  const otherNews = [
    {
      id: 203,
      title: "කොළඹ රථවාහන තදබදයට නව විසඳුමක්",
      date: "පැයකට පෙර",
      excerpt: "නව මාර්ග සැලැස්මක් පිළිබඳව සාකච්ඡා...",
    },
    {
      id: 204,
      title: "ගෑස් මිල යළිත් වරක් සංශෝධනය වන ලකුණු",
      date: "පැය 2කට පෙර",
      excerpt: "මිල කමිටුව අද රැස්වීමට නියමිතයි...",
    },
    {
      id: 205,
      title: "ඩිජිටල් හැඳුනුම්පත ලබන මස සිට නිකුත් කිරීමට සූදානම්",
      date: "පැය 3කට පෙර",
      excerpt: "සියලු කටයුතු සූදානම් බව දෙපාර්තමේන්තුව කියයි.",
    },
    {
      id: 206,
      title: "විදේශ ශ්‍රමිකයින්ගෙන් මෙරටට වාර්තාගත ආදායමක් හිමිවෙයි",
      date: "පැය 5කට පෙර",
      excerpt: "මහ බැංකු වාර්තා මඟින් තහවුරු කරයි.",
    },
  ];

  const weatherNews = {
    id: 207,
    title: "බස්නාහිර සහ සබරගමුව පළාත්වලට අද සවස තද වැසි",
    date: "2026-03-10",
    excerpt:
      "ඉදිරි පැය 24 තුළ දිවයිනේ නිරිතදිග කොටසේ වැසි තත්ත්වයේ වර්ධනයක් අපේක්ෂා කෙරෙන බව කාලගුණ විද්‍යා දෙපාර්තමේන්තුව නිවේදනය කරයි.",
  };

  return (
    <aside className="w-full flex flex-col gap-8">
      {/* Section 14: YouTube Channel Dropdown Section */}
      <div className="bg-[#e0f2fe] border border-blue-200 p-6 flex flex-col items-center justify-center text-center shadow-sm">
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

      {/* Section 15: Society Gossips */}
      <div className="flex flex-col bg-white border border-gray-100 shadow-sm">
        <SectionHeader title="society gossips" theme="grey" />
        <div className="p-4 flex flex-col gap-6">
          {societyGossips.map((article) => (
            <VerticalNewsCard
              key={article.id}
              id={article.id}
              title={article.title}
              date={article.date}
            />
          ))}
        </div>
        <LoadMoreBtn
          onClick={() => console.log("load gossips")}
          text="Load more"
        />
      </div>

      {/* Section 16: Medium Advertisement Banner 05 */}
      <AdBanner title="Medium advertisement Banner 05" size="medium" />

      {/* Section 17: ....... news */}
      <div className="flex flex-col bg-white border border-gray-100 shadow-sm">
        <SectionHeader title="....... news" theme="grey" />
        <div className="flex flex-col py-2">
          {otherNews.map((article) => (
            <HorizontalNewsCard
              key={article.id}
              id={article.id}
              title={article.title}
              date={article.date}
              excerpt={article.excerpt}
            />
          ))}
        </div>
        <LoadMoreBtn
          onClick={() => console.log("load other news")}
          text="Load more"
        />
      </div>

      {/* Section 18: Weather News */}
      <div className="flex flex-col bg-white border border-gray-100 shadow-sm">
        <SectionHeader title="weather news" theme="grey" />
        <div className="p-4 flex flex-col gap-6">
          <VerticalNewsCard
            id={weatherNews.id}
            title={weatherNews.title}
            date={weatherNews.date}
            excerpt={weatherNews.excerpt}
          />
        </div>
        <LoadMoreBtn
          onClick={() => console.log("load weather")}
          text="Load more"
        />
      </div>

      {/* Section 19: Medium Advertisement Banner 06 */}
      <AdBanner title="Medium advertisement Banner 06" size="medium" />
    </aside>
  );
};

export default RightSidebar;
