// import React from "react";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../../hooks/useAuth";
// import Loading from "../../../../Components/Loading/Loading";
// import { FaReceipt } from "react-icons/fa";

// const Invoices = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const { data: paymentHistory = [], isLoading } = useQuery({
//     queryKey: ["payment-history", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `payments-history?email=${user?.email}`,
//       );
//       return res.data;
//     },
//   });

//   console.log(paymentHistory);

//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12">
//       {/* Header */}
//       <div className="mb-10 flex items-center justify-center text-center">
//         <div>
//           <h2 className=" text-3xl md:text-4xl font-bold  text-black flex items-center gap-3 justify-center">
//             <FaReceipt className="text-black" />
//             Payment History
//           </h2>
//           <p className="text-sm font-bold text-black mt-2">
//             Total Payments{" "}
//             <span className="font-bold text-lg text-primary mx-1">
//               {paymentHistory.length}
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* Card */}
//       <div className="max-w-6xl mx-auto md:px-4">
//         <div className="rounded-2xl border border-white/10 bg-white  shadow-2xl">
//           <div className="overflow-x-auto rounded-2xl">
//             <table className="table text-black">
//               {/* Table Head */}
//               <thead className="bg-primary text-black">
//                 <tr>
//                   <th>#</th>
//                   <th>Book</th>
//                   <th>Transaction ID</th>
//                   <th>Amount</th>
//                   <th>Paid At</th>
//                 </tr>
//               </thead>

//               {/* Table Body */}
//               <tbody>
//                 {paymentHistory.map((history, i) => (
//                   <tr
//                     key={history._id}
//                     className="border-b border-white/5  transition"
//                   >
//                     <th className="font-bold text-black">{i + 1}</th>

//                     <td className="font-semibold text-black">
//                       {history.bookName}
//                     </td>

//                     <td>
//                       <span className=" border-indigo-400 font-medium  text-black">
//                         {history.transactionId}
//                       </span>
//                     </td>

//                     <td className="font-bold text-black">৳ {history.amount}</td>

//                     <td className="text-sm text-black">
//                       {new Date(history.paidAt).toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {paymentHistory.length === 0 && (
//               <div className="text-center py-12 text-slate-400">
//                 No payment records found.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Invoices;



import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../Components/Loading/Loading";
import {
  FaReceipt,
  FaMoneyBillWave,
  FaBook,
} from "react-icons/fa";

const Invoices = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments-history?email=${user?.email}`
      );
      return res.data;
    },
  });

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
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-2xl bg-primary/10">
            <FaReceipt className="text-4xl text-primary" />
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Payment History
        </h2>

        <p className="mt-3 text-base-content/70 text-lg">
          View all your completed transactions
        </p>

        <div className="mt-5">
          <span className="badge badge-primary badge-lg px-6 py-4 text-white font-bold">
            Total Payments: {paymentHistory.length}
          </span>
        </div>
      </div>

      {/* Empty State */}
      {paymentHistory.length === 0 ? (
        <div className="max-w-lg mx-auto bg-base-100 rounded-3xl shadow-xl py-20 px-6 text-center">
          <FaMoneyBillWave className="mx-auto text-7xl text-primary mb-6" />

          <h2 className="text-3xl font-bold text-base-content">
            No Payment Records
          </h2>

          <p className="text-base-content/60 mt-3">
            Your payment history will appear here after successful purchases.
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
            overflow-hidden
          "
        >
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* Table Head */}
              <thead className="bg-gradient-to-r from-primary via-secondary to-primary text-white">
                <tr>
                  <th>#</th>
                  <th>Book</th>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Paid At</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {paymentHistory.map((history, i) => (
                  <tr
                    key={history._id}
                    className="hover:bg-primary/5 transition-all duration-300"
                  >
                    {/* Index */}
                    <td className="font-bold text-primary">
                      {i + 1}
                    </td>

                    {/* Book */}
                    <td>
                      <div className="flex items-center gap-2 font-semibold">
                        <FaBook className="text-primary" />
                        {history.bookName}
                      </div>
                    </td>

                    {/* Transaction ID */}
                    <td>
                      <span className="font-mono text-sm bg-base-200 px-3 py-2 rounded-lg border border-base-300">
                        {history.transactionId}
                      </span>
                    </td>

                    {/* Amount */}
                    <td>
                      <span className="badge badge-success badge-lg text-white font-bold">
                        ৳ {history.amount}
                      </span>
                    </td>

                    {/* Paid Date */}
                    <td className="text-base-content/70">
                      {new Date(history.paidAt).toLocaleString()}
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

export default Invoices;
