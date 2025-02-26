import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import BankDetails from "./pages/BankDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ReimburseForm from "./pages/Reimburse/ReimburseForm";
import DonationForm from "./pages/Donation/DonationForm";
import GstForm from "./pages/Gst/GstForm";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
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
