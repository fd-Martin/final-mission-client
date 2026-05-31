import React from "react";
import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Register from "../Pages/AuthPage/Register/Register";
import Login from "../Pages/AuthPage/Login/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import MyProfile from "../Pages/Dashboard/UserDashboard/MyProfile/MyProfile";
import MyOrders from "../Pages/Dashboard/UserDashboard/MyOrders/MyOrders";
import Invoices from "../Pages/Dashboard/UserDashboard/Invoices/Invoices";
import LibrarianRoute from "./LibrarianRoute/LibrarianRoute";
import AddBook from "../Pages/Dashboard/LibrarianDashboard/AddBook/AddBook";
import MyBooks from "../Pages/Dashboard/LibrarianDashboard/MyBooks/MyBooks";
import Orders from "../Pages/Dashboard/LibrarianDashboard/Orders/Orders";
import AdminRoute from "./AdminRoute/AdminRoute";
import AllUsers from "../Pages/Dashboard/AdminDashboard/AllUsers/AllUsers";
import ManageBooks from "../Pages/Dashboard/AdminDashboard/ManageBooks/ManageBooks";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import AllBooks from "../Pages/AllBooks/AllBooks";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancel/PaymentCancel";
import WishList from "../Pages/Dashboard/UserDashboard/WishList/WishList";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import BookDetails from "../Components/Book/BookDetails";
import BookEdited from "../Components/Book/BookEdited";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-books",
        Component: AllBooks,
      },
      {
        path: "book-details/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "my-orders",
        Component: MyOrders,
      },
      {
        path: "invoices",
        Component: Invoices,
      },
      {
        path: "add-book",
        element: (
          <LibrarianRoute>
            <AddBook></AddBook>
          </LibrarianRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <LibrarianRoute>
            <MyBooks></MyBooks>
          </LibrarianRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <LibrarianRoute>
            <BookEdited></BookEdited>
          </LibrarianRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <LibrarianRoute>
            <Orders></Orders>
          </LibrarianRoute>
        ),
      },

      // admin

      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooks></ManageBooks>
          </AdminRoute>
        ),
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "wishlist",
        Component: WishList,
      },
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
]);

export default Router;
