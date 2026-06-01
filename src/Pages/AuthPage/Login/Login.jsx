import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data,e) => {
      e.preventDefault();
    setLoading(true);
    signInUser(data.email, data.password)
      .then(() => {
        navigate(location.state || "/");
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${err.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
        setLoading(false);
      });
  };

  return (
    <div className="card w-full max-w-md shrink-0 backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl text-white p-10">
    <h1 className="text-5xl font-bold text-center text-white">
  Welcome Back
</h1>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label text-white font-semibold">
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
            <label className="label text-white font-semibold">
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-500 font-semibold">Password is required</p>
            )}
            {errors.password && (
              <p className="text-red-500 font-semibold">
                Password should be one uppercase, one lowercase, one special
                character and must be 6 digit
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary mt-4">
              {loading && (
                <span className=" animate-spin">
                  <AiOutlineLoading3Quarters />
                </span>
              )}{" "}
              Login
            </button>
          </fieldset>
        </form>
        <p>
          Didn't have an account?
          <Link state={location.state} to="/auth/register">
            <span className="text-secondary text-xl font-bold">Register</span>
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
