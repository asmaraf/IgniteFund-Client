import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Clock, XCircle, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { api } from '../../../services/api';

export const MyContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 6, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  const fetchContributions = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.getSupporterContributions(page, 6);
      if (res.success) {
        setContributions(res.data || []);
        setPagination(res.pagination || { page: 1, limit: 6, totalPages: 1, total: 0 });
      }
    } catch (err) {
      console.error('Failed to load contributions', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions(1);
  }, []);

  const getStatusBadge = (status) => {
    if (status === 'approved') {
      return (
        <span className="badge badge-approved">
          <CheckCircle size={12} /> Approved
        </span>
      );
    }
    if (status === 'rejected') {
      return (
        <span className="badge badge-rejected">
          <XCircle size={12} /> Rejected (Refunded)
        </span>
      );
    }
    return (
      <span className="badge badge-pending">
        <Clock size={12} /> Pending Review
      </span>
    );
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>My Contributions</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Detailed record of all credit pledges you have submitted across the platform.
        </p>
      </div>

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
      ) : contributions.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          <FileText size={40} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No contributions found</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            You have not pledged any credits yet. Explore campaigns to get started!
          </p>
          <Link to="/dashboard/explore" className="btn btn-primary btn-sm">
            <Compass size={16} /> Explore Campaigns
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive" style={{ marginBottom: '1.5rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Campaign Title</th>
                  <th>Contribution Amount</th>
                  <th>Creator</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((item) => (
                  <tr key={item._id}>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ fontWeight: 600 }}>{item.campaign_title}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                        {item.contribution_amount} Credits
                      </span>
                    </td>
                    <td>
                      <div>
                        <span>{item.creator_name}</span>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {item.creator_email}
                        </span>
                      </div>
                    </td>
                    <td>{getStatusBadge(item.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} total items)
              </span>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => fetchContributions(pagination.page - 1)}
                  className="btn btn-secondary btn-sm"
                  style={{ opacity: pagination.page <= 1 ? 0.4 : 1 }}
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                {[...Array(pagination.totalPages)].map((_, i) => {
                  const pNum = i + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => fetchContributions(pNum)}
                      className={`btn btn-sm ${pagination.page === pNum ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ minWidth: '34px', padding: '0.35rem 0.5rem' }}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => fetchContributions(pagination.page + 1)}
                  className="btn btn-secondary btn-sm"
                  style={{ opacity: pagination.page >= pagination.totalPages ? 0.4 : 1 }}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
