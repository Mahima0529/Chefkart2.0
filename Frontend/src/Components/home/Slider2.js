import React from "react";

const Carousel2 = () => {
  const slides = [
    {
      title: "Trusted By 10K+ Households To Hire a Cook ",
      description: "Most Trusted Platform for At-Home Cooking Services  .",
      bgImage: "https://thechefkart.com/chefkart-og-image.jpg",
    },
    
  ];


  return (
    <div className="relative w-full h-screen">
      {/* Slide */}
      <div
        className="w-full h-full flex items-center text-white bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: 'url("https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FWebsite_Homepage_banner_01_9ec160c34d.webp&w=3840&q=75")'
        }}
        
      >
        {/* Text Section */}
        <div className="w-full md:w-1/2 p-10 md:p-16 rounded-r-lg ml-4">
          <h1 className="text-5xl  font-bold mt-3">Most Trusted Platform for At-Home Cooking Services</h1>
          <p className="text-3xl text-orange-500 font-bold  mt-10">Find your perfect cook</p>

          <button className="bg-orange-500 text-white font-bold text-lg md:text-xl px-8 py-4 rounded-md mt-5 shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all duration-300">
           Download Our App
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default Carousel2;