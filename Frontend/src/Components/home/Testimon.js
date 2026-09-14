// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";

// const Testimonials = () => {
//   const testimonials = [
//     {
//       image:
//         "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2Fimage_15_c28030c449.png&w=640&q=75",
//       text:
//         "I like cooking my own meals, but when I am occupied with work, I book Chefit. It's a much-required service that is convenient and more affordable than ordering online.",
//       name: "Diwakar Kumar",
//     },
//     {
//       image:
//         "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FCustomer_testimonial_05_686a6d403a.png&w=640&q=75",
//       text:
//         "I joined a home with a ChefKart cook 5 months ago. It has been very easy for me to be onboarded onto the process and to be able to manage my cook, timings, etc.",
//       name: "Tarun Gehlaut",
//     },
//     {
//       image:
//         "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FCook_Testimony_05_fa3b6fc5ac.webp&w=640&q=75",
//       text:
//         "बेटे के इलाज के लिए पैसों की बहुत ज़रूरत थी। इस कठिन समय में मुझे ChefKart ने ना सिर्फ़ आर्थिक सहायता दी बल्कि छुट्टियाँ लेने में भी बहुत सहयोग दिखाया।",
//       name: "हफ़िज़ियाद्दीन मियां",
//     },
//     {
//       image:
//         "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FCustomer_testimonial_04_bc36b188a4.webp&w=640&q=75",
//       text:
//         "Chefit is great for when I'm short on time but still want a home-cooked meal. I book this service at least once a week. It's an affordable and healthy option. I say go for it the next time you don't feel like cooking.",
//       name: "Pooja Sachdeva",
//     },
//   ];

//   /* ================= MOBILE ================= */

//   const [mobileIndex, setMobileIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMobileIndex((prev) => (prev + 1) % testimonials.length);
//     }, 2500);

//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   const mobileTestimonial = testimonials[mobileIndex];

//   /* ================= DESKTOP / TABLET ================= */

//   const settings = {
//     dots: false,
//     arrows: false,
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     speed: 800,
//     slidesToScroll: 1,
//     slidesToShow: 3,
//     centerMode: true,
//     centerPadding: "45px",
//     swipe: true,
//     draggable: true,
//     swipeToSlide: true,
//     pauseOnHover: true,

//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 3,
//           centerMode: true,
//           centerPadding: "25px",
//         },
//       },
//       {
//         breakpoint: 900,
//         settings: {
//           slidesToShow: 2,
//           centerMode: false,
//           centerPadding: "0px",
//         },
//       },
//     ],
//   };

//   return (
//     <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">

//       {/* ================= HEADING ================= */}

//       <h2
//         className="
//           text-center
//           text-black
//           font-bold
//           text-3xl
//           sm:text-4xl
//           md:text-4xl
//           lg:text-5xl
//           leading-tight
//           mb-12
//           sm:mb-16
//           md:mb-20
//           px-5
//         "
//       >
//         Don’t take our word for it
//       </h2>


//       {/* ================================================== */}
//       {/* MOBILE - ONE CARD ONLY */}
//       {/* ================================================== */}

//       <div className="block md:hidden w-full px-4">

//         <div className="w-full max-w-[420px] mx-auto pt-16">

//           <div
//             className="
//               relative
//               w-full
//               min-h-[430px]
//               rounded-2xl
//               px-6
//               pt-20
//               pb-8
//               bg-[#294b3c]
//               border-2
//               border-[#294b3c]
//               text-white
//             "
//           >

//             {/* Profile Image */}

//             <div
//               className="
//                 absolute
//                 -top-14
//                 left-1/2
//                 -translate-x-1/2
//               "
//             >
//               <img
//                 src={mobileTestimonial.image}
//                 alt={mobileTestimonial.name}
//                 className="
//                   w-28
//                   h-28
//                   object-cover
//                   rounded-full
//                   border-8
//                   border-white
//                   bg-gray-200
//                 "
//               />
//             </div>


//             {/* Stars */}

//             <div className="flex mb-5">

//               <span
//                 className="
//                   text-[#f59e0b]
//                   text-2xl
//                   tracking-[2px]
//                 "
//               >
//                 ★★★★★
//               </span>

//             </div>


//             {/* Text */}

//             <p
//               className="
//                 text-left
//                 text-base
//                 leading-relaxed
//                 text-white
//               "
//             >
//               "{mobileTestimonial.text}"
//             </p>


//             {/* Divider */}

//             <div
//               className="
//                 w-12
//                 h-[2px]
//                 mt-7
//                 mb-6
//                 bg-white
//               "
//             />


//             {/* Name */}

//             <h3 className="text-left text-lg font-medium text-white">
//               {mobileTestimonial.name}
//             </h3>

//           </div>


//           {/* Mobile dots */}

//           <div className="flex justify-center gap-2 mt-6">

//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setMobileIndex(index)}
//                 className={`
//                   h-2
//                   rounded-full
//                   transition-all
//                   ${
//                     index === mobileIndex
//                       ? "w-6 bg-[#294b3c]"
//                       : "w-2 bg-gray-300"
//                   }
//                 `}
//               />
//             ))}

