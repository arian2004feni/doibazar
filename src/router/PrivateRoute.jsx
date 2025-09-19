import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, openModal, authLoading } = useAuth();

  const location = useLocation();

  if(authLoading) {
    return <div className="w-full h-screen flex items-center justify-center"><span className="loading loading-ring w-10"></span></div>;
  }

  if (!user) {
    openModal();
    return <Navigate to={'/'} state={location?.pathname} />;
  }

  return children;
};

export default PrivateRoute;
