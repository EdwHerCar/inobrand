import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
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

  const MockupVideo = ({ video, isActive }) => {
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      // Intentar reproducir automáticamente cuando el componente se monta
      if (videoRef.current && isLoaded) {
        videoRef.current.play().catch(e => console.warn('Error autoplay:', e));
      }
    }, [isLoaded]);

    const handleClick = (e) => {
      if (!isActive) {
        // Prevent navigation if slide is not active (Swiper will handle sliding to it if slideToClickedSlide is true)
        return;
      }
      handleVideoClick(video);
    };

    return (
      <div 
        className="relative w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] mx-auto cursor-pointer group"
        onClick={handleClick}
      >
        <div className="relative w-full pb-[200%]"> {/* Aspect ratio para el mockup */}
          <div className="absolute top-[3%] left-[6%] right-[6%] bottom-[2%] rounded-[32px] sm:rounded-[36px] overflow-hidden bg-gray-900 z-0">
            <div className="w-full h-full relative">
              {/* Video or Fallback Content */}
              {hasError ? (
                <div className="absolute inset-0 bg-red-900 flex items-center justify-center z-10">
                  <div className="text-white text-sm opacity-75">Error al cargar</div>
                </div>
              ) : (
                <video 
                  ref={videoRef}
                  src={video.src}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  muted
                  loop
                  playsInline
                  crossOrigin="anonymous"
                  preload="metadata"
                  onLoadedData={() => setIsLoaded(true)}
                  onError={(e) => {
                    console.error('Error loading video:', video.id, video.src, e.nativeEvent);
                    if (videoRef.current && video.fallback && !videoRef.current.src.endsWith(video.fallback)) {
                      videoRef.current.src = video.fallback;
                      videoRef.current.load();
                    } else {
                      setHasError(true);
                    }
                  }}
                />
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
          Nuestros Trabajos en Acción
        </h2>
      </div>
      
      <div className="w-full relative mx-auto overflow-hidden py-16">
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            slideToClickedSlide={true}
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
            modules={[EffectCoverflow, Navigation, Autoplay]}
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
      </div>
    </section>
  );
};

export default VideoCarousel;