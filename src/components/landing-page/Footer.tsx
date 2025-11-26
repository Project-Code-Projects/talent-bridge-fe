import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-800/80">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500">
                <span className="text-sm font-bold text-white">H</span>
              </div>
              <span className="text-lg font-bold">Hirely</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Connecting talent with opportunity. Find your dream job today.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-zinc-900 dark:text-white">
              Platform
            </h3>
            <div className="space-y-2 text-sm">
              <Link
                to="/jobs"
                className="block text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Browse Jobs
              </Link>
              <Link
                to="/dashboard"
                className="block text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                to="/auth"
                className="block text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-zinc-900 dark:text-white">
              Company
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="#overview"
                className="block text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Overview
              </a>
              <a
                href="#company"
                className="block text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                About
              </a>
              <a
                href="#"
                className="block text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Careers
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-zinc-900 dark:text-white">
              Support
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="#"
                className="block text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Help Center
              </a>
              <a
                href="#"
                className="block text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Contact
              </a>
              <a
                href="#"
                className="block text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-700">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              © {new Date().getFullYear()} Hirely. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
              <a
                href="#"
                className="transition hover:text-zinc-900 dark:hover:text-white"
              >
                Terms
              </a>
              <a
                href="#"
                className="transition hover:text-zinc-900 dark:hover:text-white"
              >
                Privacy
              </a>
              <a
                href="#"
                className="transition hover:text-zinc-900 dark:hover:text-white"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
