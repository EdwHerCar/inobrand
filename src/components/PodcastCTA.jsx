import React from 'react';
import { FaSpotify, FaYoutube, FaMicrophoneAlt } from 'react-icons/fa';

const PodcastCTA = () => {
  return (
    <section className="py-20 w-full flex items-center justify-center relative overflow-hidden bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center bg-white/80 dark:bg-gray-800/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-gray-200 dark:border-gray-700/50 relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#7B3FE4]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#1DB954]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-[#7B3FE4]/10 rounded-full flex items-center justify-center text-[#7B3FE4] shadow-inner">
                <FaMicrophoneAlt className="w-10 h-10" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white font-heading tracking-tight">
              Escucha nuestro Podcast <br />
              <span className="text-[#7B3FE4] mt-2 inline-block">"De Cero a Merca"</span>
            </h2>
            
            <p className="text-lg md:text-xl mb-12 text-gray-600 dark:text-gray-300 font-body max-w-2xl mx-auto leading-relaxed">
              Descubre las claves para hacer crecer tu marca. Aprende sobre marketing digital, estrategias de negocios y emprendimiento de la mano de expertos.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <a
                href="https://open.spotify.com/show/2yx205hX2BQ25Z4rbxXTqW?si=mdSYBEeBQjiCaVmnEEzARg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#1DB954] text-white hover:bg-[#1ed760] rounded-xl text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-[#1DB954]/30 hover:-translate-y-1 font-body"
              >
                <FaSpotify className="w-7 h-7" />
                Escuchar en Spotify
              </a>
              
              <a
                href="https://youtube.com/@inobrandd?si=vrwJz1ELeUm5KWAB"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#FF0000] text-white hover:bg-[#ff1a1a] rounded-xl text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-[#FF0000]/30 hover:-translate-y-1 font-body"
              >
                <FaYoutube className="w-7 h-7" />
                Ver en YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastCTA;