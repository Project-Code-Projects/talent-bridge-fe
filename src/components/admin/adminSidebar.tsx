import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import JobsIcon from "../../assets/JobsIcon.png";
import UsersIcon from "../../assets/UsersIcon.png";
import ApplicationIcon from "../../assets/ApplicationIcon.png";
import DashboardIcon from "../../assets/DashboardIcon.png";

interface SidebarLink {
  name: string;
  path: string;
  icon: string;
}

const links: SidebarLink[] = [
  { name: "Dashboard", path: "/admin/dashboard", icon: DashboardIcon },
  { name: "Jobs", path: "/admin/jobs", icon: JobsIcon },
  { name: "Users", path: "/admin/users", icon: UsersIcon },
  { name: "Applications", path: "/admin/applications", icon: ApplicationIcon },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuthStore();

  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <motion.aside
        animate={{ width: desktopCollapsed ? 81 : 215 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex fixed left-0 top-14 h-[calc(100vh-3.5rem)] border-r border-zinc-200 bg-white flex-col"
      >
        {/* Collapse Button */}
        <button
          onClick={() => setDesktopCollapsed(!desktopCollapsed)}
          className="mx-4 my-4 rounded-lg border border-zinc-300 bg-white p-2 text-zinc-600 hover:bg-zinc-50"
        >
          {desktopCollapsed ? "☰" : "✕"}
        </button>

        {/* Navigation */}
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
              <img src={link.icon} className="w-6 h-6" />

              <AnimatePresence>
                {!desktopCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                  >
                    {link.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="m-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
        >
          {!desktopCollapsed ? "Logout" : "⎋"}
        </button>
      </motion.aside>

      {/* MOBILE FAB BUTTON */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-full bg-indigo-600 p-4 text-white shadow-lg hover:bg-indigo-700"
        >
          ☰
        </button>
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", damping: 25 }}
              className="md:hidden fixed left-0 top-0 z-50 h-screen w-64 border-r border-zinc-200 bg-white"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 p-4">
                <span className="text-lg font-bold">Admin Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
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
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive(link.path)
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <img src={link.icon} className="w-6 h-6" />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </nav>

              {/* MOBILE LOGOUT */}
              <button
                onClick={handleLogout}
                className="m-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
              >
                Logout
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
