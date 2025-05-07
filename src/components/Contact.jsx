import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import VideoGallery from './VideoGallery';

const Contact = () => {
  return (
      <section className="w-full flex flex-col justify-center items-center overflow-hidden py-16 min-h-[50vh]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-6xl md:text-6xl font-bold mb-4 text-light-text dark:text-dark-text">
            Nuestro Trabajo
          </h2>
          <p className="text-3xl text-light-muted dark:text-dark-muted max-w-2xl mx-auto mb-6">
            Descubre cómo transformamos marcas a través del poder del marketing digital
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://www.facebook.com/share/1BJ78sVjej/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-light-text dark:text-dark-text hover:text-primary transition-colors"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/inobrandd?igsh=N3R4bjNtejB1NTBy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-light-text dark:text-dark-text hover:text-primary transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@inobrandd?_t=ZM-8uc8OGUYwpb&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-light-text dark:text-dark-text hover:text-primary transition-colors"
            >
              <FaTiktok />
            </a>
          </div>
          <VideoGallery />
        </div>
      </div>
    </section>
  );
};

export default Contact;