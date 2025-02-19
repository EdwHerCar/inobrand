import React from 'react';

const Pricing = () => {
  return (
    <section className="py-24 min-h-[90vh] rounded-lg">
      <div className="container mx-auto px-4 h-full">
        <h2 className="text-4xl font-bold text-center mb-12 text-light-text dark:text-white">10, 9, 8... ¡Despegue!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[calc(100%-6rem)] md:h-auto lg:h-[calc(100%-6rem)]">
          {/* Starter Plan */}
          <div className="bg-light-surface dark:bg-dark-bg p-8 lg:p-12 rounded-lg border border-primary/20 hover:border-primary/40 transition-all flex flex-col h-full shadow-lg">
            <h3 className="text-2xl font-bold mb-2 text-light-text dark:text-white">ASESORÍA PARCIAL</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-xl font-semibold text-light-text/80 dark:text-white/80">Despegue de ventas</span>
            </div>
            <p className="text-light-muted dark:text-dark-muted flex-grow mb-6">Asesoría 1 a 1 con enfoque en detección de oportunidades de mejora y planeación para procesos publicitarios digitales.</p>
            <button className="w-full py-3 px-6 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors">
              + info
            </button>
          </div>

          {/* Growth Plan */}
          <div className="bg-light-surface dark:bg-dark-bg p-8 lg:p-12 rounded-lg border border-secondary/20 hover:border-secondary/40 transition-all flex flex-col h-full shadow-lg">
            <h3 className="text-2xl font-bold mb-2 text-light-text dark:text-white">ESTRATEGIA PARCIAL</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-xl font-semibold text-light-text/80 dark:text-white/80">Ventas en ascenso</span>
            </div>
            <p className="text-light-muted dark:text-dark-muted flex-grow mb-6">Plan básico que lleva a tu empresa a dar los primeros pasos en el marketing de contenidos con una inversión accesible y resultados sólidos.</p>
            <button className="w-full py-3 px-6 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors">
              + info
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-light-surface dark:bg-dark-bg p-8 lg:p-12 rounded-lg border border-highlight/20 hover:border-highlight/40 transition-all flex flex-col h-full shadow-lg">
            <h3 className="text-2xl font-bold mb-2 text-light-text dark:text-white">ESTRATEGIA COMPLETA</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-xl font-semibold text-light-text/80 dark:text-white/80">Explosión de ventas</span>
            </div>
            <p className="text-light-muted dark:text-dark-muted flex-grow mb-6">Ofrece estrategias y servicios digitales completos que permiten a las organizaciones tener presencia digital totalmente uniforme y enfocada en objetivos.</p>
            <button className="w-full py-3 px-6 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors">
              + info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;