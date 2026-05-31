import React from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading/Loading";

const useRole = () => {
  const { user } = useAuth();
  const axiosGeneral = useAxios();
  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosGeneral.get(`/users/${user?.email}/role`);
      return res.data.role;
    },
  });

  return { role, roleLoading };
};

export default useRole;
