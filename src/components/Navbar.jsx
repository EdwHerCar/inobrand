import React from 'react';

const Navbar = () => {
  return (
    <nav className="hidden sm:fixed sm:top-0 sm:left-0 sm:right-0 z-50 bg-dark-bg/90 dark:bg-dark-bg/90 light:bg-light-bg/90 backdrop-blur-md py-2 sm:py-3 lg:py-4 transition-all duration-300">
      <div className="container mx-auto flex justify-center px-4 sm:px-6 lg:px-8">
        <a href="#hero-section" className="inline-block hover:scale-110 transition-transform duration-300" aria-label="Ir al inicio">
          <img
            src="/images/inobrand-logo.png"
            alt="InoBrand Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 object-contain transition-all duration-300"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;