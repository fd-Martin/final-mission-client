import React from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import Loading from "../Loading/Loading";

const BookReview = ({ bookId }) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: bookReviews = [],
    isLoading,
    
  } = useQuery({
    queryKey: ["book-reviews", bookId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/book-review/${bookId}`);
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

  if (bookReviews.length === 0) {
    return "";
  }

  return (
   <div className="p-6 rounded-xl shadow-2xl ">
  <h2 className="text-2xl text-secondary font-bold my-3">
    What Readers Are Saying
  </h2>

  <div className="flex gap-4 overflow-x-auto scrollbar-hide py-4">
    {bookReviews.map((review) => (
      <div
        key={review._id}
        className="min-w-75 bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 shrink-0"
      >
        {/* Reviewer info */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={review.customerPhotoURL || "/default-user.png"}
            alt={review.customerName}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-300"
          />
          <div>
            <h4 className="font-bold text-gray-800">{review.customerName}</h4>
            <div className="flex items-center text-yellow-400">
              {Array.from({ length: review.rating }, (_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Review comment */}
        <p className="text-gray-700 text-sm leading-relaxed">
          {review.comment}
        </p>

        {/* Date */}
        {review.createdAt && (
          <p className="text-gray-400 text-xs mt-3">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
    ))}
  </div>
</div>

  );
};

export default BookReview;
