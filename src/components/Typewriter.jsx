import React, { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';

/**
 * Escribe el texto carácter a carácter cuando entra en pantalla.
 *
 * El texto completo va siempre en el DOM dentro de un <span> oculto: así el
 * lector de pantalla y los buscadores leen la frase entera de una vez, en vez
 * de un texto a medio escribir, y el bloque reserva su altura final desde el
 * principio (sin saltos de layout mientras teclea).
 *
 * Con prefers-reduced-motion el texto aparece completo, sin animación.
 */
const Typewriter = ({
  text,
  as: Tag = 'span',
  speed = 28,
  startDelay = 0,
  className = '',
  cursorClassName = '',
  ...props
}) => {
  const [ref, inView] = useInView();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!inView || reduced) return;

    let timeoutId;
    let intervalId;

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setCount(prev => {
          if (prev >= text.length) {
            clearInterval(intervalId);
            setDone(true);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [inView, reduced, text, speed, startDelay]);

  const showFull = reduced || done;

  return (
    <Tag ref={ref} className={`relative ${className}`} {...props}>
      {/* Reserva el espacio del texto final y lo expone a lectores de pantalla */}
      <span className={showFull ? '' : 'invisible'}>{text}</span>

      {!showFull && (
        <span className="absolute inset-0" aria-hidden="true">
          {text.slice(0, count)}
          {inView && (
            <span
              className={`ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle ${cursorClassName}`}
              style={{ height: '0.9em' }}
            />
          )}
        </span>
      )}
    </Tag>
  );
};

export default Typewriter;
