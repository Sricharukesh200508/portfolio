import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ISSUER_COLORS = {
  'IBM': '#00F5FF',
  'Google': '#00FF88',
  'NPTEL': '#FF2D78',
  'IBM / Coursera': '#00F5FF',
  'Google / Coursera': '#00FF88',
  'NPTEL Elite': '#FF2D78',
  'University of Colorado / Coursera': '#7B2FFF',
  'IIT Madras — Mechanica': '#FFB800',
};

function CertCard({ cert }) {
  const [flipped, setFlipped] = useState(false);
  const color = ISSUER_COLORS[cert.issuer] || '#00F5FF';

  return (
    <div
      style={{
        minWidth: '280px', height: '180px', perspective: '1000px',
        flexShrink: 0
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      data-cursor="hover"
    >
      <div style={{
        width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        position: 'relative'
      }}>
        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: '#07090F',
          border: `1px solid ${color}22`,
          borderRadius: '12px', padding: '24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          boxShadow: `0 0 20px ${color}11`
        }}>
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem', color, letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: '10px'
            }}>
              {cert.issuer}
            </div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem', fontWeight: 600,
              color: '#E8F4FD', lineHeight: 1.4
            }}>
              {cert.name}
            </div>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem', color: '#3D5A80'
            }}>
              {cert.date}
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.68rem', color,
              background: `${color}12`,
              border: `1px solid ${color}33`,
              padding: '3px 8px', borderRadius: '4px'
            }}>
              HOVER TO FLIP
            </span>
          </div>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: `linear-gradient(135deg, ${color}15, rgba(7,9,15,0.98))`,
          border: `1px solid ${color}33`,
          borderRadius: '12px', padding: '24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px'
        }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '0.7rem', fontWeight: 700, color,
            letterSpacing: '0.15em', textTransform: 'uppercase'
          }}>
            {cert.issuer}
          </div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.9rem', color: '#E8F4FD', fontWeight: 600
          }}>
            {cert.name}
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem', color: '#3D5A80'
          }}>
            Issued: {cert.date}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
            {cert.skills?.map(s => (
              <span key={s} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.62rem', padding: '2px 7px', borderRadius: '3px',
                background: `${color}12`, color, border: `1px solid ${color}22`
              }}>{s}</span>
            ))}
          </div>
          {cert.credentialUrl && (
            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem', color, textDecoration: 'none',
                marginTop: '4px'
              }}>
              View Credential →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Certifications({ certifications }) {
  const certs = certifications || [];

  return (
    <section id="certifications" style={{ position: 'relative', zIndex: 5 }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">// credentials.verified</p>
          <h2 className="section-title">Certifications</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          drag="x"
          dragConstraints={{ right: 0, left: -((certs.length - 3) * 310) }}
          style={{
            display: 'flex', gap: '20px',
            paddingBottom: '16px'
          }}
        >
          {certs.map((cert, i) => (
            <CertCard key={cert._id || i} cert={cert} />
          ))}
        </motion.div>

        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.72rem', color: '#3D5A80',
          marginTop: '20px', letterSpacing: '0.1em'
        }}>
          ← DRAG TO SCROLL · HOVER CARDS TO FLIP →
        </p>
      </div>
    </section>
  );
}
