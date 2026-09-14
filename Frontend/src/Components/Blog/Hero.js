import React from "react";

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-br from-orange-50/60 via-white to-amber-50/40 border-b border-gray-100 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        {/* Left Content */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-orange-600 bg-orange-100/80 px-4 py-1.5 rounded-full border border-orange-200 shadow-sm mb-4">
            ChefKart Culinary Journal
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.15] mb-5">
            How to find the best cook for your home
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            Finding a cook for home can be challenging, especially if you’re staying away from your hometown. Explore our complete guide to verified, trained kitchen professionals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => window.scrollTo({ top: 680, behavior: "smooth" })}
              className="inline-flex items-center gap-2 text-white bg-orange-500 hover:bg-orange-600 active:scale-95 py-3.5 px-8 font-bold text-base sm:text-lg rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-105"
            >
              Explore Articles
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Video / Media Card */}
        <div className="md:w-1/2 w-full max-w-lg flex justify-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-200/60 bg-black aspect-[4/3] w-full">
            <video
              className="w-full h-full object-cover"
              src="https://storage.googleapis.com/chefkart-strapi-media/website_cook_loop_4e9912d5f5.mp4"
              controls
              autoPlay
              loop
              muted
              playsInline
            ></video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;