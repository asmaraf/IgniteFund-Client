import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Calendar, TrendingUp, Sparkles, AlertCircle, Clock, RotateCw, Layers } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { api } from '../services/api';

export const ExploreCampaigns = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Technology', 'Environment', 'Health', 'Education', 'Community', 'Art'];

  const fetchCampaigns = async () => {
    setLoading(true);
    setError('');
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('status', 'approved');
      queryParams.append('activeOnly', 'true');
      if (search.trim()) queryParams.append('search', search.trim());
      if (category && category !== 'All') queryParams.append('category', category);
      if (sortBy) queryParams.append('sortBy', sortBy);

      const res = await api.getCampaigns(queryParams.toString());
      if (res.success) {
        setCampaigns(res.data || []);
      } else {
        setError('Failed to fetch campaigns from platform registry.');
      }
    } catch (err) {
      setError(err.message || 'Unable to connect to platform API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [category, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCampaigns();
  };

  const calculateDaysLeft = (deadlineStr) => {
    const diff = new Date(deadlineStr).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days left` : 'Ending today';
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Explore Campaigns' }]} />

        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="badge badge-amber" style={{ marginBottom: '0.65rem' }}>
            <Sparkles size={13} /> AUDITED CAMPAIGNS DIRECTORY
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.6rem' }}>
            Verified Hardware &amp; Social Initiatives
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '720px', fontSize: '1rem', lineHeight: 1.6 }}>
            Browse active campaigns approved by IgniteFund administrators. Back verified initiatives with platform credits
            and receive direct production updates from lead creators.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div
          className="glass-panel"
          style={{
            padding: '1.5rem',
            marginBottom: '3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ position: 'relative', flexGrow: 1, minWidth: '260px' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="text"
                placeholder="Search campaigns by prototype, lead engineer, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.6rem' }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <Search size={16} /> Search Catalog
            </button>
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  fetchCampaigns();
                }}
                className="btn btn-outline"
              >
                Clear Search
              </button>
            )}
          </form>

          {/* Category Tabs & Sorting */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1rem',
            }}
          >
            {/* Category pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
              >
                <option value="newest">Most Recent Launches</option>
                <option value="mostFunded">Highest Credits Raised</option>
                <option value="endingSoon">Deadline Approaching</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
              textAlign: 'center',
              borderColor: 'rgba(244, 63, 94, 0.4)',
              marginBottom: '3rem',
            }}
          >
            <AlertCircle size={38} color="var(--accent-rose)" style={{ margin: '0 auto 0.75rem auto' }} />
            <p style={{ color: '#fb7185', marginBottom: '1.25rem', fontSize: '0.95rem' }}>{error}</p>
            <button onClick={fetchCampaigns} className="btn btn-secondary btn-sm">
              <RotateCw size={14} /> Retry Fetching Catalog
            </button>
          </div>
        )}

        {/* Content Section: Skeletons, Empty State, or Grid */}
        {loading ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((sk) => (
              <div key={sk} className="card skeleton-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                <div className="skeleton" style={{ height: '200px', borderRadius: '8px', marginBottom: '1.25rem' }} />
                <div className="skeleton skeleton-title" />
                <div className="skeleton skeleton-text" style={{ width: '92%' }} />
                <div className="skeleton skeleton-text" style={{ width: '70%', marginBottom: '1.5rem' }} />
                <div className="skeleton" style={{ height: '8px', borderRadius: '4px', marginTop: 'auto', marginBottom: '1rem' }} />
                <div className="skeleton" style={{ height: '38px', borderRadius: '8px' }} />
              </div>
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          <div
            className="glass-panel"
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              color: 'var(--text-secondary)',
            }}
          >
            <Layers size={44} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>No projects match your filter</h3>
            <p style={{ fontSize: '0.925rem', marginBottom: '1.5rem' }}>
              Try adjusting your category selection or clear your search terms to discover more campaigns.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
              }}
              className="btn btn-primary"
            >
              Reset Filters &amp; View All
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {campaigns.map((campaign) => {
              const percent = Math.min(
                100,
                Math.round(((campaign.amount_raised || 0) / campaign.funding_goal) * 100)
              );

              return (
                <div
                  key={campaign._id}
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'var(--bg-card)',
                  }}
                >
                  {/* Campaign Image */}
                  <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                    <img
                      src={campaign.campaign_image_url}
                      alt={campaign.campaign_title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseOver={(e) => (e.target.style.transform = 'scale(1.04)')}
                      onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                    />
                    <span
                      className="badge badge-category"
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backdropFilter: 'blur(8px)',
                        background: 'rgba(9, 13, 22, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {campaign.category}
                    </span>

                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(9, 13, 22, 0.85)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#f59e0b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <Clock size={12} /> {calculateDaysLeft(campaign.deadline)}
                    </span>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        marginBottom: '0.65rem',
                        lineHeight: 1.35,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {campaign.campaign_title}
                    </h3>

                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                        marginBottom: '1.25rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {campaign.campaign_story}
                    </p>

                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <span>Creator:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{campaign.creator_name}</strong>
                    </div>

                    {/* Funding Progress Bar */}
                    <div style={{ marginTop: 'auto' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '0.825rem',
                          marginBottom: '0.45rem',
                        }}
                      >
                        <span style={{ fontWeight: 700, color: 'var(--accent-amber)' }}>
                          {campaign.amount_raised || 0} Credits Raised
                        </span>
                        <span style={{ color: 'var(--text-muted)' }}>
                          {percent}% of {campaign.funding_goal}
                        </span>
                      </div>

                      <div className="progress-bar-bg" style={{ marginBottom: '1.25rem' }}>
                        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
                      </div>

                      <Link
                        to={`/campaigns/${campaign._id}`}
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        View Details &amp; Pledge
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
