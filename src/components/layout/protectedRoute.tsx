import { Navigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  // Not authenticated - redirect to auth page
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" replace />;
  }

  // Admin route but user is not admin - redirect to home
  if (requireAdmin && user.roleId !== 1) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
