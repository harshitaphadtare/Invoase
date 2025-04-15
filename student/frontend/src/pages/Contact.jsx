import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    institution: "",
    role: "",
    department: "",
    inquiryType: "",
    subject: "",
    message: "",
    currentSystem: "",
    approvalLevels: "",
    contactPreference: "email",
    requestDemo: false,
    privacyConsent: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic would go here
    console.log("Form submitted:", formData);
    // Reset form or show success message
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-[#2C3E50] to-[#3A506B] text-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Have questions about implementing Invoase at your institution? 
              Our team is ready to help you transform your financial workflows.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-semibold text-[#2C3E50] mb-4 pb-2 border-b border-gray-200">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38A37F] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38A37F] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38A37F] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              {/* Institution Details */}
              <div>
                <h2 className="text-xl font-semibold text-[#2C3E50] mb-4 pb-2 border-b border-gray-200">Institution Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">Institution Name *</label>
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38A37F] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role/Position *</label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38A37F] focus:border-transparent"
                    >
                      <option value="">Select Your Role</option>
                      <option value="student">Student Council Member</option>
                      <option value="faculty">Faculty Coordinator</option>
                      <option value="administrator">Administrator</option>
                      <option value="accountant">Accountant</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department/Council</label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38A37F] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              {/* Inquiry Details */}
              <div>
                <h2 className="text-xl font-semibold text-[#2C3E50] mb-4 pb-2 border-b border-gray-200">Inquiry Details</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">Inquiry Type *</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38A37F] focus:border-transparent"
                    >
                      <option value="">Select Inquiry Type</option>
                      <option value="information">General Information</option>
                      <option value="implementation">Implementation Questions</option>
                      <option value="demo">Demo Request</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38A37F] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38A37F] focus:border-transparent"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              {/* Current System Information */}
              <div>
                <h2 className="text-xl font-semibold text-[#2C3E50] mb-4 pb-2 border-b border-gray-200">Current System Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="currentSystem" className="block text-sm font-medium text-gray-700 mb-1">Current Document Management System</label>
                    <select
                      id="currentSystem"
                      name="currentSystem"
                      value={formData.currentSystem}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38A37F] focus:border-transparent"
                    >
                      <option value="">Select Current System</option>
                      <option value="paper">Paper-based</option>
                      <option value="digital">Digital (non-integrated)</option>
                      <option value="spreadsheets">Excel/Spreadsheets</option>
                      <option value="custom">Custom Solution</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="approvalLevels" className="block text-sm font-medium text-gray-700 mb-1">Approval Process Complexity</label>
                    <select
                      id="approvalLevels"
                      name="approvalLevels"
                      value={formData.approvalLevels}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38A37F] focus:border-transparent"
                    >
                      <option value="">Select Approval Levels</option>
                      <option value="1-2">1-2 approval levels</option>
                      <option value="3-4">3-4 approval levels</option>
                      <option value="5+">5+ approval levels</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Preferences */}
              <div>
                <h2 className="text-xl font-semibold text-[#2C3E50] mb-4 pb-2 border-b border-gray-200">Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <span className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</span>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="contactPreference"
                          value="email"
                          checked={formData.contactPreference === "email"}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#38A37F] focus:ring-[#38A37F] border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Email</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="contactPreference"
                          value="phone"
                          checked={formData.contactPreference === "phone"}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#38A37F] focus:ring-[#38A37F] border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Phone</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="contactPreference"
                          value="video"
                          checked={formData.contactPreference === "video"}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#38A37F] focus:ring-[#38A37F] border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Video Call</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="requestDemo"
                        checked={formData.requestDemo}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#38A37F] focus:ring-[#38A37F] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">I would like to request a demo of Invoase</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Consent & Submission */}
              <div className="space-y-6">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleChange}
                      required
                      className="h-4 w-4 text-[#38A37F] focus:ring-[#38A37F] border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I consent to Invoase processing my personal data in accordance with the 
                      <a href="/privacy-policy" className="text-[#38A37F] hover:underline ml-1">Privacy Policy</a>
                    </span>
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#38A37F] to-[#2C8565] text-white font-medium rounded-md hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38A37F]"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;