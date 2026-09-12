import React from "react";

const Contacts = () => {
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-16 md:py-24 mx-auto">

        <div className="flex flex-col lg:flex-row items-center gap-8">

          {/* Image Section */}
          <div className="lg:w-2/3 md:w-1/2 w-full flex justify-center items-center rounded-lg overflow-hidden">
            <img
              src="https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2Fi_Stock_495494292_1_6e708dc61d_37ec0073ce.webp&w=828&q=75"
              alt="ChefKart"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Form Section */}
          <div className="lg:w-1/3 md:w-1/2 w-full bg-white flex flex-col lg:py-4">

            <h2 className="text-gray-900 mb-6 text-3xl md:text-4xl font-medium text-center">
              Operating in Gurgaon!
            </h2>

            {/* Name */}
            <div className="relative mb-4">
              <label
                htmlFor="name"
                className="leading-7 text-sm text-gray-600"
              >
                Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                className="
                  w-full bg-white rounded border border-gray-300
                  focus:border-orange-500 focus:ring-2 focus:ring-orange-200
                  text-base outline-none text-gray-700
                  py-2 px-3 leading-8
                  transition-colors duration-200 ease-in-out
                "
              />
            </div>

            {/* Email */}
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                className="
                  w-full bg-white rounded border border-gray-300
                  focus:border-orange-500 focus:ring-2 focus:ring-orange-200
                  text-base outline-none text-gray-700
                  py-2 px-3 leading-8
                  transition-colors duration-200 ease-in-out
                "
              />
            </div>

            {/* City */}
            <div className="relative mb-4">
              <label
                htmlFor="city"
                className="leading-7 text-sm text-gray-600"
              >
                City
              </label>

              <input
                type="text"
                id="city"
                name="city"
                className="
                  w-full bg-white rounded border border-gray-300
                  focus:border-orange-500 focus:ring-2 focus:ring-orange-200
                  text-base outline-none text-gray-700
                  py-2 px-3 leading-8
                  transition-colors duration-200 ease-in-out
                "
              />
            </div>

            {/* Phone */}
            <div className="relative mb-4">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="91+"
                className="
                  w-full bg-white rounded border border-gray-300
                  focus:border-orange-500 focus:ring-2 focus:ring-orange-200
                  text-base outline-none text-gray-700
                  py-2 px-3 leading-8
                  transition-colors duration-200 ease-in-out
                "
              />
            </div>

            {/* Message */}
            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-600"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                className="
                  w-full bg-white rounded border border-gray-300
                  focus:border-orange-500 focus:ring-2 focus:ring-orange-200
                  text-base outline-none text-gray-700
                  py-2 px-3
                  resize-none
                  h-28
                  transition-colors duration-200 ease-in-out
                "
              />
            </div>

            {/* Submit Button */}
            <button
              className="
                w-full
                text-white
                bg-orange-500
                border-0
                py-2
                px-6
                focus:outline-none
                hover:bg-orange-600
                rounded
                text-lg
                transition-colors
                duration-300
              "
            >
              Submit
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;