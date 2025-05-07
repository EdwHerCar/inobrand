import React, { useState, useEffect } from 'react';
import Modal from './Modal';

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

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loadedVideos, setLoadedVideos] = useState({});
  const { width } = useWindowSize();

  const videos = [
    { id: 9, src: '/videos/9.mp4', poster: '/videos/thumbnails/9.jpg' },
    { id: 2, src: '/videos/2.mp4', poster: '/videos/thumbnails/2.jpg' },
    { id: 3, src: '/videos/3.mp4', poster: '/videos/thumbnails/3.jpg' },
    { id: 4, src: '/videos/4.mp4', poster: '/videos/thumbnails/4.jpg' },
    { id: 5, src: '/videos/5.mp4', poster: '/videos/thumbnails/5.jpg' },
    { id: 6, src: '/videos/6.mp4', poster: '/videos/thumbnails/6.jpg' },
    { id: 7, src: '/videos/7.mp4', poster: '/videos/thumbnails/7.jpg' },
    { id: 8, src: '/videos/8.mp4', poster: '/videos/thumbnails/8.jpg' },
  ];

  // Precarga de videos
  useEffect(() => {
    videos.forEach(video => {
      const videoElement = document.createElement('video');
      videoElement.src = video.src;
      videoElement.preload = 'metadata';
    });
  }, []);

  const handleVideoLoad = (videoId) => {
    setLoadedVideos(prev => ({ ...prev, [videoId]: true }));
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <section className="w-full py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6 aspect-[9/16]">
            {/* Video Principal */}
            {videos[0] && (
              <div
                className="relative cursor-pointer overflow-hidden rounded-lg transform transition-transform hover:scale-105 h-full"
                onClick={() => handleVideoClick(videos[0])}
              >
                <video
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay={width > 768}
                  poster={videos[0].poster}
                  onLoadedData={() => handleVideoLoad(videos[0].id)}
                  preload="metadata"
                  loading="lazy"
                >
                  <source src={videos[0].src} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-0 transition-opacity duration-300" />
              </div>
            )}
          </div>
          <div className="md:col-span-6 grid grid-cols-3 gap-4">
          {videos.slice(1).map((video, index) => {
            const gridClass = 'aspect-[9/16]';

            return (
              <div
                key={video.id}
                className={`relative cursor-pointer overflow-hidden rounded-lg transform transition-transform hover:scale-105 ${gridClass}`}
                onClick={() => handleVideoClick(video)}
              >
                <video
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay={width > 768}
                  poster={video.poster}
                  onLoadedData={() => handleVideoLoad(video.id)}
                  preload="metadata"
                  loading="lazy"
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-0 transition-opacity duration-300" />
              </div>
            );
          })}
          </div>
        </div>
      </div>
      <Modal
        isOpen={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          {selectedVideo && (
            <video
              className="w-auto h-[80vh] rounded-lg"
              controls
              autoPlay
              preload="auto"
              poster={selectedVideo.poster}
            >
              <source src={selectedVideo.src} type="video/mp4" />
            </video>
          )}
        </div>
      </Modal>
    </section>
  );
};

export default VideoGallery;