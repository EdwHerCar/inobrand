import React from 'react';

const Hero = () => {
  return (
    <section className="text-center pt-6 mb-4">
      <div className="mb-2">
        <img
          src="/images/inobrand-logo.png"
          alt="InoBrand Logo"
          className="w-[28rem] h-[28rem] mx-auto object-contain"
        />
      </div>
      <h1 className="text-6xl font-bold mb-4">
        <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">La Agencia De Marketing</span>
        <br />
        <span className="relative">
          QUE NECESITAS!
          <span className="absolute bottom-0 left-0 w-full h-1 bg-primary"></span>
        </span>
        .
      </h1>
      <p className="text-xl text-dark-muted max-w-2xl mx-auto">
      Despega con creatividad
      </p>
    </section>
  );
};

export default Hero;