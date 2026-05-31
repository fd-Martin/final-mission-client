import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import { Link } from "react-router";
import {
  FaBook,
  FaCheckCircle,
  FaMoneyCheckAlt,
  FaTimesCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-orders?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(myOrders);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );
  }

  const handlePayment = async (order) => {
    const paymentInfo = {
      bookName: order.bookName,
      orderId: order._id,
      customerEmail: order.customerEmail,
      price: order.price,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-sessions",
      paymentInfo,
    );
    window.location.assign(res.data.url);
  };

  const handleCancel = async (id) => {
    const updateDoc = {
      status: "cancelled",
    };
    const res = await axiosSecure.patch(`/book-orders/${id}`, updateDoc);
    if (res.data.modifiedCount) {
      refetch();
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Your Ordered Has Been Cancelled",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen  md:p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          📦 Order Management
        </h2>
        <p className="text-gray-300 mt-2">
          Track and manage your book orders easily
        </p>
      </div>

      {/* Empty State */}
      {myOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <FaBook className="text-7xl text-secondary mb-4" />
          <p className="text-2xl font-bold text-accent">No Orders Yet</p>
          <Link to="/all-books" className="mt-4 btn btn-secondary btn-outline">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto md:px-4">
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
            <table className="table text-accent">
              <thead className="bg-primary text-white">
                <tr>
                  <th>#</th>
                  <th>Book</th>
                  <th>Order Date</th>
                  <th>Order status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {myOrders.map((order, i) => (
                  <tr key={order._id} className="hover">
                    <th>{i + 1}</th>

                    <td>
                      <Link
                        to={`/book-details/${order.bookId}`}
                        className="font-semibold text-primary hover:underline flex items-center gap-2"
                      >
                        <FaBook />
                        {order?.bookName}
                      </Link>
                    </td>

                    <td className="text-gray-600">
                      {order?.orderDate
                        ? new Date(order.orderDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="text-gray-600">
                      {order?.status?.toUpperCase()}
                    </td>

                    <td className="flex gap-2 justify-center">
                      {order?.paymentStatus === "paid" ? (
                        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-linear-to-r from-green-400 to-green-600 text-white font-bold shadow-lg ">
                          <FaCheckCircle /> Paid
                        </span>
                      ) : order?.status === "cancelled" ? (
                        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-linear-to-r from-red-400 to-red-600 text-white font-bold shadow-lg">
                          <FaTimesCircle /> Cancelled
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleCancel(order._id)}
                            className="btn btn-error btn-sm btn-outline flex items-center gap-1"
                          >
                            <FaTimesCircle /> Cancel
                          </button>

                          <button
                            onClick={() => handlePayment(order)}
                            className="btn btn-success btn-sm flex items-center gap-1"
                          >
                            <FaMoneyCheckAlt /> Pay Now
                          </button>
                        </>
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

export default MyOrders;
