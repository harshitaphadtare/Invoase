import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiDownload, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ReimburseView = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  // Mock data - In a real app, this would come from your API/backend
  const documentData = {
    eventDetails: {
      eventName: "Annual Tech Conference 2024",
      eventDate: "March 15, 2024",
      councilName: "Technology Council",
      documentId: "REIMB-2024-001",
    },
    billSummary: [
      {
        id: 1,
        description: "Venue Booking",
        billDate: "Mar 15, 2024",
        amount: 2300.0,
        receipt: "venue_receipt.pdf",
      },
      {
        id: 2,
        description: "Catering Services",
        billDate: "Mar 15, 2024",
        amount: 2000.0,
        receipt: "catering_receipt.pdf",
      },
    ],
    totalAmount: 4300.0,
    status: "Pending Review",
    generatedOn: "March 15, 2024",
    approvalStatus: {
      documentGenerated: true,
      facultyApproval: false,
      vpApproval: false,
      principalApproval: false,
    },
  };

  const handleViewReceipt = (receipt) => {
    try {
      // In a real app, this would open/download the receipt file
      console.log("Viewing receipt:", receipt);
    } catch (err) {
      setError("Unable to view receipt. Please try again later.");
    }
  };

  const handleDownloadPDF = () => {
    try {
      // In a real app, this would trigger the PDF download
      console.log("Downloading PDF...");
    } catch (err) {
      setError("Unable to download PDF. Please try again later.");
    }
  };

  const handleSubmitForApproval = () => {
    try {
      // In a real app, this would submit the document for approval
      console.log("Submitting for approval...");
    } catch (err) {
      setError("Unable to submit for approval. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button onClick={() => setError(null)} className="float-right">
            ×
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="col-span-2">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/reimburse", { replace: true });
            }}
            className="flex items-center text-gray-700 mb-6 hover:cursor-pointer"
          >
            <FiArrowLeft className="mr-2" />
            Back to Form
          </button>

          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Event Details */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-[25px] font-medium mb-4">
                  Reimbursement Details
                </h1>
                <div className="flex items-center gap-1 bg-[#FFF9E7] px-2 py-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15px"
                    height="15px"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM13 6.5C13 5.94772 12.5523 5.5 12 5.5C11.4477 5.5 11 5.94772 11 6.5V11.75C11 12.4404 11.5596 13 12.25 13H15.5C16.0523 13 16.5 12.5523 16.5 12C16.5 11.4477 16.0523 11 15.5 11H13V6.5Z"
                      fill="#B54708"
                    />
                  </svg>
                  <p className=" text-xs text-[#B54708] font-medium">
                    Pending Review
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-lg font-medium mb-4">Event Details</h2>
                <div className="grid grid-cols-2 gap-4 ">
                  <div>
                    <p className="text-sm text-gray-600">Event Name</p>
                    <p className="font-medium">
                      {documentData.eventDetails.eventName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Council Name</p>
                    <p className="font-medium">
                      {documentData.eventDetails.councilName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Event Date</p>
                    <p className="font-medium">
                      {documentData.eventDetails.eventDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Document ID</p>
                    <p className="font-medium">
                      {documentData.eventDetails.documentId}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-sm text-gray-600">
                      <th className="text-left py-2">Description</th>
                      <th className="text-left py-2">Bill Date</th>
                      <th className="text-right py-2">Amount</th>
                      <th className="text-center py-2">Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentData.billSummary.map((bill) => (
                      <tr key={bill.id} className="border-t border-gray-200">
                        <td className="py-3">{bill.description}</td>
                        <td className="py-3">{bill.billDate}</td>
                        <td className="py-3 text-right">
                          ₹{bill.amount.toFixed(2)}
                        </td>
                        <td className="py-3 text-center">
                          <button
                            onClick={() => handleViewReceipt(bill.receipt)}
                            className="hover:cursor-pointer text-blue-600 hover:text-blue-800 text-sm"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t border-gray-200 font-medium">
                      <td colSpan="2" className="py-3">
                        Total Amount
                      </td>
                      <td className="py-3 text-right">
                        ₹{documentData.totalAmount.toFixed(2)}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Approval Section */}
            <div>
              <h2 className="text-lg font-medium mb-4">Approval Section</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#38A37F] text-white rounded-lg p-4 flex items-center justify-between">
                  <span>Financial Head</span>
                  <FiCheck className="w-5 h-5" />
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
                  <span className="text-gray-600">Faculty</span>
                  <span className="text-sm text-gray-500">Pending</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
                  <span className="text-gray-600">VP</span>
                  <span className="text-sm text-gray-500">Pending</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
                  <span className="text-gray-600">Principal</span>
                  <span className="text-sm text-gray-500">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Document Summary</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-semibold">
                  ₹{documentData.totalAmount.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="bg-[#FFF9E7] px-2 mt-1 py-1 w-[33%] rounded-full text-xs text-[#B54708] font-medium">
                  {documentData.status}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Generated On</p>
                <p className="font-medium">{documentData.generatedOn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Bills</p>
                <p className="font-medium">
                  {documentData.billSummary.length} bills attached
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Approval Progress</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-[#38A37F] flex items-center justify-center">
                  <FiCheck className="text-white w-4 h-4" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">Document Generated</p>
                  <p className="text-sm text-gray-500">
                    {documentData.generatedOn}
                  </p>
                </div>
              </div>
              {["Faculty Approval", "VP Approval", "Principal Approval"].map(
                (step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{step}</p>
                      <p className="text-sm text-gray-500">Pending</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleDownloadPDF}
              className="hover:cursor-pointer w-full px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <FiDownload />
              Download PDF
            </button>
            <button
              onClick={() => {
                handleSubmitForApproval;
                navigate("/reimburse/success");
              }}
              className="hover:cursor-pointer w-full px-4 py-2 bg-[#38A37F] text-white rounded-lg text-sm hover:bg-[#2c8164]"
            >
              Submit for Approval
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReimburseView;
