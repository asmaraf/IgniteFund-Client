import React, { useState, useEffect } from 'react';
import { History, CheckCircle, CreditCard } from 'lucide-react';
import { api } from '../../../services/api';

export const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.getPaymentHistory();
        if (res.success) {
          setPayments(res.data || []);
        }
      } catch (err) {
        console.error('Failed to load payment history', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Payment History</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Detailed record of all credit package purchases made with your payment method.
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
      ) : payments.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          <CreditCard size={40} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No payments recorded yet</h3>
          <p style={{ fontSize: '0.9rem' }}>
            When you purchase platform credits, your receipts will be tracked here.
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction ID</th>
                <th>Credits Purchased</th>
                <th>Amount Paid ($)</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{p.stripe_payment_id}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                      +{p.credits_purchased} Credits
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>${p.price_paid}.00 USD</td>
                  <td>{p.payment_method}</td>
                  <td>
                    <span className="badge badge-approved">
                      <CheckCircle size={12} /> {p.status}
                    </span>
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
