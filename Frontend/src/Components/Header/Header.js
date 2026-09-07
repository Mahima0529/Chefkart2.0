import React from "react";
import { MdOutlineSoupKitchen } from "react-icons/md";

const ServiceNotice = () => {
  return (
    <div className="w-full border border-gray-300 bg-[#fff5ed] px-4 py-3">
      <div className="flex items-center justify-center gap-4">
        <MdOutlineSoupKitchen
          className="text-[#f47b20]"
          size={32}
        />

        <p className="text-[28px] font-medium text-black">
          Chefit service is available only in Gurugram.
        </p>
      </div>
    </div>
  );
};

export default ServiceNotice;