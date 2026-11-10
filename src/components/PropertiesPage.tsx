import React, { useState, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, MapPin, BedDouble, Bath, Maximize2, 
  ShieldCheck, Heart, ArrowRight, Grid, List, RotateCcw 
} from 'lucide-react';
import { Property, FilterState } from '../types/property';

interface PropertiesPageProps {
  properties: Property[];
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onViewDetails: (property: Property) => void;
  savedPropertyIds?: string[];
  onToggleSave?: (propertyId: string) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  properties,
  filters,
  onFilterChange,
  onResetFilters,
  onViewDetails,
  savedPropertyIds = [],
  onToggleSave,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter properties logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Listing type
      if (filters.listingType !== 'all' && prop.listingType !== filters.listingType) {
        return false;
      }

      // City
      if (filters.city && prop.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // Property type / category
      if (filters.propertyType && prop.category !== filters.propertyType) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms) {
        const minBeds = parseInt(filters.bedrooms, 10);
        if (!isNaN(minBeds) && prop.bedrooms < minBeds) {
          return false;
        }
      }

      // Budget Range
      if (filters.budgetRange) {
        if (filters.budgetRange === 'under-1cr' && prop.price > 10000000) return false;
        if (filters.budgetRange === '1cr-3cr' && (prop.price < 10000000 || prop.price > 30000000)) return false;
        if (filters.budgetRange === '3cr-5cr' && (prop.price < 30000000 || prop.price > 50000000)) return false;
        if (filters.budgetRange === 'above-5cr' && prop.price < 50000000) return false;

        // Rent budgets
        if (filters.budgetRange === 'under-50k' && prop.price > 50000) return false;
        if (filters.budgetRange === '50k-100k' && (prop.price < 50000 || prop.price > 100000)) return false;
        if (filters.budgetRange === 'above-100k' && prop.price < 100000) return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesCity = prop.city.toLowerCase().includes(q);
        const matchesLocality = prop.locality.toLowerCase().includes(q);
        const matchesDesc = prop.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCity && !matchesLocality && !matchesDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'area-desc') return b.areaSqFt - a.areaSqFt;
      // Default: featured first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [properties, filters]);

  const cities = ['Indore', 'Jabalpur', 'Bhopal', 'Mumbai', 'Pune', 'Bengaluru'];

