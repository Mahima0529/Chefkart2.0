import React from 'react';
import { Link } from 'react-router-dom';

const Lowe1 = () => {
  return (
    <div>
      <section className="text-gray-500 bg-[#f1f1f1] body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:flex lg:flex-row flex-col justify-between items-center">
            {/* Image Section */}
            <img 
              alt="Cooks with ChefKart" 
              className="lg:w-1/2 w-full lg:h-auto max-h-[420px] object-cover object-center rounded-2xl shadow-md" 
              src="https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FMale_female_Cooks_ceb391c475.webp&w=1080&q=75"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80";
              }}
            />
            {/* Text Section */}
            <div className="lg:w-1/2 w-full mt-8 lg:mt-0 lg:pl-10">
              <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest">हमें है विश्वास</h2>
              <h1 className="text-gray-900 text-3xl sm:text-4xl lg:text-5xl font-bold my-4 leading-tight">
                आपका बनाया खाना, खाएगा ज़माना!
              </h1>
              <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
                आज ही ChefKart पार्टनर बनें और अपने हुनर से सम्मानजनक आय और नियमित काम पाएं।
              </p>
              <Link to="/register">
                <button className="inline-flex text-white text-base sm:text-lg font-bold bg-orange-500 hover:bg-orange-600 border-0 py-3.5 px-8 rounded-xl shadow transition duration-200">
                  ChefKart से जुड़ें
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lowe1;