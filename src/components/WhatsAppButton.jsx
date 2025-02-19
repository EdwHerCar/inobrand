import React from 'react';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/573023453069', '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
      aria-label="Contact on WhatsApp"
    >
      <img
        src="/images/wa.png"
        alt="WhatsApp"
        className="w-8 h-8"
      />
    </button>
  );
};

export default WhatsAppButton;