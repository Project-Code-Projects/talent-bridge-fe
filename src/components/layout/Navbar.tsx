import { Link, useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '../../stores/authStore';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur border-b border-zinc-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500" />
          <span className="text-xl font-bold tracking-tight">Hirely</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#overview" className="text-sm text-zinc-600 hover:text-zinc-900">
            Overview
          </a>
          <a href="#company" className="text-sm text-zinc-600 hover:text-zinc-900">
            Company
          </a>

          <Link
            to="/jobs"
            className={`text-sm hover:text-zinc-900 ${
              isActive('/jobs') ? 'text-zinc-900 font-medium' : 'text-zinc-600'
            }`}
          >
            Jobs
          </Link>

          {/* Authenticated Links */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className={`text-sm hover:text-zinc-900 ${
                  isActive('/dashboard') ? 'text-zinc-900 font-medium' : 'text-zinc-600'
                }`}
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                className={`text-sm hover:text-zinc-900 ${
                  isActive('/profile') ? 'text-zinc-900 font-medium' : 'text-zinc-600'
                }`}
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
              className={`text-sm hover:text-zinc-900 ${
                isActive('/auth') ? 'text-zinc-900 font-medium' : 'text-zinc-600'
              }`}
            >
              Signup/Login
            </Link>
          )}
        </div>

        {/* Mobile */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="inline-flex items-center rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:shadow md:hidden"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/auth"
            className="inline-flex items-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:shadow md:hidden"
          >
            Get started!
          </Link>
        )}
      </nav>
    </header>
  );
}
