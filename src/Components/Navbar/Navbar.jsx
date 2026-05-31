import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";

import Logo from "../Logo/Logo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Navbar = () => {
  const { user, signOutUser, loading } = useAuth();
  const { role } = useRole();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `
            px-3 py-2 rounded-xl
            font-semibold transition-all duration-300
            ${
              isActive
                ? "bg-primary text-white"
                : "hover:text-primary hover:bg-primary/10"
            }
          `
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/all-books"
          className={({ isActive }) =>
            `
            px-3 py-2 rounded-xl
            font-semibold transition-all duration-300
            ${
              isActive
                ? "bg-primary text-white"
                : "hover:text-primary hover:bg-primary/10"
            }
          `
          }
        >
          All Books
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to={
              role === "admin"
                ? "/dashboard/all-users"
                : role === "librarian"
                  ? "/dashboard/my-books"
                  : "/dashboard/my-orders"
            }
            className={({ isActive }) =>
              `
              px-3 py-2 rounded-xl
              font-semibold transition-all duration-300
              ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:text-primary hover:bg-primary/10"
              }
            `
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm md:px-4 lg:px-16 py-2 flex justify-between items-center mx-auto max-w-7xl">
      {/* NAVBAR START */}
      <div className="navbar-start">
        {/* MOBILE MENU */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="
              menu menu-sm dropdown-content
              mt-3 z-[100]
              p-3 shadow-2xl
              bg-base-100 rounded-2xl
              w-60 space-y-2
            "
          >
            {links}

            {/* MOBILE USER */}
            {user ? (
              <>
                <div
                  className="
                    flex items-center gap-3
                    px-2 py-2 mt-2
                  "
                >
                  <img
                    src={user?.photoURL || "https://i.ibb.co/2kR5zqC/user.png"}
                    alt="user"
                    className="
                      w-12 h-12 rounded-full
                      object-cover border-2 border-primary
                    "
                  />

                  <div>
                    <h3 className="font-bold">{user?.displayName || "User"}</h3>

                    <p className="text-xs opacity-70">{user?.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className=" 
                    btn btn-primary btn-sm
                    rounded-full w-full
                  "
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="
                    btn btn-primary btn-sm
                    rounded-full w-full
                  "
                >
                  Login
                </Link>

                <Link
                  to="/auth/register"
                  className="
                    btn btn-outline btn-primary btn-sm
                    rounded-full w-full
                  "
                >
                  Register
                </Link>
              </>
            )}
          </ul>
        </div>

        {/* LOGO */}
        <span className="hidden lg:flex w-36 ">
          <Logo />
        </span>
      </div>

      {/* NAVBAR CENTER */}
      <div className="navbar-center  lg:flex">
        <span className="flex lg:hidden w-24 ">
          <Logo />
        </span>
        <ul className="menu menu-horizontal hidden lg:flex  gap-2">{links}</ul>
      </div>

      {/* NAVBAR END */}
      <div className="navbar-end flex items-center gap-3">
        <ThemeToggle />

        {loading ? (
          <div className="hidden md:flex items-center gap-2">
            <div className="skeleton w-10 h-10 rounded-full"></div>
            <div className="skeleton w-20 h-4 rounded"></div>
          </div>
        ) : user ? (
          <>
            {/* USER AVATAR */}
            <div className="hidden md:block">
              <img
                src={user?.photoURL || "https://i.ibb.co/2kR5zqC/user.png"}
                alt="user"
                className="
                  w-11 h-11 rounded-full
                  border-2 border-primary
                  object-cover cursor-pointer
                  shadow-md
                "
                data-tooltip-id="avatar-tooltip"
                data-tooltip-content={user?.displayName || "User"}
                data-tooltip-place="bottom"
              />

              <Tooltip id="avatar-tooltip" className="z-50" />
            </div>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleSignOut}
              className="
                btn btn-xs md:btn-md
                btn-primary rounded-full  hidden md:block
              "
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* LOGIN */}
            <Link to="/auth/login" className="hidden md:flex">
              <span
                className="
                  btn btn-xs md:btn-md
                  btn-primary rounded-full
                "
              >
                Login
              </span>
            </Link>

            {/* REGISTER */}
            <Link to="/auth/register" className="hidden md:flex">
              <span
                whileHover={{
                  rotateX: 15,
                  rotateY: 10,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.25)",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="
                  btn btn-xs md:btn-md
                  btn-outline btn-primary
                  rounded-full
                "
              >
                Register
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
