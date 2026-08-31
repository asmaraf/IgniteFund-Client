import React, { useState, useEffect } from 'react';
import { History, CheckCircle, Clock, Wallet } from 'lucide-react';
import { api } from '../../../services/api';
import { Breadcrumb } from '../../../components/Breadcrumb';

export const CreatorPaymentHistory = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const res = await api.getCreatorWithdrawals();
        if (res.success) {
          setWithdrawals(res.data || []);
        }
      } catch (err) {
        console.error('Failed to load withdrawals', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWithdrawals();
  }, []);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Creator Studio', path: '/dashboard/creator-home' },
          { label: 'Payout History' },
        ]}
      />

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>Withdrawal Payout History</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Detailed record of all credit conversion payouts requested by you.
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
      ) : withdrawals.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          <Wallet size={40} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No withdrawal requests yet</h3>
          <p style={{ fontSize: '0.9rem' }}>
            When you request funds from your raised credits, payout statuses will be logged here.
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Credits Redeemed</th>
                <th>Withdraw Amount ($)</th>
                <th>Payment Method</th>
                <th>Account ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr key={w._id}>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {new Date(w.withdraw_date || w.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: '#fbbf24' }}>
                      {w.withdrawal_credit} Credits
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>
                    ${w.withdrawal_amount.toFixed(2)} USD
                  </td>
                  <td>{w.payment_system}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{w.account_number}</td>
                  <td>
                    {w.status === 'approved' ? (
                      <span className="badge badge-approved">
                        <CheckCircle size={12} /> Paid Out
                      </span>
                    ) : (
                      <span className="badge badge-pending">
                        <Clock size={12} /> Pending Admin Payout
                      </span>
                    )}
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
