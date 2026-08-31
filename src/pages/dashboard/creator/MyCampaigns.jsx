import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Edit,
  Trash2,
  PlusCircle,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  XCircle,
} from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { Breadcrumb } from '../../../components/Breadcrumb';

export const MyCampaigns = () => {
  const { refreshUser } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editStory, setEditStory] = useState('');
  const [editReward, setEditReward] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);

  // Notification / Feedback
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchMyCampaigns = async () => {
    try {
      const res = await api.getMyCampaigns();
      if (res.success) {
        setCampaigns(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load campaigns', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCampaigns();
  }, []);

  const openEditModal = (c) => {
    setEditingCampaign(c);
    setEditTitle(c.campaign_title);
    setEditStory(c.campaign_story);
    setEditReward(c.reward_info);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSavingEdit(true);
    setError('');
    setMessage('');
    try {
      const res = await api.updateCampaign(editingCampaign._id, {
        campaign_title: editTitle,
        campaign_story: editStory,
        reward_info: editReward,
      });

      if (res.success) {
        setMessage('Campaign updated successfully!');
        setEditingCampaign(null);
        await fetchMyCampaigns();
      }
    } catch (err) {
      setError(err.message || 'Failed to update campaign');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?\n\nDeleting this campaign will automatically REFUND all approved supporters their pledged credits!`
    );
    if (!confirmed) return;

    setError('');
    setMessage('');
    try {
      const res = await api.deleteCampaign(id);
      if (res.success) {
        setMessage(res.message || 'Campaign deleted and supporters refunded successfully.');
        await fetchMyCampaigns();
        await refreshUser();
      }
    } catch (err) {
      setError(err.message || 'Failed to delete campaign');
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'approved') {
      return (
        <span className="badge badge-approved">
          <CheckCircle size={12} /> Approved
        </span>
      );
    }
    if (status === 'rejected') {
      return (
        <span className="badge badge-rejected">
          <XCircle size={12} /> Rejected
        </span>
      );
    }
    return (
      <span className="badge badge-pending">
        <Clock size={12} /> Pending Admin Approval
      </span>
    );
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Creator Studio', path: '/dashboard/creator-home' },
          { label: 'My Campaigns' },
        ]}
      />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          gap: '1rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>My Campaigns</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            All campaigns launched by you, sorted in descending order by deadline.
          </p>
        </div>

        <Link to="/dashboard/add-campaign" className="btn btn-primary">
          <PlusCircle size={18} /> Add New Campaign
        </Link>
      </div>

      {message && (
        <div
          style={{
            padding: '0.85rem 1rem',
            marginBottom: '1.5rem',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#34d399',
            fontSize: '0.875rem',
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            padding: '0.85rem 1rem',
            marginBottom: '1.5rem',
            backgroundColor: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#fb7185',
            fontSize: '0.875rem',
          }}
        >
          {error}
        </div>
      )}

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
      ) : campaigns.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          <FolderKanban size={40} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No campaigns found</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            You have not launched any campaigns yet. Start raising credits today!
          </p>
          <Link to="/dashboard/add-campaign" className="btn btn-primary btn-sm">
            <PlusCircle size={16} /> Create First Campaign
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Campaign Title</th>
                <th>Category</th>
                <th>Deadline</th>
                <th>Goal / Raised</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c._id}>
                  <td style={{ width: '70px' }}>
                    <img
                      src={c.campaign_image_url}
                      alt={c.campaign_title}
                      style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </td>
                  <td style={{ fontWeight: 600, maxWidth: '240px' }}>{c.campaign_title}</td>
                  <td>
                    <span className="badge badge-category">{c.category}</span>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={13} color="var(--primary)" />
                      {new Date(c.deadline).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                      {c.amount_raised || 0}
                    </span>{' '}
                    / {c.funding_goal} Credits
                  </td>
                  <td>{getStatusBadge(c.status)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => openEditModal(c)}
                        className="btn btn-secondary btn-sm"
                        title="Update campaign details"
                        id={`edit-campaign-${c._id}`}
                      >
                        <Edit size={14} /> Update
                      </button>
                      <button
                        onClick={() => handleDelete(c._id, c.campaign_title)}
                        className="btn btn-danger btn-sm"
                        title="Delete campaign and refund supporters"
                        id={`delete-campaign-${c._id}`}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Campaign Modal */}
      {editingCampaign && (
        <div className="modal-overlay" onClick={() => setEditingCampaign(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              Update Campaign Info
            </h3>

            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label className="form-label">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Campaign Story</label>
                <textarea
                  required
                  rows={5}
                  value={editStory}
                  onChange={(e) => setEditStory(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Reward Information</label>
                <textarea
                  required
                  rows={3}
                  value={editReward}
                  onChange={(e) => setEditReward(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setEditingCampaign(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" disabled={savingEdit} className="btn btn-primary">
                  {savingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
