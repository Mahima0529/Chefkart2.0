// import React from "react";

// const Cater = () => {
//   const cards = [
//     {
//       image:
// "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FEarn_Money_c09cff227a.webp&w=640&q=75",
//       title: "नियमित पैसे",
//       content: "अपनी दैनिक कमाई के पैसे नियमित रूप से उसी दिन पाएं।",
//     },
//     {
//       image:
//       "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FBe_your_own_boss_1_ff6c9822fd.webp&w=640&q=75",
//       title: "सम्मान से काम",
//       content: "समाज में एक पेशेवर कुक के रूप में सम्मान और पहचान प्राप्त करें।",
//     },
//     {
//       image:
// "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FCustomer_support_26823bc403.webp&w=640&q=75",
//       title: "ट्रेनिंग एवं सहायता",
//       content: "हमारे शेफ से ट्रेनिंग में नए पकवान बनाना सीखें। किसी भी समस्या में तुरंत सहायता पाएं।",
//     },
//   ];

//   return (
//     <section className="text-gray-600 body-font bg-white py-12">
      
//       {/* Heading */}
//       <h1 className="text-center text-black text-4xl md:text-5xl font-bold mb-20">
//         ChefKart से क्यूँ जुड़ें?
//       </h1>

//       {/* Cards */}
//       <div className="container mx-auto px-5">
//         <div className="flex flex-wrap justify-center">

//           {cards.map((card, index) => (
//             <div
//               key={index}
//               className="w-full md:w-1/3 px-6 mb-10"
//             >
//               {/* Image */}
//               <div className="w-full h-[305px] overflow-hidden">
//                 <img
//                   src={card.image}
//                   alt={card.title}
//                   className="
//                     w-full
//                     h-full
//                     object-cover
//                     object-center
//                   "
//                 />
//               </div>

//               {/* Text */}
//               <div className="text-center pt-5">

//                 <h2 className="
//                   text-black
//                   text-3xl
//                   font-bold
//                   mb-3
//                 ">
//                   {card.title}
//                 </h2>

//                 <p className="
//                   text-gray-600
//                   text-xl
//                   leading-relaxed
//                   font-normal
//                   max-w-md
//                   mx-auto
//                 ">
//                   {card.content}
//                 </p>

//               </div>
//             </div>
//           ))}

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cater;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cater = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://chefkart2-0.onrender.com/join/get')
      .then((res) => setData(res.data))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <h1 className="text-center text-black mt-10 text-5xl font-bold">ChefKart से क्यूँ जुड़ें?</h1>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {data.map((item, key) => (
              <div key={item._id} className="p-4 md:w-1/3">
                <div className="h-full rounded-lg overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src={item.image}
                    alt={item.title}
                  />
                  <div className="p-6">
                    <h1 className="title-font font-bold text-gray-900 text-3xl text-center mb-3">
                      {item.title}
                    </h1>
                    <p className="leading-relaxed mb-3 text-center font-bold text-black">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cater;