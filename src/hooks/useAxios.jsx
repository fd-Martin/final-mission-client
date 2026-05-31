import axios from "axios";

const instance = axios.create({
  baseURL: "https://last-mission-r93qxhttk-fd-martins-projects.vercel.app",
  // baseURL: "http://localhost:3000",
});

import React from "react";

const useAxios = () => {
  return instance;
};

export default useAxios;
