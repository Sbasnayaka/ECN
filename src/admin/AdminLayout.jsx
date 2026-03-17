import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-blue-800">ECN Admin</h2>
          <p className="text-sm text-gray-600 mt-1">{profile?.name} ({profile?.role})</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/admin" className="block p-2 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/categories" className="block p-2 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/admin/articles" className="block p-2 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                Articles
              </Link>
            </li>
            <li>
              <Link to="/admin/ads" className="block p-2 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                Advertisements
              </Link>
            </li>
            <li>
              <Link to="/admin/gallery" className="block p-2 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                Gallery
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left block p-2 rounded hover:bg-red-50 text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;