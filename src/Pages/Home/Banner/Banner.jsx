import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router";


const Banner = ({ books }) => {
  const navigate = useNavigate();
  console.log(books);
  return (
    <div className="w-full h-[400px] md:h-[65vh]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="h-full"
      >
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src={book.bookPhotoURL}
                alt={book.bookName}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center text-white px-6 md:px-20 z-10 text-center md:text-left">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold opacity-0 animate-fadeSlideDown">
                  {book.bookName}
                </h2>

                <p className="mt-4 max-w-2xl text-sm md:text-lg opacity-0 animate-fadeSlideUp delay-200">
                  {book.description}
                </p>

                <div
                  className="mt-6 flex gap-4 opacity-0 animate-fadeSlideUp delay-300 
            flex-col sm:flex-row w-full text-sm "
                >
                  <button
                    onClick={() => navigate("/all-books")}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl 
               font-semibold shadow-lg w-1/2 mx-auto md:mx-0 sm:w-auto text-center"
                  >
                    See All Books
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Animations */}
      <style>
        {`
        .animate-fadeSlideDown {
          animation: fadeSlideDown 1s ease forwards;
        }

        @keyframes fadeSlideDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeSlideUp {
          animation: fadeSlideUp 1.2s ease forwards;
        }

        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
};

export default Banner;
