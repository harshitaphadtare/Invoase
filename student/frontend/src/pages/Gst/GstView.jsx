import React from "react";
import {
  FiCheckCircle,
  FiClock,
  FiArrowLeft,
  FiSend,
  FiFileText,
  FiEye,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const GstFormView = () => {
  const navigate = useNavigate();

  const handleViewDocument = () => {
    alert("Viewing document: donation_receipt_2024001.pdf");
  };

  return (
    <div className="bg-[#F6F6F6] min-h-[521px] flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">GST Document Review</h1>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              height="15px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="gray"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-xs text-gray-500">March 15, 2024 - 14:30 GMT</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 pt-2 md:grid-cols-2 gap-4 text-xs text-gray-700 mb-4">
          <div>
            <p className="font-medium text-gray-500">Payment Type</p>
            <p className="pt-1 text-gray-700 font-medium">
              Credit Card (GST Included)
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-500">PAN Card</p>
            <p className="pt-1 text-gray-700 font-medium">ABCDE1234F</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Company Name</p>
            <p className="pt-1 text-gray-700 font-medium">Tech Solutions Ltd</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Bank Name</p>
            <p className="pt-1 text-gray-700 font-medium">Global Bank</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Contact Number</p>
            <p className="pt-1 text-gray-700 font-medium">+1 (555) 123-4567</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">GST Confirmation Letter</p>
            <p className="pt-1 text-gray-700 font-medium">Uploaded</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">GST Details</p>
            <p className="pt-1 text-gray-700 font-medium">GST123456789</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Billing Address</p>
            <p className="pt-1 text-gray-700 font-medium">
              123 Business Street, Tech Park
              <br />
              Silicon Valley, CA 94025
            </p>
          </div>
        </div>

        {/* Document Box */}
        <div className="mb-4">
          <p className="text-xs font-medium mb-1 text-gray-500">Document</p>
          <div className="border border-dashed border-gray-300 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <FiFileText className="text-gray-500 w-4 h-4 mr-2" />
              <p className="text-gray-600 text-xs">
                donation_receipt_2024001.pdf (Uploaded)
              </p>
            </div>
            <button
              onClick={handleViewDocument}
              className="flex items-center text-xs gap-1 text-blue-600 hover:cursor-pointer hover:underline"
            >
              <FiEye className="w-3 h-3" />
              View
            </button>
          </div>
        </div>

        {/* Approvals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-3 bg-green-100 border border-green-300 rounded">
            <FiCheckCircle className="text-green-600 w-4 h-4" />
            <span className="text-xs font-medium text-green-700">
              Finance Head Approval
            </span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-gray-100 border border-gray-300 rounded">
            <FiClock className="text-gray-600 w-4 h-4" />
            <span className="text-xs font-medium text-gray-700">
              Accountant Approval
            </span>
            <span className="text-[10px] text-gray-500 ml-2">
              (Pending approval)
            </span>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              navigate("/sponsor/gst-form");
            }}
            className="flex items-center hover:cursor-pointer gap-2 text-xs px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
          >
            <FiArrowLeft className="w-3 h-3" />
            Back to Form
          </button>
          <button
            onClick={() => {
              navigate("/sponsor/gst-form/success");
            }}
            className="flex items-center hover:cursor-pointer gap-2 text-xs px-3 py-1 bg-[#2C3E50] text-white rounded hover:bg-gray-900"
          >
            Send Document
            <FiSend className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GstFormView;
