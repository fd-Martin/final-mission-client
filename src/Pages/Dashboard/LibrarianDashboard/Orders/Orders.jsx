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
    enabled: !!user?.email,
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/orders/${id}`, {
        status: newStatus,
      });

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
    } catch (error) {
      console.log(error);
    }
  };

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

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-8 py-8 bg-base-200">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Orders Management
        </h2>

        <p className="mt-4 text-base-content/70 text-lg">
          Manage all customer book orders efficiently
        </p>

        <div className="mt-6">
          <span className="badge badge-primary badge-lg px-6 py-5 text-white font-bold shadow-lg">
            Total Orders: {orders.length}
          </span>
        </div>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="max-w-4xl mx-auto text-center py-24 bg-base-100 rounded-3xl shadow-xl">
          <FaBookOpen className="mx-auto text-7xl text-primary mb-6" />

          <h2 className="text-3xl font-bold text-base-content">
            No Orders Found
          </h2>

          <p className="mt-3 text-base-content/60">
            Customer orders will appear here.
          </p>
        </div>
      ) : (
        <div
          className="
          max-w-7xl
          mx-auto
          bg-base-100/90
          backdrop-blur-lg
          rounded-3xl
          border
          border-base-300
          shadow-[0_20px_50px_rgba(0,0,0,0.08)]
          overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-primary via-secondary to-primary text-white">
                <tr>
                  <th className="py-5">#</th>
                  <th>Book</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="
                    hover:bg-primary/5
                    transition-all
                    duration-300"
                  >
                    {/* Index */}
                    <td className="font-bold text-primary">
                      {index + 1}
                    </td>

                    {/* Book */}
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-16 rounded-2xl shadow-lg ring ring-primary/30 ring-offset-base-100 ring-offset-2">
                            <img
                              src={order.bookPhotoURL}
                              alt={order.bookName}
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <div>
                          <h2 className="font-bold text-lg">
                            {order.bookName}
                          </h2>

                          <p className="text-sm text-base-content/50">
                            Book Order
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Customer */}
                    <td>
                      <div>
                        <h2 className="font-semibold">
                          {order.customerName}
                        </h2>

                        <p className="text-sm text-base-content/60">
                          {order.customerEmail}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <div className="flex flex-col gap-3">
                        <span
                          className={`
                            badge badge-lg text-white capitalize font-semibold px-4 py-4 shadow-md
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

                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order._id,
                              e.target.value
                            )
                          }
                          disabled={
                            order.status === "delivered" ||
                            order.status === "cancelled"
                          }
                          className="
                          select
                          select-bordered
                          select-sm
                          rounded-xl
                          w-full
                          focus:border-primary"
                        >
                          <option value={order.status} disabled>
                            Change Status
                          </option>

                          {order.status === "pending" && (
                            <option value="shipped">
                              Shipped
                            </option>
                          )}

                          {order.status === "shipped" && (
                            <option value="delivered">
                              Delivered
                            </option>
                          )}
                        </select>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="text-center">
                      {order.status !== "delivered" &&
                      order.status !== "cancelled" ? (
                        <button
                          onClick={() =>
                            handleCancelOrder(order._id)
                          }
                          className="
                          btn
                          btn-error
                          btn-sm
                          text-white
                          rounded-xl
                          shadow-md
                          hover:shadow-xl
                          hover:scale-105
                          transition-all"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-base-content/50 italic">
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