import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import api from "../../config/api";

const defaultTestimonials = [
  {
    _id: "testi-otc-1",
    name: "Diwakar Kumar",
    role: "Chefit Customer, Gurugram",
    content: "I like cooking my own meals, but when I am occupied with work, I book Chefit. It's a much-required service that is convenient and more affordable than ordering online.",
    profileimage: "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2Fimage_15_c28030c449.png&w=640&q=75",
    rating: 5,
  },
  {
    _id: "testi-otc-2",
    name: "Pooja Sachdeva",
    role: "Working Professional, Sector 57",
    content: "Chefit is great for when I'm short on time but still want a wholesome home-cooked meal. I book this service at least once a week. It's an affordable and healthy option!",
    profileimage: "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FCustomer_testimonial_04_bc36b188a4.webp&w=640&q=75",
    rating: 5,
  },
  {
    _id: "testi-otc-3",
    name: "Tarun Gehlaut",
    role: "Regular Household, DLF Phase 5",
    content: "I joined a home with a ChefKart cook 5 months ago. It has been very easy for me to be onboarded onto the process and manage timings, customized meals, and grocery prep.",
    profileimage: "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FCustomer_testimonial_05_686a6d403a.png&w=640&q=75",
    rating: 5,
  },
];

const Testimonial = () => {
  const [testimonialsData, setTestimonialsData] = useState(defaultTestimonials);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get("/testimonial/get");
        const raw = response.data;
        const list = Array.isArray(raw) ? raw : raw?.data || [];
        if (list.length > 0) {
          setTestimonialsData(list);
        }
      } catch (error) {
        console.warn("Using default testimonials:", error.message);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: testimonialsData.length > 2,
    speed: 500,
    slidesToShow: Math.min(3, testimonialsData.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    swipe: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, testimonialsData.length),
          infinite: testimonialsData.length > 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <section className="bg-gray-50/60 py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-5 max-w-7xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Don’t take our word for it
        </h2>
        <p className="text-gray-500 text-center text-sm sm:text-base max-w-xl mx-auto mb-10">
          See why thousands of households choose Chefit for quick, delightful home-cooked meals.
        </p>

        <Slider {...settings}>
          {testimonialsData.map((t) => (
            <div key={t._id} className="p-3 sm:p-4">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md border border-gray-100 flex flex-col h-full min-h-[290px] transition-all">
                {/* Stars */}
                <div className="flex text-amber-400 text-lg mb-4">
                  {"★".repeat(t.rating || 5)}
                </div>

                {/* Content */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 flex-grow italic">
                  "{t.content}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-auto">
                  <img
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-100 shadow-sm"
                    src={t.profileimage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80";
                    }}
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                      {t.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {t.role || "Verified Chefit Customer"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;