import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">

      {/* ================= MAIN FOOTER ================= */}
      <div className="container mx-auto px-5 py-16 md:py-20">

        {/* ================= TOP SECTION ================= */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start">

          {/* ================= LOGO + APP ================= */}
          <div
            className="
              w-full
              lg:w-64
              flex-shrink-0
              text-center
              lg:text-left
              mb-12
              lg:mb-0
            "
          >

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center justify-center lg:justify-start"
            >
              <img
                src="https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FLogo_black_9e78b44631.webp&w=384&q=75"
                alt="ChefKart"
                className="w-64 max-w-full h-auto"
              />
            </Link>

            {/* Get App */}
            <p className="mt-6 text-black font-bold text-xl text-center">
              Get The App Now
            </p>

            {/* App Store Buttons */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                justify-center
                lg:justify-start
                gap-4
                mt-6
              "
            >
              <img
                src="https://storage.googleapis.com/chefkart-strapi-media/app_store_e12d7f52d9.svg"
                alt="App Store"
                className="w-[165px] h-auto"
              />

              <img
                src="https://storage.googleapis.com/chefkart-strapi-media/google_play_bb87168764.svg"
                alt="Google Play"
                className="w-[165px] h-auto"
              />
            </div>
          </div>


          {/* ================= FOOTER LINKS ================= */}
          <div
            className="
              flex-1
              w-full
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-8
              lg:pl-20
              text-center
              lg:text-left
            "
          >

            {/* Column 1 */}
            <div>
              <nav className="list-none">

                <li className="mb-3">
                  <Link
                    to="/blog"
                    className="text-gray-600 text-lg leading-loose hover:text-gray-800"
                  >
                    Blog
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="text-gray-600 text-lg leading-loose hover:text-gray-800"
                  >
                    About us
                  </Link>
                </li>

              </nav>
            </div>


            {/* Column 2 */}
            <div>
              <nav className="list-none">

                <li className="mb-3">
                  <Link
                    to="/one-time-cook"
                    className="text-gray-600 text-lg leading-loose hover:text-gray-800"
                  >
                    Chefit: One-Time Cook
                  </Link>
                </li>

                <li className="mb-3">
                  <Link
                    to="/join-chefkart"
                    className="text-gray-600 text-lg leading-loose hover:text-gray-800"
                  >
                    ChefKart से जुड़ें
                  </Link>
                </li>

                <li>
                  <Link
                    to="/chef-search"
                    className="text-gray-600 text-lg leading-loose hover:text-gray-800"
                  >
                    Cooks Near Me
                  </Link>
                </li>

              </nav>
            </div>


            {/* Column 3 */}
            <div>
              <nav className="list-none">

                <li className="mb-3">
                  <Link
                    to="/chef-for-party"
                    className="text-gray-600 text-lg leading-loose hover:text-gray-800"
                  >
                    Chef for Party
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 text-lg leading-loose hover:text-gray-800"
                  >
                    Contact
                  </Link>
                </li>

              </nav>
            </div>


            {/* Column 4 */}
            <div>
              <nav className="list-none">

                <li className="mb-3">
                  <Link
                    to="#"
                    className="text-gray-600 text-lg leading-loose hover:text-gray-800"
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="text-gray-600 text-lg leading-loose hover:text-gray-800"
                  >
                    Terms of Service
                  </Link>
                </li>

              </nav>
            </div>

          </div>

        </div>

      </div>


      {/* ================= COPYRIGHT SECTION ================= */}
      <div className="bg-gray-100">

        <div
          className="
            container
            mx-auto
            py-5
            px-5
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
          "
        >

          {/* Copyright */}
          <p className="text-black font-bold text-sm md:text-md text-center sm:text-left">
            Copyright 2024 ChefKart Hospitality Pvt Ltd.
          </p>


          {/* ================= SOCIAL ICONS ================= */}
          <div className="flex items-center justify-center">

            {/* Facebook */}
            <Link
              to="https://www.facebook.com/thechefkart"
              className="text-orange-500 hover:text-orange-600"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </Link>


            {/* Twitter */}
            <Link
              to="https://twitter.com"
              className="ml-4 text-orange-500 hover:text-orange-600"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </Link>


            {/* Instagram */}
            <Link
              to="https://www.instagram.com/thechefkart/"
              className="ml-4 text-orange-500 hover:text-orange-600"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect
                  width="20"
                  height="20"
                  x="2"
                  y="2"
                  rx="5"
                  ry="5"
                />

                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              </svg>
            </Link>


            {/* LinkedIn */}
            <Link
              to="https://www.linkedin.com/company/42762980/"
              className="ml-4 text-orange-500 hover:text-orange-600"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                />

                <circle
                  cx="4"
                  cy="4"
                  r="2"
                  stroke="none"
                />
              </svg>
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;