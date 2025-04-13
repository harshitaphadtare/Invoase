import React from "react";
import { assets } from "../assets/assets";

const AboutUs = () => {
  return (
    <div className="bg-[#F6F6F6] min-h-screen px-6 py-16 flex flex-col md:flex-row items-center justify-center gap-10">
      {/* Left - Text Content */}
      <div className="bg-white shadow-md p-8 rounded-lg w-full md:w-1/2 max-w-xl">
        <h2 className="text-2xl font-semibold text-[#2C3E50] mb-6">
          Empowering Smart Financial Decisions
        </h2>
        <p className="text-gray-700 mb-4 text-sm">
          Invoase is a revolutionary platform designed to streamline financial
          approval processes for educational institutions and organizations.
          By digitizing manual tasks, we help you save time, eliminate
          paperwork, and improve transparency.
        </p>
        <p className="text-gray-700 mb-6 text-sm">
          Our platform caters to different user roles – students, accountants,
          and administrators – making financial workflows smooth and secure
          through a centralized system. With intuitive design and data integrity
          at the core, Invoase ensures your experience is seamless.
        </p>
        <a
          href="/contact"
          className="inline-block bg-[#38A37F] text-white px-6 py-2 rounded-md hover:bg-[#2C8565] transition duration-300"
        >
          Contact Us
        </a>
      </div>

      {/* Right - Visual or Logo */}
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#2C3E50] tracking-wide">
          INVO<span className="text-[#38A37F]">₹</span>ASE
        </h1>
        <p className="mt-4 text-gray-500 max-w-sm mx-auto">
          Revolutionizing finance through simplicity & security.
        </p>
      </div>
    </div>
  );
};

export default AboutUs
