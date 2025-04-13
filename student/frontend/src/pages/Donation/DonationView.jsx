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
    <div className="flex justify-center min-h-[600px] items-center bg-[#F6F6F6] px-6 py-7">
      <div className="max-w-xl mx-auto w-full">
        <div className="bg-white p-6 rounded-lg shadow">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-3">
            <h1 className="text-base sm:text-lg font-semibold">
              Donation Document Review
            </h1>
            <p className="text-[10px] text-gray-500 order-first sm:order-last">
              January 15, 2024 10:30 AM
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid border border-gray-200 rounded-lg p-3 grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500 mb-3">
            <div className="space-y-0.5">
              <p className="font-medium">Type of Payment-Donation</p>
              <p className="text-gray-900 font-medium">Donation</p>
            </div>
            <div className="space-y-0.5">
              <p className="font-medium">Company Name</p>
              <p className="text-gray-900 font-medium">Tech Solutions Inc.</p>
            </div>
            <div className="space-y-0.5">
              <p className="font-medium">Contact Number</p>
              <p className="text-gray-900 font-medium">+1 (555) 123-4567</p>
            </div>
            <div className="space-y-0.5">
              <p className="font-medium">PAN Card</p>
              <p className="text-gray-900 font-medium">ABCDE1234F</p>
            </div>
            <div className="space-y-0.5">
              <p className="font-medium">Bank Name</p>
              <p className="text-gray-900 font-medium">Global Bank Ltd.</p>
            </div>
          </div>

          {/* Document Box */}
          <div className="mb-3">
            <p className="text-[10px] sm:text-xs font-medium mb-1 text-gray-500">
              Relevant Document
            </p>
            <div className="border border-dashed border-gray-300 p-2 sm:p-3 rounded-lg flex items-center justify-center flex-col bg-gray-100">
              <FiFileText className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
              <p className="text-gray-600 text-[10px] sm:text-xs mt-1">
                donation_document.pdf
              </p>
              <button
                onClick={handleViewDocument}
                className="mt-1 text-[10px] sm:text-xs text-blue-800 hover:underline hover:cursor-pointer"
              >
                View Document
              </button>
            </div>
          </div>

          {/* Approvals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 border-b border-gray-200 pb-3">
            <div className="flex items-center gap-1 p-2 sm:p-3 bg-green-100 border border-green-300 rounded">
              <FiCheckCircle className="text-green-600 w-3 h-3" />
              <span className="text-[10px] sm:text-xs font-medium text-green-700">
                Finance Head Approval
              </span>
            </div>
            <div className="flex items-center gap-1 p-2 sm:p-3 bg-gray-100 border border-gray-300 rounded">
              <FiClock className="text-gray-600 w-3 h-3" />
              <span className="text-[10px] sm:text-xs font-medium text-gray-700">
                Accountant Approval
              </span>
              <span className="text-[8px] sm:text-[10px] text-gray-500 ml-auto">
                (Pending approval)
              </span>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 sm:gap-0">
            <button
              onClick={() => {
                navigate("/sponsor/donation-form");
              }}
              className="flex hover:cursor-pointer items-center justify-center sm:justify-start gap-1 text-[10px] sm:text-xs px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              <FiArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Back to Form
            </button>
            <button
              onClick={() => navigate("/sponsor/donation-form/success")}
              className="flex hover:cursor-pointer items-center justify-center sm:justify-start gap-1 text-[10px] sm:text-xs px-3 py-2 bg-[#2C3E50] text-white rounded hover:bg-gray-800 transition-colors w-full sm:w-auto"
            >
              Send Document
              <FiSend className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationView;
