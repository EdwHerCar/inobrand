import React from 'react';

const CTA = () => {
  return (
    <section className="py-16 rounded-lg text-center px-4">
      <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent uppercase">¿LISTO PARA TRANSFORMAR TU PRESENCIA DIGITAL?</h2>
      <p className="text-dark-muted text-xl mb-8 max-w-2xl mx-auto">Impulsa tu marca con estrategias personalizadas y resultados tangibles</p>
      <button className="bg-gradient-to-r from-primary via-tertiary to-secondary text-white font-medium py-3 px-8 rounded-full transition-all hover:shadow-lg hover:shadow-primary/20">
        SOLICITA UNA ASESORIA
      </button>
    </section>
  );
};

export default CTA;