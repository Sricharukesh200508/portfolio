import React, { useRef } from 'react';
import { motion } from 'framer-motion';

function TimelineCard({ exp, side, index }) {
  const cardStyle = {
    background: '#07090F',
    border: '1px solid rgba(0,245,255,0.1)',
    borderRadius: '12px',
    padding: '28px',
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
    maxWidth: '480px',
  };

  const borderAccentStyle = {
    position: 'absolute',
    top: 0, bottom: 0,
    left: side === 'left' ? 'auto' : 0,
    right: side === 'left' ? 0 : 'auto',
    width: '3px',
    background: 'linear-gradient(180deg, #00F5FF, #7B2FFF)',
    boxShadow: '0 0 12px #00F5FF'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={cardStyle}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,245,255,0.2), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,245,255,0.08)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={borderAccentStyle} />

      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '1rem', fontWeight: 700,
          color: '#E8F4FD', marginBottom: '6px'
        }}>
          {exp.role}
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.9rem', fontWeight: 600,
            color: '#00F5FF'
          }}>
            {exp.company}
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem', color: '#3D5A80',
            background: 'rgba(0,245,255,0.05)',
            border: '1px solid rgba(0,245,255,0.1)',
            padding: '2px 8px', borderRadius: '4px'
          }}>
            {exp.type?.toUpperCase()}
          </span>
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem', color: '#3D5A80',
          marginTop: '4px'
        }}>
          {exp.duration} · {exp.location}
        </div>
      </div>

      {/* Bullets */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {exp.bullets?.map((bullet, i) => (
          <li key={i} style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.88rem', color: '#8AAEC8',
            lineHeight: 1.7, display: 'flex', gap: '10px'
          }}>
            <span style={{
              color: '#00F5FF', flexShrink: 0,
              fontFamily: "'JetBrains Mono', monospace"
            }}>▸</span>
            {bullet}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Timeline({ experiences }) {
  const exp = experiences || [];

  return (
    <section id="experience" style={{ position: 'relative', zIndex: 5 }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">// work.experience</p>
          <h2 className="section-title">Experience</h2>
        </motion.div>

        <div style={{ position: 'relative', paddingTop: '20px' }}>
          {/* Center spine */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '1px', transform: 'translateX(-50%)',
            background: 'linear-gradient(180deg, transparent, #00F5FF, #7B2FFF, transparent)',
            boxShadow: '0 0 8px rgba(0,245,255,0.4)'
          }} className="timeline-spine" />

          {exp.map((item, i) => {
            const side = i % 2 === 0 ? 'right' : 'left';
            return (
              <div key={item._id || i} style={{
                display: 'flex', gap: '60px',
                justifyContent: side === 'right' ? 'flex-start' : 'flex-end',
                marginBottom: '60px',
                position: 'relative'
              }}>
                {/* Spacer for center alignment */}
                {side === 'right' && <div style={{ flex: 1 }} />}

                <TimelineCard exp={item} side={side} index={i} />

                {side === 'left' && <div style={{ flex: 1 }} />}

                {/* Node dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, delay: i * 0.1 + 0.2 }}
                  style={{
                    position: 'absolute',
                    left: '50%', top: '32px',
                    transform: 'translate(-50%, -50%)',
                    width: '14px', height: '14px',
                    borderRadius: '50%',
                    background: '#00F5FF',
                    boxShadow: '0 0 20px #00F5FF',
                    border: '2px solid #020510',
                    zIndex: 10
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-spine { left: 20px !important; }
        }
      `}</style>
    </section>
  );
}
