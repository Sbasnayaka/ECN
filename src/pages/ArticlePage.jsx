import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';

const ArticlePage = () => {
    // useParams allows us to get the :id from the URL (e.g. /article/123 -> id is "123")
    const { id } = useParams();

    // Scroll to the top of the page whenever a new article is loaded
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Mock Article Data (In Phase 5, we will fetch this specific ID from Cloudflare D1)
    const articleInfo = {
        title: "ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජයේ නවතම ආර්ථික ප්‍රතිසංස්කරණ",
        category: "ව්‍යාපාරික",
        author: "ප්‍රවෘත්ති අංශය",
        publishedAt: "2023-11-20 | පෙ.ව. 10:30",
        imageUrl: "https://via.placeholder.com/800x400/112240/ffffff?text=Full+Article+Image",
        content: `
            මෙරට ආර්ථිකය ශක්තිමත් කිරීමේ අරමුණින් රජය විසින් නවතම ආර්ථික ප්‍රතිසංස්කරණ ක්‍රියාවලියක් හඳුන්වා දී ඇත. මෙම වැඩපිළිවෙළ යටතේ අපනයන කර්මාන්ත දිරිගැන්වීම සහ දේශීය නිෂ්පාදන ඉහළ නැංවීම සඳහා විශේෂ අවධානයක් යොමු කර තිබේ.
            
            මීට අමතරව, විදේශ ආයෝජන ආකර්ෂණය කර ගැනීම සඳහා නව ආයෝජන කලාප කිහිපයක් ස්ථාපිත කිරීමටද යෝජනා වී ඇත. මෙමගින් ඉදිරි වසර 5 තුළ රැකියා අවස්ථා ලක්ෂයක් පමණ නිර්මාණය වනු ඇතැයි අපේක්ෂා කෙරේ.
            
            මෙම නව ආර්ථික ක්‍රමෝපාය පිළිබඳව අදහස් දක්වමින් මුදල් අමාත්‍යාංශයේ ජ්‍යෙෂ්ඨ නිලධාරියෙකු ප්‍රකාශ කළේ, මෙය රටේ දිගුකාලීන ආර්ථික ස්ථාවරත්වය තහවුරු කිරීමේ තීරණාත්මක පියවරක් බවයි. විශේෂයෙන්ම ඩිජිටල් ආර්ථිකයක් කරා ගමන් කිරීමේ අවශ්‍යතාව ඔහු අවධාරණය කළේය.
            
            තවද, සුළු හා මධ්‍ය පරිමාණ ව්‍යාපාරිකයින්ට සහනදායී ණය යෝජනා ක්‍රමයක් හඳුන්වා දීමටද රජය සැලසුම් කර ඇත. මෙමඟින් දේශීය ව්‍යවසායකයින්ට විශාල පිටිවහලක් ලැබෙනු ඇතැයි විශ්වාස කෙරේ.
        `
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Breadcrumb Navigation */}
                <div className="flex gap-2 text-sm text-gray-500 mb-6 font-medium">
                    <Link to="/" className="hover:text-ecn-navy transition-colors">මුල් පිටුව</Link>
                    <span>/</span>
                    <Link to="/business" className="hover:text-ecn-navy transition-colors">{articleInfo.category}</Link>
                    <span>/</span>
                    <span className="text-gray-400">පුවත</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Full Article Reading Area */}
                    <div className="lg:w-2/3 flex flex-col bg-white p-6 md:p-8 shadow-sm border border-gray-100">

                        {/* Article Header */}
                        <header className="mb-6">
                            <span className="bg-ecn-navy text-white text-xs px-3 py-1 font-bold inline-block mb-4">
                                {articleInfo.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-ecn-dark-blue leading-tight mb-4">
                                {articleInfo.title}
                            </h1>

                            {/* Author & Date Info */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-500 border-t border-b border-gray-100 py-3 mt-4">
                                <span className="font-bold text-gray-700">✍️ {articleInfo.author}</span>
                                <span>🕒 දින: {articleInfo.publishedAt}</span>
                                <span className="text-xs ml-auto">👁️ දර්ශන: 1,245</span>
                            </div>
                        </header>

                        {/* Featured Image */}
                        <div className="w-full mb-8">
                            <img
                                src={articleInfo.imageUrl}
                                alt={articleInfo.title}
                                className="w-full h-auto object-cover rounded"
                            />
                        </div>

                        {/* Article Body Content */}
                        <div className="max-w-none text-gray-800 font-medium">
                            {/* Rendering paragraphs with premium editorial CSS */}
                            {articleInfo.content.split('\n\n').map((paragraph, index) => (
                                <p
                                    key={index}
                                    className={`mb-6 text-[17px] md:text-[19px] leading-[1.8] md:leading-[2] text-justify ${index === 0
                                            ? 'first-letter:text-6xl first-letter:font-black first-letter:text-ecn-navy first-letter:bg-blue-50 first-letter:px-2 first-letter:py-1 first-letter:mr-3 first-letter:float-left first-letter:rounded first-letter:-mt-2'
                                            : ''
                                        }`}
                                >
                                    {paragraph.trim()}
                                </p>
                            ))}
                        </div>

                        {/* Social Share Footer Context */}
                        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                            <span className="font-bold text-ecn-navy">මෙම පුවත බෙදාගන්න:</span>
                            <div className="flex gap-3">
                                {/* Placeholders for social share buttons */}
                                <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded hover:bg-blue-700 transition">Facebook</button>
                                <button className="bg-green-500 text-white text-xs px-4 py-2 rounded hover:bg-green-600 transition">WhatsApp</button>
                                <button className="bg-gray-800 text-white text-xs px-4 py-2 rounded hover:bg-gray-900 transition">X (Twitter)</button>
                            </div>
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

export default ArticlePage;
