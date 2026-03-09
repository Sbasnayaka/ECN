import { Link } from 'react-router-dom';

const NewsTicker = () => {
    // Mock data for the ticker. Later this will come from the backend.
    const breakingNews = [
        "කොළඹ වරාය නගරයේ නව ව්‍යාපෘතියක් අරඹයි.",
        "ශ්‍රී ලංකා ක්‍රිකට් කණ්ඩායම නව පුහුණුකරුවෙකු පත් කරයි.",
        "රන් මිලෙහි විශාල වෙනසක් - මහ බැංකුවෙන් නිවේදනයක්.",
        "උසස් පෙළ විභාග ප්‍රතිඵල ලබන සතියේ නිකුත් කෙරේ."
    ];

    return (
        <div className="bg-red-600 text-white flex items-center shadow border-b-2 border-red-700 overflow-hidden">
            {/* Label */}
            <div className="bg-ecn-navy px-4 py-2 font-bold whitespace-nowrap z-10 flex items-center">
                <span className="animate-pulse mr-2 h-2 w-2 bg-red-500 rounded-full"></span>
                උණුසුම් පුවත්
            </div>

            {/* Scrolling Text Container */}
            <div className="flex-1 overflow-hidden relative h-full">
                {/* The 'animate-marquee' tailwind class will be added later for real scrolling. 
            For now, we use a simple flex row with overflow hidden to simulate the setup safely. */}
                <div className="flex whitespace-nowrap items-center py-2 px-4 space-x-8">
                    {breakingNews.map((news, index) => (
                        <Link key={index} to="/latest" className="hover:underline text-sm md:text-base">
                            {news}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsTicker;
