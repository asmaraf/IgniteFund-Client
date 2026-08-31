import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Compass,
  Coins,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  Code,
  ShieldCheck,
} from 'lucide-react';
import { GithubIcon } from './Icons';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const clientRepoUrl =
    import.meta.env.VITE_GITHUB_CLIENT_REPO || 'https://github.com/developer/crowdfunding-platform-client';

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getDashboardHome = () => {
    if (!user) return '/dashboard';
    if (user.role === 'Admin') return '/dashboard/admin-home';
    if (user.role === 'Creator') return '/dashboard/creator-home';
    return '/dashboard/supporter-home';
  };

  return (
    <>
      {/* Top Social-Proof & Live Platform Ticker */}
      <div
        style={{
          background: 'rgba(14, 20, 36, 0.95)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0.35rem 0',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
        }}
        className="top-trust-bar"
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <span>
              <strong style={{ color: '#f59e0b' }}>148,500 Credits</strong> ($74,250) Pledged
            </span>
            <span style={{ opacity: 0.35 }}>•</span>
            <span>
              <strong style={{ color: '#14b8a6' }}>42</strong> Verified Projects
            </span>
            <span style={{ opacity: 0.35 }}>•</span>
            <span>
              <strong style={{ color: '#a5b4fc' }}>1,280</strong> Active Backers
            </span>
          </div>
        </div>
      </div>

      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          backgroundColor: 'rgba(9, 13, 22, 0.88)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px',
          }}
        >
        {/* Brand / Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)',
            }}
          >
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(to right, #ffffff, #cbd5e1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ignite<span style={{ color: 'var(--primary)', WebkitTextFillColor: 'var(--primary)' }}>Fund</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.75rem',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
          className="desktop-nav"
        >
          <Link
            to="/explore"
            className="btn btn-secondary btn-sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              borderColor: location.pathname === '/explore' ? 'var(--primary)' : 'var(--border-subtle)',
            }}
          >
            <Compass size={16} color="var(--primary)" />
            Explore Campaigns
          </Link>

          {!user ? (
            /* For Not Logged-in Users */
            <>
              <Link to="/login" className="btn btn-secondary btn-sm" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
                Register
              </Link>
              <a
                href={clientRepoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0, whiteSpace: 'nowrap' }}
                title="View Client Repository on GitHub"
              >
                <GithubIcon size={16} />
                Join as Developer
              </a>
            </>
          ) : (
            /* For Logged-in Users */
            <>
              <Link
                to={getDashboardHome()}
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0, whiteSpace: 'nowrap' }}
              >
                <LayoutDashboard size={16} color="var(--accent-cyan)" />
                Dashboard
              </Link>

              {/* Available Credits Pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.4rem 0.85rem',
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: 'var(--radius-full)',
                  color: '#fbbf24',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
                title="Your platform credits balance"
              >
                <Coins size={16} />
                <span>{user.credits || 0} Credits</span>
              </div>

              {/* User Profile avatar */}
              <img
                src={user.photo_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}
                alt={user.name}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: '2px solid var(--primary)',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="btn btn-danger btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0, whiteSpace: 'nowrap' }}
                title="Logout"
              >
                <LogOut size={15} />
                Logout
              </button>

              <a
                href={clientRepoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0, whiteSpace: 'nowrap' }}
              >
                <GithubIcon size={16} />
                Join as Developer
              </a>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="btn btn-secondary btn-sm mobile-menu-btn"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Link
            to="/explore"
            className="btn btn-secondary"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Compass size={18} /> Explore Campaigns
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="btn btn-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <img
                  src={user.photo_url}
                  alt={user.name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {user.role} • {user.credits} Credits
                  </p>
                </div>
              </div>

              <Link
                to={getDashboardHome()}
                className="btn btn-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-danger">
                <LogOut size={18} /> Logout
              </button>
            </>
          )}

          <a
            href={clientRepoUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            onClick={() => setMobileMenuOpen(false)}
          >
            <GithubIcon size={18} /> Join as Developer
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .top-trust-bar { display: none !important; }
        }
        @media (min-width: 1040px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 1039px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
      </nav>
    </>
  );
};
