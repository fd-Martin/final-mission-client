import axios from "axios";

const instance = axios.create({
  baseURL: "https://mission-final-plum.vercel.app",
  // baseURL: "http://localhost:3000",
});

import React from "react";

const useAxios = () => {
  return instance;
};

export default useAxios;
