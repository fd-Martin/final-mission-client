import React from "react";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import Logo from "../../Components/Logo/Logo";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  //   console.log(location);
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/auth/login" state={location.pathname}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
