import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import { Home } from './pages/Home';
import { ExploreCampaigns } from './pages/ExploreCampaigns';
import { CampaignDetails } from './pages/CampaignDetails';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Dashboard Layout & Pages
import { DashboardLayout } from './pages/dashboard/DashboardLayout';

// Supporter Views
import { SupporterHome } from './pages/dashboard/supporter/SupporterHome';
import { MyContributions } from './pages/dashboard/supporter/MyContributions';
import { PurchaseCredit } from './pages/dashboard/supporter/PurchaseCredit';
import { PaymentHistory } from './pages/dashboard/supporter/PaymentHistory';

// Creator Views
import { CreatorHome } from './pages/dashboard/creator/CreatorHome';
import { AddNewCampaign } from './pages/dashboard/creator/AddNewCampaign';
import { MyCampaigns } from './pages/dashboard/creator/MyCampaigns';
import { Withdrawals } from './pages/dashboard/creator/Withdrawals';
import { CreatorPaymentHistory } from './pages/dashboard/creator/CreatorPaymentHistory';

// Admin Views
import { AdminHome } from './pages/dashboard/admin/AdminHome';
import { CampaignApprovals } from './pages/dashboard/admin/CampaignApprovals';
import { WithdrawalRequests } from './pages/dashboard/admin/WithdrawalRequests';
import { ManageUsers } from './pages/dashboard/admin/ManageUsers';
import { ManageCampaigns } from './pages/dashboard/admin/ManageCampaigns';
import { Reports } from './pages/dashboard/admin/Reports';

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'Admin') return <Navigate to="/dashboard/admin-home" replace />;
  if (user.role === 'Creator') return <Navigate to="/dashboard/creator-home" replace />;
  return <Navigate to="/dashboard/supporter-home" replace />;
};

export const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Routes>
        {/* Public Routes Wrapped in Main Navbar/Footer */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main style={{ flexGrow: 1 }}>
                <Home />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/explore"
          element={
            <>
              <Navbar />
              <main style={{ flexGrow: 1 }}>
                <ExploreCampaigns />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/campaigns/:id"
          element={
            <>
              <Navbar />
              <main style={{ flexGrow: 1 }}>
                <CampaignDetails />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <main style={{ flexGrow: 1 }}>
                <Login />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <main style={{ flexGrow: 1 }}>
                <Register />
              </main>
              <Footer />
            </>
          }
        />

        {/* Dashboard Routes Wrapped in DashboardLayout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardRedirect />} />

          {/* Supporter Routes */}
          <Route
            path="supporter-home"
            element={
              <ProtectedRoute allowedRoles={['Supporter']}>
                <SupporterHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="explore"
            element={
              <ProtectedRoute allowedRoles={['Supporter']}>
                <ExploreCampaigns />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-contributions"
            element={
              <ProtectedRoute allowedRoles={['Supporter']}>
                <MyContributions />
              </ProtectedRoute>
            }
          />
          <Route
            path="purchase-credit"
            element={
              <ProtectedRoute allowedRoles={['Supporter']}>
                <PurchaseCredit />
              </ProtectedRoute>
            }
          />
          <Route
            path="payment-history"
            element={
              <ProtectedRoute allowedRoles={['Supporter']}>
                <PaymentHistory />
              </ProtectedRoute>
            }
          />

          {/* Creator Routes */}
          <Route
            path="creator-home"
            element={
              <ProtectedRoute allowedRoles={['Creator']}>
                <CreatorHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-campaign"
            element={
              <ProtectedRoute allowedRoles={['Creator']}>
                <AddNewCampaign />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-campaigns"
            element={
              <ProtectedRoute allowedRoles={['Creator']}>
                <MyCampaigns />
              </ProtectedRoute>
            }
          />
          <Route
            path="withdrawals"
            element={
              <ProtectedRoute allowedRoles={['Creator']}>
                <Withdrawals />
              </ProtectedRoute>
            }
          />
          <Route
            path="creator-payments"
            element={
              <ProtectedRoute allowedRoles={['Creator']}>
                <CreatorPaymentHistory />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="admin-home"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="campaign-approvals"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <CampaignApprovals />
              </ProtectedRoute>
            }
          />
          <Route
            path="withdrawal-requests"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <WithdrawalRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-users"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-campaigns"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <ManageCampaigns />
              </ProtectedRoute>
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Reports />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};
