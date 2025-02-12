import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark-surface text-white py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Slogan */}
          <div className="flex flex-col items-start">
            <img
              src="/images/inobrand-logo.png"
              alt="InoBrand Logo"
              className="w-32 h-32 object-contain mb-4"
            />
            <p className="text-xl font-medium text-white">Despega con creatividad</p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-1 gap-4">
            <a href="#" className="text-white hover:text-primary transition-colors">¿Quiénes somos?</a>
            <a href="#" className="text-white hover:text-primary transition-colors">Misión</a>
            <a href="#" className="text-white hover:text-primary transition-colors">Visión</a>
            <a href="#" className="text-white hover:text-primary transition-colors">Política de privacidad</a>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <p className="text-gray-300"><span className="font-semibold">Dirección:</span><br />16 de septiembre 2 colonia centro<br />Tlaxco, Tlaxcala</p>
            <p className="text-gray-300"><span className="font-semibold">Email:</span><br />
              <a href="mailto:inobrandd@gmail.com" className="hover:text-primary transition-colors">inobrandd@gmail.com</a>
            </p>
            <p className="text-gray-300"><span className="font-semibold">Teléfono:</span><br />
              <a href="tel:2411984848" className="hover:text-primary transition-colors">241 198 4848</a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} InoBrand. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;