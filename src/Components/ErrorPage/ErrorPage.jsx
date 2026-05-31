import React from "react";
import { Link } from "react-router";
import errorImg from "../../assets/error.png";
const Errorpage = () => {
  return (
    <div>
      <div className="text-center my-10">
        <img src={errorImg} alt="" className="mx-auto" />
        <h2 className="text-5xl font-semibold text-black mb-4">
          OPPS!! page not found!
        </h2>
        <p className="mb-6">The page you are looking for is not available.</p>
        <Link
          to="/"
          className="btn bg-blue-600 text-white text-[16px] px-8 py-2"
        >
          Go Back!
        </Link>
      </div>
    </div>
  );
};

export default Errorpage;
