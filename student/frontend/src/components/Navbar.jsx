import React from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on these paths
  const hiddenPaths = ["/profile", "/bank-details"];
  const isHidden = hiddenPaths.includes(location.pathname);

  // Navigation links array
  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Requests", path: "/requests" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex shadow-md py-2 justify-between px-5 md:px-12 bg-white items-center">
      {/* Logo */}
      <img
        onClick={() => {
          navigate("/dashboard");
        }}
        className="h-8 md:h-10 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Navigation Links */}
      {!isHidden && (
        <ul className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className="relative text-gray-500 transition-all duration-200"
            >
              <li id="nav-item" className="py-2 text-sm">
                {link.name}
              </li>
              <hr className="nav-underline absolute top-11 left-0 w-full h-0.5 bg-[#38A37F] hidden" />
            </NavLink>
          ))}
        </ul>
      )}

      {/* Action Buttons */}
      {!isHidden && (
        <div className="flex items-center gap-2">
          <div
            onClick={() => navigate("/bank-details")}
            className="flex justify-center items-center gap-2 bg-[#38A37F] px-3 py-2 sm:px-4 rounded-lg shadow-md transition-all duration-300 hover:bg-[#2C8565] cursor-pointer"
          >
            <p className="font-medium text-xs sm:text-sm text-white">
              Bank Details
            </p>
            <img
              className="w-4 h-4"
              src={assets.new_page}
              alt="New Page Icon"
            />
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="bg-[#2C3E50] shadow-md rounded-full h-9 w-9 flex justify-center items-center cursor-pointer hover:bg-gray-800 transition-all duration-300"
          >
            <img width={15} height={15} src={assets.profile} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
