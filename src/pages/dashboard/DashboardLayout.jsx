import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Coins,
  Home,
  Compass,
  FileText,
  CreditCard,
  History,
  PlusCircle,
  FolderKanban,
  Wallet,
  Users,
  ShieldCheck,
  CheckSquare,
  AlertTriangle,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NotificationPopup } from '../../components/NotificationPopup';
import { Footer } from '../../components/Footer';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Role-based Nav Items
  const supporterLinks = [
    { label: 'Home', path: '/dashboard/supporter-home', icon: Home },
    { label: 'Explore Campaigns', path: '/dashboard/explore', icon: Compass },
    { label: 'My Contributions', path: '/dashboard/my-contributions', icon: FileText },
    { label: 'Purchase Credit', path: '/dashboard/purchase-credit', icon: CreditCard },
    { label: 'Payment History', path: '/dashboard/payment-history', icon: History },
  ];

  const creatorLinks = [
    { label: 'Home', path: '/dashboard/creator-home', icon: Home },
    { label: 'Add New Campaign', path: '/dashboard/add-campaign', icon: PlusCircle },
    { label: 'My Campaigns', path: '/dashboard/my-campaigns', icon: FolderKanban },
    { label: 'Withdrawals', path: '/dashboard/withdrawals', icon: Wallet },
    { label: 'Payment History', path: '/dashboard/creator-payments', icon: History },
  ];

  const adminLinks = [
    { label: 'Home', path: '/dashboard/admin-home', icon: Home },
    { label: 'Campaign Approvals', path: '/dashboard/campaign-approvals', icon: CheckSquare },
    { label: 'Withdrawal Requests', path: '/dashboard/withdrawal-requests', icon: Wallet },
    { label: 'Manage Users', path: '/dashboard/manage-users', icon: Users },
    { label: 'Manage Campaigns', path: '/dashboard/manage-campaigns', icon: FolderKanban },
    { label: 'Reports', path: '/dashboard/reports', icon: AlertTriangle },
  ];

  const navLinks =
    user?.role === 'Admin' ? adminLinks : user?.role === 'Creator' ? creatorLinks : supporterLinks;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Top Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 800,
          height: '70px',
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
        }}
      >
        {/* Left: Mobile Toggle + Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn btn-secondary btn-sm mobile-sidebar-toggle"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '9px',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={20} color="#ffffff" />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              Ignite<span style={{ color: 'var(--primary)' }}>Fund</span>
            </span>
          </Link>
        </div>

        {/* Right: Available Credits | User Image | User Role / Name | Notification */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Available Credits Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.85rem',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: 'var(--radius-full)',
              color: '#fbbf24',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
            title="Available credits"
          >
            <Coins size={16} />
            <span>{user?.credits || 0} Credits</span>
          </div>

          {/* User Image & Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="user-profile-block">
            <img
              src={user?.photo_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}
              alt={user?.name}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '2px solid var(--primary)',
                objectFit: 'cover',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {user?.name}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: user?.role === 'Admin' ? '#f43f5e' : user?.role === 'Creator' ? '#6366f1' : '#10b981',
                }}
              >
                {user?.role}
              </span>
            </div>
          </div>

          {/* Floating Notification Pop-up */}
          <NotificationPopup />

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            title="Sign out"
          >
            <LogOut size={16} color="var(--accent-rose)" />
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout Area (Sidebar + Content) */}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {/* Navigation Sidebar */}
        <aside
          className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}
          style={{
            width: '260px',
            backgroundColor: 'var(--bg-surface)',
            borderRight: '1px solid var(--border-subtle)',
            padding: '1.75rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
          }}
        >
          {/* User card in sidebar */}
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <img
              src={user?.photo_url}
              alt={user?.name}
              style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.name}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {user?.role} Dashboard
              </p>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 0.5rem 0.5rem 0.5rem' }}>
            Navigation
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `dashboard-nav-item ${isActive ? 'active' : ''}`
                }
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                  transition: 'all var(--transition-fast)',
                })}
              >
                <item.icon size={18} color="currentColor" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Return Home Link */}
          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                padding: '0.5rem',
              }}
            >
              <Sparkles size={16} /> Return to Public Site
            </Link>
          </div>
        </aside>

        {/* Sections Based on Routes */}
        <main style={{ flexGrow: 1, padding: '2.5rem 2rem', overflowX: 'hidden' }}>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />

      <style>{`
        .dashboard-nav-item:hover {
          background-color: var(--bg-card-hover) !important;
          color: var(--text-primary) !important;
        }
        @media (max-width: 860px) {
          .dashboard-sidebar {
            position: fixed;
            top: 70px;
            bottom: 0;
            left: -280px;
            z-index: 799;
            transition: left 0.3s ease;
          }
          .dashboard-sidebar.open {
            left: 0;
          }
          .mobile-sidebar-toggle {
            display: flex !important;
          }
          .user-profile-block {
            display: none !important;
          }
          .logout-text {
            display: none;
          }
        }
        @media (min-width: 861px) {
          .mobile-sidebar-toggle {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
