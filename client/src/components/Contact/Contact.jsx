import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';

const SUBMIT_STATES = {
  idle: { text: '⏎  TRANSMIT MESSAGE', color: '#00F5FF' },
  encrypting: { text: '🔐 ENCRYPTING PAYLOAD...', color: '#FFB800' },
  tunneling: { text: '🔗 ESTABLISHING TUNNEL...', color: '#00F5FF' },
  transmitting: { text: '📡 TRANSMITTING...', color: '#7B2FFF' },
  success: { text: '✓ MESSAGE DELIVERED', color: '#00FF88' },
  error: { text: '✗ TRANSMISSION FAILED', color: '#FF2D78' },
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitState, setSubmitState] = useState('idle');
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitState !== 'idle') return;

    // Animate sequence
    setSubmitState('encrypting');
    await new Promise(r => setTimeout(r, 700));

    setSubmitState('tunneling');
    let prog = 0;
    const progInterval = setInterval(() => {
      prog = Math.min(prog + 20, 100);
      setProgress(prog);
      if (prog >= 100) clearInterval(progInterval);
    }, 80);
    await new Promise(r => setTimeout(r, 500));

    setSubmitState('transmitting');
    await new Promise(r => setTimeout(r, 400));

    try {
      await api.post('/contact', form);
      setSubmitState('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => { setSubmitState('idle'); setProgress(0); }, 4000);
    } catch (err) {
      setSubmitState('error');
      setTimeout(() => { setSubmitState('idle'); setProgress(0); }, 3000);
    }
  };

  const inputStyle = {
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: '1px solid rgba(0,245,255,0.15)', outline: 'none',
    color: '#DCF0FF', fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.9rem', padding: '10px 0',
    caretColor: '#00F5FF', transition: 'border-color 0.2s'
  };

  const state = SUBMIT_STATES[submitState];

  return (
    <section id="contact" style={{ position: 'relative', zIndex: 5, background: 'rgba(8,13,26,0.4)' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">// contact.init</p>
          <h2 className="section-title">Get In Touch</h2>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr',
          gap: '60px', alignItems: 'start'
        }} className="contact-grid">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.05rem', lineHeight: 1.8,
              color: '#8AAEC8', marginBottom: '40px'
            }}>
              Currently open to AI/ML engineering roles, research collaborations, and internship opportunities. Let's build something intelligent together.
            </p>
            {[
              { icon: '📧', label: 'Email', value: 'sricharu73@gmail.com', href: 'mailto:sricharu73@gmail.com' },
              { icon: '💼', label: 'LinkedIn', value: 'sri-charu-kesh', href: 'https://linkedin.com/in/sri-charu-kesh' },
              { icon: '🐙', label: 'GitHub', value: 'Sricharukesh200508', href: 'https://github.com/Sricharukesh200508' },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', gap: '14px', alignItems: 'center',
                  marginBottom: '20px', textDecoration: 'none',
                  padding: '16px',
                  background: 'rgba(0,245,255,0.02)',
                  border: '1px solid rgba(0,245,255,0.08)',
                  borderRadius: '8px', transition: 'all 0.25s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(0,245,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(0,245,255,0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(0,245,255,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(0,245,255,0.08)';
                }}
                data-cursor="hover"
              >
                <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem', color: '#3D5A80',
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px'
                  }}>{item.label}</div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.88rem', color: '#00F5FF'
                  }}>{item.value}</div>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Terminal Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot red" />
                <div className="terminal-dot yellow" />
                <div className="terminal-dot green" />
                <span className="terminal-title">bash — contact@sricharukesh:~</span>
              </div>

              <div className="terminal-body">
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ color: '#00F5FF', fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}>
                    sricharu@neural:~${' '}
                  </span>
                  <span style={{ color: '#DCF0FF', fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}>
                    init_contact_protocol --secure
                  </span>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <div style={{ color: '#00F5FF', fontFamily: 'JetBrains Mono', fontSize: '0.8rem', marginBottom: '8px' }}>
                      [&gt;] Enter your name:
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#00F5FF', fontFamily: 'JetBrains Mono' }}>$</span>
                      <input
                        name="name" value={form.name} onChange={handleChange}
                        required placeholder="Your Name"
                        style={inputStyle}
                        data-cursor="text"
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ color: '#00F5FF', fontFamily: 'JetBrains Mono', fontSize: '0.8rem', marginBottom: '8px' }}>
                      [&gt;] Enter your email:
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#00F5FF', fontFamily: 'JetBrains Mono' }}>$</span>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange}
                        required placeholder="your@email.com"
                        style={inputStyle}
                        data-cursor="text"
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ color: '#00F5FF', fontFamily: 'JetBrains Mono', fontSize: '0.8rem', marginBottom: '8px' }}>
                      [&gt;] Subject:
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#00F5FF', fontFamily: 'JetBrains Mono' }}>$</span>
                      <input
                        name="subject" value={form.subject} onChange={handleChange}
                        required placeholder="What's this about?"
                        style={inputStyle}
                        data-cursor="text"
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ color: '#00F5FF', fontFamily: 'JetBrains Mono', fontSize: '0.8rem', marginBottom: '8px' }}>
                      [&gt;] Message:
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#00F5FF', fontFamily: 'JetBrains Mono', marginTop: '10px' }}>$</span>
                      <textarea
                        name="message" value={form.message} onChange={handleChange}
                        required placeholder="Your message..."
                        rows={4}
                        style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                        data-cursor="text"
                      />
                    </div>
                  </div>

                  {/* Progress bar during transmit */}
                  {submitState !== 'idle' && submitState !== 'success' && submitState !== 'error' && (
                    <div style={{ height: '2px', background: '#0C1020', borderRadius: '1px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, #7B2FFF, #00F5FF)',
                        transition: 'width 0.1s ease',
                        boxShadow: '0 0 8px #00F5FF'
                      }} />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitState !== 'idle'}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.85rem', letterSpacing: '0.08em',
                      padding: '14px 24px',
                      border: `1px solid ${state.color}44`,
                      borderRadius: '4px',
                      color: state.color,
                      background: submitState === 'success' ? 'rgba(0,255,136,0.08)' : 'transparent',
                      transition: 'all 0.3s ease',
                      boxShadow: submitState !== 'idle' ? `0 0 20px ${state.color}33` : 'none',
                    }}
                    onMouseEnter={e => {
                      if (submitState === 'idle') {
                        e.currentTarget.style.background = 'rgba(0,245,255,0.08)';
                        e.currentTarget.style.borderColor = '#00F5FF';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0,245,255,0.3)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (submitState === 'idle') {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = `${state.color}44`;
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                    data-cursor="hover"
                  >
                    {state.text}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
