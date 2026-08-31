import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Coins,
  Shield,
  Gift,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Share2,
  Clock,
  Heart,
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Contribution Form State
  const [contributionAmount, setContributionAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [pledgeSuccess, setPledgeSuccess] = useState('');
  const [pledgeError, setPledgeError] = useState('');

  // Report Modal State
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reporting, setReporting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState('');

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await api.getCampaignById(id);
        if (res.success) {
          setCampaign(res.data);
          setContributionAmount(res.data.minimum_contribution || 25);
        }
      } catch (err) {
        setError(err.message || 'Campaign not found');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [id]);

  const handlePledgeSubmit = async (e) => {
    e.preventDefault();
    setPledgeError('');
    setPledgeSuccess('');

    if (!user) {
      navigate('/login', { state: { from: { pathname: `/campaigns/${id}` } } });
      return;
    }

    if (user.role !== 'Supporter') {
      setPledgeError('Only users registered with the Supporter role can pledge credits.');
      return;
    }

    const amount = Number(contributionAmount);
    if (!amount || amount < (campaign.minimum_contribution || 1)) {
      setPledgeError(`Minimum pledge for this campaign is ${campaign.minimum_contribution} credits.`);
      return;
    }

    if ((user.credits || 0) < amount) {
      setPledgeError(
        `Insufficient credits. You have ${user.credits} credits. Please visit the Purchase Credits page to top up.`
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.createContribution({
        campaign_id: campaign._id,
        contribution_amount: amount,
      });

      if (res.success) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        setPledgeSuccess('Your contribution has been pledged and is awaiting Creator approval!');
        await refreshUser();
      }
    } catch (err) {
      setPledgeError(err.message || 'Failed to submit pledge');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportReason.trim()) return;

    setReporting(true);
    try {
      const res = await api.submitReport({
        campaign_id: campaign._id,
        reason: reportReason.trim(),
      });
      if (res.success) {
        setReportSuccess('Thank you. The report has been flagged for Admin review.');
        setTimeout(() => {
          setShowReportModal(false);
          setReportSuccess('');
          setReportReason('');
        }, 2000);
      }
    } catch (err) {
      alert(err.message || 'Failed to submit report');
    } finally {
      setReporting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            border: '3px solid var(--border-subtle)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Campaign Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 2rem 0' }}>
          {error || 'The requested campaign does not exist or has been removed.'}
        </p>
        <Link to="/explore" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Campaigns
        </Link>
      </div>
    );
  }

  const percent = Math.min(100, Math.round(((campaign.amount_raised || 0) / campaign.funding_goal) * 100));
  const deadlinePassed = new Date(campaign.deadline) < new Date();

  return (
    <div style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        {/* Back navigation & Report action */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <Link
            to="/explore"
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ArrowLeft size={16} /> All Campaigns
          </Link>

          <button
            onClick={() => setShowReportModal(true)}
            className="btn btn-secondary btn-sm"
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <AlertTriangle size={14} color="var(--accent-rose)" /> Report Campaign
          </button>
        </div>

        {/* Hero Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Cover Media */}
          <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', height: '420px', border: '1px solid var(--border-subtle)' }}>
            <img
              src={campaign.campaign_image_url}
              alt={campaign.campaign_title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Quick Metrics & Pledging Box */}
          <div className="glass-panel" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span className="badge badge-category">{campaign.category}</span>
              <span className="badge badge-approved">Admin Verified</span>
            </div>

            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.25 }}>
              {campaign.campaign_title}
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '1.5rem' }}>
              Launched by <strong style={{ color: 'var(--text-primary)' }}>{campaign.creator_name}</strong> ({campaign.creator_email})
            </p>

            {/* Progress Bar & Goals */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                  {campaign.amount_raised || 0} Credits
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Target: {campaign.funding_goal} Credits ({percent}%)
                </span>
              </div>
              <div className="progress-bar-bg" style={{ height: '10px' }}>
                <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
              </div>
            </div>

            {/* Metadata Pills */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                padding: '1.25rem',
                backgroundColor: 'var(--bg-input)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.75rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Deadline</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <Calendar size={15} color="var(--primary)" />
                  {new Date(campaign.deadline).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Min Pledge</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <Coins size={15} color="var(--accent-amber)" />
                  {campaign.minimum_contribution} Credits
                </span>
              </div>
            </div>

            {/* Contribution Pledge Form */}
            {deadlinePassed ? (
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(244, 63, 94, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  color: '#fb7185',
                  textAlign: 'center',
                  fontSize: '0.9rem',
                }}
              >
                Funding for this campaign has concluded on {new Date(campaign.deadline).toLocaleDateString()}.
              </div>
            ) : (
              <form onSubmit={handlePledgeSubmit} style={{ marginTop: 'auto' }}>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="form-label">Pledge Platform Credits</label>
                    {user && (
                      <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 600 }}>
                        Your Balance: {user.credits || 0} Credits
                      </span>
                    )}
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
                      name="Contribution_amount"
                      min={campaign.minimum_contribution || 1}
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      placeholder={`Min ${campaign.minimum_contribution} credits`}
                      className="form-input"
                      style={{ paddingLeft: '2.5rem' }}
                      required
                    />
                  </div>
                </div>

                {pledgeError && (
                  <div
                    style={{
                      padding: '0.75rem',
                      marginBottom: '1rem',
                      backgroundColor: 'rgba(244, 63, 94, 0.15)',
                      borderRadius: 'var(--radius-md)',
                      color: '#fb7185',
                      fontSize: '0.85rem',
                    }}
                  >
                    {pledgeError}
                  </div>
                )}

                {pledgeSuccess && (
                  <div
                    style={{
                      padding: '0.75rem',
                      marginBottom: '1rem',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      borderRadius: 'var(--radius-md)',
                      color: '#34d399',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <CheckCircle size={16} /> {pledgeSuccess}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center' }}
                  id="pledge-submit-btn"
                >
                  <Coins size={18} />
                  {submitting ? 'Submitting Pledge...' : `Pledge ${contributionAmount || 0} Credits Now`}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Detailed Story & Rewards Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {/* Campaign Story */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.25rem' }}>About This Campaign</h2>
            <div
              style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                fontSize: '1rem',
                whiteSpace: 'pre-line',
              }}
            >
              {campaign.campaign_story}
            </div>
          </div>

          {/* Reward & Supporter Perks */}
          <div className="card" style={{ padding: '2.5rem', height: 'fit-content' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: '#fbbf24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Gift size={22} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Backer Rewards</h3>
            </div>

            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--bg-input)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.5rem',
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Reward Details
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {campaign.reward_info}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <Shield size={18} color="var(--accent-emerald)" />
              <span>Full platform credit refund guaranteed if creator cancels campaign.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Campaign Modal */}
      {showReportModal && (
        <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Report Campaign as Suspicious
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              If you suspect fraud, trademark infringement, or deceptive claims in this campaign, please detail your reason for Admin investigation.
            </p>

            <form onSubmit={handleReportSubmit}>
              <div className="form-group">
                <label className="form-label">Reason for Report</label>
                <textarea
                  required
                  rows={4}
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="Explain why this campaign should be investigated or suspended..."
                  className="form-textarea"
                />
              </div>

              {reportSuccess && (
                <div
                  style={{
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    borderRadius: 'var(--radius-md)',
                    color: '#34d399',
                    fontSize: '0.85rem',
                  }}
                >
                  {reportSuccess}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" disabled={reporting} className="btn btn-danger">
                  {reporting ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
