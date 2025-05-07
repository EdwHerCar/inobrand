import React from 'react';
import { useWhatsAppButton } from '../context/WhatsAppButtonContext';

const WhatsAppButton = () => {
  const {
    isSloganVisible,
    isHeroVisible,
    isContactVisible,
    isContenidoVisible,
    isServiceShowcaseVisible
  } = useWhatsAppButton();
  
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2411984848', '_blank');
  };

  // Mostrar el botón en todas las secciones excepto las tres primeras
  const isInFirstThreeSections = isSloganVisible || isHeroVisible || isServiceShowcaseVisible;
  if (isInFirstThreeSections) return null;

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