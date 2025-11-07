import { Link, useLocation } from "react-router";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur border-b border-zinc-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500" />
          <span className="text-xl font-bold tracking-tight">Hirely</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {/* Fixed: Added closing tags */}
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
            className={`text-sm hover:text-zinc-900 ${
              isActive("/jobs") ? "text-zinc-900 font-medium" : "text-zinc-600"
            }`}
          >
            Jobs
          </Link>
          <Link
            to="/auth"
            className={`text-sm hover:text-zinc-900 ${
              isActive("/auth") ? "text-zinc-900 font-medium" : "text-zinc-600"
            }`}
          >
            Sign up/Log in
          </Link>
        </div>

        <Link
          to="/auth"
          className="inline-flex items-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:shadow md:hidden"
        >
          Get started!
        </Link>
      </nav>
    </header>
  );
}
