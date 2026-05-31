import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Book from "../../Components/Book/Book";
import Loading from "../../Components/Loading/Loading";

const AllBooks = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const limit = 8;
  const axiosGeneral = useAxios();
  const { data, isLoading } = useQuery({
    queryKey: ["all-books", searchText, currentPage],
    queryFn: async () => {
      const res = await axiosGeneral.get(
        `/all-books?status=published&limit=${limit}&skip=${
          currentPage * limit
        }&searchText=${searchText}`,
      );
      return res.data;
    },
  });

  const allBooks = data?.books ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(e.target.search.value);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto">
      <div>
        <h2 className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent my-10 text-center">
          Discover Your Favorite Books
        </h2>
      </div>
      <div className="flex justify-center my-8 ">
        <form onSubmit={handleSearch} className="flex items-center">
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
            <input type="search" name="search" placeholder="Search" />
          </label>
          <button className="btn btn-sm md:btn-md btn-primary rounded-r-4xl">
            Search
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-8">
        {allBooks.map((book, i) => (
          <Book key={book._id} book={book} delay={i * 0.3}></Book>
        ))}
      </div>
      <div className="flex justify-center flex-wrap gap-2 p-6">
        {currentPage > 0 && (
          <button
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            className="btn px-5"
          >
            Prev
          </button>
        )}
        {[
          ...Array(totalPages)
            .keys()
            .map((i) => (
              <button
                onClick={() => {
                  setCurrentPage(i);
                }}
                key={i}
                className={`btn px-5 ${currentPage === i && "btn-primary"}`}
              >
                {i + 1}
              </button>
            )),
        ]}
        {currentPage < totalPages - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn px-5"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
