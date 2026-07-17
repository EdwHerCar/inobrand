import React from 'react';
import { HiOutlineChartBar, HiOutlineSparkles, HiOutlineMegaphone, HiOutlineHeart } from 'react-icons/hi2';
import Reveal from './Reveal';

// Los fondos usan las variantes *-deep: los tonos base de marca no alcanzan
// contraste AA con texto blanco (highlight 3.43:1, accent 4.23:1).
const services = [
  {
    title: 'Estrategias',
    description: 'Optimiza la presencia online mediante campañas personalizadas.',
    Icon: HiOutlineChartBar,
    gradient: 'from-primary-deep to-tertiary-deep',
    area: 'md:col-span-5 md:row-span-3 md:col-start-1 md:row-start-1',
    padding: 'p-8',
  },
  {
    title: 'Creación de contenido',
    description: 'Material visual y escrito adaptado a las necesidades de tu marca.',
    Icon: HiOutlineSparkles,
    gradient: 'from-primary-deep via-tertiary-deep to-secondary-deep',
    area: 'md:col-span-2 md:row-span-6 md:col-start-6 md:row-start-1',
    padding: 'p-6',
  },
  {
    title: 'Pauta publicitaria',
    description: 'Gestión de campañas pagadas para aumentar visibilidad y conversiones.',
    Icon: HiOutlineMegaphone,
    gradient: 'from-secondary-deep via-highlight-deep to-accent-deep',
    area: 'md:col-span-2 md:row-span-6 md:col-start-1 md:row-start-4',
    padding: 'p-6',
  },
  {
    title: 'Manejo de redes',
    description: 'Gestión de cuentas para aumentar la interacción y visibilidad online.',
    Icon: HiOutlineHeart,
    gradient: 'from-tertiary-deep to-accent-deep',
    area: 'md:col-span-5 md:row-span-3 md:col-start-3 md:row-start-7',
    padding: 'p-8',
  },
];

const ServiceCard = ({ title, description, Icon, gradient, area, padding, delay }) => (
  <Reveal
    delay={delay}
    className={`${area} group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} ${padding}
                flex flex-col justify-center text-white
                ring-1 ring-white/15 shadow-lg
                transition-[transform,box-shadow] duration-300
                hover:scale-[1.03] hover:shadow-2xl hover:ring-white/30`}
  >
    {/* Brillo superior: despega la tarjeta del fondo negro y da profundidad */}
    <div
      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"
      aria-hidden="true"
    />

    <div className="relative z-10">
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
      </span>

      <h3 className="mb-3 font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl">
        {title}
      </h3>
      <p className="font-body text-base !text-white/90 md:text-lg lg:text-xl">
        {description}
      </p>
    </div>
  </Reveal>
);

const Services = () => {
  return (
    <div className="mt-32 flex min-h-[800px] flex-col gap-4 space-y-8 p-8 md:mt-24 md:grid md:grid-cols-7 md:grid-rows-9 md:space-y-0 lg:p-16 xl:p-24">
      {/* Tarjeta de título */}
      <Reveal
        className="group relative flex flex-col justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-secondary-deep to-highlight-deep p-8 text-white ring-1 ring-white/15 shadow-lg transition-[transform,box-shadow] duration-300 hover:scale-[1.03] hover:shadow-2xl hover:ring-white/30 md:col-span-3 md:row-span-3 md:col-start-3 md:row-start-4"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"
          aria-hidden="true"
        />
        <h2 className="relative z-10 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Nuestros Servicios
        </h2>
      </Reveal>

      {services.map((service, i) => (
        <ServiceCard key={service.title} {...service} delay={i * 90} />
      ))}
    </div>
  );
};

export default Services;
