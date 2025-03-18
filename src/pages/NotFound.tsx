
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-6 py-24">
        <div className="max-w-lg text-center">
          <h1 className="text-8xl font-semibold mb-6">404</h1>
          <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            We couldn't find the page you're looking for. The page may have been moved, deleted,
            or it might never have existed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className={cn(
                "flex items-center justify-center gap-2",
                "px-6 py-3 rounded-md border border-gray-300 text-gray-800",
                "hover:bg-gray-50 transition-colors"
              )}
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className={cn(
                "flex items-center justify-center gap-2",
                "px-6 py-3 rounded-md bg-black text-white",
                "hover:bg-gray-900 transition-colors"
              )}
            >
              <Home size={18} />
              Return Home
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
