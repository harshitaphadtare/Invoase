import React, { useContext } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StudentContext } from "./context/StudentContext";
import Landing from "./pages/Landing";
import Login from "./pages/Signup/Login";
import Dashboard from "./pages/Dashboard";
import StudentSignUp from "./pages/Signup/StudentSignUp";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ReimburseForm from "./pages/Reimburse/ReimburseForm";
import DonationForm from "./pages/Donation/DonationForm";
import GstForm from "./pages/Gst/GstForm";
import Navbar from "./components/Navbar";
import SuccessMsg from "./components/SuccessMsg";
import Request from "./pages/Request";
import Footer from "./components/Footer";
import DonationReviewPage from "./pages/Donation/DonationView";
import GstFormView from "./pages/Gst/GstView";
import DonationSuccess from "./components/DonationSuccess";
import ReimburseView from "./pages/Reimburse/ReimburseView";
import StudentBankDetails from "./pages/Signup/StudentBankDetails";
import AccountantSignUp from "./pages/Signup/AccountantSignUp";
import Profile from "./pages/Profile";
import BankDetails from "./pages/BankDetails";

const App = () => {
  const location = useLocation();
  const { studentToken } = useContext(StudentContext);

  // Function to check if route needs protection
  const checkAuth = (element) => {
    // List of public routes that don't need authentication
    const publicRoutes = [
      "/",
      "/student/login",
      "/student/signup",
      "/accountant/login",
      "/accountant/signup",
      "/student/signup/success",
      "/about",
      "/contact",
    ];

    // If current path is public, allow access
    if (publicRoutes.includes(location.pathname)) {
      return element;
    }

    // If not public and no token, redirect to login
    if (!studentToken) {
      return (
        <Navigate to="/student/login" state={{ from: location }} replace />
      );
    }

    // If not public and has token, allow access
    return element;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: "#2C3E50",
          color: "white",
          borderRadius: "10px",
          padding: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          fontSize: "14px",
          border: "1px solid #38A37F",
        }}
        progressStyle={{ background: "#38A37F" }}
      />
      {location.pathname !== "/student/signup" &&
        location.pathname !== "/accountant/signup" &&
        location.pathname !== "/accountant/login" &&
        location.pathname !== "/student/login" &&
        location.pathname !== "/" &&
        location.pathname !== "/student/signup/success" &&
        location.pathname !== "/student/bank-details" && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/student/signup" element={<StudentSignUp />} />
          <Route path="/student/login" element={<Login />} />
          <Route path="/accountant/login" element={<Login />} />
          <Route path="/accountant/signup" element={<AccountantSignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/student/signup/success" element={<SuccessMsg />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={checkAuth(<Dashboard />)} />
          <Route
            path="/student/bank-details"
            element={checkAuth(<StudentBankDetails />)}
          />
          <Route path="/profile" element={checkAuth(<Profile />)} />
          <Route path="/requests" element={checkAuth(<Request />)} />
          <Route path="/bank-details" element={checkAuth(<BankDetails />)} />
          <Route path="/reimburse" element={checkAuth(<ReimburseForm />)} />
          <Route
            path="/reimburse/view"
            element={checkAuth(<ReimburseView />)}
          />
          <Route
            path="/sponsor/donation-form"
            element={checkAuth(<DonationForm />)}
          />
          <Route
            path="/sponsor/donation-form/view"
            element={checkAuth(<DonationReviewPage />)}
          />
          <Route path="/sponsor/gst-form" element={checkAuth(<GstForm />)} />
          <Route
            path="/sponsor/gst-form/view"
            element={checkAuth(<GstFormView />)}
          />

          {/* Success Routes */}
          <Route
            path="/sponsor/donation-form/success"
            element={checkAuth(<DonationSuccess />)}
          />
          <Route
            path="/sponsor/gst-form/success"
            element={checkAuth(<DonationSuccess />)}
          />
          <Route
            path="/reimburse/success"
            element={checkAuth(<DonationSuccess />)}
          />
        </Routes>
      </main>
      {location.pathname !== "/student/signup" &&
        location.pathname !== "/accountant/signup" &&
        location.pathname !== "/accountant/login" &&
        location.pathname !== "/student/login" &&
        location.pathname !== "/" &&
        location.pathname !== "/student/signup/success" &&
        location.pathname !== "/bank-details" &&
        location.pathname !== "/profile" &&
        location.pathname !== "/student/bank-details" && <Footer />}
    </div>
  );
};

export default App;
