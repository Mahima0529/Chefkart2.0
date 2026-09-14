import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FloatingBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`
        fixed
        bottom-0
        left-0
        right-0
        z-[9999]

        bg-gray-100
        shadow-[0_-4px_15px_rgba(0,0,0,0.15)]

        transition-transform
        duration-300

        ${isVisible ? "translate-y-0" : "translate-y-full"}
      `}
    >
      <div
        className="
          w-full
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
          md:px-8

          py-3
          sm:py-4

          flex
          flex-col
          sm:flex-row

          items-center
          justify-between

          gap-2
          sm:gap-5
        "
      >

        {/* TEXT */}

        <p
          className="
            text-gray-700
            font-medium

            text-center
            sm:text-left

            text-xs
            sm:text-sm
            md:text-base
            lg:text-lg

            leading-snug

            w-full
            sm:flex-1
          "
        >
          Hungry for instant delights? Book your Chefit now and get
          in-home cooked meal!!
        </p>


        {/* BUTTON */}

        <Link to="/chef-search">
          <button
            className="
              bg-orange-500
              hover:bg-orange-600

              text-white

              px-5
              py-2

              sm:px-6
              sm:py-2.5

              rounded-lg

              font-bold

              text-sm
              sm:text-base

              whitespace-nowrap

              flex-shrink-0
              transition
            "
          >
            Book Now
          </button>
        </Link>

      </div>
    </div>
  );
};

export default FloatingBanner;