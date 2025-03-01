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
    <div className="container mx-auto px-6 py-4">
      <h2 className="text-4xl font-bold text-center mb-4 text-light-text dark:text-white">¡Listos para el lanzamiento!</h2>
      <div className="flex flex-col md:flex-row items-stretch gap-4">
        {/* Video mockup container */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="iphone-mockup w-full max-w-[200px] mx-auto rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="notch"></div>
            <div className="screen">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/1.mov" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* Services list container */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <ul className="space-y-1 h-full flex flex-col justify-between py-1">
            {services.map((service, index) => (
              <li
                key={index}
                className="transform hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-start space-x-2 h-full">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-light-text dark:text-white mb-1">{service.title}</h3>
                    <p className="text-sm text-light-muted dark:text-dark-muted">{service.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .iphone-mockup {
          position: relative;
          width: 100%;
          max-width: 280px;
          padding-top: 177.78%;
          background: #1a1a1a;
          border-radius: 3rem;
          border: 6px solid #2d2d2d;
          margin: 2rem auto;
          overflow: hidden;
        }

        .notch {
          position: absolute;
          top: 0.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: 30%;
          height: 1rem;
          background: #000;
          border-radius: 0.75rem;
          z-index: 2;
        }

        .screen {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          border-radius: 2.5rem;
        }
      `}</style>
    </div>
  );
};

export default ServiceShowcase;