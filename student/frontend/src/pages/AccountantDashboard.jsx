import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const AccountantDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Accountant Dashboard
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-[#38A37F] text-white px-4 py-2 rounded-lg hover:bg-[#2C8565] transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add your dashboard cards/components here */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
            {/* Add pending approvals content */}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            {/* Add recent transactions content */}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            {/* Add quick actions content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountantDashboard;
