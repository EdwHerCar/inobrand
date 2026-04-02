import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Hook optimizado para detectar visibilidad de videos
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
          setIsIntersecting(entry.isIntersecting);
          if (entry.isIntersecting && !hasIntersected) {
            setHasIntersected(true);
          }
        }, 100); // Reducido para mejor respuesta
      },
      { 
        threshold: 0.1, 
        rootMargin: '50px',
        ...options 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasIntersected, options]);

  return [ref, isIntersecting, hasIntersected];
};

// Util para extraer el ID de YouTube desde distintas URLs (watch, shorts, youtu.be, embed)
const extractYouTubeId = (input) => {
  if (!input) return '';
  const idPattern = /^[a-zA-Z0-9_-]{11}$/;
  if (idPattern.test(input)) return input;
  const patterns = [
    /v=([a-zA-Z0-9_-]{11})/,           // https://www.youtube.com/watch?v=ID
    /shorts\/([a-zA-Z0-9_-]{11})/,     // https://www.youtube.com/shorts/ID
    /youtu\.be\/([a-zA-Z0-9_-]{11})/, // https://youtu.be/ID
    /embed\/([a-zA-Z0-9_-]{11})/,      // https://www.youtube.com/embed/ID
  ];
  for (const p of patterns) {
    const m = input.match(p);
    if (m && m[1]) return m[1];
  }
  return input; // fallback si ya es un ID u otro formato
};

import { videos } from '../data/videos';

