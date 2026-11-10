import React, { useEffect, useRef } from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import gsap from 'gsap';

interface FinalCtaProps {
  onExploreProperties: () => void;
  onContactUs: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({
  onExploreProperties,
  onContactUs,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.from(containerRef.current.children, {
          opacity: 0,
          y: 20,
          stagger: 0.12,
          duration: 0.65,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-neutral-900 text-white py-18 lg:py-24 relative overflow-hidden">
      {/* Subtle architectural grid pattern */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div ref={containerRef} className="max-w-3xl mx-auto">
          <div className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-4">
            Begin Your Acquisition
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight mb-6">
            YOUR NEXT CHAPTER STARTS WITH THE RIGHT ADDRESS.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Explore spaces, discover opportunities, and make your next move with confidence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExploreProperties}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-neutral-900 bg-white hover:bg-neutral-100 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onContactUs}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Us</span>
            </button>
          </div>

          <p className="text-xs text-neutral-400 mt-8">
            Offices in Mumbai, Indore & Bengaluru · Advisory inquiries answered within 4 hours
          </p>
        </div>

      </div>
    </section>
  );
};
