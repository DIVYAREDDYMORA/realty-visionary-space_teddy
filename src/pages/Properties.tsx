
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';
import { properties } from '@/lib/data';
import { Property } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const Properties = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: '',
    selectedTags: [] as string[],
  });
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  
  // Extract all unique tags from properties
  const allTags = Array.from(new Set(properties.flatMap(property => property.tags)));

  // Get query params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');
    
    if (typeParam) {
      setFilters(prev => ({
        ...prev,
        selectedTags: [typeParam],
      }));
    }
  }, [location.search]);

  // Filter properties based on search and filters
  useEffect(() => {
    let filtered = [...properties];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(term) ||
        property.location.toLowerCase().includes(term) ||
        property.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= Number(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= Number(filters.maxPrice));
    }
    
    // Filter by beds
    if (filters.beds) {
      filtered = filtered.filter(property => property.beds >= Number(filters.beds));
    }
    
    // Filter by baths
    if (filters.baths) {
      filtered = filtered.filter(property => property.baths >= Number(filters.baths));
    }
    
    // Filter by tags
    if (filters.selectedTags.length > 0) {
      filtered = filtered.filter(property => 
        filters.selectedTags.some(tag => 
          property.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
        )
      );
    }
    
    setFilteredProperties(filtered);
  }, [searchTerm, filters]);
  
  const handleFilterChange = (name: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTagToggle = (tag: string) => {
    setFilters(prev => {
      const selectedTags = prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag];
      
      return { ...prev, selectedTags };
    });
  };
  
  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      beds: '',
      baths: '',
      selectedTags: [],
    });
    setSearchTerm('');
  };
  
  const hasActiveFilters = () => {
    return (
      searchTerm !== '' ||
      filters.minPrice !== '' ||
      filters.maxPrice !== '' ||
      filters.beds !== '' ||
      filters.baths !== '' ||
      filters.selectedTags.length > 0
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 md:px-10 lg:px-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">Explore Our Properties</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Discover our curated selection of exceptional properties, each offering a unique blend of location, design, and lifestyle.
            </p>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="relative max-w-3xl mx-auto">
            <div className="flex items-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by location, property type, or features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    "w-full py-4 pl-12 pr-4 rounded-l-md border border-gray-300 focus:border-black",
                    "focus:ring-1 focus:ring-black focus:outline-none transition-all duration-200"
                  )}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "bg-black text-white py-4 px-5 rounded-r-md transition-all duration-200",
                  "flex items-center justify-center gap-2",
                  showFilters && "bg-gray-800"
                )}
              >
                <SlidersHorizontal size={18} />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
            
            {/* Filters Panel */}
            {showFilters && (
              <div className="absolute z-10 w-full mt-2 p-6 bg-white rounded-md shadow-lg border border-gray-200 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="relative w-full">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.minPrice}
                          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                          className="pl-8 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <span className="text-gray-500">-</span>
                      <div className="relative w-full">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.maxPrice}
                          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                          className="pl-8 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bedrooms
                      </label>
                      <select
                        value={filters.beds}
                        onChange={(e) => handleFilterChange('beds', e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-black"
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bathrooms
                      </label>
                      <select
                        value={filters.baths}
                        onChange={(e) => handleFilterChange('baths', e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-black"
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Features
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={cn(
                          "py-1.5 px-3 rounded-full text-sm transition-all duration-200",
                          filters.selectedTags.includes(tag)
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={clearFilters}
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    Clear all filters
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Results Count and Active Filters */}
      <div className="py-6 px-6 md:px-10 lg:px-16 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-gray-600">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
            </p>
            
            {hasActiveFilters() && (
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                
                {searchTerm && (
                  <div className="bg-gray-100 text-gray-700 text-sm py-1 px-3 rounded-full flex items-center">
                    <span>Search: "{searchTerm}"</span>
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="ml-2 text-gray-400 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {filters.minPrice && (
                  <div className="bg-gray-100 text-gray-700 text-sm py-1 px-3 rounded-full flex items-center">
                    <span>Min: ${Number(filters.minPrice).toLocaleString()}</span>
                    <button 
                      onClick={() => handleFilterChange('minPrice', '')}
                      className="ml-2 text-gray-400 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {filters.maxPrice && (
                  <div className="bg-gray-100 text-gray-700 text-sm py-1 px-3 rounded-full flex items-center">
                    <span>Max: ${Number(filters.maxPrice).toLocaleString()}</span>
                    <button 
                      onClick={() => handleFilterChange('maxPrice', '')}
                      className="ml-2 text-gray-400 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {filters.beds && (
                  <div className="bg-gray-100 text-gray-700 text-sm py-1 px-3 rounded-full flex items-center">
                    <span>{filters.beds}+ beds</span>
                    <button 
                      onClick={() => handleFilterChange('beds', '')}
                      className="ml-2 text-gray-400 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {filters.baths && (
                  <div className="bg-gray-100 text-gray-700 text-sm py-1 px-3 rounded-full flex items-center">
                    <span>{filters.baths}+ baths</span>
                    <button 
                      onClick={() => handleFilterChange('baths', '')}
                      className="ml-2 text-gray-400 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {filters.selectedTags.map(tag => (
                  <div key={tag} className="bg-gray-100 text-gray-700 text-sm py-1 px-3 rounded-full flex items-center">
                    <span>{tag}</span>
                    <button 
                      onClick={() => handleTagToggle(tag)}
                      className="ml-2 text-gray-400 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Properties Grid */}
      <div className="py-12 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <div key={property.id} className="animate-fade-in">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-gray-600 mb-6">No properties found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Properties;
