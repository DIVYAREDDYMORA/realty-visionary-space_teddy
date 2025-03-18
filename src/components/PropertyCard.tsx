
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Property } from '@/lib/types';
import { formatPrice } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Heart, Map, BedDouble, Bath, Maximize } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div 
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className={cn(
            "h-full w-full object-cover transition-all duration-700 ease-in-out",
            "group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {/* Property Tags */}
        <div className="absolute top-4 left-4 flex gap-2">
          {property.isNewListing && (
            <span className="bg-black text-white text-xs font-medium px-2 py-1 rounded">
              New
            </span>
          )}
          {property.isFeatured && (
            <span className="bg-white text-black text-xs font-medium px-2 py-1 rounded">
              Featured
            </span>
          )}
        </div>
        
        {/* Favorite Button */}
        <button
          className={cn(
            "absolute top-4 right-4 p-2 rounded-full transition-all duration-300",
            "bg-white bg-opacity-80 hover:bg-opacity-100",
            isFavorite ? "text-red-500" : "text-gray-600"
          )}
          onClick={handleFavoriteClick}
        >
          <Heart 
            size={20} 
            fill={isFavorite ? "currentColor" : "none"} 
            className="transition-all"
          />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-medium line-clamp-1">{property.title}</h3>
          <span className="text-lg font-semibold">{formatPrice(property.price)}</span>
        </div>
        
        <div className="flex items-center text-gray-500 mb-3 text-sm">
          <Map size={16} className="mr-1" />
          <span>{property.location}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
          {property.description}
        </p>
        
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <BedDouble size={18} className="mr-1" />
            <span>{property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Bath size={18} className="mr-1" />
            <span>{property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Maximize size={18} className="mr-1" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 pointer-events-none transition-all duration-300" />
    </div>
  );
};

export default PropertyCard;
