import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import Mission from './Mission';
import Vision from './Vision';
import PrivacyPolicy from './PrivacyPolicy';

const Footer = () => {
  const [showMission, setShowMission] = useState(false);
  const [showVision, setShowVision] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  return (
    <footer className="bg-light-surface dark:bg-dark-surface text-light-text dark:text-white py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Slogan */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/">
              <img
                src="/images/inobrand-logo.png"
                alt="InoBrand Logo"
                className="w-32 h-32 object-contain mb-4 dark:brightness-100 brightness-0 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-xl font-medium text-light-text dark:text-white">Despega con creatividad</p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-1 gap-4 text-center md:text-left">
            <button
              onClick={() => setShowMission(true)}
              className="text-center md:text-left text-light-text dark:text-white hover:text-primary transition-colors"
            >
              Misión
            </button>
            <button
              onClick={() => setShowVision(true)}
              className="text-center md:text-left text-light-text dark:text-white hover:text-primary transition-colors"
            >
              Visión
            </button>
            <button
              onClick={() => setShowPrivacyPolicy(true)}
              className="text-center md:text-left text-light-text dark:text-white hover:text-primary transition-colors"
            >
              Política de privacidad
            </button>
          </div>

          {/* Contact Information */}
          <div className="space-y-2 text-center md:text-left">
            <p className="text-light-muted dark:text-gray-300"><span className="font-semibold text-light-text dark:text-white">Dirección:</span><br />16 de septiembre 2 colonia centro<br />Tlaxco, Tlaxcala</p>
            <p className="text-light-muted dark:text-gray-300"><span className="font-semibold text-light-text dark:text-white">Email:</span><br />
              <a href="mailto:inobrandd@gmail.com" className="hover:text-primary transition-colors">inobrandd@gmail.com</a>
            </p>
            <p className="text-light-muted dark:text-gray-300"><span className="font-semibold text-light-text dark:text-white">Teléfono:</span><br />
              <a href="tel:2411984848" className="hover:text-primary transition-colors">241 198 4848</a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-light-muted dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-light-muted dark:text-gray-400">&copy; {new Date().getFullYear()} Inobrand. Todos los derechos reservados.</p>
        </div>
      </div>
      {/* Modals */}
      <Modal isOpen={showMission} onClose={() => setShowMission(false)}>
        <Mission onClose={() => setShowMission(false)} />
      </Modal>
      <Modal isOpen={showVision} onClose={() => setShowVision(false)}>
        <Vision onClose={() => setShowVision(false)} />
      </Modal>
      <Modal isOpen={showPrivacyPolicy} onClose={() => setShowPrivacyPolicy(false)}>
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      </Modal>
    </footer>
  );
};

export default Footer;