import { useRef, useEffect } from 'react';

export const useMouseParallax = (factor = 0.02) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * factor * 100;
      const y = (clientY / innerHeight - 0.5) * factor * 100;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [factor]);

  return ref;
};

export default useMouseParallax;
