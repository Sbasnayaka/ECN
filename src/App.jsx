import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import NewsTicker from './components/NewsTicker';
import Footer from './components/Footer';
import HeroGrid from './components/HeroGrid';
import NewsFeed from './components/NewsFeed';
import RightSidebar from './components/RightSidebar';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';

const Home = () => (
  <div className="w-full">
    <HeroGrid />
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
    </div>
  </div>
);

// Placeholder imports for static pages
const Advertising = () => <div className="p-8"><h1 className="text-3xl font-bold text-ecn-navy">Advertising</h1></div>;
const About = () => <div className="p-8"><h1 className="text-3xl font-bold text-ecn-navy">About us</h1></div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-ecn-white text-ecn-black flex flex-col">
        <Navigation />
        <NewsTicker />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Dynamic Single Article Route */}
            <Route path="/article/:id" element={<ArticlePage />} />

            {/* Category Routes */}
            <Route path="/main-news" element={<CategoryPage categoryName="ප්‍රධාන පුවත්" categorySlug="main-news" />} />
            <Route path="/latest" element={<CategoryPage categoryName="අලුත් පුවත්" categorySlug="latest" />} />
            <Route path="/local" element={<CategoryPage categoryName="දේශීය පුවත්" categorySlug="local" />} />
            <Route path="/gossip" element={<CategoryPage categoryName="ගොසිප්" categorySlug="gossip" />} />
            <Route path="/politics" element={<CategoryPage categoryName="දේශපාලන" categorySlug="politics" />} />
            <Route path="/business" element={<CategoryPage categoryName="ව්‍යාපාරික" categorySlug="business" />} />
            <Route path="/sports" element={<CategoryPage categoryName="ක්‍රීඩා" categorySlug="sports" />} />
            <Route path="/arts" element={<CategoryPage categoryName="කලාව" categorySlug="arts" />} />
            <Route path="/world" element={<CategoryPage categoryName="විදෙස්" categorySlug="world" />} />
            <Route path="/library" element={<CategoryPage categoryName="පුස්තකාලය" categorySlug="library" />} />

            {/* Static Content Routes */}
            <Route path="/advertising" element={<Advertising />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
