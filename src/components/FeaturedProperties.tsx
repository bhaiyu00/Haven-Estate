import React, { useEffect, useRef } from 'react';
import { BedDouble, Bath, Maximize2, MapPin, ArrowRight, Heart, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { Property } from '../types/property';

interface FeaturedPropertiesProps {
  properties: Property[];
  onViewDetails: (property: Property) => void;
  onViewAll: () => void;
  savedPropertyIds?: string[];
  onToggleSave?: (propertyId: string) => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  onViewDetails,
  onViewAll,
  savedPropertyIds = [],
  onToggleSave,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          opacity: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.65,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 lg:py-24 border-b border-neutral-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-14 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-2">
              Curated Portfolio
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 uppercase">
              FEATURED PROPERTIES
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-xl">
              Hand-vetted residential estates, modern sky penthouses, and architectural villas ready for immediate acquisition.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-neutral-700 underline underline-offset-4 cursor-pointer group"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Properties Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 3).map((property) => {
            const isSaved = savedPropertyIds.includes(property.id);

            return (
              <div
                key={property.id}
                className="group flex flex-col bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300"
              >
                {/* Media Container */}
                <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Bookmark Button */}
                  {onToggleSave && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(property.id);
                      }}
                      className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md text-neutral-700 hover:text-red-500 shadow-xs transition-colors cursor-pointer"
                      aria-label={isSaved ? 'Remove from saved' : 'Save property'}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isSaved ? 'fill-red-500 text-red-500' : 'text-neutral-700'
                        }`}
                      />
                    </button>
                  )}

                  {/* Clean unboxed category banner on top-left (no pill badge) */}
                  <div className="absolute top-3 left-3 bg-neutral-950/75 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-medium tracking-wide uppercase text-white">
                    {property.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Quiet verified indicator & city */}
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="font-medium text-neutral-700">{property.locality}, {property.city}</span>
                      </div>
                      {property.isVerified && (
                        <div className="flex items-center gap-1 text-[11px] font-medium text-neutral-800">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Deed Verified</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1">
                      {property.title}
                    </h3>

                    {/* Price */}
                    <div className="mt-2.5 flex items-baseline gap-2">
                      <span className="text-2xl font-display font-bold text-neutral-950 tabular-nums">
                        {property.formattedPrice}
                      </span>
                      {property.pricePerSqFt && (
                        <span className="text-xs text-neutral-400 font-mono">
                          {property.pricePerSqFt}
                        </span>
                      )}
                    </div>

                    {/* Specifications strip: clean text with dividers */}
                    <div className="mt-4 pt-4 border-t border-neutral-150 flex items-center justify-between text-xs text-neutral-600">
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4 text-neutral-400" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <span className="text-neutral-300">|</span>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-neutral-400" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <span className="text-neutral-300">|</span>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-4 h-4 text-neutral-400" />
                        <span className="tabular-nums">{property.areaSqFt.toLocaleString()} sq.ft</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 pt-2">
                    <button
                      type="button"
                      onClick={() => onViewDetails(property)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-neutral-900 hover:text-white bg-neutral-100 hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
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

        {/* View All Properties Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAll}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>Explore All 1,065+ Verified Properties</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
