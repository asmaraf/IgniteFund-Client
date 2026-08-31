import React, { useState, useEffect } from 'react';
import { Wallet, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { api } from '../../../services/api';

export const WithdrawalRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const fetchRequests = async () => {
    try {
      const res = await api.getAdminWithdrawals();
      if (res.success) {
        setRequests(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load withdrawal requests', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(true);
    setFeedback('');
    setError('');
    try {
      const res = await api.approveWithdrawal(id);
      if (res.success) {
        setFeedback(res.message || 'Withdrawal approved successfully! Creator raised credits deducted.');
        await fetchRequests();
      }
    } catch (err) {
      setError(err.message || 'Failed to approve withdrawal');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>Creator Withdrawal Requests</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Review pending payout requests. Clicking "Payment Success" approves the request, logs payment completion, and decrements the creator's raised credit balance.
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
      ) : requests.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          <Wallet size={40} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No pending withdrawal requests</h3>
          <p style={{ fontSize: '0.9rem' }}>All creator payouts have been processed.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Creator Name</th>
                <th>Creator Email</th>
                <th>Credits To Redeem</th>
                <th>Amount ($)</th>
                <th>Payment Method</th>
                <th>Recipient Account</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r._id}>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {new Date(r.withdraw_date || r.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ fontWeight: 600 }}>{r.creator_name}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{r.creator_email}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: '#fbbf24' }}>
                      {r.withdrawal_credit} Credits
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>
                      ${r.withdrawal_amount.toFixed(2)} USD
                    </span>
                  </td>
                  <td>{r.payment_system}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{r.account_number}</td>
                  <td>
                    <button
                      onClick={() => handleApprove(r._id)}
                      disabled={actionLoading}
                      className="btn btn-success btn-sm"
                      id={`payout-success-btn-${r._id}`}
                    >
                      <CheckCircle size={14} /> Payment Success
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
