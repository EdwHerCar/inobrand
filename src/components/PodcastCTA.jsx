import React from 'react';
import { FaSpotify, FaYoutube, FaMicrophoneAlt } from 'react-icons/fa';
import Reveal from './Reveal';

/** Barras de ecualizador: señal visual de "esto es audio" sin ocupar espacio.
 *  Las alturas y retardos son irregulares a propósito — un patrón regular
 *  se lee como una animación de carga, no como sonido. */
const Equalizer = () => (
  <div className="flex h-6 items-end justify-center gap-[3px]" aria-hidden="true">
    {[0, 220, 90, 330, 150, 40, 260].map((delay, i) => (
      <span
        key={i}
        className="w-[3px] origin-bottom rounded-full bg-accent-soft animate-equalize"
        style={{ height: `${[10, 22, 16, 24, 12, 20, 14][i]}px`, animationDelay: `${delay}ms` }}
      />
    ))}
  </div>
);

const PodcastCTA = () => {
  return (
    <section className="relative w-full overflow-hidden bg-light-bg py-20 dark:bg-dark-bg">
      <div className="container relative z-10 mx-auto px-4">
        <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white/80 p-8 text-center shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] md:p-16">
          {/* Halos de color: dan vida a la tarjeta sin tocar el contraste del texto */}
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-tertiary/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#1DB954]/20 blur-3xl"
            aria-hidden="true"
          />
          {/* Línea superior de acento: ancla la tarjeta y marca la marca */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-soft/60 to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Micrófono con anillo pulsante: sugiere "en el aire" */}
            <div className="mb-8 flex justify-center">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <span
                  className="absolute inset-0 rounded-full bg-accent-soft/30 animate-pulse-ring"
                  aria-hidden="true"
                />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-tertiary to-primary text-white shadow-lg ring-1 ring-white/20">
                  <FaMicrophoneAlt className="h-9 w-9" />
                </span>
              </div>
            </div>

            <Reveal delay={80} className="mb-4 flex justify-center">
              <span className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                <Equalizer />
                Podcast
              </span>
            </Reveal>

            <Reveal
              as="h2"
              delay={160}
              className="mb-6 font-heading text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
            >
              Escucha nuestro Podcast
              <span className="mt-3 block text-tertiary dark:text-accent-soft">
                &ldquo;De Cero a Merca&rdquo;
              </span>
            </Reveal>

            <Reveal
              as="p"
              delay={240}
              className="mx-auto mb-12 max-w-2xl font-body text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl"
            >
              Descubre las claves para hacer crecer tu marca. Aprende sobre marketing digital,
              estrategias de negocios y emprendimiento de la mano de expertos.
            </Reveal>

            <Reveal
              delay={320}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
            >
              <a
                href="https://open.spotify.com/show/2yx205hX2BQ25Z4rbxXTqW?si=mdSYBEeBQjiCaVmnEEzARg"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#1DB954] px-8 py-4 font-body text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#1ed760] hover:shadow-xl hover:shadow-[#1DB954]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1DB954] sm:w-auto"
              >
                <FaSpotify className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                Escuchar en Spotify
              </a>

              <a
                href="https://youtube.com/@inobrandd?si=vrwJz1ELeUm5KWAB"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-transparent px-8 py-4 font-body text-lg font-bold text-gray-900 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:shadow-xl hover:shadow-[#FF0000]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF0000] dark:border-white/20 dark:text-white sm:w-auto"
              >
                <FaYoutube className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                Ver en YouTube
              </a>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PodcastCTA;
