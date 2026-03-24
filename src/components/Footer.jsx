import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api/categoryService";
import ecnLogo from "../assets/logo.jpeg";
import fbIcon from "../assets/icons/facebook.png";
import instaIcon from "../assets/icons/instagram.png";
import tiktokIcon from "../assets/icons/tiktok.png";
import xIcon from "../assets/icons/x-icon.png";
import ytIcon from "../assets/icons/youtube.png";

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories for footer:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <footer className="bg-ecn-dark-blue text-ecn-white mt-12 py-8 border-t-4 border-ecn-navy">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={ecnLogo}
              alt="ECN Logo"
              className="h-10 md:h-12 w-auto object-contain rounded"
              style={{ maxWidth: "260px" }}
            />
          </div>
          <p className="text-gray-400 text-sm mb-4">
            ශ්‍රී ලංකාවේ ප්‍රමුඛතම සහ විශ්වාසවන්තම පුවත් වෙබ් අඩවිය. නවතම
            තොරතුරු එසැණින් ඔබ වෙත.
          </p>
        </div>

        {/* Quick Links - Dynamic Categories in 3 Columns */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            වැදගත් සබැඳි (Quick Links)
          </h3>
          {categories.length > 0 ? (
            <ul className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm text-gray-300">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">Loading categories...</p>
          )}
        </div>

        {/* Contact info + New Policy Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            අප හා සම්බන්ධ වන්න
          </h3>
          <ul className="space-y-2 text-sm text-gray-300 mb-6">
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/advertising" className="hover:text-white">
                Advertising Rates
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link to="/advertising-policy" className="hover:text-white">
                Advertising Policy
              </Link>
            </li>
            <li className="pt-2">Email: info@ecapitalnews.com</li>
            <li>Hotline: 011 234 5678</li>
          </ul>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-6 h-6 hover:opacity-80 transition cursor-pointer"
            >
              <img
                src={fbIcon}
                alt="Facebook"
                className="w-full h-full object-contain"
              />
            </a>
            <a
              href="#"
              className="w-6 h-6 hover:opacity-80 transition cursor-pointer"
            >
              <img
                src={xIcon}
                alt="X"
                className="w-full h-full object-contain"
              />
            </a>
            <a
              href="#"
              className="w-6 h-6 hover:opacity-80 transition cursor-pointer"
            >
              <img
                src={ytIcon}
                alt="YouTube"
                className="w-full h-full object-contain"
              />
            </a>
            <a
              href="#"
              className="w-6 h-6 hover:opacity-80 transition cursor-pointer"
            >
              <img
                src={instaIcon}
                alt="Instagram"
                className="w-full h-full object-contain"
              />
            </a>
            <a
              href="#"
              className="w-6 h-6 hover:opacity-80 transition cursor-pointer"
            >
              <img
                src={tiktokIcon}
                alt="TikTok"
                className="w-full h-full object-contain"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Global Bottom Copyright */}
      <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
        <p className="text-sm text-gray-400">
          © 2026 | All Rights Reserved | ecapitalnews.com | Solution by:{" "}
          <a
            href="https://www.asseminate.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Asseminate
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;