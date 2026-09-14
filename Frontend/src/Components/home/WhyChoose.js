import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Professional Cooks",
      icon: (
        <svg
          viewBox="0 0 120 120"
          className="w-36 h-36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chef hat */}
          <path
            d="M30 48C22 45 18 38 20 31C22 23 30 19 38 21C41 12 50 8 59 12C65 5 77 8 81 17C90 15 99 21 100 30C102 38 96 45 89 48V58H30V48Z"
            fill="#F1F1F1"
          />

          {/* Face/Thumb */}
          <path
            d="M66 57C73 54 82 57 87 63L96 74C100 79 97 87 90 88L72 86L67 78L66 57Z"
            fill="#FFE08A"
          />

          {/* Body */}
          <path
            d="M32 54H67V91H32C28 91 25 88 25 84V61C25 57 28 54 32 54Z"
            fill="#F7941D"
          />

          {/* Red collar */}
          <path
            d="M48 54H67V76H48V54Z"
            fill="#D93A3A"
          />

          {/* Check circle */}
          <circle cx="45" cy="72" r="10" fill="white" />
          <path
            d="M40 72L44 76L51 68"
            stroke="#D94343"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },

    {
      title: "Easy Booking",
      icon: (
        <svg
          viewBox="0 0 120 120"
          className="w-36 h-36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Document */}
          <rect
            x="30"
            y="20"
            width="55"
            height="65"
            rx="5"
            fill="#FFF5E8"
            stroke="#F7941D"
            strokeWidth="7"
          />

          {/* Check */}
          <circle cx="58" cy="43" r="14" fill="#48A868" />
          <path
            d="M51 43L56 48L66 37"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Lines */}
          <path
            d="M45 65H72"
            stroke="#A8A8A8"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M45 74H68"
            stroke="#A8A8A8"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Hand */}
          <path
            d="M75 68C80 63 84 65 87 69L98 83C102 89 99 98 91 101C82 104 70 96 66 88L62 79L75 68Z"
            fill="#F4D17A"
          />

          {/* Sparkles */}
          <path
            d="M95 28L98 35L105 38L98 41L95 48L92 41L85 38L92 35L95 28Z"
            fill="#C5B7FF"
          />
        </svg>
      ),
    },

    {
      title: "Timely Service",
      icon: (
        <svg
          viewBox="0 0 120 120"
          className="w-36 h-36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Speed lines */}
          <path
            d="M12 43H43"
            stroke="#F7941D"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M7 58H36"
            stroke="#F7941D"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M12 73H43"
            stroke="#F7941D"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Clock */}
          <circle
            cx="70"
            cy="58"
            r="35"
            fill="#FFF"
            stroke="#F7941D"
            strokeWidth="7"
          />

          <circle
            cx="70"
            cy="58"
            r="25"
            fill="#F7F7F7"
          />

          {/* Clock hands */}
          <path
            d="M70 35V58L87 72"
            stroke="#F7941D"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },

    {
      title: "Prompt Support",
      icon: (
        <svg
          viewBox="0 0 120 120"
          className="w-36 h-36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Headset */}
          <path
            d="M29 58C29 39 43 27 60 27C77 27 91 39 91 58"
            stroke="#9E91A5"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Earpieces */}
          <rect
            x="22"
            y="54"
            width="13"
            height="25"
            rx="6"
            fill="#FFE078"
          />

          <rect
            x="85"
            y="54"
            width="13"
            height="25"
            rx="6"
            fill="#FFE078"
          />

          {/* Head */}
          <circle
            cx="60"
            cy="55"
            r="20"
            fill="#F7D4C3"
          />

          {/* Body */}
          <path
            d="M34 101C35 82 45 73 60 73C75 73 85 82 86 101H34Z"
            fill="#F1A66F"
          />

          {/* Mic */}
          <path
            d="M90 76H73"
            stroke="#9E91A5"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <path
            d="M73 76C73 82 68 85 61 85"
            stroke="#9E91A5"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Chat box */}
          <rect
            x="82"
            y="12"
            width="31"
            height="30"
            rx="5"
            fill="#FFE078"
          />

          <path
            d="M89 21H106"
            stroke="#9E91A5"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M89 28H106"
            stroke="#9E91A5"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M89 35H100"
            stroke="#9E91A5"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="
        relative
        w-full
        min-h-[650px]
        md:min-h-[720px]
        py-14
        md:py-16
        overflow-hidden
      "
    >
      {/* Background Image */}
      <div
        className="
          absolute
          inset-0
          bg-[#30231f]
          bg-cover
          bg-center
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,32,28,0.88), rgba(45,32,28,0.88)), url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&auto=format&fit=crop&q=80')",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">

        {/* Heading */}
        <h2
          className="
            text-center
            text-white
            font-bold
            text-4xl
            md:text-5xl
            lg:text-6xl
            leading-tight
            mb-16
            md:mb-20
          "
        >
          Why Choose{" "}
          <span className="text-orange-500">
            ChefKart?
          </span>
        </h2>

        {/* Cards */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
            lg:gap-10
          "
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                min-h-[380px]
                md:min-h-[390px]
                rounded-[28px]
                border
                border-white/35
                bg-white/[0.04]
                backdrop-blur-[2px]
                px-8
                py-8
                flex
                flex-col
                items-center
                transition-all
                duration-300
                hover:bg-white/[0.08]
              "
            >
              {/* Icon */}
              <div className="h-[190px] flex items-center justify-center">
                {feature.icon}
              </div>

              {/* Divider */}
              <div className="w-full border-t border-white/60 mb-8" />

              {/* Title */}
              <h3
                className="
                  text-white
                  text-xl
                  md:text-2xl
                  font-bold
                  text-center
                "
              >
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;