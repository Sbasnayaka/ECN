import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.jpeg";
import searchIcon from "../assets/icons/search.png";

const Navigation = () => {
  // State for live clock
  const [currentTime, setCurrentTime] = useState(new Date());
  // State for mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date in a user-friendly format (Matching Figma: Tuesday, March 10, 2026)
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Format time (Matching Figma: 09:10 AM)
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Array of our categories mapping to page 1 to 11
  const navLinks = [
    { name: "මුල් පිටුව", path: "/" },
    { name: "ප්‍රධාන පුවත්", path: "/main-news" },
    { name: "අලුත් පුවත්", path: "/latest" },
    { name: "දේශීය පුවත්", path: "/local" },
    { name: "ගොසිප්", path: "/gossip" },
    { name: "දේශපාලන", path: "/politics" },
    { name: "ව්‍යාපාරික", path: "/business" },
    { name: "ක්‍රීඩා", path: "/sports" },
    { name: "කලාව", path: "/arts" },
    { name: "විදෙස්", path: "/world" },
    { name: "පුස්තකාලය", path: "/library" },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Sub-Bar (Date, Time, Weather, Contact Us) - Darkest Blue (Hidden on Mobile) */}
      <div className="hidden md:block bg-[#000061] text-xs sm:text-sm text-gray-300 py-3 w-full border-b border-[#000080]/30">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Left: Date & Time Pill Shapes */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-[#000080] rounded px-4 py-1.5 bg-transparent">
              <span className="mr-2 text-blue-400">📅</span>
              {formatDate(currentTime)}
            </div>
            <span className="text-[#000080] hidden sm:inline">|</span>
            <div className="flex items-center border border-[#000080] rounded px-4 py-1.5 bg-transparent">
              <span className="mr-2 text-gray-400">🕒</span>
              {formatTime(currentTime)}
            </div>
          </div>

          {/* Right: Weather & Ad Contact */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-[#000080] rounded px-4 py-1.5 bg-transparent">
              <span className="text-yellow-400 mr-2">🌤️</span>
              Weather
            </div>
            <span className="text-[#000080] hidden sm:inline">|</span>
            <Link
              to="/advertising"
              className="border border-[#000080] rounded px-4 py-1.5 bg-transparent text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              Advertisement Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Primary Navy Blue */}
      <div className="bg-[#000080] w-full text-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between py-2 h-16">
            {/* Mobile: Hamburger Menu (Left) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 z-50"
              aria-label="Toggle Menu"
            >
              <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>

            {/* Logo - Centered on mobile, Left on desktop */}
            <Link
              to="/"
              className={`flex items-center justify-center shrink-0 h-10 md:h-12 transition-all duration-300 ${isMenuOpen ? 'opacity-20' : 'opacity-100'} md:opacity-100 md:mr-10 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0`}
            >
              <img
                src={logoImg}
                alt="ECN Logo"
                className="h-full w-auto object-contain rounded"
              />
            </Link>

            {/* Mobile: Search Icon (Right) */}
            <button className="md:hidden p-2 text-white" aria-label="Search">
              <img 
                src={searchIcon} 
                alt="Search" 
                className="w-6 h-6 invert brightness-0" 
              />
            </button>

            {/* Desktop Navigation Links (Hidden on mobile) */}
            <nav className="hidden md:flex flex-nowrap items-center justify-end gap-x-1.5 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-2 py-1.5 text-sm lg:text-[15px] font-bold transition-all duration-200 whitespace-nowrap rounded hover:bg-[#000061] hover:text-blue-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Overlay) */}
      <div
        className={`fixed inset-0 top-[64px] bg-[#000080] z-40 transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-6 gap-4 overflow-y-auto h-full">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="py-2 text-lg font-bold text-white border-b border-white/10 hover:text-blue-300"
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile-only utility links previously in top bar */}
          <div className="mt-8 pt-8 border-t border-white/20 flex flex-col gap-4">
             <Link to="/about" className="text-sm text-gray-300" onClick={() => setIsMenuOpen(false)}>About Us</Link>
             <Link to="/advertising" className="text-sm text-yellow-500" onClick={() => setIsMenuOpen(false)}>Advertisement Contact Us</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
