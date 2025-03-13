import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useWhatsAppButton } from '../context/WhatsAppButtonContext';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Contact = () => {
  const videoRefs = useRef([]);
  const sectionRef = useRef(null);
  const { setIsContactVisible } = useWhatsAppButton();
  const [loadedVideos, setLoadedVideos] = useState(new Set());
  const [activeIndex, setActiveIndex] = useState(0);

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  useEffect(() => {
    let swiperInstance = null;

    // Function to handle video playback
    const handleVideoPlayback = async (video, shouldPlay) => {
      if (!video) return;

      try {
        if (shouldPlay) {
          if (video.readyState >= 2) {
            video.currentTime = 0;
            video.muted = true;
            await video.play();
          } else {
            video.load();
            video.addEventListener('loadeddata', async () => {
              video.currentTime = 0;
              video.muted = true;
              await video.play();
            }, { once: true });
          }
        } else {
          video.pause();
          video.currentTime = 0;
        }
      } catch (error) {
        console.log('Video playback error:', error);
      }
    };

    // Function to handle active slide's video
    const handleActiveVideo = () => {
      if (!swiperInstance) return;
      
      const isVisible = sectionRef.current && isInViewport(sectionRef.current);
      const currentActiveIndex = swiperInstance.activeIndex;
      setActiveIndex(currentActiveIndex);

      videoRefs.current.forEach((video, index) => {
        if (!video) return;
        const isActive = index === currentActiveIndex;
        handleVideoPlayback(video, isActive && isVisible);
      });
    };

    // Initialize Swiper and videos
    const initializeSwiper = () => {
      const swiperEl = document.querySelector('.swiper');
      if (swiperEl && swiperEl.swiper) {
        swiperInstance = swiperEl.swiper;
        swiperInstance.on('slideChange', handleActiveVideo);
        swiperInstance.on('init', handleActiveVideo);

        // Initial video setup
        setTimeout(handleActiveVideo, 300);
      }
    };

    // Set up intersection observer for section visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          handleActiveVideo();
        } else {
          videoRefs.current.forEach(video => {
            if (video) {
              video.pause();
              video.currentTime = 0;
            }
          });
        }
      },
      { threshold: [0, 0.3] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Initialize videos
    videoRefs.current.forEach((video) => {
      if (video) {
        video.load();
        video.addEventListener('loadeddata', () => {
          if (!loadedVideos.has(video.src)) {
            setLoadedVideos(prev => new Set([...prev, video.src]));
          }
        });
      }
    });

    // Initialize swiper after a short delay
    setTimeout(initializeSwiper, 100);

    return () => {
      if (swiperInstance) {
        swiperInstance.off('slideChange', handleActiveVideo);
        swiperInstance.off('init', handleActiveVideo);
      }
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
      setIsContactVisible(false);
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
      videoUrl: '/videos/5.mp4',
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
      videoUrl: '/videos/8.mp4',
      title: 'Creative Innovation'
    }
  ];

  return (
    <section ref={sectionRef} className="min-h-screen w-full flex flex-col justify-center items-center py-16 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-text dark:text-dark-text">
            Nuestro Trabajo
          </h2>
          <p className="text-xl text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
            Descubre cómo transformamos marcas a través del poder del marketing digital
          </p>
          <div className="flex justify-center items-center gap-6 mt-6">
            <a href="https://www.facebook.com/share/1BJ78sVjej/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-3xl text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary transition-colors duration-300">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/inobrandd?igsh=N3R4bjNtejB1NTBy" target="_blank" rel="noopener noreferrer" className="text-3xl text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary transition-colors duration-300">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@inobrandd?_t=ZM-8uc8OGUYwpb&_r=1" target="_blank" rel="noopener noreferrer" className="text-3xl text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary transition-colors duration-300">
              <FaTiktok />
            </a>
          </div>
        </div>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={1}
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
          pagination={true}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="w-full py-12"
        >
          {mockupVideos.map((item, index) => (
            <SwiperSlide key={item.id} className="px-4">
              <div className="relative w-full max-w-[360px] mx-auto">
                <div className="absolute top-[4%] left-[6%] right-[6%] bottom-[4%] rounded-[40px] overflow-hidden">
                  <video
                    ref={el => videoRefs.current[index] = el}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover object-center"
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

export default Contact;