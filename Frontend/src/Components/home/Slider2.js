import React from "react";
import { Link } from "react-router-dom";

const Carousel2 = () => {
  return (
    <div className="relative w-full min-h-[600px] sm:min-h-[650px] md:min-h-[700px] lg:h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FWebsite_Homepage_banner_01_9ec160c34d.webp&w=3840&q=75")',
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Content */}
      <div className="relative z-10 w-full min-h-[600px] sm:min-h-[650px] md:min-h-[700px] lg:min-h-screen flex items-center px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="w-full md:w-2/3 lg:w-1/2 max-w-2xl text-white">
          
          <h1
            className="
              font-bold
              leading-[1.05]
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Most Trusted Platform for At-Home Cooking Services
          </h1>

          <p
            className="
              text-orange-500
              font-bold
              text-xl
              sm:text-2xl
              md:text-3xl
              mt-7
              sm:mt-8
              md:mt-10
            "
          >
            Find your perfect cook
          </p>

          <Link to="/chef-search">
            <button
              type="button"
              className="
                bg-orange-500
                hover:bg-orange-600
                text-white
                font-bold
                text-base
                sm:text-lg
                md:text-xl
                px-7
                sm:px-8
                md:px-10
                py-3
                sm:py-4
                rounded-lg
                mt-7
                sm:mt-8
                shadow-lg
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              Find Your Cook Now
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Carousel2;