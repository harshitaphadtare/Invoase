import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="relative bg-blue-50 min-h-screen text-gray-800 overflow-hidden">
      {/* Background Design */}
      <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-green-200 rounded-full opacity-30 blur-3xl z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[200px] h-[200px] bg-blue-300 rounded-full opacity-30 blur-2xl z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-20 px-6">
        {/* Left Side - Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Logo Section */}
        <div className="flex items-center justify-center">
          <h1 className="text-6xl font-extrabold text-gray-900 tracking-wide">
            INVO<span className="text-green-600">₹</span>ASE
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
