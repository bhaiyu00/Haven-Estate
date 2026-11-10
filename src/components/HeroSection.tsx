import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Home, IndianRupee, BedDouble, ArrowRight, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ListingType, FilterState } from '../types/property';
import { HERO_ARCHITECTURAL_IMAGE } from '../data/mockData';

interface HeroSectionProps {
  onSearch: (filters: Partial<FilterState>) => void;
  onExploreProperties: () => void;
  onListProperty: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onExploreProperties,
  onListProperty,
}) => {
  const [listingType, setListingType] = useState<ListingType>('buy');
  const [city, setCity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(kickerRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.45,
      })
      .from(headlineRef.current, {
        opacity: 0,
        y: 22,
        duration: 0.75,
      }, '-=0.25')
      .from(subtextRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.55,
      }, '-=0.5')
      .from(ctaRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.5,
      }, '-=0.4')
      .from(statsRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.5,
      }, '-=0.35')
      .from(imageWrapperRef.current, {
        opacity: 0,
        scale: 0.97,
        duration: 0.85,
        ease: 'power2.out',
      }, '-=0.75')
      .from(searchBarRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.65,
      }, '-=0.55');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      listingType,
      city: city === 'all' ? '' : city,
      propertyType: propertyType === 'all' ? '' : propertyType,
      budgetRange: budgetRange === 'all' ? '' : budgetRange,
      bedrooms: bedrooms === 'all' ? '' : bedrooms,
    });
  };

  return (
    <section ref={heroRef} className="relative w-full bg-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-150 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Split: Editorial Headline & Architectural Masterpiece */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
          
          {/* Left Column: Headlines & Primary Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Quiet Trust Kicker (no pill box) */}
            <div ref={kickerRef} className="flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-4">
              <ShieldCheck className="w-4 h-4 text-neutral-800" />
              <span>Independent & Curated Real Estate Advisory</span>
            </div>

            {/* Exact Headline Required */}
            <h1 ref={headlineRef} className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.08] mb-6 uppercase">
              FIND YOUR PLACE.<br />
              <span className="text-neutral-500">MAKE IT HOME.</span>
            </h1>

            {/* Exact Supporting Text Required */}
            <p ref={subtextRef} className="text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-2xl mb-8">
              Discover exceptional properties, explore better opportunities, and find a space that feels right for you.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreProperties}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0 group"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={onListProperty}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>List Your Property</span>
              </button>
            </div>

            {/* Micro proof metrics (adherent to claim-to-proof adjacency) */}
            <div ref={statsRef} className="mt-8 pt-6 border-t border-neutral-150 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <p className="text-xl sm:text-2xl font-bold font-display text-neutral-900 tabular-nums">1,240+</p>
                <p className="text-xs text-neutral-500 mt-0.5">Verified Homes</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-display text-neutral-900 tabular-nums">₹4,200 Cr+</p>
                <p className="text-xs text-neutral-500 mt-0.5">Transactions Advised</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-display text-neutral-900 tabular-nums">100%</p>
                <p className="text-xs text-neutral-500 mt-0.5">Direct Enquiries</p>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Photography Focal Carrier */}
          <div ref={imageWrapperRef} className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-[5/4] bg-neutral-100 border border-neutral-200">
              
              {/* Fallback container with architectural gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-100 to-stone-200 transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              />

              <img
                src={HERO_ARCHITECTURAL_IMAGE}
                alt="Contemporary luxury architectural residence with reflecting pool at golden hour"
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Scrim Overlay & Location Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/15 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase text-neutral-300 font-medium">
                  <span>Haven Curated Selection</span>
                  <span>Central Reserve</span>
                </div>
                <p className="text-base font-semibold font-display text-white mt-1">
                  The Solarium Villa · Indore Bypass
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Modern Interactive Property Search Bar */}
        <div ref={searchBarRef} className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-neutral-200 p-4 sm:p-6 lg:p-7 relative z-10">
          
          {/* Segmented Buy / Rent Toggle */}
          <div className="flex items-center gap-2 mb-5">
            <div className="inline-flex p-1 bg-neutral-100 rounded-lg">
              <button
                type="button"
                onClick={() => setListingType('buy')}
                className={`px-5 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  listingType === 'buy'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Buy Properties
              </button>
              <button
                type="button"
                onClick={() => setListingType('rent')}
                className={`px-5 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  listingType === 'rent'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Rent Properties
              </button>
            </div>
            <span className="text-xs text-neutral-400 hidden sm:inline-block ml-3">
              Direct verification · Zero brokerage markup on selected listings
            </span>
          </div>

          {/* Interactive Search Fields Form */}
          <form onSubmit={handleSearchSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4 items-center">
              
              {/* Field 1: City or Locality */}
              <div className="lg:col-span-3">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  City / Locality
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors cursor-pointer appearance-none"
                  >
                    <option value="">All Locations</option>
                    <option value="Indore">Indore</option>
                    <option value="Jabalpur">Jabalpur</option>
                    <option value="Bhopal">Bhopal</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Bengaluru">Bengaluru</option>
                  </select>
                </div>
              </div>

              {/* Field 2: Property Type */}
              <div className="lg:col-span-3">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Property Type
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors cursor-pointer appearance-none"
                  >
                    <option value="">Any Type</option>
                    <option value="Villa">Villa / Bungalow</option>
                    <option value="Luxury Apartment">Luxury Apartment</option>
                    <option value="Penthouse">Sky Penthouse</option>
                    <option value="Estate">Gated Estate</option>
                  </select>
                </div>
              </div>

              {/* Field 3: Budget Range */}
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Budget Range
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors cursor-pointer appearance-none"
                  >
                    <option value="">Any Budget</option>
                    {listingType === 'buy' ? (
                      <>
                        <option value="under-1cr">Up to ₹1 Cr</option>
                        <option value="1cr-3cr">₹1 Cr — ₹3 Cr</option>
                        <option value="3cr-5cr">₹3 Cr — ₹5 Cr</option>
                        <option value="above-5cr">₹5 Cr+</option>
                      </>
                    ) : (
                      <>
                        <option value="under-50k">Up to ₹50,000</option>
                        <option value="50k-100k">₹50,000 — ₹1,00,000</option>
                        <option value="above-100k">₹1,00,000+</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Field 4: Bedrooms */}
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Bedrooms
                </label>
                <div className="relative">
                  <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors cursor-pointer appearance-none"
                  >
                    <option value="">Any BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>
              </div>

              {/* Field 5: Search Button */}
              <div className="lg:col-span-2 sm:col-span-2 flex flex-col justify-end mt-2 lg:mt-0">
                <label className="hidden lg:block text-[11px] font-semibold text-transparent mb-1.5 select-none">
                  Search
                </label>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>

            </div>
          </form>

        </div>

      </div>
    </section>
  );
};
