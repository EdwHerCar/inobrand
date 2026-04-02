import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-light-surface dark:bg-dark-surface text-light-text dark:text-white py-8 sm:py-12 lg:py-16 mt-8 sm:mt-12 lg:mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8">
          {/* Logo and Slogan */}
          <div className="flex flex-col items-center sm:items-start lg:col-span-1">
            <Link to="/">
              <img
                src="/images/inobrand-logo.png"
                alt="InoBrand Logo"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain mb-3 sm:mb-4 dark:brightness-100 brightness-0 cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105"
              />
            </Link>
            <p className="text-lg sm:text-xl font-medium text-light-text dark:text-white text-center sm:text-left">Despega con creatividad</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-3 sm:gap-4 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-light-text dark:text-white mb-2">Navegación</h3>
            <Link
              to="/mission"
              className="text-base sm:text-lg text-light-text dark:text-white hover:text-primary transition-colors duration-300 hover:translate-x-1 text-center md:text-left"
            >
              Misión
            </Link>
            <Link
              to="/vision"
              className="text-base sm:text-lg text-light-text dark:text-white hover:text-primary transition-colors duration-300 hover:translate-x-1 text-center md:text-left"
            >
              Visión
            </Link>
            <Link
              to="/privacy-policy"
              className="text-base sm:text-lg text-light-text dark:text-white hover:text-primary transition-colors duration-300 hover:translate-x-1 text-center md:text-left"
            >
              Política de privacidad
            </Link>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold text-light-text dark:text-white mb-2">Contacto</h3>
            <div className="space-y-2 sm:space-y-3">
              <p className="text-sm sm:text-base text-light-muted dark:text-gray-300">
                <span className="font-semibold text-light-text dark:text-white block sm:inline">Dirección:</span>
                <span className="block sm:inline sm:ml-2">16 de septiembre 2 colonia centro</span>
                <span className="block">Tlaxco, Tlaxcala</span>
              </p>
              <p className="text-sm sm:text-base text-light-muted dark:text-gray-300">
                <span className="font-semibold text-light-text dark:text-white block sm:inline">Email:</span>
                <a href="mailto:inobrandd@gmail.com" className="block sm:inline sm:ml-2 hover:text-primary transition-colors duration-300">inobrandd@gmail.com</a>
              </p>
              <p className="text-sm sm:text-base text-light-muted dark:text-gray-300">
                <span className="font-semibold text-light-text dark:text-white block sm:inline">Teléfono:</span>
                <a href="tel:2411984848" className="block sm:inline sm:ml-2 hover:text-primary transition-colors duration-300">241 198 4848</a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-light-muted dark:border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-sm sm:text-base text-light-muted dark:text-gray-400">&copy; {new Date().getFullYear()} Inobrand. Todos los derechos reservados.</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;