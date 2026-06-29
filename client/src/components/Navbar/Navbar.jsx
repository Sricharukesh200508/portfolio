import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#publications', label: 'Research' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(8,13,26,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,245,255,0.1)' : 'none',
        transition: 'all 0.4s ease',
        padding: '0 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: "'Orbitron', sans-serif", fontWeight: 800,
            fontSize: '1.1rem', color: '#00F5FF', background: 'none',
            letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '2px',
            transition: 'text-shadow 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.textShadow = '0 0 20px #00F5FF'}
          onMouseLeave={e => e.currentTarget.style.textShadow = 'none'}
        >
          <span style={{ color: '#7B2FFF', fontWeight: 400 }}>&lt;</span>
          SC
          <span style={{ color: '#7B2FFF', fontWeight: 400 }}>/&gt;</span>
        </button>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
          className="desktop-nav">
          {NAV_LINKS.map(({ href, label }) => (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              className={`nav-link ${activeSection === href.slice(1) ? 'active' : ''}`}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.8rem', letterSpacing: '0.05em',
                color: activeSection === href.slice(1) ? '#00F5FF' : '#E8F4FD',
                background: 'none', transition: 'color 0.2s',
                fontWeight: 500
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', flexDirection: 'column', gap: '5px',
            background: 'none', padding: '8px'
          }}
          className="hamburger-btn"
          aria-label="Menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: '24px', height: '2px',
              background: '#00F5FF', borderRadius: '1px',
              transition: 'all 0.3s ease',
              transform: menuOpen ? (
                i === 0 ? 'rotate(45deg) translateY(7px)' :
                i === 1 ? 'scaleX(0)' : 'rotate(-45deg) translateY(-7px)'
              ) : 'none'
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(2,5,16,0.97)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center',
              gap: '32px', backdropFilter: 'blur(20px)'
            }}
          >
            {NAV_LINKS.map(({ href, label }, i) => (
              <motion.button
                key={label}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollTo(href)}
                style={{
                  fontFamily: "'Orbitron', sans-serif", fontSize: '1.5rem',
                  fontWeight: 700, color: '#E8F4FD', background: 'none',
                  letterSpacing: '0.1em', transition: 'color 0.2s, text-shadow 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#00F5FF';
                  e.currentTarget.style.textShadow = '0 0 20px #00F5FF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#E8F4FD';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
