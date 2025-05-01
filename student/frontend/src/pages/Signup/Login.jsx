import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { StudentContext } from "../../context/StudentContext";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { setStudentToken, backendUrl } = useContext(StudentContext);

  const isStudentLogin = location.pathname === "/student/login";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Email validation
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }

    // Validate Somaiya email format
    const emailRegex = /^[a-zA-Z0-9._-]+@somaiya\.edu$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid Somaiya email address");
      return false;
    }

    // Password validation
    if (!formData.password.trim()) {
      toast.error("Please enter your password");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const endpoint = isStudentLogin ? "student" : "accountant";
      const response = await axios.post(`${backendUrl}/api/${endpoint}/login`, {
        email: formData.email,
        password: formData.password,
      });

      const { token, message } = response.data;

      if (token) {
        if (isStudentLogin) {
          setStudentToken(token); // Context will handle localStorage
        } else {
          // Handle accountant token (you'll need to implement AccountantContext similarly)
          localStorage.setItem("accountantToken", token);
        }

        toast.success(message || "Login successful!");
        navigate(isStudentLogin ? "/dashboard" : "/accountant/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-lg rounded-3xl bg-[#2C3E50] mx-3 px-2 py-5 pb-10 shadow-2xl sm:px-8">
        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate("/")}
            className="transition-transform duration-200 hover:scale-110"
          >
            <img
              className="cursor-pointer"
              width={40}
              src={assets.back_button}
              alt="Back"
            />
          </button>
          <button
            onClick={() => navigate("/")}
            className="transition-transform duration-200 hover:scale-110"
          >
            <img
              className="cursor-pointer"
              width={40}
              src={assets.cross_button}
              alt="Close"
            />
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <img width="50" height="50" src={assets.symbol} alt="Logo" />
        </div>

        {/* Title */}
        <h2 className="mt-1 text-center text-2xl font-semibold text-white">
          {isStudentLogin ? "Student Login" : "Accountant Login"}
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-5 items-center mt-6 space-y-2"
        >
          {/*email*/}
          <div className="relative w-full">
            <FaEnvelope className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter college email"
              className="w-full text-xs pl-9 h-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
            />
          </div>

          {/*password*/}
          <div className="relative w-full">
            <FaLock className="w-[10px] absolute left-4 top-3 text-[#9CA3AF]" />
            <input
              name="password"
              type={passwordVisible ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              className="w-full text-xs pl-9 h-9 rounded-lg border border-[#9CA3AF] bg-[#374859] p-3 text-white transition-all duration-200 focus:border-[#38A37F] focus:ring-1 focus:ring-[#38A37F] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-3 text-[#9CA3AF] hover:text-white"
            >
              {passwordVisible ? (
                <FaEyeSlash className="w-[10px] text-[#9CA3AF] cursor-pointer" />
              ) : (
                <FaEye className="w-[10px] text-[#9CA3AF] cursor-pointer" />
              )}
            </button>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex px-1 mt-1 mb-3 justify-between w-full text-xs font-medium text-[#9E9E9E]">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="appearance-none w-3 h-3 border-2 border-gray rounded-full bg-[#2C3E50] checked:bg-white cursor-pointer"
              />
              <span>Remember me?</span>
            </label>
            <a href="#" className="text-[#38A37F] hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-3 rounded-lg bg-[#38A37F] p-2 text-sm text-white transition-all duration-300 hover:bg-[#2C8565] hover:font-semibold cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                isStudentLogin ? "/student/signup" : "/accountant/signup"
              )
            }
            className="w-full rounded-lg border text-sm border-[#38A37F] p-2 text-[#38A37F] hover:bg-[#2C3E50] transition-all duration-400 cursor-pointer hover:font-semibold"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
