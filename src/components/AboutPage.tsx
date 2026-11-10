import React from 'react';
import { ShieldCheck, Award, Building2, Users2, ArrowRight } from 'lucide-react';
import { EDITORIAL_LOUNGE_IMAGE, HERO_ARCHITECTURAL_IMAGE } from '../data/mockData';

interface AboutPageProps {
  onExploreProperties: () => void;
  onContactUs: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onExploreProperties,
  onContactUs,
}) => {
  return (
    <div className="w-full bg-white">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-18 lg:pb-20 border-b border-neutral-150">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-3">
            Our Architectural & Advisory Philosophy
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-neutral-900 uppercase tracking-tight leading-tight">
            REDEFINING RESIDENTIAL ACQUISITIONS ACROSS INDIA.
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 mt-6 leading-relaxed">
            Haven Estates was founded with a singular conviction: luxury property transactions should be characterized by rigor, architectural discernment, and verified trust—not chaotic cold calls and unvetted listings.
          </p>
        </div>
      </div>

      {/* Visual & Mission Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-b border-neutral-150">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-100 border border-neutral-200 shadow-lg">
              <img
                src={EDITORIAL_LOUNGE_IMAGE}
                alt="Architectural interior curated by Haven"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">
              The 100% Verified Standard
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Before any property appears on Haven, our in-house legal and civil engineering associates conduct an exhaustive five-point audit:
            </p>

            <ul className="space-y-3 text-sm text-neutral-700">
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                <span><strong>Deed & Encumbrance Verification:</strong> 30-year title search with municipal registration bodies.</span>
              </li>
              <li className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                <span><strong>Physical Carpet Measurement:</strong> Laser-measured interior dimensions ensuring zero discrepancy with blueprints.</span>
              </li>
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                <span><strong>Architectural Integrity:</strong> Verification of structural approvals, zoning compliances, and environmental sanctions.</span>
              </li>
              <li className="flex items-start gap-3">
                <Users2 className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                <span><strong>Zero-Intermediation Direct Access:</strong> Only direct owners or certified representatives can list.</span>
              </li>
            </ul>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onExploreProperties}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm cursor-pointer"
              >
                <span>Explore Curated Homes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onContactUs}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg cursor-pointer"
              >
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership & Footprint */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
            Nationwide Presence
          </div>
          <h2 className="font-display text-3xl font-bold text-neutral-900">
            Advisory Footprint
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Active hubs in Mumbai, Indore, Bengaluru, Pune, Bhopal, and Jabalpur.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          {[
            { city: 'Indore', role: 'Central India HQ', count: '142 Properties' },
            { city: 'Mumbai', role: 'Coastal & Penthouse Hub', count: '320 Properties' },
            { city: 'Bengaluru', role: 'South Technology Corridors', count: '264 Properties' },
            { city: 'Pune', role: 'Western Garden Residences', count: '195 Properties' },
            { city: 'Bhopal', role: 'Lakefront & Heritage Estates', count: '86 Properties' },
            { city: 'Jabalpur', role: 'Riverside Acreage & Villas', count: '58 Properties' },
          ].map((item) => (
            <div key={item.city} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <h3 className="font-display text-base font-bold text-neutral-900">{item.city}</h3>
              <p className="text-[11px] text-neutral-500 mt-0.5">{item.role}</p>
              <span className="text-xs font-semibold text-neutral-800 font-mono block mt-2">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
