import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Dashboard', icon: '⚡' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'skills', label: 'Skills', icon: '🧠' },
  { id: 'certifications', label: 'Certifications', icon: '🏆' },
  { id: 'messages', label: 'Messages', icon: '📨' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

function Sidebar({ active, setActive, unreadCount, onLogout, collapsed, setCollapsed }) {
  return (
    <div style={{
      width: collapsed ? '64px' : '220px',
      background: 'rgba(8,13,26,0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(0,245,255,0.1)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.3s ease',
      flexShrink: 0, zIndex: 10
    }}>
      {/* Logo */}
      <div style={{
        padding: '24px 16px',
        borderBottom: '1px solid rgba(0,245,255,0.08)',
        display: 'flex', alignItems: 'center', gap: '12px'
      }}>
        <button onClick={() => setCollapsed(!collapsed)} style={{
          color: '#00F5FF', background: 'none', fontSize: '1rem',
          padding: '4px', flexShrink: 0
        }} data-cursor="hover">
          {collapsed ? '▶' : '◀'}
        </button>
        {!collapsed && (
          <span style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '0.8rem', fontWeight: 800, color: '#00F5FF',
            whiteSpace: 'nowrap', overflow: 'hidden'
          }}>
            ADMIN PANEL
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {SIDEBAR_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            data-cursor="hover"
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 12px',
              borderRadius: '8px',
              background: active === item.id ? 'rgba(0,245,255,0.08)' : 'transparent',
              border: `1px solid ${active === item.id ? 'rgba(0,245,255,0.2)' : 'transparent'}`,
              color: active === item.id ? '#00F5FF' : '#3D5A80',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.78rem', letterSpacing: '0.05em',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap', overflow: 'hidden',
              position: 'relative'
            }}
            onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.color = '#8AAEC8'; }}
            onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.color = '#3D5A80'; }}
          >
            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
            {!collapsed && item.label}
            {!collapsed && item.id === 'messages' && unreadCount > 0 && (
              <span style={{
                marginLeft: 'auto', background: '#FF2D78', color: '#fff',
                borderRadius: '10px', padding: '1px 7px', fontSize: '0.65rem',
                fontWeight: 700
              }}>
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: '16px 8px', borderTop: '1px solid rgba(0,245,255,0.08)' }}>
        <button
          onClick={onLogout}
          data-cursor="hover"
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px', width: '100%', borderRadius: '8px',
            border: '1px solid rgba(255,45,120,0.15)',
            color: '#FF2D78', fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.78rem', background: 'transparent',
            transition: 'all 0.2s ease', whiteSpace: 'nowrap', overflow: 'hidden'
          }}
        >
          <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>🚪</span>
          {!collapsed && 'Logout'}
        </button>
      </div>
    </div>
  );
}

