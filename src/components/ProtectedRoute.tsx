
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // If user isn't authenticated, show an error toast
    if (!isAuthenticated) {
      toast.error("You must be logged in to access this page");
    }
  }, [isAuthenticated]);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated but has no profile data yet, redirect to profile
  if (isAuthenticated && !user?.name && window.location.pathname !== '/profile') {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
