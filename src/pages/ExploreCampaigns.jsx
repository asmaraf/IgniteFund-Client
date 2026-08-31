import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Calendar, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
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
      }
    } catch (err) {
      setError(err.message || 'Failed to load campaigns');
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
    <div style={{ padding: '3.5rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="badge badge-category" style={{ marginBottom: '0.65rem' }}>
            <Sparkles size={13} /> CURATED INNOVATIONS
          </span>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 800, marginBottom: '0.75rem' }}>Explore Campaigns</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px' }}>
            Browse active, admin-verified campaigns looking for supporter contributions. Back projects and receive creator rewards.
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
            <div style={{ position: 'relative', flexGrow: 1, minWidth: '240px' }}>
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
                placeholder="Search campaigns by title, keywords, or creator..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.6rem' }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <Search size={16} /> Search
            </button>
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
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', width: 'auto' }}
              >
                <option value="newest">Newest First</option>
                <option value="deadline">Ending Soonest</option>
                <option value="most-funded">Most Funded</option>
                <option value="goal">Highest Goal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Campaign Cards Grid */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
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
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--accent-rose)' }}>
            <AlertCircle size={36} style={{ margin: '0 auto 1rem auto' }} />
            <p>{error}</p>
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
            <Filter size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>No campaigns match your filter</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Try broadening your search term or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
                setSortBy('newest');
              }}
              className="btn btn-secondary"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {campaigns.map((camp) => {
              const percent = Math.min(100, Math.round(((camp.amount_raised || 0) / camp.funding_goal) * 100));
              return (
                <div key={camp._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img
                      src={camp.campaign_image_url}
                      alt={camp.campaign_title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      className="badge badge-category"
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(10, 14, 26, 0.85)',
                        backdropFilter: 'blur(6px)',
                      }}
                    >
                      {camp.category}
                    </span>
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        background: 'rgba(10, 14, 26, 0.85)',
                        backdropFilter: 'blur(6px)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <Calendar size={12} /> {calculateDaysLeft(camp.deadline)}
                    </span>
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      By <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{camp.creator_name}</span>
                    </p>

                    <h3
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        marginBottom: '0.75rem',
                        lineHeight: 1.35,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {camp.campaign_title}
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
                      {camp.campaign_story}
                    </p>

                    <div style={{ marginTop: 'auto' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.45rem' }}>
                        <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                          {camp.amount_raised || 0} Credits Raised
                        </span>
                        <span style={{ color: 'var(--text-muted)' }}>Goal: {camp.funding_goal}</span>
                      </div>
                      <div className="progress-bar-bg" style={{ marginBottom: '1.25rem' }}>
                        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
                      </div>

                      <Link
                        to={`/campaigns/${camp._id}`}
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        View Details
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
