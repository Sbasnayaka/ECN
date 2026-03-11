import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';

const AboutPage = () => {
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
                    <span className="text-gray-400">අප ගැන (About Us)</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Page Content */}
                    <div className="lg:w-2/3 flex flex-col bg-white p-6 md:p-10 shadow-sm border border-gray-100">

                        <header className="mb-8 border-b-2 border-ecn-navy pb-4">
                            <h1 className="text-3xl md:text-4xl font-black text-ecn-dark-blue">
                                අප ගැන (About Us)
                            </h1>
                        </header>

                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-medium">
                            <p className="mb-6">
                                <strong>E Capital News (ECN)</strong> යනු ශ්‍රී ලංකාවේ ප්‍රමුඛතම සහ විශ්වාසවන්තම පුවත් වෙබ් අඩවියයි. අපගේ අරමුණ වන්නේ දේශීය සහ ජාත්‍යන්තර තොරතුරු නොපමාව සහ නිවැරදිව ඔබ වෙත ගෙන ඒමයි.
                            </p>
                            <p className="mb-6">
                                දේශපාලන, ව්‍යාපාරික, ක්‍රීඩා සහ තොරතුරු තාක්ෂණ ආදී විවිධ ක්ෂේත්‍ර ආවරණය කරමින් පක්ෂග්‍රාහී නොවන ස්වාධීන ප්‍රවෘත්ති වාර්තාකරණයක් අපි පවත්වාගෙන යන්නෙමු. අපගේ පළපුරුදු මාධ්‍යවේදීන් සහ වාර්තාකරුවන් නිරන්තරයෙන්ම සත්‍ය තොරතුරු ඔබ වෙත ගෙන ඒමට කැපවී සිටිති.
                            </p>
                            <h3 className="text-xl font-bold text-ecn-navy mt-8 mb-4">අපගේ දැක්ම</h3>
                            <p className="mb-6">
                                වඩාත් දැනුවත් සහ බුද්ධිමත් ශ්‍රී ලාංකේය සමාජයක් නිර්මාණය කිරීම සඳහා ප්‍රමුඛතම තොරතුරු මූලාශ්‍රය බවට පත්වීම.
                            </p>
                            <h3 className="text-xl font-bold text-ecn-navy mt-8 mb-4">සම්බන්ධ කරගැනීම්</h3>
                            <ul className="list-disc pl-6 mb-6">
                                <li>විද්‍යුත් තැපෑල (Email): info@ecapitalnews.com</li>
                                <li>දුරකථන (Hotline): 011 234 5678</li>
                                <li>ලිපිනය: නො: 45, ගාලු පාර, කොළඹ 03</li>
                            </ul>
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

export default AboutPage;
