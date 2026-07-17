import React from 'react';
import { HiOutlineChatBubbleLeftRight, HiOutlinePaperAirplane, HiOutlineRocketLaunch, HiArrowRight } from 'react-icons/hi2';
import Reveal from './Reveal';

// El orden refleja una escalada: consulta puntual → plan básico → estrategia
// completa. Los iconos acompañan el tema de despegue del título de la sección.
const plans = [
  {
    name: 'ASESORÍA PARCIAL',
    tagline: 'Despegue de ventas',
    description:
      'Asesoría 1 a 1 con enfoque en detección de oportunidades de mejora y planeación para procesos publicitarios digitales.',
    Icon: HiOutlineChatBubbleLeftRight,
    accent: 'from-primary to-accent',
    // El gradiente del texto se aclara en oscuro: los tonos base como texto
    // sobre la tarjeta oscura sólo dan 2.33:1 (ilegibles).
    tagline_gradient: 'from-primary to-accent dark:from-primary-lite dark:to-accent-lite',
    ring: 'hover:ring-primary/50',
    glow: 'group-hover:shadow-primary/25',
    featured: false,
  },
  {
    name: 'ESTRATEGIA PARCIAL',
    tagline: 'Ventas en ascenso',
    description:
      'Plan básico que lleva a tu empresa a dar los primeros pasos en el marketing de contenidos con una inversión accesible y resultados sólidos.',
    Icon: HiOutlinePaperAirplane,
    accent: 'from-tertiary to-secondary',
    tagline_gradient: 'from-tertiary to-secondary dark:from-tertiary-lite dark:to-secondary-lite',
    ring: 'hover:ring-tertiary/50',
    glow: 'group-hover:shadow-tertiary/25',
    featured: false,
  },
  {
    name: 'ESTRATEGIA COMPLETA',
    tagline: 'Explosión de ventas',
    description:
      'Ofrece estrategias y servicios digitales completos que permiten a las organizaciones tener presencia digital totalmente uniforme y enfocada en objetivos.',
    Icon: HiOutlineRocketLaunch,
    accent: 'from-secondary to-highlight',
    tagline_gradient: 'from-secondary to-highlight dark:from-secondary-lite dark:to-highlight',
    ring: 'hover:ring-highlight/50',
    glow: 'group-hover:shadow-highlight/25',
    featured: true,
  },
];

const PlanCard = ({ plan, delay, onContact }) => {
  const { name, tagline, description, Icon, accent, tagline_gradient, ring, glow, featured } = plan;

  return (
    <Reveal
      delay={delay}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 lg:p-10
                  bg-light-surface dark:bg-white/[0.04]
                  ring-1 ${featured ? 'ring-highlight/40' : 'ring-black/5 dark:ring-white/10'} ${ring}
                  shadow-lg transition-all duration-300
                  hover:-translate-y-2 hover:shadow-2xl ${glow}`}
    >
      {/* Barra superior de color: identifica el plan de un vistazo */}
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`}
        aria-hidden="true"
      />
      {/* Resplandor que aparece al pasar el cursor */}
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25`}
        aria-hidden="true"
      />

      {featured && (
        <span className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-secondary to-highlight px-3 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
          Más completa
        </span>
      )}

      <div className="relative z-10 flex h-full flex-col">
        <span
          className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
        >
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>

        <h3 className="mb-2 font-heading text-2xl font-bold text-light-text dark:text-white">
          {name}
        </h3>

        <span
          className={`mb-5 inline-block w-fit bg-gradient-to-r ${tagline_gradient} bg-clip-text font-body text-xl font-semibold text-transparent`}
        >
          {tagline}
        </span>

        <p className="mb-8 flex-grow font-body text-light-muted dark:text-dark-muted">
          {description}
        </p>

        <button
          onClick={onContact}
          className={`group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${accent} px-6 py-3.5 font-body font-bold text-white shadow-md transition-all duration-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary`}
        >
          Más información
          <HiArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>
    </Reveal>
  );
};

const Pricing = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2411984848', '_blank');
  };

  return (
    <section className="min-h-[90vh] rounded-lg py-24">
      <div className="container mx-auto h-full px-4">
        <Reveal
          as="h2"
          className="mb-4 text-center font-heading text-4xl font-bold text-light-text dark:text-white"
        >
          10, 9, 8... ¡Despegue!
        </Reveal>
        <Reveal
          as="p"
          delay={90}
          className="mx-auto mb-12 max-w-xl text-center font-body text-lg text-light-muted dark:text-dark-muted"
        >
          Elige el punto de partida que mejor se ajusta a tu marca
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              delay={i * 110}
              onContact={handleWhatsAppClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
