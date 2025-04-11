import React, { useEffect } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiArrowLeft,
  FiSend,
  FiFileText,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DonationView = () => {
  const handleViewDocument = () => {
    // Logic to view the document
    alert("Viewing document: donation_document.pdf");
  };
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F6F6F6]">
      <div className="pt-10 p-6 max-w-3xl mx-auto min-h-screen">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-semibold mb-1">
            Donation Document Review
          </h1>
          <p className="text-sm text-gray-500 mb-4 border-b border-gray-200 pb-4">
            Date: January 15, 2024 at 10:30 AM
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-500 mb-6">
            <div>
              <p className="font-medium">Type of Payment-Donation</p>
              <p className="text-gray-900 pt-1">Donation</p>
            </div>
            <div>
              <p className="font-medium">Company Name</p>
              <p className="text-gray-900 pt-1">Tech Solutions Inc.</p>
            </div>
            <div>
              <p className="font-medium">Contact Number</p>
              <p className="text-gray-900 pt-1">+1 (555) 123-4567</p>
            </div>
            <div>
              <p className="font-medium">PAN Card</p>
              <p className="text-gray-900 pt-1">ABCDE1234F</p>
            </div>
            <div>
              <p className="font-medium">Bank Name</p>
              <p className="text-gray-900 pt-1">Global Bank Ltd.</p>
            </div>
          </div>

          {/* Document Box */}
          <div>
            <p className="text-sm font-medium mb-2 text-gray-500">
              Relevant Document
            </p>
            <div className="border border-dashed border-gray-300 p-6 rounded-lg flex items-center justify-center flex-col bg-gray-100">
              <FiFileText className="text-gray-500 w-10 h-10" />
              <p className="text-gray-600 text-sm pt-2">
                donation_document.pdf
              </p>
              <button
                onClick={handleViewDocument}
                className="mt-2 text-sm text-blue-800 hover:underline hover:cursor-pointer"
              >
                View Document
              </button>
            </div>
          </div>

          {/* Approvals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6  border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2 p-4 bg-green-100 border border-green-300 rounded">
              <FiCheckCircle className="text-green-600 w-5 h-5" />
              <span className="text-sm font-medium text-green-700">
                Finance Head Approval
              </span>
            </div>
            <div className="flex items-center gap-2 p-4 bg-gray-100 border border-gray-300 rounded">
              <FiClock className="text-gray-600 w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">
                Accountant Approval
              </span>
              <span className="text-xs text-gray-500 ml-2">
                (Pending approval)
              </span>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => {
                navigate("/sponsor/donation-form");
              }}
              className="flex items-center gap-2 text-sm px-4 py-2 border border-gray-300 rounded hover:cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Form
            </button>
            <button
              onClick={() => navigate("/sponsor/donation-form/success")}
              className="flex items-center gap-2 text-sm px-4 py-2 bg-[#2C3E50] text-white rounded hover:cursor-pointer hover:bg-gray-800"
            >
              Send Document
              <FiSend className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationView;
