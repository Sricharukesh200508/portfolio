import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NeuralCanvas from './NeuralCanvas';
import GlitchText from './GlitchText';
import RoleCycler from './RoleCycler';

const BADGES = [
  { label: 'Springer Published', color: '#00F5FF', delay: '0s' },
  { label: 'CGPA 8.6', color: '#7B2FFF', delay: '0.5s' },
  { label: 'GCP Certified', color: '#00FF88', delay: '1s' },
];

export default function Hero({ profile }) {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <NeuralCanvas />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: '900px', margin: '0 auto',
        padding: '120px 40px 80px',
        width: '100%'
      }}>
        {/* Pre-title label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem', letterSpacing: '0.3em',
            color: '#00F5FF', textTransform: 'uppercase',
            marginBottom: '20px',
            display: 'flex', alignItems: 'center', gap: '12px'
          }}
        >
          <span style={{
            width: 40, height: 1,
            background: 'linear-gradient(90deg, transparent, #00F5FF)'
          }} />
          AI ENGINEER · ML RESEARCHER
          <span style={{
            width: 40, height: 1,
            background: 'linear-gradient(90deg, #00F5FF, transparent)'
          }} />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ marginBottom: '16px' }}
        >
          <GlitchText />
        </motion.div>

        {/* Role cycler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginBottom: '32px' }}
        >
          <RoleCycler />
        </motion.div>

        {/* Bio snippet */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            color: '#8AAEC8',
            lineHeight: 1.8, maxWidth: '600px',
            marginBottom: '40px'
          }}
        >
          Building intelligent systems at the intersection of AI research and production engineering.
          Springer LNNS published · GCP · PyTorch · LLMs · XAI
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}
        >
          <button
            className="btn-neon"
            onClick={scrollToProjects}
            data-cursor="hover"
          >
            ⚡ VIEW MY WORK
          </button>
          {profile?.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              className="btn-neon btn-neon-magenta"
              download
              data-cursor="hover"
            >
              ↓ DOWNLOAD RÉSUMÉ
            </a>
          ) : (
            <button className="btn-neon btn-neon-magenta" data-cursor="hover">
              ↓ DOWNLOAD RÉSUMÉ
            </button>
          )}
        </motion.div>

        {/* Floating Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
        >
          {BADGES.map((badge, i) => (
            <div
              key={badge.label}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', borderRadius: '20px',
                background: 'rgba(8,13,26,0.8)',
                border: `1px solid ${badge.color}33`,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem', color: badge.color,
                boxShadow: `0 0 10px ${badge.color}22`,
                animation: `badge-float ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: badge.delay
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: badge.color,
                boxShadow: `0 0 6px ${badge.color}`,
                animation: 'pulse-glow 2s ease-in-out infinite'
              }} />
              {badge.label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '8px', zIndex: 10
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem', letterSpacing: '0.2em',
          color: '#3D5A80', textTransform: 'uppercase'
        }}>SCROLL</span>
        <div className="scroll-chevron" style={{ color: '#00F5FF', fontSize: '1.2rem' }}>
          ↓
        </div>
      </div>
    </section>
  );
}
