import { FaTwitter, FaLinkedin } from "react-icons/fa"; // Import social icons

const GallerySection = () => {
  return (
    <section className="text-gray-900 bg-white body-font">
      <div className="container px-5 py-20 mx-auto max-w-7xl">
        <div className="flex flex-col mb-10 text-center">
          <h1 className="text-4xl font-bold text-black">
            The People Behind <span className="text-red-500">ChefKart</span>
          </h1>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 justify-center">
          {/* First Profile */}
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6 flex flex-col items-center">
            <div className="rounded-full h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 overflow-hidden mb-4 shadow-lg">
              <img
                alt="Vaibhav Gupta - CEO, Co-founder"
                className="object-cover object-center h-full w-full"
                src="https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FVaibhav_01_1db5d1c3eb.webp&w=384&q=75"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80";
                }}
              />
            </div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-3">Vaibhav Gupta</h2>
            <h3 className="text-sm font-semibold tracking-wider text-orange-600 uppercase">CEO, Co-founder</h3>
            <div className="flex space-x-4 mt-4">
              <a href="https://twitter.com/Vaibhavthechef" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-blue-500 text-2xl" />
              </a>
              <a href="https://www.linkedin.com/in/vaibhav-gupta-iitkgp/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-blue-700 text-2xl" />
              </a>
            </div>
          </div>

          {/* Second Profile */}
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6 flex flex-col items-center">
            <div className="rounded-full h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 overflow-hidden mb-4 shadow-lg">
              <img
                alt="Aman Gupta - CTO, Co-founder"
                className="object-cover object-center h-full w-full"
                src="https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FAman_01_a6144820a0.webp&w=384&q=75"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80";
                }}
              />
            </div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Aman Gupta</h2>
            <h3 className="text-xl text-gray-500 uppercase">CTO, Co-founder</h3>
            <div className="flex space-x-4 mt-4">
              <a href="https://x.com/a_man__gupta?mx=2" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-blue-500 text-2xl" />
              </a>
              <a href="https://www.linkedin.com/in/aman-gupta1995/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-blue-700 text-2xl" />
              </a>
            </div>
          </div>

          {/* Third Profile */}
         
        </div>
      </div>
    </section>
  );
};

export default GallerySection;