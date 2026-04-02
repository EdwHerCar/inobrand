import React from 'react';
import '../styles/stars.css';

const CTA = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2411984848', '_blank');
  };

  return (
    <section className="py-24 min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="stars absolute inset-0"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl mb-6 text-gray-900 dark:text-white font-heading tracking-wider">
            <span className="inline-block transform rotate-180">?</span>LISTO PARA TRANSFORMAR TU PRESENCIA DIGITAL?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-700 dark:text-white/80 font-body">
            Impulsa tu marca con estrategias personalizadas y resultados tangibles
          </p>
          <button
            onClick={handleWhatsAppClick}
            className="px-8 py-4 bg-[#7B3FE4] text-white hover:bg-[#6A35C2] rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl font-body uppercase"
          >
            Solicita una asesoría
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;