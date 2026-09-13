// import React, { useState } from "react";

// const TabSwitchComponent = () => {
//   const [activeTab, setActiveTab] = useState("For Singles");

//   const data = {
//     "For Singles": {
//       title: "No more missing Ghar Ka Khana!",
//       content: "Let our cooks bring memories of home to your plate.",
//       image:
//         "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FSingles_5497580168.webp&w=1080&q=75",
//     },

//     "For Families": {
//       title: "Homemade food for your entire family!",
//       content:
//         "Enjoy healthy, delicious meals prepared fresh in your own kitchen.",
//       image:
//         "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FFamily_f0c0d80b42.webp&w=1080&q=75",
//     },
//   };

//   const currentData = data[activeTab];

//   return (
//     <section className="bg-white py-12 md:py-16 lg:py-20">
//       <div className="max-w-7xl mx-auto px-5 md:px-8">

//         {/* Main Heading */}
//         <h1
//           className="
//             text-center
//             text-black
//             font-bold
//             text-3xl
//             md:text-4xl
//             lg:text-5xl
//             leading-tight
//             mb-8
//           "
//         >
//           Healthy food cooked in your kitchen,
//           <br className="hidden md:block" />
//           whenever you want!
//         </h1>

//         {/* Tabs */}
//         <div className="flex justify-center items-center gap-10 md:gap-16 mb-10 md:mb-12">
          
//           {/* Singles */}
//           <button
//             onClick={() => setActiveTab("For Singles")}
//             className={`
//               text-xl md:text-2xl
//               pb-4
//               transition-all duration-300
//               ${
//                 activeTab === "For Singles"
//                   ? "text-orange-500 border-b-2 border-orange-500"
//                   : "text-gray-400 border-b-2 border-transparent"
//               }
//             `}
//           >
//             For Singles
//           </button>

//           {/* Families */}
//           <button
//             onClick={() => setActiveTab("For Families")}
//             className={`
//               text-xl md:text-2xl
//               pb-4
//               transition-all duration-300
//               ${
//                 activeTab === "For Families"
//                   ? "text-orange-500 border-b-2 border-orange-500"
//                   : "text-gray-400 border-b-2 border-transparent"
//               }
//             `}
//           >
//             For Families
//           </button>
//         </div>

//         {/* Main Content */}
//         <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

//           {/* Image */}
//           <div className="w-full lg:w-1/2 flex justify-center">
//             <img
//               src={currentData.image}
//               alt={currentData.title}
//               className="
//                 w-full
//                 max-w-[760px]
//                 h-auto
//                 rounded-[50px]
//                 object-contain
//               "
//             />
//           </div>

//           {/* Text */}
//           <div className="w-full lg:w-1/2 flex items-center">
//             <div className="max-w-[650px]">

//               <h2
//                 className="
//                   text-gray-500
//                   font-bold
//                   text-4xl
//                   md:text-5xl
//                   lg:text-5xl
//                   leading-tight
//                   mb-10
//                 "
//               >
//                 {currentData.title}
//               </h2>

//               <p
//                 className="
//                   text-gray-900
//                   text-xl
//                   md:text-2xl
//                   leading-relaxed
//                 "
//               >
//                 {currentData.content}
//               </p>

//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default TabSwitchComponent;



import React, { useState, useEffect } from "react";
import axios from "axios";

const TabSwitchComponent = () => {
  const [activeTab, setActiveTab] = useState("For Singles");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get("https://chefkart2-0.onrender.com/home/getall");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };

    fetchHomeData();
  }, []);

  const filteredData = data.find((item) => item.category === activeTab);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-5">
        {/* Heading */}
        <h1 className="text-5xl text-black font-bold text-center">
          Healthy food cooked in your kitchen, <br /> whenever you want!
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8 mt-5">
          <button
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === "For Singles"
                ? "text-orange-600 border-b-4 border-orange-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("For Singles")}
          >
            For Singles
          </button>
          <button
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === "For Families"
                ? "text-orange-600 border-b-4 border-orange-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("For Families")}
          >
            For Families
          </button>
        </div>

        {/* Content */}
        {filteredData && (
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={filteredData.image}
                alt={filteredData.title}
                className="rounded-lg shadow-md"
              />
            </div>
            {/* Text */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-4">{filteredData.title}</h2>
              <p className="text-gray-600 text-lg">{filteredData.content}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TabSwitchComponent;