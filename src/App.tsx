/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PopularLocations } from './components/PopularLocations';
import { FeaturedProperties } from './components/FeaturedProperties';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SellPropertyBanner } from './components/SellPropertyBanner';
import { HowItWorks } from './components/HowItWorks';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { PropertiesPage } from './components/PropertiesPage';
import { SellPropertyPage } from './components/SellPropertyPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { ProjectsPage } from './components/ProjectsPage';
import { LoginModal } from './components/LoginModal';
import { LandingPreloader } from './components/LandingPreloader';
import { INITIAL_PROPERTIES, POPULAR_LOCATIONS } from './data/mockData';
import { Property, FilterState } from './types/property';

export default function App() {
  // Loading Landing Page State
  const [isLoading, setIsLoading] = useState(true);

  // Navigation Route State (Defaults to '/')
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const path = window.location.pathname;
    return path && path !== '' ? path : '/';
  });

  // Master Property Inventory (Editable & Extendable)
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  
  // Selected Property for Details Modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Saved Properties Set
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(['prop-1']);

  // Filter State for /properties
  const [filters, setFilters] = useState<FilterState>({
    listingType: 'all',
    city: '',
    propertyType: '',
    budgetRange: '',
    bedrooms: '',
    searchQuery: '',
    sortBy: 'featured',
  });

  // Auth State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  // Sync route with browser history
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentRoute(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search from Hero Bar -> redirects to /properties with filters
  const handleHeroSearch = (searchFilters: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...searchFilters,
      listingType: searchFilters.listingType || 'all',
    }));
    navigate('/properties');
  };

  // Location Card Click -> navigates to /properties with city filter
  const handleSelectLocation = (city: string) => {
    setFilters((prev) => ({
      ...prev,
      city,
      listingType: 'all',
    }));
    navigate('/properties');
  };

  // Nav shortcuts for Buy and Rent
  const handleNavigateWithListingType = (listingType: 'buy' | 'rent') => {
    setFilters((prev) => ({
      ...prev,
      listingType,
      city: '',
    }));
    navigate(listingType === 'buy' ? '/buy' : '/rent');
  };

  // Toggle Save Property
  const handleToggleSave = (propertyId: string) => {
    setSavedPropertyIds((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  // Add new property from /sell-property
  const handlePropertyCreated = (newProperty: Property) => {
    setProperties((prev) => [newProperty, ...prev]);
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      listingType: 'all',
      city: '',
      propertyType: '',
      budgetRange: '',
      bedrooms: '',
      searchQuery: '',
      sortBy: 'featured',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      
      {/* 2. Top Navigation Bar (Sticky, White, Compact) */}
      <Navbar
        activeRoute={currentRoute}
        onNavigate={(route) => {
          if (route === '/buy') {
            handleNavigateWithListingType('buy');
          } else if (route === '/rent') {
            handleNavigateWithListingType('rent');
          } else {
            navigate(route);
          }
        }}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        savedCount={savedPropertyIds.length}
      />

      {/* Main Page Rendering Based on Route */}
      <main className="flex-1">
        {/* Route: Default Landing Page at '/' */}
        {currentRoute === '/' && (
          <div className="w-full animate-in fade-in duration-200">
            {/* 1. Hero Section */}
            <HeroSection
              onSearch={handleHeroSearch}
              onExploreProperties={() => navigate('/properties')}
              onListProperty={() => navigate('/sell-property')}
            />

            {/* 3. Popular Locations */}
            <PopularLocations
              locations={POPULAR_LOCATIONS}
              onSelectLocation={handleSelectLocation}
            />

            {/* 4. Featured Properties Preview */}
            <FeaturedProperties
              properties={properties}
              onViewDetails={(prop) => setSelectedProperty(prop)}
              onViewAll={() => navigate('/properties')}
              savedPropertyIds={savedPropertyIds}
              onToggleSave={handleToggleSave}
            />

            {/* 5. Why Choose Our Platform */}
            <WhyChooseUs
              onExploreProperties={() => navigate('/properties')}
              onContactUs={() => navigate('/contact')}
            />

            {/* 6. Sell Your Property Banner */}
            <SellPropertyBanner
              onListProperty={() => navigate('/sell-property')}
            />

            {/* 7. How It Works */}
            <HowItWorks
              onStartDiscover={() => navigate('/properties')}
            />

            {/* 8. Final CTA Section */}
            <FinalCta
              onExploreProperties={() => navigate('/properties')}
              onContactUs={() => navigate('/contact')}
            />
          </div>
        )}

        {/* Route: Property Discovery (/properties, /buy, /rent) */}
        {(currentRoute === '/properties' || currentRoute === '/buy' || currentRoute === '/rent') && (
          <PropertiesPage
            properties={properties}
            filters={{
              ...filters,
              listingType: currentRoute === '/buy' ? 'buy' : currentRoute === '/rent' ? 'rent' : filters.listingType,
            }}
            onFilterChange={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
            onResetFilters={handleResetFilters}
            onViewDetails={(prop) => setSelectedProperty(prop)}
            savedPropertyIds={savedPropertyIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {/* Route: Sell Your Property (/sell-property) */}
        {currentRoute === '/sell-property' && (
          <SellPropertyPage
            onPropertyCreated={handlePropertyCreated}
            onNavigateHome={() => navigate('/')}
          />
        )}

        {/* Route: Projects (/projects) */}
        {currentRoute === '/projects' && (
          <ProjectsPage
            onContactUs={() => navigate('/contact')}
          />
        )}

        {/* Route: About (/about) */}
        {currentRoute === '/about' && (
          <AboutPage
            onExploreProperties={() => navigate('/properties')}
            onContactUs={() => navigate('/contact')}
          />
        )}

        {/* Route: Contact (/contact) */}
        {currentRoute === '/contact' && (
          <ContactPage />
        )}
      </main>

      {/* 9. Landing Page Footer */}
      <Footer
        onNavigate={navigate}
        onSelectCity={handleSelectLocation}
        onReplayIntro={() => setIsLoading(true)}
      />

      {/* Loading Landing Page Preloader */}
      {isLoading && (
        <LandingPreloader onComplete={() => setIsLoading(false)} />
      )}

      {/* Detail Modal for Property Details */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isSaved={selectedProperty ? savedPropertyIds.includes(selectedProperty.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Login & Account Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onLogin={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
      />

    </div>
  );
}
