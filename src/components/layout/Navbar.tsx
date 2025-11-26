import { Link, useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { isAuthenticated, logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  const isAdmin = user?.roleId === 1;
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLandingPage = location.pathname === "/";
  const isAuthPage = location.pathname === "/auth";

  // Function to handle anchor link clicks
  const handleAnchorClick = (sectionId: string) => {
    setMobileOpen(false);

    // If we're not on the landing page, navigate to landing page first
    if (!isLandingPage) {
      navigate("/");
      // Wait for navigation then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If we're already on landing page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Function to handle Jobs navigation - always scroll to top
  const handleJobsClick = () => {
    setMobileOpen(false);
    // Scroll to top when navigating to jobs
    window.scrollTo(0, 0);
  };

  // UPDATED: Function to handle Logo click - smart home navigation
  const handleLogoClick = () => {
    setMobileOpen(false);

    if (isAuthenticated && !isLandingPage) {
      // If user is logged in and not on landing page, go to dashboard
      navigate("/dashboard");
      window.scrollTo(0, 0);
    } else if (!isLandingPage) {
      // If not on landing page and not logged in, go to landing page
      navigate("/");
    } else {
      // If already on landing page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // -------------------------------------------------------------
  // ADMIN NAVBAR -> ONLY LOGO (no menu)
  // -------------------------------------------------------------
  if (isAdminRoute) {
    return (
      <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur border-b border-zinc-200 dark:bg-zinc-900/70 dark:border-zinc-700">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2"
            onClick={handleLogoClick}
          >
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold tracking-tight dark:text-white">
              Hirely
            </span>
          </Link>
        </nav>
      </header>
    );
  }

  // -------------------------------------------------------------
  // USER DASHBOARD NAVBAR (minimal navigation - for authenticated users on non-landing pages)
  // -------------------------------------------------------------
  if (isAuthenticated && !isLandingPage && !isAuthPage) {
    return (
      <>
        <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur border-b border-zinc-200 dark:bg-zinc-900/70 dark:border-zinc-700">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            {/* Logo */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2"
              onClick={handleLogoClick}
            >
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold tracking-tight dark:text-white">
                Hirely
              </span>
            </Link>

            {/* Desktop Navigation - MINIMAL FOR AUTHENTICATED USERS */}
            <div className="hidden items-center gap-6 md:flex">
              <Link
                to="/jobs"
                onClick={handleJobsClick}
                className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
              >
                Jobs
              </Link>

              <div className="flex items-center gap-6">
                {/* Regular User Dashboard */}
                {!isAdmin && (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer transition-colors dark:text-red-400 dark:hover:text-red-300"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </nav>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 top-16 z-40 bg-white md:hidden dark:bg-zinc-900">
            <div className="flex flex-col space-y-6 p-6">
              <Link
                to="/jobs"
                onClick={handleJobsClick}
                className="text-lg font-medium text-zinc-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400"
              >
                Jobs
              </Link>

              {/* Regular User Dashboard */}
              {!isAdmin && (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-zinc-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400"
                >
                  Dashboard
                </Link>
              )}

              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-zinc-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="text-left text-lg font-medium text-red-600 hover:text-red-700 transition-colors dark:text-red-400 dark:hover:text-red-300"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // -------------------------------------------------------------
  // LANDING PAGE NAVBAR (full navigation - for landing page and unauthenticated users)
  // -------------------------------------------------------------
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur border-b border-zinc-200 dark:bg-zinc-900/70 dark:border-zinc-700">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={handleLogoClick}
          >
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold tracking-tight dark:text-white">
              Hirely
            </span>
          </Link>

          {/* Desktop Navigation - FULL FOR LANDING PAGE */}
          <div className="hidden items-center gap-6 md:flex">
            <button
              onClick={() => handleAnchorClick("overview")}
              className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
            >
              Overview
            </button>

            <button
              onClick={() => handleAnchorClick("company")}
              className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
            >
              Company
            </button>

            <Link
              to="/jobs"
              onClick={handleJobsClick}
              className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
            >
              Jobs
            </Link>

            {/* AUTHENTICATED ONLY */}
            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                {/* Admin Dashboard */}
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
                  >
                    Admin Dashboard
                  </Link>
                )}

                {/* Regular User Dashboard */}
                {!isAdmin && (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer transition-colors dark:text-red-400 dark:hover:text-red-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
              >
                Signup/Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white md:hidden dark:bg-zinc-900">
          <div className="flex flex-col space-y-6 p-6">
            <button
              onClick={() => handleAnchorClick("overview")}
              className="text-left text-lg font-medium text-zinc-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400"
            >
              Overview
            </button>

            <button
              onClick={() => handleAnchorClick("company")}
              className="text-left text-lg font-medium text-zinc-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400"
            >
              Company
            </button>

            <Link
              to="/jobs"
              onClick={handleJobsClick}
              className="text-lg font-medium text-zinc-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400"
            >
              Jobs
            </Link>

            {/* AUTHENTICATED ONLY */}
            {isAuthenticated ? (
              <>
                {/* Admin Dashboard */}
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium text-zinc-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400"
                  >
                    Admin Dashboard
                  </Link>
                )}

                {/* Regular User Dashboard */}
                {!isAdmin && (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium text-zinc-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400"
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-zinc-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left text-lg font-medium text-red-600 hover:text-red-700 transition-colors dark:text-red-400 dark:hover:text-red-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-zinc-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400"
              >
                Signup/Login
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
