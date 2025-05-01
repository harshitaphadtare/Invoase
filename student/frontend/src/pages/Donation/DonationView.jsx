import React, { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiArrowLeft,
  FiSend,
  FiFileText,
} from "react-icons/fi";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { donationService } from "../../services/donationService";

const DonationView = () => {
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { donationId } = useParams();

  // Load data from navigation state or localStorage
  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        setLoading(true);
        if (donationId) {
          const response = await donationService.getDonationById(donationId);
          setDocumentData(response.data);
        } else if (location.state?.formData) {
          setDocumentData(location.state.formData);
        } else {
          // Try to load from localStorage
          const saved = localStorage.getItem("pendingDonationForm");
          if (saved) {
            const parsed = JSON.parse(saved);
            setDocumentData(parsed.formData);
          }
        }
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch donation data");
      } finally {
        setLoading(false);
      }
    };
    fetchDonationData();
  }, [donationId, location.state]);

  const handleViewDocument = () => {
    if (documentData?.documentUrl) {
      window.open(documentData.documentUrl, "_blank");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Send Document: actually create the document in the backend
  const handleSendDocument = async () => {
    setSubmitting(true);
    try {
      const studentId = localStorage.getItem("studentId");
      if (!studentId)
        throw new Error("Student ID not found. Please login again.");
      // Get file from navigation state or localStorage (not storable in localStorage, so must be in state)
      const file = location.state?.uploadedFile;
      if (!file) throw new Error("File not found. Please re-upload.");
      const submitData = {
        studentId,
        file,
        ...documentData,
      };
      const response = await donationService.createDonation(submitData);
      // Clear saved form data
      localStorage.removeItem("pendingDonationForm");
      // Navigate to success page
      navigate("/sponsor/donation-form/success", {
        state: { formData: response.data },
      });
    } catch (err) {
      setError(err.message || "Failed to submit document");
    } finally {
      setSubmitting(false);
    }
  };

  const file = location.state?.uploadedFile;
  let fileUrl = null;
  if (file instanceof File) {
    fileUrl = URL.createObjectURL(file);
  }

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
              {new Date().toLocaleString()}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid border border-gray-200 rounded-lg p-3 grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500 mb-3">
            <div className="space-y-0.5">
              <p className="font-medium">Type of Payment</p>
              <p className="text-gray-900 font-medium">Donation</p>
            </div>
            <div className="space-y-0.5">
              <p className="font-medium">Company Name</p>
              <p className="text-gray-900 font-medium">
                {documentData?.companyName || "N/A"}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="font-medium">Contact Number</p>
              <p className="text-gray-900 font-medium">
                {documentData?.contactNumber || "N/A"}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="font-medium">PAN Card</p>
              <p className="text-gray-900 font-medium">
                {documentData?.panCard || "N/A"}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="font-medium">Bank Name</p>
              <p className="text-gray-900 font-medium">
                {documentData?.bankName || "N/A"}
              </p>
            </div>
          </div>

          {/* Document Box */}
          <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center mb-4">
            <FiFileText className="text-2xl text-gray-400 mb-2" />
            <p className="text-xs text-gray-500 mb-1">Uploaded Document</p>
            {fileUrl ? (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 underline hover:cursor-pointer"
              >
                View Document
              </a>
            ) : documentData?.documentUrl ? (
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

          {/* Approval Steps (static for now) */}
          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
            <button
              onClick={() => {
                // Remove uploaded file info from localStorage
                const saved = localStorage.getItem("pendingDonationForm");
                if (saved) {
                  const parsed = JSON.parse(saved);
                  // Remove uploadedFile property
                  delete parsed.uploadedFile;
                  localStorage.setItem(
                    "pendingDonationForm",
                    JSON.stringify(parsed)
                  );
                }
                navigate("/sponsor/donation-form");
              }}
              className="flex hover:cursor-pointer items-center justify-center sm:justify-start gap-1 text-[10px] sm:text-xs px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              <FiArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Back to Form
            </button>
            <button
              onClick={handleSendDocument}
              disabled={submitting}
              className="flex hover:cursor-pointer items-center justify-center sm:justify-start gap-1 text-[10px] sm:text-xs px-3 py-2 bg-[#2C3E50] text-white rounded hover:bg-gray-800 transition-colors w-full sm:w-auto disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Document"}
              <FiSend className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationView;
