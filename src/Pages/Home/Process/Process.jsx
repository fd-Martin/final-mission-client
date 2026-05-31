import React from "react";
import { motion } from "framer-motion";
import {
  FaBookReader,
  FaCartPlus,
  FaCreditCard,
  FaShippingFast,
} from "react-icons/fa";
import { NavLink } from "react-router";
const processSteps = [
  {
    id: "01",
    title: "Discover Your Next Read",
    description:
      "Browse thousands of books across various genres, from bestsellers and classics to educational and self-development titles.",
    icon: <FaBookReader size={30} />,
    bg: "bg-blue-600",
  },
  {
    id: "02",
    title: "Add to Cart",
    description:
      "Select your favorite books, save them to your wishlist, or add them directly to your cart for a seamless shopping experience.",
    icon: <FaCartPlus size={30} />,
    bg: "bg-purple-600",
  },
  {
    id: "03",
    title: "Secure Checkout",
    description:
      "Pay confidently through our encrypted payment system that ensures every transaction remains safe and protected.",
    icon: <FaCreditCard size={30} />,
    bg: "bg-emerald-600",
  },
  {
    id: "04",
    title: "Doorstep Delivery",
    description:
      "Relax while BookCourier quickly delivers your books to your doorstep with careful packaging and order tracking.",
    icon: <FaShippingFast size={30} />,
    bg: "bg-orange-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 60,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const Process = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Heading */}
      <div className="text-center mb-16">
        <span className="badge badge-primary badge-lg mb-4">HOW IT WORKS</span>

        <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
          Simple Ordering Process
        </h2>

        <p className="max-w-2xl mx-auto text-base-content/70 text-lg">
          From discovering books to receiving them at your doorstep, BookCourier
          makes every step smooth, secure, and enjoyable.
        </p>
      </div>

      {/* Process Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
      >
        {processSteps.map((step) => (
          <motion.div
            key={step.id}
            variants={cardVariants}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className="relative rounded-3xl bg-base-100 shadow-xl border border-base-300 p-8 overflow-hidden"
          >
            {/* Step Number */}
            <div className="absolute top-4 right-4 text-6xl font-black opacity-10">
              {step.id}
            </div>

            {/* Icon */}
            <div
              className={`${step.bg} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6`}
            >
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>

            {/* Description */}
            <p className="text-base-content/70 leading-relaxed">
              {step.description}
            </p>

            {/* Bottom Line */}
            <div className={`h-1 w-full mt-8 rounded-full ${step.bg}`}></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-20 text-center"
      >
        <h3 className="text-3xl font-bold mb-4">Ready to Start Reading?</h3>

        <p className="text-base-content/70 max-w-xl mx-auto mb-6">
          Explore thousands of books and enjoy a seamless delivery experience
          with BookCourier.
        </p>
        <NavLink to="/all-books">
          <button className="btn btn-primary btn-lg rounded-full px-10">
            Browse Books
          </button>
        </NavLink>
      </motion.div>
    </section>
  );
};

export default Process;
