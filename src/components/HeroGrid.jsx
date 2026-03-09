import { Link } from 'react-router-dom';

const HeroGrid = () => {
    // Mock data for the hero section
    const mainStory = {
        id: 1,
        title: "ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජයේ නව ජනාධිපතිඳුන් අද දිවුරුම් දෙයි",
        image: "https://via.placeholder.com/800x500/0a192f/ffffff?text=Main+Story+Image",
        category: "ප්‍රධාන පුවත්",
        time: "පැය 2කට පෙර"
    };

    const secondaryStories = [
        {
            id: 2,
            title: "කොළඹ කොටස් වෙළෙඳපොළේ කැපී පෙනෙන වර්ධනයක්",
            image: "https://via.placeholder.com/400x250/112240/ffffff?text=Business+News",
            category: "ව්‍යාපාරික",
            time: "පැය 4කට පෙර"
        },
        {
            id: 3,
            title: "ලෝක කුසලාන ක්‍රිකට් තරගාවලියට ශ්‍රී ලංකා සංචිතය නම් කෙරේ",
            image: "https://via.placeholder.com/400x250/112240/ffffff?text=Sports+News",
            category: "ක්‍රීඩා",
            time: "පැය 5කට පෙර"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-4">

                {/* Main Story (Left Side - Larger) */}
                <div className="lg:w-2/3 relative group overflow-hidden bg-ecn-dark-blue rounded shadow-lg">
                    <Link to={`/article/${mainStory.id}`}>
                        <img
                            src={mainStory.image}
                            alt={mainStory.title}
                            className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-ecn-black via-transparent to-transparent opacity-90"></div>

                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase rounded mb-3 inline-block">
                                {mainStory.category}
                            </span>
                            <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight hover:text-blue-300 transition-colors">
                                {mainStory.title}
                            </h1>
                            <span className="text-gray-300 text-sm mt-2 block">{mainStory.time}</span>
                        </div>
                    </Link>
                </div>

                {/* Secondary Stories (Right Side - Stacked) */}
                <div className="lg:w-1/3 flex flex-col gap-4">
                    {secondaryStories.map((story) => (
                        <div key={story.id} className="relative group overflow-hidden bg-ecn-navy rounded shadow-lg flex-1">
                            <Link to={`/article/${story.id}`}>
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    className="w-full h-full min-h-[200px] lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ecn-black via-ecn-black/70 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 p-4 w-full">
                                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 uppercase rounded mb-2 inline-block">
                                        {story.category}
                                    </span>
                                    <h2 className="text-white text-lg md:text-xl font-bold leading-snug hover:text-blue-300 transition-colors">
                                        {story.title}
                                    </h2>
                                    <span className="text-gray-300 text-xs mt-1 block">{story.time}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default HeroGrid;
