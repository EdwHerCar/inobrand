import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi2';
import '../styles/stars.css';
import Reveal from './Reveal';

const CTA = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2411984848', '_blank');
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-24">
      <div className="container relative z-10 mx-auto px-4">
        {/* Panel oscuro propio: el CTA deja de depender del fondo de la página y
            se lee igual en modo claro y oscuro, con las estrellas siempre visibles. */}
        <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#0B0618] px-6 py-20 text-center shadow-2xl ring-1 ring-white/10 md:px-16 md:py-28">
          {/* Aurora: dos manchas de marca que se desplazan lentamente */}
          <div
            className="pointer-events-none absolute -left-1/4 -top-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary via-tertiary to-transparent opacity-50 blur-3xl animate-aurora"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-1/2 -right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-highlight via-secondary to-transparent opacity-40 blur-3xl animate-aurora-slow"
            aria-hidden="true"
          />
          {/* Estrellas: dentro del panel oscuro sí contrastan (antes eran blancas
              sobre fondo blanco en modo claro, invisibles). */}
          <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
            <div className="stars absolute inset-0" />
          </div>
          {/* Viñeta: concentra la atención en el centro */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(11,6,24,0.85)_100%)]"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <Reveal className="mb-8 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-body text-xs font-bold uppercase tracking-[0.25em] text-accent-soft backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-soft animate-pulse" />
                Empieza hoy
              </span>
            </Reveal>

            <Reveal
              as="h2"
              delay={90}
              className="mb-6 font-heading text-4xl tracking-wider text-white md:text-6xl"
            >
              <span className="inline-block rotate-180">?</span>LISTO PARA{' '}
              <span className="bg-gradient-to-r from-accent-soft via-white to-accent-soft bg-clip-text text-transparent">
                TRANSFORMAR
              </span>{' '}
              TU PRESENCIA DIGITAL?
            </Reveal>

            <Reveal
              as="p"
              delay={180}
              className="mx-auto mb-12 max-w-2xl font-body text-lg !text-white/80 md:text-xl"
            >
              Impulsa tu marca con estrategias personalizadas y resultados tangibles
            </Reveal>

            <Reveal delay={270}>
              <button
                onClick={handleWhatsAppClick}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary px-10 py-5 font-body text-lg font-bold uppercase text-white shadow-[0_0_40px_-8px] shadow-tertiary/70 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_-6px] hover:shadow-secondary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft active:scale-95"
              >
                {/* Barrido de brillo periódico: atrae la vista sin ser intrusivo */}
                <span
                  className="pointer-events-none absolute inset-y-0 -left-8 w-12 bg-white/25 blur-md animate-shine"
                  aria-hidden="true"
                />
                <FaWhatsapp className="relative h-6 w-6" aria-hidden="true" />
                <span className="relative">Solicita una asesoría</span>
                <HiArrowRight
                  className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </Reveal>

            <Reveal delay={360}>
              <p className="mt-6 font-body text-sm !text-white/50">
                Te atendemos por WhatsApp
              </p>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTA;
