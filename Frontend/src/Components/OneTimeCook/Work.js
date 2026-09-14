import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const steps = [
  {
    step: 1,
    title: "Register on app",
    desc: "Download the ChefKart App and register yourself in seconds.",
    img: "https://storage.googleapis.com/chefkart-strapi-media/Register_on_app_4372ed1276.svg",
  },
  {
    step: 2,
    title: "Select Chefit - Cook for One Meal",
    desc: "Choose Chefit from the ‘Our Services’ section on the homepage.",
    img: "https://storage.googleapis.com/chefkart-strapi-media/select_your_service_7ba59dddd5.svg",
  },
  {
    step: 3,
    title: "Fill requirements & pay",
    desc: "Share your culinary preferences and complete secure payment.",
    img: "https://storage.googleapis.com/chefkart-strapi-media/make_payment_50309d2915.svg",
  },
  {
    step: 4,
    title: "Get a cook",
    desc: "Get a trained & trusted cook at your doorstep within 60 minutes.",
    img: "https://storage.googleapis.com/chefkart-strapi-media/Get_a_cook_b0e201f46a.svg",
  },
];

const Work = () => {
  return (
    <section className="text-gray-600 body-font py-12 md:py-20 bg-white">
      <div className="container px-5 mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-black text-center font-bold mb-12">
          How it <span className="text-orange-500">works?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="flex flex-col items-center text-center relative bg-orange-50/40 p-6 rounded-2xl border border-orange-100/60 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Step Badge */}
              <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm mb-4">
                {item.step}
              </span>

              {/* Step Image */}
              <img
                alt={item.title}
                src={item.img}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300&q=80";
                }}
                className="rounded-xl w-full h-48 sm:h-52 object-contain mb-4"
              />

              {/* Arrow separator (hidden on mobile, visible only on desktop between steps) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-orange-200 rounded-full items-center justify-center shadow">
                  <FaArrowRight className="text-orange-500 text-xs" />
                </div>
              )}

              <div className="w-full flex flex-col flex-grow">
                <h3 className="title-font font-bold text-lg text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
                  {item.desc}
                </p>

                {item.step === 4 && (
                  <Link to="/chef-search" className="mt-auto">
                    <button className="bg-orange-500 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-orange-600 transition shadow">
                      Book Now
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;