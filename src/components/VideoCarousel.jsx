import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import { Navigation, Autoplay, EffectCoverflow, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { videos } from '../data/videos';

const VideoCarousel = () => {
  const navigate = useNavigate();
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDeviceType('mobile');
      } else if (window.innerWidth <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleVideoClick = (video) => {
    navigate(`/video/${video.id}`);
  };

  const MockupVideo = ({ video, isActive, isStacked = false }) => {
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      // Safari sometimes needs the muted property set on the DOM node directly
      if (videoRef.current) {
        videoRef.current.defaultMuted = true;
        videoRef.current.muted = true;
      }
      
      // Intentar reproducir automáticamente si se pausa (doble seguridad)
      if (videoRef.current && isLoaded) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => console.warn('Error autoplay:', e));
        }
      }
    }, [isLoaded, isActive]);

    const handleClick = (e) => {
      if (!isActive && !isStacked) {
        // Prevent navigation if slide is not active (Swiper will handle sliding to it if slideToClickedSlide is true)
        return;
      }
      handleVideoClick(video);
    };

    const widthClass = isStacked 
      ? "w-[280px] min-[400px]:w-[320px] sm:w-[360px]" 
      : "w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px]";

    return (
      <div 
        className={`relative mx-auto cursor-pointer group ${widthClass}`}
        onClick={handleClick}
      >
        <div className="relative w-full pb-[200%]"> {/* Aspect ratio para el mockup */}
          <div className="absolute top-[3%] left-[6%] right-[6%] bottom-[2%] rounded-[32px] sm:rounded-[36px] overflow-hidden bg-gray-900 z-0">
            <div className="w-full h-full relative">
              {/* Video Content */}
              <div className="absolute inset-0 bg-gray-800 z-0 animate-pulse" />
              
              {/* Only render video if we have a source */}
              {(video.src || video.fallback) && (
                <video 
                  ref={videoRef}
                  src={video.src}
                  className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500 ${hasError ? 'opacity-0' : 'opacity-100'}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onLoadedData={() => {
                    setIsLoaded(true);
                    setHasError(false);
                  }}
                  onError={(e) => {
                    console.error('Video error in carousel:', video.id, e.nativeEvent);
                    // Como el formato original falla, forzamos el uso del video de respaldo en webm
                    if (videoRef.current && video.fallback && !videoRef.current.src.endsWith('.webm')) {
                      // Vamos a asumir que generamos una versión .webm del fallback 
                      // (esto se arreglará luego convirtiendo los archivos)
                      videoRef.current.src = video.fallback.replace('.mp4', '.webm').replace('.mov', '.webm');
                      videoRef.current.load();
                    } else {
                      setHasError(true);
                    }
                  }}
                />
              )}
              
              {hasError && (
                <div className="absolute inset-0 bg-red-900/90 flex flex-col items-center justify-center z-10 p-4 text-center">
                  <svg className="w-8 h-8 text-white/50 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-white text-xs opacity-75">Error al cargar</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Mockup Image - Must be above video (z-20) */}
          <img 
            src="/images/i15.svg" 
            alt="iPhone 15 mockup" 
            className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none drop-shadow-2xl"
            style={{ objectFit: 'fill' }}
          />
          
          {/* Play icon overlay on hover - Must be above mockup (z-30) */}
          <div className="absolute top-[3%] left-[6%] right-[6%] bottom-[2%] bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 rounded-[32px] sm:rounded-[36px]">
            <svg className="w-16 h-16 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full py-16 overflow-hidden bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-light-text dark:text-white">
          Nuestro Trabajo
        </h2>
        <p className="text-3xl text-light-muted dark:text-dark-muted max-w-2xl mx-auto mb-6">
          Descubre cómo transformamos marcas a través del poder del marketing digital
        </p>  
        <div className="flex justify-center gap-6 mb-8">
          <a 
            href="https://www.facebook.com/share/1BJ78sVjej/?mibextid=wwXIfr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-3xl text-light-text dark:text-dark-text hover:text-primary transition-colors"
            >
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/inobrandd?igsh=N3R4bjNtejB1NTBy" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-3xl text-light-text dark:text-dark-text hover:text-primary transition-colors"
          >
            <FaInstagram />
          </a>
          <a href="https://www.tiktok.com/@inobrandd?_t=ZM-8uc8OGUYwpb&_r=1" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-3xl text-light-text dark:text-dark-text hover:text-primary transition-colors"
          >
            <FaTiktok />
          </a>
        </div>
      </div>
      
      <div className="w-full relative mx-auto overflow-hidden py-16">
        {deviceType === 'mobile' ? (
          <div className="flex flex-col gap-12 items-center px-4 w-full">
            {videos.map((video) => (
              <MockupVideo key={video.id} video={video} isActive={true} isStacked={true} />
            ))}
          </div>
        ) : (
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            slideToClickedSlide={true}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 1,
              releaseOnEdges: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: -40,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={deviceType !== 'mobile'}
            modules={[EffectCoverflow, Navigation, Autoplay, Mousewheel]}
            className="w-full !py-12"
          >
            {videos.map((video) => (
              <SwiperSlide key={video.id} className="!w-auto flex justify-center px-4">
                {({ isActive }) => (
                  <MockupVideo video={video} isActive={isActive} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default VideoCarousel;