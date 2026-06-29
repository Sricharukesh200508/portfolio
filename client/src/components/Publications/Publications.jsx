import React from 'react';
import { motion } from 'framer-motion';

const PUBLICATION = {
  title: 'PS-GRNN: A Protocol-State-Gated Recurrent Neural Network for Interpretable Intrusion Detection',
  conference: 'ICICC-2026',
  publisher: 'Springer LNNS',
  indexed: 'Scopus Indexed',
  year: '2026',
  abstract: 'This paper presents PS-GRNN, a novel architecture combining protocol-state awareness with gated recurrent neural networks for network intrusion detection. The model achieves high accuracy while maintaining interpretability through attention mechanisms and state-aware feature extraction, enabling security analysts to understand model decisions. Published in the proceedings of ICICC-2026 under Springer Lecture Notes in Networks and Systems.',
  authors: 'Sri Charukesh N et al.',
  doi: 'Springer LNNS — ICICC-2026'
};

export default function Publications() {
  const [showAbstract, setShowAbstract] = React.useState(false);

  return (
    <section id="publications" style={{ position: 'relative', zIndex: 5, background: 'rgba(8,13,26,0.4)' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">// research.published</p>
          <h2 className="section-title">Publication</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            background: '#07090F',
            border: '1px solid rgba(0,245,255,0.12)',
            borderRadius: '16px', padding: '40px',
            maxWidth: '800px', position: 'relative', overflow: 'hidden'
          }}
        >
          {/* Left border glow */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
            background: 'linear-gradient(180deg, #00F5FF, #7B2FFF)',
            boxShadow: '0 0 12px #00F5FF'
          }} />

          {/* Badges row */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem', padding: '4px 12px', borderRadius: '4px',
              background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.3)',
              color: '#00FF88', display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#00FF88', animation: 'pulse-glow 2s infinite',
                display: 'inline-block'
              }} />
              {PUBLICATION.indexed}
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem', padding: '4px 12px', borderRadius: '4px',
              background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.2)',
              color: '#00F5FF'
            }}>
              {PUBLICATION.publisher}
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem', padding: '4px 12px', borderRadius: '4px',
              background: 'rgba(123,47,255,0.08)', border: '1px solid rgba(123,47,255,0.3)',
              color: '#7B2FFF'
            }}>
              {PUBLICATION.conference}
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem', padding: '4px 12px', borderRadius: '4px',
              background: 'rgba(255,184,0,0.08)', border: '1px solid rgba(255,184,0,0.2)',
              color: '#FFB800'
            }}>
              {PUBLICATION.year}
            </span>
          </div>

          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: 700, color: '#E8F4FD',
            lineHeight: 1.5, marginBottom: '12px'
          }}>
            {PUBLICATION.title}
          </h3>

          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.78rem', color: '#3D5A80',
            marginBottom: '20px'
          }}>
            {PUBLICATION.authors}
          </p>

          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem', color: '#3D5A80',
            marginBottom: '24px',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <span>DOI:</span>
            <span style={{ color: '#00F5FF' }}>{PUBLICATION.doi}</span>
          </div>

          {/* Abstract toggle */}
          <button
            onClick={() => setShowAbstract(!showAbstract)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.78rem', color: '#00F5FF',
              background: 'rgba(0,245,255,0.05)',
              border: '1px solid rgba(0,245,255,0.2)',
              padding: '8px 18px', borderRadius: '6px',
              transition: 'all 0.2s ease',
              marginBottom: showAbstract ? '16px' : 0
            }}
            data-cursor="hover"
          >
            {showAbstract ? '▲ HIDE ABSTRACT' : '▼ VIEW ABSTRACT'}
          </button>

          {showAbstract && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.9rem', lineHeight: 1.8,
                color: '#8AAEC8', borderTop: '1px solid rgba(0,245,255,0.08)',
                paddingTop: '16px'
              }}
            >
              {PUBLICATION.abstract}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
