import React from "react";
import { FaUserEdit, FaUniversity, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SidePanel = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-64 bg-[#FCFCFC] shadow-md p-4">
      <nav className="flex flex-col gap-4">
        {/* Back Button */}
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="flex items-center border-2 border-gray-600 rounded-full h-5 w-5 justify-center text-gray-700 hover:text-black hover:border-gray-800 cursor-pointer transition-all"
        >
          <FaArrowLeft className="w-3 h-3 " />
        </button>

        {/* Edit Profile */}
        <button className="group flex items-center text-sm gap-3 p-3 text-gray-800 hover:bg-gray-300 rounded-lg cursor-pointer transition-all">
          <FaUserEdit className="w-4 h-4 text-gray-700 transition-all duration-300 group-hover:scale-110" />
          <span className="text-[#2C3E50] transition-all duration-200 group-hover:font-medium">
            Edit Profile
          </span>
        </button>

        {/* Edit Bank Details */}
        <button className="group flex items-center text-sm gap-3 p-3 text-gray-800 hover:bg-gray-300 rounded-lg cursor-pointer transition-all">
          <FaUniversity className="w-4 h-4 text-gray-700 transition-all duration-300 group-hover:scale-110" />
          <span className="text-[#2C3E50] transition-all duration-200 group-hover:font-medium">
            Edit Bank Details
          </span>
        </button>
      </nav>
    </div>
  );
};

export default SidePanel;
