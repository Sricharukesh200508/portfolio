import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(1,2,8,0.95)', backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#07090F', border: '1px solid rgba(0,245,255,0.2)',
          borderRadius: '16px', padding: '40px',
          maxWidth: '720px', width: '100%', maxHeight: '90vh', overflow: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h3 style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: '1.4rem',
            fontWeight: 800, color: '#00F5FF'
          }}>
            {project.title}
          </h3>
          <button
            onClick={onClose}
            style={{
              fontFamily: "'JetBrains Mono', monospace", color: '#3D5A80',
              fontSize: '1.2rem', background: 'none', padding: '4px 12px',
              border: '1px solid rgba(0,245,255,0.1)', borderRadius: '4px',
              transition: 'color 0.2s, border-color 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#FF2D78';
              e.currentTarget.style.borderColor = 'rgba(255,45,120,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#3D5A80';
              e.currentTarget.style.borderColor = 'rgba(0,245,255,0.1)';
            }}
          >✕</button>
        </div>

        {project.hasPublication && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px', borderRadius: '20px',
            background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.3)',
            marginBottom: '20px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem', color: '#00FF88'
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#00FF88', animation: 'pulse-glow 2s infinite'
            }} />
            Scopus Indexed · {project.publicationName}
          </div>
        )}

        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1rem', lineHeight: 1.8, color: '#8AAEC8',
          marginBottom: '28px'
        }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
          {project.techStack?.map(t => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="btn-neon" style={{ fontSize: '0.8rem', padding: '10px 20px' }}>
              GitHub →
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="btn-neon btn-neon-magenta" style={{ fontSize: '0.8rem', padding: '10px 20px' }}>
              Live Demo →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const shimmerRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) scale(1.02)`;
    if (shimmerRef.current) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      shimmerRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.06) 0%, transparent 60%)`;
      shimmerRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    if (shimmerRef.current) shimmerRef.current.style.opacity = '0';
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        className="holo-card holo-shimmer"
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transition: 'transform 0.5s ease' }}
      >
        {/* Shimmer overlay */}
        <div ref={shimmerRef} style={{
          position: 'absolute', inset: 0, borderRadius: '12px',
          opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none', zIndex: 2
        }} />

        <div style={{ padding: '28px', position: 'relative', zIndex: 3 }}>
          {/* Category badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem', letterSpacing: '0.15em',
              color: '#7B2FFF', textTransform: 'uppercase'
            }}>
              {project.category}
            </span>
            {project.hasPublication && (
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem', color: '#00FF88',
                background: 'rgba(0,255,136,0.08)',
                border: '1px solid rgba(0,255,136,0.25)',
                padding: '2px 8px', borderRadius: '4px',
                display: 'flex', alignItems: 'center', gap: '4px'
              }}>
                <span style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: '#00FF88', display: 'inline-block'
                }} />
                SCOPUS
              </span>
            )}
          </div>

          <h3 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1rem', fontWeight: 700,
            color: '#E8F4FD', marginBottom: '12px', lineHeight: 1.4
          }}>
            {project.title}
          </h3>

          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.875rem', color: '#5A7A94',
            lineHeight: 1.7, marginBottom: '20px',
            display: '-webkit-box',
            WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
            {project.techStack?.slice(0, 5).map(t => (
              <span key={t} className="tag-pill" style={{ fontSize: '0.68rem', padding: '3px 10px' }}>
                {t}
              </span>
            ))}
            {project.techStack?.length > 5 && (
              <span className="tag-pill" style={{ fontSize: '0.68rem', color: '#3D5A80' }}>
                +{project.techStack.length - 5}
              </span>
            )}
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn-neon"
            style={{ fontSize: '0.75rem', padding: '10px 20px', width: '100%' }}
            data-cursor="hover"
          >
            VIEW DETAILS →
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {modalOpen && <ProjectModal project={project} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

const FILTERS = ['All', 'ML', 'Computer Vision', 'Web', 'Cloud', 'NLP'];

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('All');
  const filtered = projects?.filter(p => filter === 'All' || p.category === filter) || [];

  return (
    <section id="projects" style={{ position: 'relative', zIndex: 5, background: 'rgba(8,13,26,0.3)' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">// projects.deployed</p>
          <h2 className="section-title">Projects</h2>
        </motion.div>

        {/* Filter bar */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.78rem', letterSpacing: '0.05em',
                padding: '8px 18px', borderRadius: '20px',
                border: `1px solid ${filter === f ? '#00F5FF' : 'rgba(0,245,255,0.15)'}`,
                color: filter === f ? '#00F5FF' : '#3D5A80',
                background: filter === f ? 'rgba(0,245,255,0.08)' : 'transparent',
                boxShadow: filter === f ? '0 0 10px rgba(0,245,255,0.2)' : 'none',
                transition: 'all 0.25s ease'
              }}
              data-cursor="hover"
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filtered.map((project, i) => (
            <ProjectCard key={project._id || i} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '80px',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#3D5A80', fontSize: '0.9rem'
          }}>
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
