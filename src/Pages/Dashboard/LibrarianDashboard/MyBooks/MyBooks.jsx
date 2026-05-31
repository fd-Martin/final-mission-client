import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import { Link } from "react-router";
import { FaEdit, FaBookOpen } from "react-icons/fa";

const MyBooks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["my-books", user?.email],
    enabled: !!user?.email,
    refetchOnWindowFocus: true,
    // refetchInterval: 1000,
    queryFn: async () => {
      const res = await axiosSecure.get(`/books-library?email=${user?.email}`);

      return res.data;
    },
  });

  console.log(books);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-2 md:px-6 py-6">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-extrabold text-primary">
          My Books Collection
        </h2>

        <p className="text-gray-500 mt-2">
          Manage and explore your added books
        </p>
      </div>

      {/* Table Card */}
      <div className="overflow-x-auto bg-base-100 shadow-2xl rounded-3xl border border-base-300">
        <table className="table">
          {/* Head */}
          <thead className="bg-primary text-white">
            <tr>
              <th className="py-4 text-center">#</th>
              <th>Book Cover</th>
              <th>Book Name</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {books.map((book, index) => (
              <tr
                key={book._id}
                className="hover:bg-base-200 transition duration-300"
              >
                {/* Index */}
                <th className="text-center font-bold text-primary">
                  {index + 1}
                </th>

                {/* Image */}
                <td>
                  <div className="avatar">
                    <div className="w-16 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={book.bookPhotoURL} alt={book.bookName} />
                    </div>
                  </div>
                </td>

                {/* Book Name */}
                <td>
                  <Link
                    to={`/book-details/${book._id}`}
                    className="flex items-center gap-2"
                  >
                    <FaBookOpen className="text-secondary text-lg" />

                    <span className="font-bold text-lg hover:text-primary hover:underline transition">
                      {book.bookName}
                    </span>
                  </Link>
                </td>

                {/* Action */}
                <td className="text-center">
                  <Link
                    to={`/dashboard/edit-book/${book?._id}`}
                    className="btn btn-primary btn-sm md:btn-md rounded-xl"
                  >
                    <FaEdit />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {books.length === 0 && (
          <div className="py-16 text-center">
            <h2 className="text-2xl font-bold text-gray-400">No Books Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooks;
