import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { videos } from '../data/videos';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';

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

const VideoPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Configuración de Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'daxbztvuz'
    }
  });

  const currentVideo = videos.find(video => video.id === parseInt(videoId));

  const cldVideo = currentVideo?.type === 'cloudinary' ? cld.video(currentVideo.publicId) : null;

  const handleClose = () => {
    navigate('/#video-gallery');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Safari specific fix for native videos
  useEffect(() => {
    if (currentVideo && currentVideo.type !== 'youtube' && currentVideo.type !== 'cloudinary') {
      if (videoRef.current) {
        videoRef.current.defaultMuted = true;
        videoRef.current.muted = true;
      }
    }
  }, [currentVideo]);

  const unmuteVideo = (e) => {
    // Evitar cualquier navegación/propagación accidental al hacer clic
    try {
      e?.preventDefault?.();
      e?.stopPropagation?.();
    } catch {}
    try {
      // Si es YouTube, usar la API del iframe
      if (currentVideo.type === 'youtube' && iframeRef.current?.contentWindow) {
        const unmuteMsg = JSON.stringify({ event: 'command', func: 'unMute', args: [] });
        iframeRef.current.contentWindow.postMessage(unmuteMsg, '*');
        const playMsg = JSON.stringify({ event: 'command', func: 'playVideo', args: [] });
        iframeRef.current.contentWindow.postMessage(playMsg, '*');
        setIsMuted(false);
        return;
      }

      // Si es video local o Cloudinary
      const vidEl = videoRef.current?.videoRef?.current || videoRef.current;
      if (vidEl) {
        vidEl.muted = false;
        vidEl.play().catch(() => {});
        setIsMuted(false);
      }
    } catch (e) {
      // Fallback: actualizar la URL del iframe para quitar mute
      try {
        const src = iframeRef.current?.src;
        if (src) {
          const url = new URL(src);
          url.searchParams.set('mute', '0');
          iframeRef.current.src = url.toString();
          setIsMuted(false);
        }
      } catch (_) {}
    }
  };

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <button
          onClick={() => navigate('/')}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Botón de cerrar minimalista */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors p-2"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Contenedor del video centrado */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full">
          <div className="relative bg-black overflow-hidden aspect-[9/16]">
            {hasError ? (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-lg mb-4">Error al cargar video</div>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            ) : (
              <>
                {!isLoaded && (
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  </div>
                )}
                
                {currentVideo.type === 'youtube' && !hasError ? (
                  <>
                    <div className="absolute inset-0 overflow-hidden">
                      <iframe
                        ref={iframeRef}
                        src={`https://www.youtube-nocookie.com/embed/${extractYouTubeId(currentVideo.src)}?autoplay=1&mute=1&loop=1&playlist=${extractYouTubeId(currentVideo.src)}&controls=0&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0&enablejsapi=1&origin=${window.location.origin}`}
                        className="absolute top-1/2 left-1/2 w-[122%] h-[122%]"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        onLoad={() => setIsLoaded(true)}
                        onError={() => setHasError(true)}
                        title={currentVideo.title || `Video ${currentVideo.id}`}
                        style={{
                          transform: 'translate(-50%, -53%) scale(0.96)',
                          transformOrigin: 'center',
                          pointerEvents: 'none'
                        }}
                      />
                      {isLoaded && isMuted && (
                        <button
                          type="button"
                          onClick={unmuteVideo}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-gradient-to-b from-white to-white/90 text-black rounded-full shadow-lg hover:from-white hover:to-white/80 p-4 focus:outline-none focus:ring-2 focus:ring-white/70"
                          aria-label="Activar audio"
                          title="Activar audio"
                        >
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M11 5l-6 4H3v6h2l6 4V5z"></path>
                            <path d="M19 7c.7 1.1 1 2.4 1 5s-.3 3.9-1 5" />
                            <path d="M15 9.5c.4.7.6 1.5.6 2.5s-.2 1.8-.6 2.5" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </>
                ) : currentVideo.type === 'cloudinary' ? (
                  <>
                    <AdvancedVideo
                      ref={videoRef}
                      cldVid={cldVideo}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      onLoadedData={() => setIsLoaded(true)}
                      onError={() => setHasError(true)}
                    />
                    {isLoaded && isMuted && (
                      <button
                        type="button"
                        onClick={unmuteVideo}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-gradient-to-b from-white to-white/90 text-black rounded-full shadow-lg hover:from-white hover:to-white/80 p-4 focus:outline-none focus:ring-2 focus:ring-white/70"
                        aria-label="Activar audio"
                        title="Activar audio"
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M11 5l-6 4H3v6h2l6 4V5z"></path>
                          <path d="M19 7c.7 1.1 1 2.4 1 5s-.3 3.9-1 5" />
                          <path d="M15 9.5c.4.7.6 1.5.6 2.5s-.2 1.8-.6 2.5" />
                        </svg>
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      src={currentVideo.src}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      onLoadedData={() => {
                         setIsLoaded(true);
                         setHasError(false);
                      }}
                      onError={(e) => {
                         console.error('Error loading video in player:', currentVideo.id, e.nativeEvent);
                         if (videoRef.current && currentVideo.fallback && !videoRef.current.src.endsWith('.webm')) {
                           videoRef.current.src = currentVideo.fallback.replace('.mp4', '.webm').replace('.mov', '.webm');
                           videoRef.current.load();
                         } else {
                           setHasError(true);
                         }
                      }}
                    />
                    {isLoaded && isMuted && (
                      <button
                        type="button"
                        onClick={unmuteVideo}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-gradient-to-b from-white to-white/90 text-black rounded-full shadow-lg hover:from-white hover:to-white/80 p-4 focus:outline-none focus:ring-2 focus:ring-white/70"
                        aria-label="Activar audio"
                        title="Activar audio"
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M11 5l-6 4H3v6h2l6 4V5z"></path>
                          <path d="M19 7c.7 1.1 1 2.4 1 5s-.3 3.9-1 5" />
                          <path d="M15 9.5c.4.7.6 1.5.6 2.5s-.2 1.8-.6 2.5" />
                        </svg>
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;