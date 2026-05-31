import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../../Components/Loading/Loading";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=user");
      return res.data;
    },
  });

  const handleSetUserRole = (user, status) => {
    const newRole = { role: status };
    axiosSecure.patch(`/users/${user?._id}`, newRole).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.displayName} has been promoted as ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          All Registered Members
        </h2>
        <p className="mt-2 text-gray-500">
          Manage and review all user accounts
        </p>
      </div>
      {/* Table Card */}
      <div className="max-w-6xl mx-auto md:px-4">
        <div className="overflow-x-auto rounded-2xl shadow-2xl bg-base-100">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Joined At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {allUsers.map((user, i) => (
                <tr
                  key={user?._id || i}
                  className="hover:bg-base-200/60 transition-all duration-200"
                >
                  <td className="font-bold">{i + 1}</td>

                  {/* User Info */}
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle h-14 w-14 ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={user?.photoURL} alt={user?.displayName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">
                          {user?.displayName}
                        </div>
                        <div className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-semibold">
                          {user?.role}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="text-gray-600">{user?.email}</td>

                  {/* Date */}
                  <td className="text-accent font-medium">
                    {new Date(user?.createdAt).toDateString()}
                  </td>

                  {/* Actions */}
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleSetUserRole(user, "admin")}
                        className="btn btn-xs md:btn-md btn-outline btn-primary"
                      >
                        Make Admin
                      </button>
                      <button
                        onClick={() => handleSetUserRole(user, "librarian")}
                        className="btn btn-xs md:btn-md btn-outline btn-secondary"
                      >
                        Make Librarian
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
