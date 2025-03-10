import React, { useState } from "react";
import SidePanel from "../components/Sidepanel";
import { assets } from "../assets/assets";
import { FaCamera, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "John Anderson",
    council: "Bloombox",
    phone: "+91 7700 900123",
    email: "hsp@somaiya.edu",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    enable2FA: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Update Information
  const handleUpdateInfo = () => {
    console.log("Updated Info:", formData);
    setIsEditing(false); // Now it correctly toggles back to false after saving
  };

  // Update Password
  const handleUpdatePassword = () => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password Updated Successfully");
  };

  return (
    <div className="h-auto bg-[#F6F6F6] flex">
      <div className="w-[250px]">
        <SidePanel />
      </div>

      <div className="flex-1 max-w-3xl mx-auto p-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={assets.person}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <button className="absolute bottom-0 right-0 bg-black p-1 rounded-full text-white">
              <FaCamera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Name", name: "name" },
              { label: "Council Name", name: "council" },
              { label: "Phone Number", name: "phone" },
              { label: "Email Address", name: "email", disabled: true },
            ].map((field, index) => (
              <div key={index} className="relative">
                <label className="block text-sm text-gray-600">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={!isEditing && field.name !== "phone"} // Can edit phone only
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                {field.name === "phone" || field.name === "email" ? (
                  <FaCheckCircle className="absolute right-3 bottom-3 text-green-500" />
                ) : null}
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              isEditing ? handleUpdateInfo() : setIsEditing(true)
            }
            className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-md w-full md:w-auto"
          >
            {isEditing ? "Save Information" : "Edit Information"}
          </button>
        </div>

        {/* Security Settings */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Security Settings
          </h2>
          <div className="space-y-4">
            {["currentPassword", "newPassword", "confirmNewPassword"].map(
              (field, index) => (
                <div key={index} className="relative">
                  <label className="block text-sm text-gray-600">
                    {field === "currentPassword"
                      ? "Current Password"
                      : field === "newPassword"
                      ? "New Password"
                      : "Confirm New Password"}
                  </label>
                  <input
                    type={showPasswords[field] ? "text" : "password"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility(field)}
                    className="absolute right-3 bottom-3 text-gray-500 cursor-pointer"
                  >
                    {showPasswords[field] ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              )
            )}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="2fa"
                name="enable2FA"
                checked={formData.enable2FA}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label htmlFor="2fa" className="text-sm text-gray-600">
                Enable Two-factor Authentication
              </label>
            </div>
            <button
              onClick={handleUpdatePassword}
              className="bg-gray-700 text-white px-4 py-2 rounded-md w-full md:w-auto"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
