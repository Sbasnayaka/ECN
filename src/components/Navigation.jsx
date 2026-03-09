import { Link } from 'react-router-dom';

const Navigation = () => {
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
            {/* Top utility bar (Weather, Date, Socials would go here later) */}
            <div className="bg-ecn-dark-blue px-4 py-1 text-xs sm:text-sm flex justify-between items-center">
                <span>{new Date().toLocaleDateString('si-LK')}</span> {/* Shows current date */}
                <div className="flex space-x-4">
                    <Link to="/about" className="hover:text-gray-300 transition-colors">About Us</Link>
                    <Link to="/advertising" className="hover:text-gray-300 transition-colors">Advertising</Link>
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
