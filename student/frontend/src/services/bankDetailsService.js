import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/bank-details`;

export const bankDetailsService = {
  getBankDetails: async (studentId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};
