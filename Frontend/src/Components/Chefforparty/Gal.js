import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import api from "../../config/api";

const cuisinesList = [
  {
    name: "Indian",
    image: "https://storage.googleapis.com/chefkart-strapi-media/food_1_8870eea109_a39bceba07.webp",
    description: "Royal biryanis, slow-cooked gravies, & live bread counters"
  },
  {
    name: "Chinese",
    image: "https://storage.googleapis.com/chefkart-strapi-media/top_view_delicious_noodles_concept_9283eeb6c4.webp",
    description: "Authentic stir-fries, dim sums, & spicy Manchurian bowls"
  },
  {
    name: "Mexican",
    image: "https://storage.googleapis.com/chefkart-strapi-media/Mexican_9e7092cb2b.webp",
    description: "Fresh party tacos, loaded nachos, quesadillas, & salsas"
  },
  {
    name: "Italian",
    image: "https://storage.googleapis.com/chefkart-strapi-media/Italian_168d980a5a.webp",
    description: "Hand-rolled artisanal pastas, gourmet bruschettas, & pizzas"
  }
];

const GalleryAutoSlideZoom = () => {
  const [items, setItems] = useState(cuisinesList);
  const [currentCuisineIndex, setCurrentCuisineIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get("/food/getAll");
        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
        if (data.length >= 4) {
          const mapped = data.slice(0, 4).map((f, idx) => ({
            name: cuisinesList[idx]?.name || `Cuisine ${idx + 1}`,
            image: f.image || cuisinesList[idx]?.image,
            description: cuisinesList[idx]?.description || "Handcrafted party feast"
          }));
          setItems(mapped);
        }
      } catch (err) {
        console.warn("Using default authentic party cuisines:", err);
      }
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCuisineIndex((prev) => (prev + 1) % cuisinesList.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0px",
    pauseOnHover: true,
    afterChange: (current) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "20px"
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]
  };

  return (
    <section className="w-full bg-white py-14 sm:py-20 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-orange-600 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-200">
            Catered To Your Tastes
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight mt-3 leading-tight">
            Craving{" "}
            <span className="text-orange-500 underline decoration-orange-300 decoration-wavy transition-all duration-300">
              {cuisinesList[currentCuisineIndex].name}
            </span>{" "}
            food?
            <br />
            Our Multi-Cuisine Experts Have Got You Covered!
          </h2>
          <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Choose from a multi-cuisine spread prepared live at your party by our master chefs.
          </p>
        </div>

        <div className="w-full min-h-[360px] relative">
          <Slider {...settings}>
            {items.map((item, idx) => {
              const isCenter = idx === activeSlide;
              return (
                <div key={idx} className="px-3 py-6">
                  <div
                    className={`transition-all duration-500 ease-out rounded-3xl overflow-hidden bg-white shadow-md border border-gray-100 ${
                      isCenter
                        ? "scale-105 sm:scale-110 shadow-2xl ring-4 ring-orange-400/30"
                        : "opacity-85 hover:opacity-100"
                    }`}
                  >
                    <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={`${item.name} party cuisine dish`}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = cuisinesList[idx % cuisinesList.length].image;
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur-md text-gray-900 text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                          {item.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 text-center">
                      <h3 className="text-lg font-bold text-gray-900">{item.name} Speciality</h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default GalleryAutoSlideZoom;