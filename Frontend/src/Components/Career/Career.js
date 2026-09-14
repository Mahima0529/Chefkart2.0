import React from "react";

const Carousel4 = () => {
  return (
    <div className="relative bg-[#fff9f2] w-full min-h-[600px] sm:min-h-[650px] md:min-h-[700px] lg:min-h-screen flex items-center justify-center">
      
      {/* Content */}
      <div className="w-full flex items-center justify-center">
        <div className="text-center px-5 sm:px-8 md:px-12 lg:px-16">
          
          <h1
            className="
              text-black
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
              leading-tight
            "
          >
            No open positions
          </h1>

          <p
            className="
              text-black
              text-center
              mt-5
              text-lg
              sm:text-xl
              md:text-2xl
              lg:text-3xl
              leading-relaxed
            "
          >
            We'll be accepting applications soon...
          </p>

        </div>
      </div>
    </div>
  );
};

export default Carousel4;