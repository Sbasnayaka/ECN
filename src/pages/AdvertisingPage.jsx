import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';

const AdvertisingPage = () => {
    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Breadcrumb Navigation */}
                <div className="flex gap-2 text-sm text-gray-500 mb-6 font-medium">
                    <Link to="/" className="hover:text-ecn-navy transition-colors">මුල් පිටුව</Link>
                    <span>/</span>
                    <span className="text-gray-400">වෙළඳ දැන්වීම් (Advertising)</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Page Content */}
                    <div className="lg:w-2/3 flex flex-col bg-white p-6 md:p-10 shadow-sm border border-gray-100">

                        <header className="mb-8 border-b-2 border-ecn-navy pb-4">
                            <h1 className="text-3xl md:text-4xl font-black text-ecn-dark-blue">
                                වෙළඳ දැන්වීම් සඳහා (Advertising)
                            </h1>
                        </header>

                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-medium">
                            <p className="mb-6 border-l-4 border-red-500 pl-4 bg-gray-50 py-2">
                                දිනකට ලක්ෂ ගණනක් පිවිසෙන ශ්‍රී ලංකාවේ වේගවත්ම පුවත් වෙබ් අඩවිය හරහා ඔබේ ව්‍යාපාරය ජනගත කරන්න.
                            </p>

                            <h3 className="text-2xl font-bold text-ecn-navy mt-8 mb-4">අපගේ දැන්වීම් පැකේජ</h3>

                            <div className="flex flex-col gap-4 mt-6">
                                {/* Package 1 */}
                                <div className="border border-gray-200 rounded p-4 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
                                    <div>
                                        <h4 className="font-bold text-lg text-ecn-dark-blue">Top Leaderboard (728x90)</h4>
                                        <p className="text-sm text-gray-600 mt-1">සියලුම පිටුවල ඉහළින්ම දර්ශනය වේ. ඉහළම ආකර්ෂණය.</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="bg-ecn-navy text-white px-3 py-1 rounded text-sm font-bold">Contact Us</span>
                                    </div>
                                </div>

                                {/* Package 2 */}
                                <div className="border border-gray-200 rounded p-4 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
                                    <div>
                                        <h4 className="font-bold text-lg text-ecn-dark-blue">Sidebar Square (300x250)</h4>
                                        <p className="text-sm text-gray-600 mt-1">මුල් පිටුව සහ ලිපි පිටුවල දකුණු පස තීරුවේ දිස්වේ.</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="bg-ecn-navy text-white px-3 py-1 rounded text-sm font-bold">Contact Us</span>
                                    </div>
                                </div>

                                {/* Package 3 */}
                                <div className="border border-gray-200 rounded p-4 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
                                    <div>
                                        <h4 className="font-bold text-lg text-ecn-dark-blue">Sponsored Articles (PR)</h4>
                                        <p className="text-sm text-gray-600 mt-1">ඔබගේ නිෂ්පාදනය හෝ සේවාව පිළිබඳ විශේෂ ලිපි පළකිරීම.</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="bg-ecn-navy text-white px-3 py-1 rounded text-sm font-bold">Contact Us</span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-ecn-navy mt-10 mb-4">දැන්වීම් සඳහා විමසීම්</h3>
                            <p className="mb-2"><strong>දුරකථන:</strong> 077 123 4567 | 011 234 5678</p>
                            <p className="mb-6"><strong>විද්‍යුත් තැපෑල:</strong> marketing@ecapitalnews.com</p>

                        </div>
                    </div>

                    {/* Right Column: Persistent Sidebar */}
                    <div className="lg:w-1/3">
                        <RightSidebar />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdvertisingPage;
