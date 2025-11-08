// components/admin/AdminSidebar.tsx

import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface SidebarLink {
  name: string;
  path: string;
  icon: string;
}

const links: SidebarLink[] = [
  { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
  { name: "Jobs", path: "/admin/jobs", icon: "💼" },
  { name: "Users", path: "/admin/users", icon: "👥" },
  { name: "Applications", path: "/admin/applications", icon: "📝" },
];

export default function AdminSidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 215 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex fixed left-0 top-14 h-[calc(100vh-3.5rem)] border-r border-zinc-200 bg-white flex-col"
      >
        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mx-4 my-4 rounded-lg border border-zinc-300 bg-white p-2 text-zinc-600 hover:bg-zinc-50"
        >
          {isCollapsed ? "→" : "←"}
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 px-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive(link.path)
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-full bg-indigo-600 p-4 text-white shadow-lg hover:bg-indigo-700"
        >
          ☰
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {!isCollapsed && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCollapsed(true)}
              className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="md:hidden fixed left-0 top-0 z-50 h-screen w-64 border-r border-zinc-200 bg-white"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 p-4">
                <span className="text-lg font-bold">Menu</span>
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100"
                >
                  ✕
                </button>
              </div>
              <nav className="space-y-1 p-3">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsCollapsed(true)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive(link.path)
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
