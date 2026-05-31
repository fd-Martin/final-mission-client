import React from "react";
import { Link } from "react-router";

const Book = ({ book }) => {
  return (
    <div
      className="card bg-base-100 w-full max-w-sm
      shadow-2xl hover:shadow-2xl
      transition-all duration-300"
    >
      {/* 3D Image */}
      <div className="flex justify-center pt-6">
        <div className="hover-3d">
          <figure className="w-46 md:w-60  h-46 md:h-60  rounded-2xl overflow-hidden">
            <img
              src={book?.bookPhotoURL}
              alt={book?.bookName}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </figure>

          {/* Required 8 divs for DaisyUI 3D Effect */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <h2 className="card-title line-clamp-1">
          Book Name : {book?.bookName}
        </h2>

        <p className="text-lg font-bold text-primary">
          Book Price : ৳{book?.price}
        </p>

        <div className="mt-3">
          <Link to={`/book-details/${book?._id}`}>
            {/* <button className="btn w-full btn-primary rounded-xl"> */}
            <button className="btn btn-primary btn-block text-center w-full">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Book;
