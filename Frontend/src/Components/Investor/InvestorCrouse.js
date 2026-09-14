import React, { useState } from 'react';

const InvestorsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const investors = [
    {
      name: 'Deepinder Goyal',
      title: 'Founder & CEO, Zomato',
      description: 'Deepinder Goyal is the founder and CEO of Zomato, one of the largest food tech companies in India. As an investor in Chefkart, Goyal backs the mission of offering authentic and affordable meals prepared in the comfort of one\'s home. His investment is a testament to the potential of Chefkart and its category-defining approach to at-home cooking services.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80'
    },
    {
      name: 'Rohit MA',
      title: 'Co-founder, Cloudnine & Angel Investor',
      description: 'Rohit MA brings extensive consumer service scaling experience. Backing Chefkart since its initial growth rounds, he champions hygiene, culinary training, and structured service delivery across urban metropolitan households.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80'
    },
    {
      name: 'Pravega Ventures',
      title: 'Institutional Early Stage VC',
      description: 'Pravega Ventures partners with visionary founders creating foundational consumer technology infrastructure. Their investment accelerates Chefkart\'s culinary upskilling ecosystem and hyper-local deployment technology.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80'
    }
  ];

  const handlePrevious = () => {
    setCurrentSlide((currentSlide - 1 + investors.length) % investors.length);
  };

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % investors.length);
  };

  const current = investors[currentSlide];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Chefkart Backer
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-4 mb-2">{current.name}</h2>
            <p className="text-sm font-semibold text-orange-600 mb-4">{current.title}</p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{current.description}</p>
          </div>

          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <button
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center transition"
              onClick={handlePrevious}
              aria-label="Previous investor"
            >
              ←
            </button>
            <div className="flex gap-1.5">
              {investors.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${currentSlide === i ? 'w-6 bg-orange-500' : 'w-2 bg-gray-300'}`}
                />
              ))}
            </div>
            <button
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center transition"
              onClick={handleNext}
              aria-label="Next investor"
            >
              →
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={current.image}
            alt={current.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80';
            }}
            className="w-full max-w-sm h-72 sm:h-80 object-cover rounded-2xl shadow-lg border-2 border-orange-50"
          />
        </div>
      </div>
    </div>
  );
};

export default InvestorsCarousel;