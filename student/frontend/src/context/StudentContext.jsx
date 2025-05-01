import { createContext, useState, useEffect } from "react";

export const StudentContext = createContext();

const StudentContextProvider = (props) => {
  // Initialize token from localStorage
  const [studentToken, setStudentToken] = useState(() => {
    return localStorage.getItem("studentToken") || "";
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Update localStorage whenever token changes
  useEffect(() => {
    if (studentToken) {
      localStorage.setItem("studentToken", studentToken);
    } else {
      localStorage.removeItem("studentToken");
    }
  }, [studentToken]);

  // Check if student is authenticated
  const isAuthenticated = () => {
    return !!studentToken;
  };

  // Logout function to clear token
  const logout = () => {
    setStudentToken("");
    localStorage.removeItem("studentToken");
  };

  const value = {
    studentToken,
    setStudentToken,
    backendUrl,
    isAuthenticated,
    logout,
  };

  return (
    <StudentContext.Provider value={value}>
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
