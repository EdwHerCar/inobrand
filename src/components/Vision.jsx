import React from 'react';
import ParticlesBackground from './ParticlesBackground';
import Footer from './Footer';

const Vision = ({ onClose }) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-light-bg dark:bg-dark-bg">
      <ParticlesBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="mt-4 flex justify-end px-4">
          <button
            onClick={onClose}
            className="text-3xl text-light-text dark:text-dark-text hover:text-primary transition-colors"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-light-text dark:text-dark-text">
              Nuestra Visión
            </h1>
            <div className="bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
              <p className="text-lg text-light-text dark:text-dark-text mb-6">
                Posicionar a Inobrand como la agencia de marketing digital número uno en Tlaxcala a través de la generación de contenidos disruptivos y de valor.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Vision;