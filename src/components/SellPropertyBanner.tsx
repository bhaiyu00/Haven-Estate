import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, Building, ShieldCheck, Eye } from 'lucide-react';
import gsap from 'gsap';

interface SellPropertyBannerProps {
  onListProperty: () => void;
}

export const SellPropertyBanner: React.FC<SellPropertyBannerProps> = ({
  onListProperty,
}) => {
  const bannerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={bannerRef} className="w-full bg-[#FFF5EA] border-y border-amber-200/60 py-16 lg:py-20 relative overflow-hidden">
      {/* Decorative ambient subtle warmth rings */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-200/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-200/25 blur-3xl pointer-events-none" />

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main message */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-800 uppercase mb-3">
              <Building className="w-4 h-4 text-amber-700" />
              <span>For Owners, Developers & Exclusive Estates</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 uppercase leading-tight mb-4">
              READY TO SELL OR RENT YOUR PROPERTY?
            </h2>

            <p className="text-base sm:text-lg text-neutral-700 max-w-2xl leading-relaxed">
              Reach interested property seekers and showcase your property to the right audience.
            </p>

            {/* Direct Value Highlights */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-neutral-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Zero spam brokers</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Verified buyer verification</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-600 shrink-0" />
                <span>High-intent architectural showcase</span>
              </div>
            </div>
          </div>

          {/* Action Column */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-4">
            <button
              onClick={onListProperty}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap shrink-0 group"
            >
              <span>List Your Property</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <span className="text-xs text-neutral-600">
              Takes less than 3 minutes · Free initial appraisal
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
