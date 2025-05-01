import React, { useState } from "react";
import { FaUser, FaUniversity, FaHashtag, FaBarcode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

export default function BankDetailsForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.accountHolderName.trim()) {
      toast.error("Account holder name is required");
      return false;
    }
    if (!formData.bankName.trim()) {
      toast.error("Bank name is required");
      return false;
    }
    if (!formData.accountNumber.trim()) {
      toast.error("Account number is required");
      return false;
    }
    if (!formData.ifscCode.trim()) {
      toast.error("IFSC code is required");
      return false;
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      toast.error("Please enter a valid IFSC code");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Get studentId from localStorage
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      toast.error(
        "Student registration information not found. Please register again."
      );
      navigate("/student/signup");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/bank-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          studentId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to save bank details");
        return;
      }

      toast.success("Bank details saved successfully!");
      // Clear studentId from localStorage as it's no longer needed
      localStorage.removeItem("studentId");
      navigate("/student/dashboard");
    } catch (error) {
      toast.error("Failed to save bank details. Please try again.");
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

        {/* Title */}
        <div className="flex justify-center">
          <img width="50" height="50" src={assets.symbol} alt="Logo" />
        </div>

        {/* Title */}
        <h2 className="mt-1 text-center text-2xl font-semibold text-white">
          Enter Bank Details
        </h2>
        <div className="flex justify-center mt-1">
          <div className=" bg-gray-500 rounded-full h-1 w-1/5 flex justify-end">
            <div className="w-12 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-5 items-center mt-6 space-y-2"
        >
          {/* Account Holder Name */}
          <div className="relative w-full">
            <FaUser className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleInputChange}
              placeholder="Enter account holder name"
              className="w-full h-9 text-xs pl-10 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
            />
          </div>

          {/* Bank Name */}
          <div className="relative w-full">
            <FaUniversity className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
              placeholder="Enter bank name"
              className="w-full h-9 text-xs pl-10 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
            />
          </div>

          {/* Account Number */}
          <div className="relative w-full">
            <FaHashtag className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              placeholder="Enter Account number"
              className="w-full h-9 text-xs pl-10 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
            />
          </div>

          {/* IFSC Code */}
          <div className="relative w-full">
            <FaBarcode className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleInputChange}
              placeholder="Enter IFSC Code"
              className="w-full h-9 text-xs pl-10 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
            />
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full mt-3 rounded-lg bg-[#38A37F] p-2 text-sm text-white transition-all duration-300 hover:bg-[#2C8565] hover:font-semibold cursor-pointer"
          >
            Create Account
          </button>

          <p className="text-center text-[#9CA3AF] text-xs">
            Are you an accountant?{" "}
            <span
              onClick={() => navigate("/accountant/signup")}
              className="text-xs text-[#38A37F] cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
