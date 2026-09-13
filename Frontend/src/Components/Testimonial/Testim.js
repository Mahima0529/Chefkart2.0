


// import React from "react";

// const Testimonial1 = () => {
//   const testimonials = [
//     {
//       image:
//         "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2Fimage_15_c28030c449.png&w=640&q=75",
//       text: `‘’I like cooking my own meals, but when I am occupied with work, I book Chefit. It's a much-required service that is convenient and more affordable than ordering online.’’`,
//       name: "Diwakar Kumar",
//     },
//     {
//       image:
//         "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FCustomer_testimonial_05_686a6d403a.png&w=640&q=75",
//       text: `"I joined a home with a chefkart cook 5 months ago. It has been very easy for me to be onboarded onto the process and to be able to manage my cook, timings, etc."`,
//       name: "Tarun Gehlaut",
//     },
//     {
//       image:
//         "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FCook_Testimony_05_fa3b6fc5ac.webp&w=640&q=75",
//       text: `"बेटे के इलाज के लिए पैसों की बहुत ज़रूरत थी | इस कठिन समय में मुझे ChefKart ने ना सिर्फ़ आर्थिक सहायता दी बल्कि छुट्टियाँ लेने में भी बहुत सहयोग दिखाया|"`,
//       name: "हफ़िज़ियाद्दीन मियां",
//     },
//   ];

//   return (
//     <section className="body-font py-24">
//       <h2 className="text-center text-black text-3xl md:text-4xl font-bold mb-20">
//         Don’t take our word for it
//       </h2>

//       <div className="container mx-auto px-5">
//         <div className="flex flex-wrap justify-center gap-10">
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={index}
//               className="
//                 group
//                 relative
//                 w-full
//                 md:w-[45%]
//                 lg:w-[30%]
//                 min-h-[420px]
//                 mt-16
//                 rounded-2xl
//                 px-7
//                 pt-20
//                 pb-8
//                 bg-[#294b3c]
//                 border-2
//                 border-[#294b3c]
//                 text-white
//                 transition-all
//                 duration-300
//                 ease-in-out
//                 hover:bg-white
//                 hover:border-[#b5c9c0]
//                 hover:shadow-xl
//               "
//             >
//               {/* Profile Image */}
//               <div className="absolute -top-16 left-1/2 -translate-x-1/2">
//                 <img
//                   src={testimonial.image}
//                   alt={`${testimonial.name} testimonial`}
//                   className="
//                     w-32
//                     h-32
//                     object-cover
//                     object-center
//                     rounded-full
//                     border-8
//                     border-white
//                     bg-gray-200
//                   "
//                 />
//               </div>

//               {/* Stars */}
//               <div className="flex justify-start mb-5">
//                 <span className="text-[#f59e0b] text-3xl tracking-[2px]">
//                   ★★★★★
//                 </span>
//               </div>

//               {/* Testimonial */}
//               <p
//                 className="
//                   text-left
//                   text-lg
//                   leading-relaxed
//                   text-white
//                   transition-colors
//                   duration-300
//                   group-hover:text-gray-700
//                 "
//               >
//                 {testimonial.text}
//               </p>

//               {/* Divider */}
//               <div
//                 className="
//                   w-12
//                   h-[2px]
//                   mt-8
//                   mb-8
//                   bg-white
//                   transition-colors
//                   duration-300
//                   group-hover:bg-gray-500
//                 "
//               />

//               {/* Name */}
//               <h2
//                 className="
//                   text-left
//                   text-lg
//                   font-medium
//                   text-white
//                   transition-colors
//                   duration-300
//                   group-hover:text-gray-900
//                 "
//               >
//                 {testimonial.name}
//               </h2>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonial1;



import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

const Testimonial1 = () => {
  const [testimonialsData, setTestimonialsData] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("https://chefkart2-0.onrender.com/testimonial/get");
        if (response.data && response.data.data) {
          setTestimonialsData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    swipe: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mx-auto px-4 py-12 ">
      <h1 className="text-4xl font-bold text-center mb-8">Don’t take our word for it</h1>
      <Slider {...settings}>
        {testimonialsData.map((testimonial) => (
          <div key={testimonial._id} className="p-4 mt-8">
            <div className="bg-green-700 border-4 border-green-400  rounded-lg p-6 text-center">
              <img
                alt="testimonial"
                className="w-20 h-20 mb-4 object-cover object-center rounded-full border-2  mx-auto"
                src={testimonial.profileimage}
              />
              <p className="leading-relaxed hover:text-black text-white">{testimonial.content}</p>
              <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
              <h2 className="text-white font-medium title-font tracking-wider text-sm">
                {testimonial.name}
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial1;