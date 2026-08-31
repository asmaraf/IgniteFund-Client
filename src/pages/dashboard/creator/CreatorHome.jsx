import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Coins,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  AlertCircle,
  PlusCircle,
  Wallet,
} from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

export const CreatorHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalRaised: 0,
    raisedCredits: 0,
  });
  const [pendingContributions, setPendingContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal view for contribution detail
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const fetchCreatorData = async () => {
    try {
      const [statsRes, pendingRes] = await Promise.all([
        api.getCreatorStats(),
        api.getCreatorContributions(),
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (pendingRes.success) setPendingContributions(pendingRes.data || []);
    } catch (err) {
      console.error('Failed to load creator data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreatorData();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(true);
    setActionMessage('');
    try {
      const res = await api.approveContribution(id);
      if (res.success) {
        setActionMessage('Contribution approved and credited to campaign!');
        setSelectedContribution(null);
        await fetchCreatorData();
      }
    } catch (err) {
      alert(err.message || 'Failed to approve contribution');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject this contribution? The credits will be refunded back to the supporter.')) {
      return;
    }
    setActionLoading(true);
    setActionMessage('');
    try {
      const res = await api.rejectContribution(id);
      if (res.success) {
        setActionMessage('Contribution rejected and credits refunded to supporter.');
        setSelectedContribution(null);
        await fetchCreatorData();
      }
    } catch (err) {
      alert(err.message || 'Failed to reject contribution');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      {/* Top Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '2rem',
          marginBottom: '2.5rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(16, 185, 129, 0.15))',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Creator Studio: {user?.name}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Manage your project launches, review backer pledges, and withdraw raised credits.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/dashboard/add-campaign" className="btn btn-primary" style={{ boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)' }}>
            <PlusCircle size={18} /> Launch New Campaign
          </Link>
          <Link
            to="/dashboard/withdrawals"
            className="btn btn-secondary"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.15)',
            }}
          >
            <Wallet size={18} /> Withdraw Funds
          </Link>
        </div>
      </div>

      {actionMessage && (
        <div
          style={{
            padding: '0.85rem 1rem',
            marginBottom: '1.5rem',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#34d399',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <CheckCircle size={16} /> {actionMessage}
        </div>
      )}

      {/* 3 Metric Cards with equal height and vertical alignment */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        {/* Total Campaigns */}
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
              TOTAL CAMPAIGNS
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
              <FolderKanban size={18} />
            </div>
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1 }}>{stats.totalCampaigns}</h2>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Total projects created by you
          </p>
        </div>

        {/* Active Campaigns */}
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
              ACTIVE CAMPAIGNS
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Clock size={18} />
            </div>
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1 }}>{stats.activeCampaigns}</h2>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Approved & active before deadline
          </p>
        </div>

        {/* Total Amount Raised */}
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
              TOTAL AMOUNT RAISED
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
              <Coins size={18} />
            </div>
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-cyan)', lineHeight: 1.1 }}>
              {stats.totalRaised}{' '}
              <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>Credits</span>
            </h2>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Eligible for withdrawal: <strong style={{ color: '#fbbf24' }}>{stats.raisedCredits} credits</strong> (${(stats.raisedCredits / 20).toFixed(2)})
          </p>
        </div>
      </div>

      {/* Contributions To Review Section */}
      <div>
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Contributions To Review</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Pending backer contributions requiring your verification. Approved pledges add to your campaign funds; rejected pledges are refunded back to supporters.
          </p>
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading pending pledges...</p>
        ) : pendingContributions.length === 0 ? (
          <div
            className="glass-panel"
            style={{
              padding: '3.5rem 2rem',
              textAlign: 'center',
              color: 'var(--text-secondary)',
            }}
          >
            <CheckCircle size={38} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4, color: 'var(--accent-emerald)' }} />
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>All caught up!</h4>
            <p style={{ fontSize: '0.875rem' }}>No pending contributions requiring review right now.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: '1.5rem' }}>Supporter Name</th>
                  <th>Campaign Title</th>
                  <th>Contribution Amount</th>
                  <th style={{ textAlign: 'center' }}>Details</th>
                  <th style={{ textAlign: 'right', paddingRight: '1.5rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingContributions.map((contrib) => (
                  <tr key={contrib._id}>
                    <td style={{ paddingLeft: '1.5rem' }}>
                      <div>
                        <span style={{ fontWeight: 600 }}>{contrib.supporter_name}</span>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {contrib.supporter_email}
                        </span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{contrib.campaign_title}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                        {contrib.contribution_amount} Credits
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {/* View Contribution Button (opens modal) */}
                      <button
                        onClick={() => setSelectedContribution(contrib)}
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>
                    <td style={{ textAlign: 'right', paddingRight: '1.5rem' }}>
                      {/* Actionable Buttons: Approve & Reject */}
                      <div style={{ display: 'inline-flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleApprove(contrib._id)}
                          disabled={actionLoading}
                          className="btn btn-success btn-sm"
                          id={`approve-contrib-${contrib._id}`}
                        >
                          <CheckCircle size={14} /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(contrib._id)}
                          disabled={actionLoading}
                          className="btn btn-danger btn-sm"
                          id={`reject-contrib-${contrib._id}`}
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Contribution Detail Modal */}
      {selectedContribution && (
        <div className="modal-overlay" onClick={() => setSelectedContribution(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              Contribution Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Supporter</span>
                <span style={{ fontWeight: 600 }}>
                  {selectedContribution.supporter_name} ({selectedContribution.supporter_email})
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Campaign</span>
                <span style={{ fontWeight: 600 }}>{selectedContribution.campaign_title}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Pledged Amount</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                  {selectedContribution.contribution_amount} Credits
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Submitted Date</span>
                <span>{new Date(selectedContribution.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setSelectedContribution(null)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleReject(selectedContribution._id)}
                disabled={actionLoading}
                className="btn btn-danger"
              >
                <XCircle size={16} /> Reject & Refund
              </button>
              <button
                type="button"
                onClick={() => handleApprove(selectedContribution._id)}
                disabled={actionLoading}
                className="btn btn-success"
              >
                <CheckCircle size={16} /> Approve Pledge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
