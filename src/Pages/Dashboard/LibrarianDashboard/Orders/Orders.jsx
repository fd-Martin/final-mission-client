import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import {
  FaBookOpen,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const Orders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(orders);
  // Loading
  if (isLoading) {
     return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );
  }

  // Change Status
  const handleStatusChange = async (id, newStatus) => {
    const updateData = { status: newStatus };

    axiosSecure.patch(`/orders/${id}`, updateData).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Order ${newStatus}`,
          showConfirmButton: false,
          timer: 1800,
        });

        refetch();
      }
    });
  };

  // Cancel Order
  const handleCancelOrder = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be cancelled",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel",
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/orders/${id}`, {
        status: "cancelled",
      });

      Swal.fire({
        icon: "success",
        title: "Order Cancelled",
        showConfirmButton: false,
        timer: 1800,
      });

      refetch();
    }
  };

  return (
    <div className="min-h-screen px-3 md:px-6 py-8">

      {/* Header */}
      <div className="text-center mb-10">
        <h2
          className="text-4xl md:text-5xl font-extrabold
          bg-gradient-to-r from-primary to-secondary
          bg-clip-text text-transparent"
        >
          Orders Management
        </h2>

        <p className="text-base-content/60 mt-3 text-lg">
          Manage all customer book orders
        </p>

        <div className="mt-5">
          <span className="badge badge-primary badge-lg px-5 py-4 text-white font-bold">
            Total Orders : {orders.length}
          </span>
        </div>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="text-center py-24 bg-base-100 rounded-3xl shadow-xl">
          <FaBookOpen className="mx-auto text-6xl text-gray-300 mb-4" />

          <h2 className="text-3xl font-bold text-gray-400">
            No Orders Found
          </h2>

          <p className="text-gray-400 mt-2">
            Customers orders will appear here
          </p>
        </div>
      ) : (
        <div
          className="max-w-7xl mx-auto
          bg-base-100 rounded-3xl
          shadow-2xl border border-base-300 overflow-hidden"
        >
          <div className="overflow-x-auto">

            {/* TABLE */}
            <table className="table">

              {/* HEAD */}
              <thead
                className="bg-gradient-to-r
                from-primary to-secondary text-white"
              >
                <tr>
                  <th className="py-5">#</th>
                  <th>Book</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="hover:bg-base-200 transition duration-300"
                  >
                    {/* INDEX */}
                    <td className="font-bold text-primary">
                      {index + 1}
                    </td>

                    {/* BOOK */}
                    <td>
                      <div className="flex items-center gap-4">

                        <div className="avatar">
                          <div className="w-14 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                              src={order.bookPhotoURL}
                              alt={order.bookName}
                            />
                          </div>
                        </div>

                        <div>
                          <h2 className="font-bold text-lg">
                            {order.bookName}
                          </h2>

                          <p className="text-sm text-gray-400">
                            Book Order
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CUSTOMER */}
                    <td>
                      <div>
                        <h2 className="font-semibold">
                          {order.customerName}
                        </h2>

                        <p className="text-sm text-gray-400">
                          {order.customerEmail}
                        </p>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td>
                      <div className="flex flex-col gap-2">

                        <span
                          className={`badge badge-lg text-white capitalize
                          ${
                            order.status === "pending"
                              ? "badge-warning"
                              : ""
                          }
                          ${
                            order.status === "shipped"
                              ? "badge-info"
                              : ""
                          }
                          ${
                            order.status === "delivered"
                              ? "badge-success"
                              : ""
                          }
                          ${
                            order.status === "cancelled"
                              ? "badge-error"
                              : ""
                          }
                        `}
                        >
                          {order.status === "pending" && (
                            <FaTruck className="mr-1" />
                          )}

                          {order.status === "shipped" && (
                            <FaTruck className="mr-1" />
                          )}

                          {order.status === "delivered" && (
                            <FaCheckCircle className="mr-1" />
                          )}

                          {order.status === "cancelled" && (
                            <FaTimesCircle className="mr-1" />
                          )}

                          {order.status}
                        </span>

                        {/* STATUS SELECT */}
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order._id,
                              e.target.value
                            )
                          }
                          className="select select-bordered select-sm rounded-xl"
                          disabled={
                            order.status === "delivered" ||
                            order.status === "cancelled"
                          }
                        >
                          <option value={order.status} disabled>
                            Change Status
                          </option>

                          {order.status === "pending" && (
                            <option value="shipped">
                              shipped
                            </option>
                          )}

                          {order.status === "shipped" && (
                            <option value="delivered">
                              delivered
                            </option>
                          )}
                        </select>
                      </div>
                    </td>

                    {/* ACTION */}
                    <td className="text-center">
                      {order.status !== "delivered" &&
                      order.status !== "cancelled" ? (
                        <button
                          onClick={() =>
                            handleCancelOrder(order._id)
                          }
                          className="btn btn-error btn-outline btn-sm rounded-xl hover:scale-105 transition"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-gray-400 italic">
                          No Action
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;