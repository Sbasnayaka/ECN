import { Link } from 'react-router-dom';

const NewsFeed = () => {
    // Mock data for the news feed
    const articles = [
        {
            id: 4,
            title: "අධ්‍යාපන අමාත්‍යාංශයෙන් ගුරුවරුන්ට විශේෂ නිවේදනයක්",
            excerpt: "දිවයිනේ සියලුම රජයේ පාසල්වල ගුරුවරුන් සඳහා නව චක්‍රලේඛයක් නිකුත් කිරීමට අධ්‍යාපන අමාත්‍යාංශය පියවර ගෙන ඇත...",
            image: "https://via.placeholder.com/300x200/112240/ffffff?text=Education+News",
            category: "දේශීය පුවත්",
            time: "පැයකට පෙර"
        },
        {
            id: 5,
            title: "විදෙස්ගත ශ්‍රමිකයින්ගේ ප්‍රේෂණ යළිත් ඉහළට",
            excerpt: "පසුගිය මාසයට සාපේක්ෂව මෙම මාසයේදී විදෙස්ගත ශ්‍රී ලාංකිකයින් එවන ලද විදේශ විනිමය ප්‍රමාණය සියයට 15කින් වර්ධනය වී තිබේ...",
            image: "https://via.placeholder.com/300x200/112240/ffffff?text=Economy+News",
            category: "ව්‍යාපාරික",
            time: "පැය 3කට පෙර"
        },
        {
            id: 6,
            title: "නව චිත්‍රපටයක් ළඟදීම තිරයට",
            excerpt: "ශ්‍රී ලාංකේය සිනමාවට නව මානයක් එක් කරමින්, ප්‍රවීණ අධ්‍යක්ෂවරයෙකුගේ නවතම සිනමා සිත්තම ලබන මස ප්‍රදර්ශනය ඇරඹේ...",
            image: "https://via.placeholder.com/300x200/112240/ffffff?text=Arts+News",
            category: "කලාව",
            time: "පැය 6කට පෙර"
        },
        {
            id: 7,
            title: "ජාතික රෝහලට නවීන වෛද්‍ය උපකරණ තොගයක්",
            excerpt: "විදේශ ආධාර යටතේ කොළඹ ජාතික රෝහල වෙත රුපියල් මිලියන 500ක් වටිනා නවීන වෛද්‍ය උපකරණ තොගයක් අද දින ලබාදෙන ලදී...",
            image: "https://via.placeholder.com/300x200/112240/ffffff?text=Health+News",
            category: "දේශීය පුවත්",
            time: "පැය 8කට පෙර"
        }
    ];

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold border-b-2 border-ecn-navy pb-2 mb-2">
                <span className="bg-ecn-navy text-white px-4 py-1 inline-block">නවතම පුවත්</span>
            </h2>

            <div className="flex flex-col gap-6">
                {articles.map((article) => (
                    <article key={article.id} className="flex flex-col sm:flex-row gap-4 bg-white p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        {/* Thumbnail */}
                        <div className="sm:w-1/3 shrink-0 overflow-hidden">
                            <Link to={`/article/${article.id}`}>
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-48 sm:h-full object-cover rounded hover:scale-105 transition-transform duration-300"
                                />
                            </Link>
                        </div>

                        {/* Content */}
                        <div className="sm:w-2/3 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-ecn-navy font-bold text-[11px] uppercase tracking-wider">{article.category}</span>
                                <span className="text-gray-400 text-[11px]">• {article.time}</span>
                            </div>
                            <Link to={`/article/${article.id}`}>
                                <h3 className="text-xl font-bold leading-tight mb-2 hover:text-ecn-dark-blue transition-colors">
                                    {article.title}
                                </h3>
                            </Link>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {article.excerpt}
                            </p>
                            <div>
                                <Link to={`/article/${article.id}`} className="inline-block bg-ecn-navy text-white text-xs font-medium px-4 py-2 hover:bg-ecn-dark-blue transition-colors rounded">
                                    තව කියවන්න (Read More)
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Load More Button */}
            <div className="mt-8 text-center bg-gray-50 py-4 border border-gray-200">
                <button className="bg-white border-2 border-ecn-navy text-ecn-navy hover:bg-ecn-navy hover:text-white font-bold py-2 px-8 rounded transition-colors">
                    පැරණි පුවත් පෙන්වන්න (Load More)
                </button>
            </div>
        </div>
    );
};

export default NewsFeed;
