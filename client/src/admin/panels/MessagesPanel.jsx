import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function MessagesPanel() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      const res = await api.get('/contact/messages');
      setMessages(res.data.data);
    } catch { toast.error('Failed to load messages'); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetch(); }, []);

  const markRead = async (id) => {
    try {
      await api.patch(`/contact/messages/${id}/read`);
      setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
    } catch {}
  };

  const handleSelect = (msg) => {
    setSelected(msg);
    if (!msg.read) markRead(msg._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete message?')) return;
    try {
      await api.delete(`/contact/messages/${id}`);
      toast.success('Message deleted');
      if (selected?._id === id) setSelected(null);
      fetch();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', alignItems: 'center' }}>
        <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', color: '#00F5FF', fontWeight: 700 }}>
          MESSAGES
          {messages.filter(m => !m.read).length > 0 && (
            <span style={{
              marginLeft: '12px', background: '#FF2D78', color: '#fff',
              borderRadius: '12px', padding: '2px 10px', fontSize: '0.7rem',
              fontFamily: "'JetBrains Mono', monospace"
            }}>
              {messages.filter(m => !m.read).length} UNREAD
            </span>
          )}
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.4fr' : '1fr', gap: '24px' }}>
        {/* Messages list */}
        <div style={{ background: '#07090F', border: '1px solid rgba(0,245,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#3D5A80' }}>Loading...</div>
          ) : messages.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#3D5A80', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}>No messages yet</div>
          ) : (
            messages.map(msg => (
              <div key={msg._id}
                onClick={() => handleSelect(msg)}
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(0,245,255,0.04)',
                  background: selected?._id === msg._id ? 'rgba(0,245,255,0.05)' : msg.read ? 'transparent' : 'rgba(0,245,255,0.02)',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,245,255,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = selected?._id === msg._id ? 'rgba(0,245,255,0.05)' : msg.read ? 'transparent' : 'rgba(0,245,255,0.02)'}
                data-cursor="hover"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      {!msg.read && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00F5FF', display: 'inline-block', flexShrink: 0 }} />}
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.88rem', fontWeight: msg.read ? 400 : 600, color: '#E8F4FD' }}>{msg.name}</span>
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#3D5A80' }}>{msg.subject}</div>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: '#3D5A80', flexShrink: 0, marginLeft: '12px' }}>
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message detail */}
        {selected && (
          <div style={{
            background: '#07090F', border: '1px solid rgba(0,245,255,0.12)',
            borderRadius: '12px', padding: '28px'
          }}>
            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(0,245,255,0.08)' }}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1rem', color: '#E8F4FD', marginBottom: '8px' }}>{selected.subject}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#00F5FF', marginBottom: '4px' }}>{selected.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#3D5A80' }}>
                {selected.email} · {new Date(selected.createdAt).toLocaleString()}
              </div>
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.92rem', lineHeight: 1.8, color: '#8AAEC8', whiteSpace: 'pre-wrap', marginBottom: '24px' }}>
              {selected.message}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="btn-neon" style={{ fontSize: '0.78rem', padding: '10px 20px' }} data-cursor="hover">
                ↩ REPLY
              </a>
              <button onClick={() => handleDelete(selected._id)} data-cursor="hover"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#FF2D78', background: 'rgba(255,45,120,0.06)', border: '1px solid rgba(255,45,120,0.2)', borderRadius: '4px', padding: '10px 20px' }}>
                🗑 DELETE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
