import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const inputStyle = {
  width: '100%', background: 'rgba(8,13,26,0.8)',
  border: '1px solid rgba(0,245,255,0.15)', borderRadius: '6px',
  padding: '10px 14px', color: '#E8F4FD',
  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', outline: 'none'
};
const labelStyle = {
  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#3D5A80',
  letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px', display: 'block'
};

export default function SettingsPanel() {
  const [profile, setProfile] = useState(null);
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/profile').then(res => setProfile(res.data.data)).catch(() => {});
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.patch('/profile', profile);
      toast.success('Profile updated');
    } catch { toast.error('Update failed'); }
    finally { setSaving(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error('Passwords do not match'); return;
    }
    if (pwForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters'); return;
    }
    try {
      await api.post('/auth/change-password', {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword
      });
      toast.success('Password changed');
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
  };

  const handleClearMessages = async () => {
    if (!confirm('Clear ALL messages? This cannot be undone!')) return;
    try {
      await api.delete('/contact/messages/clear-all');
      toast.success('All messages cleared');
    } catch { toast.error('Failed'); }
  };

  if (!profile) return (
    <div style={{ color: '#3D5A80', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}>
      Loading profile...
    </div>
  );

  return (
    <div>
      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', color: '#00F5FF', fontWeight: 700, marginBottom: '32px' }}>
        PROFILE SETTINGS
      </h2>

      {/* Profile form */}
      <form onSubmit={handleProfileSave} style={{
        background: '#07090F', border: '1px solid rgba(0,245,255,0.12)',
        borderRadius: '12px', padding: '28px', marginBottom: '28px'
      }}>
        <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#3D5A80', letterSpacing: '0.15em', marginBottom: '20px' }}>
          PUBLIC PROFILE
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {[
            { key: 'name', label: 'Full Name' },
            { key: 'email', label: 'Email' },
            { key: 'linkedin', label: 'LinkedIn URL' },
            { key: 'github', label: 'GitHub URL' },
            { key: 'cgpa', label: 'CGPA' },
            { key: 'expectedGraduation', label: 'Expected Graduation' },
          ].map(f => (
            <div key={f.key}>
              <label style={labelStyle}>{f.label}</label>
              <input
                type="text"
                value={profile[f.key] || ''}
                onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                style={inputStyle}
                data-cursor="text"
              />
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <label style={labelStyle}>Tagline</label>
          <input type="text" value={profile.tagline || ''} onChange={e => setProfile(p => ({ ...p, tagline: e.target.value }))} style={inputStyle} data-cursor="text" />
        </div>
        <div style={{ marginTop: '20px' }}>
          <label style={labelStyle}>Bio</label>
          <textarea value={profile.bio || ''} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} rows={5} style={{ ...inputStyle, resize: 'vertical' }} data-cursor="text" />
        </div>
        <button type="submit" className="btn-neon" style={{ marginTop: '24px' }} disabled={saving} data-cursor="hover">
          {saving ? 'SAVING...' : '✓ SAVE PROFILE'}
        </button>
      </form>

      {/* Password change */}
      <form onSubmit={handlePasswordChange} style={{
        background: '#07090F', border: '1px solid rgba(0,245,255,0.12)',
        borderRadius: '12px', padding: '28px', marginBottom: '28px'
      }}>
        <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#3D5A80', letterSpacing: '0.15em', marginBottom: '20px' }}>
          CHANGE PASSWORD
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          {[
            { key: 'currentPassword', label: 'Current Password' },
            { key: 'newPassword', label: 'New Password' },
            { key: 'confirmPassword', label: 'Confirm New Password' },
          ].map(f => (
            <div key={f.key}>
              <label style={labelStyle}>{f.label}</label>
              <input type="password" value={pwForm[f.key]} onChange={e => setPwForm(p => ({ ...p, [f.key]: e.target.value }))} style={inputStyle} required data-cursor="text" />
            </div>
          ))}
          <button type="submit" className="btn-neon" style={{ marginTop: '8px' }} data-cursor="hover">
            🔑 UPDATE PASSWORD
          </button>
        </div>
      </form>

      {/* Danger zone */}
      <div style={{
        background: '#07090F', border: '1px solid rgba(255,45,120,0.2)',
        borderRadius: '12px', padding: '28px'
      }}>
        <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#FF2D78', letterSpacing: '0.15em', marginBottom: '16px' }}>
          ⚠ DANGER ZONE
        </h3>
        <p style={{ color: '#3D5A80', fontSize: '0.82rem', fontFamily: "'JetBrains Mono', monospace", marginBottom: '16px' }}>
          This action permanently deletes all contact messages.
        </p>
        <button
          onClick={handleClearMessages}
          style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem',
            color: '#FF2D78', background: 'rgba(255,45,120,0.08)',
            border: '1px solid rgba(255,45,120,0.3)', borderRadius: '4px',
            padding: '10px 20px', transition: 'all 0.2s'
          }}
          data-cursor="hover"
        >
          🗑 CLEAR ALL MESSAGES
        </button>
      </div>
    </div>
  );
}
