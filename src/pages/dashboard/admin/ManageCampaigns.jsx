import React, { useState, useEffect } from 'react';
import { FolderKanban, Trash2, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { api } from '../../../services/api';
import { Breadcrumb } from '../../../components/Breadcrumb';

export const ManageCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const fetchCampaigns = async () => {
    try {
      const res = await api.getCampaigns('status=approved&status=pending&status=rejected&status=suspended');
      if (res.success) {
        setCampaigns(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load campaigns', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete campaign "${title}" as Admin?`)) {
      return;
    }

    setFeedback('');
    setError('');
    try {
      const res = await api.adminDeleteCampaign(id);
      if (res.success) {
        setFeedback(`Campaign "${title}" deleted from platform database.`);
        setCampaigns((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (err) {
      setError(err.message || 'Failed to delete campaign');
    }
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Admin Operations', path: '/dashboard/admin-home' },
          { label: 'Manage All Campaigns' },
        ]}
      />

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>Manage All Campaigns</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Supervise all campaigns across the platform with ability to permanently remove non-compliant projects.
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
      ) : campaigns.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          <FolderKanban size={40} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No campaigns found</h3>
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
                <th>Goal / Raised</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c._id}>
                  <td style={{ width: '70px' }}>
                    <img
                      src={c.campaign_image_url}
                      alt={c.campaign_title}
                      style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </td>
                  <td style={{ fontWeight: 600, maxWidth: '240px' }}>{c.campaign_title}</td>
                  <td>
                    <div>
                      <span>{c.creator_name}</span>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {c.creator_email}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-category">{c.category}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                      {c.amount_raised || 0}
                    </span>{' '}
                    / {c.funding_goal}
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'capitalize',
                        color:
                          c.status === 'approved'
                            ? '#34d399'
                            : c.status === 'pending'
                            ? '#fbbf24'
                            : '#fb7185',
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(c._id, c.campaign_title)}
                      className="btn btn-danger btn-sm"
                      id={`admin-delete-campaign-${c._id}`}
                    >
                      <Trash2 size={14} /> Delete Campaign
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
