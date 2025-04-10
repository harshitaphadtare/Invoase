import React, { useState, useEffect } from "react";
import { documents } from "../assets/assets";
import { FiEye, FiEdit } from "react-icons/fi";

const Request = () => {
  const [statusFilter, setStatusFilter] = useState("all-status");

  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      doc.documentID.toLowerCase().includes(searchQuery.toLowerCase());

    const statusMatches =
      statusFilter === "all-status" ||
      doc.Status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && statusMatches;
  });

  const getStatusBadgeClasses = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-[#FEF9C3] text-[#854D0E] px-2 py-[2px] rounded-full text-xs font-medium";
      case "approved":
        return "bg-[#DCFCE7] text-[#166534] px-2 py-[2px] rounded-full text-xs font-medium";
      case "rejected":
        return "bg-[#FFB9B2] text-[#991B1B] px-2 py-[2px] rounded-full text-xs font-medium";
      default:
        return "bg-gray-100 text-gray-800 px-2 py-[2px] rounded-full text-xs font-medium";
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mb-4 mx-13 mt-6 overflow-x-auto">
      <div className="flex px-2 justify-between py-6 items-center ">
        <h3 className="text-gray-700 text-[30px] font-semibold">
          Document Status
        </h3>
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="cursor-pointer p-2 hover:border-gray-500 bg-white border border-gray-200 rounded-md p-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              name="filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all-status">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="flex">
            <div className="flex border border-gray-200 rounded gap-1 justify-between items-center px-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="gray"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="e.g.DOC-001"
                className="focus:outline-none focus:ring-0 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-auto max-h-[500px] no-scrollbar">
        <table className="w-full table-auto border-none">
          <thead className="bg-[#F9FAFB] border-t border-b border-gray-200 sticky top-0 z-10">
            <tr className="text-left text-gray-500 text-xs font-bold">
              <th className="py-3 px-6 font-semibold">Document ID</th>
              <th className="py-3 px-6 font-semibold">Event Name</th>
              <th className="py-3 px-6 font-semibold">Event Date</th>
              <th className="py-3 px-6 font-semibold">Type</th>
              <th className="py-3 px-6 font-semibold">Current Stage</th>
              <th className="py-3 px-6 font-semibold">Status</th>
              <th className="py-3 px-6 font-semibold">last Updated</th>
              <th className="py-3 px-6 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample Row */}
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((row) => (
                <tr
                  key={row.documentID}
                  className="border-b border-gray-200 hover:bg-gray-50 text-sm"
                >
                  <td className="py-4 px-6 text-gray-500">{row.documentID}</td>
                  <td className="py-4 px-6 text-black-800">{row.eventName}</td>
                  <td className="py-4 px-6 text-gray-500">{row.eventDate}</td>
                  <td className="py-4 px-6 text-gray-500">{row.type}</td>
                  <td className="py-4 px-6 text-gray-500">{row.stage}</td>
                  <td className="py-4">
                    <span className={getStatusBadgeClasses(row.Status)}>
                      {row.Status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{row.lastUpdated}</td>
                  <td className="py-4 px-6">
                    {row.Status.toLowerCase() === "rejected" ? (
                      <button className="flex items-center gap-2 text-blue-600 hover:underline hover:cursor-pointer">
                        <FiEdit /> Edit
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 text-green-600 hover:underline hover:cursor-pointer">
                        <FiEye /> View
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-center text-sm py-4 text-gray-500"
                >
                  No documents found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Request;
