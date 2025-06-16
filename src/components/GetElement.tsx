import { Navigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import { isAuthenticated } from "@/utils/functions";

const GetElement = ({ path }: { path: string }) => {
  const isLoggedIn = isAuthenticated(); // Replace with actual authentication logic
  return isLoggedIn ? (
    <Navigate to={path} replace />
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};

export default GetElement;
