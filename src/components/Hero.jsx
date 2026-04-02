import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useWhatsAppButton } from '../context/WhatsAppButtonContext';

const Hero = () => {
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const { isDarkMode } = useTheme();
  const { setIsHeroVisible } = useWhatsAppButton();

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('hero-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementVisible = rect.top < windowHeight && rect.bottom >= 0;

        if (elementVisible) {
          const scrollPercentage = 1 - (rect.top / windowHeight);
          setScrollOpacity(Math.min(Math.max(scrollPercentage, 0), 1));
        }
      }
    };

    // Set up intersection observer for WhatsApp button visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      setIsHeroVisible(false);
    };
  }, [setIsHeroVisible]);

  const textStyle = {
    opacity: scrollOpacity,
    transition: 'opacity 0.3s ease-out'
  };

  const handleScrollToSlogan = () => {
    const sloganSection = document.getElementById('slogan-section');
    if (sloganSection) {
      const start = window.pageYOffset;
      const end = sloganSection.getBoundingClientRect().top + window.pageYOffset;
      const duration = 1200; // Optimized duration for smoother experience
      const startTime = performance.now();

      function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easing function for consistent movement
        const easeInOutCubic = t => t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const currentPosition = start + (end - start) * easeInOutCubic(progress);
        window.scrollTo(0, currentPosition);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    }
  };

  return (
    <section id="hero-section" className="text-center pt-4 sm:pt-6 lg:pt-8 mb-4 sm:mb-6 lg:mb-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <img
          src="/images/inobrand-logo.png"
          alt="InoBrand Logo"
          className="w-[22rem] h-[22rem] sm:w-[26rem] sm:h-[26rem] md:w-[30rem] md:h-[30rem] lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] 2xl:w-[36rem] 2xl:h-[36rem] mx-auto object-contain transition-all duration-300"
        />
        <button
          onClick={handleScrollToSlogan}
          className={`mt-4 sm:mt-6 lg:mt-8 px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold text-base sm:text-lg lg:text-xl transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 ${isDarkMode ? 'hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'hover:shadow-[0_0_15px_rgba(255,87,51,0.5)]'}`}
          aria-label="Ir a la sección de eslogan"
        >
          Despeguemos
        </button>
      </div>
    </section>
  );
};

export default Hero;