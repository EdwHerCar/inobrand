import { useEffect, useRef, useState } from 'react';

/**
 * Detecta cuándo un elemento entra en el viewport. Una sola vez por defecto:
 * las animaciones de entrada que se repiten en cada scroll resultan molestas.
 *
 * El threshold es bajo a propósito: un bloque más alto que el viewport nunca
 * alcanza ratios altos de intersección y jamás dispararía.
 */
export const useInView = ({ threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
};
