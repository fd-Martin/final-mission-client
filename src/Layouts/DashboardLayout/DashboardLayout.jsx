import React, { useState } from "react";

import {
  FaClipboardList,
  FaUsers,
  FaHome,
  FaUserShield,
  FaShoppingBag,
  FaHeart,
  FaBars,
} from "react-icons/fa";

import {
  MdPayments,
  MdManageAccounts,
  MdOutlineLibraryBooks,
} from "react-icons/md";

import { NavLink, Outlet } from "react-router";

import { RiBookShelfFill } from "react-icons/ri";
import { HiMiniBookOpen } from "react-icons/hi2";

import useRole from "../../hooks/useRole";
import ThemeToggle from "../../Components/ThemeToggle/ThemeToggle";

const DashboardLayout = () => {
  const { role } = useRole();

  if (!role) return null;

  return (
    <>
      <>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Navbar */}
            <nav className="navbar w-full bg-base-300">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                {/* Sidebar toggle icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M9 4v16"></path>
                  <path d="M14 10l2 2l-2 2"></path>
                </svg>
              </label>
              <div className="px-4">
                {role === "user" && " User Dashvoard "}
                {role === "librarian" && "Librarian Dashvoard "}
                {role === "admin" && " Admin Dashvoard "}
              </div>
              
            </nav>
            {/* Page content here */}
            <div className="p-4">
              <Outlet></Outlet>
            </div>
          </div>

          <div className="drawer-side is-drawer-close:overflow-visible">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
              {/* Sidebar content here */}

              <ul className="menu w-full grow">
                {/* List item */}
                <li>
                  <NavLink
                    to="/"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Homepage"
                  >
                    {/* Home icon */}
                    <FaHome className="text-lg" />
                    <span className="is-drawer-close:hidden">Homepage</span>
                  </NavLink>
                </li>

                {/* HOME */}

                {/* USER ROUTES */}
                {role === "user" && (
                  <>
                    <li>
                      <NavLink
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="My Orders"
                        to="/dashboard/my-orders"
                      >
                        <FaShoppingBag className="text-lg" />

                        <span className="is-drawer-close:hidden">
                          My Orders
                        </span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Invoices"
                        to="/dashboard/invoices"
                      >
                        <MdPayments className="text-xl" />

                        <span className="is-drawer-close:hidden">Invoices</span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Wishlist"
                        to="/dashboard/wishlist"
                      >
                        <FaHeart className="text-lg" />

                        <span className="is-drawer-close:hidden">Wishlist</span>
                      </NavLink>
                    </li>
                  </>
                )}

                {/* LIBRARIAN ROUTES */}
                {role === "librarian" && (
                  <>
                    <li>
                      <NavLink
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Add Book"
                        to="/dashboard/add-book"
                      >
                        <HiMiniBookOpen className="text-xl" />

                        <span className="is-drawer-close:hidden">Add Book</span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="My Books"
                        to="/dashboard/my-books"
                      >
                        <RiBookShelfFill className="text-xl" />

                        <span className="is-drawer-close:hidden">My Books</span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Orders"
                        to="/dashboard/orders"
                      >
                        <FaClipboardList className="text-lg" />

                        <span className="is-drawer-close:hidden">Orders</span>
                      </NavLink>
                    </li>
                  </>
                )}

                {/* ADMIN ROUTES */}
                {role === "admin" && (
                  <>
                    <li>
                      <NavLink
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="All Users"
                        to="/dashboard/all-users"
                      >
                        <FaUsers className="text-lg" />

                        <span className="is-drawer-close:hidden">
                          All Users
                        </span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Manage Books"
                        to="/dashboard/manage-books"
                      >
                        <MdManageAccounts className="text-xl" />

                        <span className="is-drawer-close:hidden">
                          Manage Books
                        </span>
                      </NavLink>
                    </li>
                  </>
                )}

                {/* PROFILE */}
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Profile"
                    to="/dashboard/my-profile"
                  >
                    <FaUserShield className="text-lg" />

                    <span className="is-drawer-close:hidden">My Profile</span>
                  </NavLink>
                </li>

                <li className="mt-auto mb-5 border">
                  <span
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Day/Night Mode"
                    
                  >
                    <ThemeToggle></ThemeToggle>

                    <span className="is-drawer-close:hidden">Day/Night Mode</span>
                  </span>
                </li>


              </ul>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default DashboardLayout;
