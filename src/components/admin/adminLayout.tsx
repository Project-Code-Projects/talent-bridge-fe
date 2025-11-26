import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import AdminSidebar from "./adminSidebar";
import Navbar from "../layout/Navbar";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
}

export default function AdminLayout() {
  const [sidebarWidth, setSidebarWidth] = useState(215);
  const isDesktop = useIsDesktop();

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      <AdminSidebar onWidthChange={setSidebarWidth} />
      <main
        className="pt-14 transition-all duration-300"
        style={{ marginLeft: isDesktop ? sidebarWidth : 0 }}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