const VideoGallery = () => {
  const navigate = useNavigate();
  const [deviceType, setDeviceType] = useState('desktop');
  const { width } = useWindowSize();

  // Configuración de Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'daxbztvuz'
    }
  });

  // Detectar tipo de dispositivo
  useEffect(() => {
    if (width <= 768) {
      setDeviceType('mobile');
    } else if (width <= 1024) {
      setDeviceType('tablet');
    } else {
      setDeviceType('desktop');
    }
  }, [width]);

  const handleVideoClick = (video) => {
    navigate(`/video/${video.id}`);
  };

  // Componente híbrido optimizado para YouTube Shorts y videos locales
  const VideoComponent = ({ video, isMain = false }) => {
    const [videoRef, isIntersecting, hasIntersected] = useIntersectionObserver({
      threshold: deviceType === 'mobile' ? 0.2 : 0.1,
      rootMargin: deviceType === 'mobile' || deviceType === 'tablet' ? '100px' : '50px'
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [useYoutube, setUseYoutube] = useState(video.type === 'youtube');
    const videoElementRef = useRef(null);
    const isPlayingRef = useRef(false);
    const youtubeId = video.type === 'youtube' ? extractYouTubeId(video.src) : null;

    // Obtener objeto de video de Cloudinary si aplica
    const cldVideo = video.type === 'cloudinary' ? cld.video(video.publicId) : null;

    // Controlar reproducción basada en visibilidad
    useEffect(() => {
      if ((video.type === 'local' || video.type === 'cloudinary' || video.type === 'supabase') && isLoaded) {
        try {
          // Referencia al elemento video (ya sea nativo o de Cloudinary)
          const vidEl = videoElementRef.current?.videoRef?.current || videoElementRef.current;
          
          if (vidEl) {
            if (isIntersecting !== isPlayingRef.current) {
              if (isIntersecting) {
                vidEl.play().catch(e => console.warn('Error autoplay:', e));
              } else {
                vidEl.pause();
              }
              isPlayingRef.current = isIntersecting;
            }
          }
        } catch (error) {
          console.warn('Error controlando reproducción de video:', error);
        }
      }
    }, [isIntersecting, isLoaded, video.type]);

    // Fallback a video local si YouTube falla
    const handleYouTubeError = () => {
      if (video.fallback) {
        setUseYoutube(false);
        setHasError(false);
      } else {
        setHasError(true);
      }
    };

    return (
      <div 
        ref={videoRef}
        className={`relative cursor-pointer overflow-hidden rounded-lg h-full group ${isMain ? 'bg-gray-900' : 'bg-gray-800'}`}
        onClick={() => handleVideoClick(video)}
        role="button"
        tabIndex={0}
        aria-label={`Reproducir video ${video.id} en pantalla completa`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleVideoClick(video);
          }
        }}
      >
        <div className={isMain ? "w-full h-full" : "aspect-[9/16] w-full h-full"}>
          {hasError ? (
            <div 
              className={`${isMain ? 'w-full h-full' : 'absolute inset-0'} bg-red-900 flex items-center justify-center`}
            >
              <div className="text-white text-sm opacity-75">Error al cargar video {video.id}</div>
            </div>
          ) : hasIntersected ? (
            <>
              {video.type === 'youtube' && useYoutube ? (
                <div className={`absolute inset-0 w-full h-full relative overflow-hidden`}>
                  {/* Contenedor con overflow hidden para recortar la UI de YouTube */}
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=${isIntersecting ? 1 : 0}&mute=1&loop=1&playlist=${youtubeId}&controls=0&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0&enablejsapi=1&origin=${window.location.origin}`}
                    className="absolute top-1/2 left-1/2 w-[130%] h-[130%]"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    title={video.title}
                    onError={handleYouTubeError}
                    loading="lazy"
                    style={{
                      transform: 'translate(-50%, -50%) scale(1.05)',
                      transformOrigin: 'center',
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              ) : video.type === 'cloudinary' ? (
                <AdvancedVideo
                  ref={videoElementRef}
                  cldVid={cldVideo}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay={false}
                  muted
                  loop
                  playsInline
                  onLoadedData={() => setIsLoaded(true)}
                  onError={() => setHasError(true)}
                />
              ) : (
                <video 
                  ref={videoElementRef}
                  src={video.type === 'youtube' && !useYoutube ? video.fallback : video.src}
                  className={`absolute inset-0 w-full h-full object-cover`}
                  muted
                  loop
                  playsInline
                  crossOrigin="anonymous"
                  preload="metadata"
                  onLoadedData={() => setIsLoaded(true)}
                  onError={(e) => {
                    if (video.type === 'youtube') {
                      handleYouTubeError();
                    } else {
                      console.error('Error loading video:', video.id, video.src, e.nativeEvent);
                      // Intentar cargar el fallback si falla Supabase
                      if (videoElementRef.current && video.fallback && !videoElementRef.current.src.endsWith(video.fallback)) {
                        videoElementRef.current.src = video.fallback;
                        videoElementRef.current.load();
                      } else {
                        setHasError(true);
                      }
                    }
                  }}
                />
              )}
            </>
          ) : (
            // Placeholder silencioso sin texto para evitar flashes perceptibles
            <div 
              className={`${isMain ? 'w-full h-full' : 'absolute inset-0'} ${isMain ? 'bg-gray-900' : 'bg-gray-800'}`}
              aria-hidden="true"
            />
          )}
        </div>
        
        {/* Overlay de play eliminado para una previsualización limpia */}
      </div>
    );
  };

  return (
    <section id="video-gallery" className="w-full py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 min-h-[600px]">
          <div className="md:col-span-7 lg:col-span-8 h-full">
            {/* Video Principal */}
            {videos[0] && <VideoComponent video={videos[0]} isMain={true} />}
          </div>
          <div className="md:col-span-5 lg:col-span-4 grid grid-rows-3 gap-4 h-full">
            {/* Primera fila - Videos 2 y 3 */}
            <div className="grid grid-cols-2 gap-4 h-full">
              {videos[1] && (
                <div className="h-full">
                  <VideoComponent video={videos[1]} />
                </div>
              )}
              {videos[2] && (
                <div className="h-full">
                  <VideoComponent video={videos[2]} />
                </div>
              )}
            </div>
            {/* Segunda fila - Videos 4, 5 y 6 */}
            <div className="grid grid-cols-3 gap-4 h-full">
              {videos[3] && (
                <div className="h-[95%]">
                  <VideoComponent video={videos[3]} />
                </div>
              )}
              {videos[4] && (
                <div className="h-[95%]">
                  <VideoComponent video={videos[4]} />
                </div>
              )}
              {videos[5] && (
                <div className="h-[95%]">
                  <VideoComponent video={videos[5]} />
                </div>
              )}
            </div>
            {/* Tercera fila - Videos 7 y 8 */}
            <div className="grid grid-cols-2 gap-4 h-full">
              {videos[6] && (
                <div className="h-full">
                  <VideoComponent video={videos[6]} />
                </div>
              )}
              {videos[7] && (
                <div className="h-full">
                  <VideoComponent video={videos[7]} />
                </div>
              )}
            </div>
          </div>
        </div>
       </div>
     </section>
  );
};

export default VideoGallery;