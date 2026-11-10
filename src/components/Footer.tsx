import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
  onSelectCity?: (city: string) => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCity, onReplayIntro }) => {
  return (
    <footer className="w-full bg-neutral-950 text-neutral-400 border-t border-neutral-850 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-2">
            <button
              onClick={() => onNavigate('/')}
              className="text-left group cursor-pointer focus:outline-none mb-4 inline-block"
            >
              <span className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                HAVEN ESTATES
              </span>
            </button>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Curated luxury properties, verified architectural homes, and institutional real estate advisory across India's fastest-growing corridors.
            </p>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-neutral-400">
              <a
                href="#linkedin"
                onClick={(e) => { e.preventDefault(); }}
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <span>·</span>
              <a
                href="#instagram"
                onClick={(e) => { e.preventDefault(); }}
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <span>·</span>
              <a
                href="#youtube"
                onClick={(e) => { e.preventDefault(); }}
                className="hover:text-white transition-colors"
              >
                YouTube
              </a>
              <span>·</span>
              <a
                href="#twitter"
                onClick={(e) => { e.preventDefault(); }}
                className="hover:text-white transition-colors"
              >
                X / Twitter
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/buy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Buy Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/rent')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Rent Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/projects')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  New Developments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/sell-property')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  List Your Property
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/properties')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  All Verified Listings
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Locations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-4">
              Popular Locations
            </h4>
            <ul className="space-y-2.5 text-sm">
              {['Indore', 'Jabalpur', 'Bhopal', 'Mumbai', 'Pune', 'Bengaluru'].map((city) => (
                <li key={city}>
                  <button
                    onClick={() => onSelectCity ? onSelectCity(city) : onNavigate('/properties')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {city} Real Estate
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-4">
              Company & Contact
            </h4>
            <ul className="space-y-3 text-xs leading-relaxed">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer text-left block text-sm"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left block text-sm"
                >
                  Contact Page
                </button>
              </li>
              <li className="flex items-start gap-2 pt-1 text-neutral-400">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>One International Center, Tower 2, Elphinstone, Mumbai 400013</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>+91 22 6820 4000</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>advisory@havenestates.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Notice & Copyright */}
        <div className="pt-8 border-t border-neutral-850 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Haven Estates Advisory Pvt. Ltd. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="hover:text-neutral-300 transition-colors cursor-pointer"
                title="Replay the landing page loading intro"
              >
                Replay Intro
              </button>
            )}
            <button
              onClick={() => alert('Privacy Policy: Haven Estates complies with all applicable Indian privacy statutes. We never sell or distribute client inquiries to third-party telemarketers.')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => alert('Terms & Conditions: All listings displayed are subject to legal verification and availability. Architectural renders and square footage are sourced directly from verified deeds or certified architectural plans.')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span className="font-mono text-neutral-600">RERA Registered</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
