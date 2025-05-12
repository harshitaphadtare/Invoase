import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiDownload, FiCheck } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { reimbService } from "../../services/reimbServices";
import { toast } from "react-toastify";

const ReimburseView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const documentId = location.state?.documentId;
        if (!documentId) {
          navigate("/reimburse");
          return;
        }

        const response = await reimbService.getReimbDocumentById(documentId);
        if (response.success) {
          setDocumentData(response.data);
        } else {
          throw new Error("Failed to fetch document");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch document");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [location.state?.documentId, navigate]);

  const handleViewReceipt = async (fileUrl) => {
    try {
      window.open(fileUrl, "_blank");
    } catch (err) {
      setError("Unable to view receipt. Please try again later.");
    }
  };

  const formatDate = (isoString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(isoString).toLocaleDateString("en-GB", options);
  };

  const handleDownloadPDF = async () => {
    try {
      // Implement PDF download functionality
      toast.info("PDF download functionality coming soon!");
    } catch (err) {
      setError("Unable to download PDF. Please try again later.");
    }
  };

  const handleSubmitForApproval = async () => {
    try {
      const response = await reimbService.updateReimbDocument(
        documentData.documentId,
        {
          staffStatus: "pending",
        }
      );

      if (response.success) {
        toast.success("Document submitted for approval successfully!");
        navigate("/reimburse/success");
      } else {
        throw new Error("Failed to submit document for approval");
      }
    } catch (err) {
      setError(
        err.message || "Unable to submit for approval. Please try again later."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  if (!documentData) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Document not found</p>
          <button
            onClick={() => navigate("/reimburse")}
            className="mt-4 text-blue-600 hover:underline"
          >
            Return to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 md:p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button onClick={() => setError(null)} className="float-right">
            ×
          </button>
        </div>
      )}

      <div className="max-w-[90%] md:max-w-[80%] lg:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/reimburse", { replace: true });
            }}
            className="flex items-center text-gray-700 mb-4 md:mb-6 hover:cursor-pointer"
          >
            <FiArrowLeft className="mr-2" />
            Back to Form
          </button>

          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            {/* Event Details */}
            <div className="mb-4">
              <div className="flex flex-col mb-4 md:flex-row items-start md:items-center justify-between gap-2 md:gap-0">
                <h1 className="text-xl md:text-[25px] font-medium">
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
                  <p className="text-xs text-[#B54708] font-medium">
                    {documentData.staffStatus || "Pending Review"}
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-lg font-medium mb-4">Event Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      {formatDate(documentData.eventDetails.eventDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Document ID</p>
                    <p className="font-medium">{documentData.documentId}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Bills Section</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-700 border-b  border-gray-300">
                      <th className=" text-left py-3 px-4 font-semibold">
                        Description
                      </th>
                      <th className=" py-3 px-4 font-semibold">Bill Date</th>
                      <th className=" py-3 px-4 font-semibold">Amount</th>
                      <th className=" text-right py-3 px-4 font-semibold">
                        Receipt
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentData.reimbursementItems.map((bill, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 last:border-b-0"
                      >
                        <td className=" text-left py-3 px-4">
                          {bill.bill.description}
                        </td>
                        <td className="text-center py-3 px-4">
                          {formatDate(bill.bill.date)}
                        </td>
                        <td className="text-center py-3 px-4">
                          ₹{bill.bill.amount.toFixed(2)}
                        </td>
                        <td className="flex justify-end py-3 px-4">
                          <button
                            onClick={() => handleViewReceipt(bill.bill.fileUrl)}
                            className="flex justify-end items-center gap-1 text-black hover:cursor-pointer hover:underline"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#000000"
                              className="pt-1"
                              height="15px"
                              width="15px"
                              viewBox="0 0 455 455"
                            >
                              <path d="M0,0v455h455V0H0z M259.405,80c17.949,0,32.5,14.551,32.5,32.5s-14.551,32.5-32.5,32.5s-32.5-14.551-32.5-32.5  S241.456,80,259.405,80z M375,375H80v-65.556l83.142-87.725l96.263,68.792l69.233-40.271L375,299.158V375z" />
                            </svg>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="font-semibold">
                      <td className="py-3 px-4" colSpan={2}>
                        Total Amount
                      </td>
                      <td className="py-3 text-center">
                        ₹{documentData.totalAmount.toFixed(2)}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Approval Section */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-4">Approval Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Financial Head */}
                <div className="rounded-xl p-3 flex items-center gap-1 justify-center bg-gray-100 text-gray-700">
                  <span className="font-semibold">Faculty</span>
                  <span className="text-sm">(Pending)</span>
                </div>
                {/* Faculty */}
                <div className="rounded-xl p-3 flex items-center gap-1 justify-center bg-gray-100 text-gray-700">
                  <span className="font-semibold">Vice Principal</span>
                  <span className="text-sm">(Pending)</span>
                </div>
                {/* VP */}
                <div className="rounded-xl p-3 flex items-center gap-1 justify-center bg-gray-100 text-gray-700">
                  <span className="font-semibold">Principal</span>
                  <span className="text-sm">(Pending)</span>
                </div>
                {/* Principal */}
                <div className="rounded-xl p-3 flex items-center gap-1 justify-center bg-gray-100 text-gray-700">
                  <span className="font-semibold">Accountant</span>
                  <span className="text-sm">(Pending)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
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
                <p className="bg-[#FFF9E7] px-2 mt-1 py-1 inline-block rounded-full text-xs text-[#B54708] font-medium">
                  {documentData.staffStatus || "Pending Review"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Generated On</p>
                <p className="font-medium">
                  {new Date(documentData.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Bills</p>
                <p className="font-medium">
                  {documentData.reimbursementItems.length} bills attached
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-medium mb-4">Approval Progress</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-[#38A37F] flex items-center justify-center">
                  <FiCheck className="text-white w-4 h-4" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">Document Generated</p>
                  <p className="text-sm text-gray-500">
                    {new Date(documentData.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {["Faculty", "Vice Principal", "Principal", "Accountant"].map(
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

          <div className="mt-4 md:mt-6 space-y-3">
            <button
              onClick={handleSubmitForApproval}
              className="hover:cursor-pointer w-full px-4 py-3 bg-[#38A37F] text-white font-medium rounded-lg text-sm hover:bg-[#2c8164]"
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
