
import { Property, Agent, Testimonial } from './types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Oceanfront Villa',
    description: 'Stunning contemporary villa with panoramic ocean views, featuring floor-to-ceiling windows that blend indoor and outdoor living. Private infinity pool, gourmet kitchen, and five luxurious bedroom suites.',
    price: 4850000,
    location: 'Malibu, CA',
    beds: 5,
    baths: 6,
    sqft: 6200,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    ],
    tags: ['Oceanfront', 'Pool', 'Smart Home'],
    isFeatured: true,
    isNewListing: false,
  },
  {
    id: '2',
    title: 'Elegant Downtown Penthouse',
    description: 'Sophisticated penthouse in the heart of the city with a private rooftop terrace offering 360-degree views. Features include designer finishes, chef\'s kitchen, and a dedicated home office space.',
    price: 3200000,
    location: 'San Francisco, CA',
    beds: 3,
    baths: 3.5,
    sqft: 3100,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['Penthouse', 'City View', 'Doorman'],
    isFeatured: true,
    isNewListing: true,
  },
  {
    id: '3',
    title: 'Mid-Century Architectural',
    description: 'Iconic mid-century modern home designed by renowned architect. Restored with respect for original details while incorporating contemporary amenities. Wraparound glass walls showcase the lush garden landscape.',
    price: 2750000,
    location: 'Palm Springs, CA',
    beds: 4,
    baths: 3,
    sqft: 3800,
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527359443443-84a48aec73d2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1780&auto=format&fit=crop',
    ],
    tags: ['Mid-Century', 'Pool', 'Mountain View'],
    isFeatured: false,
    isNewListing: false,
  },
  {
    id: '4',
    title: 'Country Estate with Vineyard',
    description: 'Spectacular estate on 15 acres with a boutique vineyard. The main residence features timeless design, chef's kitchen, wine cellar, and expansive entertaining spaces that open to terraces overlooking the vineyard.',
    price: 8900000,
    location: 'Napa Valley, CA',
    beds: 6,
    baths: 7,
    sqft: 8500,
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['Vineyard', 'Estate', 'Guest House'],
    isFeatured: true,
    isNewListing: false,
  },
  {
    id: '5',
    title: 'Minimalist Urban Loft',
    description: 'Sophisticated loft in a converted historic warehouse featuring soaring ceilings, original brick walls, and industrial elements. Open concept design with high-end finishes and custom built-ins throughout.',
    price: 1750000,
    location: 'New York, NY',
    beds: 2,
    baths: 2,
    sqft: 2200,
    images: [
      'https://images.unsplash.com/photo-1560448075-bb485b067938?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['Loft', 'Doorman', 'Smart Home'],
    isFeatured: false,
    isNewListing: true,
  },
  {
    id: '6',
    title: 'Waterfront Estate',
    description: 'Private waterfront compound offering the ultimate luxury lifestyle. Custom-built main residence with extraordinary craftsmanship, boathouse, guest cottage, and pristine landscaping with infinity-edge pool overlooking the water.',
    price: 12500000,
    location: 'Miami Beach, FL',
    beds: 8,
    baths: 10,
    sqft: 11000,
    images: [
      'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
    ],
    tags: ['Waterfront', 'Estate', 'Pool'],
    isFeatured: true,
    isNewListing: false,
  },
];

export const agents: Agent[] = [
  {
    id: '1',
    name: 'Sophia Reynolds',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    phone: '(310) 555-1234',
    email: 'sophia@dreamscape.com',
    bio: 'Sophia specializes in luxury properties across California. With over 15 years of experience, she has developed an unparalleled knowledge of the high-end real estate market.',
  },
  {
    id: '2',
    name: 'Ethan Blackwood',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    phone: '(415) 555-5678',
    email: 'ethan@dreamscape.com',
    bio: 'Ethan is known for his exceptional negotiation skills and comprehensive market analysis. He has successfully represented both buyers and sellers in some of the most complex property transactions.',
  },
  {
    id: '3',
    name: 'Olivia Chen',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2061&auto=format&fit=crop',
    phone: '(917) 555-9101',
    email: 'olivia@dreamscape.com',
    bio: 'Olivia brings a fresh perspective to real estate with her background in interior design. She helps clients visualize possibilities and often works with developers on new luxury projects.',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'James & Clara Wilson',
    photo: 'https://images.unsplash.com/photo-1501698335668-7c1e5f6def2e?q=80&w=2070&auto=format&fit=crop',
    text: 'Working with Dreamscape Realty to find our waterfront property was an exceptional experience. Their attention to detail and knowledge of the luxury market is unmatched.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Alexandra Harmon',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    text: 'The team at Dreamscape made selling my penthouse completely stress-free. Their marketing strategy attracted the perfect buyers, and we closed above asking price.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Michael Thornton',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
    text: 'I've purchased multiple investment properties through Dreamscape and have always been impressed with their professionalism and market insights. Truly a cut above other agencies.',
    rating: 4,
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatAddress = (location: string): string => {
  return location;
};
