import React from "react";
import { motion } from "framer-motion";

const About = () => {
  // Animation variants for consistent animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const fadeInDelay = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  };

  // Core features data
  const coreFeatures = [
    {
      title: "Automated Approval Workflow",
      description:
        "Digitized multi-level approval system that eliminates physical document exchange and reduces processing time."
    },
    {
      title: "Real-Time Document Tracking",
      description:
        "Monitor approval status and document progress through each stage of the workflow in real-time."
    },
    {
      title: "Advanced Analytics",
      description:
        "Comprehensive reporting tools provide insights into financial patterns, approval times, and process bottlenecks."
    },
    {
      title: "Role-Based Access",
      description:
        "Tailored interfaces for students, accountants, and administrators with appropriate permissions and controls."
    }
  ];

  // User roles data
  const userRoles = [
    {
      role: "Students",
      description: "Submit reimbursement requests, track approval status, and manage event-related finances all from one intuitive dashboard."
    },
    {
      role: "Accountants",
      description: "Review financial documents, process approvals, and maintain accurate records with comprehensive oversight tools."
    },
    {
      role: "Administrators",
      description: "Gain complete visibility into financial processes, approve requests, and access detailed analytics on financial activities."
    }
  ];

  // Key advantages data
  const keyAdvantages = [
    {
      title: "Time Efficiency",
      description: "Reduce approval times from days to hours with automated document routing and real-time status updates."
    },
    {
      title: "Security",
      description: "Sensitive financial documents are securely stored and easily accessible, with role-based access and encryption."
    },
    {
      title: "Transparency",
      description: "Track document progress through every stage of the process and eliminate confusion over approval status."
    },
    {
      title: "Simplicity",
      description: "A user-friendly platform designed to be intuitive for every user role, from students to accountants."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2C3E50] to-[#3A506B] text-white py-20">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              INV<span className="text-[#38A37F]">₹</span>ASE
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8">
              Automating Council Financial Documents
            </p>
            <p className="text-md md:text-lg max-w-3xl mx-auto">
              Transforming manual, error-prone financial workflows into streamlined,
              secure digital processes for educational institutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 py-16">
        {/* Mission Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-6 text-center">Our Mission</h2>
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Invoase was born from a clear need: to solve the inefficiencies in student body council finance management.
                The current systems involve manual collection, verification, and processing of bills and invoices,
                requiring physical approvals from multiple stakeholders including faculty coordinators,
                vice principals, principals, and accountants.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to eliminate the 4-5 day delays caused by manual tracking and physical document exchange.
                By automating financial document management, we offer a fast, secure, and digital solution for handling
                approvals, reimbursements, and sponsor contributions, bringing transparency and efficiency to institutional
                financial processes.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Core Features */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-[#2C3E50] mb-10 text-center">Core Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInDelay}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-1 w-16 bg-[#38A37F] mb-4 rounded"></div>
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technology Stack */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-[#2C3E50] mb-10 text-center">Our Technology</h2>
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">Front-End</h3>
                <p className="text-gray-700 mb-4">
                  Built with React for a responsive, component-based user interface that delivers a smooth experience
                  across all devices. Our carefully crafted UI/UX ensures intuitive navigation for all user roles.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React", "HTML5", "CSS3", "JavaScript"].map((tech, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">Back-End & Infrastructure</h3>
                <p className="text-gray-700 mb-4">
                  Powered by a robust combination of Node.js and Express for API services. MongoDB provides flexible, scalable database storage.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "Express.js", "Flask", "MongoDB", "Google Vision API", "Tesseract.js"].map((tech, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* User Roles */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-[#2C3E50] mb-10 text-center">For Every Stakeholder</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {userRoles.map((user, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 rounded-full bg-[#38A37F]/10 flex items-center justify-center mx-auto mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#38A37F]/20 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-[#38A37F]"></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">For {user.role}</h3>
                <p className="text-gray-600">{user.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Key Advantages */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-[#2C3E50] mb-10 text-center">Key Advantages</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {keyAdvantages.map((advantage, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <div className="h-1 w-16 bg-[#38A37F] mb-4 rounded"></div>
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-[#38A37F] to-[#2C8565] text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Financial Workflows?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join universities and institutions already using Invoase to streamline their financial processes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="bg-white text-[#38A37F] hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition duration-300">
                Contact Us
              </a>
              <a href="/demo" className="bg-transparent hover:bg-white/10 border border-white px-8 py-3 rounded-md font-medium transition duration-300">
                Request Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;