import React from 'react';

const Navbar = () => {
  return (
    <nav className="hidden md:fixed md:top-0 md:left-0 md:right-0 z-50 bg-dark-bg/80 backdrop-blur-sm py-2">
      <div className="container mx-auto flex justify-center px-6">
        <a href="#" className="inline-block">
          <img
            src="/images/inobrand-logo.png"
            alt="InoBrand Logo"
            className="w-16 h-16 object-contain"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;