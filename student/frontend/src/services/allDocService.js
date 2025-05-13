import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/alldocuments`;

export const allDocService = {
  getAllDocumentsForStudent: async (studentId) => {
    const token = localStorage.getItem("studentToken");
    const response = await axios.get(`${API_URL}/all/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};
