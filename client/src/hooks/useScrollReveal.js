import { useEffect, useRef } from 'react';

export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    once = true
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible');
          el.classList.remove('reveal-hidden');
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove('reveal-visible');
          el.classList.add('reveal-hidden');
        }
      },
      { threshold, rootMargin }
    );

    el.classList.add('reveal-hidden');
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
};

export default useScrollReveal;
