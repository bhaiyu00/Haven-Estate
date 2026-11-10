import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, User } from 'lucide-react';

interface NavbarProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
  onOpenLogin: () => void;
  savedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeRoute,
  onNavigate,
  onOpenLogin,
  savedCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', route: '/' },
    { label: 'Buy', route: '/buy' },
    { label: 'Rent', route: '/rent' },
    { label: 'Projects', route: '/projects' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' },
  ];

  const handleLinkClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-neutral-150 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-6">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleLinkClick('/')}
            className="flex items-baseline gap-2 text-left group cursor-pointer focus:outline-none"
            aria-label="Haven Estates Home"
          >
            <span className="font-display text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors">
              HAVEN
            </span>
            <span className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase hidden sm:inline-block">
              ESTATES
            </span>
          </button>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleLinkClick(link.route)}
                  className={`text-sm font-medium transition-colors cursor-pointer relative py-1 focus:outline-none whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-neutral-900 font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Login & List Your Property) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {savedCount > 0 && (
              <button
                onClick={() => handleLinkClick('/properties')}
                className="text-xs font-medium text-neutral-600 hover:text-neutral-900 px-2 py-1.5 cursor-pointer"
                title="Saved Properties"
              >
                Saved ({savedCount})
              </button>
            )}

            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 px-3 py-2 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-neutral-500" />
              <span>Login</span>
            </button>

            <button
              onClick={() => handleLinkClick('/sell-property')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 px-4 py-2.5 rounded-lg shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>List Your Property</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onOpenLogin}
              className="p-2 text-neutral-700 hover:text-neutral-900 rounded-md hover:bg-neutral-100"
              aria-label="Login"
            >
              <User className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 hover:text-neutral-950 focus:outline-none rounded-md hover:bg-neutral-100"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white px-4 pt-3 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => handleLinkClick(link.route)}
                className={`flex items-center justify-between text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeRoute === link.route
                    ? 'bg-neutral-100 text-neutral-900 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-neutral-400">→</span>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onOpenLogin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-neutral-800 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
            >
              <User className="w-4 h-4 text-neutral-600" />
              <span>Login / Account</span>
            </button>

            <button
              onClick={() => handleLinkClick('/sell-property')}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <span>List Your Property</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
