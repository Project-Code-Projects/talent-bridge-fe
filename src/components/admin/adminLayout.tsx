// components/admin/AdminLayout.tsx

import { Outlet } from "react-router";
// import AdminNavbar from './adminNavbar';
import AdminSidebar from "./adminSidebar";
import Navbar from "../layout/Navbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* <AdminNavbar /> */}
      <Navbar />
      <AdminSidebar />

      {/* Main Content - Offset by sidebar width */}
      <main className="pt-14 md:pl-64 transition-all duration-300">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
