import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaRocket,
  FaGlobe,
  FaShieldAlt,
  FaAward,
  FaTags,
  FaLeaf,
} from "react-icons/fa";

const WhyChoose = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const cards = [
    {
      icon: <FaRocket className="text-4xl text-white" />,
      title: "Lightning Fast Delivery",
      desc: "Get your favorite books delivered quickly and safely. Our efficient delivery network ensures your orders arrive on time, every time.",
      bg: "bg-purple-600",
    },
    {
      icon: <FaGlobe className="text-4xl text-white" />,
      title: "Books From Every Genre",
      desc: "Explore thousands of books including fiction, non-fiction, academic resources, self-development, technology, and more.",
      bg: "bg-sky-600",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-white" />,
      title: "Safe & Protected Transactions",
      desc: "Every payment is secured with trusted payment gateways, giving you a worry-free shopping experience from start to finish.",
      bg: "bg-red-600",
    },
    {
      icon: <FaAward className="text-4xl text-white" />,
      title: "Top-Rated Service",
      desc: "Recognized by readers for outstanding customer support, quality service, and a seamless online book-buying experience.",
      bg: "bg-orange-500",
    },
    {
      icon: <FaTags className="text-4xl text-white" />,
      title: "Best Deals & Discounts",
      desc: "Enjoy exclusive offers, seasonal sales, and budget-friendly prices that make reading more accessible for everyone.",
      bg: "bg-emerald-600",
    },
    {
      icon: <FaLeaf className="text-4xl text-white" />,
      title: "Sustainable Book Delivery",
      desc: "We care about the environment by using recyclable packaging materials and reducing unnecessary waste wherever possible.",
      bg: "bg-teal-600",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-center ">
        <h2 className="text-3xl md:text-5xl font-extrabold bg-linear-to-r text-primary">
          Why Choose BookCourier?
        </h2>
        <p className="my-3  text-accent font-bold">
          More than just a bookstore — we deliver knowledge with care.
        </p>
      </div>

      <div
        className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  "
        initial="hidden"
        animate="visible"
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-2xl p-4 text-center bg-linear-to-br ${card.bg} shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group`}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></div>
            <div className="flex justify-center mb-4 relative z-10">
              <div
                className="bg-white/20 p-4 rounded-full backdrop-blur-md"
                data-aos="fade-down"
              >
                {card.icon}
              </div>
            </div>
            <h3
              className="text-xl font-bold text-white mb-3 relative z-10"
              data-aos="fade-left"
            >
              {card.title}
            </h3>
            <p
              className="text-white/90 text-sm leading-relaxed relative z-10"
              data-aos="fade-right"
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;
