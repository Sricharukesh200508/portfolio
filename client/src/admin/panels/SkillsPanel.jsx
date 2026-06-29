import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const empty = { name: '', category: 'AI/ML', proficiency: 80, icon: '⚡', order: 0 };
const CATEGORIES = ['AI/ML','LLMs','Cloud','Web','Databases','Tools','Languages'];

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

export default function SkillsPanel() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetch = async () => {
    const res = await api.get('/skills');
    setSkills(res.data.data);
  };
  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/skills/${editId}`, form); toast.success('Skill updated');
      } else {
        await api.post('/skills', form); toast.success('Skill added');
      }
      setForm(empty); setEditId(null); setShowForm(false); fetch();
    } catch { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`/skills/${id}`); toast.success('Deleted'); fetch(); }
    catch { toast.error('Delete failed'); }
  };

  const grouped = skills.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', color: '#00F5FF', fontWeight: 700 }}>SKILLS</h2>
        <button onClick={() => { setForm(empty); setEditId(null); setShowForm(!showForm); }} className="btn-neon" style={{ fontSize: '0.78rem', padding: '10px 20px' }} data-cursor="hover">
          {showForm ? 'CANCEL' : '+ ADD SKILL'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#07090F', border: '1px solid rgba(0,245,255,0.12)', borderRadius: '12px', padding: '28px', marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Skill Name</label>
              <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required style={inputStyle} data-cursor="text" />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={inputStyle}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Icon (emoji)</label>
              <input type="text" value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} style={inputStyle} data-cursor="text" />
            </div>
            <div>
              <label style={labelStyle}>Proficiency (%)</label>
              <input type="number" min="0" max="100" value={form.proficiency} onChange={e => setForm(p => ({ ...p, proficiency: parseInt(e.target.value) }))} style={inputStyle} data-cursor="text" />
            </div>
            <div>
              <label style={labelStyle}>Order</label>
              <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: parseInt(e.target.value) }))} style={inputStyle} data-cursor="text" />
            </div>
          </div>
          <button type="submit" className="btn-neon" style={{ marginTop: '24px' }} data-cursor="hover">
            {editId ? '✓ UPDATE' : '+ CREATE'}
          </button>
        </form>
      )}

      {Object.entries(grouped).map(([cat, catSkills]) => (
        <div key={cat} style={{ marginBottom: '32px' }}>
          <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.8rem', color: '#7B2FFF', marginBottom: '16px', letterSpacing: '0.1em' }}>
            {cat}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
            {catSkills.map(s => (
              <div key={s._id} style={{
                background: '#07090F', border: '1px solid rgba(0,245,255,0.08)',
                borderRadius: '8px', padding: '14px 18px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <span style={{ marginRight: '8px' }}>{s.icon}</span>
                  <span style={{ color: '#E8F4FD', fontSize: '0.85rem' }}>{s.name}</span>
                  <div style={{ color: '#3D5A80', fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", marginTop: '4px' }}>
                    {s.proficiency}%
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => { setForm({ ...s }); setEditId(s._id); setShowForm(true); }} data-cursor="hover"
                    style={{ color: '#00F5FF', background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.2)', borderRadius: '4px', padding: '4px 10px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem' }}>EDIT</button>
                  <button onClick={() => handleDelete(s._id)} data-cursor="hover"
                    style={{ color: '#FF2D78', background: 'rgba(255,45,120,0.06)', border: '1px solid rgba(255,45,120,0.2)', borderRadius: '4px', padding: '4px 10px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem' }}>DEL</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
