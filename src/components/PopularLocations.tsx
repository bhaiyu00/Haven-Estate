import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { LocationItem } from '../types/property';

interface PopularLocationsProps {
  locations: LocationItem[];
  onSelectLocation: (city: string) => void;
}

export const PopularLocations: React.FC<PopularLocationsProps> = ({
  locations,
  onSelectLocation,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          opacity: 0,
          y: 24,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-neutral-50/60 py-16 lg:py-24 border-b border-neutral-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-14 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-2">
              Regional Portfolios
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 uppercase">
              EXPLORE POPULAR LOCATIONS
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-xl">
              Curated prime real estate across the nation’s most vibrant commercial centers and scenic retreats.
            </p>
          </div>

          <div className="text-xs text-neutral-500 hidden md:block text-right">
            <span>6 Prime Cities</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="tabular-nums font-mono">1,065+ Curated Properties</span>
          </div>
        </div>

        {/* Location Tiles Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => onSelectLocation(loc.city)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-200 border border-neutral-200 shadow-xs hover:shadow-lg transition-all duration-300 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              {/* Image */}
              <img
                src={loc.image}
                alt={`${loc.city} architecture and premier properties`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/30 to-transparent transition-opacity" />

              {/* Content overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wider text-neutral-300 uppercase">
                    {loc.state}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-neutral-900 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight group-hover:translate-x-0.5 transition-transform">
                    {loc.city}
                  </h3>
                  
                  {/* Clean unboxed metadata separator */}
                  <div className="flex items-center gap-2 text-xs text-neutral-300 mt-1">
                    <span className="font-medium tabular-nums">{loc.propertyCount} Properties</span>
                    <span aria-hidden="true">·</span>
                    <span>Explore Listings</span>
                  </div>

                  <p className="text-xs text-neutral-300/90 line-clamp-1 mt-2 font-normal">
                    {loc.headline}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
