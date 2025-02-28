import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import StudentSignUp from "./pages/Signup/StudentSignUp";
import StudentBankDetails from "./pages/Signup/StudentBankDetails";
import AccountantSignUp from "./pages/Signup/AccountantSignUp";
import Profile from "./pages/Profile";
import BankDetails from "./pages/BankDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ReimburseForm from "./pages/Reimburse/ReimburseForm";
import DonationForm from "./pages/Donation/DonationForm";
import GstForm from "./pages/Gst/GstForm";
import Navbar from "./components/Navbar";

const App = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/student/signup" &&
        location.pathname !== "/accountant/signup" &&
        location.pathname !== "/student/bank-details" && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student/signup" element={<StudentSignUp />} />
        <Route path="/student/bank-details" element={<StudentBankDetails />} />
        <Route path="/accountant/signup" element={<AccountantSignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bank-details" element={<BankDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reimburse" element={<ReimburseForm />} />
        <Route path="/sponsor/donation-form" element={<DonationForm />} />
        <Route path="/sponsor/gst-form" element={<GstForm />} />
      </Routes>
    </div>
  );
};

export default App;
