


// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";

// const images = [
//   "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2Ftop_view_delicious_noodles_concept_9283eeb6c4.webp&w=640&q=75",
//   "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2Ffood_1_8870eea109_a39bceba07.webp&w=640&q=75",
//   "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FMexican_9e7092cb2b.webp&w=640&q=75",
//   "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FItalian_168d980a5a.webp&w=640&q=75",
// ];

// const cuisines = ["Indian", "Chinese", "Mexican", "Italian"];

// const GalleryAutoSlideZoom = () => {
//   const [currentCuisine, setCurrentCuisine] = useState(cuisines[0]);
//   const [centerIndex, setCenterIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentCuisine((prevCuisine) => {
//         const currentIndex = cuisines.indexOf(prevCuisine);
//         const nextIndex = (currentIndex + 1) % cuisines.length;

//         return cuisines[nextIndex];
//       });
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   const settings = {
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     centerMode: true,
//     centerPadding: "0px",
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,

//     afterChange: (current) => {
//       setCenterIndex(current);
//     },

//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           centerMode: true,
//           centerPadding: "20px",
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           centerMode: true,
//           centerPadding: "20px",
//         },
//       },
//       {
//         breakpoint: 400,
//         settings: {
//           slidesToShow: 1,
//           centerMode: true,
//           centerPadding: "5px",
//         },
//       },
//     ],
//   };

//   return (
//     <section className="w-full min-w-0 overflow-hidden bg-white py-12">
//       <div className="w-full max-w-7xl mx-auto px-4 sm:px-5">

//         {/* Heading */}
//         <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-700 font-bold mb-8 text-center">
//           Craving{" "}
//           <span className="text-orange-500">
//             {currentCuisine}
//           </span>{" "}
//           food? Our Multi-Cuisine Experts
//           <br className="hidden sm:block" />
//           Have Got You!
//         </h1>

//         {/* Slider */}
//         <div className="w-full min-w-0 overflow-hidden">
//           <Slider {...settings}>
//             {images.map((image, index) => (
//               <div
//                 key={index}
//                 className="px-2 sm:px-4 mt-10"
//               >
//                 <div
//                   className={`
//                     flex
//                     justify-center
//                     transition-transform
//                     duration-500
//                     ease-in-out
//                     ${
//                       index === centerIndex
//                         ? "scale-110 sm:scale-125"
//                         : "scale-90"
//                     }
//                   `}
//                 >
//                   <img
//                     src={image}
//                     alt={`${cuisines[index]} food`}
//                     className="
//                       block
//                       w-full
//                       max-w-[320px]
//                       aspect-square
//                       object-cover
//                       rounded-xl
//                     "
//                   />
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default GalleryAutoSlideZoom;



import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";

 const cuisines = ["Indian", "Chinese", "Mexican", "Italian"];

const GalleryAutoSlideZoom = () => {
  const [images, setImages] = useState([]);
 
  const [currentCuisine, setCurrentCuisine] = useState(cuisines[0]);
  const [centerIndex, setCenterIndex] = useState(0);

  // Fetch images from backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("https://chefkart2-0.onrender.com/food/getall");
        setImages(response.data || []);
      } catch (error) {
        console.error("Error fetching food images:", error);
      }
    };

    fetchImages();
  }, []);

  // Rotate cuisines every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCuisine((prevCuisine) => {
        const currentIndex = cuisines.indexOf(prevCuisine);
        const nextIndex = (currentIndex + 1) % cuisines.length;
        return cuisines[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    focusOnSelect: true,
    afterChange: (current) => setCenterIndex(current),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto max-w-7xl px-5">
        <h1 className="text-5xl text-gray-700 font-bold mb-8 text-center">
          Craving{" "}
          <span className="text-orange-500 font-bold">{currentCuisine}</span>{" "}
          food? Our Multi-Cuisine Experts <br /> Have Got You!
        </h1>

        <Slider {...settings}>
          {images.map((item, index) => (
            <div key={item._id} className="px-20 mt-20 h-96 w-96">
              <div
                className={`group transition-transform duration-500 ease-in-out ${
                  index === centerIndex ? "scale-150" : "scale-90"
                }`}
              >
                <img
                  src={item.image}
                  alt={`Food ${index}`}
                  className="object-cover w-full h-full rounded-2xl"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default GalleryAutoSlideZoom;