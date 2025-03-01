import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { assets } from "../assets/assets";

const SuccessMsg = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center mx-3 ">
        {/* Success Icon */}
        <div className="flex justify-center">
          <img width={50} height={50} src={assets.success_tick} alt="" />
        </div>

        <h2 className="md:text-2xl font-bold mt-4 text-xl">
          Successfully Signed Up!
        </h2>
        <p className="text-[#4B5563] mt-2 text-sm">
          Thank you for registering with us
        </p>

        {/* Verification Message */}
        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <div className="flex items-start gap-2">
            <img
              className="mt-1"
              width={10}
              height={10}
              src={assets.clock}
              alt=""
            />
            <p className="text-[#111827] font-semibold text-sm">
              Account Verification in Progress
            </p>
          </div>

          <p className="text-xs mt-2 mx-1 text-gray-700 text-start">
            Your account is currently pending admin verification. This process
            typically takes 1-2 hours.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex mt-6 space-x-2 px-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-[#2C3E50] text-xs md:text-sm text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-800 transition"
          >
            <FaHome className="w-[11px] h-[11px] md:w-[14px] md:h-[14px]" />{" "}
            Return to Home
          </button>
          <button className="flex items-center gap-2 border text-xs md:text-sm border-gray-400 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-100 transition">
            <img
              className="w-[11px] h-[11px] md:w-[14px] md:h-[14px]"
              src={assets.support}
              alt="support"
            />{" "}
            Contact Support
          </button>
        </div>
        <hr className="mt-6 border-gray-200" />
        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6">
          Need help? Contact us at{" "}
          <a href="mailto:support@example.com" className="text-blue-600">
            support@invoase.com
          </a>
        </p>
        <p className="text-xs text-gray-500">
          View our{" "}
          <a href="#" className="text-blue-600">
            FAQ
          </a>{" "}
          for common questions during verification.
        </p>
      </div>
    </div>
  );
};

export default SuccessMsg;
