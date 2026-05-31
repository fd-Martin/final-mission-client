// import React from "react";
// import { Outlet } from "react-router";

// const AuthLayout = () => {
//   return (
//     <div className=" w-11/12 mx-auto md:flex items-center justify-center gap-20">
//       <Outlet></Outlet>
//     </div>
//   );
// };

// export default AuthLayout;

import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 w-full flex justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
