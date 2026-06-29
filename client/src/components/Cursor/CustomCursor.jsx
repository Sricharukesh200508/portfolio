import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const [cursorState, setCursorState] = useState('default');

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.10);
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.10);
      ring.style.transform = `translate(${ringPosRef.current.x - 22}px, ${ringPosRef.current.y - 22}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onMouseDown = (e) => {
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px) scale(0.5)`;
      setTimeout(() => {
        if (dot) dot.style.transform = `translate(${posRef.current.x - 3}px, ${posRef.current.y - 3}px) scale(1)`;
      }, 100);

      // Click ripple
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed; left: ${e.clientX}px; top: ${e.clientY}px;
        width: 20px; height: 20px; border-radius: 50%;
        border: 1px solid #00F5FF; pointer-events: none;
        z-index: 99997; transform: translate(-50%, -50%) scale(1);
        animation: ripple-out 0.5s ease-out forwards;
      `;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    };

    const handleHoverIn = (e) => {
      const target = e.target;
      const dataCursor = target.getAttribute('data-cursor') || 
        (target.closest('[data-cursor]') ? target.closest('[data-cursor]').getAttribute('data-cursor') : null);

      if (dataCursor === 'hover' || target.tagName === 'BUTTON' || target.tagName === 'A') {
        ring.style.width = '64px';
        ring.style.height = '64px';
        ring.style.background = 'rgba(0,245,255,0.06)';
        ring.style.borderColor = '#FF2D78';
        ring.style.boxShadow = '0 0 8px #FF2D78, 0 0 20px rgba(255,45,120,0.27)';
        dot.style.opacity = '0';
      } else if (dataCursor === 'text' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        ring.style.width = '3px';
        ring.style.height = '28px';
        ring.style.borderRadius = '2px';
        ring.style.borderColor = '#00F5FF';
      }
    };

    const handleHoverOut = () => {
      ring.style.width = '44px';
      ring.style.height = '44px';
      ring.style.background = 'transparent';
      ring.style.borderColor = '#00F5FF';
      ring.style.borderRadius = '50%';
      ring.style.boxShadow = '0 0 8px #00F5FF, 0 0 20px rgba(0,245,255,0.27)';
      dot.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', width: 6, height: 6, borderRadius: '50%',
          background: '#00F5FF', pointerEvents: 'none', zIndex: 99999,
          top: 0, left: 0, transition: 'opacity 0.2s, transform 0.05s ease',
          willChange: 'transform'
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', width: 44, height: 44, borderRadius: '50%',
          border: '1.5px solid #00F5FF', pointerEvents: 'none', zIndex: 99998,
          top: 0, left: 0,
          boxShadow: '0 0 8px #00F5FF, 0 0 20px rgba(0,245,255,0.27)',
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease, border-color 0.2s ease, border-radius 0.2s ease',
          willChange: 'transform'
        }}
      />
      <style>{`
        @keyframes ripple-out {
          from { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
          to { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }
      `}</style>
    </>
  );
}
