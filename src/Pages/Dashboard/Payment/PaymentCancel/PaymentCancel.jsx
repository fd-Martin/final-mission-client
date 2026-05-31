import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <FaTimesCircle className="text-red-500 text-7xl mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was not completed. You can try again anytime.
        </p>

        <Link
          to="/all-books"
          className="px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
        >
          Go Back to Books
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelled;
