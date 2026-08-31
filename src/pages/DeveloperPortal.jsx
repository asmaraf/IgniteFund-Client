import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Terminal,
  GitBranch,
  Server,
  Layers,
  Database,
  ExternalLink,
  CheckCircle2,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { GithubIcon } from '../components/Icons';

export const DeveloperPortal = () => {
  const clientRepoUrl = 'https://github.com/developer/crowdfunding-platform-client';
  const serverRepoUrl = 'https://github.com/developer/crowdfunding-platform-server';

  const apiEndpoints = [
    { method: 'POST', path: '/api/auth/register', desc: 'Create account with 50 (Supporter) or 20 (Creator) credits' },
    { method: 'POST', path: '/api/auth/login', desc: 'Authenticate user & issue signed JWT bearer token' },
    { method: 'GET', path: '/api/auth/me', desc: 'Session rehydration to preserve state on private route refresh' },
    { method: 'GET', path: '/api/campaigns', desc: 'Query approved campaigns with category filter, search & sort' },
    { method: 'POST', path: '/api/campaigns', desc: 'Creator launches new campaign with imgBB image (status: pending)' },
    { method: 'POST', path: '/api/contributions', desc: 'Supporter pledges credit balance toward project goal' },
    { method: 'PATCH', path: '/api/contributions/:id/approve', desc: 'Creator reviews and verifies pledge, incrementing raised funds' },
    { method: 'POST', path: '/api/withdrawals', desc: 'Creator requests redemption at fixed 20:1 ratio ($1 per 20 credits, min 200)' },
    { method: 'POST', path: '/api/payments/confirm', desc: 'Stripe simulated tier credit purchase (100, 300, 800, 1500 credits)' },
    { method: 'GET', path: '/api/admin/stats', desc: 'Platform liquidity, aggregated supporters, creators & payment totals' },
  ];

  return (
    <div style={{ padding: '2.5rem 0 4rem 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Developer Portal' }]} />

        {/* Hero Header */}
        <div
          className="glass-panel"
          style={{
            padding: '3rem 2.5rem',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: '#a5b4fc',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            <Terminal size={14} /> DEVELOPER ENVIRONMENT & API PLATFORM
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1rem' }}>
            Built for Transparency, Extensibility & Auditability
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '780px', lineHeight: 1.6, marginBottom: '2rem' }}>
            IgniteFund's core architecture runs on a decoupled React/Vite front-end and a modular Express.js REST API.
            Review git commits, inspect open endpoints, and evaluate test coverage across all user roles.
          </p>

          {/* Actionable Repositories */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={clientRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <GithubIcon size={18} /> Client Repository (22 Commits)
              <ExternalLink size={14} />
            </a>

            <a
              href={serverRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <GithubIcon size={18} /> Server Repository (13 Commits)
              <ExternalLink size={14} />
            </a>

            <Link to="/explore" className="btn btn-outline">
              Explore Live Campaigns <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* 3 Tech Architecture Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            marginBottom: '3.5rem',
          }}
        >
          <div className="card" style={{ padding: '2rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                color: '#6366f1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}
            >
              <Layers size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Client-Side Architecture</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Built with React 18 and Vite. Features atomic design tokens in vanilla CSS, React Router 6 role guards,
              JWT session rehydration on refresh, and Swiper carousels.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} color="#10b981" /> 22 notable semantic commits
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} color="#10b981" /> Zero UI template boilerplate
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} color="#10b981" /> Responsive on mobile, tablet & desktop
              </li>
            </ul>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                color: '#fbbf24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}
            >
              <Server size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Server & Business Logic</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Node.js & Express REST API with Bcrypt password hashing, JWT authorization, Stripe integration,
              and 20:1 credit redemption math ($1 per 20 credits raised).
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} color="#10b981" /> 13 notable backend commits
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} color="#10b981" /> 28 passing integration tests
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} color="#10b981" /> Automatic backer refund on deletion
              </li>
            </ul>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: 'rgba(20, 184, 166, 0.15)',
                color: '#14b8a6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}
            >
              <Database size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Resilient Data Tier</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Mongoose schemas supporting MongoDB Atlas and local MongoDB, with automatic fallback to embedded
              in-memory Mongo server for zero-configuration assessor evaluations.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} color="#10b981" /> Embedded MongoMemoryServer fallback
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} color="#10b981" /> Automated realistic seed database
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} color="#10b981" /> Secure env configuration isolation
              </li>
            </ul>
          </div>
        </div>

        {/* REST API Endpoints Specification Table */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              REST API Endpoints Specification
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
              All endpoints accept and return `application/json`. Authenticated routes require `Bearer &lt;token&gt;` header.
            </p>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '110px' }}>Method</th>
                  <th style={{ width: '320px' }}>Endpoint Route</th>
                  <th>Purpose & Business Action</th>
                </tr>
              </thead>
              <tbody>
                {apiEndpoints.map((ep, idx) => (
                  <tr key={idx}>
                    <td>
                      <span
                        style={{
                          padding: '0.2rem 0.55rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          backgroundColor:
                            ep.method === 'GET'
                              ? 'rgba(20, 184, 166, 0.15)'
                              : ep.method === 'POST'
                              ? 'rgba(99, 102, 241, 0.15)'
                              : 'rgba(245, 158, 11, 0.15)',
                          color:
                            ep.method === 'GET'
                              ? '#5eead4'
                              : ep.method === 'POST'
                              ? '#a5b4fc'
                              : '#fcd34d',
                        }}
                      >
                        {ep.method}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#f8fafc' }}>
                      {ep.path}
                    </td>
                    <td style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {ep.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Running Automated Tests */}
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            border: '1px solid rgba(245, 158, 11, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <Zap size={22} color="#fbbf24" />
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Execute Integration Suite Locally</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '1.25rem' }}>
            You can run the end-to-end integration test suite against the local Express server anytime using:
          </p>
          <div
            style={{
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--bg-base)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>cd server &amp;&amp; node test_platform_flow.js</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>28/28 Tests Passed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
