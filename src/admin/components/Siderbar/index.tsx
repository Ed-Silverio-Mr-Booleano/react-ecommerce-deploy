// src/admin/components/Sidebar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import {
  FaChartBar,
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

export const Sidebar = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <aside className="min-h-screen w-64 bg-gray-800 text-white flex flex-col justify-between">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-8 text-center">Painel Admin</h2>
        <nav className="flex flex-col gap-3">
          <Link
            to="/admin"
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              isActive("/admin") && location.pathname === "/admin"
                ? "bg-gray-700"
                : "hover:bg-gray-700"
            }`}
          >
            <FaChartBar /> Dashboard
          </Link>
          <Link
            to="/admin/products"
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              isActive("/admin/products") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <FaBoxOpen /> Produtos
          </Link>
          <Link
            to="/admin/orders"
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              isActive("/admin/orders") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <FaClipboardList /> Pedidos
          </Link>
          <Link
            to="/admin/users"
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              isActive("/admin/users") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <FaUsers /> Usuários
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-700">
        <p className="text-sm text-gray-300 mb-2">
          {user?.username || "Administrador"}
        </p>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 justify-center bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded transition"
        >
          <FaSignOutAlt /> Sair
        </button>
      </div>
    </aside>
  );
};
