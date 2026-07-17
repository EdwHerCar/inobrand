import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiXMark, HiSpeakerWave, HiSpeakerXMark, HiChevronDown } from 'react-icons/hi2';
import { videos } from '../data/videos';

/**
 * Reproductor vertical tipo TikTok.
 *
 * Un contenedor con scroll-snap donde cada video ocupa la pantalla completa.
 * Se apoya en el scroll nativo (no en listeners de wheel) para que el gesto
 * sea idéntico en trackpad, rueda y táctil, y para heredar el momentum del
 * sistema. Sólo suena el video visible; el resto se pausan.
 *
 * Al pasar del último video, un centinela al final cierra el reproductor y
 * devuelve al usuario al carrusel.
 */
const VideoPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const sentinelRef = useRef(null);
  const videoRefs = useRef([]);
  const salidaLanzadaRef = useRef(false);

  const indiceInicial = Math.max(
    0,
    videos.findIndex(v => v.id === parseInt(videoId))
  );
  const [indiceActivo, setIndiceActivo] = useState(indiceInicial);
  // Se llega aquí desde un clic en el carrusel, así que ya hay activación de
  // usuario: podemos arrancar con sonido. Si el navegador lo rechazara, el
  // efecto de reproducción vuelve a silencio automáticamente.
  const [silenciado, setSilenciado] = useState(false);

  const salir = useCallback(() => {
    if (salidaLanzadaRef.current) return;
    salidaLanzadaRef.current = true;
    navigate('/#video-gallery');
  }, [navigate]);

  const videoActual = videos[indiceInicial];

  // Posicionar en el video elegido sin animación (debe sentirse instantáneo).
  useEffect(() => {
    const cont = containerRef.current;
    if (!cont) return;
    cont.scrollTo({ top: indiceInicial * cont.clientHeight, behavior: 'instant' });
  }, [indiceInicial]);

  // Detectar qué video está en pantalla para reproducir sólo ése.
  useEffect(() => {
    const cont = containerRef.current;
    if (!cont) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.indice);
            if (!Number.isNaN(idx)) setIndiceActivo(idx);
          }
        });
      },
      { root: cont, threshold: 0.6 }
    );

    videoRefs.current.filter(Boolean).forEach(v => observer.observe(v));
    return () => observer.disconnect();
  }, []);

  // Centinela final: al alcanzarlo, cerrar y volver al carrusel.
  useEffect(() => {
    const cont = containerRef.current;
    const centinela = sentinelRef.current;
    if (!cont || !centinela) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) salir();
      },
      { root: cont, threshold: 0.9 }
    );

    observer.observe(centinela);
    return () => observer.disconnect();
  }, [salir]);

  // Reproducir el activo (con audio si se puede), pausar y rebobinar el resto.
  useEffect(() => {
    videoRefs.current.filter(Boolean).forEach((v, i) => {
      if (i === indiceActivo) {
        v.muted = silenciado;
        const p = v.play();
        if (p) {
          p.catch(() => {
            // Autoplay con sonido rechazado: recuperar en silencio.
            v.muted = true;
            setSilenciado(true);
            v.play().catch(() => {});
          });
        }
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [indiceActivo, silenciado]);

  // Teclado: flechas para navegar, Escape para salir.
  useEffect(() => {
    const onKey = e => {
      const cont = containerRef.current;
      if (!cont) return;
      if (e.key === 'Escape') salir();
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const delta = e.key === 'ArrowDown' ? 1 : -1;
        cont.scrollTo({
          top: (indiceActivo + delta) * cont.clientHeight,
          behavior: 'smooth',
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [indiceActivo, salir]);

  // Mantener la URL en sintonía con el video visible, sin ensuciar el historial.
  useEffect(() => {
    const v = videos[indiceActivo];
    if (v) navigate(`/video/${v.id}`, { replace: true });
  }, [indiceActivo, navigate]);

  if (!videoActual) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <button
          onClick={() => navigate('/')}
          className="text-white transition-colors hover:text-gray-300"
          aria-label="Volver al inicio"
        >
          <HiXMark className="h-8 w-8" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Cerrar */}
      <button
        onClick={salir}
        className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Cerrar reproductor"
      >
        <HiXMark className="h-7 w-7" />
      </button>

      {/* Silenciar / activar audio */}
      <button
        onClick={() => setSilenciado(s => !s)}
        className="absolute right-4 top-20 z-50 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label={silenciado ? 'Activar audio' : 'Silenciar'}
      >
        {silenciado ? <HiSpeakerXMark className="h-6 w-6" /> : <HiSpeakerWave className="h-6 w-6" />}
      </button>

      {/* Feed vertical con anclaje: el scroll nativo da el momentum correcto */}
      <div
        ref={containerRef}
        className="feed-vertical h-full w-full overflow-y-auto"
        tabIndex={-1}
      >
        {videos.map((video, i) => (
          // <div> y no <section>: index.css aplica min-h-screen y padding a
          // todos los <section>, lo que rompería el video a pantalla completa.
          <div
            key={video.id}
            className="relative flex h-full w-full snap-start items-center justify-center"
          >
            <video
              ref={el => (videoRefs.current[i] = el)}
              data-indice={i}
              src={video.src}
              poster={video.poster}
              className="h-full w-full object-contain"
              loop
              playsInline
              preload={Math.abs(i - indiceActivo) <= 1 ? 'auto' : 'none'}
              onClick={() => setSilenciado(s => !s)}
            />

            {/* Pista de "desliza" sólo en el primero */}
            {i === 0 && indiceActivo === 0 && (
              <div className="pointer-events-none absolute bottom-28 left-1/2 -translate-x-1/2 animate-float text-white/70">
                <HiChevronDown className="h-8 w-8" aria-hidden="true" />
              </div>
            )}
          </div>
        ))}

        {/* Centinela: al llegar aquí tras el último video, se cierra solo */}
        <div
          ref={sentinelRef}
          className="flex h-full w-full snap-start items-center justify-center"
        >
          <p className="font-body text-white/60">Volviendo a la galería…</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
