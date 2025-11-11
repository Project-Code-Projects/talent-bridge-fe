import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../../stores/authStore';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-zinc-200 bg-white">
      <nav className="mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500" />
          <div>
            <span className="text-xl font-bold tracking-tight">Hirely</span>
            <span className="ml-2 rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
              Admin
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <div className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center font-semibold text-zinc-700">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:block">{user?.name}</span>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}
