import React from 'react';

// Sample data array
const cardData = [
  {
    id: 1,
   
    title: "Healthy & Hygienic Food",
    description:"Healthy food cooked in your kitchen with utmost hygiene..",
    image: "https://storage.googleapis.com/chefkart-strapi-media/healthy_hygienic_a9878d9090.svg",
  },
  {
    id: 2,
    title: "Tailored to Your Taste",
    description:"Food prepared according to your taste and preferences.",
    image: "https://storage.googleapis.com/chefkart-strapi-media/tailored_to_taste_33cb681b66.svg",
  },
  {
    id: 3,
    title: "Trained & Verified Cooks",
    description:"Professionally trained & background verified cooks for quality service.",
    image: "https://storage.googleapis.com/chefkart-strapi-media/professional_cooks_ec13508556.svg",
  },
  {
    id: 4,
    title: "Quick Service",
    description:"Assured cook arrival within 60 minutes of booking",
    image: "https://storage.googleapis.com/chefkart-strapi-media/timely_service_3a6f9d9ebe.svg",
  },
];

const ShowCard2 = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="border border-orange-100/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center text-center sm:text-left bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 inline-flex items-center justify-center rounded-2xl bg-orange-50 flex-shrink-0 mb-4 sm:mb-0">
                <img
                  src={card.image}
                  alt={card.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80";
                  }}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                />
              </div>
              <div className="flex-grow sm:ml-5">
                <h3 className="text-gray-900 text-lg sm:text-xl font-bold mb-1.5">
                  {card.title}
                </h3>
                <p className="leading-relaxed text-sm sm:text-base text-gray-600">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowCard2;