// src/admin/components/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Siderbar"; // certifique-se do caminho correto

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f4f4f4]">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export { AdminLayout };
