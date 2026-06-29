import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const empty = { company: '', role: '', duration: '', startDate: '', endDate: '', location: '', type: 'internship', bullets: '', order: 0 };

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

export default function ExperiencePanel() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetch = async () => {
    const res = await api.get('/experience');
    setItems(res.data.data);
  };
  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, bullets: form.bullets.split('\n').filter(b => b.trim()) };
      if (editId) {
        await api.put(`/experience/${editId}`, data);
        toast.success('Experience updated');
      } else {
        await api.post('/experience', data);
        toast.success('Experience added');
      }
      setForm(empty); setEditId(null); setShowForm(false); fetch();
    } catch { toast.error('Operation failed'); }
  };

  const handleEdit = (item) => {
    setForm({ ...item, bullets: item.bullets?.join('\n') || '' });
    setEditId(item._id); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`/experience/${id}`); toast.success('Deleted'); fetch(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', color: '#00F5FF', fontWeight: 700 }}>EXPERIENCE</h2>
        <button onClick={() => { setForm(empty); setEditId(null); setShowForm(!showForm); }} className="btn-neon" style={{ fontSize: '0.78rem', padding: '10px 20px' }} data-cursor="hover">
          {showForm ? 'CANCEL' : '+ ADD EXPERIENCE'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#07090F', border: '1px solid rgba(0,245,255,0.12)', borderRadius: '12px', padding: '28px', marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              { name: 'company', label: 'Company' }, { name: 'role', label: 'Role' },
              { name: 'duration', label: 'Duration' }, { name: 'location', label: 'Location' },
              { name: 'startDate', label: 'Start Date' }, { name: 'endDate', label: 'End Date' },
            ].map(f => (
              <div key={f.name}>
                <label style={labelStyle}>{f.label}</label>
                <input type="text" value={form[f.name] || ''} onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))} style={inputStyle} data-cursor="text" />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px' }}>
            <label style={labelStyle}>Type</label>
            <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} style={inputStyle}>
              {['internship','full-time','part-time','freelance'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginTop: '20px' }}>
            <label style={labelStyle}>Bullet Points (one per line)</label>
            <textarea value={form.bullets} onChange={e => setForm(p => ({ ...p, bullets: e.target.value }))} rows={5} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Built X using Y..." data-cursor="text" />
          </div>
          <button type="submit" className="btn-neon" style={{ marginTop: '24px' }} data-cursor="hover">
            {editId ? '✓ UPDATE' : '+ CREATE'}
          </button>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {items.map(item => (
          <div key={item._id} style={{
            background: '#07090F', border: '1px solid rgba(0,245,255,0.08)',
            borderRadius: '10px', padding: '20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
          }}>
            <div>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.9rem', color: '#E8F4FD', marginBottom: '4px' }}>{item.role}</div>
              <div style={{ color: '#00F5FF', fontSize: '0.82rem', marginBottom: '4px' }}>{item.company}</div>
              <div style={{ color: '#3D5A80', fontSize: '0.72rem', fontFamily: "'JetBrains Mono', monospace" }}>{item.duration} · {item.location}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleEdit(item)} data-cursor="hover" style={{ color: '#00F5FF', background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.2)', borderRadius: '4px', padding: '6px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem' }}>EDIT</button>
              <button onClick={() => handleDelete(item._id)} data-cursor="hover" style={{ color: '#FF2D78', background: 'rgba(255,45,120,0.06)', border: '1px solid rgba(255,45,120,0.2)', borderRadius: '4px', padding: '6px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem' }}>DEL</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
