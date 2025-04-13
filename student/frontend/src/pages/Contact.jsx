import React, { useState } from "react";
import { assets } from "../assets/assets";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-[#F6F6F6] min-h-screen px-6 py-16 flex flex-col md:flex-row items-center justify-center gap-10">
      {/* Left - Form Section */}
      <div className="bg-white shadow-md p-8 rounded-lg w-full md:w-1/2 max-w-lg">
        <h2 className="text-2xl font-semibold text-[#2C3E50] mb-6">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38A37F]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38A37F]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38A37F]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              required
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#38A37F]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#38A37F] text-white py-2 rounded-md shadow-md hover:bg-[#2C8565] transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Right - Logo */}
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#2C3E50] tracking-wide">
          INVO<span className="text-[#38A37F]">₹</span>ASE
        </h1>
        <p className="mt-4 text-gray-500 max-w-sm mx-auto">
          Bridging communication and finance through seamless tech.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
