import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldAlert, Trash2, Ban, CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '../../../services/api';
import { Breadcrumb } from '../../../components/Breadcrumb';

export const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchReports = async () => {
    try {
      const res = await api.getAllReports();
      if (res.success) {
        setReports(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load reports', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleAction = async (reportId, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this reported campaign?`)) {
      return;
    }

    setActionLoading(true);
    setFeedback('');
    setError('');
    try {
      const res = await api.handleReportAction(reportId, action);
      if (res.success) {
        setFeedback(res.message || `Action ${action} executed successfully`);
        await fetchReports();
      }
    } catch (err) {
      setError(err.message || 'Failed to process report action');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Admin Operations', path: '/dashboard/admin-home' },
          { label: 'Incident Reports' },
        ]}
      />

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>Campaign Incident Reports</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Review campaigns reported by supporters for potential fraud or guideline violations. Suspend or delete flagged projects.
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
      ) : reports.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          <ShieldAlert size={40} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Zero reported campaigns</h3>
          <p style={{ fontSize: '0.9rem' }}>The platform is clean. No campaigns have been flagged by backers.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Reporter</th>
                <th>Campaign Title</th>
                <th>Reason for Report</th>
                <th>Status</th>
                <th>Admin Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r._id}>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div>
                      <span style={{ fontWeight: 600 }}>{r.reporter_name}</span>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {r.reporter_email}
                      </span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{r.campaign_title}</td>
                  <td style={{ maxWidth: '280px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {r.reason}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor:
                          r.status === 'resolved' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: r.status === 'resolved' ? '#34d399' : '#fbbf24',
                      }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleAction(r._id, 'suspend')}
                        disabled={actionLoading || r.status === 'resolved'}
                        className="btn btn-secondary btn-sm"
                        title="Suspend campaign"
                      >
                        <Ban size={14} color="var(--accent-amber)" /> Suspend
                      </button>
                      <button
                        onClick={() => handleAction(r._id, 'delete')}
                        disabled={actionLoading || r.status === 'resolved'}
                        className="btn btn-danger btn-sm"
                        title="Delete campaign"
                      >
                        <Trash2 size={14} /> Delete
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
