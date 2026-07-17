import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { videos } from '../data/videos';

// Hook para detectar visibilidad de videos y reproducir solo lo visible
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasIntersected(true);
        }
      },
      { threshold: 0.1, rootMargin: '100px', ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting, hasIntersected];
};

const VideoGallery = () => {
  const navigate = useNavigate();

  const handleVideoClick = (video) => {
    navigate(`/video/${video.id}`);
  };

  const VideoComponent = ({ video, isMain = false }) => {
    const [containerRef, isIntersecting, hasIntersected] = useIntersectionObserver();
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const videoElementRef = useRef(null);

    // Reproducir/pausar según visibilidad
    useEffect(() => {
      const vidEl = videoElementRef.current;
      if (!vidEl || !isLoaded) return;
      if (isIntersecting) {
        vidEl.play().catch(() => {});
      } else {
        vidEl.pause();
      }
    }, [isIntersecting, isLoaded]);

    return (
      <div
        ref={containerRef}
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
            <div className={`${isMain ? 'w-full h-full' : 'absolute inset-0'} bg-red-900 flex items-center justify-center`}>
              <div className="text-white text-sm opacity-75">Error al cargar video {video.id}</div>
            </div>
          ) : hasIntersected ? (
            <video
              ref={videoElementRef}
              src={video.preview}
              poster={video.poster}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => setIsLoaded(true)}
              onError={(e) => {
                console.error('Error loading video:', video.id, video.preview, e.nativeEvent);
                setHasError(true);
              }}
            />
          ) : (
            // Poster como placeholder mientras el video entra en pantalla
            <img
              src={video.poster}
              alt=""
              className={`${isMain ? 'w-full h-full' : 'absolute inset-0 w-full h-full'} object-cover`}
              loading="lazy"
              aria-hidden="true"
            />
          )}
        </div>
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
