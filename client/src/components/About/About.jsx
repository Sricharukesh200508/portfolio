import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function StatCounter({ value, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const end = parseFloat(value);
        const duration = 2000;
        const step = duration / (end / 0.1);
        const timer = setInterval(() => {
          start += end / 60;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(parseFloat(start.toFixed(1)));
        }, duration / 60);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        fontWeight: 800,
        background: 'linear-gradient(135deg, #00F5FF, #7B2FFF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1
      }}>
        {typeof value === 'string' && value.includes('.') ? count.toFixed(1) : Math.ceil(count)}{suffix}
      </div>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.72rem', color: '#3D5A80',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        marginTop: '8px'
      }}>
        {label}
      </div>
    </div>
  );
}

export default function About({ profile }) {
  const hexStyle = {
    width: '240px', height: '240px',
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    background: 'linear-gradient(135deg, rgba(0,245,255,0.1), rgba(123,47,255,0.1))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '2px solid rgba(0,245,255,0.3)',
    position: 'relative', overflow: 'hidden'
  };

  return (
    <section id="about" style={{ background: 'rgba(8,13,26,0.4)', position: 'relative', zIndex: 5 }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">// about.me</p>
          <h2 className="section-title">Who I Am</h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '80px', alignItems: 'center',
          marginBottom: '80px'
        }}
        className="about-grid">
          {/* Hexagonal Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{ position: 'relative', flexShrink: 0 }}
          >
            <div style={{
              ...hexStyle,
              animation: 'spin 20s linear infinite',
              position: 'absolute', inset: 0,
              background: 'conic-gradient(from 0deg, #00F5FF, #7B2FFF, #FF2D78, #00F5FF)',
              opacity: 0.3, zIndex: 0
            }} />
            <div style={{
              ...hexStyle,
              position: 'relative', zIndex: 1,
              background: 'rgba(2,5,16,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '5rem'
            }}>
              🧠
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.05rem', lineHeight: 1.9,
              color: '#C5D8E8', marginBottom: '24px'
            }}>
              {profile?.bio || `I'm Sri Charukesh N, an AI & ML engineer pursuing my B.Tech at SRM Institute of Science and Technology, Tiruchirappalli. I build intelligent systems that bridge cutting-edge research with production-grade software.`}
            </p>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.05rem', lineHeight: 1.9, color: '#8AAEC8'
            }}>
              My work spans LLM-integrated pipelines, computer vision with YOLOv8, explainable AI with SHAP, and cloud-native deployments on GCP. Published at ICICC-2026 (Springer LNNS, Scopus Indexed).
            </p>

            <div style={{
              marginTop: '28px', display: 'flex', gap: '16px', flexWrap: 'wrap'
            }}>
              {[
                { icon: '🎓', text: 'SRM IST, Trichy' },
                { icon: '📅', text: 'Expected May 2027' },
                { icon: '⭐', text: 'CGPA 8.6 / 10.0' },
              ].map(item => (
                <div key={item.text} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.8rem', color: '#3D5A80',
                  background: 'rgba(0,245,255,0.04)',
                  border: '1px solid rgba(0,245,255,0.1)',
                  padding: '8px 14px', borderRadius: '6px'
                }}>
                  <span>{item.icon}</span>
                  <span style={{ color: '#8AAEC8' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stat Counters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '40px',
            padding: '48px',
            background: 'rgba(8,13,26,0.6)',
            border: '1px solid rgba(0,245,255,0.08)',
            borderRadius: '16px',
            backdropFilter: 'blur(20px)'
          }}
        >
          <StatCounter value="3" suffix="+" label="Projects Deployed" />
          <StatCounter value="2" suffix="" label="Internships" />
          <StatCounter value="1" suffix="" label="Scopus Publication" />
          <StatCounter value="8.6" suffix="" label="CGPA" />
          <StatCounter value="6" suffix="" label="Certifications" />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; justify-items: center; }
        }
      `}</style>
    </section>
  );
}
