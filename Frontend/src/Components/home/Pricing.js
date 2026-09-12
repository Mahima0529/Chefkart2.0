import React from "react";

const Pricing = () => {
  const pricingData = [
    {
      title: "Chef for Party",
      description:
        "Professional party chefs to elevate your party experience",
      features: [
        "Multi-Cuisine Professionals",
        "Customisable Menu",
        "Prompt Service",
        "Bartenders, Waiters, etc.",
        "Available in Delhi NCR, Bengaluru and Mumbai",
      ],
      price: "₹2000",
      type: "white",
    },
    {
      title: "Chefit: One-time cook",
      description:
        "Get a professional cook for one-time within minutes.",
      features: [
        "Trained & Verified Cooks",
        "Healthy & Hygienic Food",
        "Tailored to Your Taste",
        "Quick Service",
        "Available only in Gurugram",
      ],
      price: "₹499",
      type: "green",
    },
  ];

  return (
    <section className="bg-[#e9ebf2] py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Heading */}
        <div className="text-center mb-14 md:mb-20">
          <h1
            className="
              text-black
              font-bold
              text-4xl
              md:text-5xl
              lg:text-6xl
              leading-tight
            "
          >
            Discover Your Perfect Service
          </h1>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 max-w-6xl mx-auto">

          {pricingData.map((plan, index) => (
            <div
              key={index}
              className={`
                rounded-2xl
                p-8
                md:p-10
                lg:p-12
                min-h-[600px]
                flex
                flex-col
                shadow-[0_15px_40px_rgba(0,0,0,0.20)]
                ${
                  plan.type === "green"
                    ? "bg-[#294b3c] text-white"
                    : "bg-white text-black"
                }
              `}
            >

              {/* Title */}
              <h2
                className={`
                  text-3xl
                  md:text-4xl
                  font-bold
                  mb-5
                  ${
                    plan.type === "green"
                      ? "text-white"
                      : "text-black"
                  }
                `}
              >
                {plan.title}
              </h2>

              {/* Description */}
              <p
                className={`
                  text-lg
                  md:text-xl
                  font-medium
                  leading-relaxed
                  max-w-[500px]
                  min-h-[75px]
                  ${
                    plan.type === "green"
                      ? "text-white"
                      : "text-black"
                  }
                `}
              >
                {plan.description}
              </p>

              {/* Divider */}
              <div
                className={`
                  w-full
                  border-t
                  my-7
                  ${
                    plan.type === "green"
                      ? "border-gray-400"
                      : "border-gray-400"
                  }
                `}
              />

              {/* Features */}
              <div className="space-y-7">
                {plan.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4"
                  >
                    {/* Check */}
                    <span
                      className={`
                        text-xl
                        font-bold
                        flex-shrink-0
                        mt-0.5
                        ${
                          plan.type === "green"
                            ? "text-orange-400"
                            : "text-green-600"
                        }
                      `}
                    >
                      ✓
                    </span>

                    {/* Feature */}
                    <p
                      className={`
                        text-lg
                        md:text-xl
                        font-medium
                        leading-relaxed
                        ${
                          plan.type === "green"
                            ? "text-white"
                            : "text-gray-800"
                        }
                      `}
                    >
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="mt-auto pt-10">

                {/* Starting From */}
                <p
                  className={`
                    italic
                    text-lg
                    mb-2
                    ${
                      plan.type === "green"
                        ? "text-white"
                        : "text-gray-800"
                    }
                  `}
                >
                  Starting from
                </p>

                {/* Price */}
                <div className="flex items-baseline mb-8">
                  <span
                    className={`
                      text-4xl
                      md:text-5xl
                      font-bold
                      ${
                        plan.type === "green"
                          ? "text-white"
                          : "text-black"
                      }
                    `}
                  >
                    {plan.price}
                  </span>

                  <span
                    className={`
                      text-2xl
                      md:text-3xl
                      font-semibold
                      ml-2
                      ${
                        plan.type === "green"
                          ? "text-white"
                          : "text-black"
                      }
                    `}
                  >
                    /visit
                  </span>
                </div>

                {/* Book Now */}
                <button
                  className="
                    w-full
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    font-bold
                    text-lg
                    md:text-xl
                    py-4
                    rounded-lg
                    transition
                    duration-300
                    mb-5
                  "
                >
                  Book Now
                </button>

                {/* Know More */}
                <button
                  className={`
                    w-full
                    font-bold
                    text-lg
                    md:text-xl
                    py-4
                    rounded-lg
                    border
                    transition
                    duration-300
                    ${
                      plan.type === "green"
                        ? "border-gray-400 text-white hover:bg-white hover:text-[#294b3c]"
                        : "border-gray-400 text-black hover:bg-gray-100"
                    }
                  `}
                >
                  Know More
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Pricing;