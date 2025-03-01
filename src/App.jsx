import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServiceShowcase from './components/ServiceShowcase'
import Services from './components/Services'
import CTA from './components/CTA'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticlesBackground from './components/ParticlesBackground'
import WhatsAppButton from './components/WhatsAppButton'
import { ThemeProvider, useTheme } from './context/ThemeContext'

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 p-3 rounded-full bg-light-surface dark:bg-dark-surface hover:bg-light-surface/90 dark:hover:bg-dark-surface/90 transition-all duration-300 z-50 backdrop-blur-sm"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen w-full overflow-x-hidden bg-light-bg dark:bg-dark-bg">
          <ParticlesBackground />
          <div className="relative z-10">
            <ThemeToggle />
            <Navbar />
            <WhatsAppButton />
            <main>
              <Hero />
              <ServiceShowcase />
              <Services />
              <CTA />
              <Pricing />
              <Contact />
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
