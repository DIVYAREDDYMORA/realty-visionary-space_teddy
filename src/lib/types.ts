
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  images: string[];
  tags: string[];
  isFeatured: boolean;
  isNewListing: boolean;
}

export interface Agent {
  id: string;
  name: string;
  photo: string;
  phone: string;
  email: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  text: string;
  rating: number;
}
