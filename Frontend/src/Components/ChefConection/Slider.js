import React, { useRef } from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-10">

        {/* Heading */}
        <h1
          className="
            text-center
            font-bold
            text-black
            text-4xl
            sm:text-5xl
            md:text-6xl
            leading-tight
            mb-8
            sm:mb-10
          "
        >
          एक प्रमुख पहल
        </h1>

        {/* Slider */}
        <div className="relative w-full">

          <Slider ref={sliderRef} {...settings}>

            <div className="px-2 sm:px-3">
              <img
                src="/Slider1.png"
                alt="Slide 1"
                className="
                  w-full
                  h-auto
                  object-contain
                  rounded-lg
                "
              />
            </div>

            <div className="px-2 sm:px-3">
              <img
                src="/Slider2.png"
                alt="Slide 2"
                className="
                  w-full
                  h-auto
                  object-contain
                  rounded-lg
                "
              />
            </div>

            <div className="px-2 sm:px-3">
              <img
                src="/Slider3.png"
                alt="Slide 3"
                className="
                  w-full
                  h-auto
                  object-contain
                  rounded-lg
                "
              />
            </div>

            <div className="px-2 sm:px-3">
              <img
                src="/Slider4.png"
                alt="Slide 4"
                className="
                  w-full
                  h-auto
                  object-contain
                  rounded-lg
                "
              />
            </div>

          </Slider>


          {/* Previous Arrow */}
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            aria-label="Previous slide"
            className="
              absolute
              left-1
              sm:left-2
              md:left-3

              top-1/2
              -translate-y-1/2

              z-10

              w-8
              h-8
              sm:w-9
              sm:h-9
              md:w-10
              md:h-10

              rounded-full

              bg-black/60
              hover:bg-black/80

              text-white

              text-xl
              sm:text-2xl

              flex
              items-center
              justify-center

              transition-all
              duration-200

              shadow-md
            "
          >
            ‹
          </button>


          {/* Next Arrow */}
          <button
            onClick={() => sliderRef.current?.slickNext()}
            aria-label="Next slide"
            className="
              absolute
              right-1
              sm:right-2
              md:right-3

              top-1/2
              -translate-y-1/2

              z-10

              w-8
              h-8
              sm:w-9
              sm:h-9
              md:w-10
              md:h-10

              rounded-full

              bg-black/60
              hover:bg-black/80

              text-white

              text-xl
              sm:text-2xl

              flex
              items-center
              justify-center

              transition-all
              duration-200

              shadow-md
            "
          >
            ›
          </button>

        </div>

      </div>
    </section>
  );
}