  return (
    <div className="w-full bg-neutral-50/50 min-h-screen pb-20">
      
      {/* Top Header & Search Bar */}
      <div className="bg-white border-b border-neutral-200 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-1">
                Verified Discovery Catalog
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 uppercase">
                {filters.listingType === 'buy' ? 'Properties For Sale' : filters.listingType === 'rent' ? 'Luxury Rental Properties' : 'Curated Properties'}
                {filters.city ? ` in ${filters.city}` : ''}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Showing {filteredProperties.length} verified listings across prime residential sectors
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <div className="inline-flex p-1 bg-neutral-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Reset button */}
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Filter Controls Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                placeholder="Search by name, locality, feature..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
              />
            </div>

            {/* City */}
            <div>
              <select
                value={filters.city}
                onChange={(e) => onFilterChange({ city: e.target.value })}
                className="w-full py-2 px-3 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white cursor-pointer"
              >
                <option value="">All Cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <select
                value={filters.propertyType}
                onChange={(e) => onFilterChange({ propertyType: e.target.value })}
                className="w-full py-2 px-3 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white cursor-pointer"
              >
                <option value="">All Types</option>
                <option value="Villa">Villa</option>
                <option value="Luxury Apartment">Luxury Apartment</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Estate">Estate</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <select
                value={filters.bedrooms}
                onChange={(e) => onFilterChange({ bedrooms: e.target.value })}
                className="w-full py-2 px-3 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white cursor-pointer"
              >
                <option value="">Any BHK</option>
                <option value="2">2+ BHK</option>
                <option value="3">3+ BHK</option>
                <option value="4">4+ BHK</option>
                <option value="5">5+ BHK</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                className="w-full py-2 px-3 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Area: Largest First</option>
              </select>
            </div>

          </div>

          {/* Quick Listing Type Segmented Tabs */}
          <div className="mt-4 flex items-center gap-2">
            <div className="inline-flex p-1 bg-neutral-100 rounded-lg">
              <button
                type="button"
                onClick={() => onFilterChange({ listingType: 'all' })}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  filters.listingType === 'all'
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                All Listings
              </button>
              <button
                type="button"
                onClick={() => onFilterChange({ listingType: 'buy' })}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  filters.listingType === 'buy'
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                For Sale
              </button>
              <button
                type="button"
                onClick={() => onFilterChange({ listingType: 'rent' })}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  filters.listingType === 'rent'
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                For Rent
              </button>
            </div>

            {filters.city && (
              <span className="text-xs text-neutral-500 ml-2">
                Filtered to: <strong className="text-neutral-900">{filters.city}</strong>
              </span>
            )}
          </div>

        </div>
      </div>

      {/* Results Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-xl mx-auto my-12">
            <SlidersHorizontal className="w-10 h-10 text-neutral-400 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
              No matching properties found
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mb-6">
              We couldn't find any listings matching your active filters. Try adjusting your city, budget, or bedroom preferences.
            </p>
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property) => {
              const isSaved = savedPropertyIds.includes(property.id);

              return (
                <div
                  key={property.id}
                  className="group flex flex-col bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {onToggleSave && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(property.id);
                        }}
                        className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md text-neutral-700 hover:text-red-500 shadow-xs transition-colors cursor-pointer"
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    )}

                    <div className="absolute top-3 left-3 bg-neutral-950/75 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide uppercase text-white">
                      {property.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                          <span className="font-medium text-neutral-700">{property.locality}, {property.city}</span>
                        </div>
                        {property.isVerified && (
                          <div className="flex items-center gap-1 text-[11px] font-medium text-neutral-800">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-display text-lg font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1">
                        {property.title}
                      </h3>

                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-xl font-display font-bold text-neutral-950 tabular-nums">
                          {property.formattedPrice}
                        </span>
                        {property.pricePerSqFt && (
                          <span className="text-xs text-neutral-400 font-mono">
                            {property.pricePerSqFt}
                          </span>
                        )}
                      </div>

                      <div className="mt-3.5 pt-3.5 border-t border-neutral-150 flex items-center justify-between text-xs text-neutral-600">
                        <div className="flex items-center gap-1">
                          <BedDouble className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{property.bedrooms} Beds</span>
                        </div>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{property.bathrooms} Baths</span>
                        </div>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                          <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
                          <span className="tabular-nums">{property.areaSqFt.toLocaleString()} sq.ft</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={() => onViewDetails(property)}
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-neutral-900 hover:text-white bg-neutral-100 hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProperties.map((property) => {
              const isSaved = savedPropertyIds.includes(property.id);

              return (
                <div
                  key={property.id}
                  className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all p-4 sm:p-5 flex flex-col md:flex-row items-center gap-6"
                >
                  <div className="relative w-full md:w-64 aspect-[16/10] md:aspect-[4/3] rounded-xl overflow-hidden shrink-0 bg-neutral-100">
                    <img
                      src={property.image}
                      alt={property.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-neutral-950/75 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-medium tracking-wide uppercase text-white">
                      {property.category}
                    </div>
                  </div>

                  <div className="flex-1 w-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{property.locality}, {property.city}</span>
                        </div>
                        {property.isVerified && (
                          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Deed Verified</span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                        {property.title}
                      </h3>

                      <p className="text-xs text-neutral-600 line-clamp-2 mb-3">
                        {property.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-neutral-600">
                        <span>{property.bedrooms} Bedrooms</span>
                        <span>·</span>
                        <span>{property.bathrooms} Bathrooms</span>
                        <span>·</span>
                        <span>{property.areaSqFt.toLocaleString()} sq.ft</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-48 shrink-0 flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-neutral-150 pt-3 md:pt-0 md:pl-5">
                    <div>
                      <span className="text-xl font-display font-bold text-neutral-950 tabular-nums">
                        {property.formattedPrice}
                      </span>
                      {property.pricePerSqFt && (
                        <p className="text-[11px] text-neutral-400 font-mono">
                          {property.pricePerSqFt}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-2 w-full">
                      {onToggleSave && (
                        <button
                          type="button"
                          onClick={() => onToggleSave(property.id)}
                          className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer"
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-neutral-600'}`} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onViewDetails(property)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
