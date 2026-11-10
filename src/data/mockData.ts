import { Property, LocationItem } from '../types/property';

export const HERO_ARCHITECTURAL_IMAGE = '/src/assets/images/hero_modern_architecture_1794298645917.jpg';
export const EDITORIAL_LOUNGE_IMAGE = '/src/assets/images/editorial_interior_lounge_1794298647285.jpg';
export const LUXURY_VILLA_IMAGE = '/src/assets/images/property_luxury_villa_1794298647587.jpg';
export const SKY_PENTHOUSE_IMAGE = '/src/assets/images/property_sky_penthouse_1794298648057.jpg';
export const URBAN_APARTMENT_IMAGE = '/src/assets/images/property_urban_apartment_1794298648349.jpg';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'The Solarium Modernist Villa',
    slug: 'solarium-modernist-villa',
    listingType: 'buy',
    category: 'Villa',
    price: 38500000,
    formattedPrice: '₹3.85 Cr',
    pricePerSqFt: '₹8,550/sq.ft',
    city: 'Indore',
    locality: 'Super Corridor & Bypass Enclave',
    address: 'Plot 42, Vayu Greenwoods, Super Corridor, Indore, MP',
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 4500,
    isVerified: true,
    isFeatured: true,
    image: LUXURY_VILLA_IMAGE,
    gallery: [
      LUXURY_VILLA_IMAGE,
      EDITORIAL_LOUNGE_IMAGE,
      HERO_ARCHITECTURAL_IMAGE,
    ],
    description: 'An architectural triumph nestled in Indore’s premier corridor. Featuring seamless indoor-outdoor living, private infinity lap pool, double-height stone hearth, and cantilevered suites with panoramic green horizon vistas.',
    amenities: [
      'Private Lap Pool',
      'Double Height Living',
      'Italian Marble Flooring',
      'EV Charger Port',
      'Smart Automation',
      'Landscaped Zen Garden',
      'Dedicated Staff Quarters'
    ],
    yearBuilt: 2024,
    parkingSpaces: 3,
    agent: {
      name: 'Raghav Singhania',
      role: 'Principal Partner — Luxury Estates',
      phone: '+91 98260 11200',
      email: 'raghav.s@havenestates.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'prop-2',
    title: 'The Horizon Sky Penthouse',
    slug: 'horizon-sky-penthouse',
    listingType: 'buy',
    category: 'Penthouse',
    price: 85000000,
    formattedPrice: '₹8.50 Cr',
    pricePerSqFt: '₹22,300/sq.ft',
    city: 'Mumbai',
    locality: 'Bandra West, Pali Hill',
    address: 'Level 28, The Aurum Crest, Pali Hill, Mumbai, MH',
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 3800,
    isVerified: true,
    isFeatured: true,
    image: SKY_PENTHOUSE_IMAGE,
    gallery: [
      SKY_PENTHOUSE_IMAGE,
      EDITORIAL_LOUNGE_IMAGE,
      URBAN_APARTMENT_IMAGE,
    ],
    description: 'Commanding uninterrupted Arabian Sea sunsets and city skyline views. This trophy duplex penthouse boasts a 900 sq.ft private sky lounge terrace, private key elevator access, custom Poggenpohl kitchen, and wine cellar.',
    amenities: [
      'Panoramic Sky Terrace',
      'Private High-Speed Elevator',
      'Sea View Deck',
      'Temperature Controlled Wine Cellar',
      'Integrated Sonos Audio',
      '24/7 White Glove Concierge'
    ],
    yearBuilt: 2025,
    parkingSpaces: 4,
    agent: {
      name: 'Ananya Deshmukh',
      role: 'Director of Coastal Residences',
      phone: '+91 98200 44890',
      email: 'ananya.d@havenestates.com',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'prop-3',
    title: 'Nordic Oak Garden Residence',
    slug: 'nordic-oak-garden-residence',
    listingType: 'rent',
    category: 'Luxury Apartment',
    price: 110000,
    formattedPrice: '₹1.10 L / mo',
    pricePerSqFt: '₹55/sq.ft',
    city: 'Bengaluru',
    locality: 'Indiranagar, Defense Colony',
    address: 'Flat 4A, The Courtyard Manor, Indiranagar, Bengaluru, KA',
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2050,
    isVerified: true,
    isFeatured: true,
    image: URBAN_APARTMENT_IMAGE,
    gallery: [
      URBAN_APARTMENT_IMAGE,
      EDITORIAL_LOUNGE_IMAGE,
      LUXURY_VILLA_IMAGE,
    ],
    description: 'Impeccably curated Scandinavian apartment filled with ambient natural light, acoustic oak slat feature walls, floor-to-ceiling balcony glazing, and custom modular European joinery.',
    amenities: [
      'Acoustic Oak Paneling',
      'Balcony Green Sanctuary',
      'Miele Kitchen Appliances',
      'Clubhouse & Gym Access',
      'Solar Power Backup',
      'Fiber Optic Ready'
    ],
    yearBuilt: 2023,
    parkingSpaces: 2,
    agent: {
      name: 'Karthik Rao',
      role: 'South India Practice Lead',
      phone: '+91 98450 78210',
      email: 'karthik.r@havenestates.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'prop-4',
    title: 'The Stone Ridge Glass Pavilion',
    slug: 'stone-ridge-glass-pavilion',
    listingType: 'buy',
    category: 'Villa',
    price: 49500000,
    formattedPrice: '₹4.95 Cr',
    pricePerSqFt: '₹9,500/sq.ft',
    city: 'Bhopal',
    locality: 'Bhadbhada Road & Upper Lake Overlook',
    address: 'Upper Lake Ridge, Shymala Hills Extension, Bhopal, MP',
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 5200,
    isVerified: true,
    isFeatured: true,
    image: HERO_ARCHITECTURAL_IMAGE,
    gallery: [
      HERO_ARCHITECTURAL_IMAGE,
      LUXURY_VILLA_IMAGE,
      EDITORIAL_LOUNGE_IMAGE,
    ],
    description: 'An architectural statement perched above the lake breeze. Highlights include exposed sandstone pillars, floating timber staircase, double-height glass atrium, and an expansive infinity pool.',
    amenities: [
      'Upper Lake Horizon View',
      'Double Height Glass Atrium',
      'Private Swimming Pool',
      'Lush Perimeter Landscaping',
      'Automated Climate Control',
      'Dedicated Home Theatre Room'
    ],
    yearBuilt: 2024,
    parkingSpaces: 4,
    agent: {
      name: 'Raghav Singhania',
      role: 'Principal Partner — Luxury Estates',
      phone: '+91 98260 11200',
      email: 'raghav.s@havenestates.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'prop-5',
    title: 'Narmada View Minimalist Haven',
    slug: 'narmada-view-haven',
    listingType: 'buy',
    category: 'Villa',
    price: 24500000,
    formattedPrice: '₹2.45 Cr',
    pricePerSqFt: '₹7,200/sq.ft',
    city: 'Jabalpur',
    locality: 'Civil Lines & Bhedaghat Approach',
    address: 'Estate 12, Narmada Cliffs, Civil Lines, Jabalpur, MP',
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 3400,
    isVerified: true,
    isFeatured: false,
    image: LUXURY_VILLA_IMAGE,
    gallery: [
      LUXURY_VILLA_IMAGE,
      HERO_ARCHITECTURAL_IMAGE,
      URBAN_APARTMENT_IMAGE,
    ],
    description: 'Peaceful contemporary sanctuary built with locally sourced natural stone and warm teak finishes. Designed for generational comfort with expansive private lawns and quiet courtyards.',
    amenities: [
      'Private Landscaped Lawn',
      'Solar Rooftop Grid',
      'Water Harvesting System',
      'Wide Verandahs',
      'Security Gatehouse',
      'Quiet Residential Sector'
    ],
    yearBuilt: 2023,
    parkingSpaces: 3,
    agent: {
      name: 'Priyanka Verma',
      role: 'Central India Senior Associate',
      phone: '+91 97520 63412',
      email: 'priyanka.v@havenestates.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'prop-6',
    title: 'The Mula Riverfront Loft',
    slug: 'mula-riverfront-loft',
    listingType: 'rent',
    category: 'Luxury Apartment',
    price: 85000,
    formattedPrice: '₹85,000 / mo',
    pricePerSqFt: '₹47/sq.ft',
    city: 'Pune',
    locality: 'Koregaon Park South',
    address: 'Tower B, Lane 7, Koregaon Park, Pune, MH',
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1800,
    isVerified: true,
    isFeatured: false,
    image: EDITORIAL_LOUNGE_IMAGE,
    gallery: [
      EDITORIAL_LOUNGE_IMAGE,
      URBAN_APARTMENT_IMAGE,
      SKY_PENTHOUSE_IMAGE,
    ],
    description: 'Bespoke urban flat located in the heart of lush Koregaon Park. High ceilings, raw exposed concrete ceiling details, designer lighting, and walkability to celebrated organic cafés.',
    amenities: [
      'Tree-lined Balcony',
      'Designer Italian Kitchen',
      'Gymnasium & Rooftop Pool',
      'Pet Friendly Society',
      'Valet Parking Service'
    ],
    yearBuilt: 2024,
    parkingSpaces: 2,
    agent: {
      name: 'Ananya Deshmukh',
      role: 'Director of Coastal Residences',
      phone: '+91 98200 44890',
      email: 'ananya.d@havenestates.com',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    }
  }
];

export const POPULAR_LOCATIONS: LocationItem[] = [
  {
    id: 'loc-indore',
    city: 'Indore',
    state: 'Madhya Pradesh',
    propertyCount: 142,
    image: HERO_ARCHITECTURAL_IMAGE,
    headline: 'Fastest growing luxury hub with expansive modern villas & tech corridors.'
  },
  {
    id: 'loc-jabalpur',
    city: 'Jabalpur',
    state: 'Madhya Pradesh',
    propertyCount: 58,
    image: LUXURY_VILLA_IMAGE,
    headline: 'Heritage charm, serene riverside estates, and spacious green acreage.'
  },
  {
    id: 'loc-bhopal',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    propertyCount: 86,
    image: EDITORIAL_LOUNGE_IMAGE,
    headline: 'Scenic lake-view residences, Shymala Hills luxury, and colonial tranquility.'
  },
  {
    id: 'loc-mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    propertyCount: 320,
    image: SKY_PENTHOUSE_IMAGE,
    headline: 'Ultra-exclusive sea-facing penthouses and iconic high-rise addresses.'
  },
  {
    id: 'loc-pune',
    city: 'Pune',
    state: 'Maharashtra',
    propertyCount: 195,
    image: URBAN_APARTMENT_IMAGE,
    headline: 'Leafy avenues, Koregaon Park lofts, and cosmopolitan garden developments.'
  },
  {
    id: 'loc-bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    propertyCount: 264,
    image: HERO_ARCHITECTURAL_IMAGE,
    headline: 'Tech executive villas, Indiranagar designer spaces, and tranquil suburbs.'
  }
];

export const WHY_CHOOSE_BENEFITS = [
  {
    id: 'benefit-1',
    number: '01',
    title: 'Verified listings',
    subtitle: 'Only when verification has actually been completed',
    description: 'Every property on Haven undergoes physical deed verification, site inspection, and zoning check. No phantom listings or unverified claims.',
    stat: '100%',
    statLabel: 'Physically & Legally Vetted'
  },
  {
    id: 'benefit-2',
    number: '02',
    title: 'Easy property discovery',
    subtitle: 'Precision filters without algorithmic noise',
    description: 'Find homes by verified carpet area, orientation, exact floor plans, and budget brackets without wading through duplicate broker spam.',
    stat: '< 2 min',
    statLabel: 'Average Discovery Time'
  },
  {
    id: 'benefit-3',
    number: '03',
    title: 'Direct property enquiries',
    subtitle: 'Direct line to authorized representatives',
    description: 'Connect directly with verified property owners or our dedicated certified advisors. Zero intermediation delays and no phone spam.',
    stat: 'Direct',
    statLabel: 'Direct Connect'
  },
  {
    id: 'benefit-4',
    number: '04',
    title: 'Personalised assistance',
    subtitle: 'End-to-end guidance from search to handover',
    description: 'From private discreet tours and structural audits to registration documentation, our advisory team stands beside you at every milestone.',
    stat: '1-on-1',
    statLabel: 'Dedicated Concierge'
  }
];

export const UPCOMING_PROJECTS = [
  {
    id: 'proj-1',
    title: 'The Veda Pavilion Reserve',
    developer: 'Haven Signature Developments',
    location: 'Super Corridor, Indore',
    status: 'Launching Q3 2026',
    units: '36 Private Residences',
    range: '₹3.2 Cr — ₹5.8 Cr',
    image: HERO_ARCHITECTURAL_IMAGE,
    description: 'Biophilic luxury villas with subterranean wine vaults, private reflection pools, and 100% solar independence.'
  },
  {
    id: 'proj-2',
    title: 'The Bayview Tower',
    developer: 'Sterling Horizon Group',
    location: 'Worli Sea Face, Mumbai',
    status: 'Structural Works Complete',
    units: '22 Full-Floor Mansions',
    range: '₹14.5 Cr — ₹32.0 Cr',
    image: SKY_PENTHOUSE_IMAGE,
    description: 'Single-residence-per-floor architectural statements designed by Foster Associates with private yacht slip reservations.'
  },
  {
    id: 'proj-3',
    title: 'Greenwood Botanical Terraces',
    developer: 'Aura Urban Living',
    location: 'Whitefield, Bengaluru',
    status: 'Ready for Fitouts',
    units: '48 Sky Duplexes',
    range: '₹2.4 Cr — ₹4.2 Cr',
    image: URBAN_APARTMENT_IMAGE,
    description: 'Terraced apartments wrapped in indigenous flora, featuring zero-carbon construction and high-yield rainwater harvesting.'
  }
];
