import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading/Loading";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";
import useAxios from "../../../hooks/useAxios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosGeneral = useAxios();
  const { createUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    setLoading(true);
    const profileImg = data.photo[0];
    createUser(data.email, data.password)
      .then(() => {
        //store the profile img
        const formData = new FormData();
        formData.append("image", profileImg);

        //get the url
        const image_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_img_host_key
        }`;

        axios.post(image_Api_Url, formData).then((res) => {
          const photo = res.data.data.url;

          //update profile
          const userProfile = {
            displayName: data.name,
            photoURL: photo,
          };

          updateUserProfile(userProfile).then(() => {
            const user = {
              displayName: data.name,
              photoURL: photo,
              email: data.email,
            };
            axiosGeneral.post("/users", user).then((res) => {
              if (res.data.insertedId) {
                navigate("/");
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Registered Successfullly",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setLoading(false);
              }
            });
          });
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    // console.log(data);
  };

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );

  return (
    <div className="card w-full max-w-md shrink-0 backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl text-white p-10">
      <h1 className="text-5xl font-bold text-center text-white">
        Create Account
      </h1>
      <div className="card-body p-10">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset">
            {/* name */}
            <label className="label text-primary md:text-xl font-bold">
              Name
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-white/20 text-white placeholder:text-gray-300"
              placeholder="Your Name"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 font-semibold">Name is required</p>
            )}
            {/* photo */}
            <label className="label text-primary md:text-xl font-bold">
              Photo
            </label>
            <input
              type="file"
              className="input input-bordered w-full bg-white/20 text-white placeholder:text-gray-300"
              {...register("photo", { required: true })}
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500 font-semibold">Photo is required</p>
            )}
            {/* email */}
            <label className="label text-primary md:text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full bg-white/20 text-white placeholder:text-gray-300"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 font-semibold">Email is required</p>
            )}
            {/* password */}
            <label className="label text-primary md:text-xl font-bold">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full bg-white/20 text-white placeholder:text-gray-300"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 font-semibold">
                Password should be one uppercase, one lowercase, one special
                character and must be 6 digit
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary mt-4">Register</button>
          </fieldset>
        </form>
        <p>
          Already have an account?
          <Link to="/auth/login">
            <span className="text-secondary text-xl font-bold"> Login</span>
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
