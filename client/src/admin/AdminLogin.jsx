import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | error | success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await login(form.username, form.password);
      setStatus('success');
      setTimeout(() => navigate('/admin/dashboard'), 800);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const stateStyles = {
    idle: { border: '1px solid rgba(0,245,255,0.2)', color: '#00F5FF', text: '> AUTHENTICATE' },
    loading: { border: '1px solid rgba(0,245,255,0.4)', color: '#00F5FF', text: '> VERIFYING...' },
    success: { border: '1px solid rgba(0,255,136,0.5)', color: '#00FF88', text: '✓ ACCESS GRANTED' },
    error: { border: '1px solid rgba(255,45,120,0.5)', color: '#FF2D78', text: '✗ ACCESS DENIED' },
  };

  const s = stateStyles[status];

  return (
    <div style={{
      minHeight: '100vh', background: '#020510',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'JetBrains Mono', monospace"
    }}>
      {/* BG effects */}
      <div style={{
        position: 'fixed', top: '20%', left: '30%', width: 400, height: 400,
        borderRadius: '50%', background: '#7B2FFF',
        filter: 'blur(120px)', opacity: 0.08, pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%', maxWidth: '440px', padding: '24px'
        }}
      >
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot red" />
            <div className="terminal-dot yellow" />
            <div className="terminal-dot green" />
            <span className="terminal-title">admin — secure_shell:~</span>
          </div>

          <div style={{ padding: '32px' }}>
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.9rem', fontWeight: 800,
              color: '#00F5FF', letterSpacing: '0.15em',
              marginBottom: '8px'
            }}>
              ADMIN ACCESS
            </div>
            <div style={{
              fontSize: '0.75rem', color: '#3D5A80',
              marginBottom: '32px', letterSpacing: '0.1em'
            }}>
              AUTHENTICATE TO CONTINUE
            </div>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: [0, -10, 10, -8, 8, 0] }}
                transition={{ duration: 0.4 }}
                style={{
                  color: '#FF2D78', fontSize: '0.75rem',
                  marginBottom: '16px', letterSpacing: '0.1em',
                  textShadow: '0 0 10px #FF2D78'
                }}
              >
                ✗ INVALID CREDENTIALS — ACCESS DENIED
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#00F5FF', marginBottom: '8px' }}>
                  [username]
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: '#00F5FF' }}>$</span>
                  <input
                    type="text" value={form.username} required
                    onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                    placeholder="admin"
                    style={{
                      flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      borderBottom: '1px solid rgba(0,245,255,0.15)',
                      color: '#DCF0FF', fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.9rem', padding: '8px 0', caretColor: '#00F5FF'
                    }}
                    data-cursor="text"
                  />
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: '#00F5FF', marginBottom: '8px' }}>
                  [password]
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: '#00F5FF' }}>$</span>
                  <input
                    type="password" value={form.password} required
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="••••••••"
                    style={{
                      flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      borderBottom: '1px solid rgba(0,245,255,0.15)',
                      color: '#DCF0FF', fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.9rem', padding: '8px 0', caretColor: '#00F5FF'
                    }}
                    data-cursor="text"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status !== 'idle'}
                style={{
                  marginTop: '12px', padding: '14px',
                  ...s,
                  background: status === 'success' ? 'rgba(0,255,136,0.08)' :
                               status === 'error' ? 'rgba(255,45,120,0.08)' : 'transparent',
                  borderRadius: '4px',
                  fontSize: '0.85rem', letterSpacing: '0.1em',
                  transition: 'all 0.3s ease',
                  textShadow: status !== 'idle' ? `0 0 10px ${s.color}` : 'none',
                  boxShadow: status !== 'idle' ? `0 0 20px ${s.color}33` : 'none',
                }}
                data-cursor="hover"
              >
                {s.text}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
