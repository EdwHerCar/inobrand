import React from 'react';

const Services = () => {
  return (
    <div className="md:grid md:grid-cols-7 md:grid-rows-9 gap-4 min-h-[800px] p-8 lg:p-16 xl:p-24 flex flex-col space-y-8 md:space-y-0"> {/* Increased mobile spacing */}
      {/* Title Section */}
      <div className="md:col-span-3 md:row-span-3 md:col-start-3 md:row-start-4 p-8 rounded-2xl bg-gradient-to-br from-secondary to-highlight text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white font-heading">Nuestros Servicios</h2>
      </div>

      {/* Estrategias Section */}
      <div className="md:col-span-5 md:row-span-3 md:col-start-1 md:row-start-1 p-8 rounded-2xl bg-gradient-to-br from-primary to-tertiary text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-center">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white font-heading">Estrategias</h3>
        <p className="text-white text-base md:text-lg lg:text-xl font-body">Optimiza la presencia online mediante campañas personalizadas.</p>
      </div>

      {/* Creación de contenido Section */}
      <div className="md:col-span-2 md:row-span-6 md:col-start-6 md:row-start-1 p-6 rounded-2xl bg-gradient-to-br from-primary via-tertiary to-secondary text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-center">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white font-heading">Creación de contenido</h3>
        <p className="text-white text-base md:text-lg lg:text-xl font-body">Material visual y escrito adaptado a las necesidades de tu marca.</p>
      </div>

      {/* Pauta publicitaria Section */}
      <div className="md:col-span-2 md:row-span-6 md:col-start-1 md:row-start-4 p-6 rounded-2xl bg-gradient-to-br from-secondary via-highlight to-accent text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-center">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white font-heading">Pauta publicitaria</h3>
        <p className="text-white text-base md:text-lg lg:text-xl font-body">Gestión de campañas pagadas para aumentar visibilidad y conversiones.</p>
      </div>

      {/* Manejo de redes Section */}
      <div className="md:col-span-5 md:row-span-3 md:col-start-3 md:row-start-7 p-8 rounded-2xl bg-gradient-to-br from-tertiary to-accent text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-center">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white font-heading">Manejo de redes</h3>
        <p className="text-white text-base md:text-lg lg:text-xl font-body">Gestión de cuentas para aumentar la interacción y visibilidad online.</p>
      </div>
    </div>
  );
};

export default Services;