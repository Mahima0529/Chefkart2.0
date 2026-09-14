import { useState } from "react";
import {
  FaHamburger,
  FaChevronDown,
  FaChevronUp,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiTireIronCross } from "react-icons/gi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="relative top-0 w-full z-50 bg-black text-white shadow-lg">

      {/* ================= MAIN NAVBAR ================= */}

      <div className="container mx-auto flex items-center justify-between px-5 py-4">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="flex items-center flex-shrink-0 hover:opacity-90 transition-opacity"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoErvIxAIWybuxDrbVZuRTz1B3ZaYWZTSqMw&s"
            alt="ChefKart"
            className="h-9 sm:h-10 w-auto object-contain rounded"
          />
        </Link>


        {/* ================================================= */}
        {/* DESKTOP CENTER MENU */}
        {/* ================================================= */}

        <nav className="hidden md:flex items-center gap-10">

          {/* OUR SERVICES */}

          <div className="relative">

            <button
              onClick={toggleDropdown}
              className="text-2xl text-white hover:text-orange-500 flex items-center"
            >
              Our Services

              <span className="ml-2">
                {isDropdownOpen ? (
                  <FaChevronUp className="text-lg" />
                ) : (
                  <FaChevronDown className="text-lg" />
                )}
              </span>
            </button>


            {/* DESKTOP SERVICES DROPDOWN */}

            {isDropdownOpen && (
              <div className="absolute left-0 top-full mt-3 w-64 bg-white text-black shadow-xl rounded-md z-[100] overflow-hidden">

                <Link
                  to="/one-time-cook"
                  className="px-4 py-4 flex items-center justify-between text-lg font-bold hover:text-orange-500"
                  onClick={closeDropdown}
                >
                  Chefit: One Time Cook
                  <FaChevronRight />
                </Link>

                <hr />

                <Link
                  to="/chef-for-party"
                  className="px-4 py-4 flex items-center justify-between text-lg font-bold hover:text-orange-500"
                  onClick={closeDropdown}
                >
                  Chef for Party
                  <FaChevronRight />
                </Link>

                <hr />

                <Link
                  to="/join-chefkart"
                  className="px-4 py-4 flex items-center justify-between text-lg font-bold hover:text-orange-500"
                  onClick={closeDropdown}
                >
                  ChefKart से जुड़ें
                  <FaChevronRight />
                </Link>

                <hr />

                <Link
                  to="/register"
                  className="px-4 py-4 flex items-center justify-between text-lg font-bold text-orange-600 hover:text-orange-700"
                  onClick={closeDropdown}
                >
                  <span>👨‍🍳 Cook Registration</span>
                  <FaChevronRight />
                </Link>

              </div>
            )}

          </div>


          {/* COOKS NEAR ME */}

          <Link
            to="/chef-search"
            className="text-2xl text-white hover:text-orange-500 hover:underline"
          >
            Cooks Near Me
          </Link>

        </nav>


        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div className="flex items-center gap-4">

          {/* ================= DESKTOP CONTACT ================= */}

          <Link
            to="/contact"
            className="hidden md:block"
          >
            <button
              className="
                text-white
                text-2xl
                font-semibold
                bg-orange-500
                py-3
                px-7
                rounded-xl
                hover:bg-orange-600
                transition
              "
            >
              Contact Us
            </button>
          </Link>


          {/* ================= HAMBURGER ================= */}

          <button
            onClick={toggleMenu}
            aria-label="Open Menu"
            className="
              w-16
              h-16
              md:w-20
              md:h-20
              rounded-full
              bg-gray-200
              text-black
              flex
              items-center
              justify-center
              hover:bg-gray-300
              transition
              focus:outline-none
              flex-shrink-0
            "
          >
            <FaHamburger className="w-8 h-8 md:w-10 md:h-10" />
          </button>

        </div>

      </div>


      {/* ========================================================= */}
      {/* HAMBURGER SIDE MENU */}
      {/* ========================================================= */}

      {isMenuOpen && (
        <div className="fixed inset-0 z-[999] bg-black/60">

          {/* ================= MENU PANEL ================= */}

          <div
            className="
              absolute
              top-0
              right-0
              h-screen
              w-[85%]
              sm:w-[400px]
              md:w-[400px]
              lg:w-[430px]
              bg-white
              text-black
              shadow-2xl
              overflow-y-auto
            "
          >

            {/* ================= CLOSE BUTTON ================= */}

            <div className="flex justify-end p-6">

              <button
                onClick={toggleMenu}
                className="focus:outline-none"
                aria-label="Close Menu"
              >
                <GiTireIronCross className="w-9 h-9 text-black" />
              </button>

            </div>


            {/* ================================================= */}
            {/* MOBILE ONLY ITEMS */}
            {/* ================================================= */}

            <div className="md:hidden">

              {/* ================= OUR SERVICES ================= */}

              <div>

                <div className="px-8 py-5 flex items-center justify-between border-t border-gray-200">

                  <span className="text-xl font-bold">
                    Our Services
                  </span>

                  <button
                    onClick={toggleDropdown}
                    className="focus:outline-none"
                  >
                    {isDropdownOpen ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>

                </div>


                {/* SERVICES */}

                {isDropdownOpen && (
                  <div className="bg-gray-50">

                    <Link
                      to="/one-time-cook"
                      className="px-10 py-4 flex items-center justify-between text-lg font-semibold border-t border-gray-200 hover:text-orange-500"
                      onClick={closeMenu}
                    >
                      Chefit: One-time cook
                      <FaChevronRight />
                    </Link>

                    <Link
                      to="/chef-for-party"
                      className="px-10 py-4 flex items-center justify-between text-lg font-semibold border-t border-gray-200 hover:text-orange-500"
                      onClick={closeMenu}
                    >
                      Chef for Party
                      <FaChevronRight />
                    </Link>

                    <Link
                      to="/join-chefkart"
                      className="px-10 py-4 flex items-center justify-between text-lg font-semibold border-t border-gray-200 hover:text-orange-500"
                      onClick={closeMenu}
                    >
                      ChefKart से जुड़ें
                      <FaChevronRight />
                    </Link>

                  </div>
                )}

              </div>


              {/* ================= COOKS NEAR ME ================= */}

              <Link
                to="/chef-search"
                className="block px-8 py-5 text-xl font-bold border-t border-gray-200 hover:text-orange-500"
                onClick={closeMenu}
              >
                Cooks Near Me
              </Link>

            </div>


            {/* ================================================= */}
            {/* ITEMS SHOWN ON BOTH DESKTOP & MOBILE MENU */}
            {/* ================================================= */}


            {/* ABOUT US */}

            <Link
              to="/about"
              className="block px-8 py-5 text-xl font-bold border-t border-gray-200 hover:text-orange-500"
              onClick={closeMenu}
            >
              About Us
            </Link>


            {/* BLOG */}

            <Link
              to="/blog"
              className="block px-8 py-5 text-xl font-bold border-t border-gray-200 hover:text-orange-500"
              onClick={closeMenu}
            >
              Blog
            </Link>


            {/* CAREER */}

            <Link
              to="/career"
              className="block px-8 py-5 text-xl font-bold border-t border-gray-200 hover:text-orange-500"
              onClick={closeMenu}
            >
              Career
            </Link>


            {/* INVESTOR RELATIONS */}

            <Link
              to="/investor-relation"
              className="block px-8 py-5 text-xl font-bold border-t border-gray-200 hover:text-orange-500"
              onClick={closeMenu}
            >
              Investor Relations
            </Link>


            {/* TESTIMONIALS */}

            <Link
              to="/testimonial"
              className="block px-8 py-5 text-xl font-bold border-t border-gray-200 hover:text-orange-500"
              onClick={closeMenu}
            >
              Testimonials
            </Link>


            {/* COOK REGISTRATION */}

            <Link
              to="/register"
              className="block px-8 py-5 text-xl font-bold border-t border-gray-200 text-gray-900 hover:text-orange-500 flex items-center justify-between"
              onClick={closeMenu}
            >
              <span>👨‍🍳 Register as a Cook</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">Join</span>
            </Link>


            {/* ADMIN DASHBOARD */}

            <Link
              to="/dashboard"
              className="block px-8 py-5 text-xl font-bold border-t border-gray-200 text-orange-500 hover:text-orange-600"
              onClick={closeMenu}
            >
              Admin Dashboard
            </Link>


            {/* ================================================= */}
            {/* CONTACT US INSIDE HAMBURGER */}
            {/* ================================================= */}

            <div className="border-t border-gray-200 p-6">

              <Link
                to="/contact"
                onClick={closeMenu}
              >
                <button
                  className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-3
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    text-xl
                    font-semibold
                    py-4
                    rounded-xl
                  "
                >
                  Contact Us
                  <FaChevronRight />
                </button>
              </Link>

            </div>

          </div>

        </div>
      )}

    </header>
  );
};

export default Navbar;