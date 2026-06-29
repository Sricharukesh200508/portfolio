import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Timeline from '../components/Experience/Timeline';
import Projects from '../components/Projects/Projects';
import Skills from '../components/Skills/Skills';
import Publications from '../components/Publications/Publications';
import Certifications from '../components/Certifications/Certifications';
import Contact from '../components/Contact/Contact';
import api from '../services/api';

// Section dot navigator
const SECTIONS = ['hero','about','experience','projects','skills','publications','certifications','contact'];

function SectionDots({ active }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className="section-dots">
      {SECTIONS.map(id => (
        <div key={id} className={`section-dot ${active === id ? 'active' : ''}`}
          onClick={() => scrollTo(id)} data-cursor="hover">
          <span className="dot-tooltip">{id.charAt(0).toUpperCase() + id.slice(1)}</span>
        </div>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 5,
      borderTop: '1px solid rgba(0,245,255,0.08)',
      padding: '40px', textAlign: 'center'
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.8rem', color: '#3D5A80',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
      }}>
        <span style={{
          display: 'inline-block', fontSize: '1rem',
          animation: 'heartbeat 1.5s ease-in-out infinite'
        }}>🧠</span>
        Built with neural precision by
        <span style={{ color: '#00F5FF' }}>Sri Charukesh N</span>
        · {new Date().getFullYear()}
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed', bottom: 32, right: 32,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(8,13,26,0.9)',
          border: '1px solid rgba(0,245,255,0.3)',
          color: '#00F5FF', fontSize: '1.2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(0,245,255,0.2)',
          transition: 'all 0.3s ease',
          zIndex: 100
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 0 30px rgba(0,245,255,0.5)';
          e.currentTarget.style.borderColor = '#00F5FF';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 0 20px rgba(0,245,255,0.2)';
          e.currentTarget.style.borderColor = 'rgba(0,245,255,0.3)';
        }}
        data-cursor="hover"
      >
        ↑
      </button>
    </footer>
  );
}

export default function Home() {
  const [data, setData] = useState({
    profile: null, projects: [], experience: [], skills: [], certifications: []
  });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profile, projects, experience, skills, certifications] = await Promise.all([
          api.get('/profile'),
          api.get('/projects'),
          api.get('/experience'),
          api.get('/skills'),
          api.get('/certifications'),
        ]);
        setData({
          profile: profile.data.data,
          projects: projects.data.data,
          experience: experience.data.data,
          skills: skills.data.data,
          certifications: certifications.data.data,
        });
      } catch (err) {
        console.error('Data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4 }
    );
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'JetBrains Mono', monospace", color: '#00F5FF', fontSize: '0.9rem'
      }}>
        <span>LOADING NEURAL DATA</span>
        <span className="typewriter-cursor">▋</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'relative', zIndex: 5 }}
    >
      <Navbar />
      <SectionDots active={activeSection} />
      <Hero profile={data.profile} />
      <About profile={data.profile} />
      <Timeline experiences={data.experience} />
      <Projects projects={data.projects} />
      <Skills skills={data.skills} />
      <Publications />
      <Certifications certifications={data.certifications} />
      <Contact />
      <Footer />
    </motion.div>
  );
}
