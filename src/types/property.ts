export type ListingType = 'buy' | 'rent';

export type PropertyCategory = 
  | 'Villa'
  | 'Luxury Apartment'
  | 'Penthouse'
  | 'Studio'
  | 'Gated Community'
  | 'Estate'
  | 'Commercial';

export interface Property {
  id: string;
  title: string;
  slug: string;
  listingType: ListingType;
  category: PropertyCategory;
  price: number; // in INR
  formattedPrice: string;
  pricePerSqFt?: string;
  city: 'Indore' | 'Jabalpur' | 'Bhopal' | 'Mumbai' | 'Pune' | 'Bengaluru' | string;
  locality: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  isVerified: boolean;
  isFeatured?: boolean;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  yearBuilt?: number;
  parkingSpaces?: number;
  agent: {
    name: string;
    role: string;
    phone: string;
    email: string;
    avatar: string;
  };
}

export interface LocationItem {
  id: string;
  city: string;
  state: string;
  propertyCount: number;
  image: string;
  headline: string;
}

export interface FilterState {
  listingType: ListingType | 'all';
  city: string;
  propertyType: string;
  budgetRange: string;
  bedrooms: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'area-desc';
}
