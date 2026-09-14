import React from "react";

const SkillIndiaSection = () => {
  return (
    <section className="text-gray-600 body-font py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-5 mx-auto text-center max-w-4xl">
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-16 mb-6">
          {/* Skill India Logo */}
          <div className="flex flex-col items-center">
            <img
              src="https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FSkill_India_Preview_removebg_preview_1_03db4e9828.png&w=384&q=75"
              alt="Skill India"
              onError={(e) => { e.target.style.display = 'none'; }}
              className="h-20 sm:h-28 md:h-36 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          {/* THSC Logo */}
          <div className="flex flex-col items-center">
            <img
              src="https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FScreenshot_2023_07_10_at_4_52_1_658c10251b.png&w=384&q=75"
              alt="THSC Logo"
              onError={(e) => { e.target.style.display = 'none'; }}
              className="h-20 sm:h-28 md:h-36 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
        {/* Text Content */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          Proud Partner with Skill India
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-xl font-medium max-w-2xl mx-auto">
          All our professionals are certified by Govt. of India under Skill
          India Mission
        </p>
      </div>
    </section>
  );
};

export default SkillIndiaSection;