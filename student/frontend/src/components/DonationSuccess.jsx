import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import { FiFileText, FiBell, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DonationSuccess = () => {
  useEffect(() => {
    const successSound = new Audio(`${assets.success_sound}`);
    successSound
      .play()
      .catch((error) => console.log("Audio play failed", error));
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F6F6F6] pt-10 pb-10">
      <div className="bg-white p-8 rounded-lg  shadow max-w-lg mx-auto ">
        {/* Success Tick */}
        <div className="flex justify-center">
          <img width={50} height={50} src={assets.success_tick} alt="" />
        </div>
        <h2 className="text-center text-xl mt-2 font-semibold mb-3">
          Document Successfully Submitted
        </h2>

        {/*Reference Tab*/}
        <div className="bg-gray-50 p-4 rounded mb-3">
          <div className="flex justify-between text-sm">
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
        <div className="mb-6">
          <h3 className="font-medium mb-2">Next Steps</h3>
          <ul className="text-sm list-none space-y-2">
            <li className="flex items-center text-xs font-medium text-[#2C3E50]">
              <FiFileText className="mr-2" />
              Your document is under review by the relevant department
            </li>
            <li className="flex items-center text-xs font-medium text-[#2C3E50]">
              <FiBell className="mr-2" />
              You will receive a notification once your document is processed
            </li>
            <li className="flex items-center text-xs font-medium text-[#2C3E50]">
              <FiMail className="mr-2" />A confirmation email has been sent to
              your registered email address
            </li>
          </ul>
        </div>

        {/* Status Timeline */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Status Timeline</h3>
          <div className="text-sm relative pl-8">
            <div className="absolute left-4 top-0 h-full border-l-2 border-gray-300"></div>
            <div className="flex items-center mb-4 relative">
              <img
                src={assets.form_tick}
                className="w-4 h-4 absolute -left-5.5"
                alt=""
              />
              <div className="ml-2">
                <span className="font-semibold text-gray-700">Submitted</span>
                <span className="block text-xs text-gray-500">
                  March 15, 2024 14:30 GMT
                </span>
              </div>
            </div>
            <div className="flex items-center mb-4 relative">
              <img
                src={assets.form_inprocess}
                className="w-4 h-4 absolute -left-5.5"
                alt=""
              />
              <div className="ml-2">
                <span className="font-semibold text-gray-700">
                  Under Review
                </span>
                <span className="block text-xs text-gray-500">
                  Current Status
                </span>
              </div>
            </div>
            <div className="flex items-center relative">
              <img
                src={assets.form_pending}
                className="w-4 h-4 absolute -left-5.5"
                alt=""
              />
              <div className="ml-2">
                <span className="font-semibold text-gray-700">Processed</span>
                <span className="block text-xs text-gray-500">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button className="px-15 py-2 text-sm font-semibold bg-[#2C3E50] text-white rounded hover:cursor-pointer hover:bg-gray-800">
            Track Status
          </button>
          <button
            onClick={() => {
              navigate("/dashboard");
            }}
            className="px-8 py-2 text-sm font-semibold bg-gray-100 text-[#2C3E50] rounded hover:cursor-pointer hover:bg-gray-200"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;
