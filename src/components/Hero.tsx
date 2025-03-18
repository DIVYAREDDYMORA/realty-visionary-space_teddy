
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const parallaxValue = scrollPosition * 0.5;
      heroRef.current.style.transform = `translateY(${parallaxValue}px)`;
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        ref={heroRef}
        className="absolute inset-0 h-[calc(100%+150px)] w-full bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop")' }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 sm:px-10 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <h3 className="text-white text-lg md:text-xl mb-3 opacity-90 tracking-wide">Exceptional Homes, Extraordinary Living</h3>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 tracking-tight leading-tight">
            Discover Your <br className="md:hidden" />
            Dream Property
          </h1>
          <p className="text-white text-lg md:text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Curating the finest luxury real estate for discerning clients seeking exceptional spaces and experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center mt-8">
            <button 
              onClick={() => navigate('/properties')}
              className={cn(
                "bg-white text-black px-8 py-3 rounded-md font-medium transition-all duration-300",
                "hover:bg-opacity-90 transform hover:translate-y-[-2px]"
              )}
            >
              View Properties
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className={cn(
                "bg-transparent text-white border border-white px-8 py-3 rounded-md font-medium transition-all duration-300",
                "hover:bg-white hover:bg-opacity-10 transform hover:translate-y-[-2px]"
              )}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="w-8 h-14 border-2 border-white rounded-full flex justify-center mb-2">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-[slide-down_1.5s_ease-in-out_infinite]"></div>
        </div>
        <span className="text-white text-sm">Scroll Down</span>
      </div>
    </div>
  );
};

export default Hero;
