// import React from "react";

// const FoodBanner1 = () => {
//   return (
//     <div className="relative h-[350px]  bg-center" style={{ backgroundImage: "url('https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FWebsite_banner_01_web_1_40ea9de1d0.webp&w=1920&q=75')" }}>
//       {/* Overlay */}
//       <div className="absolute inset-0 "></div>

//       {/* Content */}
//       <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
//         <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
//        Private chefs cooking fresh at home in Delhi-NCR, Bangalore & Mumbai. Starting at ₹1999
//         </h2>
//         <p className="text-6xl font-bold text-white-500 mt-4">
//         Be a guest at your <br/> your own gathering
//         </p>
//       </div>

//       {/* Floating Icons */}
      
      
//     </div>
//   );
// };

// export default FoodBanner1;



import React from "react";

const FoodBanner1 = () => {
  return (
    <section
      className="
        relative
        w-full
        h-[500px]
        sm:h-[550px]
        md:h-[600px]
        lg:h-[650px]
        bg-cover
        bg-center
        bg-no-repeat
        overflow-hidden
      "
      style={{
        backgroundImage:
          "url('https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FWebsite_banner_01_web_1_40ea9de1d0.webp&w=1920&q=75')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex items-center">
        <div className="w-full md:w-3/5 lg:w-1/2 px-6 sm:px-10 md:px-16 lg:px-20">

          {/* Heading */}
          <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Be a guest at your
            <span className="block text-orange-500">
              your own gathering
            </span>
          </h1>

          {/* Description */}
          <p className="text-white text-lg sm:text-xl md:text-2xl mt-8 leading-relaxed max-w-3xl">
            Private chefs cooking fresh at home in Delhi-NCR, Bangalore &
            Mumbai. Starting at ₹1999
          </p>

          {/* Button */}
          <button
            className="
              mt-8
              bg-orange-500
              hover:bg-orange-600
              text-white
              font-bold
              text-lg
              md:text-xl
              px-7
              md:px-8
              py-4
              rounded-xl
              transition
              duration-300
            "
          >
            Check Menu & Prices
          </button>

        </div>
      </div>
    </section>
  );
};

export default FoodBanner1;