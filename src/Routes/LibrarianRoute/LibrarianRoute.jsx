import React from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Loading from "daisyui/components/loading";
import Forbidden from "../../Components/Forbidden/Forbidden";

const LibrarianRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return ;
  }
  if (!role === "librarian") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default LibrarianRoute;
