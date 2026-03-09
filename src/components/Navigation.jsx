import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    // State for live clock
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Format date in a user-friendly Sinhala format
    const formatSinhalaDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('si-LK', options);
    };

    // Format time (e.g., 10:30 AM)
    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    // Array of our 13 categories as defined in the plan
    const navLinks = [
        { name: 'මුල් පිටුව', path: '/' },
        { name: 'ප්‍රධාන පුවත්', path: '/main-news' },
        { name: 'අලුත් පුවත්', path: '/latest' },
        { name: 'දේශීය පුවත්', path: '/local' },
        { name: 'ගොසිප්', path: '/gossip' },
        { name: 'දේශපාලන', path: '/politics' },
        { name: 'ව්‍යාපාරික', path: '/business' },
        { name: 'ක්‍රීඩා', path: '/sports' },
        { name: 'කලාව', path: '/arts' },
        { name: 'විදෙස්', path: '/world' },
        { name: 'පුස්තකාලය', path: '/library' },
    ];

    return (
        <header className="bg-ecn-navy text-ecn-white sticky top-0 z-50 shadow-md">
            {/* Top utility bar (Weather, Date, Socials) */}
            <div className="bg-ecn-dark-blue px-4 py-2 text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-blue-900/50">

                {/* Left Side: Date & Time */}
                <div className="flex items-center gap-3 text-gray-200">
                    <span className="flex items-center gap-1 font-medium tracking-wide">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        {formatSinhalaDate(currentTime)}
                    </span>
                    <span className="hidden sm:inline text-gray-500">|</span>
                    <span className="flex items-center gap-1 font-bold text-white">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {formatTime(currentTime)}
                    </span>
                </div>

                {/* Right Side: Weather & Links */}
                <div className="flex items-center gap-4">
                    {/* Mock Weather Widget */}
                    <div className="flex items-center gap-1 bg-ecn-navy px-2 py-1 rounded text-white font-medium border border-blue-800">
                        <span className="text-yellow-400 text-base">🌤️</span>
                        <span>කොළඹ 32°C</span>
                    </div>

                    {/* Utility Links */}
                    <div className="hidden sm:flex space-x-3 border-l border-gray-600 pl-4">
                        <Link to="/about" className="hover:text-blue-300 transition-colors">About Us</Link>
                        <Link to="/advertising" className="hover:text-blue-300 transition-colors">Advertising</Link>
                    </div>
                </div>
            </div>

            {/* Main Logo and Category Navigation area */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center py-4">

                    {/* Logo Placeholder */}
                    <Link to="/" className="text-3xl font-bold tracking-tight mb-4 md:mb-0">
                        <span className="text-white">E Capital</span> <span className="text-blue-400">News</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="hover:text-blue-300 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button - We'll add interactivity later, keeping it minimal for now */}
                    <button className="md:hidden border border-ecn-white px-3 py-1 rounded">
                        මෙනුව (Menu)
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navigation;
