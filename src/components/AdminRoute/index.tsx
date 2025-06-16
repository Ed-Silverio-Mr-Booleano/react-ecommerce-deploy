import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const AdminRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.role !== "ADMIN") return <Navigate to="/admin" />;

  return <Outlet />;
};

export { AdminRoute };
