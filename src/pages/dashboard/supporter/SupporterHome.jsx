import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coins, Clock, CheckCircle, Compass, ArrowRight, FileText } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

export const SupporterHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalContributions: 0,
    pendingContributions: 0,
    totalAmountContributed: 0,
  });
  const [approvedContributions, setApprovedContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.getSupporterStats();
        if (res.success) {
          setStats(res.stats);
          setApprovedContributions(res.approvedContributions || []);
        }
      } catch (err) {
        console.error('Failed to load supporter statistics', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      {/* Welcome Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '2rem',
          marginBottom: '2.5rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.15))',
        }}
      >
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Welcome, {user?.name}! 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '0.95rem' }}>
          Here is your backing summary. You have{' '}
          <strong style={{ color: '#fbbf24' }}>{user?.credits || 0} platform credits</strong> available to pledge
          toward world-changing innovations.
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        {/* Total Contributions */}
        <div
          className="card"
          style={{
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '160px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>
              TOTAL CONTRIBUTIONS
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(99, 102, 241, 0.15)',
                color: '#6366f1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={18} />
            </div>
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1 }}>{stats.totalContributions}</h2>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            All campaign pledges submitted
          </p>
        </div>

        {/* Pending Contributions */}
        <div
          className="card"
          style={{
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '160px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>
              PENDING REVIEW
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#fbbf24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Clock size={18} />
            </div>
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1 }}>{stats.pendingContributions}</h2>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Awaiting creator approval
          </p>
        </div>

        {/* Total Amount Contributed */}
        <div
          className="card"
          style={{
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '160px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>
              AMOUNT CONTRIBUTED
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Coins size={18} />
            </div>
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-cyan)', lineHeight: 1.1 }}>
              {stats.totalAmountContributed}{' '}
              <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>Credits</span>
            </h2>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Approved and credited to campaigns
          </p>
        </div>
      </div>

      {/* Approved Contributions Section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Approved Contributions</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Contributions successfully accepted by project creators.
            </p>
          </div>

          <Link to="/dashboard/my-contributions" className="btn btn-secondary btn-sm">
            View All Contributions <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading approved contributions...</p>
        ) : approvedContributions.length === 0 ? (
          <div
            className="glass-panel"
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              color: 'var(--text-secondary)',
            }}
          >
            <Coins size={36} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>No approved contributions yet</h4>
            <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Explore campaigns and pledge your available credits to kickstart your impact!
            </p>
            <Link to="/dashboard/explore" className="btn btn-primary btn-sm">
              <Compass size={16} /> Explore Campaigns
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Campaign Title</th>
                  <th>Contribution Amount</th>
                  <th>Creator Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedContributions.map((c) => (
                  <tr key={c._id}>
                    <td style={{ fontWeight: 600 }}>{c.campaign_title}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                        {c.contribution_amount} Credits
                      </span>
                    </td>
                    <td>{c.creator_name}</td>
                    <td>
                      <span className="badge badge-approved">
                        <CheckCircle size={12} /> {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
