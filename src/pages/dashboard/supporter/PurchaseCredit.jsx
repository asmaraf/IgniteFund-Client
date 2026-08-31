import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  Coins,
  CheckCircle,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { Breadcrumb } from '../../../components/Breadcrumb';

export const PurchaseCredit = () => {
  const { user, refreshUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const packages = [
    { credits: 100, price: 10, bonus: 'Popular for Beginners', icon: Coins, highlight: false },
    { credits: 300, price: 25, bonus: 'Save 17% ($25 instead of $30)', icon: Zap, highlight: true },
    { credits: 800, price: 60, bonus: 'Save 25% ($60 instead of $80)', icon: Sparkles, highlight: false },
    { credits: 1500, price: 110, bonus: 'Best Value ($110 instead of $150)', icon: ShieldCheck, highlight: false },
  ];

  const [selectedPkg, setSelectedPkg] = useState(null);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [nameOnCard, setNameOnCard] = useState(user?.name || 'Supporter');
  const [processing, setProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Handle return from official Stripe Checkout Sandbox
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const isSuccess = searchParams.get('success');
    const isCanceled = searchParams.get('canceled');

    if (isCanceled) {
      setErrorMsg('Stripe checkout was cancelled. No charges were made.');
      setSearchParams({});
    }

    if (sessionId && isSuccess === 'true') {
      const verifySession = async () => {
        setProcessing(true);
        try {
          const res = await api.verifyStripeSession(sessionId);
          if (res.success) {
            confetti({
              particleCount: 120,
              spread: 85,
              origin: { y: 0.6 },
            });
            setSuccessMsg(res.message || 'Stripe payment verified successfully! Credits added.');
            await refreshUser();
          }
        } catch (err) {
          setErrorMsg(err.message || 'Failed to verify Stripe payment');
        } finally {
          setProcessing(false);
          setSearchParams({});
        }
      };
      verifySession();
    }
  }, [searchParams, refreshUser, setSearchParams]);

  const handleSelectPackage = (pkg) => {
    setSelectedPkg(pkg);
    setErrorMsg('');
    setSuccessMsg('');
  };

  // Redirect to official Stripe Sandbox Hosted Checkout URL
  const handleStripeSandboxRedirect = async () => {
    if (!selectedPkg) return;
    setProcessing(true);
    setErrorMsg('');
    try {
      const res = await api.createStripeCheckoutSession(selectedPkg.credits);
      if (res.success && res.url) {
        window.location.href = res.url;
      } else {
        throw new Error(res.message || 'Failed to create Stripe checkout session');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Stripe redirect failed. You can use the instant payment form below.');
      setProcessing(false);
    }
  };

  // In-page Instant Payment Simulation
  const handleProcessPayment = async (e) => {
    e.preventDefault();
    if (!selectedPkg) return;

    setProcessing(true);
    setErrorMsg('');

    try {
      const res = await api.confirmCreditPurchase({
        credits: selectedPkg.credits,
        paymentMethod: 'Card (Stripe Test)',
        transactionId: `ch_stripe_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      });

      if (res.success) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
        setSuccessMsg(`Payment of $${selectedPkg.price} successful! ${selectedPkg.credits} credits added.`);
        await refreshUser();
        setTimeout(() => {
          setSelectedPkg(null);
          setSuccessMsg('');
        }, 2500);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Payment processing failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Supporter Studio', path: '/dashboard/supporter-home' },
          { label: 'Purchase Credits' },
        ]}
      />

      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge badge-category" style={{ marginBottom: '0.65rem' }}>
          <Coins size={13} /> INSTANT REPLENISHMENT
        </span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Purchase Platform Credits</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px' }}>
          Supporters purchase credits to pledge toward verified campaigns. Backing projects earns you exclusive backer
          rewards and helps bring ideas to life.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.75rem',
          marginBottom: '3rem',
        }}
      >
        {packages.map((pkg) => (
          <div
            key={pkg.credits}
            className="card"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              borderColor: pkg.highlight ? 'var(--primary)' : 'var(--border-subtle)',
              boxShadow: pkg.highlight ? '0 0 25px rgba(99, 102, 241, 0.25)' : 'none',
            }}
          >
            {pkg.highlight && (
              <span
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                MOST POPULAR
              </span>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <pkg.icon size={22} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{pkg.credits} Credits</h3>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ${pkg.price}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '0.35rem' }}>
                USD
              </span>
            </div>

            <p
              style={{
                color: 'var(--accent-emerald)',
                fontSize: '0.825rem',
                fontWeight: 600,
                marginBottom: '1.75rem',
                minHeight: '2.5rem',
              }}
            >
              {pkg.bonus}
            </p>

            <button
              onClick={() => handleSelectPackage(pkg)}
              className={`btn ${pkg.highlight ? 'btn-primary' : 'btn-secondary'}`}
              style={{ width: '100%', marginTop: 'auto', justifyContent: 'center' }}
            >
              <CreditCard size={16} /> Select Package
            </button>
          </div>
        ))}
      </div>

      {/* Stripe Payment Modal */}
      {selectedPkg && (
        <div className="modal-overlay" onClick={() => setSelectedPkg(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Checkout with Stripe</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Purchasing {selectedPkg.credits} Credits for ${selectedPkg.price}.00 USD
                </p>
              </div>
              <div
                style={{
                  padding: '0.4rem 0.8rem',
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  borderRadius: 'var(--radius-md)',
                  color: '#a5b4fc',
                  fontWeight: 700,
                }}
              >
                ${selectedPkg.price}
              </div>
            </div>

            {errorMsg && (
              <div
                style={{
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  backgroundColor: 'rgba(244, 63, 94, 0.15)',
                  color: '#fb7185',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                }}
              >
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div
                style={{
                  padding: '0.85rem',
                  marginBottom: '1rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#34d399',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <CheckCircle size={18} /> {successMsg}
              </div>
            )}

            {/* Official Stripe Hosted Sandbox Checkout */}
            <div style={{ marginBottom: '1.5rem' }}>
              <button
                type="button"
                onClick={handleStripeSandboxRedirect}
                disabled={processing}
                className="btn btn-amber btn-lg"
                style={{ width: '100%', justifyContent: 'center', gap: '0.65rem' }}
                id="stripe-hosted-checkout-btn"
              >
                <ExternalLink size={18} />
                {processing ? 'Connecting to Stripe...' : `Redirect to Official Stripe Checkout ($${selectedPkg.price}.00)`}
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.45rem' }}>
                Opens secure Stripe Sandbox checkout with official card verification
              </p>
            </div>

            <div style={{ margin: '1.25rem 0', position: 'relative', textAlign: 'center' }}>
              <div style={{ borderBottom: '1px solid var(--border-subtle)' }} />
              <span
                style={{
                  position: 'relative',
                  top: '-0.75rem',
                  background: 'var(--bg-card)',
                  padding: '0 0.75rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                OR TEST WITH IN-PAGE CARD FORM
              </span>
            </div>

            <form onSubmit={handleProcessPayment}>
              <div className="form-group">
                <label className="form-label">Name on Card</label>
                <input
                  type="text"
                  required
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Card Number</label>
                <div style={{ position: 'relative' }}>
                  <CreditCard
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)',
                    }}
                  />
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">CVC / CVV</label>
                  <input
                    type="text"
                    required
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '1.5rem' }}>
                <Lock size={14} color="var(--accent-emerald)" />
                <span>256-bit SSL encrypted mock Stripe transaction</span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setSelectedPkg(null)}
                  className="btn btn-secondary"
                  disabled={processing}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="btn btn-primary"
                  id="stripe-pay-btn"
                >
                  {processing ? 'Processing Payment...' : `Pay $${selectedPkg.price}.00 via Stripe`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
