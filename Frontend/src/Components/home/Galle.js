import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import api from "../../config/api";

// 17 authentic culinary craft images extracted directly from thechefkart.com
const officialChefKartImages = [
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_25_6ed7e4df8e.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_24_9f0f37936a.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_23_be73f77f6f.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_22_6032e4cfba.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_21_c77b00e93e.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_20_fb2b9b8032.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_18_db483bd088.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_17_c2beda679c.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_15_0e982c7e24.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_14_2f200a48bb.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_10_5ddf0b07ef.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_09_40fd87e1bd.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_08_852bd73dec.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_07_dd8dd8a4b0.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_05_56785e7856.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_04_24e9f6a36d.png",
  "https://storage.googleapis.com/chefkart-strapi-media/rezize_3by2_03_980b84a7ff.png"
];

// Custom Arrow Components for clean navigation
const NextArrow = ({ onClick }) => (
  <button
    type="button"
    aria-label="Next image"
    onClick={onClick}
    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 shadow-md hover:shadow-lg w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 border border-gray-100 hover:scale-105"
  >
    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    type="button"
    aria-label="Previous image"
    onClick={onClick}
    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 shadow-md hover:shadow-lg w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 border border-gray-100 hover:scale-105"
  >
    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const GalleryWithState = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedIndex, setZoomedIndex] = useState(0);
  const [images, setImages] = useState(officialChefKartImages);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // First try to fetch from /gallery/getAll
        const res = await api.get("/gallery/getAll");
        const raw = res.data;
        const list = Array.isArray(raw) ? raw : raw?.data || [];
        const extracted = [];
        list.forEach((item) => {
          if (Array.isArray(item.galleryImages) && item.galleryImages.length > 0) {
            extracted.push(...item.galleryImages);
          } else if (item.image) {
            extracted.push(item.image);
          } else if (typeof item === "string") {
            extracted.push(item);
          }
        });

        if (extracted.length > 0) {
          setImages(extracted);
        }
      } catch (error) {
        console.warn("Could not fetch gallery from API, using authentic defaults:", error);
      }
    };

    fetchImages();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const handleZoom = (index) => {
    setZoomedIndex(index);
    setIsZoomed(true);
  };

  const handleNextZoom = () => {
    setZoomedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevZoom = () => {
    setZoomedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header matching thechefkart.com styling */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-orange-600 bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 shadow-sm">
            ChefKart Moments
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight mt-3">
            Gallery
          </h2>
          <p className="text-gray-600 mt-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Gourmet feasts and wholesome homestyle recipes crafted daily by verified ChefKart professionals right in your kitchen.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-2 sm:px-6">
          <Slider {...settings}>
            {images.map((imgUrl, index) => (
              <div key={index} className="px-2 sm:px-3 py-2">
                <div 
                  onClick={() => handleZoom(index)}
                  className="group relative overflow-hidden rounded-2xl bg-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100/80 aspect-[3/2]"
                >
                  <img
                    src={imgUrl}
                    alt={`ChefKart dish ${index + 1}`}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = officialChefKartImages[index % officialChefKartImages.length];
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      View Dish
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {isZoomed && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setIsZoomed(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsZoomed(false)}
              aria-label="Close modal"
              className="absolute top-5 right-5 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 w-11 h-11 rounded-full flex items-center justify-center text-2xl transition-all"
            >
              ✕
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevZoom();
              }}
              aria-label="Previous"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 w-12 h-12 rounded-full flex items-center justify-center text-3xl transition-all"
            >
              ‹
            </button>

            {/* Modal Image */}
            <div 
              className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[zoomedIndex]}
                alt={`ChefKart dish zoomed ${zoomedIndex + 1}`}
                className="max-h-[80vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain"
              />
              <div className="text-white/70 text-sm mt-4 font-medium tracking-wide">
                {zoomedIndex + 1} / {images.length}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextZoom();
              }}
              aria-label="Next"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 w-12 h-12 rounded-full flex items-center justify-center text-3xl transition-all"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryWithState;