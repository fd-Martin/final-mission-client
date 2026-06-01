// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../../hooks/useAuth";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import Loading from "../../../../Components/Loading/Loading";
// import { Link } from "react-router";
// import {
//   FaBook,
//   FaCheckCircle,
//   FaMoneyCheckAlt,
//   FaTimesCircle,
// } from "react-icons/fa";
// import Swal from "sweetalert2";

// const MyOrders = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: myOrders = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["my-orders", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/my-orders?email=${user?.email}`);
//       return res.data;
//     },
//   });
//   console.log(myOrders);

//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
//         <Loading />
//       </div>
//     );
//   }

//   const handlePayment = async (order) => {
//     const paymentInfo = {
//       bookName: order.bookName,
//       orderId: order._id,
//       customerEmail: order.customerEmail,
//       price: order.price,
//     };
//     const res = await axiosSecure.post(
//       "/payment-checkout-sessions",
//       paymentInfo,
//     );
//     window.location.assign(res.data.url);
//   };

//   const handleCancel = async (id) => {
//     const updateDoc = {
//       status: "cancelled",
//     };
//     const res = await axiosSecure.patch(`/book-orders/${id}`, updateDoc);
//     if (res.data.modifiedCount) {
//       refetch();
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: "Your Ordered Has Been Cancelled",
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen  md:p-6">
//       {/* Header */}
//       <div className="text-center mb-10">
//         <h2 className="text-3xl md:text-4xl font-bold text-white">
//           📦 Order Management
//         </h2>
//         <p className="text-gray-300 mt-2">
//           Track and manage your book orders easily
//         </p>
//       </div>

//       {/* Empty State */}
//       {myOrders.length === 0 ? (
//         <div className="flex flex-col items-center justify-center mt-20">
//           <FaBook className="text-7xl text-secondary mb-4" />
//           <p className="text-2xl font-bold text-accent">No Orders Yet</p>
//           <Link to="/all-books" className="mt-4 btn btn-secondary btn-outline">
//             Browse Books
//           </Link>
//         </div>
//       ) : (
//         <div className="max-w-6xl mx-auto md:px-4">
//           <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
//             <table className="table text-accent">
//               <thead className="bg-primary text-white">
//                 <tr>
//                   <th>#</th>
//                   <th>Book</th>
//                   <th>Order Date</th>
//                   <th>Order status</th>
//                   <th className="text-center">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {myOrders.map((order, i) => (
//                   <tr key={order._id} className="hover">
//                     <th>{i + 1}</th>

//                     <td>
//                       <Link
//                         to={`/book-details/${order.bookId}`}
//                         className="font-semibold text-primary hover:underline flex items-center gap-2"
//                       >
//                         <FaBook />
//                         {order?.bookName}
//                       </Link>
//                     </td>

//                     <td className="text-gray-600">
//                       {order?.orderDate
//                         ? new Date(order.orderDate).toLocaleDateString()
//                         : "N/A"}
//                     </td>
//                     <td className="text-gray-600">
//                       {order?.status?.toUpperCase()}
//                     </td>

//                     <td className="flex gap-2 justify-center">
//                       {order?.paymentStatus === "paid" ? (
//                         <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-linear-to-r from-green-400 to-green-600 text-white font-bold shadow-lg ">
//                           <FaCheckCircle /> Paid
//                         </span>
//                       ) : order?.status === "cancelled" ? (
//                         <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-linear-to-r from-red-400 to-red-600 text-white font-bold shadow-lg">
//                           <FaTimesCircle /> Cancelled
//                         </span>
//                       ) : (
//                         <>
//                           <button
//                             onClick={() => handleCancel(order._id)}
//                             className="btn btn-error btn-sm btn-outline flex items-center gap-1"
//                           >
//                             <FaTimesCircle /> Cancel
//                           </button>

