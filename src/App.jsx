import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import NewsTicker from './components/NewsTicker';
import Footer from './components/Footer';

// Placeholder imports for pages
const Home = () => <div className="p-8"><h1 className="text-3xl font-bold text-ecn-navy">මුල් පිටුව (Home)</h1></div>;
const MainNews = () => <div className="p-8"><h1 className="text-3xl font-bold text-ecn-navy">ප්‍රධාන පුවත් (Main News)</h1></div>;
const LatestNews = () => <div className="p-8"><h1 className="text-3xl font-bold text-ecn-navy">අලුත් පුවත් (Latest News)</h1></div>;
const LocalNews = () => <div className="p-8"><h1 className="text-3xl font-bold text-ecn-navy">දේශීය පුවත් (Local News)</h1></div>;
const Gossip = () => <div className="p-8"><h1 className="text-3xl font-bold text-ecn-navy">ගොසිප් (Gossip)</h1></div>;
const Politics = () => <div className="p-8"><h1 className="text-3xl font-bold text-ecn-navy">දේශපාලන (Politics)</h1></div>;
const Business = () => <div className="p-8"><h1 className="text-3xl font-bold text-ecn-navy">ව්‍යාපාරික (Business)</h1></div>;
const Sports = () => <div className="p-8"><h1 className="text-3xl font-bold text-ecn-navy">ක්‍රීඩා (Sports)</h1></div>;
const Arts = () => <div className="p-8"><h1 className="text-3xl font-bold text-ecn-navy">කලාව (Arts)</h1></div>;
const World = () => <div className="p-8"><h1 className="text-3xl font-bold text-ecn-navy">විදෙස් (World)</h1></div>;
const Library = () => <div className="p-8"><h1 className="text-3xl font-bold text-ecn-navy">පුස්තකාලය (Library)</h1></div>;
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
            <Route path="/main-news" element={<MainNews />} />
            <Route path="/latest" element={<LatestNews />} />
            <Route path="/local" element={<LocalNews />} />
            <Route path="/gossip" element={<Gossip />} />
            <Route path="/politics" element={<Politics />} />
            <Route path="/business" element={<Business />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/arts" element={<Arts />} />
            <Route path="/world" element={<World />} />
            <Route path="/library" element={<Library />} />
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
