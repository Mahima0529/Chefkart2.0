import React, { useEffect, useState } from "react";

const FloatingBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Scroll behavior
  useEffect(() => {
    if (!isDesktop) return;

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
  }, [lastScrollY, isDesktop]);

  // DO NOT RENDER ON MOBILE / TABLET
  if (!isDesktop) {
    return null;
  }

  return (
    <div
      className={`
        fixed
        bottom-0
        left-0
        right-0
        z-[9999]

        bg-gray-100
        shadow-lg

        transition-transform
        duration-300

        ${
          isVisible
            ? "translate-y-0"
            : "translate-y-full"
        }
      `}
    >
      <div
        className="
          w-full
          max-w-7xl
          mx-auto

          px-5
          md:px-8

          py-4
          md:py-5

          flex
          items-center
          justify-between

          gap-6
        "
      >

        {/* Text */}
        <p
          className="
            text-gray-700
            font-medium

            text-base
            lg:text-lg

            leading-relaxed

            flex-1
          "
        >
          Hungry for instant delights? Book your Chefit now and get
          in-home cooked meal!!
        </p>

        {/* Button */}
        <button
          className="
            bg-orange-500
            hover:bg-orange-600

            text-white

            px-7
            py-3

            rounded-lg

            font-bold
            text-lg

            flex-shrink-0

            transition
          "
        >
          Book Now
        </button>

      </div>
    </div>
  );
};

export default FloatingBanner;