import React, { useState, useEffect } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ReimburseForm = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formProgress, setFormProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventDescription: "",
    councilName: "",
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });

  const [billItems, setBillItems] = useState([
    {
      id: 1,
      name: "Office Supplies Co",
      date: "2024-02-19",
      amount: 4143.85,
      billNumber: "BN-2024/01",
    },
  ]);

  // Calculate form progress
  useEffect(() => {
    let progress = 0;
    const requiredFields = [
      "eventName",
      "eventDate",
      "eventDescription",
      "councilName",
      "accountHolder",
      "bankName",
      "accountNumber",
      "ifscCode",
    ];

    // Calculate progress from form fields (80% of total)
    const filledFields = requiredFields.filter(
      (field) => formData[field].trim() !== ""
    ).length;
    progress = Math.round((filledFields / requiredFields.length) * 80);

    // Add progress for bill upload (20% of total)
    if (selectedFile || billItems.length > 0) {
      progress += 20;
    }

    setFormProgress(progress);
  }, [formData, selectedFile, billItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Validation rules
  const validateForm = () => {
    let tempErrors = {};

    // Event Details validation
    if (!formData.eventName.trim()) {
      tempErrors.eventName = "Event name is required";
    }
    if (!formData.eventDate) {
      tempErrors.eventDate = "Event date is required";
    }
    if (!formData.eventDescription.trim()) {
      tempErrors.eventDescription = "Description is required";
    }
    if (!formData.councilName.trim()) {
      tempErrors.councilName = "Council name is required";
    }

    // Bill validation - Modified
    if (!selectedFile && billItems.length === 0) {
      tempErrors.file = "Please upload a bill";
    }

    // Payee Details validation
    if (!formData.accountHolder.trim()) {
      tempErrors.accountHolder = "Account holder name is required";
    }
    if (!formData.bankName.trim()) {
      tempErrors.bankName = "Bank name is required";
    }
    if (!formData.accountNumber.trim()) {
      tempErrors.accountNumber = "Account number is required";
    } else if (!/^\d{9,18}$/.test(formData.accountNumber)) {
      tempErrors.accountNumber = "Invalid account number format";
    }
    if (!formData.ifscCode.trim()) {
      tempErrors.ifscCode = "IFSC code is required";
    } else {
      // IFSC validation:
      // First 4 characters: any uppercase letters
      // 5th character: 0
      // Last 6 characters: numbers
      const ifscRegex = /^[A-Z]{4}0\d{6}$/;
      if (!ifscRegex.test(formData.ifscCode)) {
        tempErrors.ifscCode =
          "Invalid IFSC format. Example: ABCD012345 (4 letters, 0, followed by 6 numbers)";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "ifscCode") {
      // Convert to uppercase and remove any spaces
      const formattedValue = value.toUpperCase().replace(/\s/g, "");
      // Limit to 11 characters
      const truncatedValue = formattedValue.slice(0, 11);
      setFormData((prev) => ({
        ...prev,
        [name]: truncatedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          file: "Only PDF, JPG, and PNG files are allowed",
        }));
        return;
      }

      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          file: "File size should be less than 5MB",
        }));
        return;
      }

      setSelectedFile(file);
      setErrors((prev) => ({ ...prev, file: "" }));
    }
  };

  const handleDeleteBillItem = (id) => {
    setBillItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleGenerateDocument = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      if (formProgress === 100) {
        console.log("Generating document...");
        navigate("/reimburse/view");
      } else {
        setErrors((prev) => ({
          ...prev,
          form: "Please complete all required fields and upload at least one bill to proceed",
        }));
      }
    }
  };

  const totalAmount = billItems.reduce((sum, item) => sum + item.amount, 0);

  // Helper function to determine if field should show error
  const shouldShowError = (fieldName) => {
    return isFormSubmitted && errors[fieldName];
  };

  return (
    <div className="bg-[#F5F5F5]">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-semibold text-gray-800">
                Reimbursement Document
              </h1>
              <div className="flex items-center bg-gray-50 gap-2 border border-gray-300 rounded p-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    formProgress === 100
                      ? "bg-green-600"
                      : formProgress < 50
                      ? "bg-red-600"
                      : "bg-yellow-600"
                  }`}
                ></span>
                <p className="text-sm">Form Progress {formProgress}%</p>
              </div>
            </div>

            {/* Event Details Section */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6">
              <h2 className="text-sm font-medium mb-4">Event Details</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Event Name{" "}
                    {shouldShowError("eventName") && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    placeholder="Enter event name"
                    className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:border-blue-500 
                    ${shouldShowError("eventName") ? "border-red-500" : ""}`}
                  />
                  {shouldShowError("eventName") && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.eventName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Event Date{" "}
                    {shouldShowError("eventDate") && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:border-blue-500 
                    ${shouldShowError("eventDate") ? "border-red-500" : ""}`}
                  />
                  {shouldShowError("eventDate") && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.eventDate}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">
                  Event Description{" "}
                  {shouldShowError("eventDescription") && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <textarea
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the event purpose, attendees etc."
                  className={`w-full p-2 border rounded-md text-sm h-24 focus:outline-none focus:border-blue-500 
                  ${
                    shouldShowError("eventDescription") ? "border-red-500" : ""
                  }`}
                />
                {shouldShowError("eventDescription") && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.eventDescription}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Council Name{" "}
                  {shouldShowError("councilName") && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <input
                  type="text"
                  name="councilName"
                  value={formData.councilName}
                  onChange={handleInputChange}
                  placeholder="Technology Council"
                  className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:border-blue-500 
                  ${shouldShowError("councilName") ? "border-red-500" : ""}`}
                />
                {shouldShowError("councilName") && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.councilName}
                  </p>
                )}
              </div>
            </div>

            {/* Bill Upload Section */}
            <div className="mb-6">
              <h2 className="text-sm font-medium mb-4">
                Bill Upload{" "}
                {shouldShowError("file") && (
                  <span className="text-red-500">*</span>
                )}
              </h2>
              <div className="flex gap-2 mb-4">
                <button className="bg-[#2C3E50] text-white hover:cursor-pointer hover:bg-gray-800 px-4 py-2 rounded-md text-xs flex items-center gap-2">
                  <FiUpload className="w-4 h-4" />
                  Take Photo
                </button>
                <label className="bg-white border border-gray-300 px-4 py-2 rounded text-xs text-gray-600 cursor-pointer hover:bg-gray-50">
                  Upload File
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.jpg,.png"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">
                Supported formats: PDF, JPG, PNG
              </p>
              {shouldShowError("file") && (
                <p className="text-red-500 text-xs mt-1">{errors.file}</p>
              )}
            </div>

            {/* Bill Items Table */}
            {billItems.length > 0 && (
              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2">Uploaded Bills</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-600">
                        <th className="text-left py-2">Vendor Name</th>
                        <th className="text-left py-2">Date</th>
                        <th className="text-right py-2">Amount</th>
                        <th className="text-center py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billItems.map((item) => (
                        <tr key={item.id}>
                          <td className="py-2">{item.name}</td>
                          <td className="py-2">{item.date}</td>
                          <td className="py-2 text-right">
                            ₹{item.amount.toFixed(2)}
                          </td>
                          <td className="py-2 text-center">
                            <button
                              onClick={() => handleDeleteBillItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t">
                        <td colSpan="2" className="py-2 font-medium">
                          Total Amount
                        </td>
                        <td className="py-2 text-right font-medium">
                          ₹{totalAmount.toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Payee Details Section */}
            <div className="mb-6">
              <h2 className="text-sm font-medium mb-4">Payee Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Account Holder Name{" "}
                    {shouldShowError("accountHolder") && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="accountHolder"
                    value={formData.accountHolder}
                    onChange={handleInputChange}
                    placeholder="John Smith"
                    className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:border-blue-500 
                    ${
                      shouldShowError("accountHolder") ? "border-red-500" : ""
                    }`}
                  />
                  {shouldShowError("accountHolder") && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.accountHolder}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Bank Name{" "}
                    {shouldShowError("bankName") && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    placeholder="Enter bank name"
                    className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:border-blue-500 
                    ${shouldShowError("bankName") ? "border-red-500" : ""}`}
                  />
                  {shouldShowError("bankName") && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.bankName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Account Number{" "}
                    {shouldShowError("accountNumber") && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    placeholder="XXXXXXXXXX"
                    className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:border-blue-500 
                    ${
                      shouldShowError("accountNumber") ? "border-red-500" : ""
                    }`}
                  />
                  {shouldShowError("accountNumber") && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.accountNumber}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    IFSC Code{" "}
                    {shouldShowError("ifscCode") && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    placeholder="SBIN0123456"
                    maxLength={11}
                    style={{ textTransform: "uppercase" }}
                    className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:border-blue-500 
                    ${shouldShowError("ifscCode") ? "border-red-500" : ""}`}
                  />
                  {shouldShowError("ifscCode") && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.ifscCode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Generate Document Button */}
            <div className="flex flex-col">
              {isFormSubmitted && errors.form && (
                <p className="text-red-500 text-xs mb-2">{errors.form}</p>
              )}
              <div className="flex justify-end">
                <button
                  onClick={handleGenerateDocument}
                  className={`px-6 py-2 rounded-md text-sm flex items-center gap-2 ${
                    formProgress === 100
                      ? "bg-[#2C3E50] text-white hover:bg-gray-800 hover:cursor-pointer"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                  disabled={formProgress !== 100}
                >
                  Generate Document
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReimburseForm;
