import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="text-gray-900 bg-gradient-to-br from-orange-50/60 via-white to-amber-50/40 border-b border-gray-100 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        {/* Text Section */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-orange-600 bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 shadow-sm mb-4">
            Our Story
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-gray-950 font-black leading-tight tracking-tight mb-6">
            Embracing the goal of{" "}
            <span className="text-orange-500 underline decoration-orange-300 decoration-wavy">
              Change & Empowerment
            </span>
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
            We aim to bridge the gap between delicious wholesome food and a healthy lifestyle while empowering verified home cooks.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-white bg-orange-500 hover:bg-orange-600 active:scale-95 py-3.5 px-8 font-bold text-lg rounded-xl shadow-lg shadow-orange-500/25 transition duration-200 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 w-full max-w-lg flex justify-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-200/60 bg-white">
            <img
              className="object-cover object-center w-full h-auto"
              alt="About ChefKart"
              src="https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FAbout_us_hero_image_mob_01_copy_d07ace60ab.webp&w=828&q=75"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;