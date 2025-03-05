import React, { useEffect, useRef } from 'react';

const ServiceShowcase = () => {
  const videoRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current.muted = false;
        } else {
          videoRef.current.muted = true;
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);

    if (videoRef.current) {
      observerRef.current.observe(videoRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const services = [{
    title: 'Deja huella',
    description: 'Hazte notar en un mundo saturado de contenido'
  }, {
    title: 'Llevas mapa',
    description: 'Con estrategias creadas especialmente para las necesidades de tu negocio; es más fácil alcanzar objetivos'
  }, {
    title: 'Otras galaxias',
    description: 'Llega incluso a aquellos que aún no te conocen'
  }, {
    title: 'El tiempo es oro',
    description: 'Nos encargamos de hacerte visible, mientras tú te ocupas de la operación de tu negocio'
  }];

  return (
    <div className="container mx-auto px-6 py-4 min-h-[600px] flex items-center">
      <div className="w-full">
        <h2 className="text-4xl font-bold text-center mb-8 text-light-text dark:text-white">¡Listos para el lanzamiento!</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Video mockup container */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[360px] mx-auto">
              <div className="absolute top-[4%] left-[6%] right-[6%] bottom-[4%] rounded-[40px] overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center"
                >
                  <source src="/videos/1.mov" type="video/mp4" />
                </video>
              </div>
              <img 
                src="/images/i15.svg" 
                alt="iPhone 15 mockup" 
                className="w-full h-auto relative z-20"
              />
            </div>
          </div>

          {/* Services list container */}
          <div className="w-full md:w-1/2">
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-light-text dark:text-white mb-1">{service.title}</h3>
                      <p className="text-sm text-light-muted dark:text-dark-muted">{service.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceShowcase;