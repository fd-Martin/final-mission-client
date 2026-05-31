import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://mission-final-plum.vercel.app",
  // baseURL: "http://localhost:3000",
});

import React, { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    //request interceptors =
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    //response interceptors
    const resInterceptor = axiosSecure.interceptors.response.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
