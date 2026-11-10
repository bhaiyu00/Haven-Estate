import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, ChevronDown, ChevronUp, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cityOfInterest, setCityOfInterest] = useState('Indore');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const offices = [
    {
      city: 'Indore',
      address: 'Suite 602, Brilliant Titanium, Scheme No. 78, Vijay Nagar, Indore 452010',
      phone: '+91 731 498 7200',
      email: 'indore@havenestates.com'
    },
    {
      city: 'Mumbai',
      address: 'Level 18, One International Center, Elphinstone West, Mumbai 400013',
      phone: '+91 22 6820 4000',
      email: 'mumbai@havenestates.com'
    },
    {
      city: 'Bengaluru',
      address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
      phone: '+91 80 4120 8900',
      email: 'bengaluru@havenestates.com'
    }
  ];

  const faqs = [
    {
      q: 'How does Haven verify property listings?',
      a: 'Every property indexed on Haven is physically inspected by our regional field associates. We review municipal deed registries, verify title continuity for 30 years, check approved sanction layouts, and measure carpet areas using precision lasers.'
    },
    {
      q: 'Do you charge buyer brokerage fees?',
      a: 'For properties marked "Direct Listing", there is 0% brokerage charged to buyers. For institutional and advisory transactions, our transparent fee schedule is clearly documented before any site visits.'
    },
    {
      q: 'Can I list my own property on Haven?',
      a: 'Yes. Owners and developers can submit their properties via the "List Your Property" portal. Once submitted, our legal team verifies your ownership deed within 24–48 hours before the listing goes live.'
    },
    {
      q: 'Can I arrange confidential private viewings?',
      a: 'Absolutely. We specialize in discreet acquisitions for family offices, executives, and discerning private buyers with NDA-backed appointments.'
    }
  ];

  return (
    <div className="w-full bg-white py-12 lg:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-2">
            Direct Communication
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 uppercase">
            GET IN TOUCH WITH HAVEN
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            Connect with our advisory partners across India for private viewings, property listings, or strategic consultations.
          </p>
        </div>

        {/* Contact Grid: Form & Regional Offices */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-neutral-50/70 p-6 sm:p-8 rounded-2xl border border-neutral-200">
            <h2 className="font-display text-xl font-bold text-neutral-900 mb-1">
              Send an Advisory Inquiry
            </h2>
            <p className="text-xs text-neutral-500 mb-6">
              Our partners reply within 4 business hours. No spam, ever.
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-emerald-900">Message Received</h3>
                <p className="text-xs sm:text-sm text-emerald-700 mt-1">
                  Thank you, {name}. A senior advisor from our {cityOfInterest} practice has been assigned to your request and will reach out shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-5 px-4 py-2 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priyanshu Sharma"
                      className="w-full bg-white border border-neutral-200 rounded-lg py-2.5 px-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98260 00000"
                      className="w-full bg-white border border-neutral-200 rounded-lg py-2.5 px-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="priyanshu@example.com"
                      className="w-full bg-white border border-neutral-200 rounded-lg py-2.5 px-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">City of Interest</label>
                    <select
                      value={cityOfInterest}
                      onChange={(e) => setCityOfInterest(e.target.value)}
                      className="w-full bg-white border border-neutral-200 rounded-lg py-2.5 px-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 cursor-pointer"
                    >
                      <option value="Indore">Indore</option>
                      <option value="Jabalpur">Jabalpur</option>
                      <option value="Bhopal">Bhopal</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                      <option value="Bengaluru">Bengaluru</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">Your Requirements / Question</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you're looking for (e.g. 4 BHK Villa on Super Corridor, under ₹4 Cr, move-in within 6 months)..."
                    className="w-full bg-white border border-neutral-200 rounded-lg py-2.5 px-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Regional Offices */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-xl font-bold text-neutral-900 mb-4">
              Regional Practice Offices
            </h2>

            {offices.map((office) => (
              <div key={office.city} className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs">
                <h3 className="font-display text-base font-bold text-neutral-900 flex items-center justify-between">
                  <span>{office.city} Practice</span>
                  <span className="text-[11px] font-mono font-medium text-neutral-400 uppercase">Mon–Sat 9AM–7PM</span>
                </h3>

                <div className="mt-3 space-y-2 text-xs text-neutral-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>{office.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>{office.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Interactive FAQ Section */}
        <div className="pt-12 border-t border-neutral-150 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border border-neutral-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-display text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-neutral-500" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
