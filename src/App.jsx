import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import NewsTicker from "./components/NewsTicker";
import Footer from "./components/Footer";
import NewsFeed from "./components/NewsFeed";
import RightSidebar from "./components/RightSidebar";
import Gallery from "./components/Gallery";
import CategoryPage from "./pages/CategoryPage";
import ArticlePage from "./pages/ArticlePage";
import AboutPage from "./pages/AboutPage";
import AdvertisingPage from "./pages/AdvertisingPage";

import topBannerImg from "./assets/Top Banner - Header Section.webp";

const Home = () => (
  <div className="w-full">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Main News Feed */}
        <div className="lg:w-2/3">
          <NewsFeed />
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:w-1/3">
          <RightSidebar />
        </div>
      </div>

      {/* Full-Width Home Page Gallery Section */}
      <div className="w-full mt-8 md:mt-12 mb-4">
        <Gallery />
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      {/* Outer gray background bounding the whole viewport */}
      <div className="min-h-screen flex justify-center bg-gray-200 text-ecn-black">
        {/* Inner white centered container that mimics the Dasatha Lanka layout box */}
        <div className="w-full max-w-[1280px] bg-white flex flex-col shadow-2xl min-h-screen overflow-hidden">
          <Navigation />
          <NewsTicker />

          {/* Top Banner - Header Section (Client Requested) */}
          <div className="w-full pt-6 md:pt-8 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <img
                src={topBannerImg}
                alt="ECN Top Banner"
                className="w-full h-auto object-contain rounded shadow-sm border border-gray-100"
              />
            </div>
          </div>

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Dynamic Single Article Route */}
              <Route path="/article/:id" element={<ArticlePage />} />

              {/* Category Routes */}
              <Route
                path="/main-news"
                element={
                  <CategoryPage
                    categoryName="ප්‍රධාන පුවත්"
                    categorySlug="main-news"
                  />
                }
              />
              <Route
                path="/latest"
                element={
                  <CategoryPage
                    categoryName="අලුත් පුවත්"
                    categorySlug="latest"
                  />
                }
              />
              <Route
                path="/local"
                element={
                  <CategoryPage
                    categoryName="දේශීය පුවත්"
                    categorySlug="local"
                  />
                }
              />
              <Route
                path="/gossip"
                element={
                  <CategoryPage categoryName="ගොසිප්" categorySlug="gossip" />
                }
              />
              <Route
                path="/politics"
                element={
                  <CategoryPage
                    categoryName="දේශපාලන"
                    categorySlug="politics"
                  />
                }
              />
              <Route
                path="/business"
                element={
                  <CategoryPage
                    categoryName="ව්‍යාපාරික"
                    categorySlug="business"
                  />
                }
              />
              <Route
                path="/sports"
                element={
                  <CategoryPage categoryName="ක්‍රීඩා" categorySlug="sports" />
                }
              />
              <Route
                path="/arts"
                element={
                  <CategoryPage categoryName="කලාව" categorySlug="arts" />
                }
              />
              <Route
                path="/world"
                element={
                  <CategoryPage categoryName="විදෙස්" categorySlug="world" />
                }
              />
              <Route
                path="/library"
                element={
                  <CategoryPage
                    categoryName="පුස්තකාලය"
                    categorySlug="library"
                  />
                }
              />

              {/* Static Content Routes */}
              <Route path="/advertising" element={<AdvertisingPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
