import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Showcase = () => {
  const videoRefs = useRef([]);
  const observerRefs = useRef([]);
  const mockupRef = useRef(null);

  useEffect(() => {
    const handleSlideChange = () => {
      videoRefs.current.forEach((video, index) => {
        if (video) {
          const slide = video.closest('.swiper-slide');
          if (slide) {
            // Verificar si el slide está en el centro
            const isCentered = slide.classList.contains('swiper-slide-active');
            
            if (isCentered) {
              // Activar el audio del video central
              video.muted = false;
              video.play().catch(error => {
                console.warn(`Error playing video ${index + 1}:`, error);
                video.muted = true;
                video.play().catch(innerError => {
                  console.warn(`Fallback muted playback failed for video ${index + 1}:`, innerError);
                });
              });
            } else {
              // Mantener silenciados los videos que no están en el centro
              video.muted = true;
            }
          }
        }
      });
    };

    const handleVideoError = (event) => {
      const video = event.target;
      console.warn('Video loading error:', video.src);
      video.load();
    };

    // Add event listeners to videos
    videoRefs.current.forEach(video => {
      if (video) {
        video.addEventListener('error', handleVideoError);
      }
    });

    const swiperElement = document.querySelector('.swiper').swiper;
    if (swiperElement) {
      swiperElement.on('slideChange', handleSlideChange);
      swiperElement.on('init', handleSlideChange);
    }

    return () => {
      videoRefs.current.forEach(video => {
        if (video) {
          video.removeEventListener('error', handleVideoError);
        }
      });

      const swiperElement = document.querySelector('.swiper').swiper;
      if (swiperElement) {
        swiperElement.off('slideChange', handleSlideChange);
        swiperElement.off('init', handleSlideChange);
      }
    };
  }, []);

  const mockupVideos = [
    {
      id: 1,
      videoUrl: '/videos/9.mp4',
      title: 'Brand Strategy'
    },
    {
      id: 2,
      videoUrl: '/videos/2.mp4',
      title: 'Social Media Growth'
    },
    {
      id: 3,
      videoUrl: '/videos/3.mp4',
      title: 'Content Marketing'
    },
    {
      id: 4,
      videoUrl: '/videos/4.mp4',
      title: 'Digital Engagement'
    },
    {
      id: 5,
      videoUrl: '/videos/5.mov',
      title: 'Visual Storytelling'
    },
    {
      id: 6,
      videoUrl: '/videos/6.mp4',
      title: 'Campaign Management'
    },
    {
      id: 7,
      videoUrl: '/videos/7.mp4',
      title: 'Community Building'
    },
    {
      id: 8,
      videoUrl: '/videos/8.mov',
      title: 'Creative Solutions'
    }
  ];

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center py-16 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-text dark:text-dark-text">
            Nuestro Trabajo
          </h2>
          <p className="text-xl text-light-muted dark:text-dark-muted max-w-2xl mx-auto mb-6">
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
            <a
              href="https://www.instagram.com/inobrandd?igsh=N3R4bjNtejB1NTBy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-light-text dark:text-dark-text hover:text-primary transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@inobrandd?_t=ZM-8uc8OGUYwpb&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-light-text dark:text-dark-text hover:text-primary transition-colors"
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          loop={true}
          loopedSlides={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={false}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="w-full py-12"
        >
          {mockupVideos.map((item, index) => (
            <SwiperSlide key={item.id} className="px-4">
              <div className="relative w-full max-w-[360px] mx-auto">
                <div className="absolute top-[4%] left-[6%] right-[6%] bottom-[4%] rounded-[40px] overflow-hidden">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center"
                    onError={(e) => console.warn(`Error loading video ${index + 1}:`, e)}
                  >
                    <source src={item.videoUrl} type="video/mp4" />
                  </video>
                </div>
                <img
                  src="/images/i15.svg"
                  alt="iPhone 15 Mockup"
                  className="w-full h-auto relative z-20"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </section>
  );
};

export default Showcase;