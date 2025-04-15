import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { FiFileText, FiBell, FiMail } from "react-icons/fi";

const SuccessMsg = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const successSound = new Audio(`${assets.success_sound}`);
    successSound
      .play()
      .catch((error) => console.log("Audio play failed", error));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F6F6F6] pt-6 pb-6">
      <div className="bg-white px-6 py-4 rounded-lg shadow max-w-md mx-auto">
        {/* Success Tick */}
        <div className="flex justify-center mb-3">
          <img width={40} height={40} src={assets.success_tick} alt="" />
        </div>
        <h2 className="text-center text-lg font-semibold mb-3">
          Donation Document Successfully Submitted
        </h2>

        {/* Reference Tab */}
        <div className="bg-gray-50 p-3 rounded mb-3">
          <div className="flex justify-between text-xs">
            <div>
              <p className="text-gray-500">Submission Time</p>
              <p className="font-semibold">March 15, 2024 14:30 GMT</p>
            </div>
            <div>
              <p className="text-gray-500">Reference Number</p>
              <p className="font-semibold">#REF-2024-03150089</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-4">
          <h3 className="font-medium mb-2 text-sm">Next Steps</h3>
          <ul className="text-xs list-none space-y-1">
            <li className="flex items-center text-[#2C3E50]">
              <FiFileText className="mr-2" />
              Your document is under review by the Accountant
            </li>
            <li className="flex items-center text-[#2C3E50]">
              <FiBell className="mr-2" />
              You will receive a notification once your document is processed
            </li>
            <li className="flex items-center text-[#2C3E50]">
              <FiMail className="mr-2" />A confirmation email has been sent to
              your registered email address
            </li>
          </ul>
        </div>

        {/* Status Timeline */}
        <div className="mb-4">
          <h3 className="font-medium mb-2 text-sm">Status Timeline</h3>
          <div className="text-xs relative pl-6">
            <div className="absolute left-3 top-0 h-full border-l-2 border-gray-300"></div>
            <div className="flex items-center mb-3 relative">
              <img
                src={assets.form_tick}
                className="w-3 h-3 absolute -left-4"
                alt=""
              />
              <div className="ml-2">
                <span className="font-semibold text-gray-700">Submitted</span>
                <span className="block text-[10px] text-gray-500">
                  March 15, 2024 14:30 GMT
                </span>
              </div>
            </div>
            <div className="flex items-center mb-3 relative">
              <img
                src={assets.form_inprocess}
                className="w-3 h-3 absolute -left-4"
                alt=""
              />
              <div className="ml-2">
                <span className="font-semibold text-gray-700">
                  Under Review
                </span>
                <span className="block text-[10px] text-gray-500">
                  Current Status
                </span>
              </div>
            </div>
            <div className="flex items-center relative">
              <img
                src={assets.form_pending}
                className="w-3 h-3 absolute -left-4"
                alt=""
              />
              <div className="ml-2">
                <span className="font-semibold text-gray-700">Pending</span>
                <span className="block text-[10px] text-gray-500">
                  Awaiting Processing
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          <button className="px-16 py-2 text-xs font-semibold bg-[#2C3E50] text-white rounded hover:cursor-pointer hover:bg-gray-800">
            Track Status
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-16 py-2 text-xs font-semibold bg-gray-100 text-[#2C3E50] rounded hover:cursor-pointer hover:bg-gray-200"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMsg;
