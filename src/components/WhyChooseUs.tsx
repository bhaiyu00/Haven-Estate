import React from 'react';
import { ShieldCheck, Compass, MessageSquareQuote, UserCheck, ArrowRight } from 'lucide-react';
import { EDITORIAL_LOUNGE_IMAGE, WHY_CHOOSE_BENEFITS } from '../data/mockData';

interface WhyChooseUsProps {
  onExploreProperties: () => void;
  onContactUs: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  onExploreProperties,
  onContactUs,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'benefit-1':
        return <ShieldCheck className="w-5 h-5 text-neutral-900" />;
      case 'benefit-2':
        return <Compass className="w-5 h-5 text-neutral-900" />;
      case 'benefit-3':
        return <MessageSquareQuote className="w-5 h-5 text-neutral-900" />;
      case 'benefit-4':
        return <UserCheck className="w-5 h-5 text-neutral-900" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-neutral-900" />;
    }
  };

  return (
    <section className="w-full bg-white py-16 lg:py-24 border-b border-neutral-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-2">
            The Haven Standard
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 uppercase leading-tight">
            PROPERTY SEARCH, WITHOUT THE COMPLEXITY.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed">
            Real estate in India is often overwhelmed by phantom listings, repetitive cold calls, and unverified titles. We built an intentional platform engineered around physical verification, legal transparency, and direct relationships.
          </p>
        </div>

        {/* Asymmetric Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: 4 Editorial Key Benefits */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            {WHY_CHOOSE_BENEFITS.map((benefit) => (
              <div
                key={benefit.id}
                className="group relative pb-6 border-b border-neutral-150 last:border-b-0"
              >
                <div className="flex items-start gap-4">
                  {/* Clean number & icon */}
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 group-hover:bg-neutral-200 transition-colors">
                    {getIcon(benefit.id)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-semibold text-neutral-400">
                        {benefit.number}.
                      </span>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-900">
                        {benefit.title}
                      </h3>
                    </div>

                    <p className="text-xs font-medium text-neutral-500 mt-0.5">
                      {benefit.subtitle}
                    </p>

                    <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                      {benefit.description}
                    </p>

                    <div className="mt-3 inline-flex items-center gap-2 text-xs font-mono font-semibold text-neutral-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      <span>{benefit.statLabel}: <strong className="font-bold">{benefit.stat}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onExploreProperties}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <span>Browse Verified Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onContactUs}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-800 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <span>Speak with an Advisor</span>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Architecture Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] bg-neutral-100 border border-neutral-200">
              <img
                src={EDITORIAL_LOUNGE_IMAGE}
                alt="Editorial architectural sunlit living room with natural stone fireplace and bespoke furniture"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Scrim and testimonial / proof marker */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <blockquote className="text-sm sm:text-base font-normal italic leading-relaxed text-neutral-200">
                  "Haven eliminated the chaos of our inter-city relocation. Every property we visited in Indore and Mumbai matched its deed, carpet area, and specifications to the millimeter."
                </blockquote>
                
                <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-neutral-300">
                  <div>
                    <p className="font-semibold text-white">Dr. Vikrant & Neha Saxena</p>
                    <p className="text-[11px] text-neutral-400">Acquired in 2025 · The Solarium Residence</p>
                  </div>
                  <span className="font-mono text-[11px] text-neutral-400">Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
