import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const AdminLayout = () => {

  return (
    <div className="min-h-screen bg-black text-white">

      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.08),transparent_40%)]" />

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="lg:pl-[290px]">

        <div className="min-h-screen px-4 py-4 md:px-6 md:py-6">

          <Outlet />

        </div>

      </main>

    </div>
  );
};

export default AdminLayout;