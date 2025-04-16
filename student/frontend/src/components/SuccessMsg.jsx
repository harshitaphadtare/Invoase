import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaHome } from "react-icons/fa";

const SuccessMsg = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const successSound = new Audio(`${assets.success_sound}`);
    successSound
      .play()
      .catch((error) => console.log("Audio play failed", error));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm w-full max-w-md p-6">
        {/* Success Icon */}
        <div className="flex justify-center mb-4 mt-5">
          <img src={assets.success_tick} alt="Success" className="w-13 h-13" />
        </div>

        {/* Success Message */}
        <h2 className="text-center text-xl font-bold text-gray-800 mb-2">
          Successfully Signed Up!
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Thank you for registering with us
        </p>

        {/* Verification Status */}
        <div className="bg-[#EFF6FF] rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <img src={assets.clock} alt="" className="w-3 h-3" />
            <p className="font-medium">Account Verification in Progress</p>
          </div>
          <p className="text-gray-600 text-sm mt-1 ml-4">
            Your account is currently pending admin verification. This process
            typically takes 1-2 hours.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="hover:cursor-pointer flex-1 px-2 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <FaHome />
            Return to Home
          </button>
          <button
            onClick={() => window.open("/support", "_blank")}
            className="hover:cursor-pointer flex justify-center items-center gap-2 px-8 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors text-sm"
          >
            <img className="w-4 h-4" src={assets.support} alt="" />
            Contact Support
          </button>
        </div>

        <hr className="my-4 border-gray-200" />

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            Need help? Contact us at{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:underline"
            >
              support@example.com
            </a>
          </p>
          <p className="mt-1">
            View our{" "}
            <a href="/faq" className="text-blue-600 hover:underline">
              FAQ
            </a>{" "}
            for common questions during verification
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessMsg;
