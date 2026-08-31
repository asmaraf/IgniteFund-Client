import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        color: 'var(--text-secondary)'
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          border: '3px solid var(--border-subtle)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>Authenticating session...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to the user's role-appropriate home
    if (user.role === 'Admin') return <Navigate to="/dashboard/admin-home" replace />;
    if (user.role === 'Creator') return <Navigate to="/dashboard/creator-home" replace />;
    return <Navigate to="/dashboard/supporter-home" replace />;
  }

  return children;
};
