import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Admin from './pages/Admin';

import MatrixRain from './components/Background/MatrixRain';
import BootLoader from './components/Loader/BootLoader';
import { Toaster } from 'react-hot-toast';

// SVG Noise filter
const NoiseSVG = () => (
  <svg style={{ position: 'fixed', width: 0, height: 0, zIndex: -1 }} aria-hidden="true">
    <defs>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </defs>
  </svg>
);

const ScrollProgress = () => {
  const barRef = useRef(null);
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  return <div ref={barRef} className="scroll-progress" />;
};

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <NoiseSVG />
      {!isAdmin && <BootLoader />}

      <ScrollProgress />
      {!isAdmin && (
        <>
          <div className="aurora-blob aurora-1" />
          <div className="aurora-blob aurora-2" />
          <div className="aurora-blob aurora-3" />
          <div className="scanline-overlay" />
          <div className="noise-overlay" />
          <MatrixRain />
        </>
      )}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </AnimatePresence>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0D1526',
            color: '#E8F4FD',
            border: '1px solid rgba(0,245,255,0.2)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.85rem'
          }
        }}
      />
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
