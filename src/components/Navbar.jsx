import React from 'react';

const Navbar = () => {
  return (
    <nav className="py-2">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center">
          <a href="#" className="flex items-center space-x-2">
            <img
              src="/images/inobrand-logo.png"
              alt="InoBrand Logo"
              className="w-16 h-16 object-contain"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">InoBrand</span>
          </a>
        </div>
        <button className="bg-primary hover:bg-tertiary text-white font-medium py-2 px-6 rounded-full transition-colors">
          Let's Chat
        </button>
      </div>
    </nav>
  );
};

export default Navbar;