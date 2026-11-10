import React, { useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, MessageSquare, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

interface HowItWorksProps {
  onStartDiscover: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartDiscover }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.8,
          ease: 'power2.inOut',
        });
      }

      if (cardsContainerRef.current) {
        gsap.from(cardsContainerRef.current.children, {
          opacity: 0,
          y: 20,
          stagger: 0.15,
          duration: 0.65,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      step: '01',
      title: 'Discover',
      description: 'Explore properties based on your location and budget.',
      icon: <Search className="w-5 h-5 text-neutral-900" />,
      detail: 'Filter by exact carpet area, floor level, Vastu orientation, and verified legal clearances.'
    },
    {
      step: '02',
      title: 'Compare',
      description: 'Review property details, images, and amenities.',
      icon: <SlidersHorizontal className="w-5 h-5 text-neutral-900" />,
      detail: 'Inspect high-definition architectural photography, vetted floorplans, and clear pricing breakdowns.'
    },
    {
      step: '03',
      title: 'Connect',
      description: 'Contact the owner or property representative.',
      icon: <MessageSquare className="w-5 h-5 text-neutral-900" />,
      detail: 'Book private on-site viewings directly with certified advisors or verified property titles.'
    }
  ];

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 lg:py-24 border-b border-neutral-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 lg:mb-16">
          <div className="text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-2">
            Seamless Experience
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 uppercase">
            HOW IT WORKS
          </h2>
          <p className="text-base text-neutral-600 mt-2">
            A transparent, frictionless journey designed for homeowners, investors, and residents.
          </p>
        </div>

        {/* Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          
          {/* Subtle horizontal connecting line on desktop */}
          <div ref={lineRef} className="hidden lg:block absolute top-7 left-12 right-12 h-[1px] bg-neutral-200 z-0" />

          <div ref={cardsContainerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
            {steps.map((item, index) => (
              <div
                key={item.step}
                className="group flex flex-col bg-neutral-50/70 hover:bg-neutral-50 p-6 sm:p-8 rounded-2xl border border-neutral-200/80 transition-all duration-300"
              >
                {/* Step Marker & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-white border border-neutral-200 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-display text-2xl font-extrabold text-neutral-300 group-hover:text-neutral-900 transition-colors">
                    {item.step}
                  </span>
                </div>

                {/* Step Headline & Prose */}
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                  {item.step} — {item.title}
                </h3>
                <p className="text-base font-medium text-neutral-800 mb-3 leading-snug">
                  {item.description}
                </p>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Discover Action */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={onStartDiscover}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            <span>Start Exploring Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
