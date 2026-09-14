import React from "react";
import { MdOutlineSoupKitchen } from "react-icons/md";

const ServiceNotice = () => {
  return (
    <div className="w-full border-b border-orange-200 bg-[#fff5ed] px-4 py-2.5">
      <div className="flex items-center justify-center gap-2.5 text-center">
        <MdOutlineSoupKitchen
          className="text-[#f47b20] flex-shrink-0"
          size={22}
        />

        <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">
          Chefit service is currently available only in Gurugram & Delhi NCR.
        </p>
      </div>
    </div>
  );
};

export default ServiceNotice;