import React, { useState } from 'react';
import { 
  X, MapPin, BedDouble, Bath, Maximize2, ShieldCheck, 
  Phone, Mail, Calendar, Calculator, Check, ArrowRight, Share2, Heart
} from 'lucide-react';
import { Property } from '../types/property';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: (propertyId: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isSaved = false,
  onToggleSave,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('I am interested in scheduling a private viewing for this property.');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  if (!property) return null;

  // Mortgage EMI Calculation
  const principal = property.listingType === 'buy' ? property.price * 0.8 : 0;
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanTenureYears * 12;
  const calculatedEmi = principal > 0
    ? Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1))
    : 0;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;
    setInquirySubmitted(true);
  };

  const images = property.gallery && property.gallery.length > 0 
    ? property.gallery 
    : [property.image];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6">
        
        {/* Sticky Header with Actions */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-neutral-150">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="font-semibold text-neutral-900 uppercase">{property.category}</span>
            <span>·</span>
            <span>{property.locality}, {property.city}</span>
          </div>

          <div className="flex items-center gap-2">
            {onToggleSave && (
              <button
                onClick={() => onToggleSave(property.id)}
                className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 hover:text-red-500 transition-colors cursor-pointer"
                aria-label={isSaved ? 'Remove from saved' : 'Save property'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            )}

            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Property link copied to clipboard!');
                }
              }}
              className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          
          {/* Main Gallery Display */}
          <div className="mb-6">
            <div className="relative aspect-[16/9] bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 mb-3">
              <img
                src={images[activeImageIndex] || property.image}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {property.isVerified && (
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-900 shadow-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Title & Deed Verified</span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-neutral-900 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Title & Price Strip */}
          <div className="flex flex-col md:flex-row md:items-start justify-between pb-6 border-b border-neutral-150 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                <MapPin className="w-4 h-4 text-neutral-400" />
                <span>{property.address}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">
                {property.title}
              </h2>
            </div>

            <div className="text-left md:text-right">
              <span className="text-3xl font-display font-extrabold text-neutral-950 tabular-nums">
                {property.formattedPrice}
              </span>
              {property.pricePerSqFt && (
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Rate: {property.pricePerSqFt}
                </p>
              )}
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-neutral-150 text-center sm:text-left">
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
              <span className="text-xs text-neutral-500">Bedrooms</span>
              <p className="text-lg font-bold text-neutral-900 mt-1 flex items-center gap-1.5 sm:justify-start justify-center">
                <BedDouble className="w-4 h-4 text-neutral-500" />
                <span>{property.bedrooms} BHK</span>
              </p>
            </div>

            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
              <span className="text-xs text-neutral-500">Bathrooms</span>
              <p className="text-lg font-bold text-neutral-900 mt-1 flex items-center gap-1.5 sm:justify-start justify-center">
                <Bath className="w-4 h-4 text-neutral-500" />
                <span>{property.bathrooms} Baths</span>
              </p>
            </div>

            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
              <span className="text-xs text-neutral-500">Carpet Area</span>
              <p className="text-lg font-bold text-neutral-900 mt-1 flex items-center gap-1.5 sm:justify-start justify-center">
                <Maximize2 className="w-4 h-4 text-neutral-500" />
                <span className="tabular-nums">{property.areaSqFt.toLocaleString()} sq.ft</span>
              </p>
            </div>

            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
              <span className="text-xs text-neutral-500">Built Year / Parking</span>
              <p className="text-lg font-bold text-neutral-900 mt-1 flex items-center gap-1.5 sm:justify-start justify-center">
                <Calendar className="w-4 h-4 text-neutral-500" />
                <span>{property.yearBuilt || 2024} · {property.parkingSpaces || 2} Bays</span>
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="py-6 border-b border-neutral-150">
            <h3 className="font-display text-base font-bold text-neutral-900 mb-2">
              Architectural Overview
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities Checklist */}
          <div className="py-6 border-b border-neutral-150">
            <h3 className="font-display text-base font-bold text-neutral-900 mb-3">
              Features & Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                  <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mortgage EMI Calculator (if Buy property) */}
          {property.listingType === 'buy' && (
            <div className="py-6 border-b border-neutral-150 bg-neutral-50/70 p-5 rounded-xl border border-neutral-200/80">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-4 h-4 text-neutral-700" />
                <h3 className="font-display text-sm font-bold text-neutral-900 uppercase">
                  Estimated Mortgage Payment
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="text-[11px] text-neutral-500 block mb-1">Loan Tenure (Years)</label>
                  <select
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                    className="w-full bg-white border border-neutral-300 rounded-lg py-2 px-3 text-xs font-medium"
                  >
                    <option value={15}>15 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={25}>25 Years</option>
                    <option value={30}>30 Years</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-neutral-500 block mb-1">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-white border border-neutral-300 rounded-lg py-2 px-3 text-xs font-medium"
                  />
                </div>

                <div className="bg-white p-3 rounded-lg border border-neutral-200 text-center sm:text-right">
                  <span className="text-[11px] text-neutral-500">Estimated Monthly EMI</span>
                  <p className="text-xl font-bold font-display text-neutral-950 tabular-nums">
                    ₹{calculatedEmi.toLocaleString()} / mo
                  </p>
                  <span className="text-[10px] text-neutral-400">Assumes 20% down payment</span>
                </div>
              </div>
            </div>
          )}

          {/* Representative & Direct Inquiry Form */}
          <div className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Agent Profile */}
              <div className="md:col-span-5 bg-neutral-50 p-5 rounded-xl border border-neutral-200">
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-3">
                  Authorized Advisory Partner
                </span>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    className="w-12 h-12 rounded-full object-cover border border-neutral-300"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">{property.agent.name}</h4>
                    <p className="text-xs text-neutral-500">{property.agent.role}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-neutral-700">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{property.agent.email}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="md:col-span-7">
                <h3 className="font-display text-base font-bold text-neutral-900 mb-1">
                  Schedule Private Viewing or Direct Enquiry
                </h3>
                <p className="text-xs text-neutral-500 mb-4">
                  Direct inquiry to authorized partner. No broker spam or telemarketing.
                </p>

                {inquirySubmitted ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                    <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm font-bold text-emerald-900">Enquiry Dispatched Successfully</p>
                    <p className="text-xs text-emerald-700 mt-1">
                      {property.agent.name} has been notified and will contact you via WhatsApp / Phone within 2 hours.
                    </p>
                    <button
                      onClick={() => setInquirySubmitted(false)}
                      className="mt-3 text-xs font-semibold text-emerald-800 underline cursor-pointer"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-neutral-600 block mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder="e.g. Arjun Mehra"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-neutral-600 block mb-1">Mobile Phone *</label>
                        <input
                          type="tel"
                          required
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-neutral-600 block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="arjun@company.com"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-neutral-600 block mb-1">Message / Preference</label>
                      <textarea
                        rows={2}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      <span>Request Private Viewing & Information Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
