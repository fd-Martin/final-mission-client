import React from "react";
import authAnimation from "./Login.json";
import Lottie from "lottie-react";

const AuthAnimation = () => {
  return (
    <div className="flex justify-center ">
      <Lottie animationData={authAnimation} loop={true} />
    </div>
  );
};

export default AuthAnimation;
