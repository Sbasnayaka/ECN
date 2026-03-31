import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
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
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/Dashboard';
import Categories from './admin/Categories';
import Articles from './admin/Articles';
import Ads from './admin/Ads';
import GalleryAdmin from './admin/Gallery';
import ChangePassword from './admin/ChangePassword';
import TopBannerSlider from "./components/TopBannerSlider";
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import AdvertisingPolicy from './pages/AdvertisingPolicy';
import YouTubeSettings from './admin/YouTubeSettings';
import GalleryItemPage from './pages/GalleryItemPage';
import AdDashboard from './admin/AdDashboard';
import CreateEditor from './admin/CreateEditor';

const Home = () => (
  <div className="w-full">
    <div className="max-w-[1200px] mx-auto px-4 py-2">
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
        <div className="w-full max-w-[1200px] bg-white flex flex-col shadow-2xl min-h-screen">
          <Navigation />
          <NewsTicker />
          <div className="w-full pt-4 md:pt-6 bg-white">
            <div className="max-w-[1200px] mx-auto px-4">
              <TopBannerSlider />
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
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="categories" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Categories />
                  </ProtectedRoute>
                } />
                <Route path="articles" element={
                  <ProtectedRoute allowedRoles={['admin', 'editor']}>
                    <Articles />
                  </ProtectedRoute>
                } />

                <Route path="ads" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Ads />
                  </ProtectedRoute>
                } />

                <Route path="ad-dashboard" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdDashboard />
                  </ProtectedRoute>
                } />

                <Route path="gallery" element={
                  <ProtectedRoute allowedRoles={['admin', 'editor']}>
                    <GalleryAdmin />
                  </ProtectedRoute>
                } />

                <Route path="youTubeSettings" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <YouTubeSettings />
                  </ProtectedRoute>
                } />

                <Route path="create-editor" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CreateEditor />
                  </ProtectedRoute>
                } />

                <Route path="change-password" element={
                  <ProtectedRoute allowedRoles={['admin', 'editor']}>
                    <ChangePassword />
                  </ProtectedRoute>
                } />
              </Route>


              {/* Static Content Routes */}
              <Route path="/advertising" element={<AdvertisingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/advertising-policy" element={<AdvertisingPolicy />} />
              <Route path="/gallery/:id" element={<GalleryItemPage />} />
            </Routes>

          </main>
          <Footer />
        </div>
      </div>
    </Router>

  );
}

export default App;
