import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Slogan from './components/Slogan';
import Services from './components/Services';
import CTA from './components/CTA';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import Mission from './components/Mission';
import Vision from './components/Vision';
import PrivacyPolicy from './components/PrivacyPolicy';
import ServiceShowcase from './components/ServiceShowcase';
import ThemeToggle from './components/ThemeToggle';
import VideoPlayer from './components/VideoPlayer';
import VideoGallery from './components/VideoGallery';
import VideoCarousel from './components/VideoCarousel';
import PodcastCTA from './components/PodcastCTA';

import ParticlesBackground from './components/ParticlesBackground';
import { ThemeProvider } from './context/ThemeContext';
import WhatsAppButton from './components/WhatsAppButton';
import { WhatsAppButtonProvider } from './context/WhatsAppButtonContext';

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-800 p-4">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

// Componente interno para manejar la lógica condicional
const AppContent = () => {
  const location = useLocation();
  const isVideoPlayerPage = location.pathname.startsWith('/video/');

  // Al navegar a una URL con hash (p. ej. al cerrar el reproductor con
  // /#video-gallery), React Router no hace scroll por sí solo en una SPA.
  // Sondeamos porque la sección destino puede tardar en montarse: el
  // carrusel está al final de la página y es pesado.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    let intentos = 0;
    let cancelado = false;

    const irAlDestino = () => {
      if (cancelado) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (intentos++ < 30) {
        setTimeout(irAlDestino, 50);
      }
    };
    irAlDestino();

    return () => { cancelado = true; };
  }, [location.pathname, location.hash]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-light-bg dark:bg-dark-bg">
      {!isVideoPlayerPage && <ParticlesBackground />}
      <div className="relative z-10">
        {!isVideoPlayerPage && <ThemeToggle />}
        {!isVideoPlayerPage && <Navbar />}
        {!isVideoPlayerPage && <WhatsAppButton />}
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Slogan />
              <ServiceShowcase />
              <Services />
              <CTA />
              <Pricing />
              <VideoCarousel />
              <PodcastCTA />
              <Footer />
            </main>
          } />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/video/:videoId" element={<VideoPlayer />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <WhatsAppButtonProvider>
          <Router>
            <AppContent />
          </Router>
        </WhatsAppButtonProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
