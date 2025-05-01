import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUser,
  FaPhone,
  FaBuilding,
  FaEnvelope,
  FaCalendarAlt,
  FaHashtag,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function SignupForm() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    tenure: "",
    councilName: "",
    councilCode: "",
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
    // Basic validation
    if (
      !formData.name ||
      !formData.phoneNumber ||
      !formData.tenure ||
      !formData.councilName ||
      !formData.councilCode ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("All fields are required");
      return false;
    }

    // Email validation for Somaiya domain
    if (!formData.email.endsWith("@somaiya.edu")) {
      toast.error("Please use your Somaiya email address");
      return false;
    }

    // Phone number validation
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
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

    if (!validateForm()) {
      return;
    }

    try {
      // Make API call to register student
      const response = await fetch(
        "http://localhost:5000/api/student/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      // Store the student ID for bank details
      localStorage.setItem("studentId", data.studentId);
      toast.success("Registration successful! Please enter your bank details.");
      navigate("/student/bank-details");
    } catch (error) {
      toast.error("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-lg rounded-3xl bg-[#2C3E50] mx-3 px-2 py-5 pb-8 shadow-2xl sm:px-8">
        {/* Navigation */}
        <div className="flex justify-between">
          <button onClick={() => navigate("/")}>
            <img
              className="cursor-pointer"
              width={40}
              src={assets.back_button}
              alt="Back"
            />
          </button>
          <button onClick={() => navigate("/")}>
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
          Student Registration Form
        </h2>
        <div className="flex justify-center mt-1">
          <div className="bg-gray-500 rounded-full h-1 w-1/5">
            <div className="w-12 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-5 items-center mt-6 space-y-2"
        >
          {/*name*/}
          <div className="relative w-full">
            <FaUser className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              className="w-full h-9 text-xs pl-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
            />
          </div>

          {/*tenure and phone*/}
          <div className="flex w-full gap-2">
            <div className="relative w-2/4">
              <FaPhone className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
              <input
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full h-9 text-xs pl-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
              />
            </div>
            <div className="relative w-2/4">
              <FaCalendarAlt className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
              <select
                name="tenure"
                value={formData.tenure}
                onChange={handleInputChange}
                className="w-full cursor-pointer h-9 text-xs pl-8 rounded-lg border border-[#9CA3AF] bg-[#374859] p-2 text-[#9CA3AF] transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
              >
                <option value="">Select tenure</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>
          </div>

          {/*council name and code*/}
          <div className="flex w-full gap-2">
            <div className="relative w-2/3">
              <FaBuilding className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
              <input
                name="councilName"
                type="text"
                value={formData.councilName}
                onChange={handleInputChange}
                placeholder="Enter council name"
                className="w-full h-9 text-xs pl-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
              />
            </div>
            <div className="relative w-1/3">
              <FaHashtag className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
              <input
                name="councilCode"
                type="text"
                value={formData.councilCode}
                onChange={handleInputChange}
                placeholder="Council code"
                className="w-full text-xs h-9 pl-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
              />
            </div>
          </div>

          {/*email*/}
          <div className="relative w-full">
            <FaEnvelope className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
            <input
              name="email"
              type="email"
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
              name="password"
              type={passwordVisible ? "text" : "password"}
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
            Create an Account
          </button>
        </form>

        {/* Moved buttons outside the form */}
        <div className="mt-2 flex flex-col mx-5 items-center space-y-2">
          <button
            type="button"
            onClick={() => navigate("/student/login")}
            className="w-full rounded-lg border text-sm border-[#38A37F] p-2 text-[#38A37F] hover:bg-[#2C3E50] transition-all duration-400 cursor-pointer transition-all duration-400 hover:font-semibold"
          >
            Log in
          </button>

          <p className="text-center text-[#9CA3AF] text-xs">
            Are you an accountant?{" "}
            <a
              onClick={() => navigate("/accountant/signup")}
              className="text-xs text-[#38A37F] cursor-pointer hover:underline"
            >
              Click here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
