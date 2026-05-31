import React from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.png";
const Logo = () => {
  return (
    <Link to="/">
      <div className="mx-auto flex items-center gap-1  rounded-xl  p-4">
        <img src={logo} alt="" />
      </div>
    </Link>
  );
};

export default Logo;
