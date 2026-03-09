import { Link } from 'react-router-dom';
import fbIcon from '../assets/icons/facebook.png';
import instaIcon from '../assets/icons/instagram.png';
import tiktokIcon from '../assets/icons/tiktok.png';
import xIcon from '../assets/icons/x-icon.png';
import ytIcon from '../assets/icons/youtube.png';

const RightSidebar = () => {
    // Mock data for the most read articles
    const mostRead = [
        { id: 8, title: "රට පුරා විදුලි කප්පාදුවක්", time: "පැය 1කට පෙර" },
        { id: 9, title: "රන් මිල යළිත් ඉහළට", time: "පැය 2කට පෙර" },
        { id: 10, title: "නව දුම්රිය කාලසටහනක් හෙට සිට", time: "පැය 4කට පෙර" },
        { id: 11, title: "ආසියානු කුසලානය සඳහා දැවැන්ත සූදානමක්", time: "පැය 5කට පෙර" },
        { id: 12, title: "ජනප්‍රිය නිළියකගේ හදිසි අභාවය", time: "පැය 7කට පෙර" }
    ];

    return (
        <aside className="w-full flex flex-col gap-8">

            {/* Ad Space 1 (Top Square) */}
            <div className="bg-gray-100 p-4 shrink-0 flex items-center justify-center border border-gray-200">
                <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    Advertisement Space (300x250)
                </div>
            </div>

            {/* Social Connect Widget */}
            <div className="bg-ecn-navy text-white p-6 shadow-md rounded-t border-b-4 border-ecn-dark-blue">
                <h3 className="text-xl font-bold mb-4">අප හා සම්බන්ධ වන්න</h3>
                <div className="flex gap-4 mb-4">
                    <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition cursor-pointer"><img src={fbIcon} alt="Facebook" className="w-full h-full object-contain" /></a>
                    <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition cursor-pointer"><img src={xIcon} alt="X" className="w-full h-full object-contain" /></a>
                    <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition cursor-pointer"><img src={ytIcon} alt="YouTube" className="w-full h-full object-contain" /></a>
                    <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition cursor-pointer"><img src={instaIcon} alt="Instagram" className="w-full h-full object-contain" /></a>
                    <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition cursor-pointer"><img src={tiktokIcon} alt="TikTok" className="w-full h-full object-contain" /></a>
                </div>
                <p className="text-sm text-gray-200">නවතම පුවත් සඳහා අපගේ සමාජ මාධ්‍ය ජාලයන් හා එක්වන්න.</p>
            </div>

            {/* Most Read (Trending) Section */}
            <div className="bg-white border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold p-4 bg-ecn-dark-blue text-white">වැඩිපුරම කියවූ පුවත්</h3>
                <div className="flex flex-col">
                    {mostRead.map((article, index) => (
                        <Link
                            key={article.id}
                            to={`/article/${article.id}`}
                            className="flex gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                        >
                            <div className="text-3xl font-black text-gray-200 group-hover:text-ecn-navy transition-colors">
                                {index + 1}
                            </div>
                            <div className="flex flex-col justify-center">
                                <h4 className="font-bold text-sm leading-snug group-hover:text-ecn-dark-blue transition-colors">
                                    {article.title}
                                </h4>
                                <span className="text-gray-400 text-[10px] mt-1">{article.time}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Ad Space 2 (Skyscraper) */}
            <div className="bg-gray-100 p-4 shrink-0 flex items-center justify-center border border-gray-200">
                <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    Advertisement Space (300x600)
                </div>
            </div>

        </aside>
    );
};

export default RightSidebar;
