import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CATEGORY_COLORS = {
  'AI/ML': '#00F5FF',
  'LLMs': '#7B2FFF',
  'Cloud': '#00FF88',
  'Web': '#FF2D78',
  'Databases': '#FFB800',
  'Tools': '#8AAEC8',
  'Languages': '#E8F4FD',
};

function SkillBar({ skill, index }) {
  const barRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated) setAnimated(true);
    }, { threshold: 0.5 });
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const color = CATEGORY_COLORS[skill.category] || '#00F5FF';

  return (
    <div ref={barRef} style={{ marginBottom: '20px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginBottom: '8px',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1rem' }}>{skill.icon}</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.82rem', color: '#C5D8E8'
          }}>
            {skill.name}
          </span>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.72rem', color
        }}>
          {skill.proficiency}%
        </span>
      </div>
      <div style={{
        height: '4px', borderRadius: '3px',
        background: 'rgba(0,245,255,0.06)',
        overflow: 'hidden', position: 'relative'
      }}>
        <div style={{
          height: '100%', borderRadius: '3px',
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 10px ${color}66`,
          width: animated ? `${skill.proficiency}%` : '0%',
          transition: animated ? `width 1.4s ${index * 0.05}s ease-out` : 'none',
          position: 'relative'
        }}>
          {animated && (
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0,
              width: '40px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              animation: 'scan-bounce 3s ease-in-out 1.5s infinite'
            }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Skills({ skills }) {
  const grouped = (skills || []).reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" style={{ position: 'relative', zIndex: 5 }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">// tech.stack</p>
          <h2 className="section-title">Skills & Technologies</h2>
        </motion.div>

        {/* Category cards with skill bars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '28px'
        }}>
          {Object.entries(grouped).map(([category, catSkills], gi) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.08 }}
              style={{
                background: '#07090F',
                border: '1px solid rgba(0,245,255,0.08)',
                borderRadius: '12px', padding: '28px'
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '24px'
              }}>
                <div style={{
                  width: '4px', height: '20px', borderRadius: '2px',
                  background: CATEGORY_COLORS[category] || '#00F5FF',
                  boxShadow: `0 0 8px ${CATEGORY_COLORS[category] || '#00F5FF'}`
                }} />
                <span style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '0.8rem', fontWeight: 700,
                  color: CATEGORY_COLORS[category] || '#00F5FF',
                  letterSpacing: '0.1em', textTransform: 'uppercase'
                }}>
                  {category}
                </span>
              </div>
              {catSkills.map((skill, i) => (
                <SkillBar key={skill._id || skill.name} skill={skill} index={i} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* All skill tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ marginTop: '60px' }}
        >
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem', color: '#3D5A80',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            marginBottom: '20px'
          }}>ALL TECHNOLOGIES</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {(skills || []).map(skill => (
              <span
                key={skill._id || skill.name}
                className="tag-pill"
                style={{
                  borderColor: `${CATEGORY_COLORS[skill.category] || '#00F5FF'}33`,
                  color: CATEGORY_COLORS[skill.category] || '#00F5FF',
                }}
              >
                {skill.icon} {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
