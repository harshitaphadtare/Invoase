import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiArrowLeft,
} from "react-icons/fi";
import { donationService } from "../services/donationService";

const ViewOnly = () => {
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { donationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        setLoading(true);
        if (donationId) {
          const response = await donationService.getDonationById(donationId);
          setDocumentData(response.data);
        }
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch donation data");
      } finally {
        setLoading(false);
      }
    };
    fetchDonationData();
  }, [donationId]);

  const handleViewDocument = () => {
    if (documentData?.documentUrl) {
      window.open(documentData.documentUrl, "_blank");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[600px] bg-[#F6F6F6]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[600px] bg-[#F6F6F6]">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

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
              {new Date(documentData?.createdAt || Date.now()).toLocaleString()}
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
              <p className="text-gray-900 font-medium">
                {documentData?.donationDetails?.companyName || "N/A"}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="font-medium">Contact Number</p>
              <p className="text-gray-900 font-medium">
                {documentData?.donationDetails?.contactNumber || "N/A"}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="font-medium">PAN Card</p>
              <p className="text-gray-900 font-medium">
                {documentData?.donationDetails?.panCard || "N/A"}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="font-medium">Bank Name</p>
              <p className="text-gray-900 font-medium">
                {documentData?.donationDetails?.bankName || "N/A"}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="font-medium">Event Name</p>
              <p className="text-gray-900 font-medium">
                {documentData?.donationDetails?.eventName || "N/A"}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="font-medium">Amount</p>
              <p className="text-gray-900 font-medium">
                {documentData?.donationDetails?.amount
                  ? `₹${documentData.donationDetails.amount}`
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Document Box */}
          <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center mb-4">
            <FiFileText className="text-2xl text-gray-400 mb-2" />
            <p className="text-xs text-gray-500 mb-1">Uploaded Document</p>
            {documentData?.documentUrl ? (
              <span
                className="text-xs text-blue-600 underline hover:cursor-pointer"
                onClick={handleViewDocument}
              >
                View Document
              </span>
            ) : (
              <span className="text-xs text-gray-400">
                No document uploaded
              </span>
            )}
          </div>

          {/* Approval Steps - Improved UI */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-6 justify-between mt-2 mb-6">
            <div className="flex items-center gap-2 p-3 rounded-lg border border-green-200 bg-green-50 shadow-sm w-full sm:w-1/2">
              <FiCheckCircle className="text-green-600 w-5 h-5" />
              <div>
                <span className="block text-xs font-semibold text-green-800">
                  Finance Head Approval
                </span>
                <span className="block text-[10px] text-green-700">
                  Approved
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg border border-yellow-200 bg-yellow-50 shadow-sm w-full sm:w-1/2">
              <FiClock className="text-yellow-600 w-5 h-5" />
              <div>
                <span className="block text-xs font-semibold text-yellow-800">
                  Accountant Approval
                </span>
                <span className="block text-[10px] text-yellow-700">
                  Pending approval
                </span>
              </div>
            </div>
          </div>

          {/* Back to Dashboard Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex hover:cursor-pointer items-center gap-2 px-5 py-2 bg-[#2C3E50] text-white rounded shadow hover:bg-gray-800 transition-colors text-sm"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOnly;
