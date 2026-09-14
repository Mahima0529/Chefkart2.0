import React from "react";

const Carousel2 = () => {
  const slides = [
    {
      title: "Trusted By 10K+ Households To Hire a Cook ",
      description: "Experience the taste from around the world without leaving the coziness of home.  .",
      bgImage: "https://awgprivatechefs.com/wp-content/uploads/2021/05/nsplsh_b86635b484d2489d8e1d23806a8409de-mv2.jpg",
    },
    
  ];


  return (
    <div className="relative w-full h-screen">
      {/* Slide */}
      <div
        className="w-full h-full flex items-center text-white bg-cover bg-center transition-all duration-500 relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&auto=format&fit=crop&q=80")'
        }}
      >
        {/* Text Section */}
        <div className="w-full md:w-2/3 lg:w-1/2 p-6 sm:p-10 md:p-16 rounded-r-lg ml-0 sm:ml-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-10 sm:mt-20 leading-tight">
            We are <span className="text-orange-500 font-bold">category creators, </span>
            <span className="text-white font-bold">dedicated to simplifying the way India eats.</span>
          </h1>
          <p className="text-lg sm:text-2xl text-gray-200 mt-6 sm:mt-8 font-medium">
            {slides[0]?.description || "Experience culinary excellence with verified professional chefs delivered to your home."}
          </p>
        </div>
      </div>

      
    </div>
  );
};

export default Carousel2;