import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import { FiFileText, FiBell, FiMail } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

const DonationSuccess = () => {
  useEffect(() => {
    const successSound = new Audio(`${assets.success_sound}`);
    successSound
      .play()
      .catch((error) => console.log("Audio play failed", error));
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const isGstForm = location.pathname.includes("gst-form");

  // Get submission details from location state with fallback values
  const submissionDate = location.state?.submissionDate || new Date();
  const documentId =
    location.state?.documentId || "DOC-" + format(new Date(), "yyyyMMddHHmm");

  // Format date to match the dashboard format
  const formatDate = (date) => {
    const formatted = format(new Date(date), "MMM d, yyyy h:mma");
    const [month, ...rest] = formatted.split(" ");
    return [
      month.charAt(0).toUpperCase() + month.slice(1).toLowerCase(),
      ...rest,
    ]
      .join(" ")
      .toLowerCase()
      .replace(/^[a-z]/, (c) => c.toUpperCase());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F6F6F6] min-h-[500px] px-4 sm:px-6 py-4 sm:py-6">
      <div className="bg-white px-4 sm:px-6 py-4 sm:py-5 rounded-lg shadow max-w-md mx-auto">
        {/* Success Tick */}
        <div className="flex justify-center mb-3 sm:mb-4">
          <img
            className="w-8 h-8 sm:w-10 sm:h-10"
            src={assets.success_tick}
            alt="Success"
          />
        </div>
        <h2 className="text-center text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          {isGstForm ? "GST Document" : "Donation Document"} Successfully
          Submitted
        </h2>

        {/* Reference Tab */}
        <div className="bg-gray-50 p-3 sm:p-4 rounded mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500">
                Submission Time
              </p>
              <p className="text-xs sm:text-sm font-semibold">
                {formatDate(submissionDate)} GMT
              </p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500">
                Reference Number
              </p>
              <p className="text-xs sm:text-sm font-semibold">#{documentId}</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-4 sm:mb-5">
          <h3 className="font-medium mb-2 sm:mb-3 text-xs sm:text-sm">
            Next Steps
          </h3>
          <ul className="text-[10px] sm:text-xs list-none space-y-2">
            <li className="flex items-start gap-2 text-[#2C3E50]">
              <FiFileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5" />
              <span>Your document is under review by the Accountant</span>
            </li>
            <li className="flex items-start gap-2 text-[#2C3E50]">
              <FiBell className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5" />
              <span>
                You will receive a notification once your document is processed
              </span>
            </li>
            <li className="flex items-start gap-2 text-[#2C3E50]">
              <FiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5" />
              <span>
                A confirmation email has been sent to your registered email
                address
              </span>
            </li>
          </ul>
        </div>

        {/* Status Timeline */}
        <div className="mb-4 sm:mb-5">
          <h3 className="font-medium mb-2 sm:mb-3 text-xs sm:text-sm">
            Status Timeline
          </h3>
          <div className="text-[10px] sm:text-xs relative pl-6">
            <div className="absolute left-3 top-0 h-full border-l-2 border-gray-300"></div>
            <div className="flex items-center mb-3 relative">
              <img
                src={assets.form_tick}
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 absolute -left-4"
                alt="Submitted"
              />
              <div className="ml-2">
                <span className="font-semibold text-gray-700">Submitted</span>
                <span className="block text-[9px] sm:text-[10px] text-gray-500">
                  {formatDate(submissionDate)} GMT
                </span>
              </div>
            </div>
            <div className="flex items-center mb-3 relative">
              <img
                src={assets.form_inprocess}
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 absolute -left-4"
                alt="In Review"
              />
              <div className="ml-2">
                <span className="font-semibold text-gray-700">
                  Under Review
                </span>
                <span className="block text-[9px] sm:text-[10px] text-gray-500">
                  Current Status
                </span>
              </div>
            </div>
            <div className="flex items-center relative">
              <img
                src={assets.form_pending}
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 absolute -left-4"
                alt="Pending"
              />
              <div className="ml-2">
                <span className="font-semibold text-gray-700">Processed</span>
                <span className="block text-[9px] sm:text-[10px] text-gray-500">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
          <button className="w-full sm:w-auto px-8 sm:px-16 py-2.5 text-[10px] sm:text-xs font-semibold bg-[#2C3E50] text-white rounded hover:cursor-pointer hover:bg-gray-800 transition-colors">
            Track Status
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto px-8 sm:px-9 py-2.5 text-[10px] sm:text-xs font-semibold bg-gray-100 text-[#2C3E50] rounded hover:cursor-pointer hover:bg-gray-200 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;
