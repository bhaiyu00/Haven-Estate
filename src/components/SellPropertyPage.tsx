import React, { useState } from 'react';
import { 
  Building, CheckCircle2, ShieldCheck, ArrowRight, 
  MapPin, IndianRupee, BedDouble, Bath, Maximize2, Sparkles, Upload
} from 'lucide-react';
import { Property, ListingType, PropertyCategory } from '../types/property';
import { LUXURY_VILLA_IMAGE, EDITORIAL_LOUNGE_IMAGE, SKY_PENTHOUSE_IMAGE, URBAN_APARTMENT_IMAGE } from '../data/mockData';

interface SellPropertyPageProps {
  onPropertyCreated: (newProperty: Property) => void;
  onNavigateHome: () => void;
}

export const SellPropertyPage: React.FC<SellPropertyPageProps> = ({
  onPropertyCreated,
  onNavigateHome,
}) => {
  const [listingType, setListingType] = useState<ListingType>('buy');
  const [category, setCategory] = useState<PropertyCategory>('Villa');
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('Indore');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [priceNumber, setPriceNumber] = useState('');
  const [areaSqFt, setAreaSqFt] = useState('');
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('3');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(LUXURY_VILLA_IMAGE);
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [submittedProperty, setSubmittedProperty] = useState<Property | null>(null);

  const imageOptions = [
    { label: 'Modernist Villa', path: LUXURY_VILLA_IMAGE },
    { label: 'Sky Penthouse', path: SKY_PENTHOUSE_IMAGE },
    { label: 'Minimalist Interior', path: EDITORIAL_LOUNGE_IMAGE },
    { label: 'Scandinavian Flat', path: URBAN_APARTMENT_IMAGE },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(priceNumber) || 25000000;
    const formattedPrice = listingType === 'buy'
      ? `₹${(price / 10000000).toFixed(2)} Cr`
      : `₹${(price).toLocaleString()} / mo`;

    const newProp: Property = {
      id: `custom-prop-${Date.now()}`,
      title: title || 'Signature Architectural Residence',
      slug: (title || 'signature-architectural-residence').toLowerCase().replace(/\s+/g, '-'),
      listingType,
      category,
      price,
      formattedPrice,
      pricePerSqFt: `₹${Math.round(price / (parseInt(areaSqFt, 10) || 2500))}/sq.ft`,
      city,
      locality: locality || 'Central Corridor',
      address: address || `${locality}, ${city}`,
      bedrooms: parseInt(bedrooms, 10) || 3,
      bathrooms: parseInt(bathrooms, 10) || 3,
      areaSqFt: parseInt(areaSqFt, 10) || 2800,
      isVerified: true,
      isFeatured: true,
      image: selectedImage,
      gallery: [selectedImage, EDITORIAL_LOUNGE_IMAGE],
      description: description || 'Meticulously crafted modern home featuring open-plan living, natural materials, and floor-to-ceiling windows.',
      amenities: [
        'Dedicated Parking',
        '24/7 Security Enclave',
        'Architectural Finishes',
        'Private Balcony Terraces'
      ],
      yearBuilt: 2025,
      parkingSpaces: 2,
      agent: {
        name: ownerName || 'Direct Owner Listing',
        role: 'Verified Property Representative',
        phone: ownerPhone || '+91 98000 00000',
        email: ownerEmail || 'owner@havenestates.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      }
    };

    onPropertyCreated(newProp);
    setSubmittedProperty(newProp);
  };

  return (
    <div className="w-full bg-neutral-50/50 py-12 lg:py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Kicker */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
            <Building className="w-4 h-4 text-neutral-800" />
            <span>Owner & Developer Portal</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 uppercase">
            LIST YOUR PROPERTY ON HAVEN
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            Showcase your residential estate to serious, vetted buyers with zero brokerage interference and direct verified enquiries.
          </p>
        </div>

        {submittedProperty ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 sm:p-12 text-center shadow-lg animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-2">
              Property Successfully Published!
            </h2>
            <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
              Your property <strong>"{submittedProperty.title}"</strong> has been indexed in our verified discovery system under {submittedProperty.city}.
            </p>

            <div className="max-w-sm mx-auto bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-left mb-8 flex items-center gap-4">
              <img
                src={submittedProperty.image}
                alt=""
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="text-xs font-semibold text-neutral-900">{submittedProperty.title}</p>
                <p className="text-xs text-neutral-500">{submittedProperty.formattedPrice} · {submittedProperty.city}</p>
                <p className="text-[11px] text-emerald-700 font-medium mt-1">Live in Directory</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setSubmittedProperty(null)}
                className="px-6 py-2.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg cursor-pointer"
              >
                List Another Property
              </button>
              <button
                onClick={onNavigateHome}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-8">
            
            {/* Section 1: Listing Intent & Category */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4 pb-2 border-b border-neutral-150">
                01. Core Property Classification
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-2">
                    Listing Intent *
                  </label>
                  <div className="inline-flex w-full p-1 bg-neutral-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setListingType('buy')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                        listingType === 'buy' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
                      }`}
                    >
                      For Sale
                    </button>
                    <button
                      type="button"
                      onClick={() => setListingType('rent')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                        listingType === 'rent' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
                      }`}
                    >
                      For Rent
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-2">
                    Property Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as PropertyCategory)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 px-3 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  >
                    <option value="Villa">Villa / Standalone Residence</option>
                    <option value="Luxury Apartment">Luxury Apartment</option>
                    <option value="Penthouse">Sky Penthouse</option>
                    <option value="Estate">Gated Estate</option>
                    <option value="Studio">Designer Studio</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Property Title / Headline *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Courtyard Villa at Super Corridor"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 px-3 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
              </div>
            </div>

            {/* Section 2: Location Details */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4 pb-2 border-b border-neutral-150">
                02. Geographic Location
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 px-3 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  >
                    <option value="Indore">Indore</option>
                    <option value="Jabalpur">Jabalpur</option>
                    <option value="Bhopal">Bhopal</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Bengaluru">Bengaluru</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Locality / Sector *
                  </label>
                  <input
                    type="text"
                    required
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="e.g. Super Corridor, Vijay Nagar, Bandra West"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 px-3 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Complete Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Plot / Unit Number, Society, Street"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 px-3 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
              </div>
            </div>

            {/* Section 3: Financials & Specs */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4 pb-2 border-b border-neutral-150">
                03. Specifications & Valuation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    {listingType === 'buy' ? 'Expected Price (₹)' : 'Monthly Rent (₹)'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={priceNumber}
                    onChange={(e) => setPriceNumber(e.target.value)}
                    placeholder={listingType === 'buy' ? '35000000' : '85000'}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 px-3 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Carpet Area (sq.ft) *
                  </label>
                  <input
                    type="number"
                    required
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(e.target.value)}
                    placeholder="3200"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 px-3 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Bedrooms *
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 px-3 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  >
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Bathrooms *
                  </label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 px-3 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Property Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe unique architectural elements, finishes, views, sunlight orientation..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 px-3 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
              </div>
            </div>

            {/* Section 4: Architectural Visual Cover */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4 pb-2 border-b border-neutral-150">
                04. Visual Asset Showcase
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {imageOptions.map((opt) => (
                  <button
                    key={opt.path}
                    type="button"
                    onClick={() => setSelectedImage(opt.path)}
                    className={`relative rounded-xl overflow-hidden border-2 aspect-[4/3] text-left cursor-pointer transition-all ${
                      selectedImage === opt.path ? 'border-neutral-900 scale-98 shadow-sm' : 'border-neutral-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={opt.path} alt="" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1.5 left-1.5 right-1.5 bg-neutral-950/80 backdrop-blur-xs text-[10px] text-white px-1.5 py-0.5 rounded truncate">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 5: Owner / Authorized Representative Contact */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4 pb-2 border-b border-neutral-150">
                05. Ownership & Verification Contact
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Sameer Kapoor"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 px-3 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    placeholder="+91 98200 12345"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 px-3 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    placeholder="sameer@example.com"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 px-3 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-150">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Our legal team initiates title clearance upon submission</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <span>Publish Listing to Haven</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
