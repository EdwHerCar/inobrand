import React, { useEffect, useRef, useState } from 'react';
import { useWhatsAppButton } from '../context/WhatsAppButtonContext';

const ServiceShowcase = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const observerRef = useRef(null);
  const { setIsServiceShowcaseVisible } = useWhatsAppButton();
  const [isButtonFlashing, setIsButtonFlashing] = useState(false);

  useEffect(() => {
    // Video playback observer options
    const videoOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    
    // Section visibility observer options
    const sectionOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    // Handle video playback based on visibility
    const handleVideoIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && videoRef.current) {
          // Ensure video is muted initially to allow autoplay
          videoRef.current.muted = true;
          
          // Try to play the video immediately if it's already loaded
          if (videoRef.current.readyState >= 2) {
            playVideo();
          } else {
            // If video is not loaded, wait for it
            videoRef.current.addEventListener('loadeddata', playVideo, { once: true });
          }
        } else if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.muted = true;
        }
      });
    };

    // Helper function to handle video playback
    const playVideo = () => {
      if (!videoRef.current) return;
      
      videoRef.current.play()
        .then(() => {
          // Unmute after successful autoplay
          videoRef.current.muted = false;
        })
        .catch(error => {
          console.log('Autoplay failed:', error);
          // Keep video muted and try to play again
          videoRef.current.play().catch(innerError => {
            console.log('Muted autoplay also failed:', innerError);
          });
        });
    };
    
    // Handle section visibility for WhatsApp button toggle
    const handleSectionIntersection = (entries) => {
      entries.forEach((entry) => {
        setIsServiceShowcaseVisible(entry.isIntersecting);
      });
    };

    // Create observers
    const videoObserver = new IntersectionObserver(handleVideoIntersection, videoOptions);
    const sectionObserver = new IntersectionObserver(handleSectionIntersection, sectionOptions);
    
    // Store video observer reference for cleanup
    observerRef.current = videoObserver;

    // Observe video for playback control
    if (videoRef.current) {
      videoRef.current.muted = true; // Initially muted to allow autoplay
      videoObserver.observe(videoRef.current);
    }
    
    // Observe section for WhatsApp button visibility
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    // Set up button flashing animation
    const flashingInterval = setInterval(() => {
      setIsButtonFlashing(prev => !prev);
    }, 800);

    return () => {
      // Cleanup both observers
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      sectionObserver.disconnect();
      
      // Reset WhatsApp button visibility when component unmounts
      setIsServiceShowcaseVisible(false);
      
      // Clear flashing interval
      clearInterval(flashingInterval);
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

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2411984848', '_blank');
  };

  return (
    <div ref={sectionRef} className="container mx-auto px-6 py-8 mt-16 min-h-[600px] flex items-center">
      <div className="w-full">
        <h2 className="text-5xl lg:text-6xl md:text-5xl sm:text-4xl font-bold text-center mb-16 text-light-text dark:text-white">¡Listos para el lanzamiento!</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
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
                  preload="auto"
                  className="w-full h-full object-cover object-center"
                >
                  <source src="/videos/1.mp4" type="video/mp4" />
                </video>
              </div>
              <img 
                src="/images/i15.svg" 
                alt="iPhone 15 mockup" 
                className="w-full h-auto relative z-20"
              />
              
              {/* WhatsApp button inside the mockup */}
              <button
                onClick={handleWhatsAppClick}
                className={`absolute bottom-[10%] left-1/2 transform -translate-x-1/2 z-30 py-3 px-6 rounded-full ${isButtonFlashing ? 'bg-white text-red-600' : 'bg-red-600 text-white'} font-bold transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 w-[80%] justify-center text-lg animate-pulse`}
                aria-label="Click Aquí"
              >
                <span>¡Click Aquí!</span>
              </button>
            </div>
          </div>

          {/* Services list container */}
          <div className="w-full md:w-1/2 flex flex-col justify-start h-[500px]">
            <ul className="space-y-12 pt-0">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                    <div className="flex flex-col">
                      <h3 className="text-2xl lg:text-3xl md:text-2xl sm:text-xl font-semibold text-light-text dark:text-white mb-2">{service.title}</h3>
                      <p className="text-lg lg:text-xl md:text-lg sm:text-base text-light-muted dark:text-dark-muted">{service.description}</p>
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