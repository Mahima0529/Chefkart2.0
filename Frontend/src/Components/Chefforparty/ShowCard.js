import React from 'react';

// Sample data array
const cardData = [
  {
    id: 1,
   
    title: "Multi-Cuisine Professionals",
    description:"Professional party chefs to ensure a diverse & exquisite dining experience.",
    image: "https://storage.googleapis.com/chefkart-strapi-media/healthy_hygienic_a9878d9090.svg",
  },
  {
    id: 2,
    title: "Prompt Service",
    description:"Swift service to ensure that your party kicks off as planned",
    image: "https://storage.googleapis.com/chefkart-strapi-media/timely_service_3a6f9d9ebe.svg",
  },
  {
    id: 3,
    title: "Customisable menu",
    description:"Food from around the world to make your event the talk of the town.",
    image: "https://storage.googleapis.com/chefkart-strapi-media/easy_booking_92fea7ca01.svg",
  },
  {
    id: 4,
    title: "Bartenders, Waiters, etc.",
    description:"Expert bartenders & waiters to leave your guests in awe",
    image: "https://storage.googleapis.com/chefkart-strapi-media/bartenders_48bb601645.svg",
  },
];

const ShowCard1 = () => {
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

export default ShowCard1;