import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.jpeg";
import searchIcon from "../assets/icons/search.png";

const Navigation = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
      {/* Top Bar – Date, Time, Weather, Ad Contact – compact, no border */}
      <div className="hidden md:block bg-[#000061] text-gray-300 py-1 text-xs">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              <span className="text-blue-400 text-xs">📅</span>
              <span className="text-[11px]">{formatDate(currentTime)}</span>
            </div>
            <span className="text-[#000080]/40 text-xs">|</span>
            <div className="flex items-center gap-0.5">
              <span className="text-gray-400 text-xs">🕒</span>
              <span className="text-[11px]">{formatTime(currentTime)}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              <span className="text-yellow-400 text-xs">🌤️</span>
              <span className="text-[11px]">Weather</span>
            </div>
            <span className="text-[#000080]/40 text-xs">|</span>
            <Link
              to="/advertising"
              className="text-yellow-500 hover:text-yellow-400 transition-colors text-[11px]"
            >
              Advertisement Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-[#000080] w-full text-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between py-1 min-h-[56px]">
            {/* Logo – left on all devices, larger */}
            <Link to="/" className="shrink-0">
              <img
                src={logoImg}
                alt="ECN Logo"
                className="h-10 md:h-12 w-auto object-contain rounded"
                style={{ maxWidth: "260px" }}
              />
            </Link>

            {/* Desktop Navigation Links (hidden on mobile) – smaller font */}
            <nav className="hidden md:flex items-center gap-x-0.5 flex-1 justify-end">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-1 py-0.5 text-[10px] lg:text-[11px] font-bold whitespace-nowrap rounded hover:bg-[#000061] hover:text-blue-200 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile: Right icons (Search + Hamburger) */}
            <div className="flex items-center gap-2 md:hidden">
              <button className="p-1 text-white" aria-label="Search">
                <img
                  src={searchIcon}
                  alt="Search"
                  className="w-4 h-4 invert brightness-0"
                />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col gap-1 p-1"
                aria-label="Toggle Menu"
              >
                <div className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-[56px] bg-[#000080] z-40 transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-5 gap-3 overflow-y-auto h-full">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="py-2 text-base font-bold text-white border-b border-white/10 hover:text-blue-300"
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-6 pt-6 border-t border-white/20 flex flex-col gap-3">
            <Link to="/about" className="text-xs text-gray-300" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/advertising" className="text-xs text-yellow-500" onClick={() => setIsMenuOpen(false)}>Advertisement Contact Us</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;