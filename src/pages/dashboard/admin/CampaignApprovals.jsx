import React, { useState, useEffect } from 'react';
import { CheckSquare, CheckCircle, XCircle, Calendar, AlertCircle } from 'lucide-react';
import { api } from '../../../services/api';

export const CampaignApprovals = () => {
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const fetchPending = async () => {
    try {
      const res = await api.getPendingCampaigns();
      if (res.success) {
        setPendingCampaigns(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load pending campaigns', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    setActionLoading(true);
    setFeedback('');
    setError('');
    try {
      const res = await api.updateCampaignStatus(id, status);
      if (res.success) {
        setFeedback(res.message || `Campaign status updated to ${status}`);
        await fetchPending();
      }
    } catch (err) {
      setError(err.message || 'Failed to update campaign status');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>Campaign Approvals</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Review newly submitted campaigns from creators. Approved campaigns immediately become discoverable to supporters.
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
      ) : pendingCampaigns.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          <CheckSquare size={40} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No pending campaign submissions</h3>
          <p style={{ fontSize: '0.9rem' }}>
            All submitted campaigns have been reviewed. Check back when creators publish new projects!
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Campaign Title</th>
                <th>Creator</th>
                <th>Category</th>
                <th>Goal</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingCampaigns.map((camp) => (
                <tr key={camp._id}>
                  <td style={{ width: '70px' }}>
                    <img
                      src={camp.campaign_image_url}
                      alt={camp.campaign_title}
                      style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </td>
                  <td style={{ fontWeight: 600, maxWidth: '240px' }}>
                    <div>
                      <span>{camp.campaign_title}</span>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.3,
                          marginTop: '0.2rem',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {camp.campaign_story}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span style={{ fontWeight: 600 }}>{camp.creator_name}</span>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {camp.creator_email}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-category">{camp.category}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                      {camp.funding_goal} Credits
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={13} color="var(--primary)" />
                      {new Date(camp.deadline).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleUpdateStatus(camp._id, 'approved')}
                        disabled={actionLoading}
                        className="btn btn-success btn-sm"
                        id={`approve-campaign-${camp._id}`}
                      >
                        <CheckCircle size={14} /> Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(camp._id, 'rejected')}
                        disabled={actionLoading}
                        className="btn btn-danger btn-sm"
                        id={`reject-campaign-${camp._id}`}
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
  );
};
