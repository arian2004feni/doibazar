import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, openModal } = useAuth();

  const location = useLocation();

  if (!user) {
    openModal();
    return <Navigate to={'/'} state={location?.pathname} />;
  }

  return children;
};

export default PrivateRoute;
