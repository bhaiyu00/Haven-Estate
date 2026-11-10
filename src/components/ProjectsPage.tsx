import React, { useState } from 'react';
import { Building, Calendar, ArrowRight, Download, CheckCircle2 } from 'lucide-react';
import { UPCOMING_PROJECTS } from '../data/mockData';

interface ProjectsPageProps {
  onContactUs: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onContactUs }) => {
  const [requestedBrochureId, setRequestedBrochureId] = useState<string | null>(null);

  const handleBrochureDownload = (projId: string) => {
    setRequestedBrochureId(projId);
    setTimeout(() => {
      alert('Brochure and architectural floorplans dossier download initiated!');
    }, 500);
  };

  return (
    <div className="w-full bg-neutral-50/50 py-12 lg:py-18 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-2">
            Signature Architectural Masterplans
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 uppercase">
            NEW DEVELOPMENTS & RESIDENTIAL ENCLAVES
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            Early-allocation opportunities in vanguard architectural developments across Indore, Mumbai, and Bengaluru.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-10">
          {UPCOMING_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg transition-all grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Media */}
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto bg-neutral-100">
                <img
                  src={proj.image}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-medium tracking-wide text-white uppercase">
                  {proj.status}
                </div>
              </div>

              {/* Information */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                    <span className="font-medium text-neutral-700">{proj.location}</span>
                    <span className="font-mono">{proj.units}</span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-neutral-900 mb-1">
                    {proj.title}
                  </h2>
                  <p className="text-xs font-medium text-neutral-400 mb-4">
                    Developed by {proj.developer}
                  </p>

                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 flex items-center justify-between mb-6">
                    <div>
                      <span className="text-[11px] text-neutral-500 block">Indicative Pricing Bracket</span>
                      <span className="text-base font-bold font-display text-neutral-950">{proj.range}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-neutral-500 block">Allocation Status</span>
                      <span className="text-xs font-semibold text-emerald-700">Priority EOI Open</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => handleBrochureDownload(proj.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Dossier & Floorplans</span>
                  </button>

                  <button
                    onClick={onContactUs}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Request Private Preview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
