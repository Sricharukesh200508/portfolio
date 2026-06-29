import React, { useEffect, useRef, useState } from 'react';

const TARGET = 'SRI CHARUKESH N';
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?';

export default function GlitchText() {
  const [displayText, setDisplayText] = useState('');
  const [settled, setSettled] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    let resolvedCount = 0;
    const total = TARGET.length;
    let iterations = 0;

    intervalRef.current = setInterval(() => {
      iterations++;
      if (iterations > 25) {
        resolvedCount = Math.min(resolvedCount + 1, total);
      }

      const current = TARGET.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (i < resolvedCount) return char;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join('');

      setDisplayText(current);

      if (resolvedCount >= total) {
        clearInterval(intervalRef.current);
        setDisplayText(TARGET);
        setSettled(true);
      }
    }, 40);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <h1
      data-text={settled ? TARGET : undefined}
      className={settled ? 'glitch-text' : ''}
      style={{
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: 900,
        fontSize: 'clamp(2rem, 6vw, 4.5rem)',
        letterSpacing: '0.08em',
        color: '#E8F4FD',
        textShadow: '0 0 30px rgba(0,245,255,0.2)',
        lineHeight: 1.1,
        userSelect: 'none',
        margin: 0,
        minHeight: '1.2em',
        display: 'block',
        position: 'relative',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.textShadow = '-3px 0 #FF2D78, 3px 0 #00F5FF, 0 0 30px rgba(0,245,255,0.4)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.textShadow = '0 0 30px rgba(0,245,255,0.2)';
      }}
    >
      {displayText || TARGET}
    </h1>
  );
}
