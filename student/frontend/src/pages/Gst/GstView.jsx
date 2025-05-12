import React, { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiArrowLeft,
  FiSend,
  FiFileText,
  FiEye,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { gstService } from "../../services/gstService";
import { toast } from "react-toastify";

const GstFormView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(location.state?.formData || null);
  const [uploadedFile, setUploadedFile] = useState(
    location.state?.uploadedFile || null
  );
  const [paymentType, setPaymentType] = useState(
    location.state?.paymentType || "gst"
  );
  const [submitting, setSubmitting] = useState(false);

  // On mount, if no state, try to load from localStorage
  useEffect(() => {
    if (!formData) {
      const saved = localStorage.getItem("pendingGstForm");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData);
        setPaymentType(parsed.paymentType || "gst");
        setUploadedFile(parsed.uploadedFile || null);
      }
    }
  }, [formData]);

  // Helper to get field value safely
  const getField = (key) => (formData && formData[key] ? formData[key] : "N/A");

  const handleViewDocument = () => {
    if (uploadedFile instanceof File) {
      const fileUrl = URL.createObjectURL(uploadedFile);
      window.open(fileUrl, "_blank");
    }
  };

  const handleSendDocument = async () => {
    try {
      setSubmitting(true);
      const studentId = localStorage.getItem("studentId");
      const response = await gstService.createGstDocument({
        studentId,
        file: uploadedFile,
        eventName: formData.eventName,
        companyName: formData.companyName,
        contactNumber: formData.contactNumber,
        panCard: formData.panCard,
        gstNumber: formData.gstNumber,
        billingAddress: formData.billingAddress,
        bankName: formData.bankName,
        amount: formData.amount,
      });
      if (response.success) {
        toast.success("GST document submitted successfully!");
        // Optionally clear localStorage
        localStorage.removeItem("pendingGstForm");
        navigate("/sponsor/gst-form/success", {
          state: {
            type: "gst",
            documentId: response.data.documentId,
            submissionDate: response.data.createdAt || new Date(),
          },
        });
      } else {
        toast.error(response.message || "Failed to submit GST document.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to submit GST document."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!formData) {
    return (
      <div className="bg-[#F6F6F6] min-h-[600px] flex items-center justify-center">
        <div className="text-gray-600">No GST form data found.</div>
      </div>
    );
  }

  return (
    <div className="bg-[#F6F6F6] min-h-[600px] flex items-center justify-center p-4">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow max-w-2xl w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 mb-4">
          <h1 className="text-lg md:text-xl font-semibold">
            GST Document Review
          </h1>
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-xs text-gray-500">
              {new Date().toLocaleDateString()} -{" "}
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid border border-gray-300 rounded px-3 py-5 grid-cols-1 pt-2 md:grid-cols-2 gap-4 text-xs text-gray-700 mb-4">
          <div>
            <p className="font-medium text-gray-500">Payment Type</p>
            <p className="pt-1 text-gray-700 font-medium">GST Payment</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">PAN Card</p>
            <p className="pt-1 text-gray-700 font-medium">
              {getField("panCard")}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Company Name</p>
            <p className="pt-1 text-gray-700 font-medium">
              {getField("companyName")}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Bank Name</p>
            <p className="pt-1 text-gray-700 font-medium">
              {getField("bankName")}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Contact Number</p>
            <p className="pt-1 text-gray-700 font-medium">
              {getField("contactNumber")}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-500">GST Number</p>
            <p className="pt-1 text-gray-700 font-medium">
              {getField("gstNumber")}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Amount</p>
            <p className="pt-1 text-gray-700 font-medium">
              ₹{getField("amount")}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Billing Address</p>
            <p className="pt-1 text-gray-700 font-medium">
              {getField("billingAddress")}
            </p>
          </div>
        </div>

        {/* Document Box */}
        <div className="mb-4">
          <p className="text-xs font-medium mb-1 text-gray-500">Document</p>
          <div className="border border-dashed border-gray-300 p-3 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center">
              <FiFileText className="text-gray-500 w-4 h-4 mr-2" />
              <p className="text-gray-600 text-xs">
                {uploadedFile ? uploadedFile.name : "No file uploaded"}
              </p>
            </div>
            {uploadedFile && (
              <button
                onClick={handleViewDocument}
                className="flex items-center text-xs gap-1 text-blue-600 hover:cursor-pointer hover:underline"
              >
                <FiEye className="w-3 h-3" />
                View
              </button>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
          <button
            onClick={() => navigate("/sponsor/gst-form")}
            className="flex items-center justify-center hover:cursor-pointer gap-2 text-xs px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            <FiArrowLeft className="w-3 h-3" />
            Back to Form
          </button>
          <button
            onClick={handleSendDocument}
            disabled={submitting}
            className="flex items-center justify-center hover:cursor-pointer gap-2 text-xs px-3 py-2 bg-[#2C3E50] text-white rounded hover:bg-gray-900 disabled:opacity-50"
          >
            {submitting ? "Sending..." : "Send Document"}
            <FiSend className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GstFormView;
