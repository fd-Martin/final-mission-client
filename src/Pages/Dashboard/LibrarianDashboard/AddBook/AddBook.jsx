import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { IoBookSharp } from "react-icons/io5";
import Loading from "../../../../Components/Loading/Loading";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddBook = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddBook = (data) => {
    setLoading(true);

    const bookImg = data.bookPhoto[0];

    const formData = new FormData();
    formData.append("image", bookImg);

    const Img_Api_Url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_img_host_key
    }`;

    axios
      .post(Img_Api_Url, formData)
      .then((res) => {
        const bookPhotoURL = res.data.data.url;

        const bookInfo = {
          authorName: data.authorName,
          authorEmail: data.authorEmail,
          authorPhoneNumber: data.authorPhoneNumber,
          bookName: data.bookName,
          bookPhotoURL,
          address: data.address,
          status: data.status,
          price: data.price,
          description: data.description,
        };

        axiosSecure.post("/books", bookInfo).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Book Added Successfully",
              showConfirmButton: false,
              timer: 1800,
            });

            navigate("/dashboard/my-books");
            setLoading(false);
          }
        });
      })
      .catch(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-10 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Add New Book
          </h2>

          <p className="text-white/80 mt-3">
            Upload and publish your favorite books
          </p>
        </div>

        {/* Form */}
        <div className="p-6 md:p-10">
          <form onSubmit={handleSubmit(handleAddBook)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* LEFT */}
              <div className="space-y-5">
                <div>
                  <label className="font-bold text-primary">Author Name</label>

                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    readOnly
                    className="input input-bordered w-full mt-2 rounded-2xl"
                    {...register("authorName", { required: true })}
                  />
                </div>

                <div>
                  <label className="font-bold text-primary">Author Email</label>

                  <input
                    type="email"
                    defaultValue={user?.email}
                    readOnly
                    className="input input-bordered w-full mt-2 rounded-2xl"
                    {...register("authorEmail", { required: true })}
                  />
                </div>

                <div>
                  <label className="font-bold text-primary">Phone Number</label>

                  <input
                    type="number"
                    placeholder="Enter phone number"
                    className="input input-bordered w-full mt-2 rounded-2xl"
                    {...register("authorPhoneNumber", { required: true })}
                  />

                  {errors.authorPhoneNumber && (
                    <p className="text-red-500 mt-1">Phone number required</p>
                  )}
                </div>

                <div>
                  <label className="font-bold text-primary">Address</label>

                  <input
                    type="text"
                    placeholder="Enter address"
                    className="input input-bordered w-full mt-2 rounded-2xl"
                    {...register("address", { required: true })}
                  />
                </div>

                <div>
                  <label className="font-bold text-primary">Book Price</label>

                  <input
                    type="number"
                    placeholder="Enter book price"
                    className="input input-bordered w-full mt-2 rounded-2xl"
                    {...register("price", { required: true })}
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-5">
                <div>
                  <label className="font-bold text-primary">Book Name</label>

                  <input
                    type="text"
                    placeholder="Enter book name"
                    className="input input-bordered w-full mt-2 rounded-2xl"
                    {...register("bookName", { required: true })}
                  />
                </div>

                <div>
                  <label className="font-bold text-primary flex items-center gap-2">
                    <FaCloudUploadAlt />
                    Upload Book Image
                  </label>

                  <input
                    type="file"
                    className="file-input file-input-bordered w-full mt-2 rounded-2xl"
                    {...register("bookPhoto", { required: true })}
                  />
                </div>

                <div>
                  <label className="font-bold text-primary">Book Status</label>

                  <select
                    className="select select-bordered w-full mt-2 rounded-2xl"
                    {...register("status", { required: true })}
                  >
                    <option>published</option>
                    <option>unpublished</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-primary">Description</label>

                  <textarea
                    className="textarea textarea-bordered h-40 w-full mt-2 rounded-2xl"
                    placeholder="Write book description..."
                    {...register("description", { required: true })}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="text-center mt-10">
              <button className="btn btn-primary px-12 rounded-2xl text-lg shadow-lg hover:scale-105 transition-all duration-300">
                <IoBookSharp className="text-2xl" />
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
