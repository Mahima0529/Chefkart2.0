import React from "react";
import { Link } from "react-router-dom";

const Carousel2 = () => {
  return (
    <section className="relative w-full min-h-[600px] sm:min-h-[650px] md:min-h-[700px] lg:min-h-screen overflow-hidden">

      {/* Background Image */}
      <div
        className="
          absolute
          inset-0
          w-full
          h-full
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage:
            'url("https://awgprivatechefs.com/wp-content/uploads/2021/05/nsplsh_b86635b484d2489d8e1d23806a8409de-mv2.jpg")',
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Content */}
      <div
        className="
          relative
          z-10
          min-h-[600px]
          sm:min-h-[650px]
          md:min-h-[700px]
          lg:min-h-screen

          flex
          items-center

          px-5
          sm:px-8
          md:px-12
          lg:px-16
        "
      >

        <div
          className="
            w-full
            md:w-2/3
            lg:w-1/2

            max-w-2xl

            text-white

            pt-10
            sm:pt-12
            md:pt-0
          "
        >

          {/* Heading */}
          <h1
            className="
              font-bold
              leading-[1.05]

              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl

              mt-0
            "
          >
            Hire the Best Chef for Party

            <span
              className="
                block
                text-orange-500
                mt-2
              "
            >
              In Delhi-NCR, Bangalore & Mumbai
            </span>
          </h1>


          {/* Description */}
          <p
            className="
              text-xl
              sm:text-2xl
              md:text-3xl

              leading-relaxed

              mt-7
              sm:mt-8
              md:mt-10

              max-w-xl
            "
          >
            Experience the taste from around the world without leaving the
            coziness of home.
          </p>


          {/* Button */}
          <Link to="/chef-search">
            <button
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
              Get Started
            </button>
          </Link>

        </div>

      </div>

    </section>
  );
};

export default Carousel2;