import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLogin from '../admin/AdminLogin';
import AdminDashboard from '../admin/AdminDashboard';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#020510', fontFamily: "'JetBrains Mono', monospace",
      color: '#00F5FF', fontSize: '0.9rem'
    }}>
      VERIFYING ACCESS...
    </div>
  );
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

export default function Admin() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="dashboard" element={
        <ProtectedRoute><AdminDashboard /></ProtectedRoute>
      } />
      <Route path="" element={<Navigate to="/admin/login" replace />} />
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
