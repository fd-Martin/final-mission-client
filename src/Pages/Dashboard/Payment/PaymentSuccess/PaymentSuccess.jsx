import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`);
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment has been completed
          successfully and your order is now being processed.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/dashboard/my-orders"
            className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            View My Orders
          </Link>

          <Link
            to="/all-books"
            className="px-6 py-2 rounded-lg border border-green-600 text-green-600 font-medium hover:bg-green-50 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
