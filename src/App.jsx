import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServiceShowcase from './components/ServiceShowcase'
import Services from './components/Services'
import CTA from './components/CTA'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg">
        <Navbar />
        <main className="container mx-auto">
          <section id="about" className="snap-start">
            <Hero />
          </section>
          <section id="showcase" className="snap-start">
            <ServiceShowcase />
          </section>
          <section id="services" className="snap-start">
            <Services />
          </section>
          <section id="contact" className="snap-start">
            <CTA />
          </section>
          <section id="pricing" className="snap-start">
            <Pricing />
          </section>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
