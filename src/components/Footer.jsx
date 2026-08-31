import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Shield, Award } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon, TwitterIcon } from './Icons';

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '3.5rem',
        paddingBottom: '2rem',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Col 1: Brand & Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={18} color="#ffffff" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                }}
              >
                Ignite<span style={{ color: 'var(--primary)' }}>Fund</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              A high-trust crowdfunding platform empowering creative innovators, sustainable environmental ventures,
              and healthcare pioneers with credit-backed contributions.
            </p>
            {/* Linkable Social Media Icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
              >
                <GithubIcon size={17} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
              >
                <LinkedinIcon size={17} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
              >
                <FacebookIcon size={17} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
              >
                <TwitterIcon size={17} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#ffffff' }}>Explore & Engage</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li>
                <Link to="/explore" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  Browse All Campaigns
                </Link>
              </li>
              <li>
                <Link to="/register" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  Start as a Creator
                </Link>
              </li>
              <li>
                <Link to="/register" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  Join as a Supporter (+50 Credits)
                </Link>
              </li>
              <li>
                <a href="#how-it-works" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  How Platform Credits Work
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#ffffff' }}>Campaign Sectors</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li><Link to="/explore?category=Technology">Clean Technology & Solar</Link></li>
              <li><Link to="/explore?category=Environment">Marine & Environmental Action</Link></li>
              <li><Link to="/explore?category=Health">Bionics & Medical Devices</Link></li>
              <li><Link to="/explore?category=Education">Youth Tech & Coding Labs</Link></li>
              <li><Link to="/explore?category=Community">Sustainable Vertical Agriculture</Link></li>
            </ul>
          </div>

          {/* Col 4: Trust & Guarantees */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#ffffff' }}>Platform Trust</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={18} color="var(--accent-emerald)" />
                <span>100% Backer Refund on Campaign Deletions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={18} color="var(--accent-amber)" />
                <span>Admin Verified Campaign Approvals</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Heart size={18} color="var(--accent-rose)" />
                <span>Transparent 20:1 Creator Credit Redemptions</span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <p>© {new Date().getFullYear()} IgniteFund Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
