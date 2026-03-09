import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';

const CategoryPage = ({ categoryName, categorySlug }) => {
    // We use a simple counter to simulate loading more pages of articles
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Smoothly scroll to top when category changes
    useEffect(() => {
        window.scrollTo(0, 0);
        setPage(1); // Reset page count when switching categories
    }, [categorySlug]);

    // Mock data generation for this specific category
    // In Phase 5, this will be replaced with an actual API call to Cloudflare D1
    const generateArticles = (pageNumber) => {
        return Array.from({ length: 6 }).map((_, i) => ({
            id: `${categorySlug}-${pageNumber}-${i}`,
            title: `[${categoryName}] විශේෂ පුවත ${pageNumber}-${i + 1}`,
            excerpt: "මෙය මෙම පුවත පිළිබඳ කෙටි හැඳින්වීමකි. වැඩිදුර තොරතුරු කියවීම සඳහා පහත බොත්තම ඔබන්න. අපගේ වෙබ් අඩවිය අලුත්ම තොරතුරු ඔබ වෙත ගෙන එයි...",
            image: `https://via.placeholder.com/300x200/112240/ffffff?text=${categorySlug}+${pageNumber}-${i + 1}`,
            time: "පැය 2කට පෙර"
        }));
    };

    const [articles, setArticles] = useState(generateArticles(1));

    // Simulate AJAX 'Load More' functionality
    const handleLoadMore = () => {
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            const nextPageIndex = page + 1;
            const newArticles = generateArticles(nextPageIndex);
            setArticles([...articles, ...newArticles]);
            setPage(nextPageIndex);
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Category Header */}
                <div className="mb-8 border-b-4 border-ecn-navy pb-4">
                    <h1 className="text-3xl md:text-4xl font-black text-ecn-dark-blue">
                        {categoryName}
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Category Article Feed */}
                    <div className="lg:w-2/3 flex flex-col gap-6">

                        {/* Articles List */}
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
                                <div className="sm:w-2/3 flex flex-col justify-center py-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-gray-400 text-xs font-medium">🕒 {article.time}</span>
                                    </div>
                                    <Link to={`/article/${article.id}`}>
                                        <h3 className="text-xl font-bold leading-tight mb-2 hover:text-blue-600 transition-colors">
                                            {article.title}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
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

                        {/* Load More Button Engine */}
                        <div className="mt-6 mb-8 text-center bg-white p-6 border border-gray-100 shadow-sm">
                            <button
                                onClick={handleLoadMore}
                                disabled={isLoading}
                                className={`font-bold py-3 px-10 rounded transition-all ${isLoading
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-white border-2 border-ecn-navy text-ecn-navy hover:bg-ecn-navy hover:text-white'
                                    }`}
                            >
                                {isLoading ? 'පූරණය වෙමින් පවතී...' : 'තවත් පුවත් පෙන්වන්න (Load More)'}
                            </button>
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

export default CategoryPage;
