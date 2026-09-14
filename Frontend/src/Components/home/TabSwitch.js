import React, { useState, useEffect } from "react";
import api from "../../config/api";

const defaultTabData = {
  "For Singles": {
    category: "For Singles",
    title: "No more missing Ghar Ka Khana!",
    content: "Let our cooks bring memories of home to your plate. Enjoy personalized, fresh home-cooked meals tailored precisely to your schedule, diet, and taste buds.",
    image: "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FSingles_5497580168.webp&w=1080&q=75",
  },
  "For Families": {
    category: "For Families",
    title: "Homemade food for your entire family!",
    content: "Enjoy healthy, delicious meals prepared fresh in your own kitchen. Keep the whole family nourished with nutritious recipes that cater to both kids and elders.",
    image: "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FFamily_f0c0d80b42.webp&w=1080&q=75",
  },
};

const TabSwitchComponent = () => {
  const [activeTab, setActiveTab] = useState("For Singles");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await api.get("/home/getall");
        const raw = response.data;
        const list = Array.isArray(raw) ? raw : raw?.data || [];
        if (list.length > 0) {
          setData(list);
        }
      } catch (error) {
        console.error("Error fetching home content:", error);
      }
    };

    fetchHomeData();
  }, []);

  // Find in API data first, fallback to default tab content so it is NEVER invisible
  const currentItem =
    data.find((item) => item.category === activeTab) || defaultTabData[activeTab];

  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-5 max-w-6xl">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 font-bold text-center leading-tight">
          Healthy food cooked in your kitchen, <br className="hidden sm:block" /> whenever you want!
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 sm:gap-8 mb-10 mt-6 border-b border-gray-200">
          <button
            className={`px-6 py-3 text-base sm:text-lg font-semibold transition-colors duration-200 ${
              activeTab === "For Singles"
                ? "text-orange-600 border-b-2 border-orange-600 -mb-px"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("For Singles")}
          >
            For Singles
          </button>
          <button
            className={`px-6 py-3 text-base sm:text-lg font-semibold transition-colors duration-200 ${
              activeTab === "For Families"
                ? "text-orange-600 border-b-2 border-orange-600 -mb-px"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("For Families")}
          >
            For Families
          </button>
        </div>

        {/* Content */}
        {currentItem && (
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
            {/* Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    activeTab === "For Singles"
                      ? "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80"
                      : "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&q=80";
                }}
                className="w-full max-w-[540px] h-auto rounded-2xl shadow-md object-cover max-h-[380px]"
              />
            </div>
            {/* Text */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-snug">
                {currentItem.title}
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                {currentItem.content}
              </p>
              <a
                href="/chef-search"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-sm hover:shadow transition duration-200"
              >
                Find Cook for {activeTab === "For Singles" ? "Singles" : "Families"}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TabSwitchComponent;