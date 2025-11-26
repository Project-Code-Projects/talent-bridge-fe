import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/Landing/LandingPage";
import Layout from "./components/layout/Layout";
import UserLayout from "./components/layout/UserLayout"; // ADD THIS
import JobsPage from "./pages/Jobs/JobsPage";
import JobDetailsPage from "./pages/Jobs/JobDetailsPage";
import DashboardPage from "./pages/profile/DashboardPage";
import ProfileFormPage from "./pages/profile/ProfileFormPage";
import ProfileViewPage from "./pages/profile/ProfileViewPage";
import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import Auth from "./pages/Auth/Auth";
import ProtectedRoute from "./components/layout/protectedRoute";
import AdminLayout from "./components/admin/adminLayout";
import AdminDashboard from "./pages/Admin/adminDashboardPage";
import AdminJobsPage from "./pages/Admin/AdminJobsPage";
import AdminJobEditPage from "./pages/Admin/AdminJobEditPage";
import AdminJobCreatePage from "./pages/Admin/AdminJobCreatePage";
import AdminUsersPage from "./pages/Admin/AdminUsersPage";
import AdminUserProfilePage from "./pages/Admin/AdminUsersProfilePage";
import AdminUserProfileEditPage from "./pages/Admin/AdminUserProfileEditPage";
import AdminApplicationsPage from "./pages/Admin/AdminApplicationsPage";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page with full layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* User dashboard routes with minimal navbar */}
        <Route path="/" element={<UserLayout />}>
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/:id" element={<JobDetailsPage />} />
          <Route path="auth" element={<Auth />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<ProfileViewPage />} />
          <Route path="profile/setup" element={<ProfileFormPage />} />
          <Route path="profile/edit" element={<ProfileFormPage />} />
        </Route>

        {/* admin routes */}
        <Route
          path="admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* job management */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="jobs" element={<AdminJobsPage />} />
          <Route path="jobs/create" element={<AdminJobCreatePage />} />
          <Route path="jobs/:id/edit" element={<AdminJobEditPage />} />
          <Route path="applications" element={<AdminApplicationsPage />} />

          {/* user management */}
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="users/:id" element={<AdminUserProfilePage />} />
          <Route path="users/:id/edit" element={<AdminUserProfileEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
