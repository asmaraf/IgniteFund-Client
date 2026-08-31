import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Compass,
  Coins,
  DollarSign,
  ShieldCheck,
  CheckSquare,
  Wallet,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { api } from '../../../services/api';

export const AdminHome = () => {
  const [stats, setStats] = useState({
    totalSupporters: 0,
    totalCreators: 0,
    totalAvailableCredits: 0,
    totalPaymentsProcessed: 0,
    totalCampaigns: 0,
    pendingCampaigns: 0,
    pendingWithdrawals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminMetrics = async () => {
      try {
        const res = await api.getAdminStats();
        if (res.success) {
          setStats(res.stats);
        }
      } catch (err) {
        console.error('Failed to load admin stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminMetrics();
  }, []);

  return (
    <div>
      {/* Top Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '2rem',
          marginBottom: '2.5rem',
          background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(99, 102, 241, 0.15))',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        <div>
          <span className="badge badge-danger" style={{ marginBottom: '0.5rem' }}>
            <ShieldCheck size={13} /> PLATFORM ADMINISTRATOR
          </span>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.4rem' }}>
            Operations & Oversight
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Monitor live platform liquidity, approve creator campaigns, authorize credit payouts, and oversee trust.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/dashboard/campaign-approvals" className="btn btn-primary btn-sm">
            <CheckSquare size={16} /> Campaign Approvals ({stats.pendingCampaigns})
          </Link>
          <Link to="/dashboard/withdrawal-requests" className="btn btn-secondary btn-sm">
            <Wallet size={16} /> Payout Requests ({stats.pendingWithdrawals})
          </Link>
        </div>
      </div>

      {/* 4 Required Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        {/* Total Supporters */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL SUPPORTERS</span>
            <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <Users size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>{stats.totalSupporters}</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Active project backers
          </p>
        </div>

        {/* Total Creators */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL CREATORS</span>
            <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}>
              <Compass size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>{stats.totalCreators}</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Innovators & project launchers
          </p>
        </div>

        {/* Total Available Credits */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL CREDITS IN CIRCULATION</span>
            <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <Coins size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fbbf24' }}>
            {stats.totalAvailableCredits}
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Sum of all users' credits
          </p>
        </div>

        {/* Total Payments Processed */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>PAYMENTS PROCESSED</span>
            <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
              <DollarSign size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
            ${stats.totalPaymentsProcessed} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>USD</span>
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Gross Stripe purchases
          </p>
        </div>
      </div>

      {/* Action Quick Links Grid */}
      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>Administrative Modules</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        <Link to="/dashboard/campaign-approvals" className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)' }}>
              <CheckSquare size={22} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Campaign Approvals</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Review pending campaign submissions. Grant approval to publish to supporters or reject.
          </p>
          <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Open Review Queue <ArrowRight size={14} />
          </span>
        </Link>

        <Link to="/dashboard/withdrawal-requests" className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <Wallet size={22} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Withdrawal Requests</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Verify creator payout requests. Click Payment Success to mark paid and decrement raised credits.
          </p>
          <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Process Payouts <ArrowRight size={14} />
          </span>
        </Link>

        <Link to="/dashboard/manage-users" className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <Users size={22} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Manage Users</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            View all platform members, update roles (Admin, Creator, Supporter), and delete accounts.
          </p>
          <span style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Manage Users Table <ArrowRight size={14} />
          </span>
        </Link>

        <Link to="/dashboard/reports" className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185' }}>
              <AlertTriangle size={22} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Reported Campaigns</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Investigate campaigns flagged by supporters. Suspend or remove fraudulent projects.
          </p>
          <span style={{ fontSize: '0.85rem', color: '#fb7185', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Resolve Reports <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </div>
  );
};
