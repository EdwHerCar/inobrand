import React, { useRef, useEffect, useState } from 'react';
import { useWhatsAppButton } from '../context/WhatsAppButtonContext';
import { videos } from '../data/videos';

const ServiceShowcase = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const { setIsServiceShowcaseVisible } = useWhatsAppButton();
  const [isButtonFlashing, setIsButtonFlashing] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Usaremos el primer video vertical disponible en Supabase
  const displayVideo = videos.find(v => v.type === 'vertical') || videos[0];

  useEffect(() => {
    // Detectar tipo de dispositivo para ajustar configuración
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Video visibility observer options
    const videoOptions = {
      root: null,
      rootMargin: isMobile ? '100px' : '50px',
      threshold: isMobile ? 0.3 : 0.5,
    };
    
    // Eliminamos control directo de reproducción: el iframe de YouTube se autogestiona
    
    // Handle video visibility - controla tanto UI como reproducción
    const handleVideoIntersection = (entries) => {
      entries.forEach((entry) => {
        const isVisible = entry.isIntersecting;
        
        // Actualizar estados de UI
        setIsVideoVisible(isVisible);
        setIsServiceShowcaseVisible(isVisible);
        
        // Mantener solo visibilidad/UI; YouTube gestiona reproducción interna
      });
    };

    // Crear un solo observer para el video
    const videoObserver = new IntersectionObserver(handleVideoIntersection, videoOptions);
    
    // Observar solo la sección completa en su lugar
    if (sectionRef.current) {
      videoObserver.observe(sectionRef.current);
    }

    // Set up button flashing animation
    const flashingInterval = setInterval(() => {
      setIsButtonFlashing(prev => !prev);
    }, 800);

    return () => {
      // Cleanup observer
      videoObserver.disconnect();
      
      // Reset WhatsApp button visibility when component unmounts
      setIsServiceShowcaseVisible(false);
      
      // Clear flashing interval
      clearInterval(flashingInterval);
    };
  }, [videoLoaded, setIsServiceShowcaseVisible]);

  // Controlar reproducción según visibilidad de la sección
  useEffect(() => {
    if (!videoLoaded || !videoRef.current) return;
    try {
      if (isVideoVisible) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
             console.warn('Autoplay prevented in Showcase:', error);
          });
        }
      } else {
        videoRef.current.pause();
      }
    } catch (_) {}
  }, [isVideoVisible, videoLoaded]);

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

  // Fix para que Safari lo inicie en mute
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
    }
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2411984848', '_blank');
  };

  // Handle iframe load events
  const handleIframeLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleIframeError = () => {
    setVideoError(true);
    setVideoLoaded(false);
    console.error('Error al cargar el video en ServiceShowcase');
  };

  const unmuteVideo = (e) => {
    try {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play();
        setIsMuted(false);
      }
    } catch (_) {}
  };

  return (
    <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 mt-8 sm:mt-12 lg:mt-16 min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] flex items-center">
      <div className="w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-light-text dark:text-white leading-tight">
          ¡Listos para el lanzamiento!
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16">
          {/* Video mockup container */}
          <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-1">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[380px] xl:max-w-[420px] mx-auto">
              <div className="absolute top-[3%] left-[6%] right-[6%] bottom-[2%] rounded-[32px] sm:rounded-[36px] md:rounded-[40px] overflow-hidden">
                <div className="w-full h-full relative">
                  {/* Loading placeholder */}
                  {!videoLoaded && !videoError && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary"></div>
                    </div>
                  )}
                  
                  {/* Error fallback */}
                  {videoError && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <div className="text-center text-gray-600 dark:text-gray-400 px-4">
                        <p className="text-xs sm:text-sm">Video no disponible</p>
                        <button 
                          onClick={() => {
                            setVideoError(false);
                            if (videoRef.current) {
                              videoRef.current.load();
                            }
                          }}
                          className="mt-2 text-xs text-primary hover:underline"
                        >
                          Reintentar
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className={`absolute inset-0 overflow-hidden transition-opacity duration-300 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <video
                      ref={videoRef}
                      src={displayVideo.src}
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      autoPlay
                      muted
                      loop
                      playsInline
                      onLoadedData={handleIframeLoad}
                      onError={(e) => {
                        console.error('Error loading video in ServiceShowcase:', displayVideo.id, e.nativeEvent);
                        if (videoRef.current && displayVideo.fallback && !videoRef.current.src.endsWith('.webm')) {
                           videoRef.current.src = displayVideo.fallback.replace('.mp4', '.webm').replace('.mov', '.webm');
                           videoRef.current.load();
                        } else {
                           handleIframeError();
                        }
                      }}
                    />
                    {videoLoaded && !videoError && isMuted && (
                      <button
                        type="button"
                        onClick={unmuteVideo}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-gradient-to-b from-white to-white/90 text-black rounded-full shadow-lg hover:from-white hover:to-white/80 p-4 focus:outline-none focus:ring-2 focus:ring-white/70"
                        aria-label="Activar audio"
                        title="Activar audio"
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M11 5l-6 4H3v6h2l6 4V5z"></path>
                          <path d="M19 7c.7 1.1 1 2.4 1 5s-.3 3.9-1 5" />
                          <path d="M15 9.5c.4.7.6 1.5.6 2.5s-.2 1.8-.6 2.5" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <img 
                src="/images/i15.svg" 
                alt="iPhone 15 mockup" 
                className="w-full h-auto relative z-20"
              />
              
              {/* WhatsApp button inside the mockup */}
              <button
                onClick={handleWhatsAppClick}
                className={`absolute bottom-[8%] sm:bottom-[9%] md:bottom-[10%] left-1/2 transform -translate-x-1/2 z-30 py-2 sm:py-3 px-4 sm:px-6 rounded-full ${isButtonFlashing ? 'bg-white text-red-600' : 'bg-red-600 text-white'} font-bold transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 w-[75%] sm:w-[80%] justify-center text-sm sm:text-base md:text-lg animate-pulse`}
                aria-label="Click Aquí"
              >
                <span>¡Click Aquí!</span>
              </button>
            </div>
          </div>

          {/* Services list container */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-2">
            <ul className="space-y-6 sm:space-y-8 lg:space-y-10 xl:space-y-12">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 w-2 h-2 sm:w-2.5 sm:h-2.5 mt-2 sm:mt-2.5 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                    <div className="flex flex-col">
                      <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-light-text dark:text-white mb-2 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-light-muted dark:text-dark-muted leading-relaxed">
                        {service.description}
                      </p>
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