function Overview({ stats }) {
  return (
    <div>
      <h2 style={{
        fontFamily: "'Orbitron', sans-serif", fontSize: '1.2rem',
        color: '#00F5FF', marginBottom: '32px', fontWeight: 700
      }}>
        SYSTEM OVERVIEW
      </h2>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px', marginBottom: '40px'
      }}>
        {[
          { label: 'Total Projects', value: stats.projects, color: '#00F5FF' },
          { label: 'Unread Messages', value: stats.unread, color: '#FF2D78' },
          { label: 'Skills Listed', value: stats.skills, color: '#7B2FFF' },
          { label: 'Certifications', value: stats.certs, color: '#00FF88' },
        ].map(card => (
          <div key={card.label} style={{
            background: '#07090F', border: `1px solid ${card.color}22`,
            borderRadius: '12px', padding: '24px',
            boxShadow: `0 0 20px ${card.color}11`
          }}>
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '2rem', fontWeight: 800, color: card.color,
              marginBottom: '8px'
            }}>
              {card.value ?? '—'}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem', color: '#3D5A80',
              letterSpacing: '0.1em', textTransform: 'uppercase'
            }}>
              {card.label}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        background: '#07090F', border: '1px solid rgba(0,245,255,0.08)',
        borderRadius: '12px', padding: '24px'
      }}>
        <h3 style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem',
          color: '#3D5A80', letterSpacing: '0.15em', marginBottom: '16px'
        }}>
          RECENT ACTIVITY
        </h3>
        <p style={{ color: '#3D5A80', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>
          All systems nominal. Neural portfolio online.
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState({ projects: 0, unread: 0, skills: 0, certs: 0 });

  // Lazy load panels
  const [ProjectsPanel, setProjectsPanel] = useState(null);
  const [ExperiencePanel, setExperiencePanel] = useState(null);
  const [SkillsPanel, setSkillsPanel] = useState(null);
  const [CertsPanel, setCertsPanel] = useState(null);
  const [MessagesPanel, setMessagesPanel] = useState(null);
  const [SettingsPanel, setSettingsPanel] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [proj, skills, certs, msgs] = await Promise.all([
          api.get('/projects'), api.get('/skills'), api.get('/certifications'),
          api.get('/contact/messages')
        ]);
        setStats({
          projects: proj.data.data.length,
          skills: skills.data.data.length,
          certs: certs.data.data.length,
          unread: msgs.data.unreadCount
        });
      } catch {}
    };
    fetchStats();

    // Lazy import panels
    import('./panels/ProjectsPanel').then(m => setProjectsPanel(() => m.default));
    import('./panels/ExperiencePanel').then(m => setExperiencePanel(() => m.default));
    import('./panels/SkillsPanel').then(m => setSkillsPanel(() => m.default));
    import('./panels/CertsPanel').then(m => setCertsPanel(() => m.default));
    import('./panels/MessagesPanel').then(m => setMessagesPanel(() => m.default));
    import('./panels/SettingsPanel').then(m => setSettingsPanel(() => m.default));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const renderPanel = () => {
    switch (active) {
      case 'overview': return <Overview stats={stats} />;
      case 'projects': return ProjectsPanel ? <ProjectsPanel /> : <div style={{ color: '#3D5A80' }}>Loading...</div>;
      case 'experience': return ExperiencePanel ? <ExperiencePanel /> : <div style={{ color: '#3D5A80' }}>Loading...</div>;
      case 'skills': return SkillsPanel ? <SkillsPanel /> : <div style={{ color: '#3D5A80' }}>Loading...</div>;
      case 'certifications': return CertsPanel ? <CertsPanel /> : <div style={{ color: '#3D5A80' }}>Loading...</div>;
      case 'messages': return MessagesPanel ? <MessagesPanel /> : <div style={{ color: '#3D5A80' }}>Loading...</div>;
      case 'settings': return SettingsPanel ? <SettingsPanel /> : <div style={{ color: '#3D5A80' }}>Loading...</div>;
      default: return null;
    }
  };

  return (
    <div style={{
      display: 'flex', minHeight: '100vh', background: '#020510',
      fontFamily: "'JetBrains Mono', monospace"
    }}>
      <Sidebar
        active={active} setActive={setActive}
        unreadCount={stats.unread} onLogout={handleLogout}
        collapsed={collapsed} setCollapsed={setCollapsed}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <div style={{
          height: '60px', background: 'rgba(8,13,26,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,245,255,0.08)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px', flexShrink: 0
        }}>
          <span style={{ fontSize: '0.75rem', color: '#3D5A80', letterSpacing: '0.1em' }}>
            LOGGED IN AS: <span style={{ color: '#00F5FF' }}>ADMIN</span>
          </span>
          <span style={{ fontSize: '0.72rem', color: '#3D5A80' }}>
            Last login: {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Now'}
          </span>
        </div>

        {/* Main content */}
        <main style={{
          flex: 1, overflow: 'auto',
          padding: '40px 48px'
        }}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderPanel()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
