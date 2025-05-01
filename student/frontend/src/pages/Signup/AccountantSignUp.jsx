import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUser,
  FaPhone,
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHashtag,
} from "react-icons/fa";

const AccountantSignUp = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    department: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Check for empty fields
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        toast.error(
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
        );
        return false;
      }
    }

    // Validate email domain
    if (!formData.email.toLowerCase().endsWith("@iitg.ac.in")) {
      toast.error("Please use your IITG email address");
      return false;
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Here you would make your API call to register the accountant
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.message || "Failed to create account. Please try again."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-lg rounded-3xl bg-[#2C3E50] mx-3 px-2 py-5 pb-8 shadow-2xl sm:px-8">
        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              navigate("/student/signup");
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
        <h2 className="text-center text-2xl font-semibold text-white">
          Create a new Account
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-5 items-center mt-6 space-y-2"
        >
          {/*name*/}
          <div className="relative w-full">
            <FaUser className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              className="w-full h-9 text-xs pl-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
            />
          </div>

          {/*phone and department*/}
          <div className="flex w-full gap-2">
            <div className="relative w-2/4">
              <FaPhone className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full h-9 text-xs pl-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
              />
            </div>
            <div className="relative w-2/4">
              <FaHashtag className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="Department"
                className="w-full text-xs h-9 pl-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
              />
            </div>
          </div>

          {/*email*/}
          <div className="relative w-full">
            <FaEnvelope className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter college email"
              className="w-full text-xs pl-9 h-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
            />
          </div>

          {/*password*/}
          <div className="relative w-full">
            <FaLock className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
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

          <button
            type="submit"
            className="w-full mt-3 rounded-lg bg-[#38A37F] p-2 text-sm text-white transition-all duration-300 hover:bg-[#2C8565] hover:font-semibold cursor-pointer"
          >
            Create Account
          </button>

          <button
            onClick={() => navigate("/accountant/login")}
            className="w-full rounded-lg border text-sm border-[#38A37F] p-2 text-[#38A37F] hover:bg-[#2C3E50] transition-all duration-400 cursor-pointer transition-all duration-400 hover:font-semibold"
          >
            Log in
          </button>

          <p className="text-center text-[#9CA3AF] text-xs">
            Are you a Student?{" "}
            <a
              onClick={() => navigate("/student/signup")}
              className="text-xs text-[#38A37F] cursor-pointer hover:underline"
            >
              Click here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AccountantSignUp;
