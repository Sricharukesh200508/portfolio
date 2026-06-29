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

export default function CertsPanel() {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({ name: '', issuer: '', date: '', credentialUrl: '', skills: '' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetch = async () => {
    const res = await api.get('/certifications');
    setCerts(res.data.data);
  };
  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, skills: form.skills.split(',').map(s => s.trim()).filter(Boolean) };
      if (editId) { await api.put(`/certifications/${editId}`, data); toast.success('Updated'); }
      else { await api.post('/certifications', data); toast.success('Added'); }
      setForm({ name: '', issuer: '', date: '', credentialUrl: '', skills: '' });
      setEditId(null); setShowForm(false); fetch();
    } catch { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`/certifications/${id}`); toast.success('Deleted'); fetch(); }
    catch { toast.error('Failed'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', color: '#00F5FF', fontWeight: 700 }}>CERTIFICATIONS</h2>
        <button onClick={() => { setForm({ name:'',issuer:'',date:'',credentialUrl:'',skills:'' }); setEditId(null); setShowForm(!showForm); }} className="btn-neon" style={{ fontSize: '0.78rem', padding: '10px 20px' }} data-cursor="hover">
          {showForm ? 'CANCEL' : '+ ADD CERT'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#07090F', border: '1px solid rgba(0,245,255,0.12)', borderRadius: '12px', padding: '28px', marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              { name: 'name', label: 'Certification Name' },
              { name: 'issuer', label: 'Issuer' },
              { name: 'date', label: 'Date Issued' },
              { name: 'credentialUrl', label: 'Credential URL' },
            ].map(f => (
              <div key={f.name}>
                <label style={labelStyle}>{f.label}</label>
                <input type="text" value={form[f.name] || ''} onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))} style={inputStyle} data-cursor="text" />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px' }}>
            <label style={labelStyle}>Skills (comma-separated)</label>
            <input type="text" value={form.skills || ''} onChange={e => setForm(p => ({ ...p, skills: e.target.value }))} placeholder="SQL, Cloud, AI..." style={inputStyle} data-cursor="text" />
          </div>
          <button type="submit" className="btn-neon" style={{ marginTop: '24px' }} data-cursor="hover">
            {editId ? '✓ UPDATE' : '+ CREATE'}
          </button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {certs.map(c => (
          <div key={c._id} style={{
            background: '#07090F', border: '1px solid rgba(0,245,255,0.08)',
            borderRadius: '10px', padding: '20px'
          }}>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.85rem', color: '#E8F4FD', marginBottom: '6px' }}>{c.name}</div>
            <div style={{ color: '#00F5FF', fontSize: '0.78rem', marginBottom: '4px' }}>{c.issuer}</div>
            <div style={{ color: '#3D5A80', fontSize: '0.72rem', fontFamily: "'JetBrains Mono', monospace", marginBottom: '16px' }}>{c.date}</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => { setForm({ ...c, skills: c.skills?.join(', ') || '' }); setEditId(c._id); setShowForm(true); }} data-cursor="hover"
                style={{ color: '#00F5FF', background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.2)', borderRadius: '4px', padding: '6px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem' }}>EDIT</button>
              <button onClick={() => handleDelete(c._id)} data-cursor="hover"
                style={{ color: '#FF2D78', background: 'rgba(255,45,120,0.06)', border: '1px solid rgba(255,45,120,0.2)', borderRadius: '4px', padding: '6px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem' }}>DEL</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
