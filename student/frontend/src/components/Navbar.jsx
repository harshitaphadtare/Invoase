import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mx-5 md:mx-12">
      <img
        className="mt-5 h-[33px] w-[120px] md:h-auto md:w-[160px]"
        src={assets.logo}
        alt=""
      />

      <div className="mt-5 flex justify-center items-center gap-2 bg-[#38A37F] px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-[#2C8565] hover:scale-105 active:scale-100 cursor-pointer">
        <p
          onClick={() => navigate("/student/signup")}
          className="font-medium text-sm text-white"
        >
          Create Account
        </p>
        <img className="w-4 h-4" src={assets.new_page} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
