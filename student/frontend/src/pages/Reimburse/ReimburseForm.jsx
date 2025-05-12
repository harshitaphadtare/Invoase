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

  const [billItems, setBillItems] = useState([]);

  const [addingBill, setAddingBill] = useState(false);
  const [newBill, setNewBill] = useState({
    name: "",
    date: "",
    amount: "",
    file: null,
  });
  const [billFileErrors, setBillFileErrors] = useState("");

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

  const handleNewBillChange = (e) => {
    const { name, value } = e.target;
    setNewBill((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewBillFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (!allowedTypes.includes(file.type)) {
        setBillFileErrors("Only PDF, JPG, and PNG files are allowed");
        return;
      }
      if (file.size > maxSize) {
        setBillFileErrors("File size should be less than 5MB");
        return;
      }
      setNewBill((prev) => ({ ...prev, file }));
      setBillFileErrors("");
    }
  };

  const handleAddBill = () => {
    // Validate all fields
    if (!newBill.name || !newBill.date || !newBill.amount || !newBill.file) {
      setBillFileErrors("Please fill all bill details and upload a file");
      return;
    }
    setBillItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newBill.name,
        date: newBill.date,
        amount: parseFloat(newBill.amount),
        file: newBill.file,
      },
    ]);
    setNewBill({ name: "", date: "", amount: "", file: null });
    setAddingBill(false);
    setBillFileErrors("");
  };

  const handleViewBillFile = (file) => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      window.open(url, "_blank");
    }
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="max-w-[90%] md:max-w-[80%] lg:max-w-3xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 mb-4 md:mb-6">
              <h1 className="text-lg md:text-xl font-semibold text-gray-800">
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
            <div className="border border-gray-200 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
              <h2 className="text-sm font-medium mb-4">Event Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

            {/* Uploaded Bills Table */}
            <div className="mb-4 md:mb-6 bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Uploaded Bills</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-separate border-spacing-y-1">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="text-left py-2 px-3 font-medium">
                        Vendor Name
                      </th>
                      <th className="text-left py-2 px-3 font-medium">Date</th>
                      <th className="text-right py-2 px-3 font-medium">
                        Amount
                      </th>
                      <th className="text-center py-2 px-3 font-medium">
                        Bill File
                      </th>
                      <th className="text-center py-2 px-3 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {billItems.map((item) => (
                      <tr key={item.id} className="bg-white rounded">
                        <td className="py-2 px-3">{item.name}</td>
                        <td className="py-2 px-3">{item.date}</td>
                        <td className="py-2 px-3 text-right">
                          ₹{item.amount.toFixed(2)}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {item.file ? (
                            <button
                              onClick={() => handleViewBillFile(item.file)}
                              className="text-blue-600 hover:underline hover:cursor-pointer text-sm font-medium"
                            >
                              {item.file.name || "View"}
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs">
                              No file
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <button
                            onClick={() => handleDeleteBillItem(item.id)}
                            className="text-red-500 hover:cursor-pointer hover:text-red-700"
                            title="Delete Bill"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add New Bill Card (inputs row, then buttons row) */}
            {addingBill && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="text-base font-semibold mb-3">Add New Bill</h4>
                <div className="flex flex-row gap-3 mb-3">
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Vendor Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newBill.name}
                      onChange={handleNewBillChange}
                      placeholder="Enter vendor name"
                      className="w-full p-2 border rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={newBill.date}
                      onChange={handleNewBillChange}
                      className="w-full p-2 border rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-base">
                        ₹
                      </span>
                      <input
                        type="number"
                        name="amount"
                        value={newBill.amount}
                        onChange={handleNewBillChange}
                        placeholder="Enter amount"
                        className="w-full p-2 pl-6 border rounded text-sm focus:outline-none focus:border-blue-500"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    className="bg-[#2C3E50] text-white py-2 px-3 hover:cursor-pointer rounded text-xs flex items-center gap-2 hover:bg-gray-800 whitespace-nowrap"
                    // onClick for take photo can be implemented if needed
                  >
                    Take Photo
                  </button>
                  <label className="bg-white border border-gray-300 py-2 px-3 hover:cursor-pointer rounded text-xs text-gray-600 cursor-pointer hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap">
                    Upload File
                    <input
                      type="file"
                      onChange={handleNewBillFileChange}
                      className="hidden"
                      accept=".pdf,.jpg,.png"
                    />
                  </label>
                  <button
                    onClick={() => {
                      setAddingBill(false);
                      setNewBill({
                        name: "",
                        date: "",
                        amount: "",
                        file: null,
                      });
                      setBillFileErrors("");
                    }}
                    className="bg-gray-200 text-gray-700 py-2 px-3 rounded text-xs hover:cursor-pointer hover:bg-gray-300 whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddBill}
                    className="bg-green-600 text-white py-2 px-3 rounded text-xs hover:cursor-pointer flex items-center gap-2 hover:bg-green-700 whitespace-nowrap"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Bill
                  </button>
                </div>
                {billFileErrors && (
                  <p className="text-red-500 text-xs mt-2">{billFileErrors}</p>
                )}
              </div>
            )}

            {/* Add Bill Button (if not adding) */}
            {!addingBill && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setAddingBill(true)}
                  className="bg-[#2C3E50] text-white px-3 py-2 rounded hover:cursor-pointer text-xs flex items-center gap-2 hover:bg-gray-800 shadow"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Bill
                </button>
              </div>
            )}

            {/* Total Row */}
            <div className="flex justify-end items-center border-t pt-4 mt-6">
              <span className="text-lg  mr-2">Total Amount: </span>
              <span className="text-lg font-bold">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            {/* Payee Details Section */}
            <div className="mb-4 md:mb-6">
              <h2 className="text-sm font-medium mb-4">Payee Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className={`px-6 py-2 rounded-md text-sm flex items-center justify-center gap-2 w-full md:w-auto ${
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
