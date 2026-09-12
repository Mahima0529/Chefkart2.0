import React, { useEffect, useState } from "react";

const Carousel = () => {
  const slides = [
    {
      title: "ChefKart का हिस्सा बनें ",
      description:
        "हमसे जुड़े 4500 से भी ज़्यादा कुक्स का हिस्सा बनें और अपने कौशल को आगे बढ़ाएँ।",
      bgImage: "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FJoin_as_chef_hero_banner_03_e679e84c56.webp&w=1920&q=75",
      action: "ChefKart से जुड़ें",
    },
    {
      title: "समाज का नज़रिया बदलें ",
      description:
        "देश में कुक की परिभाषा और उनके लिए दृष्टिकोण बदलने में हमारी मदद करें।",
      bgImage: "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FJoin_as_chef_hero_banner_01_f31e87e92e.webp&w=1920&q=75",
      action: "अभी जुड़ें",
    },
    {
      title: "हुनर से पैसे कमाएँ। ",
      description:
       "अपने खाना बनाने की प्रतिभा को एक नई शुरुआत दें और इसके माध्यम से पैसे कमाएँ।",
      bgImage: "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FJoin_as_chef_hero_banner_02_6c8df4e377.webp&w=1920&q=75",
      action: "शुरू करें",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);

  // Duplicate slides
  const infiniteSlides = [...slides, ...slides];

  // Auto sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Reset after reaching duplicated slides
  useEffect(() => {
    if (currentSlide === slides.length) {
      const timeout = setTimeout(() => {
        setEnableTransition(false);
        setCurrentSlide(0);
      }, 700);

      return () => clearTimeout(timeout);
    }

    if (currentSlide === 0) {
      const timeout = setTimeout(() => {
        setEnableTransition(true);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [currentSlide, slides.length]);

  const handleIndicator = (index) => {
    setEnableTransition(true);
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">

      {/* Slides */}
      <div
        className={`flex h-full ${
          enableTransition
            ? "transition-transform duration-700 ease-in-out"
            : ""
        }`}
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {infiniteSlides.map((slide, index) => (
          <div
            key={index}
            className="
              w-full
              h-full
              flex-shrink-0
              bg-cover
              bg-center
            "
            style={{
              backgroundImage: `url(${slide.bgImage})`,
            }}
          >
            {/* Overlay */}
            <div className="w-full h-full bg-black/50 flex items-center px-6 md:px-16">

              <div className="w-full md:w-1/2 text-white">

                <h2 className="text-3xl md:text-5xl font-bold">
                  {slide.title}
                </h2>

                <p className="text-lg md:text-xl mt-5">
                  {slide.description}
                </p>

                <button
                  className="
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    font-bold
                    text-lg
                    px-6
                    py-3
                    rounded-md
                    mt-6
                    shadow-lg
                    transition-all
                    duration-300
                  "
                >
                  {slide.action}
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicator(index)}
            className={`
              w-3
              h-3
              rounded-full
              transition-all
              duration-300
              ${
                currentSlide % slides.length === index
                  ? "bg-white scale-125"
                  : "bg-gray-400"
              }
            `}
          />
        ))}
      </div>

    </div>
  );
};

export default Carousel;