import React from "react";
import { Link } from "react-router";

import Book from "../../../Components/Book/Book";

const LatestBook = ({ books }) => {
  return (
    <div className="p-6  shadow-2xl  rounded-xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl  md:text-5xl font-extrabold  text-primary">
          Explore Our Latest Books
        </h2>
        <p className="mt-2 text-accent font-bold">
          Discover the newest books added to our collection
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center gap-6">
        {books.map((book, i) => (
          <Book key={book._id} book={book} delay={i * 0.3}></Book>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Link to={"/all-books"}>
          <span className="btn btn-xs md:btn-md btn-primary">All Books</span>
        </Link>
      </div>
    </div>
  );
};

export default LatestBook;
