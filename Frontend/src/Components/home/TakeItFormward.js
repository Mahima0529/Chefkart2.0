import React from "react";

const TakeItForward = () => {
  return (
    <section className="bg-white w-full py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="flex flex-col lg:flex-row items-center">

          {/* LEFT - PHONE VIDEO */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <video
              src="https://storage.googleapis.com/chefkart-strapi-media/public/AppDemoForWebsite.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="
                w-[250px]
                sm:w-[280px]
                md:w-[300px]
                lg:w-[330px]
                h-auto
                object-contain
              "
            />
          </div>

          {/* RIGHT - CONTENT */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">

            {/* Heading */}
            <h2
              className="
                text-black
                font-bold
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-[62px]
                leading-tight
                mb-8
              "
            >
              Let's take it forward
            </h2>

            {/* Description */}
            <div
              className="
                border-l-2
                border-[#72b996]
                pl-7
                mb-10
              "
            >
              <p
                className="
                  text-black
                  font-semibold
                  text-xl
                  md:text-2xl
                  leading-relaxed
                  max-w-[600px]
                  mb-16
                "
              >
                This is as easy as it gets! Good cooks are just a click
                away.
              </p>

              <p
                className="
                  text-gray-800
                  text-lg
                  md:text-xl
                "
              >
                Download the App and get started.
              </p>
            </div>

            {/* APP BUTTONS */}
            <div className="flex flex-wrap items-center gap-6">

              {/* App Store */}
              <a
                href="#"
                className="inline-block"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="
                    h-[58px]
                    md:h-[64px]
                    w-auto
                    object-contain
                  "
                />
              </a>

              {/* Google Play */}
              <a
                href="#"
                className="inline-block"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="
                    h-[58px]
                    md:h-[64px]
                    w-auto
                    object-contain
                  "
                />
              </a>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TakeItForward;