import React from "react";
import { Link } from "react-router-dom";

const BlogSection = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-5">

        {/* Small Heading */}
        <p className="text-gray-400 text-center text-xl md:text-2xl font-bold mb-2">
          Blog
        </p>

        {/* Main Heading */}
        <h2 className="text-center text-gray-900 font-bold text-3xl md:text-5xl leading-tight">
          Cuisines worth travelling, now at your fingertips
        </h2>

        {/* Blog Card */}
        <div className="flex justify-center mt-10 md:mt-12">
          <div
            className="
              relative
              w-full
              max-w-[595px]
              h-[500px]
              sm:h-[530px]
              md:h-[537px]
              rounded-2xl
              overflow-hidden
              shadow-sm
              bg-black
            "
          >
            {/* Blog Image */}
            <img
              src="https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FBlog_ZO_02_c103cf5073.webp&w=1920&q=75"
              alt="6 things to keep in mind when hiring a cook for home"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80";
              }}
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                object-center
              "
            />

            {/* Dark Gradient */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-b
                from-transparent
                via-transparent
                to-black
              "
            />

            {/* Content */}
            <div
              className="
                absolute
                inset-x-0
                bottom-0
                p-8
                md:p-11
                text-white
              "
            >
              {/* Category + Read Time */}
              <div className="flex items-center gap-2 mb-8">
                <span
                  className="
                    bg-orange-400
                    text-white
                    text-sm
                    font-bold
                    px-3
                    py-2
                    rounded-lg
                    whitespace-nowrap
                  "
                >
                  Find a cook
                </span>

                <span className="text-white text-sm md:text-base font-semibold whitespace-nowrap">
                  • 5 min min read
                </span>
              </div>

              {/* Blog Title */}
              <h3
                className="
                  text-white
                  text-3xl
                  md:text-4xl
                  font-bold
                  leading-[1.12]
                  max-w-[520px]
                "
              >
                6 things to keep in mind when hiring a cook for home
              </h3>
            </div>
          </div>
        </div>

        {/* View All Blogs */}
        <div className="flex justify-center mt-12">
          <Link to="/blog">
            <button
              className="
                bg-[#19191b]
                text-white
                text-lg
                font-bold
                py-4
                px-7
                rounded-xl
                hover:bg-orange-500
                transition
                duration-300
                flex
                items-center
                gap-2
              "
            >
              View All Blogs
              <span className="text-xl">›</span>
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;