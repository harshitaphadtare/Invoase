import React from "react";
import { FaUserEdit, FaUniversity, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const SidePanel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-full w-64 bg-[#FCFCFC] shadow-md p-4">
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
        <button
          onClick={() => navigate("/profile")}
          className={`group flex items-center text-sm gap-3 p-3 rounded-lg cursor-pointer transition-all ${
            location.pathname === "/profile"
              ? "bg-gray-300 font-medium"
              : "text-gray-800 hover:bg-gray-300"
          }`}
        >
          <FaUserEdit className="w-4 h-4 text-gray-700 duration-300" />
          <span className="text-[#2C3E50] transition-all duration-200">
            Edit Profile
          </span>
        </button>

        {/* Edit Bank Details */}
        <button
          onClick={() => navigate("/bank-details")}
          className={`group flex items-center text-sm gap-3 p-3 rounded-lg cursor-pointer transition-all ${
            location.pathname === "/bank-details"
              ? "bg-gray-300 font-medium"
              : "text-gray-800 hover:bg-gray-300"
          }`}
        >
          <FaUniversity className="w-4 h-4 text-gray-700 duration-300" />
          <span className="text-[#2C3E50] transition-all duration-200">
            Edit Bank Details
          </span>
        </button>
      </nav>
    </div>
  );
};

export default SidePanel;
