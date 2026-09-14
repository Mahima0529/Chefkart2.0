import React, { useEffect, useState } from "react";
import api from "../../config/api";

const defaultCards = [
  {
    _id: "cater-1",
    image:
      "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FEarn_Money_c09cff227a.webp&w=640&q=75",
    title: "नियमित पैसे",
    content: "अपनी दैनिक कमाई के पैसे नियमित रूप से उसी दिन सीधे अपने खाते में पाएं।",
  },
  {
    _id: "cater-2",
    image:
      "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FBe_your_own_boss_1_ff6c9822fd.webp&w=640&q=75",
    title: "सम्मान से काम",
    content: "समाज में एक पेशेवर कुक के रूप में सम्मान, पहचान और सुरक्षा प्राप्त करें।",
  },
  {
    _id: "cater-3",
    image:
      "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FCustomer_support_26823bc403.webp&w=640&q=75",
    title: "ट्रेनिंग एवं सहायता",
    content: "हमारे मास्टर शेफ से ट्रेनिंग में नए पकवान बनाना सीखें। किसी भी समस्या में तुरंत सहायता पाएं।",
  },
];

const Cater = () => {
  const [data, setData] = useState(defaultCards);

  useEffect(() => {
    api
      .get("/join/get")
      .then((res) => {
        const raw = res.data;
        const list = Array.isArray(raw) ? raw : raw?.data || [];
        if (list.length > 0) {
          setData(list);
        }
      })
      .catch((err) => console.warn("Using default cater cards:", err.message));
  }, []);

  return (
    <section className="text-gray-600 body-font bg-white py-12 md:py-20">
      <div className="container px-5 mx-auto max-w-6xl">
        <h2 className="text-center text-gray-900 text-3xl sm:text-4xl md:text-5xl font-bold mb-12">
          ChefKart से <span className="text-orange-500">क्यूँ जुड़ें?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-orange-50/30 rounded-2xl overflow-hidden border border-orange-100/60 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="h-56 overflow-hidden bg-gray-100">
                <img
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  src={item.image || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80"}
                  alt={item.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80";
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="title-font font-bold text-gray-900 text-2xl mb-3">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-gray-700 text-base flex-grow">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cater;