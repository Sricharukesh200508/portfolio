import React, { useEffect, useRef } from 'react';

const CHARS = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ∑πλ∇∂∞⊕⊗≈∈';

export default React.memo(function MatrixRain() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const fontSize = 14;
    let columns, drops;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
    };

    init();

    const draw = () => {
      ctx.fillStyle = 'rgba(1, 2, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Color variation: 15% violet columns
        const isViolet = i % 7 === 0;

        // Leading char (brightest)
        ctx.fillStyle = '#CCFFFE';
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillText(char, x, y);

        // Trail chars
        for (let t = 1; t <= 6; t++) {
          const trailY = y - t * fontSize;
          if (trailY < 0) continue;
          const alpha = Math.max(0, 0.6 - t * 0.1);
          ctx.fillStyle = isViolet
            ? `rgba(123, 47, 255, ${alpha})`
            : `rgba(0, 245, 255, ${alpha})`;
          const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillText(trailChar, x, trailY);
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += (Math.random() * 0.8 + 0.4);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    const onResize = () => { init(); };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none', opacity: 0.04
      }}
    />
  );
});