//                           <button
//                             onClick={() => handlePayment(order)}
//                             className="btn btn-success btn-sm flex items-center gap-1"
//                           >
//                             <FaMoneyCheckAlt /> Pay Now
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;



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
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-orders?email=${user?.email}`);
      return res.data;
    },
  });

  const handlePayment = async (order) => {
    const paymentInfo = {
      bookName: order.bookName,
      orderId: order._id,
      customerEmail: order.customerEmail,
      price: order.price,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-sessions",
      paymentInfo
    );

    window.location.assign(res.data.url);
  };

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Order?",
      text: "You won't be able to undo this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Cancel",
    });

    if (!result.isConfirmed) return;

    const updateDoc = {
      status: "cancelled",
    };

    const res = await axiosSecure.patch(
      `/book-orders/${id}`,
      updateDoc
    );

    if (res.data.modifiedCount) {
      refetch();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Order Cancelled Successfully",
        showConfirmButton: false,
        timer: 1800,
      });
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
    <div className="min-h-screen bg-base-200 px-4 md:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          My Orders
        </h2>

        <p className="text-base-content/70 mt-3 text-lg">
          Track and manage your book orders easily
        </p>

        <div className="mt-5">
          <span className="badge badge-primary badge-lg px-6 py-4 text-white font-bold">
            Total Orders: {myOrders.length}
          </span>
        </div>
      </div>

      {/* Empty State */}
      {myOrders.length === 0 ? (
        <div className="max-w-lg mx-auto bg-base-100 rounded-3xl shadow-xl py-20 px-6 text-center">
          <FaBook className="mx-auto text-7xl text-primary mb-6" />

          <h2 className="text-3xl font-bold text-base-content">
            No Orders Yet
          </h2>

          <p className="text-base-content/60 mt-3">
            Start exploring books and place your first order.
          </p>

          <Link
            to="/all-books"
            className="btn btn-primary rounded-xl mt-6"
          >
            Browse Books
          </Link>
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
            overflow-hidden
          "
        >
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* Head */}
              <thead className="bg-gradient-to-r from-primary via-secondary to-primary text-white">
                <tr>
                  <th>#</th>
                  <th>Book</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="text-base-content">
                {myOrders.map((order, i) => (
                  <tr
                    key={order._id}
                    className="hover:bg-primary/5 transition-all duration-300"
                  >
                    {/* Index */}
                    <td className="font-bold text-primary">
                      {i + 1}
                    </td>

                    {/* Book */}
                    <td>
                      <Link
                        to={`/book-details/${order.bookId}`}
                        className="
                          font-semibold
                          text-primary
                          hover:text-secondary
                          hover:underline
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <FaBook />
                        {order.bookName}
                      </Link>
                    </td>

                    {/* Date */}
                    <td className="font-medium text-base-content/70">
                      {order?.orderDate
                        ? new Date(
                            order.orderDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`
                          badge
                          badge-lg
                          capitalize
                          text-white
                          font-semibold
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
                        {order.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex justify-center gap-2 flex-wrap">
                        {order?.paymentStatus === "paid" ? (
                          <span
                            className="
                              badge
                              badge-success
                              badge-lg
                              text-white
                              font-bold
                              px-4
                              py-4
                            "
                          >
                            <FaCheckCircle />
                            Paid
                          </span>
                        ) : order?.status === "cancelled" ? (
                          <span
                            className="
                              badge
                              badge-error
                              badge-lg
                              text-white
                              font-bold
                              px-4
                              py-4
                            "
                          >
                            <FaTimesCircle />
                            Cancelled
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                handleCancel(order._id)
                              }
                              className="
                                btn
                                btn-error
                                btn-outline
                                btn-sm
                                rounded-xl
                                hover:scale-105
                                transition-all
                              "
                            >
                              <FaTimesCircle />
                              Cancel
                            </button>

                            <button
                              onClick={() =>
                                handlePayment(order)
                              }
                              className="
                                btn
                                btn-success
                                btn-sm
                                rounded-xl
                                text-white
                                shadow-md
                                hover:scale-105
                                transition-all
                              "
                            >
                              <FaMoneyCheckAlt />
                              Pay Now
                            </button>
                          </>
                        )}
                      </div>
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