import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = ['admin', 'editor'] }) => {
  const { user, profile, loading } = useAuth();

  // Add detailed logging for debugging
  console.log('ProtectedRoute - loading:', loading, 'user:', user, 'profile:', profile);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    console.log('No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (!profile || !allowedRoles.includes(profile.role)) {
    console.log('User has no profile or insufficient role, redirecting to home');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;