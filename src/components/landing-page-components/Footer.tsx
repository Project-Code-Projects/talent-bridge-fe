export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-linear-to-tr from-blue-600 to-indigo-500" />
          <span className="text-sm font-semibold">Hirely</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-zinc-600">
          <a href="#overview" className="hover:text-zinc-900">
            Overview
          </a>
          <a href="#company" className="hover:text-zinc-900">
            Company
          </a>
          <a href="/auth" className="hover:text-zinc-900">
            Sign up/Log in
          </a>
        </div>
        <div className="text-xs text-zinc-500">
          © {new Date().getFullYear()} Hirely. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
