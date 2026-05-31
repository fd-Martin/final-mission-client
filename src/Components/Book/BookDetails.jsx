import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import BookReview from "./BookReview";
import useRole from "../../hooks/useRole";

const BookDetails = () => {
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const navigate = useNavigate();
  const orderRef = useRef(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { role } = useRole();

  // const { data: book = {}, isLoading } = useQuery({
  //   queryKey: ["book-details", id, reviewSubmitted],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/book-details/${id}`);
  //     return res?.data;
  //   },
  // });

  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book-details", id, reviewSubmitted],
    queryFn: async () => {
      const res = await axiosSecure.get(`/book-details/${id}`);
      return res?.data;
    },
  });

  const { data: reviewPermission, refetch } = useQuery({
    queryKey: ["book-orders", id],
    enabled: !!book._id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/book-review-permission/${id}`);
      return res.data;
    },
  });
  console.log(book, reviewPermission);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { register: reviewRegister, handleSubmit: handleReviewSubmit } =
    useForm();

  const handleConfirmOrder = (data) => {
    const orderInfo = {
      bookId: book._id,
      bookName: book.bookName,
      bookPhotoURL: book.bookPhotoURL,
      bookAuthorEmail: book.authorEmail,
      price: book.price,
      customerName: data.name,
      customerEmail: data.email,
      customerPhoneNumbers: data.phoneNumber,
      customerAddress: data.address,
    };
    axiosSecure
      .post("/book-orders", orderInfo)
      .then((res) => {
        if (res.data.insertedId) {
          navigate("/dashboard/my-orders");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Awesome Choice!",
            text: `You’ve just ordered a great read! Please Pay ${book.price}`,
            showConfirmButton: false,
            timer: 2000,
          });
          orderRef.current?.close();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleWishList = (data) => {
    const desiredBook = {
      bookName: data.bookName,
      bookId: data._id,
      price: book.price,
      bookPhotoURL: book.bookPhotoURL,
    };
    axiosSecure
      .post("/user-wishlist", desiredBook)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${book.bookName} has been added on Wishlist`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          Swal.fire({
            position: "center",
            icon: "info",
            html: `<span class="text-red-500 font-semibold">${book.bookName} is already in wishlist</span>`,
            showConfirmButton: false,
            timer: 3000,
            customClass: {
              popup: "bg-red-100 border border-red-500 p-4 rounded-lg",
            },
          });
        }
      });
  };

  const handleSubmitReview = (data) => {
    const reviewInfo = {
      bookId: book?._id,
      customerName: user?.displayName,
      customerEmail: user?.email,
      customerPhotoURL: user?.photoURL,
      comment: data.comment,
      rating: data.rating,
    };
    axiosSecure.post("/book-review", reviewInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Thank you for your review`,
          showConfirmButton: false,
          timer: 2000,
        });
        setReviewSubmitted(true);
        refetch();
      }
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );
  }

  if (!book || !book._id) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-error">
          Book Not Found
        </h1>

        <p className="mt-4 text-lg text-gray-500">
          The book you're looking for doesn't exist or has been removed.
        </p>

        <Link to="/all-books" className="btn btn-primary mt-6">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* Main Card */}
      <div className="grid lg:grid-cols-2 gap-12  rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side */}
        <div className="p-6">
          <img
            src={book?.bookPhotoURL}
            alt={book?.bookName}
            className="w-full h-[650px] object-cover rounded-2xl shadow-xl hover:scale-[1.02] duration-300"
          />

          {reviewPermission?.canReview && !reviewSubmitted && (
            <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-lg border">
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">
                Write Your Review
              </h3>

              <form onSubmit={handleReviewSubmit(handleSubmitReview)}>
                <textarea
                  className="textarea textarea-bordered w-full min-h-32 bg-white"
                  placeholder="Write your review..."
                  {...reviewRegister("comment", { required: true })}
                />

                <select
                  className="select select-bordered w-full mt-4 bg-white"
                  {...reviewRegister("rating", { required: true })}
                >
                  <option value="">Select Rating</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="1">⭐</option>
                </select>

                <button className="btn btn-primary w-full mt-5 rounded-xl">
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="p-8 flex flex-col">
          <h1 className="text-3xl md:text-5xl font-extrabold text-indigo-700 mt-6">
            {book?.bookName}
          </h1>
          <p className="text-gray-700 leading-8 text-lg">{book?.description}</p>

          <div className="flex justify-between items-center mt-8 border-y py-6">
            <h2 className="text-4xl font-bold text-pink-600">
              ৳ {book?.price}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => orderRef.current.showModal()}
              className={`btn rounded-xl ${
                role === "user"
                  ? "btn-primary"
                  : "btn-disabled cursor-not-allowed"
              }`}
            >
              <FaShoppingCart />
              Order Now
            </button>

            <button
              onClick={() => handleWishList(book)}
              className={`btn rounded-xl ${
                role === "user"
                  ? "btn btn-outline btn-secondary rounded-xl"
                  : "btn-disabled cursor-not-allowed"
              }`}
            >
              <FaHeart />
              Wishlist
            </button>
          </div>

          <div className="mt-8  rounded-2xl p-5 space-y-3 text-gray-600">
            <p className="flex items-center gap-2 mt-4 text-gray-600 text-lg">
              <FaUser />
              <span className="font-semibold">Author:</span>
              {book?.authorName}
            </p>

            <p>
              📧 <strong>Email:</strong> {book?.authorEmail}
            </p>

            <p>
              📞 <strong>Phone:</strong> {book?.authorPhoneNumber}
            </p>

            <p>
              🕒 <strong>Published:</strong>{" "}
              {new Date(book?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <BookReview bookId={id} />
      </div>

      {/* Modal */}
      <dialog ref={orderRef} className="modal">
        <div className="modal-box">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Confirm Order
          </h2>

          <form onSubmit={handleSubmit(handleConfirmOrder)}>
            <div className="space-y-4">
              <input
                type="text"
                className="input input-bordered w-full"
                defaultValue={user?.displayName}
                readOnly
                {...register("name")}
              />

              <input
                type="email"
                className="input input-bordered w-full"
                defaultValue={user?.email}
                readOnly
                {...register("email")}
              />

              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Phone Number"
                {...register("phoneNumber", { required: true })}
              />

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Address"
                {...register("address", { required: true })}
              />

              <button className="btn btn-primary w-full">Place Order</button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default BookDetails;
