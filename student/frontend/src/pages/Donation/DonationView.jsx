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
    <div className="bg-[#F6F6F6] min-h-[100px] flex items-center justify-center">
      <div className="pt-6 p-4 max-w-2xl mx-auto">
        <div className="bg-white p-5 rounded-lg shadow">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-xl font-semibold">Donation Document Review</h1>
            <p className="text-xs text-gray-500 ">
              Date: January 15, 2024 at 10:30 AM
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500 mb-4">
            <div>
              <p className="font-medium">Type of Payment-Donation</p>
              <p className="text-gray-900 pt-1 font-medium">Donation</p>
            </div>
            <div>
              <p className="font-medium">Company Name</p>
              <p className="text-gray-900 pt-1 font-medium">
                Tech Solutions Inc.
              </p>
            </div>
            <div>
              <p className="font-medium">Contact Number</p>
              <p className="text-gray-900 pt-1 font-medium">
                +1 (555) 123-4567
              </p>
            </div>
            <div>
              <p className="font-medium">PAN Card</p>
              <p className="text-gray-900 pt-1 font-medium">ABCDE1234F</p>
            </div>
            <div>
              <p className="font-medium">Bank Name</p>
              <p className="text-gray-900 pt-1 font-medium">Global Bank Ltd.</p>
            </div>
          </div>

          {/* Document Box */}
          <div>
            <p className="text-xs font-medium mb-1 text-gray-500">
              Relevant Document
            </p>
            <div className="border border-dashed border-gray-300 p-4 rounded-lg flex items-center justify-center flex-col bg-gray-100">
              <FiFileText className="text-gray-500 w-8 h-8" />
              <p className="text-gray-600 text-xs pt-1">
                donation_document.pdf
              </p>
              <button
                onClick={handleViewDocument}
                className="mt-1 text-xs text-blue-800 hover:underline hover:cursor-pointer"
              >
                View Document
              </button>
            </div>
          </div>

          {/* Approvals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 border-b border-gray-200 pb-3">
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
          <div className="flex justify-between mt-4">
            <button
              onClick={() => {
                navigate("/sponsor/donation-form");
              }}
              className="flex items-center gap-2 text-xs px-3 py-1 border border-gray-300 rounded hover:cursor-pointer"
            >
              <FiArrowLeft className="w-3 h-3" />
              Back to Form
            </button>
            <button
              onClick={() => navigate("/sponsor/donation-form/success")}
              className="flex items-center gap-2 text-xs px-3 py-1 bg-[#2C3E50] text-white rounded hover:cursor-pointer hover:bg-gray-800"
            >
              Send Document
              <FiSend className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationView;
