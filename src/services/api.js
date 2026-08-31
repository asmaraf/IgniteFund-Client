const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
};

export const api = {
  // Auth
  register: (userData) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  googleLogin: (userData) =>
    request('/auth/google-login', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => request('/auth/me'),

  // Campaigns
  getTopFunded: () => request('/campaigns/top-funded'),
  getCampaigns: (params = '') => request(`/campaigns${params ? `?${params}` : ''}`),
  getCampaignById: (id) => request(`/campaigns/${id}`),
  createCampaign: (campaignData) =>
    request('/campaigns', { method: 'POST', body: JSON.stringify(campaignData) }),
  getMyCampaigns: () => request('/campaigns/creator/my-campaigns'),
  updateCampaign: (id, data) =>
    request(`/campaigns/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteCampaign: (id) =>
    request(`/campaigns/${id}`, { method: 'DELETE' }),

  // Admin Campaigns
  getPendingCampaigns: () => request('/campaigns/admin/pending'),
  updateCampaignStatus: (id, status) =>
    request(`/campaigns/admin/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  adminDeleteCampaign: (id) =>
    request(`/campaigns/admin/${id}`, { method: 'DELETE' }),

  // Contributions
  createContribution: (data) =>
    request('/contributions', { method: 'POST', body: JSON.stringify(data) }),
  getSupporterContributions: (page = 1, limit = 6) =>
    request(`/contributions/supporter?page=${page}&limit=${limit}`),
  getSupporterStats: () => request('/contributions/supporter/stats'),
  getCreatorContributions: () => request('/contributions/creator/pending'),
  getCreatorStats: () => request('/contributions/creator/stats'),
  approveContribution: (id) =>
    request(`/contributions/${id}/approve`, { method: 'PATCH' }),
  rejectContribution: (id) =>
    request(`/contributions/${id}/reject`, { method: 'PATCH' }),

  // Withdrawals
  requestWithdrawal: (data) =>
    request('/withdrawals', { method: 'POST', body: JSON.stringify(data) }),
  getCreatorWithdrawals: () => request('/withdrawals/creator'),
  getAdminWithdrawals: () => request('/withdrawals/admin'),
  approveWithdrawal: (id) =>
    request(`/withdrawals/admin/${id}/approve`, { method: 'PATCH' }),

  // Payments & Credits (Stripe)
  createPaymentIntent: (credits) =>
    request('/payments/create-intent', { method: 'POST', body: JSON.stringify({ credits }) }),
  confirmCreditPurchase: (data) =>
    request('/payments/confirm', { method: 'POST', body: JSON.stringify(data) }),
  getPaymentHistory: () => request('/payments/history'),

  // Notifications
  getNotifications: () => request('/notifications'),
  markNotificationRead: (id) =>
    request(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllNotificationsRead: () =>
    request('/notifications/mark-all', { method: 'PATCH' }),

  // Admin Users & Stats
  getAdminStats: () => request('/admin/stats'),
  getAllUsers: () => request('/admin/users'),
  updateUserRole: (id, role) =>
    request(`/admin/users/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role }) }),
  removeUser: (id) => request(`/admin/users/${id}`, { method: 'DELETE' }),

  // Reports
  submitReport: (data) =>
    request('/reports', { method: 'POST', body: JSON.stringify(data) }),
  getAllReports: () => request('/reports'),
  handleReportAction: (id, action) =>
    request(`/reports/${id}/action`, { method: 'PATCH', body: JSON.stringify({ action }) }),

  // Upload (imgBB / backend fallback)
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return request('/upload', { method: 'POST', body: formData });
  },
};
