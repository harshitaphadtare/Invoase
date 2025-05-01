import React from "react";
import { format } from "date-fns";

const CommentSection = () => {
  // Sample comment data
  const comments = [
    {
      accountantName: "John Smith",
      timestamp: new Date("2024-01-15T14:30:00"),
      comment:
        "Please update the company details and resubmit the form. The PAN card number format is incorrect and bank details are incomplete. Make sure to attach the updated sponsorship letter with company letterhead.",
      designation: "Senior Accountant",
    },
  ];

  // Format date to match the dashboard format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formatted = format(date, "MMM d, yyyy h:mma");
    const [month, ...rest] = formatted.split(" ");
    return [
      month.charAt(0).toUpperCase() + month.slice(1).toLowerCase(),
      ...rest,
    ]
      .join(" ")
      .toLowerCase()
      .replace(/^[a-z]/, (c) => c.toUpperCase());
  };

  return (
    <div className="bg-red-50 rounded-lg p-6 mb-8 border-l-4 border-red-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-red-800">
          Document Rejected
        </h2>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          Action Required
        </span>
      </div>

      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-5 shadow-sm border border-red-100"
          >
            <div className="flex items-start space-x-4">
              {/* Accountant Avatar */}
              <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">
                  {comment.accountantName.charAt(0)}
                </span>
              </div>

              <div className="flex-1">
                {/* Accountant Info */}
                <div className="flex items-baseline justify-between mb-1">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 inline">
                      {comment.accountantName}
                    </h3>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {comment.designation}
                    </span>
                  </div>
                  <time className="text-xs text-gray-500">
                    {formatDate(comment.timestamp)}
                  </time>
                </div>

                {/* Comment Text */}
                <div className="mt-2 text-sm text-gray-600 bg-red-50 p-3 rounded-md border border-red-100">
                  {comment.comment}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
