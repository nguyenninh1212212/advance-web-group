import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("accessToken");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
