import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../Components/Loading/Loading";
import { FaReceipt } from "react-icons/fa";

const Invoices = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `payments-history?email=${user?.email}`,
      );
      return res.data;
    },
  });

  console.log(paymentHistory);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <div className="mb-10 flex items-center justify-center text-center">
        <div>
          <h2 className=" text-3xl md:text-4xl font-bold  text-black flex items-center gap-3 justify-center">
            <FaReceipt className="text-black" />
            Payment History
          </h2>
          <p className="text-sm font-bold text-black mt-2">
            Total Payments{" "}
            <span className="font-bold text-lg text-primary mx-1">
              {paymentHistory.length}
            </span>
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="max-w-6xl mx-auto md:px-4">
        <div className="rounded-2xl border border-white/10 bg-white  shadow-2xl">
          <div className="overflow-x-auto rounded-2xl">
            <table className="table text-black">
              {/* Table Head */}
              <thead className="bg-primary text-black">
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
                    className="border-b border-white/5  transition"
                  >
                    <th className="font-bold text-black">{i + 1}</th>

                    <td className="font-semibold text-black">
                      {history.bookName}
                    </td>

                    <td>
                      <span className=" border-indigo-400 font-medium  text-black">
                        {history.transactionId}
                      </span>
                    </td>

                    <td className="font-bold text-black">৳ {history.amount}</td>

                    <td className="text-sm text-black">
                      {new Date(history.paidAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paymentHistory.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                No payment records found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
