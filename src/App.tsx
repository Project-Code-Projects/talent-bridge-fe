import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import LandingPage from './pages/Landing/LandingPage';
import Layout from './components/layout/Layout';
import JobsPage from './pages/Jobs/JobsPage';
import JobDetailsPage from './pages/Jobs/JobDetailsPage';
import DashboardPage from './pages/profile/DashboardPage';
import ProfileFormPage from './pages/profile/ProfileFormPage';
import ProfileViewPage from './pages/profile/ProfileViewPage';
import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';
import Auth from './pages/Auth/Auth';
import ProtectedRoute from './components/layout/protectedRoute';
import AdminLayout from './components/admin/adminLayout';
import AdminDashboard from './components/admin/adminDashboard';

function App() {
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <BrowserRouter>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/:id" element={<JobDetailsPage />} />
          <Route path="auth" element={<Auth />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<ProfileViewPage />} />
          <Route path="profile/setup" element={<ProfileFormPage />} />
          <Route path="profile/edit" element={<ProfileFormPage />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route
            path="jobs"
            element={<div className="p-8 text-center text-zinc-600">Jobs Management - Coming Soon</div>}
          />
          <Route
            path="users"
            element={<div className="p-8 text-center text-zinc-600">Users Management - Coming Soon</div>}
          />
          <Route
            path="applications"
            element={<div className="p-8 text-center text-zinc-600">Applications Management - Coming Soon</div>}
          />
          <Route
            path="applications/:id"
            element={<div className="p-8 text-center text-zinc-600">Application Details - Coming Soon</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
