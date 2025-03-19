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
      const duration = 3000; // Reduced from 3000ms to 1500ms for faster response
      const startTime = performance.now();

      function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Modified easing function for quicker initial movement
        const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

        const currentPosition = start + (end - start) * easeOutQuart(progress);
        window.scrollTo(0, currentPosition);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    }
  };

  return (
    <section id="hero-section" className="text-center pt-6 mb-4">
      <div className="mb-4 sm:mb-6">
        <img
          src="/images/inobrand-logo.png"
          alt="InoBrand Logo"
          className="w-[16rem] h-[16rem] mx-auto object-contain md:w-[32rem] md:h-[32rem] sm:w-[24rem] sm:h-[24rem]"
        />
        <button
          onClick={handleScrollToSlogan}
          className={`mt-6 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold text-lg transition-all duration-300 shadow-lg ${isDarkMode ? 'hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'hover:shadow-[0_0_15px_rgba(255,87,51,0.5)]'}`}
        >
          Despeguemos
        </button>
      </div>
    </section>
  );
};

export default Hero;