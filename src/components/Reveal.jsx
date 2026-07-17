import React from 'react';
import { useInView } from '../hooks/useInView';

/**
 * Revela su contenido al entrar en pantalla. `delay` escalona elementos
 * hermanos para que aparezcan en cascada en vez de todos a la vez.
 *
 * `as` permite conservar la semántica del HTML (h2, p, li…) en lugar de
 * envolver todo en divs.
 *
 * La animación vive en CSS (.reveal), donde una media query de
 * prefers-reduced-motion la desactiva para quien marea el movimiento.
 */
const Reveal = ({ as: Tag = 'div', delay = 0, className = '', children, ...props }) => {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
