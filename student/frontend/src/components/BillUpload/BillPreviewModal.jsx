import React from "react";
import { FiX } from "react-icons/fi";

const BillPreviewModal = ({ bill, onClose }) => {
  if (!bill) return null;

  const isPDF = bill.fileType === "application/pdf";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">
                Bill Preview
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Vendor</p>
                  <p className="mt-1">{bill.vendorName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p className="mt-1">₹{bill.amount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="mt-1">
                    {new Date(bill.billDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="mt-1">{bill.status}</p>
                </div>
              </div>

              <div className="mt-4 border rounded-lg overflow-hidden">
                {isPDF ? (
                  <iframe
                    src={`${bill.fileUrl}#view=FitH`}
                    className="w-full h-[600px]"
                    title="Bill Preview"
                  />
                ) : (
                  <img
                    src={bill.fileUrl}
                    alt="Bill"
                    className="w-full h-auto max-h-[600px] object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPreviewModal;
