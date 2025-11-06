export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur border-b border-zinc-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500" />
          <span className="text-xl font-bold tracking-tight">Hirely</span>
        </a>
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
          <a href="/auth" className="text-sm text-zinc-600 hover:text-zinc-900">
            Sign up/Log in
          </a>
        </div>
        <a
          href="/signup"
          className="inline-flex items-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:shadow md:hidden"
        >
          Get started!
        </a>
      </nav>
    </header>
  );
}
