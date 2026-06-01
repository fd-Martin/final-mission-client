import React from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
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
    return null;
  }

  const averageRating =
    bookReviews.reduce(
      (sum, review) => sum + Number(review.rating || 0),
      0
    ) / bookReviews.length;

  return (
    <section className="mt-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          What Readers Are Saying
        </h2>

        <p className="text-base-content/60 mt-3 text-lg">
          Real feedback from verified readers
        </p>

        <div className="flex justify-center items-center gap-3 mt-5">
          <div className="flex text-warning text-xl">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(averageRating)
                    ? ""
                    : "opacity-30"
                }
              />
            ))}
          </div>

          <span className="font-bold text-lg">
            {averageRating.toFixed(1)}
          </span>

          <span className="text-base-content/60">
            ({bookReviews.length} Reviews)
          </span>
        </div>
      </div>

      {/* Reviews */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
        {bookReviews.map((review) => (
          <div
            key={review._id}
            className="
              min-w-[340px]
              max-w-[340px]
              bg-base-100
              border
              border-base-300
              rounded-3xl
              p-6
              shadow-xl
              hover:-translate-y-2
              hover:shadow-2xl
              transition-all
              duration-300
              flex
              flex-col
            "
          >
            {/* Quote Icon */}
            <div className="mb-4">
              <FaQuoteLeft className="text-primary text-3xl opacity-30" />
            </div>

            {/* Reviewer */}
            <div className="flex items-center gap-4 mb-5">
              <img
                src={
                  review.customerPhotoURL ||
                  "https://i.ibb.co/Tq6D8jW/user.png"
                }
                alt={review.customerName}
                className="
                  w-14
                  h-14
                  rounded-full
                  object-cover
                  ring
                  ring-primary
                  ring-offset-2
                "
              />

              <div>
                <h4 className="font-bold text-lg">
                  {review.customerName}
                </h4>

                <div className="flex gap-1 text-warning mt-1">
                  {Array.from(
                    { length: Number(review.rating) },
                    (_, i) => (
                      <FaStar key={i} />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Comment */}
            <div className="flex-grow">
              <p className="text-base-content/80 leading-7 italic">
                "{review.comment}"
              </p>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-base-300 flex justify-between items-center">
              <span className="badge badge-outline badge-primary">
                Verified Review
              </span>

              {review.createdAt && (
                <span className="text-xs text-base-content/50">
                  {new Date(
                    review.createdAt
                  ).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookReview;