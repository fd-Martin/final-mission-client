import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";
import Swal from "sweetalert2";
import {
  FaUserEdit,
  FaCamera,
  FaEnvelope,
  FaUserShield,
  FaClock,
  FaIdCard,
  FaEdit,
} from "react-icons/fa";
import { MdVerified, MdDangerous } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loading from "../../../../Components/Loading/Loading";

const MyProfile = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, updateUserProfile } = useAuth();
  const { role, roleLoading } = useRole();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // UPDATE PROFILE
  const handleUpdateProfile = async (data) => {
    try {
      setLoading(true);

      let photoURL = user?.photoURL;

      // Upload image if selected
      if (data.photo?.[0]) {
        const profilePic = data.photo[0];

        const formData = new FormData();
        formData.append("image", profilePic);

        const image_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_img_host_key
        }`;

        const res = await axios.post(image_Api_Url, formData);

        photoURL = res.data.data.url;
      }

      const updateData = {
        displayName: data.displayName,
        photoURL,
      };

      await updateUserProfile(updateData);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile Updated Successfully",
        showConfirmButton: false,
        timer: 1800,
      });

      setIsModalOpen(false);
      setLoading(false);
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong",
      });

      setLoading(false);
    }
  };

  // LOADING
  if (loading || roleLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-10 px-4">
      {/* MAIN CARD */}

      {/* TOP SECTION */}
      <div
        className="grid grid-cols-1 lg:grid-cols-3
  gap-8 items-start
  
  rounded-3xl p-8"
      >
        {/* PROFILE IMAGE */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative group">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-64 h-64
        rounded-3xl
        object-cover
        border-4 border-white
        shadow-2xl
        transition duration-300
        group-hover:scale-105"
            />

            {/* EDIT ICON */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-4 right-4
        bg-primary text-white
        p-4 rounded-2xl
        shadow-xl
        hover:scale-110 transition"
            >
              <FaEdit className="text-xl" />
            </button>
          </div>
        </div>
        {/* USER INFO */}
        <div className="lg:col-span-2">
          <div
            className="grid grid-cols-1 md:grid-cols-2
      gap-6"
          >
            {/* FULL NAME */}
            <div className="bg-base-100 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <FaUserShield className="text-3xl text-primary" />

                <h3 className="text-xl font-bold">Full Name</h3>
              </div>

              <p className="mt-4 text-xl font-semibold">
                {user?.displayName || "Unknown User"}
              </p>
            </div>

            {/* LAST LOGIN */}
            <div className="bg-base-200 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <FaClock className="text-3xl text-primary" />

                <h3 className="text-xl font-bold">Last Login</h3>
              </div>

              <p className="mt-4 text-sm">
                {new Date(
                  Number(user?.reloadUserInfo?.lastLoginAt),
                ).toLocaleString()}
              </p>
            </div>

            {/* ACCOUNT CREATED */}
            <div className="bg-base-200 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <FaClock className="text-3xl text-primary" />

                <h3 className="text-xl font-bold">Account Created</h3>
              </div>

              <p className="mt-4 text-sm">
                {new Date(
                  Number(user?.reloadUserInfo?.createdAt),
                ).toLocaleString()}
              </p>
            </div>

            {/* EMAIL */}
            <div className="bg-base-100 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-3xl text-primary" />

                <h3 className="text-xl font-bold">Email Address</h3>
              </div>

              <p className="mt-4 break-all text-sm opacity-80">{user?.email}</p>
            </div>

            {/* ROLE */}
            <div className="bg-base-100 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <FaUserShield className="text-3xl text-primary" />

                <h3 className="text-xl font-bold">User Role</h3>
              </div>

              <div className="mt-4">
                <span
                  className="badge badge-primary
            badge-lg capitalize"
                >
                  {role}
                </span>
              </div>
            </div>

            {/* EMAIL VERIFICATION */}
            <div className="bg-base-100 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                {user?.emailVerified ? (
                  <MdVerified className="text-3xl text-success" />
                ) : (
                  <MdDangerous className="text-3xl text-error" />
                )}

                <h3 className="text-xl font-bold">Verification</h3>
              </div>

              <div className="mt-4">
                {user?.emailVerified ? (
                  <span className="badge badge-success badge-lg">Verified</span>
                ) : (
                  <span className="badge badge-error badge-lg">
                    Not Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UPDATE PROFILE MODAL */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl rounded-3xl">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            >
              ✕
            </button>

            {/* TITLE */}
            <div className="text-center mb-8">
              <h2
                className="text-3xl md:text-4xl
                font-extrabold
                bg-gradient-to-r from-primary to-secondary
                bg-clip-text text-transparent"
              >
                Update Your Profile
              </h2>

              <p className="text-base-content/60 mt-2">
                Keep your information updated
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="space-y-6"
            >
              {/* NAME */}
              <div>
                <label className="font-bold text-primary text-lg">
                  Full Name
                </label>

                <input
                  type="text"
                  defaultValue={user?.displayName}
                  placeholder="Enter your name"
                  className="input input-bordered
                  w-full mt-3 rounded-2xl"
                  {...register("displayName", {
                    required: true,
                  })}
                />

                {errors.displayName && (
                  <p className="text-error mt-2">Name is required</p>
                )}
              </div>

              {/* PHOTO */}
              <div>
                <label
                  className="font-bold text-primary
                  text-lg flex items-center gap-2"
                >
                  <FaUserEdit />
                  Upload New Photo
                </label>

                <input
                  type="file"
                  className="file-input
                  file-input-bordered
                  w-full mt-3 rounded-2xl"
                  {...register("photo")}
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="btn btn-primary
                w-full rounded-2xl
                text-lg shadow-lg"
              >
                <FaUserEdit />
                Save Changes
              </button>
            </form>
          </div>

          {/* BACKDROP */}
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyProfile;
