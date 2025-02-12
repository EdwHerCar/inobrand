import React from 'react';

const Services = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-8 md:grid-rows-6 gap-4 p-4">
      {/* Estrategias - Large tile */}
      <div className="md:col-span-5 md:row-span-3 p-6 rounded-2xl bg-gradient-to-br from-primary to-tertiary text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Estrategias</h3>
        <p className="text-gray-100">Optimiza la presencia online mediante campañas personalizadas.</p>
      </div>

      {/* Creación de contenido */}
      <div className="md:col-span-3 md:row-span-3 md:col-start-6 p-6 rounded-2xl bg-gradient-to-br from-secondary to-highlight text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Creación de contenido</h3>
        <p className="text-gray-100">Material visual y escrito adaptado a las necesidades de tu marca.</p>
      </div>

      {/* Manejo de redes */}
      <div className="md:col-span-4 md:row-span-3 md:row-start-4 p-6 rounded-2xl bg-gradient-to-br from-tertiary to-accent text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Manejo de redes</h3>
        <p className="text-gray-100">Gestión de cuentas para aumentar la interacción y visibilidad online.</p>
      </div>

      {/* Pauta publicitaria */}
      <div className="md:col-span-4 md:row-span-3 md:col-start-5 md:row-start-4 p-6 rounded-2xl bg-gradient-to-br from-primary via-tertiary to-secondary text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Pauta publicitaria</h3>
        <p className="text-gray-100">Gestión de campañas pagadas para aumentar visibilidad y conversiones.</p>
      </div>
    </div>
  );
};

export default Services;