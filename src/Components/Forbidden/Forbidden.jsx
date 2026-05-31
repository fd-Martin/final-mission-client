import Lottie from "lottie-react";
import React from "react";
import forbiddenAnimation from "./forbidden.json";
const Forbidden = () => {
  return (
    <div className="max-w-lg mx-auto p-8">
      <h2 className="text-4xl font-bold text-red-500">Forbidden Access</h2>
      <Lottie animationData={forbiddenAnimation} loop={true} />
    </div>
  );
};

export default Forbidden;
