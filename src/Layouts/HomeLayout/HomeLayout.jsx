import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Components/Footer/Footer";
import { Toaster } from "react-hot-toast";
const HomeLayout = () => {
  return (
      <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto w-full ">
        <Outlet></Outlet>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
