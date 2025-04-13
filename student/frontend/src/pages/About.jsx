import React from 'react';

const AboutUs = () => {
  return (
    <div className="relative bg-blue-50 min-h-screen text-gray-800 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-green-200 rounded-full opacity-30 blur-3xl z-0"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[250px] h-[250px] bg-blue-300 rounded-full opacity-30 blur-2xl z-0"></div>
      <div className="absolute top-[200px] right-[50px] w-[150px] h-[150px] bg-green-300 rounded-full opacity-20 blur-2xl z-0"></div>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Empowering Smart Financial Decisions
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Invoase is a revolutionary platform designed to streamline financial approval processes
            for educational institutions and organizations. By digitizing manual tasks, we help you
            save time, eliminate paperwork, and improve transparency.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Our platform caters to different user roles – students, accountants, and administrators –
            making financial workflows smooth and secure through a centralized system.
          </p>
          <a
            href="/contact"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            Contact Us
          </a>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src="/assets/image.png" // Adjust path based on your project
            alt="Team illustration"
            className="w-full max-w-md rounded-lg shadow-md"
          />
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
