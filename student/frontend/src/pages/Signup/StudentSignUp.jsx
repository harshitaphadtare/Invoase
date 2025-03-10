import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCalendarAlt,
  FaHashtag,
} from "react-icons/fa";

export default function SignupForm() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-lg rounded-3xl bg-[#2C3E50] mx-3 px-2 py-5 pb-8 shadow-2xl sm:px-8">
        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              className="cursor-pointer"
              width={40}
              src={assets.back_button}
              alt="Back"
            />
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              className="cursor-pointer"
              width={40}
              src={assets.cross_button}
              alt="Close"
            />
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <img width="50" height="50" src={assets.symbol} alt="Logo" />
        </div>

        {/* Title */}
        <h2 className="mt-1 text-center text-2xl font-semibold text-white">
          {isLogin ? "Login to your account" : "Create a new Account"}
        </h2>
        {!isLogin && (
          <div className="flex justify-center mt-1">
            <div className="bg-gray-500 rounded-full h-1 w-1/5">
              <div className="w-12 h-1 bg-white rounded-full"></div>
            </div>
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col mx-5 items-center mt-6 space-y-2">
          {/*name*/}
          {!isLogin && (
            <div className="relative w-full">
              <FaUser className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Enter full name"
                className="w-full h-9 text-xs pl-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
              />
            </div>
          )}

          {/*tenure*/}
          {!isLogin && (
            <div className="flex w-full gap-2">
              <div className="relative w-2/4">
                <FaPhone className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="w-full h-9 text-xs pl-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
                />
              </div>
              <div className="relative w-2/4">
                <FaCalendarAlt className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
                <select className="w-full cursor-pointer h-9 text-xs pl-8 rounded-lg border border-[#9CA3AF] bg-[#374859] p-2 text-[#9CA3AF] transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none">
                  <option>Select tenure</option>
                  <option>1 Year</option>
                  <option>2 Years</option>
                  <option>3 Years</option>
                </select>
              </div>
            </div>
          )}
          {!isLogin && (
            <div className="flex w-full gap-2">
              {/*council name*/}
              <div className="relative w-2/3">
                <FaBuilding className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Enter council name"
                  className="w-full h-9 text-xs pl-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
                />
              </div>

              {/*council code*/}
              <div className="relative w-1/3">
                <FaHashtag className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Council code"
                  className="w-full text-xs h-9 pl-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/*email*/}
          <div className="relative w-full">
            <FaEnvelope className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
            <input
              type="email"
              placeholder="Enter college email"
              className="w-full text-xs pl-9 h-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
            />
          </div>

          {/*password*/}
          <div className="relative w-full">
            <FaLock className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Create a password"
              className="w-full text-xs pl-9 h-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-3 text-[#9CA3AF] hover:text-white"
            >
              {passwordVisible ? (
                <FaEyeSlash className="w-[10px] text-[#9CA3AF] cursor-pointer" />
              ) : (
                <FaEye className="w-[10px] text-[#9CA3AF] cursor-pointer" />
              )}
            </button>
          </div>

          {/* Remember me & Forgot Password (Only for Login) */}
          {isLogin && (
            <div className="flex px-1 mt-1 mb-3 justify-between w-full text-xs font-medium text-[#9E9E9E]">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="appearance-none w-3 h-3 border-2 border-gray rounded-full bg-[#2C3E50] checked:bg-white cursor-pointer"
                />
                <span>Remember me?</span>
              </label>
              <a href="#" className="text-[#38A37F] hover:underline">
                Forgot Password?
              </a>
            </div>
          )}

          <button
            onClick={(e) => {
              if (isLogin) {
                navigate("/dashboard");
              } else {
                e.preventDefault();
                navigate("/student/bank-details");
              }
            }}
            className="w-full mt-3 rounded-lg bg-[#38A37F] p-2 text-sm text-white transition-all duration-300 hover:bg-[#2C8565]  hover:font-semibold cursor-pointer"
          >
            {isLogin ? "Log in" : "Create Account"}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
            }}
            className="w-full rounded-lg border text-sm border-[#38A37F] p-2 text-[#38A37F] hover:bg-[#2C3E50] transition-all duration-400 cursor-pointer transition-all duration-400 hover:font-semibold"
          >
            {isLogin ? "Create Account" : "Log in"}
          </button>

          <p className="text-center text-[#9CA3AF] text-xs">
            Are you an accountant?{" "}
            <a
              onClick={() => {
                navigate("/accountant/signup");
              }}
              className="text-xs text-[#38A37F] cursor-pointer hover:underline"
            >
              Click here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
