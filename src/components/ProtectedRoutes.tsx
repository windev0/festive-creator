// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import { isAuthenticated } from "@/utils/functions";

interface ProtectedRouteProps {
  isAllowed?: boolean;
  redirectTo?: string;
  children: React.ReactNode;
}
interface ElementsProps {
  route1: string;
  route2: string;
}

export default function ProtectedRoute({
  redirectTo = ROUTES.LOGIN,
  children,
}: ProtectedRouteProps) {
  const isAllowed = isAuthenticated();
  return isAllowed ? <>{children}</> : <Navigate to={redirectTo} replace />;
}

export function NaviagateToElement({ route1, route2 }: ElementsProps) {
  const isAllowed = isAuthenticated();
  return <Navigate to={isAllowed ? route1 : route2} replace />;
}
