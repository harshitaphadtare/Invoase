import React, { useState } from "react";
import SidePanel from "../components/Sidepanel";
import {
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaSave,
  FaTimesCircle,
} from "react-icons/fa";

const BankDetails = () => {
  const [formData, setFormData] = useState({
    accountHolder: "John Anderson",
    bankName: "HSBC Bank",
    accountNumber: "451923456789",
    ifscCode: "HSBC0014578",
  });

  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleAccountNumber = () => {
    setShowAccountNumber((prev) => !prev);
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
    console.log("Updated Bank Details:", formData);
  };

  // Validation Functions
  const isValidAccountNumber = formData.accountNumber.length === 12;
  const isValidIFSC = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode); // IFSC format

  return (
    <div className="h-screen bg-[#F6F6F6] flex flex-col md:flex-row">
      <div className="w-full md:w-[250px]">
        <SidePanel />
      </div>

      <div className="flex-1 mt-9 w-full md:max-w-3xl mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Bank Account Details
            </h2>
            <button
              onClick={toggleEditMode}
              className="text-gray-700 hover:text-gray-900 flex items-center"
            >
              {isEditing ? (
                <FaSave className="mr-2" />
              ) : (
                <FaEdit className="mr-2" />
              )}
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Account Holder Name", name: "accountHolder" },
              { label: "Bank Name", name: "bankName" },
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
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  readOnly={!isEditing}
                />
              </div>
            ))}

            {/* IFSC Code Validation */}
            <div className="relative">
              <label className="block text-sm text-gray-600">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                readOnly={!isEditing}
              />
              {isValidIFSC ? (
                <FaCheckCircle className="absolute right-3 bottom-3 text-green-500" />
              ) : (
                <FaTimesCircle className="absolute right-3 bottom-3 text-red-500" />
              )}
            </div>

            {/* Account Number Validation */}
            <div className="relative">
              <label className="block text-sm text-gray-600">
                Account Number
              </label>
              <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-gray-400">
                <input
                  type="text"
                  name="accountNumber"
                  value={
                    showAccountNumber || isEditing
                      ? formData.accountNumber
                      : "****** " + formData.accountNumber.slice(-4)
                  }
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                  readOnly={!isEditing}
                />
                {!isEditing && (
                  <button
                    type="button"
                    onClick={toggleAccountNumber}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    {showAccountNumber ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
                {isValidAccountNumber ? (
                  <FaCheckCircle className="ml-2 text-green-500" />
                ) : (
                  <FaTimesCircle className="ml-2 text-red-500" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
