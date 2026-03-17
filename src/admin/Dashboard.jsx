import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { profile } = useAuth();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-lg">Welcome, {profile?.name}!</p>
        <p className="text-gray-600 mt-2">You are logged in as {profile?.role}. Use the sidebar to manage content.</p>
      </div>
    </div>
  );
};

export default Dashboard;