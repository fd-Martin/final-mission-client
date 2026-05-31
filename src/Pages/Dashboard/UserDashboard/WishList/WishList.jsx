import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { Link } from "react-router";

import { FaHeart, FaTrashAlt, FaBookOpen, FaCalendarAlt } from "react-icons/fa";

const WishList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: wishlist = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishList", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-wishlist?email=${user?.email}`);

      return res.data;
    },
  });

  // REMOVE ITEM
  const handleItemRemove = (item) => {
    Swal.fire({
      title: "Remove from Wishlist?",
      text: `${item.bookName} will be removed`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user-wishlist/${item._id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${item.bookName} removed`,
              showConfirmButton: false,
              timer: 1800,
            });

            refetch();
          }
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );

  return (
    <div
      className="min-h-screen
      bg-gradient-to-br from-base-200 via-base-100 to-base-300
      py-10 px-2 md:px-6"
    >
      {/* HEADER */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div
            className="w-20 h-20 rounded-full
            bg-primary/10 flex items-center justify-center"
          >
            <FaHeart className="text-4xl text-primary" />
          </div>
        </div>

        <h2
          className="text-4xl md:text-5xl
          font-extrabold text-primary"
        >
          My Wishlist
        </h2>

        <p className="text-base-content/70 mt-3 text-lg">
          Save your favorite books and explore later
        </p>
      </div>

      {/* WISHLIST CARD */}
      <div
        className="max-w-7xl mx-auto
        bg-base-100 rounded-3xl
        shadow-2xl border border-base-300 overflow-hidden"
      >
        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* TABLE HEAD */}
            <thead
              className="bg-primary text-white
              text-sm md:text-base"
            >
              <tr>
                <th className="py-5 text-center">#</th>
                <th>Book</th>
                <th>Price</th>
                <th>Date Added</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {wishlist.length === 0 ? (
                <tr>
                  <td colSpan="5">
                    <div className="py-20 text-center">
                      <div className="flex justify-center mb-5">
                        <FaHeart className="text-6xl text-gray-300" />
                      </div>

                      <h2 className="text-3xl font-bold text-gray-400">
                        Wishlist Empty
                      </h2>

                      <p className="text-base-content/60 mt-2">
                        Add books to your wishlist
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                wishlist.map((item, i) => (
                  <tr
                    key={item._id}
                    className="hover:bg-base-200 transition duration-300"
                  >
                    {/* INDEX */}
                    <th
                      className="text-center
                      font-bold text-primary"
                    >
                      {i + 1}
                    </th>

                    {/* BOOK */}
                    <td>
                      <div className="flex items-center gap-4">
                        {/* IMAGE */}
                        <div className="avatar">
                          <div
                            className="w-20 rounded-2xl
                            ring ring-primary
                            ring-offset-base-100
                            ring-offset-2 shadow-lg"
                          >
                            <img src={item.bookPhotoURL} alt={item.bookName} />
                          </div>
                        </div>

                        {/* INFO */}
                        <div>
                          <Link
                            to={`/book-details/${item?.bookId}`}
                            className="flex items-center gap-2"
                          >
                            <FaBookOpen className="text-secondary" />

                            <span
                              className="font-bold text-lg
                              hover:text-primary hover:underline
                              transition"
                            >
                              {item.bookName}
                            </span>
                          </Link>

                          <p className="text-sm opacity-70 mt-1">
                            Favorite Book
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* PRICE */}
                    <td>
                      <span
                        className="badge badge-success
                        badge-lg font-bold px-4 py-4"
                      >
                        ৳ {item.price}
                      </span>
                    </td>

                    {/* DATE */}
                    <td>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-primary" />

                        <span className="text-sm">
                          {new Date(item.seenAt).toLocaleString()}
                        </span>
                      </div>
                    </td>

                    {/* ACTION */}
                    <td className="text-center">
                      <button
                        onClick={() => handleItemRemove(item)}
                        className="btn btn-error
                        btn-sm md:btn-md
                        rounded-xl"
                      >
                        <FaTrashAlt />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WishList;
