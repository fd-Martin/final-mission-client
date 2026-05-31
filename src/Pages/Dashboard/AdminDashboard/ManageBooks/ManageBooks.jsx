import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";

const ManageBooks = () => {
  const [searchText, setSearchText] = useState("");
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["books", searchText],
    refetchInterval: 1000,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-books-admin?searchText=${searchText}`,
      );
      return res.data;
    },
  });

  const handleSearch = (data) => {
    setSearchText(data.search);
    reset();
  };

  const handleUpdateStatus = async (book, newStatus) => {
    const res = await axiosSecure.patch(
      `/books?bookId=${book._id}&newStatus=${newStatus}`,
    );
    if (res.data.modifiedCount) {
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${book.bookName} updated to ${newStatus}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  console.log(books);

  const handleDeleteBook = (book) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this book!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/books/${book._id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${book.bookName} has been deleted`,
              showConfirmButton: false,
              timer: 2000,
            });
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
    <div className="md:p-6 bg-base-100 rounded-2xl shadow-xl min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Books Management
        </h2>
        <span className="badge badge-primary badge-lg mt-3">
          Total: {books.length}
        </span>
      </div>
      <div className="flex justify-center my-8 ">
        <form onSubmit={handleSubmit(handleSearch)}>
          <fieldset className="flex items-center">
            <label
              className="input input-sm md:input-md rounded-l-4xl
  bg-linear-to-r from-primary/10 to-secondary/10
  border border-primary
"
            >
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                placeholder="Search"
                {...register("search", { required: true })}
              />
            </label>
            <button className="btn btn-sm md:btn-md btn-primary font-bold">
              Search
            </button>
          </fieldset>
        </form>
      </div>
      {/* Responsive Table Container */}
      <div className="overflow-x-auto max-w-6xl mx-auto  rounded-xl shadow-2xl">
        <table className="table table-zebra w-full ">
          <thead className="bg-base-200 sticky top-0 z-10">
            <tr className="text-base font-semibold">
              <th>#</th>
              <th>Book</th>
              <th>Author</th>
              <th>Created At</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="hover:bg-base-200 transition-all">
                <th>{index + 1}</th>

                {/* Book Info */}
                <td className="min-w-62.5">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 shadow">
                        <img src={book.bookPhotoURL} alt={book.bookName} />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold text-sm sm:text-base">
                        {book.bookName}
                      </p>
                      <span
                        className={`badge badge-sm ${
                          book.status === "published"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {book.status}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="font-medium">{book.authorName}</td>

                <td className="text-sm opacity-70">
                  {new Date(book.createdAt).toDateString()}
                </td>

                {/* Actions */}
                <td className="text-center">
                  <div className="flex  justify-center items-center gap-2">
                    {book.status === "published" ? (
                      <button
                        onClick={() => handleUpdateStatus(book, "unpublished")}
                        className="btn btn-warning btn-xs md:btn-md flex items-center gap-2"
                      >
                        <FaEyeSlash /> Unpublish
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(book, "published")}
                        className="btn btn-success btn-xs md:btn-md flex items-center gap-2"
                      >
                        <FaEye /> Publish
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteBook(book)}
                      className="btn btn-error btn-xs md:btn-md flex items-center gap-2"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
