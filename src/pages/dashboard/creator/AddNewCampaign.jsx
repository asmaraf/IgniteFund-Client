import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Upload,
  Calendar,
  Coins,
  Gift,
  ImageIcon,
  CheckCircle,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { api } from '../../../services/api';
import { Breadcrumb } from '../../../components/Breadcrumb';

export const AddNewCampaign = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [category, setCategory] = useState('Technology');
  const [goal, setGoal] = useState('');
  const [minContribution, setMinContribution] = useState('20');
  const [deadline, setDeadline] = useState('');
  const [rewardInfo, setRewardInfo] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError('');
    try {
      const res = await api.uploadImage(file);
      if (res.success && res.url) {
        setImageUrl(res.url);
      }
    } catch (err) {
      setError('Image upload failed. You can paste an image URL directly.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (
      !title.trim() ||
      !story.trim() ||
      !category ||
      !goal ||
      !minContribution ||
      !deadline ||
      !rewardInfo.trim() ||
      !imageUrl.trim()
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    if (new Date(deadline) <= new Date()) {
      setError('Campaign deadline must be in the future.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.createCampaign({
        campaign_title: title.trim(),
        campaign_story: story.trim(),
        category,
        funding_goal: Number(goal),
        minimum_contribution: Number(minContribution),
        deadline,
        reward_info: rewardInfo.trim(),
        campaign_image_url: imageUrl.trim(),
      });

      if (res.success) {
        setSuccess('Campaign created! Status is "pending" and will be live once approved by an Admin.');
        setTimeout(() => {
          navigate('/dashboard/my-campaigns');
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Breadcrumb
        items={[
          { label: 'Creator Studio', path: '/dashboard/creator-home' },
          { label: 'Launch New Campaign' },
        ]}
      />

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>Launch New Campaign</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Create a campaign to fund your project. New campaigns are saved with a status of "pending" and become visible to Supporters once approved by an Admin.
        </p>
      </div>

      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.85rem',
            backgroundColor: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#fb7185',
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
          }}
        >
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.85rem',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#34d399',
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
          }}
        >
          <CheckCircle size={18} />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ padding: '2.5rem' }}>
        {/* Title */}
        <div className="form-group">
          <label className="form-label">Campaign Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Help us build a solar-powered water purification unit"
            className="form-input"
            id="campaign-title-input"
          />
        </div>

        {/* Category & Funding Goal */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
              id="campaign-category-select"
            >
              <option value="Technology">Technology</option>
              <option value="Environment">Environment</option>
              <option value="Health">Health</option>
              <option value="Community">Community</option>
              <option value="Education">Education</option>
              <option value="Art">Art</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Funding Goal (Credits)</label>
            <div style={{ position: 'relative' }}>
              <Coins
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
                type="number"
                min="10"
                required
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., 1500"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                id="campaign-goal-input"
              />
            </div>
          </div>
        </div>

        {/* Min Contribution & Deadline */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">Minimum Contribution (Credits)</label>
            <input
              type="number"
              min="1"
              required
              value={minContribution}
              onChange={(e) => setMinContribution(e.target.value)}
              placeholder="e.g., 20"
              className="form-input"
              id="campaign-min-contribution-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Campaign Deadline</label>
            <div style={{ position: 'relative' }}>
              <Calendar
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
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                id="campaign-deadline-input"
              />
            </div>
          </div>
        </div>

        {/* Cover Image Upload (imgBB integration) */}
        <div className="form-group">
          <label className="form-label">Campaign Cover Image URL (or upload via imgBB)</label>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <ImageIcon
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
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... or upload"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                id="campaign-image-input"
              />
            </div>

            <label
              className="btn btn-secondary"
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                whiteSpace: 'nowrap',
              }}
            >
              <Upload size={16} />
              {uploadingImage ? 'Uploading...' : 'Upload Image'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                disabled={uploadingImage}
              />
            </label>
          </div>

          {imageUrl && (
            <div style={{ marginTop: '0.5rem', width: '100%', height: '140px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <img src={imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        {/* Story */}
        <div className="form-group">
          <label className="form-label">Campaign Story & Details</label>
          <textarea
            required
            rows={5}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Describe the problem, your solution, engineering roadmap, and why backers should support your vision..."
            className="form-textarea"
            id="campaign-story-input"
          />
        </div>

        {/* Reward Info */}
        <div className="form-group">
          <label className="form-label">Supporter Reward Information</label>
          <textarea
            required
            rows={3}
            value={rewardInfo}
            onChange={(e) => setRewardInfo(e.target.value)}
            placeholder="e.g., Digital donor certificate, field updates, VIP product testing invitation, or name etched on physical unit"
            className="form-textarea"
            id="campaign-reward-input"
          />
        </div>

        <button
          type="submit"
          disabled={loading || uploadingImage}
          className="btn btn-primary btn-lg"
          style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
          id="add-campaign-submit-btn"
        >
          <PlusCircle size={20} />
          {loading ? 'Submitting Campaign...' : 'Add Campaign'}
        </button>
      </form>
    </div>
  );
};
