
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Search } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navbarClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 lg:px-16',
    {
      'py-4 bg-transparent': !isScrolled && !isMobileMenuOpen,
      'py-3 bg-white bg-opacity-90 backdrop-blur-md shadow-sm': isScrolled || isMobileMenuOpen,
    }
  );

  const linkClasses = 'transition-all duration-200 px-2 py-1 rounded-md hover:bg-black hover:bg-opacity-5 relative group';
  const activeLinkClasses = 'font-medium';
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={navbarClasses}>
      <div className="flex items-center justify-between h-full max-w-[1400px] mx-auto">
        <Link 
          to="/" 
          className="text-xl font-semibold tracking-tighter md:text-2xl opacity-90 hover:opacity-100 transition-opacity duration-200"
        >
          Dreamscape
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={cn(linkClasses, isActive('/') && activeLinkClasses)}
          >
            Home
            {isActive('/') && (
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-black mx-auto w-1/2 mt-0.5" />
            )}
          </Link>
          <Link 
            to="/properties" 
            className={cn(linkClasses, isActive('/properties') && activeLinkClasses)}
          >
            Properties
            {isActive('/properties') && (
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-black mx-auto w-1/2 mt-0.5" />
            )}
          </Link>
          <Link 
            to="/contact" 
            className={cn(linkClasses, isActive('/contact') && activeLinkClasses)}
          >
            Contact
            {isActive('/contact') && (
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-black mx-auto w-1/2 mt-0.5" />
            )}
          </Link>
          <button className="flex items-center justify-center p-2 rounded-full hover:bg-black hover:bg-opacity-5 transition-all duration-200">
            <Search size={20} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden p-2 rounded-md focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 md:hidden glass-effect animate-slide-down">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={cn(
                "px-2 py-2 rounded-md transition-colors", 
                isActive('/') ? "bg-black bg-opacity-5 font-medium" : "hover:bg-black hover:bg-opacity-5"
              )}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className={cn(
                "px-2 py-2 rounded-md transition-colors", 
                isActive('/properties') ? "bg-black bg-opacity-5 font-medium" : "hover:bg-black hover:bg-opacity-5"
              )}
            >
              Properties
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "px-2 py-2 rounded-md transition-colors", 
                isActive('/contact') ? "bg-black bg-opacity-5 font-medium" : "hover:bg-black hover:bg-opacity-5"
              )}
            >
              Contact
            </Link>
            <div className="pt-2 pb-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
