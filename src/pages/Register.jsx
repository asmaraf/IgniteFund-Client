import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Image as ImageIcon,
  Upload,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Coins,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Supporter');
  const [photoUrl, setPhotoUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Password strength helper
  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: '', color: '' };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { level: 1, text: 'Weak', color: '#f43f5e' };
    if (score <= 4) return { level: 2, text: 'Moderate', color: '#f59e0b' };
    return { level: 3, text: 'Strong', color: '#10b981' };
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError('');
    try {
      const res = await api.uploadImage(file);
      if (res.success && res.url) {
        setPhotoUrl(res.url);
      }
    } catch (err) {
      setError(err.message || 'Image upload failed. You can paste an image URL instead.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const res = await register({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        photo_url: photoUrl.trim() || undefined,
      });

      if (res.success) {
        if (role === 'Creator') {
          navigate('/dashboard/creator-home', { replace: true });
        } else {
          navigate('/dashboard/supporter-home', { replace: true });
        }
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const strength = getPasswordStrength();

  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
            }}
          >
            <Sparkles size={24} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Create Your Account</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Choose your role and claim your welcome credits on registration.
          </p>
        </div>

        {/* Welcome Credits Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.85rem 1rem',
            backgroundColor: role === 'Supporter' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(99, 102, 241, 0.15)',
            border: `1px solid ${role === 'Supporter' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`,
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
          }}
        >
          <Coins size={22} color={role === 'Supporter' ? '#34d399' : '#a5b4fc'} />
          <div style={{ fontSize: '0.85rem' }}>
            <strong style={{ color: role === 'Supporter' ? '#34d399' : '#a5b4fc' }}>
              {role === 'Supporter' ? 'Supporter Bonus: 50 Credits' : 'Creator Bonus: 20 Credits'}
            </strong>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
              Credits are credited automatically to your account upon registration.
            </p>
          </div>
        </div>

        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem',
              backgroundColor: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: 'var(--radius-md)',
              color: '#fb7185',
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Role selector dropdown */}
          <div className="form-group">
            <label className="form-label">Select Account Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
              id="register-role-select"
            >
              <option value="Supporter">Supporter (Starts with 50 credits to pledge)</option>
              <option value="Creator">Creator (Starts with 20 credits, launch campaigns)</option>
            </select>
          </div>

          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <User
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Eleanor Vance"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                id="register-name-input"
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                id="register-email-input"
              />
            </div>
          </div>

          {/* Password with Strength Indicator */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              {password && (
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: strength.color }}>
                  Strength: {strength.text}
                </span>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                id="register-password-input"
              />
            </div>
            {/* Visual strength bar */}
            {password && (
              <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    style={{
                      height: '4px',
                      flex: 1,
                      borderRadius: '2px',
                      backgroundColor:
                        strength.level >= step ? strength.color : 'var(--border-subtle)',
                      transition: 'background-color 0.3s ease',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Profile Picture (URL + imgBB Upload) */}
          <div className="form-group">
            <label className="form-label">Profile Picture (Image Upload or URL)</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ position: 'relative', flexGrow: 1 }}>
                <ImageIcon
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                  }}
                />
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://... image URL (optional)"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>

              {/* Direct file upload using imgBB integration */}
              <label
                className="btn btn-secondary btn-sm"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  whiteSpace: 'nowrap',
                }}
              >
                <Upload size={14} />
                {uploadingImage ? 'Uploading...' : 'Upload'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  disabled={uploadingImage}
                />
              </label>
            </div>
            {photoUrl && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#34d399' }}>
                <CheckCircle2 size={14} /> Profile image linked successfully
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.75rem', justifyContent: 'center' }}
            id="register-submit-btn"
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
