import React from 'react';

const Services = () => {
  return (
    <div className="md:grid md:grid-cols-7 md:grid-rows-9 gap-4 min-h-[800px] p-8 flex flex-col space-y-4 md:space-y-0">
      {/* Title Section */}
      <div className="md:col-span-3 md:row-span-3 md:col-start-3 md:row-start-4 p-8 rounded-2xl bg-gradient-to-br from-secondary to-highlight text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Nuestros Servicios</h2>
      </div>

      {/* Estrategias Section */}
      <div className="md:col-span-5 md:row-span-3 md:col-start-1 md:row-start-1 p-8 rounded-2xl bg-gradient-to-br from-primary to-tertiary text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-4 text-white">Estrategias</h3>
        <p className="text-white">Optimiza la presencia online mediante campañas personalizadas.</p>
      </div>

      {/* Creación de contenido Section */}
      <div className="md:col-span-2 md:row-span-6 md:col-start-6 md:row-start-1 p-6 rounded-2xl bg-gradient-to-br from-primary via-tertiary to-secondary text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-4 text-white">Creación de contenido</h3>
        <p className="text-white">Material visual y escrito adaptado a las necesidades de tu marca.</p>
      </div>

      {/* Pauta publicitaria Section */}
      <div className="md:col-span-2 md:row-span-6 md:col-start-1 md:row-start-4 p-6 rounded-2xl bg-gradient-to-br from-secondary via-highlight to-accent text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-4 text-white">Pauta publicitaria</h3>
        <p className="text-white">Gestión de campañas pagadas para aumentar visibilidad y conversiones.</p>
      </div>

      {/* Manejo de redes Section */}
      <div className="md:col-span-5 md:row-span-3 md:col-start-3 md:row-start-7 p-8 rounded-2xl bg-gradient-to-br from-tertiary to-accent text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-4 text-white">Manejo de redes</h3>
        <p className="text-white">Gestión de cuentas para aumentar la interacción y visibilidad online.</p>
      </div>
    </div>
  );
};

export default Services;