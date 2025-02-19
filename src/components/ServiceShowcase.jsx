import React from 'react';

const ServiceShowcase = () => {
  const services = [
    {
      title: 'Deja huella',
      description: 'Hazte notar en un mundo saturado de contenido'
    },
    {
      title: 'Llevas mapa',
      description: 'Con estrategias creadas especialmente para las necesidades de tu negocio; es más fácil alcanzar objetivos'
    },
    {
      title: 'Otras galaxias',
      description: 'Llega incluso a aquellos que aún no te conocen'
    },
    {
      title: 'El tiempo es oro',
      description: 'Nos encargamos de hacerte visible, mientras tú te ocupas de la operación de tu negocio'
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-12 text-light-text dark:text-white">¡Listos para el lanzamiento!</h2>
      <div className="flex flex-col md:flex-row items-stretch gap-12">
        {/* Image container */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full h-full max-w-sm rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
            <img
              src="/images/wp.png"
              alt="InoBrand Services"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Services list container */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <ul className="space-y-8 h-full flex flex-col justify-between py-4">
            {services.map((service, index) => (
              <li
                key={index}
                className="transform hover:-translate-y-1 transition-transform duration-300 flex-1"
              >
                <div className="flex items-start space-x-4 h-full">
                  <div className="flex-shrink-0 w-2 h-2 mt-3 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                  <div className="flex flex-col justify-center h-full">
                    <h3 className="text-2xl font-semibold text-light-text dark:text-white mb-3">{service.title}</h3>
                    <p className="text-lg text-light-muted dark:text-dark-muted">{service.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceShowcase;