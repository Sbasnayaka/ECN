import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.jpeg";

const Navigation = () => {
  // State for live clock
  const [currentTime, setCurrentTime] = useState(new Date());

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
      {/* Top Sub-Bar (Date, Time, Weather, Contact Us) - Darkest Blue */}
      <div className="bg-[#000061] text-xs sm:text-sm text-gray-300 py-3 w-full border-b border-[#000080]/30">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
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
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center py-2 h-auto md:h-16">
          {/* Logo Box */}
          <Link
            to="/"
            className="mr-auto md:mr-10 mb-2 md:mb-0 shrink-0 h-14 flex items-center justify-center"
          >
            <img
              src={logoImg}
              alt="ECN Logo"
              className="h-full w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="flex flex-nowrap overflow-x-auto items-center justify-start md:justify-end gap-x-1 lg:gap-x-2 flex-1 w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-2 lg:px-2.5 py-1.5 text-[13px] lg:text-[14.5px] font-bold transition-all duration-200 whitespace-nowrap rounded hover:bg-[#000061] hover:text-blue-200 text-center"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
