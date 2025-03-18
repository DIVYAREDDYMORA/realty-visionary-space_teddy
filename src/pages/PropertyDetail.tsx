
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { properties, formatPrice, agents } from '@/lib/data';
import { cn } from '@/lib/utils';
import { 
  ArrowLeft, ArrowRight, BedDouble, Bath, Maximize, Map, 
  Heart, Share2, Calendar, Phone, ChevronRight, Check 
} from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState(properties.find(p => p.id === id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [contactAgent, setContactAgent] = useState(agents[0]); // Default to first agent
  
  useEffect(() => {
    // If property not found, navigate to 404
    if (!property) {
      navigate('/not-found');
      return;
    }
    
    // Set random agent for this property
    const randomAgent = agents[Math.floor(Math.random() * agents.length)];
    setContactAgent(randomAgent);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id, property, navigate]);
  
  if (!property) return null;
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };
  
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  const features = [
    'Central Air Conditioning',
    'Hardwood Floors',
    'Chef\'s Kitchen',
    'Walk-in Closets',
    'High Ceilings',
    'Smart Home Technology',
    'Private Garden',
    'Fireplace',
    'Home Office',
    'Laundry Room',
    'Outdoor Entertainment Area',
    'Garage Parking',
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Property Image Gallery */}
      <div className="pt-16 md:pt-20">
        <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
          {/* Main Image */}
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="h-full w-full object-cover transition-opacity duration-500"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevImage}
            className={cn(
              "absolute left-4 top-1/2 transform -translate-y-1/2",
              "w-10 h-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center",
              "text-black hover:bg-opacity-100 transition-all duration-200"
            )}
          >
            <ArrowLeft size={20} />
          </button>
          
          <button
            onClick={handleNextImage}
            className={cn(
              "absolute right-4 top-1/2 transform -translate-y-1/2",
              "w-10 h-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center",
              "text-black hover:bg-opacity-100 transition-all duration-200"
            )}
          >
            <ArrowRight size={20} />
          </button>
          
          {/* Image Pagination */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  index === currentImageIndex ? "bg-white scale-125" : "bg-white bg-opacity-50"
                )}
              />
            ))}
          </div>
          
          {/* Back Button */}
          <button
            onClick={() => navigate('/properties')}
            className={cn(
              "absolute top-4 left-4 py-2 px-4 rounded-md",
              "bg-white bg-opacity-80 hover:bg-opacity-100",
              "flex items-center gap-2 transition-all duration-200"
            )}
          >
            <ArrowLeft size={16} />
            <span className="font-medium">Back</span>
          </button>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handleFavoriteToggle}
              className={cn(
                "py-2 px-4 rounded-md flex items-center gap-2",
                "bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200",
                isFavorite ? "text-red-500" : "text-gray-800"
              )}
            >
              <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
              <span className="font-medium">Save</span>
            </button>
            
            <button
              onClick={handleShare}
              className={cn(
                "py-2 px-4 rounded-md",
                "bg-white bg-opacity-80 hover:bg-opacity-100",
                "flex items-center gap-2 transition-all duration-200"
              )}
            >
              <Share2 size={16} />
              <span className="font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Property Details */}
      <div className="px-6 md:px-10 lg:px-16 py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {property.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-semibold mb-2">{property.title}</h1>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <Map size={18} className="mr-2" />
                  <span>{property.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl md:text-3xl font-semibold">{formatPrice(property.price)}</div>
                  
                  <div className="flex items-center divide-x divide-gray-200">
                    <div className="flex items-center pr-4">
                      <BedDouble size={20} className="mr-2 text-gray-500" />
                      <span>{property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}</span>
                    </div>
                    <div className="flex items-center px-4">
                      <Bath size={20} className="mr-2 text-gray-500" />
                      <span>{property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}</span>
                    </div>
                    <div className="flex items-center pl-4">
                      <Maximize size={20} className="mr-2 text-gray-500" />
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {property.description}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This exceptional property offers the perfect blend of luxury and functionality, 
                  designed for those who appreciate fine craftsmanship and attention to detail. 
                  The thoughtful layout provides both intimate spaces for quiet reflection and 
                  generous areas for entertaining, making it a versatile home for any lifestyle.
                </p>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Property Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check size={18} className="mr-2 text-gray-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Location</h2>
                <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    title="Property Location"
                    className="w-full h-full border-0"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=m&z=14&output=embed`}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              {/* Contact Card */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-24">
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <img
                      src={contactAgent.photo}
                      alt={contactAgent.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{contactAgent.name}</h3>
                      <p className="text-gray-500 text-sm">Luxury Property Specialist</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <button
                      className={cn(
                        "w-full bg-black text-white py-3 rounded-md font-medium",
                        "flex items-center justify-center gap-2",
                        "transition-all duration-300 transform hover:translate-y-[-2px]"
                      )}
                    >
                      <Phone size={18} />
                      {contactAgent.phone}
                    </button>
                    
                    <button
                      className={cn(
                        "w-full bg-white text-black py-3 rounded-md font-medium",
                        "border border-gray-300 flex items-center justify-center gap-2",
                        "transition-all duration-300 transform hover:translate-y-[-2px]"
                      )}
                    >
                      <Calendar size={18} />
                      Schedule a Tour
                    </button>
                  </div>
                  
                  {/* Contact Form */}
                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="font-medium mb-4">Send a Message</h3>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Properties */}
      <div className="bg-gray-50 px-6 md:px-10 lg:px-16 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">Similar Properties</h2>
              <p className="text-gray-600">You might also be interested in these properties</p>
            </div>
            
            <button
              onClick={() => navigate('/properties')}
              className="flex items-center text-gray-800 hover:text-black transition-colors"
            >
              View All
              <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties
              .filter(p => p.id !== property.id)
              .slice(0, 3)
              .map((similarProperty) => (
                <div 
                  key={similarProperty.id}
                  onClick={() => navigate(`/property/${similarProperty.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                    <img
                      src={similarProperty.images[0]}
                      alt={similarProperty.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                  
                  <h3 className="font-medium mb-1 group-hover:text-black transition-colors">{similarProperty.title}</h3>
                  <p className="text-gray-500 mb-2">{similarProperty.location}</p>
                  <p className="font-semibold">{formatPrice(similarProperty.price)}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
