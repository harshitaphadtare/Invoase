import React, { useState, useEffect } from "react";
import { assets, initialNotifications } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEdit, FiArrowUp } from "react-icons/fi";
import { donationService } from "../services/donationService";
import { format } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all-status");
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // stats section
  const [data, setData] = useState({
    totalCollected: 500000,
    pendingReimbursement: 120000,
    pendingReimbursementCount: 15,
    pendingInvoices: 200000,
    pendingInvoicesCount: 25,
    percentageChange: "+12.5%",
  });

  const cards = [
    {
      title: "Total Collected",
      value: `₹${data.totalCollected.toLocaleString()}`,
      change: `${data.percentageChange} from last month`,
      icon: assets.rupee,
    },
    {
      title: "Pending Reimbursement",
      value: `₹${data.pendingReimbursement.toLocaleString()}`,
      change: `${data.pendingReimbursementCount} pending requests`,
      icon: assets.pending,
    },
    {
      title: "Pending Invoices",
      value: `₹${data.pendingInvoices.toLocaleString()}`,
      change: `${data.pendingInvoicesCount}+ invoices raised`,
      icon: assets.warn,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //notification section

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getNotificationStyles = (type) => {
    switch (type.trim().toLowerCase()) {
      case "faculty":
        return "bg-blue-100 text-blue-800 fill-blue-800";
      case "vp":
        return "bg-orange-100 text-orange-800 fill-orange-800";
      case "principal":
        return "bg-green-100 text-green-800 fill-green-800";
      case "accountant":
        return "bg-purple-100 text-purple-800 fill-purple-800";
      case "rejected":
        return "bg-red-100 text-red-800 fill-red-800";
      default:
        return "bg-gray-100 text-gray-800 fill-gray-800";
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    const now = new Date();
    const notificationDate = new Date(n.timestamp);

    if (filter === "all") {
      return true;
    }

    if (filter === "last-week") {
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return notificationDate >= lastWeek;
    }

    if (filter === "last-month") {
      const firstDayOfCurrentMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );
      const firstDayOfLastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      );
      return (
        notificationDate >= firstDayOfLastMonth &&
        notificationDate < firstDayOfCurrentMonth
      );
    }

    return true;
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const studentId = localStorage.getItem("studentId");
      if (!studentId) {
        throw new Error("Student ID not found");
      }

      const response = await donationService.getStudentDonations(studentId);
      setDocuments(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  //documents section
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      doc.documentId.toLowerCase().includes(searchQuery.toLowerCase());

    const statusMatches =
      statusFilter === "all-status" ||
      doc.staffStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && statusMatches;
  });

  // Helper to get document type
  const getDocumentType = (doc) => {
    // If you add GST or Reimbursement docs, update this logic
    if (doc.donationDetails) return "Donation";
    if (doc.gstDetails) return "GST Invoice";
    if (doc.reimbursementDetails) return "Reimbursement";
    return "Unknown";
  };

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

  // Format date to "Jan 15, 2024 2:30pm" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formatted = format(date, "MMM d, yyyy h:mma");
    // Split into parts to handle capitalization correctly
    const [month, ...rest] = formatted.split(" ");
    return [
      month.charAt(0).toUpperCase() + month.slice(1).toLowerCase(),
      ...rest,
    ]
      .join(" ")
      .toLowerCase()
      .replace(/^[a-z]/, (c) => c.toUpperCase());
  };

  // Sort documents by updatedAt in descending order (most recent first)
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  return (
    <div className="h-auto bg-[#F6F6F6] px-4 sm:p-10">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="pt-8 sm:pt-4 pb-2 text-xl text-[#2C3E50] font-bold">
          What would you like to do today?
        </h2>
        <div className="mt-3 flex flex-col md:flex-row justify-center gap-3 md:gap-4">
          <button
            onClick={() => navigate("/sponsor/donation-form")}
            className="flex text-sm items-center justify-center gap-2 bg-[#38A37F] hover:bg-[#2E8B6D] text-white px-6 py-3 shadow-md cursor-pointer rounded-md transition duration-300 w-full md:w-auto"
          >
            <img
              src={assets.sponsor_icon}
              className="w-2 h-3"
              alt="sponsor icon"
            />
            Raise Sponsor Invoice
          </button>

          <button
            onClick={() => navigate("/reimburse")}
            className="flex text-sm items-center justify-center gap-2 bg-[#2C3E50] hover:bg-[#1F2B38] text-white px-6 py-3 shadow-md cursor-pointer rounded-md transition duration-300 w-full md:w-auto"
          >
            <img
              src={assets.reimburse_icon}
              className="w-2 h-3"
              alt="reimburse icon"
            />
            Reimbursement Request
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 shadow-md rounded-lg flex space-x-4 items-start"
          >
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-gray-700 text-sm font-semibold">
                  {item.title}
                </h3>
                <img src={item.icon} alt={item.title} className="w-auto h-4" />
              </div>
              <h1 className="text-[25px] mt-3 font-bold">{item.value}</h1>
              <span className="text-sm text-gray-500">{item.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-800 text-lg font-semibold">
              Expense Analytics
            </h3>
            <div className="relative">
              <select
                className="cursor-pointer hover:border-gray-500 bg-white border border-gray-300 rounded-md pl-1 pr-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                name="filter"
              >
                <option value="week">Last Week</option>
                <option value="30days">Last 30 Days</option>
                <option value="60days">Last 60 Days</option>
              </select>
            </div>
          </div>
          <div className="h-40 bg-gray-200 mt-4 flex justify-center items-center">
            [Chart Placeholder]
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow-md rounded-lg p-6 h-[350px] flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-700 font-semibold">
              Recent Notifications
            </h3>
            <div className="relative">
              <select
                className="cursor-pointer hover:border-gray-500 bg-white border border-gray-300 rounded-md pl-1 pr-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                name="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
              </select>
            </div>
          </div>

          {/* Scrollable notifications container */}
          <div className="mt-4 space-y-3 overflow-y-auto pr-2 flex-1">
            {filteredNotifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`relative hover:cursor-pointer mt-2 p-4 rounded-md ${getNotificationStyles(
                  n.type
                )}`}
              >
                {" "}
                {!n.isRead && (
                  <span className="absolute top-0 left-0 w-2 h-2 bg-red-600 rounded-full" />
                )}
                <div className="flex justify-between items-center">
                  {/* Red dot */}

                  <h4 className="font-bold text-sm">{n.title}</h4>
                  <svg
                    onClick={() => handleDismiss(n.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    className="hover:cursor-pointer"
                  >
                    <path
                      d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs">
                    {n.document} {n.message}
                  </p>
                  <span className="text-[10px] hidden sm:block">
                    {n.receivedTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document Status Table */}
      <div className="bg-white shadow-md rounded-lg mt-6">
        {/* Header and Filters - Fixed */}
        <div className="p-6">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
            <h3 className="text-gray-800 text-lg font-semibold">
              Document Status
            </h3>

            {/* Responsive Filters */}
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4">
              <div className="relative ">
                <select
                  className="w-full appearance-none cursor-pointer bg-white border border-gray-200 rounded-md p-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  name="filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all-status">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative ">
                <div className="flex w-full border border-gray-200 rounded-md overflow-hidden">
                  <div className="flex items-center px-3 bg-gray-50">
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
                  </div>
                  <input
                    type="text"
                    placeholder="Search by Document ID"
                    className="w-full p-2 focus:outline-none focus:ring-0 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table with horizontal scroll */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-none">
            <thead className="bg-[#F9FAFB] border-t border-b border-gray-200">
              <tr className="text-left text-gray-500 text-xs font-bold">
                <th className="py-3 px-6 whitespace-nowrap font-semibold">
                  Document ID
                </th>
                <th className="py-3 px-6 whitespace-nowrap font-semibold">
                  Event Name
                </th>
                <th className="py-3 px-6 whitespace-nowrap font-semibold">
                  Company
                </th>
                <th className="py-3 px-6 whitespace-nowrap font-semibold">
                  Amount
                </th>
                <th className="py-3 px-6 whitespace-nowrap font-semibold">
                  Type
                </th>
                <th className="py-3 px-6 whitespace-nowrap font-semibold">
                  Staff Type
                </th>
                <th className="py-3 px-6 whitespace-nowrap font-semibold">
                  Status
                </th>
                <th className="py-3 px-6 whitespace-nowrap font-semibold">
                  Last Updated
                </th>
                <th className="py-3 px-6 whitespace-nowrap font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    <div className="text-gray-600">Loading...</div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    <div className="text-red-600">{error}</div>
                  </td>
                </tr>
              ) : sortedDocuments.length > 0 ? (
                sortedDocuments.slice(-10).map((doc) => (
                  <tr
                    key={doc._id}
                    className="border-b border-gray-200 hover:bg-gray-50 text-sm"
                  >
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                      {doc.documentId}
                    </td>
                    <td className="py-4 px-6 text-black-800 whitespace-nowrap">
                      {doc.donationDetails?.eventName ||
                        doc.gstDetails?.invoiceName ||
                        doc.reimbursementDetails?.purpose ||
                        "-"}
                    </td>
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                      {doc.donationDetails?.companyName ||
                        doc.gstDetails?.companyName ||
                        doc.reimbursementDetails?.companyName ||
                        "-"}
                    </td>
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                      ₹
                      {doc.donationDetails?.amount ||
                        doc.gstDetails?.amount ||
                        doc.reimbursementDetails?.amount ||
                        "-"}
                    </td>
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                      {getDocumentType(doc)}
                    </td>
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap capitalize">
                      {doc.staffType}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={getStatusBadgeClasses(doc.staffStatus)}>
                        {doc.staffStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                      {formatDate(doc.updatedAt)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {doc.staffStatus.toLowerCase() === "rejected" ? (
                        <button
                          onClick={() =>
                            navigate(
                              `/sponsor/donation-form/edit/${doc.documentId}`
                            )
                          }
                          className="flex items-center gap-2 text-blue-600 hover:underline hover:cursor-pointer"
                        >
                          <FiEdit /> Edit
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            navigate(
                              `/sponsor/donation-form/view/${doc.documentId}`
                            )
                          }
                          className="flex items-center gap-2 text-green-600 hover:underline hover:cursor-pointer"
                        >
                          <FiEye /> View
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
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
      <div className="flex pb-3 justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Showing {sortedDocuments.length > 0 ? 1 : 0} to{" "}
          {Math.min(sortedDocuments.length, 10)} of {sortedDocuments.length}{" "}
          results
        </p>
        <button
          onClick={() => navigate("/requests")}
          className="bg-[#2C3E50] rounded px-4 text-white hover:bg-[#1F2B38] py-2 text-sm hover:cursor-pointer"
        >
          Load More
        </button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#1F2B38] text-white p-3 rounded-full shadow-lg hover:bg-gray-700 hover:cursor-pointer transition"
        >
          <FiArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Dashboard;
