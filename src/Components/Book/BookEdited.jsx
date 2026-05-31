import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import axios from "axios";
import Swal from "sweetalert2";
import { IoBookSharp } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";

const BookEdited = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  const { data: selectedBook = {}, isLoading } = useQuery({
    queryKey: ["selected-book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/selected-book/${id}`);
      return res.data;
    },
  });

  const handleEditBook = async (data) => {
    try {
      setLoading(true);

      let photoUrl = selectedBook.bookPhotoURL;

      // Upload new image if selected
      if (data.bookPhoto?.[0]) {
        const image = data.bookPhoto[0];

        const formData = new FormData();
        formData.append("image", image);

        const Image_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_img_host_key
        }`;

        const imageRes = await axios.post(Image_Api_Url, formData);

        photoUrl = imageRes.data.data.url;
      }

      const updatedBook = {
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        authorPhoneNumber: data.authorPhoneNumber,
        bookName: data.bookName,
        bookPhotoURL: photoUrl,
        address: data.address,
        status: data.status,
        price: data.price,
        description: data.description,
      };

      const res = await axiosSecure.patch(`/book-details/${id}`, updatedBook);

      if (res.data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Book Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });

        navigate("/dashboard/my-books");
      }

      setLoading(false);
    } catch (err) {
      console.log(err);

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 2000,
      });

      setLoading(false);
    }
  };

  if (isLoading || loading) {
    return;

    <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
      <Loading />
    </div>;
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary to-primary p-10 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Edit Your Book
          </h2>

          <p className="text-white/80 mt-3 text-lg">
            Update your book information easily
          </p>
        </div>

        {/* Form */}
        <div className="p-6 md:p-10">
          <form onSubmit={handleSubmit(handleEditBook)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* LEFT SIDE */}
              <div className="space-y-5">
                {/* Author Name */}
                <div>
                  <label className="font-bold text-primary">Author Name</label>

                  <input
                    type="text"
                    defaultValue={selectedBook.authorName}
                    readOnly
                    className="input input-bordered w-full mt-2 rounded-2xl"
                    {...register("authorName", { required: true })}
                  />
                </div>

                {/* Author Email */}
                <div>
                  <label className="font-bold text-primary">Author Email</label>

                  <input
                    type="email"
                    defaultValue={selectedBook.authorEmail}
                    readOnly
                    className="input input-bordered w-full mt-2 rounded-2xl"
                    {...register("authorEmail", { required: true })}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="font-bold text-primary">Phone Number</label>

                  <input
                    type="number"
                    defaultValue={selectedBook.authorPhoneNumber}
                    placeholder="Enter phone number"
                    className="input input-bordered w-full mt-2 rounded-2xl"
                    {...register("authorPhoneNumber", {
                      required: true,
                    })}
                  />

                  {errors.authorPhoneNumber && (
                    <p className="text-red-500 mt-1">
                      Phone number is required
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="font-bold text-primary">Address</label>

                  <input
                    type="text"
                    defaultValue={selectedBook.address}
                    placeholder="Enter address"
                    className="input input-bordered w-full mt-2 rounded-2xl"
                    {...register("address", { required: true })}
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="font-bold text-primary">Book Price</label>

                  <input
                    type="number"
                    defaultValue={selectedBook.price}
                    placeholder="Enter price"
                    className="input input-bordered w-full mt-2 rounded-2xl"
                    {...register("price", { required: true })}
                  />
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-5">
                {/* Book Name */}
                <div>
                  <label className="font-bold text-primary">Book Name</label>

                  <input
                    type="text"
                    defaultValue={selectedBook.bookName}
                    placeholder="Enter book name"
                    className="input input-bordered w-full mt-2 rounded-2xl"
                    {...register("bookName", { required: true })}
                  />
                </div>

                {/* Book Image */}
                <div>
                  <label className="font-bold text-primary flex items-center gap-2">
                    <FaCloudUploadAlt />
                    Upload New Image
                  </label>

                  <input
                    type="file"
                    className="file-input file-input-bordered w-full mt-2 rounded-2xl"
                    {...register("bookPhoto")}
                  />

                  {/* Preview */}
                  <div className="mt-4">
                    <img
                      src={selectedBook.bookPhotoURL}
                      alt="Book"
                      className="w-28 h-36 object-cover rounded-2xl border"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="font-bold text-primary">Book Status</label>

                  <select
                    defaultValue={selectedBook.status}
                    className="select select-bordered w-full mt-2 rounded-2xl"
                    {...register("status", { required: true })}
                  >
                    <option>published</option>
                    <option>unpublished</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="font-bold text-primary">Description</label>

                  <textarea
                    defaultValue={selectedBook.description}
                    className="textarea textarea-bordered h-40 w-full mt-2 rounded-2xl"
                    placeholder="Write description..."
                    {...register("description", { required: true })}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="text-center mt-10">
              <button
                type="submit"
                className="btn btn-secondary px-12 rounded-2xl text-lg shadow-lg hover:scale-105 transition-all duration-300"
              >
                <IoBookSharp className="text-2xl" />
                Update Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookEdited;
