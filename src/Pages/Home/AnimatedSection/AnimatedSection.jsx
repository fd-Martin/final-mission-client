// import React from "react";
// import { motion } from "framer-motion";

// import {
//   FaUsers,
//   FaBookOpen,
//   FaShoppingCart,
//   FaMoneyCheckAlt,
//   FaHeart,
//   FaComments,
// } from "react-icons/fa";

// const AnimatedSection = ({ allDataCount }) => {
// const statsData = [
//   {
//     id: 1,
//     title: "Total Users",
//     valueKey: "users",
//     icon: <FaUsers size={36} />,
//   },
//   {
//     id: 2,
//     title: "Total Books",
//     valueKey: "books",
//     icon: <FaBookOpen size={36} />,
//   },
//   {
//     id: 3,
//     title: "Total Orders",
//     valueKey: "orders",
//     icon: <FaShoppingCart size={36} />,
//   },
//   {
//     id: 4,
//     title: "Payments",
//     valueKey: "payments",
//     icon: <FaMoneyCheckAlt size={36} />,
//   },
//   {
//     id: 5,
//     title: "Wishlist",
//     valueKey: "wishlist",
//     icon: <FaHeart size={36} />,
//   },
//   {
//     id: 6,
//     title: "Reviews",
//     valueKey: "reviews",
//     icon: <FaComments size={36} />,
//   },
// ];

//   const cardVariants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.8,
//     y: 40,
//   },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 120,
//       damping: 10,
//     },
//   },
// };
//   return (
//     <div className="rounded-xl shadow-2xl p-6">
//       <div className="flex flex-col justify-center items-center  md:p-8">
//         <h2 className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
//           {" "}
//           Platform at a Glance
//         </h2>
//         <p className=" mt-2 font-bold text-accent">
//           {" "}
//           A snapshot of users, books, and activity.
//         </p>
//       </div>
//       <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-8">
//         {statsData.map(({ id, title, valueKey, icon }) => (

//           // <motion.div
//           //   variants={cardVariants}
//           //   initial="hidden"
//           //   whileInView="visible"
//           //   whileHover={{ rotateY: [25, 0], transition: { duration: 0.2 } }}
//           //   viewport={{ once: true, amount: 0.5 }}
//           //   transition={{ duration: 0.2, delay: id * 0.3 }}
//           //   key={id}
//           //   className="stat shadow-lg flex items-center justify-center"
//           // >
//           //   <div>
//           //     <div className="stat-title text-2xl font-bold">{title}</div>
//           //     <div className="stat-value text-primary">
//           //       {allDataCount?.[valueKey] ?? 0}
//           //     </div>
//           //     <div className="stat-desc">Till Now</div>
//           //   </div>
//           //   <div className="text-primary">{icon}</div>
//           // </motion.div>

//           <motion.div
//   key={id}
//   variants={cardVariants}
//   initial="hidden"
//   whileInView="visible"
//   viewport={{ once: true }}
//   transition={{ delay: id * 0.1 }}
//   whileHover={{
//     y: -12,
//     scale: 1.04,
//     transition: { duration: 0.25 },
//   }}
//   className="
//     relative overflow-hidden
//     rounded-3xl
//     bg-base-100
//     shadow-xl
//     border border-base-300
//     p-8
//   "
// ></motion.div>

//         ))}
//       </div>
//       <motion.p
//         variants={cardVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.5 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//         className=" font-bold text-center mb-2 text-accent"
//       >
//         Figures shown for demonstration purposes.
//       </motion.p>
//     </div>
//   );
// };

// export default AnimatedSection;

import React from "react";
import { motion } from "framer-motion";

import {
  FaUserFriends,
  FaBookReader,
  FaShoppingCart,
  FaMoneyCheckAlt,
} from "react-icons/fa";

import { MdFavorite, MdRateReview } from "react-icons/md";

const AnimatedSection = ({ allDataCount }) => {
  const statsData = [
    {
      id: 1,
      title: "Community Members",
      valueKey: "users",
      icon: <FaUserFriends size={45} />,
      color: "text-blue-500",
    },
    {
      id: 2,
      title: "Books Listed",
      valueKey: "books",
      icon: <FaBookReader size={45} />,
      color: "text-purple-500",
    },
    {
      id: 3,
      title: "Orders Delivered",
      valueKey: "orders",
      icon: <FaShoppingCart size={45} />,
      color: "text-green-500",
    },
    {
      id: 4,
      title: "Payments Completed",
      valueKey: "payments",
      icon: <FaMoneyCheckAlt size={45} />,
      color: "text-amber-500",
    },
    {
      id: 5,
      title: "Wishlist Saves",
      valueKey: "wishlist",
      icon: <MdFavorite size={45} />,
      color: "text-pink-500",
    },
    {
      id: 6,
      title: "Reader Reviews",
      valueKey: "reviews",
      icon: <MdRateReview size={45} />,
      color: "text-red-500",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold text-primary">
          Platform Statistics
        </h2>

        <p className="mt-4 text-base md:text-lg text-base-content/70">
          Real-time insights into our growing community and book ecosystem.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statsData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
              type: "spring",
              stiffness: 120,
            }}
            whileHover={{
              y: -10,
              scale: 1.04,
              transition: { duration: 0.2 },
            }}
            className="
              bg-base-100
              border
              border-base-300
              rounded-3xl
              p-6
              shadow-xl
              hover:shadow-2xl
              transition-all
              duration-300
              relative
              overflow-hidden
            "
          >
            {/* Floating Background Circle */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              className="
                absolute
                -top-8
                -right-8
                w-28
                h-28
                rounded-full
                bg-primary/10
              "
            />

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                }}
                className={`${item.color} mb-4`}
              >
                {item.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-base-content">
                {item.title}
              </h3>

              {/* Number */}
              <motion.h2
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: index * 0.15 + 0.2,
                  type: "spring",
                  stiffness: 180,
                }}
                className="text-4xl md:text-5xl font-extrabold text-primary mt-3"
              >
                {allDataCount?.[item.valueKey] || 0}
              </motion.h2>

              <p className="mt-2 text-sm text-base-content/60">
                Updated Statistics
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      ></motion.div>
    </section>
  );
};

export default AnimatedSection;