//           </div>

//         </div>

//       </div>


//       {/* ================================================== */}
//       {/* TABLET + DESKTOP */}
//       {/* ================================================== */}

//       <div className="hidden md:block w-full overflow-hidden">

//         <Slider {...settings}>

//           {testimonials.map((testimonial, index) => (

//             <div
//               key={index}
//               className="px-3 lg:px-4 pt-16 pb-4"
//             >

//               <div
//                 className="
//                   group
//                   relative
//                   w-full
//                   min-h-[400px]
//                   lg:min-h-[420px]
//                   rounded-2xl
//                   px-6
//                   lg:px-7
//                   pt-20
//                   pb-8
//                   bg-[#294b3c]
//                   border-2
//                   border-[#294b3c]
//                   text-white
//                   transition-all
//                   duration-300
//                   hover:bg-white
//                   hover:border-[#b5c9c0]
//                   hover:shadow-xl
//                 "
//               >

//                 {/* Profile */}

//                 <div
//                   className="
//                     absolute
//                     -top-16
//                     left-1/2
//                     -translate-x-1/2
//                   "
//                 >
//                   <img
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     className="
//                       w-32
//                       h-32
//                       object-cover
//                       rounded-full
//                       border-8
//                       border-white
//                       bg-gray-200
//                     "
//                   />
//                 </div>


//                 {/* Stars */}

//                 <div className="flex mb-5">

//                   <span className="text-[#f59e0b] text-3xl tracking-[2px]">
//                     ★★★★★
//                   </span>

//                 </div>


//                 {/* Text */}

//                 <p
//                   className="
//                     text-left
//                     text-base
//                     lg:text-lg
//                     leading-relaxed
//                     text-white
//                     transition-colors
//                     duration-300
//                     group-hover:text-gray-700
//                   "
//                 >
//                   "{testimonial.text}"
//                 </p>


//                 {/* Divider */}

//                 <div
//                   className="
//                     w-12
//                     h-[2px]
//                     mt-8
//                     mb-8
//                     bg-white
//                     transition-colors
//                     duration-300
//                     group-hover:bg-gray-500
//                   "
//                 />


//                 {/* Name */}

//                 <h3
//                   className="
//                     text-left
//                     text-lg
//                     font-medium
//                     text-white
//                     transition-colors
//                     duration-300
//                     group-hover:text-gray-900
//                   "
//                 >
//                   {testimonial.name}
//                 </h3>

//               </div>

//             </div>

//           ))}

//         </Slider>

//       </div>

//     </section>
//   );
// };

// export default Testimonials;


import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import api from "../../config/api";

const defaultTestimonials = [
  {
    _id: "def_1",
    name: "Diwakar Kumar",
    city: "Gurugram",
    content: "I like cooking my own meals, but when I am occupied with work, I book Chefit. It's a much-required service that is convenient and way healthier than ordering takeout.",
    profileimage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    _id: "def_2",
    name: "Tarun Gehlaut",
    city: "Delhi NCR",
    content: "I hired a ChefKart cook 5 months ago. It has been seamless to manage timings, dietary preferences, and daily meal plans. My family loves the food!",
    profileimage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    _id: "def_3",
    name: "Pooja Sachdeva",
    city: "Noida",
    content: "Chefit is fantastic when I'm short on time but crave authentic home-cooked meals. Professional cook, sparkling clean kitchen after work. Highly recommend!",
    profileimage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    _id: "def_4",
    name: "Vikram Singhania",
    city: "Gurugram",
    content: "Booked Chef for Party for 15 guests. The multicourse dinner was phenomenal, hot snacks were served on time, and our guests couldn't stop praising the chef.",
    profileimage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5
  }
];

const Testimonial1 = () => {
  const [testimonialsData, setTestimonialsData] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get("/testimonial/get");
        const raw = response.data;
        const list = Array.isArray(raw) ? raw : raw?.data || [];
        setTestimonialsData(list.length >= 3 ? list : [...list, ...defaultTestimonials.slice(list.length)]);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        setTestimonialsData(defaultTestimonials);
      }
    };

    fetchTestimonials();
  }, []);

  const displayList = testimonialsData.length > 0 ? testimonialsData : defaultTestimonials;

  const settings = {
    dots: true,
    infinite: displayList.length > 2,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
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
    <div className="max-w-7xl mx-auto px-5 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          Customer Stories
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">
          Don’t Take Our Word For It
        </h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Read genuine reviews from thousands of households who trust ChefKart every day.
        </p>
      </div>

      <Slider {...settings}>
        {displayList.map((testimonial, idx) => (
          <div key={testimonial._id || idx} className="p-3">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[300px]">
              <div>
                <div className="flex items-center gap-1 text-amber-500 text-sm mb-3">
                  {"★".repeat(testimonial.rating || 5)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 italic">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-4">
                <img
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border border-orange-100 shadow-sm"
                  src={testimonial.profileimage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                  }}
                />
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-xs text-gray-500">{testimonial.city || "Verified Customer"}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial1;