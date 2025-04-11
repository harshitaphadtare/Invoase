import React, { useState } from "react";
import {
  FaUserEdit,
  FaUniversity,
  FaArrowLeft,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const SidePanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-15 left-4 bg-gray-800 text-white p-2 rounded-md z-50"
      >
        {isOpen ? (
          <FaTimes className="w-5 h-5" />
        ) : (
          <FaBars className="w-5 h-5" />
        )}
      </button>

      {/* Overlay when Sidebar is Open (for mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Side Panel */}
      <div
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-[#FCFCFC] shadow-md p-4 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block z-50`}
      >
        <nav className="flex flex-col gap-4">
          {/* Back Button */}
          <button
            onClick={() => {
              navigate("/dashboard");
              setIsOpen(false);
            }}
            className="flex items-center border-2 border-gray-600 rounded-full h-5 w-5 justify-center text-gray-700 hover:text-black hover:border-gray-800 cursor-pointer transition-all"
          >
            <FaArrowLeft className="w-3 h-3 " />
          </button>

          {/* Edit Profile */}
          <button
            onClick={() => {
              navigate("/profile");
              setIsOpen(false);
            }}
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
            onClick={() => {
              navigate("/bank-details");
              setIsOpen(false);
            }}
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
    </>
  );
};

export default SidePanel;
