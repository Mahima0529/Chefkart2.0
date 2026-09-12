import React, { useState } from "react";
import Slider from "react-slick";

const GalleryWithState = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedIndex, setZoomedIndex] = useState(0);

  const images = [
    "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_08_852bd73dec.png",
    "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_05_56785e7856.png",
    "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_03_980b84a7ff.png",
    "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_24_9f0f37936a.png",
    "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_22_6032e4cfba.png",
    "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_09_40fd87e1bd.png",
    "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_20_fb2b9b8032.png",
    "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_17_c2beda679c.png",
    "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_08_852bd73dec.png",
    "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_04_24e9f6a36d.png",
    "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_25_6ed7e4df8e.png",
    "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2Frezize_3by2_21_c77b00e93e.png&w=640&q=75",
  ];

  /* ================= SLIDER SETTINGS ================= */

  const settings = {
    dots: false,
    arrows: true,

    infinite: true,

    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,

    slidesToScroll: 1,

    // DESKTOP
    slidesToShow: 3,

    centerMode: false,

    draggable: true,
    swipe: true,
    swipeToSlide: true,

    pauseOnHover: true,

    responsive: [
      {
        // TABLET
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },

      {
        // MOBILE
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          arrows: true,
        },
      },
    ],
  };

  /* ================= OPEN ZOOM ================= */

  const handleZoom = (index) => {
    setZoomedIndex(index);
    setIsZoomed(true);
  };

  /* ================= NEXT ================= */

  const handleNextZoom = () => {
    setZoomedIndex(
      (prev) => (prev + 1) % images.length
    );
  };

  /* ================= PREVIOUS ================= */

  const handlePrevZoom = () => {
    setZoomedIndex(
      (prev) =>
        (prev - 1 + images.length) % images.length
    );
  };

  return (
    <section className="w-full bg-[#f1f1f1] py-10 sm:py-12 md:py-16 overflow-hidden">

      {/* ================= CONTAINER ================= */}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* ================= HEADING ================= */}

        <h1
          className="
            text-center
            text-black
            font-bold
            text-3xl
            sm:text-4xl
            md:text-5xl
            mb-8
            sm:mb-10
            md:mb-12
          "
        >
          Gallery
        </h1>


        {/* ================= SLIDER ================= */}

        <div className="gallery-slider w-full">

          <Slider {...settings}>

            {images.map((image, index) => (

              <div
                key={index}
                className="px-2 sm:px-3"
              >

                <div className="w-full">

                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    onClick={() => handleZoom(index)}
                    className="
                      w-full
                      h-[260px]
                      sm:h-[280px]
                      md:h-[320px]
                      lg:h-[350px]

                      object-cover

                      rounded-xl

                      cursor-pointer

                      transition-transform
                      duration-300

                      hover:scale-[1.02]
                    "
                  />

                </div>

              </div>

            ))}

          </Slider>

        </div>

      </div>


      {/* ================================================= */}
      {/* ZOOM MODAL */}
      {/* ================================================= */}

      {isZoomed && (

        <div
          className="
            fixed
            inset-0
            z-[999]
            bg-black/90

            flex
            items-center
            justify-center

            p-4
          "
        >

          {/* ================= CLOSE ================= */}

          <button
            onClick={() => setIsZoomed(false)}
            className="
              absolute
              top-4
              right-4
              sm:top-6
              sm:right-6

              bg-white
              text-black

              w-10
              h-10

              rounded-full

              font-bold
              text-xl

              flex
              items-center
              justify-center

              z-[1000]

              hover:bg-gray-200
            "
          >
            ×
          </button>


          {/* ================= PREVIOUS ================= */}

          <button
            onClick={handlePrevZoom}
            className="
              absolute
              left-3
              sm:left-6
              md:left-10

              top-1/2
              -translate-y-1/2

              bg-white
              text-black

              w-10
              h-10
              sm:w-12
              sm:h-12

              rounded-full

              font-bold
              text-xl

              flex
              items-center
              justify-center

              z-[1000]

              hover:bg-gray-200
            "
          >
            ‹
          </button>


          {/* ================= IMAGE ================= */}

          <div
            className="
              w-full
              max-w-5xl

              max-h-[85vh]

              flex
              items-center
              justify-center
            "
          >

            <img
              src={images[zoomedIndex]}
              alt={`Zoomed ${zoomedIndex + 1}`}
              className="
                max-w-full
                max-h-[80vh]

                w-auto
                h-auto

                object-contain

                rounded-lg
              "
            />

          </div>


          {/* ================= NEXT ================= */}

          <button
            onClick={handleNextZoom}
            className="
              absolute
              right-3
              sm:right-6
              md:right-10

              top-1/2
              -translate-y-1/2

              bg-white
              text-black

              w-10
              h-10
              sm:w-12
              sm:h-12

              rounded-full

              font-bold
              text-xl

              flex
              items-center
              justify-center

              z-[1000]

              hover:bg-gray-200
            "
          >
            ›
          </button>

        </div>

      )}

    </section>
  );
};

export default GalleryWithState;