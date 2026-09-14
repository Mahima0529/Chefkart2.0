import React from "react";

const FoodBanner1 = () => {
  return (
    <div className="relative min-h-[280px] sm:h-[350px] bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('https://thechefkart.com/_next/image?url=%2Fsample.png&w=1920&q=75')" }}>
      {/* Overlay for optimal text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full min-h-[280px] sm:min-h-[350px] text-center text-white px-4 py-8">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-wide drop-shadow">
          What's better than your favourite food?
        </h2>
        <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-orange-400 mt-3 sm:mt-4 leading-tight drop-shadow-md">
          Getting it cooked in<br /> your kitchen.
        </p>
      </div>
    </div>
  );
};

export default FoodBanner1;