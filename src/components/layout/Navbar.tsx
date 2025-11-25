import { Link, useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isAdmin = user?.roleId === 1;
  const isAdminRoute = location.pathname.startsWith("/admin");

  // -------------------------------------------------------------
  // ADMIN NAVBAR -> ONLY LOGO (no menu)
  // -------------------------------------------------------------
  if (isAdminRoute) {
    return (
      <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur border-b border-zinc-200">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500" />
            <span className="text-xl font-bold tracking-tight">Hirely</span>
          </Link>
        </nav>
      </header>
    );
  }

  // -------------------------------------------------------------
  // NORMAL NAVBAR (public + user dashboard)
  // -------------------------------------------------------------
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur border-b border-zinc-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500" />
          <span className="text-xl font-bold tracking-tight">Hirely</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#overview"
            className="text-sm text-zinc-600 hover:text-zinc-900"
          >
            Overview
          </a>

          <a
            href="#company"
            className="text-sm text-zinc-600 hover:text-zinc-900"
          >
            Company
          </a>

          <Link
            to="/jobs"
            className="text-sm text-zinc-600 hover:text-zinc-900"
          >
            Jobs
          </Link>

          {/* AUTHENTICATED ONLY */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {/* Admin Dashboard */}
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="text-sm text-zinc-600 hover:text-zinc-900"
                >
                  Admin Dashboard
                </Link>
              )}

              {/* Regular User Dashboard */}
              {!isAdmin && (
                <Link
                  to="/dashboard"
                  className="text-sm text-zinc-600 hover:text-zinc-900"
                >
                  Dashboard
                </Link>
              )}

              <Link
                to="/profile"
                className="text-sm text-zinc-600 hover:text-zinc-900"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="text-sm text-zinc-600 hover:text-zinc-900"
            >
              Signup/Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
