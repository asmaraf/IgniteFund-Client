import React, { useState, useEffect } from 'react';
import {
  Wallet,
  Coins,
  DollarSign,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  CreditCard,
} from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

export const Withdrawals = () => {
  const { user, refreshUser } = useAuth();

  const raisedCredits = user?.raised_credits || 0;
  // 20 credits = 1 dollar
  const totalRaisedDollars = (raisedCredits / 20).toFixed(2);

  const [creditsToWithdraw, setCreditsToWithdraw] = useState(
    raisedCredits >= 200 ? '200' : ''
  );
  const [paymentSystem, setPaymentSystem] = useState('Stripe');
  const [accountNumber, setAccountNumber] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Automatically calculate dollar equivalent: 20 credits = $1
  const withdrawAmountDollar = creditsToWithdraw
    ? (Number(creditsToWithdraw) / 20).toFixed(2)
    : '0.00';

  const hasEnoughCredit = raisedCredits >= 200;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const credits = Number(creditsToWithdraw);
    if (!credits || credits < 200) {
      setError('Minimum withdrawal requirement is 200 credits ($10.00).');
      return;
    }

    if (credits > raisedCredits) {
      setError(`Cannot withdraw ${credits} credits. You currently have ${raisedCredits} raised credits.`);
      return;
    }

    if (!accountNumber.trim()) {
      setError('Please provide your account number or recipient identifier.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.requestWithdrawal({
        withdrawal_credit: credits,
        payment_system: paymentSystem,
        account_number: accountNumber.trim(),
      });

      if (res.success) {
        setSuccess(res.message || 'Withdrawal request submitted! An Admin will review and process the payout.');
        setAccountNumber('');
        await refreshUser();
      }
    } catch (err) {
      setError(err.message || 'Failed to submit withdrawal');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>Creator Withdrawals</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Convert your verified campaign earnings into currency. Creators withdraw at the rate of 20 Credits = $1.00 USD.
        </p>
      </div>

      {/* Creator Total Earnings Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '2rem',
          marginBottom: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          background: 'linear-gradient(135deg, rgba(22, 32, 50, 0.9), rgba(15, 23, 42, 0.9))',
        }}
      >
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            CURRENT RAISED CREDITS
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
            <Coins size={28} color="#fbbf24" />
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fbbf24' }}>
              {raisedCredits}
            </span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Accumulated from approved pledges</span>
        </div>

        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            TOTAL WITHDRAWAL VALUE ($)
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
            <DollarSign size={28} color="var(--accent-emerald)" />
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
              ${totalRaisedDollars}
            </span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>20 Credits = $1.00 USD Conversion</span>
        </div>
      </div>

      {/* Business Logic Note Box */}
      <div
        style={{
          padding: '1rem 1.25rem',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem',
          display: 'flex',
          gap: '0.75rem',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
        }}
      >
        <HelpCircle size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ color: 'var(--text-primary)' }}>Platform Withdrawal Rules:</strong>
          <p style={{ marginTop: '0.25rem' }}>
            Supporters purchase 10 credits for $1, while creators withdraw $1 for every 20 credits raised. Minimum withdrawal threshold is <strong>200 credits ($10.00 USD)</strong>.
          </p>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: '0.85rem',
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
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div
          style={{
            padding: '0.85rem',
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
          <CheckCircle size={18} />
          <span>{success}</span>
        </div>
      )}

      {/* Withdrawal Form */}
      <form onSubmit={handleSubmit} className="card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Submit Payout Request</h3>

        {/* Credits To Withdraw */}
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="form-label">Credits To Withdraw (Min 200)</label>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Max: {raisedCredits} Credits
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <Coins
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fbbf24',
              }}
            />
            <input
              type="number"
              min="200"
              max={raisedCredits}
              required
              value={creditsToWithdraw}
              onChange={(e) => setCreditsToWithdraw(e.target.value)}
              placeholder="e.g., 200"
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
              id="withdraw-credits-input"
            />
          </div>
        </div>

        {/* Withdraw Amount ($) - Not editable */}
        <div className="form-group">
          <label className="form-label">Withdraw Amount ($) — Automatically Computed (20 Credits = $1)</label>
          <div style={{ position: 'relative' }}>
            <DollarSign
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--accent-emerald)',
              }}
            />
            <input
              type="text"
              readOnly
              value={`$${withdrawAmountDollar} USD`}
              className="form-input"
              style={{
                paddingLeft: '2.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                color: 'var(--accent-emerald)',
                fontWeight: 700,
                cursor: 'not-allowed',
              }}
              id="withdraw-dollar-display"
            />
          </div>
        </div>

        {/* Payment System Dropdown */}
        <div className="form-group">
          <label className="form-label">Select Payment System</label>
          <select
            value={paymentSystem}
            onChange={(e) => setPaymentSystem(e.target.value)}
            className="form-select"
            id="withdraw-system-select"
          >
            <option value="Stripe">Stripe (Direct Bank / Card Transfer)</option>
            <option value="Bkash">bKash</option>
            <option value="Rocket">Rocket</option>
            <option value="Nagad">Nagad</option>
            <option value="Bank Transfer">International Wire Transfer</option>
          </select>
        </div>

        {/* Account Number */}
        <div className="form-group">
          <label className="form-label">Account Number / Phone / Routing ID</label>
          <input
            type="text"
            required
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="e.g., +1 (555) 019-2834 or acct_stripe_294819"
            className="form-input"
            id="withdraw-account-input"
          />
        </div>

        {/* Conditional Withdraw Button vs Insufficient Credit warning */}
        <div style={{ marginTop: '1.75rem' }}>
          {hasEnoughCredit ? (
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center' }}
              id="withdraw-submit-btn"
            >
              <Wallet size={18} />
              {submitting ? 'Submitting Request...' : `Withdraw $${withdrawAmountDollar} USD`}
            </button>
          ) : (
            <div
              style={{
                padding: '1rem',
                textAlign: 'center',
                backgroundColor: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: '#fb7185',
                fontWeight: 700,
                fontSize: '1rem',
              }}
              id="insufficient-credit-warning"
            >
              Insufficient credit (Minimum 200 credits required to withdraw)
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
