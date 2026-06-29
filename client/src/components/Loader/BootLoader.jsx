import React, { useEffect, useRef, useState, useCallback } from 'react';

const BOOT_LINES = [
  { prefix: '> ', text: 'BOOTING NEURAL CORE v2.0.27...', ok: false },
  { prefix: '> ', text: 'SCANNING NEURAL PATHWAYS............', ok: true },
  { prefix: '> ', text: 'LOADING PROFILE: SRI CHARUKESH N....', ok: true },
  { prefix: '> ', text: 'MOUNTING AI SUBSYSTEMS..............', ok: true },
  { prefix: '> ', text: 'CALIBRATING RENDER PIPELINE.........', ok: true },
  { prefix: '> ', text: 'VERIFYING CRYPTOGRAPHIC KEYS........', ok: true },
  { prefix: '> ', text: 'ESTABLISHING SECURE UPLINK..........', ok: true },
  { prefix: '> ', text: 'IDENTITY CONFIRMED: ENGINEER CLASS-A', ok: false },
  { prefix: '> ', text: 'ALL SYSTEMS NOMINAL. LAUNCHING...', ok: false },
];

export default function BootLoader() {
  const [visible, setVisible] = useState(() => sessionStorage.getItem('booted') !== 'true');
  const [showSkip, setShowSkip] = useState(false);
  const [phase, setPhase] = useState('terminal');
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState([]);
  const [exiting, setExiting] = useState(false);
  const loaderRef = useRef(null);

  const triggerExit = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    sessionStorage.setItem('booted', 'true');

    const el = loaderRef.current;
    if (!el) { setVisible(false); document.body.style.overflow = ''; return; }

    // Flicker then collapse
    el.style.transition = 'filter 0.1s ease';
    el.style.filter = 'brightness(3)';

    setTimeout(() => { if (el) el.style.filter = 'brightness(0.2)'; }, 100);
    setTimeout(() => {
      if (el) {
        el.style.transition = 'transform 0.3s ease-in, opacity 0.3s ease-in';
        el.style.transformOrigin = 'top';
        el.style.transform = 'scaleY(0)';
        el.style.opacity = '0';
      }
    }, 200);
    setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, 550);
  }, [exiting]);

  // Print lines one by one
  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = 'hidden';

    const skipTimer = setTimeout(() => setShowSkip(true), 1500);

    let idx = 0;
    let cancelled = false;

    const printNext = () => {
      if (cancelled) return;
      if (idx < BOOT_LINES.length) {
        const line = BOOT_LINES[idx];
        setLines(prev => [...prev, line]);
        idx++;
        setTimeout(printNext, idx === 1 ? 400 : 550);
      } else {
        setTimeout(() => { if (!cancelled) setPhase('progress'); }, 300);
      }
    };

    const startTimer = setTimeout(printNext, 500);

    return () => {
      cancelled = true;
      clearTimeout(skipTimer);
      clearTimeout(startTimer);
    };
  }, [visible]);

  // Progress bar animation
  useEffect(() => {
    if (phase !== 'progress') return;
    let prog = 0;
    let done = false;

    const interval = setInterval(() => {
      prog = Math.min(prog + Math.random() * 8 + 4, 100);
      setProgress(prog);
      if (prog >= 100 && !done) {
        done = true;
        clearInterval(interval);
        setTimeout(triggerExit, 400);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [phase]); // intentionally not including triggerExit in deps

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 99998,
        background: '#010208',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'flex-start',
        padding: '40px 60px',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Skip button */}
      {showSkip && !exiting && (
        <button
          onClick={triggerExit}
          style={{
            position: 'absolute', top: 24, right: 24,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem', color: '#2E4A6A',
            background: 'none', border: 'none',
            letterSpacing: '0.1em', padding: '8px 12px',
            transition: 'color 0.2s, text-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#00F5FF';
            e.currentTarget.style.textShadow = '0 0 10px #00F5FF';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = '#2E4A6A';
            e.currentTarget.style.textShadow = 'none';
          }}
        >
          [ SKIP ]
        </button>
      )}

      <div style={{ width: '100%', maxWidth: '700px' }}>
        {/* Terminal lines */}
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              marginBottom: '10px',
              fontSize: '0.85rem',
              animation: 'fadeSlideUp 0.4s ease both',
            }}
          >
            <span style={{ color: '#00F5FF', flexShrink: 0 }}>{line.prefix}</span>
            <span style={{ color: '#DCF0FF' }}>{line.text}</span>
            {line.ok && (
              <span style={{
                color: '#00FF88', fontWeight: 700, fontSize: '0.78rem',
                display: 'inline-block', flexShrink: 0,
                animation: 'okPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
              }}>
                [OK]
              </span>
            )}
          </div>
        ))}

        {/* Progress bar */}
        {phase === 'progress' && (
          <div style={{ marginTop: '28px' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: '8px', fontSize: '0.72rem', color: '#3D5A80'
            }}>
              <span>LAUNCHING INTERFACE</span>
              <span style={{ color: '#00F5FF', fontWeight: 700 }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div style={{
              width: '100%', height: '2px',
              background: '#0C1020', borderRadius: '1px',
              overflow: 'hidden', position: 'relative'
            }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #7B2FFF, #00F5FF, #FF2D78)',
                borderRadius: '1px',
                transition: 'width 0.05s linear',
                boxShadow: '0 0 10px #00F5FF',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', right: 0, top: '-3px',
                  width: '60px', height: '8px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                  filter: 'blur(2px)',
                }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes okPop {
          from { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.2); }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
