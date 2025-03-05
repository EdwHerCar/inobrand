import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
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
          // Get the slide element
          const slide = video.closest('.swiper-slide');
          if (slide) {
            // Check if the slide has the 'swiper-slide-active' class
            const isActive = slide.classList.contains('swiper-slide-active');
            video.muted = !isActive;
          }
        }
      });
    };

    // Add event listener to Swiper instance
    const swiperElement = document.querySelector('.swiper').swiper;
    if (swiperElement) {
      swiperElement.on('slideChange', handleSlideChange);
      swiperElement.on('init', handleSlideChange);
    }

    return () => {
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
      videoUrl: '/videos/1.mov',
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
      videoUrl: '/videos/7.mov',
      title: 'Community Building'
    }
  ];

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center py-16 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-text dark:text-dark-text">
            Nuestro Trabajo
          </h2>
          <p className="text-xl text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
            Descubre cómo transformamos marcas a través del poder del marketing digital
          </p>
        </div>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
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
            slideShadows: true,
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
                    ref={(el) => (videoRefs.current[index] = el)}
                    autoPlay
                    loop
                    muted
                    playsInline
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

export default Showcase;