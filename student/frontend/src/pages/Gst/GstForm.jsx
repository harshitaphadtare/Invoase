import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GstForm = () => {
  const [paymentType, setPaymentType] = useState(
    window.location.pathname.includes("gst-form") ? "gst" : "donation"
  );
  const [uploadedFile, setUploadedFile] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="h-auto bg-[#F6F6F6]">
      <div className="max-w-[60%] mx-auto px-4 py-8">
        {/* Step 1 */}
        <h2 className="text-sm font-medium mb-2">
          Step 1: Select Payment Type
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className={`border bg-white rounded-md p-4 cursor-pointer transition-all ${
              paymentType === "donation"
                ? "border-gray-700 border-2 shadow-md"
                : "border-gray-300"
            }`}
            onClick={() => {
              setPaymentType("donation");
              setTimeout(() => navigate("/sponsor/donation-form"), 300);
            }}
          >
            <div className="flex justify-between items-center gap-2 font-semibold">
              Donation Payment
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={paymentType === "donation" ? "#333333" : "#BDBDBD"}
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
              >
                <path d="M17.726 13.02 14 16H9v-1h4.065a.5.5 0 0 0 .416-.777l-.888-1.332A1.995 1.995 0 0 0 10.93 12H3a1 1 0 0 0-1 1v6a2 2 0 0 0 2 2h9.639a3 3 0 0 0 2.258-1.024L22 13l-1.452-.484a2.998 2.998 0 0 0-2.822.504zm1.532-5.63c.451-.465.73-1.108.73-1.818s-.279-1.353-.73-1.818A2.447 2.447 0 0 0 17.494 3S16.25 2.997 15 4.286C13.75 2.997 12.506 3 12.506 3a2.45 2.45 0 0 0-1.764.753c-.451.466-.73 1.108-.73 1.818s.279 1.354.73 1.818L15 12l4.258-4.61z" />
              </svg>
            </div>
            <p className="text-xs mt-1 text-gray-500">0% GST </p>
            <p className="text-xs mt-3 text-gray-500">
              Requires a confirmation letter, no GST applicable.
            </p>
          </div>
          <div
            className={`border bg-white rounded-md p-4 cursor-pointer transition-all ${
              paymentType === "gst"
                ? "border-gray-700 border-2 shadow-md"
                : "border-gray-300"
            }`}
            onClick={() => {
              setPaymentType("gst");
              setTimeout(() => navigate("/sponsor/gst-form"), 300);
            }}
          >
            <div className="flex justify-between items-center gap-2 font-semibold">
              GST-Based Payment
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16.5189 16.5013C16.6939 16.3648 16.8526 16.2061 17.1701 15.8886L21.1275 11.9312C21.2231 11.8356 21.1793 11.6708 21.0515 11.6264C20.5844 11.4644 19.9767 11.1601 19.4083 10.5917C18.8399 10.0233 18.5356 9.41561 18.3736 8.94849C18.3292 8.82066 18.1644 8.77687 18.0688 8.87254L14.1114 12.8299C13.7939 13.1474 13.6352 13.3061 13.4987 13.4811C13.3377 13.6876 13.1996 13.9109 13.087 14.1473C12.9915 14.3476 12.9205 14.5606 12.7786 14.9865L12.5951 15.5368L12.3034 16.4118L12.0299 17.2323C11.9601 17.4419 12.0146 17.6729 12.1708 17.8292C12.3271 17.9854 12.5581 18.0399 12.7677 17.9701L13.5882 17.6966L14.4632 17.4049L15.0135 17.2214L15.0136 17.2214C15.4394 17.0795 15.6524 17.0085 15.8527 16.913C16.0891 16.8004 16.3124 16.6623 16.5189 16.5013Z"
                  fill={paymentType === "gst" ? "#333333" : "#BDBDBD"}
                />
                <path
                  d="M22.3665 10.6922C23.2112 9.84754 23.2112 8.47812 22.3665 7.63348C21.5219 6.78884 20.1525 6.78884 19.3078 7.63348L19.1806 7.76071C19.0578 7.88348 19.0022 8.05496 19.0329 8.22586C19.0522 8.33336 19.0879 8.49053 19.153 8.67807C19.2831 9.05314 19.5288 9.54549 19.9917 10.0083C20.4545 10.4712 20.9469 10.7169 21.3219 10.847C21.5095 10.9121 21.6666 10.9478 21.7741 10.9671C21.945 10.9978 22.1165 10.9422 22.2393 10.8194L22.3665 10.6922Z"
                  fill={paymentType === "gst" ? "#333333" : "#BDBDBD"}
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.17157 3.17157C3 4.34315 3 6.22876 3 10V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C20.9812 19.6756 20.9997 17.8316 21 14.1801L18.1817 16.9984C17.9119 17.2683 17.691 17.4894 17.4415 17.6841C17.1491 17.9121 16.8328 18.1076 16.4981 18.2671C16.2124 18.4032 15.9159 18.502 15.5538 18.6225L13.2421 19.3931C12.4935 19.6426 11.6682 19.4478 11.1102 18.8898C10.5523 18.3318 10.3574 17.5065 10.607 16.7579L10.8805 15.9375L11.3556 14.5121L11.3775 14.4463C11.4981 14.0842 11.5968 13.7876 11.7329 13.5019C11.8924 13.1672 12.0879 12.8509 12.316 12.5586C12.5106 12.309 12.7317 12.0881 13.0017 11.8183L17.0081 7.81188L18.12 6.70004L18.2472 6.57282C18.9626 5.85741 19.9003 5.49981 20.838 5.5C20.6867 4.46945 20.3941 3.73727 19.8284 3.17157C18.6569 2 16.7712 2 13 2H11C7.22876 2 5.34315 2 4.17157 3.17157ZM7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H14.5C14.9142 8.25 15.25 8.58579 15.25 9C15.25 9.41421 14.9142 9.75 14.5 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9ZM7.25 13C7.25 12.5858 7.58579 12.25 8 12.25H10.5C10.9142 12.25 11.25 12.5858 11.25 13C11.25 13.4142 10.9142 13.75 10.5 13.75H8C7.58579 13.75 7.25 13.4142 7.25 13ZM7.25 17C7.25 16.5858 7.58579 16.25 8 16.25H9.5C9.91421 16.25 10.25 16.5858 10.25 17C10.25 17.4142 9.91421 17.75 9.5 17.75H8C7.58579 17.75 7.25 17.4142 7.25 17Z"
                  fill={paymentType === "gst" ? "#333333" : "#BDBDBD"}
                />
              </svg>
            </div>
            <p className="text-xs mt-1 text-gray-500">18% GST </p>
            <p className="text-xs mt-3 text-gray-500">
              Requires GST details and confirmation letter.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <h2 className="text-sm font-medium mb-2">
          Step 2: Input Sponsor Details
        </h2>
        <div className="bg-white rounded-md border border-gray-200 p-6 space-y-4 mb-6">
          <p className="text-gray-600 text-sm font-semibold mb-1">
            Company Name
          </p>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          />

          <p className="text-gray-600 text-sm font-semibold mb-1">
            Contact Number
          </p>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          />

          <p className="text-gray-600 text-sm font-semibold mb-1">Pan Card</p>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          />

          <p className="text-gray-600 text-sm font-semibold mb-1">GST Number</p>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          />

          <p className="text-gray-600 text-sm font-semibold mb-1">Bank Name</p>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          />

          <p className="text-gray-600 text-sm font-semibold mb-1">
            Billing Address
          </p>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
            rows={4}
          />

          {/* Upload Box */}
          <p className="text-gray-600 text-sm font-semibold mb-1">
            Upload Documents
          </p>
          <div>
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                setUploadedFile(file);
              }}
            />
            <label
              htmlFor="fileUpload"
              className={`border border-dashed border-gray-300 rounded-lg py-10 p-6 flex flex-col items-center text-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition ${
                uploadedFile ? "border-blue-500 bg-blue-50 text-blue-600" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="gray"
                  d="M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z"
                />
              </svg>
              {uploadedFile ? (
                <>
                  <p className="mt-2 text-sm font-medium text-blue-700">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-gray-400">Click to change</p>
                </>
              ) : (
                <>
                  <p>Upload a file or drag and drop</p>
                  <p className="text-xs text-gray-400">PDF up to 10MB</p>
                </>
              )}
            </label>
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <button className="bg-gray-700 items-center hover:cursor-pointer hover:bg-gray-800 text-white text-sm px-5 py-2 rounded shadow ">
            &#128196; Generate Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default GstForm;
