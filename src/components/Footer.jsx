import { Link } from 'react-router-dom';
import fbIcon from '../assets/icons/facebook.png';
import instaIcon from '../assets/icons/instagram.png';
import tiktokIcon from '../assets/icons/tiktok.png';
import xIcon from '../assets/icons/x-icon.png';
import ytIcon from '../assets/icons/youtube.png';

const Footer = () => {
    return (
        <footer className="bg-ecn-dark-blue text-ecn-white mt-12 py-8 border-t-4 border-ecn-navy">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Brand & About */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        <span className="text-white">E Capital</span> <span className="text-blue-400">News</span>
                    </h2>
                    <p className="text-gray-400 text-sm mb-4">
                        ශ්‍රී ලංකාවේ ප්‍රමුඛතම සහ විශ්වාසවන්තම පුවත් වෙබ් අඩවිය. නවතම තොරතුරු එසැණින් ඔබ වෙත.
                    </p>
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} | All Rights Reserved | ecapitalnews.com | Solution by: <a href="https://www.asseminate.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Asseminate</a>
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">වැදගත් සබැඳි (Quick Links)</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link to="/main-news" className="hover:text-white">ප්‍රධාන පුවත්</Link></li>
                        <li><Link to="/local" className="hover:text-white">දේශීය පුවත්</Link></li>
                        <li><Link to="/politics" className="hover:text-white">දේශපාලන</Link></li>
                        <li><Link to="/sports" className="hover:text-white">ක්‍රීඩා</Link></li>
                    </ul>
                </div>

                {/* Contact info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">අප හා සම්බන්ධ වන්න</h3>
                    <ul className="space-y-2 text-sm text-gray-300 mb-6">
                        <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                        <li><Link to="/advertising" className="hover:text-white">Advertising Rates</Link></li>
                        <li className="pt-2">Email: info@ecapitalnews.com</li>
                        <li>Hotline: 011 234 5678</li>
                    </ul>
                    <div className="flex gap-4">
                        <a href="#" className="w-6 h-6 hover:opacity-80 transition cursor-pointer"><img src={fbIcon} alt="Facebook" className="w-full h-full object-contain" /></a>
                        <a href="#" className="w-6 h-6 hover:opacity-80 transition cursor-pointer"><img src={xIcon} alt="X" className="w-full h-full object-contain" /></a>
                        <a href="#" className="w-6 h-6 hover:opacity-80 transition cursor-pointer"><img src={ytIcon} alt="YouTube" className="w-full h-full object-contain" /></a>
                        <a href="#" className="w-6 h-6 hover:opacity-80 transition cursor-pointer"><img src={instaIcon} alt="Instagram" className="w-full h-full object-contain" /></a>
                        <a href="#" className="w-6 h-6 hover:opacity-80 transition cursor-pointer"><img src={tiktokIcon} alt="TikTok" className="w-full h-full object-contain" /></a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
