import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const emptyProject = {
  title: '', description: '', techStack: '', category: 'ML',
  githubUrl: '', liveUrl: '', featured: false,
  hasPublication: false, publicationName: '', order: 0
};

const inputStyle = {
  width: '100%', background: 'rgba(8,13,26,0.8)',
  border: '1px solid rgba(0,245,255,0.15)',
  borderRadius: '6px', padding: '10px 14px',
  color: '#E8F4FD', fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.85rem', outline: 'none',
  transition: 'border-color 0.2s ease'
};

const labelStyle = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.72rem', color: '#3D5A80',
  letterSpacing: '0.1em', textTransform: 'uppercase',
  marginBottom: '6px', display: 'block'
};

export default function ProjectsPanel() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data.data);
    } catch { toast.error('Failed to load projects'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));

      if (editingId) {
        await api.put(`/projects/${editingId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Project updated');
      } else {
        await api.post('/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Project created');
      }
      setForm(emptyProject); setEditingId(null); setShowForm(false);
      fetch();
    } catch { toast.error('Operation failed'); }
  };

  const handleEdit = (p) => {
    setForm({ ...p, techStack: p.techStack?.join(', ') || '' });
    setEditingId(p._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      fetch();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', color: '#00F5FF', fontWeight: 700 }}>
          PROJECTS
        </h2>
        <button
          onClick={() => { setForm(emptyProject); setEditingId(null); setShowForm(!showForm); }}
          className="btn-neon"
          style={{ fontSize: '0.78rem', padding: '10px 20px' }}
          data-cursor="hover"
        >
          {showForm ? 'CANCEL' : '+ ADD PROJECT'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{
          background: '#07090F', border: '1px solid rgba(0,245,255,0.12)',
          borderRadius: '12px', padding: '28px', marginBottom: '32px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              { name: 'title', label: 'Title', type: 'text' },
              { name: 'category', label: 'Category', type: 'select', options: ['ML','Computer Vision','Web','Cloud','NLP','Other'] },
              { name: 'githubUrl', label: 'GitHub URL', type: 'url' },
              { name: 'liveUrl', label: 'Live URL', type: 'url' },
              { name: 'order', label: 'Order', type: 'number' },
              { name: 'publicationName', label: 'Publication Name', type: 'text' },
            ].map(f => (
              <div key={f.name}>
                <label style={labelStyle}>{f.label}</label>
                {f.type === 'select' ? (
                  <select
                    name={f.name}
                    value={form[f.name]}
                    onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                    style={inputStyle}
                  >
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={f.type} name={f.name}
                    value={form[f.name] || ''}
                    onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                    style={inputStyle}
                    data-cursor="text"
                  />
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px' }}>
            <label style={labelStyle}>Tech Stack (comma-separated)</label>
            <input
              type="text" value={form.techStack || ''}
              onChange={e => setForm(p => ({ ...p, techStack: e.target.value }))}
              placeholder="Python, FastAPI, Docker..."
              style={inputStyle}
              data-cursor="text"
            />
          </div>

          <div style={{ marginTop: '20px' }}>
            <label style={labelStyle}>Description</label>
            <textarea
              value={form.description || ''}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              rows={4} style={{ ...inputStyle, resize: 'vertical' }}
              data-cursor="text"
            />
          </div>

          <div style={{ display: 'flex', gap: '24px', marginTop: '20px', alignItems: 'center' }}>
            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 0 }}>
              <input type="checkbox" checked={form.featured || false}
                onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} />
              Featured
            </label>
            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 0 }}>
              <input type="checkbox" checked={form.hasPublication || false}
                onChange={e => setForm(p => ({ ...p, hasPublication: e.target.checked }))} />
              Has Publication
            </label>
          </div>

          <button type="submit" className="btn-neon" style={{ marginTop: '24px' }} data-cursor="hover">
            {editingId ? '✓ UPDATE PROJECT' : '+ CREATE PROJECT'}
          </button>
        </form>
      )}

      {/* Projects table */}
      <div style={{
        background: '#07090F', border: '1px solid rgba(0,245,255,0.08)',
        borderRadius: '12px', overflow: 'hidden'
      }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#3D5A80' }}>Loading...</div>
        ) : projects.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#3D5A80' }}>No projects yet</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,245,255,0.08)' }}>
                {['Title', 'Category', 'Featured', 'Pub', 'Actions'].map(h => (
                  <th key={h} style={{
                    padding: '14px 20px', textAlign: 'left',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem', color: '#3D5A80',
                    letterSpacing: '0.1em', textTransform: 'uppercase'
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr key={p._id} style={{
                  borderBottom: '1px solid rgba(0,245,255,0.04)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(0,245,255,0.01)'
                }}>
                  <td style={{ padding: '14px 20px', color: '#E8F4FD', fontSize: '0.85rem' }}>{p.title}</td>
                  <td style={{ padding: '14px 20px', color: '#00F5FF', fontSize: '0.78rem' }}>{p.category}</td>
                  <td style={{ padding: '14px 20px', color: p.featured ? '#00FF88' : '#3D5A80', fontSize: '0.78rem' }}>
                    {p.featured ? '✓' : '—'}
                  </td>
                  <td style={{ padding: '14px 20px', color: p.hasPublication ? '#00FF88' : '#3D5A80', fontSize: '0.78rem' }}>
                    {p.hasPublication ? '✓' : '—'}
                  </td>
                  <td style={{ padding: '14px 20px', display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEdit(p)} data-cursor="hover"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
                        color: '#00F5FF', background: 'rgba(0,245,255,0.06)',
                        border: '1px solid rgba(0,245,255,0.2)', borderRadius: '4px',
                        padding: '6px 12px', transition: 'all 0.2s'
                      }}>
                      EDIT
                    </button>
                    <button onClick={() => handleDelete(p._id)} data-cursor="hover"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
                        color: '#FF2D78', background: 'rgba(255,45,120,0.06)',
                        border: '1px solid rgba(255,45,120,0.2)', borderRadius: '4px',
                        padding: '6px 12px', transition: 'all 0.2s'
                      }}>
                      DEL
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
