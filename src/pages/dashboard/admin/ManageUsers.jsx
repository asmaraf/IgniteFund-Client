import React, { useState, useEffect } from 'react';
import { Users, Trash2, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

export const ManageUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await api.getAllUsers();
      if (res.success) {
        setUsers(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    setFeedback('');
    setError('');
    try {
      const res = await api.updateUserRole(userId, newRole);
      if (res.success) {
        setFeedback(`User role updated to ${newRole}`);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      }
    } catch (err) {
      setError(err.message || 'Failed to update user role');
    }
  };

  const handleRemoveUser = async (userId, name) => {
    if (userId === currentUser?.id) {
      alert('You cannot delete your own active Admin account.');
      return;
    }

    if (!window.confirm(`Are you sure you want to permanently delete user "${name}"?`)) {
      return;
    }

    setFeedback('');
    setError('');
    try {
      const res = await api.removeUser(userId);
      if (res.success) {
        setFeedback(`User "${name}" removed from platform.`);
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      }
    } catch (err) {
      setError(err.message || 'Failed to remove user');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>Manage Platform Users</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Manage user permissions, assign roles (Admin, Creator, Supporter), and remove accounts from the database.
        </p>
      </div>

      {feedback && (
        <div
          style={{
            padding: '0.85rem 1rem',
            marginBottom: '1.5rem',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#34d399',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <CheckCircle size={16} /> {feedback}
        </div>
      )}

      {error && (
        <div
          style={{
            padding: '0.85rem 1rem',
            marginBottom: '1.5rem',
            backgroundColor: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#fb7185',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--border-subtle)',
              borderTopColor: 'var(--primary)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Display Name</th>
                <th>User Email</th>
                <th>Role</th>
                <th>Credits</th>
                <th>Update Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td style={{ width: '56px' }}>
                    <img
                      src={u.photo_url}
                      alt={u.name}
                      style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </td>
                  <td style={{ fontWeight: 600 }}>{u.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td>
                    <span
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor:
                          u.role === 'Admin'
                            ? 'rgba(244, 63, 94, 0.15)'
                            : u.role === 'Creator'
                            ? 'rgba(99, 102, 241, 0.15)'
                            : 'rgba(16, 185, 129, 0.15)',
                        color:
                          u.role === 'Admin'
                            ? '#fb7185'
                            : u.role === 'Creator'
                            ? '#a5b4fc'
                            : '#34d399',
                        border: '1px solid currentColor',
                      }}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: '#fbbf24' }}>
                      {u.credits || 0} Credits
                    </span>
                  </td>
                  <td>
                    {/* Update Role Dropdown */}
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="form-select"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.85rem', width: 'auto' }}
                      id={`role-select-${u._id}`}
                    >
                      <option value="Supporter">Supporter</option>
                      <option value="Creator">Creator</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    {/* Remove button */}
                    <button
                      onClick={() => handleRemoveUser(u._id, u.name)}
                      disabled={u._id === currentUser?.id}
                      className="btn btn-danger btn-sm"
                      title="Remove user permanently"
                      id={`remove-user-btn-${u._id}`}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
