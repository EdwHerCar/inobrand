import React, { useEffect } from 'react';
import { useWhatsAppButton } from '../context/WhatsAppButtonContext';
import Reveal from './Reveal';

const Slogan = () => {
  const { setIsSloganVisible } = useWhatsAppButton();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSloganVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const sloganSection = document.getElementById('slogan-section');
    if (sloganSection) {
      observer.observe(sloganSection);
    }

    return () => {
      if (sloganSection) {
        observer.unobserve(sloganSection);
      }
    };
  }, [setIsSloganVisible]);

  return (
    <section id="slogan-section" className="text-center py-16">
      <div className="container mx-auto px-4 md:px-12 lg:px-16">
        <Reveal as="h2" className="text-5xl lg:text-6xl md:text-5xl sm:text-4xl xs:text-3xl font-bold mb-3 font-heading">
          <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">La Agencia De Marketing</span>
          <br />
          <span className="relative inline-block">
            QUE NECESITAS!
            {/* El subrayado se dibuja solo cuando el título entra en pantalla */}
            <span
              className="slogan-underline absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-tertiary to-secondary"
              aria-hidden="true"
            />
          </span>
        </Reveal>
        <Reveal as="p" delay={160} className="text-xl lg:text-2xl md:text-xl sm:text-lg xs:text-base text-dark-muted max-w-2xl mx-auto font-body">
          Despega con creatividad
        </Reveal>
      </div>
    </section>
  );
};

export default Slogan;