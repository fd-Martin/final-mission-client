import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import AuthProvider from "./Context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Routes/router.jsx";

const queryclient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryclient}>
    <AuthProvider>
      <RouterProvider router={Router}></RouterProvider>
    </AuthProvider>
  </QueryClientProvider>,
);
